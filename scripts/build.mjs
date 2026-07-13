import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve, sep } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'dist');
if (!output.startsWith(`${root}${sep}`)) throw new Error('Unsafe build output path.');

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(resolve(root, 'index.html'), resolve(output, 'index.html'));
await cp(resolve(root, 'frontend'), resolve(output, 'frontend'), { recursive: true });
await mkdir(resolve(output, 'ai-buildweek'), { recursive: true });
await cp(resolve(root, 'ai-buildweek', 'examples'), resolve(output, 'ai-buildweek', 'examples'), { recursive: true });
console.log('PASS Built static judging demo in dist/.');

