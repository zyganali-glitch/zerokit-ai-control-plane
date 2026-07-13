#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { formatValidationReport, validateZeroKitConfig } from '../../frontend/js/config-validator.js';

export async function validateConfigFile(filePath) {
  const absolutePath = resolve(filePath);
  const raw = await readFile(absolutePath, 'utf8');
  const config = JSON.parse(raw);
  const result = validateZeroKitConfig(config);
  return { absolutePath, config, result };
}

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: node ai-buildweek/scripts/validate-config.mjs <config.json>');
    process.exitCode = 2;
    return;
  }

  try {
    const { absolutePath, result } = await validateConfigFile(filePath);
    console.log(formatValidationReport(result, absolutePath));
    if (!result.valid) process.exitCode = 1;
  } catch (error) {
    console.error(`FAIL ${resolve(filePath)}`);
    console.error(`  ERROR: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  await main();
}
