import { loadCatalog, generate, check } from './core.mjs';
const catalog = await loadCatalog();
if (process.argv[2] === 'generate') await generate(catalog);
else if (process.argv[2] === 'check') await check(catalog);
else throw new Error('Expected generate or check');
process.stdout.write(`Assets ${process.argv[2]}: OK\n`);
