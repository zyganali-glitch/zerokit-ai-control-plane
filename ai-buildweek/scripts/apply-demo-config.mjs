#!/usr/bin/env node
import { copyFile, mkdir, rename, stat } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import { validateConfigFile } from './validate-config.mjs';

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch (error) {
    if (error?.code === 'ENOENT') return false;
    throw error;
  }
}

async function main() {
  const sourceArg = process.argv[2];
  const explicitTarget = process.argv[3];
  if (!sourceArg) {
    console.error('Usage: node ai-buildweek/scripts/apply-demo-config.mjs <config.json> [demo-target.json]');
    process.exitCode = 2;
    return;
  }

  const { absolutePath: source, result } = await validateConfigFile(sourceArg);
  if (!result.valid) {
    console.error('FAIL Config was not applied because validation failed.');
    result.errors.forEach((error) => console.error(`  ERROR: ${error}`));
    process.exitCode = 1;
    return;
  }

  const defaultTarget = resolve('ai-buildweek', 'demo-config', basename(source));
  const target = explicitTarget ? resolve(explicitTarget) : defaultTarget;
  if (target === source) {
    console.error('FAIL Source and target config paths must be different.');
    process.exitCode = 1;
    return;
  }
  const privateDonorPath = resolve('config', 'zerokit.config.json');
  if (target === privateDonorPath && !process.argv.includes('--allow-private-donor-overwrite')) {
    console.error('FAIL Refusing to overwrite config/zerokit.config.json without --allow-private-donor-overwrite.');
    process.exitCode = 1;
    return;
  }

  await mkdir(dirname(target), { recursive: true });
  if (await exists(target)) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backup = `${target}.${timestamp}.bak`;
    await rename(target, backup);
    console.log(`BACKUP ${backup}`);
  }
  await copyFile(source, target);
  console.log(`PASS Applied validated demo config to ${target}`);
  console.log(`NEXT Run npm run dev, click "Choose local JSON" in the preview, and select ${target}.`);
  console.log('Review the loaded config before runtime integration; staging this file does not auto-load it in the browser.');
}

try {
  await main();
} catch (error) {
  console.error(`FAIL ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
