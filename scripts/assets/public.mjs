import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import * as tar from 'tar';
import { inspect, sha256 } from './core.mjs';

export const cacheControl = 'public, max-age=31536000, immutable';
export const mimeTypes = { svg: 'image/svg+xml', png: 'image/png', webp: 'image/webp', jpg: 'image/jpeg', jpeg: 'image/jpeg', ico: 'image/x-icon' };
export function assertVersion(version) {
  if (!/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/.test(version ?? '')) throw new Error('An explicit npm version is required (no v prefix or dist-tag)');
}
export function verifyIntegrity(data, integrity) {
  const tokens = integrity?.split(/\s+/).filter(t => t.startsWith('sha512-')) ?? [];
  if (!tokens.length || !tokens.some(t => t === `sha512-${createHash('sha512').update(data).digest('base64')}`)) throw new Error('npm archive integrity mismatch or missing SHA-512');
}
export async function downloadPublished(version, target) {
  assertVersion(version);
  const response = await fetch(`https://registry.npmjs.org/@behindthemusictree%2fbrand/${version}`, { redirect: 'error' });
  if (!response.ok) throw new Error(`npm metadata: HTTP ${response.status}`);
  const metadata = await response.json();
  if (metadata.name !== '@behindthemusictree/brand' || metadata.version !== version) throw new Error('Unexpected registry package/version');
  const url = new URL(metadata.dist.tarball);
  if (url.origin !== 'https://registry.npmjs.org') throw new Error('Unexpected npm tarball origin');
  const archiveResponse = await fetch(url, { redirect: 'error' });
  if (!archiveResponse.ok) throw new Error(`npm archive: HTTP ${archiveResponse.status}`);
  const archive = Buffer.from(await archiveResponse.arrayBuffer());
  verifyIntegrity(archive, metadata.dist.integrity);
  await writeFile(target, archive);
  return { integrity: metadata.dist.integrity, archiveSha256: sha256(archive) };
}
export async function readArchive(file) {
  const entries = new Map(); const seen = new Set(); const pending = [];
  let totalBytes = 0; let invalid;
  await tar.t({ file, strict: true, onReadEntry(entry) {
    try {
    if (entry.size > 32 * 1024 * 1024 || (totalBytes += entry.size) > 128 * 1024 * 1024) throw new Error('Archive exceeds size limit');
    if (!entry.path.startsWith('package/') || entry.path.includes('\\') || entry.path.split('/').some(p => p === '..' || p === '.') || entry.path.includes('//')) throw new Error(`Unsafe archive entry: ${entry.path}`);
    if (entry.type === 'Directory') { entry.resume(); return; }
    if (entry.type !== 'File' || !entry.path.startsWith('package/') || entry.path.split('/').some(p => p === '..' || p === '.') || entry.path.includes('\\') || seen.has(entry.path)) throw new Error(`Unsafe archive entry: ${entry.path}`);
    seen.add(entry.path);
    const chunks = [];
    pending.push(new Promise((resolve, reject) => {
      entry.on('data', chunk => chunks.push(chunk));
      entry.on('error', reject);
      entry.on('end', () => { entries.set(entry.path.slice(8), Buffer.concat(chunks)); resolve(); });
    }));
    } catch (error) { invalid ??= error; entry.resume(); }
  } });
  await Promise.all(pending);
  if (invalid) throw invalid;
  return entries;
}
export async function preparePublic(file, version, provenance) {
  assertVersion(version);
  const entries = await readArchive(file);
  const pkg = JSON.parse(entries.get('package.json')?.toString() ?? 'null');
  if (pkg?.name !== '@behindthemusictree/brand' || pkg.version !== version) throw new Error('Archive package/version mismatch');
  const files = [];
  for (const [name, body] of [...entries].sort(([a], [b]) => a.localeCompare(b, 'en'))) {
    const match = /^src\/(marks|favicons|banners)\/([a-z0-9-]+)\/([a-z0-9.-]+)\.(svg|png|webp|jpe?g|ico)$/.exec(name);
    if (!match) continue;
    await inspect(body, name);
    files.push({ path: `v${version}/${name.slice(4)}`, bytes: body.length, contentType: mimeTypes[match[4]], sha256: sha256(body), body });
  }
  for (const category of ['marks', 'favicons', 'banners']) if (!files.some(f => f.path.startsWith(`v${version}/${category}/`))) throw new Error(`Archive missing category: ${category}`);
  const manifest = { schemaVersion: 1, package: pkg.name, version, ...provenance, files: files.map(({ body, ...metadata }) => metadata) };
  const body = Buffer.from(JSON.stringify(manifest, null, 2) + '\n');
  return { files, marker: { path: `v${version}/manifest.json`, body, bytes: body.length, sha256: sha256(body), contentType: 'application/json' } };
}
function sameObject(actual, expected) {
  return actual && sha256(actual.body) === expected.sha256 && actual.contentType === expected.contentType && actual.cacheControl === cacheControl;
}
export async function synchronize(bundle, storage, verifyPublic) {
  const objects = [...bundle.files, bundle.marker];
  const missing = [];
  // Read every target before writing: a conflict must not partially publish a new set.
  for (const object of objects) {
    const actual = await storage.get(object.path);
    if (!actual) missing.push(object);
    else if (!sameObject(actual, object)) throw new Error(`Immutable URL conflict: ${object.path}`);
  }
  for (const object of missing.filter(o => o !== bundle.marker)) await putMissing(object);
  for (const object of bundle.files) await verifyPublic(object);
  if (missing.includes(bundle.marker)) await putMissing(bundle.marker);
  await verifyPublic(bundle.marker);
  async function putMissing(object) {
    // Conditional creation closes the race with other publishers; no overwrite is permitted.
    if (!await storage.putIfAbsent(object.path, object)) {
      if (!sameObject(await storage.get(object.path), object)) throw new Error(`Immutable URL conflict: ${object.path}`);
    }
  }
}
export async function verifyHttps(base, object) {
  const origin = new URL(base);
  if (origin.protocol !== 'https:' || origin.pathname !== '/' || origin.search || origin.hash || origin.username || origin.password) throw new Error('Public base URL must be an HTTPS origin');
  const response = await fetch(new URL(object.path, origin), { redirect: 'error', headers: { 'Accept-Encoding': 'identity' } });
  if (!response.ok) throw new Error(`${object.path}: public HTTP ${response.status}`);
  if (response.headers.get('content-encoding') && response.headers.get('content-encoding') !== 'identity') throw new Error(`${object.path}: invalid public content encoding`);
  const body = Buffer.from(await response.arrayBuffer());
  if (body.length !== object.bytes || sha256(body) !== object.sha256 || response.headers.get('content-type')?.split(';')[0] !== object.contentType || response.headers.get('cache-control') !== cacheControl || Number(response.headers.get('content-length')) !== object.bytes) throw new Error(`${object.path}: invalid public bytes or metadata`);
}
