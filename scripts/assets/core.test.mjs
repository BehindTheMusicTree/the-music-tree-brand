import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { checkSvg, inspect, validateFile, check, generate, renderFamily, loadCatalog } from './core.mjs';
const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" fill="#09f"/></svg>');

test('reject incorrect format, dimensions, budget, broken/external SVG references and malformed XML', async () => {
  const entry = { path: 'marks/example/example.svg', maxBytes: 1000, budgetReason: 'Fixture baseline', metadata: await inspect(svg, 'source.svg') };
  await validateFile(entry, svg);
  await assert.rejects(validateFile({ ...entry, maxBytes: 1 }, svg), /budget exceeded/);
  await assert.rejects(validateFile({ ...entry, metadata: { ...entry.metadata, width: 16 } }, svg), /dimensions/);
  await assert.rejects(inspect(await sharp(svg).png().toBuffer(), 'wrong.jpg'), /format mismatch/);
  assert.throws(() => checkSvg('<svg xmlns="http://www.w3.org/2000/svg"><use href="#missing"/></svg>', 'bad'), /broken SVG reference/);
  assert.throws(() => checkSvg('<svg xmlns="http://www.w3.org/2000/svg"><image href="https://example.com/a.png"/></svg>', 'bad'), /external SVG reference/);
  assert.throws(() => checkSvg('<svg xmlns="http://www.w3.org/2000/svg"><path></svg>', 'bad'));
});

test('catalog fails for missing source, stale derivatives and undeclared assets', async () => {
  const base = await mkdtemp(path.join(tmpdir(), 'brand-test-'));
  try {
    for (const dir of ['marks/test', 'favicons/test', 'banners']) await mkdir(path.join(base, dir), { recursive: true });
    await writeFile(path.join(base, 'marks/test/source.svg'), svg);
    const family = { id: 'test', source: 'marks/test/source.svg', outputs: [{ path: 'favicons/test/icon.png', kind: 'png', size: 32 }] };
    const catalog = { families: [family], files: [{ path: family.source, role: 'source', maxBytes: svg.length, budgetReason: 'Fixture', metadata: await inspect(svg, 'source.svg') }] };
    await generate(catalog, base);
    const png = await readFile(path.join(base, family.outputs[0].path));
    catalog.files.push({ path: family.outputs[0].path, role: 'derived', maxBytes: png.length + 1000, budgetReason: 'Fixture', metadata: await inspect(png, 'icon.png') });
    await check(catalog, base);
    await rm(path.join(base, family.source));
    await assert.rejects(check(catalog, base), /ENOENT/);
    await writeFile(path.join(base, family.source), svg);
    const wrong = await sharp({ create: { width: 32, height: 32, channels: 4, background: '#ff0000' } }).png().toBuffer();
    await writeFile(path.join(base, family.outputs[0].path), wrong);
    await assert.rejects(check(catalog, base), /inconsistent derivative/);
    await generate(catalog, base);
    await writeFile(path.join(base, 'marks/test/extra.svg'), svg);
    await assert.rejects(check(catalog, base), /Uncatalogued/);
  } finally { await rm(base, { recursive: true, force: true }); }
});

test('all approved families produce byte-identical successive generations', async () => {
  for (const family of (await loadCatalog()).families) {
    const first = await renderFamily(family); const second = await renderFamily(family);
    for (const [name, data] of first) assert.ok(data.equals(second.get(name)), name);
  }
});
