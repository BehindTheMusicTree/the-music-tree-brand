import { createServer } from 'node:http';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { root } from './core.mjs';
const dist = path.join(root, 'apps/playground/dist');
const profile = await mkdtemp(path.join(tmpdir(), 'brand-browser-'));
const probe = `<script>
let attempts=0;
const timer=setInterval(async()=>{
 try {
  const tab=document.getElementById('tab-favicons');
  if(!tab) { if(++attempts>100) throw Error('Playground did not mount'); return; }
  if(tab.getAttribute('aria-selected') !== 'true') tab.click();
  const cards=[...document.querySelectorAll('.asset-card--favicons')];
  if(!cards.length || !cards.every(card=>card.textContent.includes('byte budget') && !card.textContent.includes('Loading size'))) { if(++attempts>100) throw Error('Asset metadata did not load'); return; }
  for(const size of [16,24,32]) if(!document.querySelector('.asset-card--favicons img[width="'+size+'"]')) throw Error('Missing actual-size preview');
  if(cards.some(card=>card.textContent.includes('failed'))) throw Error('Asset failed');
  const board=await fetch('/assets/comparison.html').then(r=>r.text());
  for(const label of ['Original','Optimized detailed','Compact proposal','16 × 16','512 × 512','row dark','row light']) if(!board.includes(label)) throw Error('Incomplete comparison: '+label);
  document.body.dataset.brandSmoke='passed';clearInterval(timer);
 }catch(error){document.body.dataset.brandSmoke='failed: '+error.message;clearInterval(timer);}
},50);
</script>`;
const server = createServer(async (req, res) => {
  try {
    const file = path.resolve(dist, '.' + new URL(req.url, 'http://localhost').pathname);
    if (file !== dist && !file.startsWith(dist + path.sep)) { res.writeHead(403).end(); return; }
    const target = file === dist ? path.join(dist, 'index.html') : file;
    let body = await readFile(target);
    const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };
    if (target === path.join(dist, 'index.html')) body = Buffer.from(body.toString().replace('</body>', probe + '</body>'));
    res.writeHead(200, { 'Content-Type': types[path.extname(target)] ?? 'application/octet-stream' }); res.end(body);
  } catch { res.writeHead(404).end(); }
});
try {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  const { stdout } = await promisify(execFile)(process.env.CHROME_BIN || 'google-chrome', ['--headless', '--no-sandbox', '--disable-gpu', '--no-first-run', `--user-data-dir=${profile}`, '--dump-dom', '--virtual-time-budget=10000', `http://127.0.0.1:${port}/`], { timeout: 30000, maxBuffer: 8 * 1024 * 1024 });
  if (!stdout.includes('data-brand-smoke="passed"')) throw new Error('Browser asset check failed: ' + (stdout.match(/data-brand-smoke="([^"]*)"/)?.[1] ?? 'no result'));
  process.stdout.write('Browser asset previews, metadata and comparison: OK\n');
} finally {
  server.closeAllConnections(); await new Promise(resolve => server.close(resolve));
  await rm(profile, { recursive: true, force: true });
}
