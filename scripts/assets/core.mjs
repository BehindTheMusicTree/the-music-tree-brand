import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { SaxesParser } from 'saxes';

export const root = path.resolve(import.meta.dirname, '../..');
export const assetRoot = path.join(root, 'packages/brand/src');
export const categories = ['marks', 'favicons', 'banners'];
export const sha256 = data => createHash('sha256').update(data).digest('hex');
export const loadCatalog = async () => JSON.parse(await readFile(path.join(root, 'assets.catalog.json'), 'utf8'));
export async function walk(dir) {
  const files = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.isSymbolicLink()) throw new Error(`Symbolic link forbidden: ${dir}/${e.name}`);
    if (e.isDirectory()) files.push(...await walk(path.join(dir, e.name)));
    else files.push(path.join(dir, e.name));
  }
  return files.sort();
}
export function checkSvg(data, label) {
  const xml = data.toString();
  const ids = new Set(); const refs = []; let svg = false;
  const parser = new SaxesParser({ xmlns: true });
  parser.on('doctype', () => { throw new Error(`${label}: DOCTYPE forbidden`); });
  parser.on('opentag', node => {
    if (!svg) {
      if (node.local !== 'svg' || node.uri !== 'http://www.w3.org/2000/svg') throw new Error(`${label}: invalid SVG root`);
      svg = true;
    }
    if (['script', 'foreignObject'].includes(node.local)) throw new Error(`${label}: active SVG content forbidden`);
    for (const a of Object.values(node.attributes)) {
      if (a.local === 'id') {
        if (ids.has(a.value)) throw new Error(`${label}: duplicate SVG id ${a.value}`);
        ids.add(a.value);
      }
      if (/^on/i.test(a.local)) throw new Error(`${label}: event handler forbidden`);
      if (a.local === 'href') {
        if (a.value.startsWith('#')) refs.push(a.value.slice(1));
        else if (!/^data:image\/(png|jpeg|webp);base64,/.test(a.value)) throw new Error(`${label}: external SVG reference ${a.value}`);
      }
    }
  });
  parser.write(xml).close();
  if (!svg) throw new Error(`${label}: missing SVG root`);
  for (const match of xml.matchAll(/url\(\s*['"]?([^)'"\s]+)['"]?\s*\)/g)) {
    if (!match[1].startsWith('#')) throw new Error(`${label}: external SVG URL`);
    refs.push(match[1].slice(1));
  }
  for (const ref of refs) if (!ids.has(ref)) throw new Error(`${label}: broken SVG reference #${ref}`);
}
export function icoSizes(data) {
  if (data.length < 6 || data.readUInt32LE(0) !== 65536) throw new Error('Invalid ICO header');
  const n = data.readUInt16LE(4); const sizes = [];
  if (!n || data.length < 6 + n * 16) throw new Error('Invalid ICO directory');
  for (let i = 0; i < n; i++) {
    const o = 6 + 16 * i; const w = data[o] || 256; const h = data[o + 1] || 256;
    if (w !== h || data.readUInt32LE(o + 12) < 6 + n * 16 || data.readUInt32LE(o + 12) + data.readUInt32LE(o + 8) > data.length) throw new Error('Invalid ICO frame');
    sizes.push(w);
  }
  return sizes;
}
export async function inspect(data, name) {
  const ext = path.extname(name).slice(1).toLowerCase();
  if (ext === 'ico') return { format: 'ico', sizes: icoSizes(data) };
  if (ext === 'svg') checkSvg(data, name);
  const m = await sharp(data).metadata();
  if ((ext === 'jpg' ? 'jpeg' : ext) !== m.format) throw new Error(`${name}: extension/format mismatch (${m.format})`);
  return { format: m.format, width: m.width, height: m.height, alpha: m.hasAlpha, ...(ext === 'svg' ? { embeddedRaster: /<image\b/.test(data.toString()) } : {}) };
}
export async function renderFamily(family, base = assetRoot) {
  const source = await readFile(path.join(base, family.source));
  const result = new Map();
  for (const output of family.outputs) {
    if (output.kind === 'copy') result.set(output.path, source);
    else if (output.kind === 'png') result.set(output.path, await sharp(source).resize(output.size, output.size, { fit: 'contain', background: '#00000000' }).png({ compressionLevel: 9, adaptiveFiltering: true, palette: false }).toBuffer());
    else if (output.kind === 'ico') {
      const frames = await Promise.all(output.sizes.map(size => sharp(source).resize(size, size, { fit: 'contain', background: '#00000000' }).png().toBuffer()));
      result.set(output.path, await pngToIco(frames));
    } else throw new Error(`Unknown output kind: ${output.kind}`);
  }
  return result;
}
export async function generate(catalog, base = assetRoot) {
  for (const family of catalog.families) for (const [name, data] of await renderFamily(family, base)) {
    await mkdir(path.dirname(path.join(base, name)), { recursive: true });
    await writeFile(path.join(base, name), data);
  }
}
export async function validateFile(entry, data) {
  if (!Number.isInteger(entry.maxBytes) || entry.maxBytes < 1 || !entry.budgetReason) throw new Error(`${entry.path}: missing explicit budget/reason`);
  if (data.length > entry.maxBytes) throw new Error(`${entry.path}: budget exceeded (${data.length} > ${entry.maxBytes})`);
  if (entry.path.endsWith('-mark-compact.svg') && entry.maxBytes > 30000) throw new Error(`${entry.path}: compact budget exceeds 30 KB`);
  const actual = await inspect(data, entry.path);
  if (JSON.stringify(actual) !== JSON.stringify(entry.metadata)) throw new Error(`${entry.path}: incorrect format/dimensions/metadata: ${JSON.stringify(actual)}`);
}
export async function check(catalog, base = assetRoot) {
  const expected = new Set();
  for (const entry of catalog.files) {
    if (!/^(marks|favicons|banners)\/[a-z0-9-]+\/[a-z0-9.-]+$/.test(entry.path) || expected.has(entry.path)) throw new Error(`Invalid or duplicate catalog path: ${entry.path}`);
    if (!['source', 'derived', 'historical'].includes(entry.role)) throw new Error(`${entry.path}: invalid role`);
    expected.add(entry.path);
    await validateFile(entry, await readFile(path.join(base, entry.path)));
  }
  const generated = new Set();
  for (const family of catalog.families) {
    if (!catalog.files.some(f => f.path === family.source && f.role === 'source')) throw new Error(`${family.id}: missing declared source ${family.source}`);
    for (const [name, data] of await renderFamily(family, base)) {
      if (generated.has(name) || !catalog.files.some(f => f.path === name && f.role === 'derived')) throw new Error(`${name}: undeclared/duplicate derivative`);
      generated.add(name);
      if (!data.equals(await readFile(path.join(base, name)))) throw new Error(`${name}: inconsistent derivative; run pnpm assets:generate`);
    }
  }
  for (const f of catalog.files) if (f.role === 'derived' && !generated.has(f.path)) throw new Error(`${f.path}: orphan derivative`);
  for (const category of categories) for (const name of await walk(path.join(base, category))) {
    if (/\.(svg|png|ico|jpe?g|webp)$/i.test(name) && !expected.has(path.relative(base, name))) throw new Error(`Uncatalogued file: ${name}`);
  }
}
