import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { optimize } from 'svgo';
import { assetRoot, categories, walk, inspect, sha256, root } from './core.mjs';

const inventory = [];
for (const category of categories) for (const name of await walk(path.join(assetRoot, category))) {
  if (!/\.(svg|png|ico|jpe?g|webp)$/.test(name)) continue;
  const before = await readFile(name);
  if (name.endsWith('.jpg') && (await sharp(before).metadata()).format !== 'jpeg') {
    const corrected = await sharp(before).jpeg({ quality: 100, chromaSubsampling: '4:4:4' }).toBuffer();
    await writeFile(name, corrected);
    inventory.push({ path: path.relative(assetRoot, name), beforeBytes: before.length, optimizedBytes: corrected.length, originalFormat: 'png', correction: 'JPEG encoding at quality 100, 4:4:4; original PNG remains at its existing .png path.', sha256: sha256(corrected), ...await inspect(corrected, name) });
    continue;
  }
  let after = before;
  if (name.endsWith('.svg')) {
    // Keep geometry, paint, IDs, viewBox and filters verbatim; only remove editor metadata and whitespace.
    after = Buffer.from(optimize(before.toString(), { plugins: ['removeDoctype', 'removeComments', 'removeMetadata', 'removeXMLProcInst', 'cleanupAttrs', 'sortAttrs'] }).data);
  } else if (name.endsWith('.png')) {
    after = await sharp(before).png({ compressionLevel: 9, adaptiveFiltering: true, palette: false }).toBuffer();
  }
  const wrongFormat = name.endsWith('.png') && (await sharp(before).metadata()).format !== 'png';
  if ((after.length < before.length || wrongFormat) && /\.(svg|png)$/.test(name)) {
    const pixels = data => name.endsWith('.svg') ? sharp(data).resize(512, 512, { fit: 'contain' }).ensureAlpha().raw().toBuffer() : sharp(data).ensureAlpha().raw().toBuffer();
    if (!(await pixels(before)).equals(await pixels(after))) throw new Error(`${name}: optimization changed pixels`);
    await writeFile(name, after);
  } else after = before;
  inventory.push({ path: path.relative(assetRoot, name), beforeBytes: before.length, optimizedBytes: after.length, sha256: sha256(after), originalFormat: (name.endsWith('.ico') ? 'ico' : (await sharp(before).metadata()).format), ...await inspect(after, name) });
}
await writeFile(path.join(root, 'docs/assets/optimization-inventory.json'), JSON.stringify(inventory, null, 2) + '\n');
