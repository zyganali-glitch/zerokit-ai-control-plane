#!/usr/bin/env node
import { mkdir, readFile, rename, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, resolve } from 'node:path';
import {
  buildGenerationManifest,
  buildGenerationRequest,
  DEFAULT_MODEL,
  generateConfigWithGPT56,
  sha256,
} from '../lib/gpt56-config-generation.mjs';

function usage() {
  return [
    'Usage:',
    '  Dry run: node ai-buildweek/scripts/generate-with-gpt56.mjs <input.md> --dry-run',
    '  Live:    node ai-buildweek/scripts/generate-with-gpt56.mjs <input.md> <output.json> [--force]',
    '',
    'Environment: OPENAI_API_KEY (live only), OPENAI_MODEL (default: gpt-5.6)',
  ].join('\n');
}
async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch (error) {
    if (error?.code === 'ENOENT') return false;
    throw error;
  }
}

async function writeJsonAtomically(filePath, value) {
  await mkdir(dirname(filePath), { recursive: true });
  const temporary = `${filePath}.tmp`;
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  await rename(temporary, filePath);
}

const args = process.argv.slice(2);
const inputArg = args.find((arg) => !arg.startsWith('--'));
const positional = args.filter((arg) => !arg.startsWith('--'));
const dryRun = args.includes('--dry-run');
const force = args.includes('--force');

if (!inputArg || (!dryRun && positional.length < 2)) {
  console.error(usage());
  process.exitCode = 2;
} else {
  try {
    const inputPath = resolve(positional[0]);
    const outputPath = positional[1] ? resolve(positional[1]) : null;
    if (outputPath && extname(outputPath).toLowerCase() !== '.json') {
      throw new Error('Output path must end in .json.');
    }
    if (outputPath && !force && await exists(outputPath)) {
      throw new Error(`Refusing to overwrite ${outputPath}; pass --force only after reviewing the target.`);
    }

    const promptPath = resolve('ai-buildweek/prompts/01-config-architect.prompt.md');
    const [prompt, requirements] = await Promise.all([
      readFile(promptPath, 'utf8'),
      readFile(inputPath, 'utf8'),
    ]);
    const model = process.env.OPENAI_MODEL || DEFAULT_MODEL;
    const prepared = buildGenerationRequest({ prompt, requirements, model });

    if (dryRun) {
      console.log('PASS GPT-5.6 generation preflight (no network request made)');
      console.log(`  model: ${model}`);
      console.log('  store: false');
      console.log(`  input sha256: ${sha256(requirements)}`);
      console.log(`  privacy blockers: ${prepared.privacy.blockers.length}`);
      console.log(`  privacy review items: ${prepared.privacy.reviewItems.length}`);
    } else {
      const result = await generateConfigWithGPT56({
        apiKey: process.env.OPENAI_API_KEY,
        prompt,
        requirements,
        model,
      });
      const manifest = buildGenerationManifest({
        ...result,
        modelRequested: model,
        prompt,
        requirements,
      });
      const manifestPath = outputPath.replace(/\.json$/iu, '.manifest.json');
      await writeJsonAtomically(outputPath, result.config);
      await writeJsonAtomically(manifestPath, manifest);
      console.log(`PASS GPT-5.6 generated and locally validated ${outputPath}`);
      console.log(`  evidence: ${manifestPath}`);
      console.log(`  response id: ${manifest.response_id ?? 'not supplied'}`);
      console.log(`  model: ${manifest.model_returned ?? model}`);
      console.log(`  output sha256: ${manifest.hashes.output_sha256}`);
    }
  } catch (error) {
    console.error(`FAIL ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
