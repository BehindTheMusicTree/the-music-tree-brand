import { mkdtemp, readFile, writeFile, rm, mkdir } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { assetRoot, root, loadCatalog, sha256, inspect, walk } from './core.mjs';
import { readArchive, preparePublic } from './public.mjs';
const dir = await mkdtemp(path.join(tmpdir(), 'brand-package-'));
const run = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, stdio: 'pipe', env: process.env, maxBuffer: 8 * 1024 * 1024 });
try {
  run('pnpm', ['--filter', '@behindthemusictree/brand', 'build'], root);
  run('pnpm', ['--dir', 'packages/brand', 'pack', '--pack-gzip-level', '9', '--out', path.join(dir, 'brand.tgz')], root);
  const archive = path.join(dir, 'brand.tgz');
  const entries = await readArchive(archive);
  const catalog = await loadCatalog();
  for (const f of catalog.files) {
    const content = entries.get(`src/${f.path}`);
    if (!content || !content.equals(await readFile(path.join(assetRoot, f.path)))) throw new Error(`Missing or altered packed asset: ${f.path}`);
  }
  const pkg = JSON.parse(entries.get('package.json').toString());
  const bundle = await preparePublic(archive, pkg.version, { archiveSha256: sha256(await readFile(archive)) });
  if (bundle.files.length !== catalog.files.length) throw new Error('Public allowlist/archive/catalog mismatch');
  const app = path.join(dir, 'consumer'); await mkdir(app);
  const lock = JSON.parse(await readFile(path.join(root, 'apps/playground/node_modules/vite/package.json'), 'utf8'));
  const react = JSON.parse(await readFile(path.join(root, 'apps/playground/node_modules/react/package.json'), 'utf8'));
  await writeFile(path.join(app, 'package.json'), JSON.stringify({ private: true, type: 'module', dependencies: { '@behindthemusictree/brand': `file:${archive}`, vite: lock.version, react: react.version, 'react-dom': react.version } }));
  run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund', '--package-lock=false'], app);
  await writeFile(path.join(app, 'index.html'), '<div id="root"></div><script type="module" src="/main.js"></script>');
  const imports = catalog.files.map((f, i) => `import a${i} from ${JSON.stringify(`@behindthemusictree/brand/${f.path}?url`)};`).join('\n');
  await writeFile(path.join(app, 'main.js'), `${imports}\nimport React from 'react';\nimport { renderToStaticMarkup } from 'react-dom/server';\nimport { TheMusicTreeByline } from '@behindthemusictree/brand/components';\ndocument.getElementById('root').innerHTML = renderToStaticMarkup(React.createElement(TheMusicTreeByline));\nwindow.assetUrls = [${catalog.files.map((_, i) => `a${i}`).join(',')}];`);
  await writeFile(path.join(app, 'vite.config.js'), "export default { build: { assetsInlineLimit: 0, manifest: true } };\n");
  run(path.join(app, 'node_modules/.bin/vite'), ['build'], app);
  const emitted = await walk(path.join(app, 'dist/assets'));
  const hashes = new Set(await Promise.all(emitted.map(async file => sha256(await readFile(file)))));
  for (const f of catalog.files) if (!hashes.has(sha256(await readFile(path.join(assetRoot, f.path))))) throw new Error(`Vite did not emit ${f.path}`);
  const code = (await Promise.all(emitted.filter(f => f.endsWith('.js')).map(f => readFile(f, 'utf8')))).join('\n');
  const urls = [...code.matchAll(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g)]
    .map(([literal]) => literal.includes('data:image/svg+xml') ? runInNewContext(literal, Object.create(null), { timeout: 100 }) : null)
    .filter(value => typeof value === 'string' && value.startsWith('data:image/svg+xml'));
  if (!urls.length) throw new Error('Missing embedded component SVG data');
  for (const url of urls) {
    const comma = url.indexOf(',');
    const header = url.slice(0, comma); const payload = url.slice(comma + 1);
    const decoded = header.includes(';base64') ? Buffer.from(payload, 'base64') : Buffer.from(decodeURIComponent(payload));
    await inspect(decoded, 'embedded.svg');
  }
  process.stdout.write(`Package consumer: ${catalog.files.length} public paths emitted; ${urls.length} embedded SVGs valid\n`);
} catch (error) {
  if (error.stdout) process.stderr.write(error.stdout);
  if (error.stderr) process.stderr.write(error.stderr);
  throw error;
} finally { await rm(dir, { recursive: true, force: true }); }
