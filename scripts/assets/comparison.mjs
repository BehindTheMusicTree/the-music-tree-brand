import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import sharp from 'sharp';
import { root, assetRoot, loadCatalog } from './core.mjs';
const catalog = await loadCatalog();
const sizes = [16, 24, 32, 180, 192, 512];
let html = `<!doctype html><html lang="en"><meta charset="utf-8"><title>Brand asset review</title><style>body{font:16px system-ui;margin:24px}section{margin:32px 0}.row{display:flex;align-items:start;gap:20px;overflow:auto;padding:16px}.dark{background:#151719;color:white}.light{background:#fff;color:#111}figure{margin:0;flex-shrink:0}figcaption{font-size:12px}img{display:block}h3{margin:16px 0 0}</style><h1>Brand asset review</h1><p>Original → optimized detailed → compact proposal. Compact proposals require approval and are not selected for publication. Sizes are actual CSS pixels; scroll horizontally for large images.</p>`;
for (const family of catalog.families) {
  const original = execFileSync('git', ['show', `origin/develop:packages/brand/src/${family.source}`], { cwd: root, maxBuffer: 16 * 1024 * 1024 });
  const detailed = await readFile(path.join(assetRoot, family.source));
  const compact = await readFile(path.join(root, `docs/assets/proposals/${family.id}-mark-compact.svg`));
  html += `<section><h2>${family.id}</h2>`;
  for (const [label, data] of [['Original', original], ['Optimized detailed', detailed], ['Compact proposal — pending approval', compact]]) {
    html += `<h3>${label} · SVG · ${data.length.toLocaleString('en')} bytes</h3>`;
    const images = await Promise.all(sizes.map(async size => {
      const png = await sharp(data).resize(size, size, { fit: 'contain', background: '#00000000' }).png().toBuffer();
      return `<figure><img width="${size}" height="${size}" alt="${family.id}, ${label}, ${size} pixels" src="data:image/png;base64,${png.toString('base64')}"><figcaption>${size} × ${size}</figcaption></figure>`;
    }));
    for (const theme of ['light', 'dark']) html += `<div class="row ${theme}">${images.join('')}</div>`;
  }
  html += '</section>';
}
await writeFile(path.join(root, 'docs/assets/comparison.html'), html + '</html>');
