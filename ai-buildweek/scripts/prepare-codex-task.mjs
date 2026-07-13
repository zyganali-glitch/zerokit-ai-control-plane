#!/usr/bin/env node
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { basename, dirname, isAbsolute, relative, resolve } from 'node:path';
import { buildCodexTask } from '../lib/codex-app-workflow.mjs';

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch (error) {
    if (error?.code === 'ENOENT') return false;
    throw error;
  }
}

function workspacePath(filePath) {
  const result = relative(process.cwd(), filePath).replaceAll('\\', '/');
  if (!result || result.startsWith('../') || isAbsolute(result)) {
    throw new Error(`Dosya çalışma alanı içinde olmalıdır: ${filePath}`);
  }
  return result;
}

const args = process.argv.slice(2);
const positional = args.filter((arg) => !arg.startsWith('--'));
const force = args.includes('--force');
if (!positional[0]) {
  console.error('Kullanım: node ai-buildweek/scripts/prepare-codex-task.mjs <scenario.input.md> [task.md] [output.json] [--force]');
  process.exitCode = 2;
} else {
  try {
    const inputPath = resolve(positional[0]);
    const scenario = basename(inputPath).replace(/\.input\.md$/iu, '');
    const taskPath = resolve(positional[1] || `ai-buildweek/runs/${scenario}.codex-task.md`);
    const outputPath = resolve(positional[2] || `ai-buildweek/evidence/${scenario}.gpt-5.6.codex.config.json`);
    if (!force && await exists(taskPath)) {
      throw new Error(`Görev dosyası zaten var: ${taskPath}. Bilinçli yenileme için --force kullan.`);
    }
    const requirements = await readFile(inputPath, 'utf8');
    const promptPath = 'ai-buildweek/prompts/01-config-architect.prompt.md';
    const relativeInput = workspacePath(inputPath);
    const relativeTask = workspacePath(taskPath);
    const relativeOutput = workspacePath(outputPath);
    const prepared = buildCodexTask({
      requirements,
      inputPath: relativeInput,
      promptPath,
      outputPath: relativeOutput,
    });
    await mkdir(dirname(taskPath), { recursive: true });
    await writeFile(taskPath, prepared.text, 'utf8');
    console.log(`PASS Codex görev paketi hazır: ${relativeTask}`);
    console.log(`  girdi sha256: ${prepared.inputHash}`);
    console.log(`  mahremiyet engeli: ${prepared.privacy.blockers.length}`);
    console.log(`  insan incelemesi: ${prepared.privacy.reviewItems.length}`);
    console.log('SONRAKI: Codex uygulamasında GPT-5.6 Sol seç, yeni görev aç ve bu görev dosyasını çalıştır.');
  } catch (error) {
    console.error(`FAIL ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  }
}
