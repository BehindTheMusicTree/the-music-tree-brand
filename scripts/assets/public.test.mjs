import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { synchronize, cacheControl, assertVersion, verifyIntegrity, verifyHttps } from './public.mjs';
import { sha256 } from './core.mjs';
const object = (path, text, contentType = 'image/svg+xml') => { const body = Buffer.from(text); return { path, body, bytes: body.length, sha256: sha256(body), contentType }; };
const bundle = { files: [object('v1.2.3/marks/a/a.svg', 'one'), object('v1.2.3/favicons/a/a.png', 'two', 'image/png')], marker: object('v1.2.3/manifest.json', '{}', 'application/json') };
function mock() {
  const map = new Map(); const writes = []; let failAt;
  return { map, writes, setFailure: key => { failAt = key; },
    async get(key) { return map.get(key) ?? null; },
    async putIfAbsent(key, o) { if (key === failAt) throw new Error('interrupted'); if (map.has(key)) return false; writes.push(key); map.set(key, { ...o, cacheControl }); return true; },
  };
}
const verify = async () => {};
test('first upload, identical retry, content and metadata conflicts', async () => {
  const store = mock(); await synchronize(bundle, store, verify);
  assert.deepEqual(store.writes, [...bundle.files.map(f => f.path), bundle.marker.path]);
  await synchronize(bundle, store, verify); assert.equal(store.writes.length, 3);
  store.map.set(bundle.files[1].path, { ...bundle.files[1], body: Buffer.from('different'), cacheControl });
  await assert.rejects(synchronize(bundle, store, verify), /Immutable URL conflict/); assert.equal(store.writes.length, 3);
  store.map.set(bundle.files[1].path, { ...bundle.files[1], cacheControl: 'no-cache' });
  await assert.rejects(synchronize(bundle, store, verify), /Immutable URL conflict/);
});
test('interruption resumes with no overwrite and manifest is last', async () => {
  const store = mock(); store.setFailure(bundle.files[1].path);
  await assert.rejects(synchronize(bundle, store, verify), /interrupted/);
  assert.ok(!store.map.has(bundle.marker.path));
  store.setFailure(null); await synchronize(bundle, store, verify);
  assert.equal(store.writes.filter(key => key === bundle.files[0].path).length, 1);
  assert.equal(store.writes.at(-1), bundle.marker.path);
});
test('public verification failure leaves version incomplete; retry completes', async () => {
  const store = mock();
  await assert.rejects(synchronize(bundle, store, async () => { throw new Error('public HTTP 503'); }), /503/);
  assert.ok(!store.map.has(bundle.marker.path));
  await synchronize(bundle, store, verify); assert.ok(store.map.has(bundle.marker.path));
});
test('concurrent creation conflict is refused', async () => {
  const store = mock(); store.putIfAbsent = async () => false;
  await assert.rejects(synchronize(bundle, store, verify), /Immutable URL conflict/);
});
test('explicit versions, registry integrity and HTTPS origin are mandatory', async () => {
  for (const v of ['latest', 'v1.2.3', '../1.2.3', '', '01.2.3']) assert.throws(() => assertVersion(v));
  assertVersion('1.2.3'); assertVersion('1.2.3-rc.1');
  const data = Buffer.from('archive'); const integrity = `sha512-${createHash('sha512').update(data).digest('base64')}`;
  verifyIntegrity(data, integrity);
  assert.throws(() => verifyIntegrity(Buffer.from('tampered'), integrity), /integrity/);
  assert.throws(() => verifyIntegrity(data, 'sha1-abc'), /integrity/);
  await assert.rejects(verifyHttps('http://example.com', bundle.files[0]), /HTTPS origin/);
});

test('archive rejects traversal, links, duplicate files and excessive sizes', async () => {
  const { mkdtemp, writeFile, rm } = await import('node:fs/promises');
  const { tmpdir } = await import('node:os');
  const path = await import('node:path');
  const { Header } = await import('tar');
  const { readArchive } = await import('./public.mjs');
  const dir = await mkdtemp(path.join(tmpdir(), 'brand-hostile-'));
  const archive = path.join(dir, 'test.tar');
  function entry(name, type = 'File', size = 0) {
    const header = new Header({ path: name, type, size, mode: 0o644, uid: 0, gid: 0, mtime: new Date(0), linkpath: type === 'SymbolicLink' ? '/etc/passwd' : '' });
    header.encode(); return header.block;
  }
  try {
    for (const blocks of [
      [entry('package/../escape')], [entry('package//escape')],
      [entry('outside/file')], [entry('package/link', 'SymbolicLink')],
      [entry('package/a'), entry('package/a')],
      [entry('package/huge', 'File', 33 * 1024 * 1024), Buffer.alloc(33 * 1024 * 1024)],
    ]) {
      await writeFile(archive, Buffer.concat([...blocks, Buffer.alloc(1024)]));
      await assert.rejects(readArchive(archive), /Unsafe archive|size limit/);
    }
  } finally { await rm(dir, { recursive: true, force: true }); }
});

test('HTTPS verification requests identity bytes and rejects altered headers or content', async () => {
  const originalFetch = globalThis.fetch;
  const expected = bundle.files[0];
  let changes = {};
  globalThis.fetch = async (_url, options) => {
    assert.equal(options.headers['Accept-Encoding'], 'identity');
    assert.equal(options.redirect, 'error');
    return new Response(expected.body, { headers: {
      'content-type': expected.contentType,
      'content-length': String(expected.bytes),
      'cache-control': cacheControl,
      ...changes,
    } });
  };
  try {
    await verifyHttps('https://example.com', expected);
    for (const bad of [{ 'content-type': 'text/plain' }, { 'cache-control': 'no-cache' }, { 'content-length': '99' }, { 'content-encoding': 'gzip' }]) {
      changes = bad;
      await assert.rejects(verifyHttps('https://example.com', expected), /invalid public/);
    }
  } finally { globalThis.fetch = originalFetch; }
});
