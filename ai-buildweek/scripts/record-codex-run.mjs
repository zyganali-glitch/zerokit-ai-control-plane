#!/usr/bin/env node
import { mkdir, readFile, rename, stat, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { buildCodexRunManifest } from '../lib/codex-app-workflow.mjs';

function option(args, name) {
  const prefix = `--${name}=`;
  return args.find((arg) => arg.startsWith(prefix))?.slice(prefix.length) ?? null;
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

function assertWorkspacePath(filePath) {
  const candidate = relative(process.cwd(), filePath);
  if (!candidate || candidate.startsWith('..') || isAbsolute(candidate)) {
    throw new Error(`Evidence file must stay inside the workspace: ${filePath}`);
  }
}

const args = process.argv.slice(2);
const positional = args.filter((arg) => !arg.startsWith('--'));
const [inputArg, taskArg, outputArg] = positional;
const modelLabel = option(args, 'model');
const threadReference = option(args, 'thread');
const force = args.includes('--force');
if (!inputArg || !taskArg || !outputArg || !modelLabel) {
  console.error('Usage: node ai-buildweek/scripts/record-codex-run.mjs <input.md> <task.md> <output.json> --model="GPT-5.6 Sol" --confirm-model-visible --confirm-reviewed [--thread=...] [--force]');
  process.exitCode = 2;
} else {
  try {
    const inputPath = resolve(inputArg);
    const taskPath = resolve(taskArg);
    const outputPath = resolve(outputArg);
    for (const filePath of [inputPath, taskPath, outputPath]) assertWorkspacePath(filePath);
    const manifestPath = outputPath.replace(/\.json$/iu, '.manifest.json');
    if (manifestPath === outputPath) throw new Error('Output path must end with .json.');
    if (!force && await exists(manifestPath)) {
      throw new Error(`Manifest already exists: ${manifestPath}. Use --force to replace it intentionally.`);
    }
    const [inputText, taskText, outputText] = await Promise.all([
      readFile(inputPath, 'utf8'),
      readFile(taskPath, 'utf8'),
      readFile(outputPath, 'utf8'),
    ]);
    const manifest = buildCodexRunManifest({
      inputPath,
      taskPath,
      outputPath,
      inputText,
      taskText,
      outputText,
      modelLabel,
      modelVisibleConfirmed: args.includes('--confirm-model-visible'),
      humanReviewConfirmed: args.includes('--confirm-reviewed'),
      threadReference,
    });
    await mkdir(dirname(manifestPath), { recursive: true });
    const temporary = `${manifestPath}.tmp`;
    await writeFile(temporary, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
    await rename(temporary, manifestPath);
    console.log(`PASS Codex run evidence recorded: ${manifestPath}`);
    console.log(`  model: ${manifest.model_selection.label} (operator-confirmed, not cryptographically verified)`);
    console.log(`  output sha256: ${manifest.hashes.output_sha256}`);
  } catch (error) {
    console.error(`FAIL ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
