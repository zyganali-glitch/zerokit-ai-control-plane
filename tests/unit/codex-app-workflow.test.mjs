import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import test from 'node:test';
import {
  buildCodexRunManifest,
  buildCodexTask,
  validateGeneratedConfig,
} from '../../ai-buildweek/lib/codex-app-workflow.mjs';

const validConfig = {
  version: 1,
  panel_registry: { users: { enabled: true } },
  rbac_registry: { roles: [{ slug: 'owner', permissions: '*' }] },
  field_registry: { users: {} },
  endpoint_map: { users: '/api/users' },
  brand_config: { appName: 'Synthetic Control' },
  privacy_notes: ['Synthetic metadata only.'],
  test_checklist: ['Validate the users contract.'],
};

test('Codex task package is local-only and carries the sanitized input hash', () => {
  const result = buildCodexTask({
    requirements: 'Synthetic school roles only.',
    inputPath: 'ai-buildweek/examples/school-saas.input.md',
    promptPath: 'ai-buildweek/prompts/01-config-architect.prompt.md',
    outputPath: 'ai-buildweek/evidence/school.json',
  });
  assert.equal(result.privacy.safeToSend, true);
  assert.equal(result.inputHash.length, 64);
  assert.match(result.text, /GPT-5\.6 Sol/u);
  assert.match(result.text, /Model API'si veya harici ağ çağrısı kullanma/u);
  assert.doesNotMatch(result.text, /OPENAI_API_KEY|api\.openai\.com/u);
});

test('generated artifact gate requires version, brand, privacy, and checklist', () => {
  const invalid = validateGeneratedConfig({
    panel_registry: {},
    rbac_registry: { roles: [{ slug: 'owner', permissions: '*' }] },
    field_registry: {},
    endpoint_map: {},
  });
  assert.equal(invalid.valid, false);
  for (const prefix of ['version', 'brand_config', 'privacy_notes', 'test_checklist']) {
    assert.ok(invalid.errors.some((error) => error.startsWith(prefix)));
  }
});

test('Codex manifest records an explicit operator attestation without claiming cryptographic model proof', () => {
  const outputText = JSON.stringify(validConfig);
  const manifest = buildCodexRunManifest({
    inputPath: resolve('ai-buildweek/examples/school.input.md'),
    taskPath: resolve('ai-buildweek/runs/school.task.md'),
    outputPath: resolve('ai-buildweek/evidence/school.json'),
    inputText: 'Synthetic school roles only.',
    taskText: 'Prepared task.',
    outputText,
    modelLabel: 'GPT-5.6 Sol',
    modelVisibleConfirmed: true,
    humanReviewConfirmed: true,
    threadReference: 'school-demo-run',
  });
  assert.equal(manifest.model_selection.visible_in_app_confirmed_by_operator, true);
  assert.equal(manifest.model_selection.cryptographically_verified, false);
  assert.equal(manifest.validation.valid, true);
  assert.equal(manifest.hashes.output_sha256.length, 64);
  assert.doesNotMatch(JSON.stringify(manifest), /Synthetic school roles only/u);
});

test('Codex manifest refuses missing operator confirmations and unsupported model labels', () => {
  const base = {
    inputPath: resolve('ai-buildweek/examples/input.md'),
    taskPath: resolve('ai-buildweek/runs/task.md'),
    outputPath: resolve('ai-buildweek/evidence/output.json'),
    inputText: 'Synthetic only.',
    taskText: 'Task.',
    outputText: JSON.stringify(validConfig),
    modelLabel: 'GPT-5.6 Sol',
    modelVisibleConfirmed: true,
    humanReviewConfirmed: true,
  };
  assert.throws(() => buildCodexRunManifest({ ...base, modelVisibleConfirmed: false }), /model selection/u);
  assert.throws(() => buildCodexRunManifest({ ...base, humanReviewConfirmed: false }), /Human review/u);
  assert.throws(() => buildCodexRunManifest({ ...base, modelLabel: 'Unknown Model' }), /Model label/u);
});

test('school SaaS baseline and committed Codex task are ready and synchronized', async () => {
  const inputPath = resolve('ai-buildweek/examples/school-saas.input.md');
  const taskPath = resolve('ai-buildweek/runs/school-saas.codex-task.md');
  const configPath = resolve('ai-buildweek/examples/school-saas.generated.config.json');
  const [requirements, taskText, configText] = await Promise.all([
    readFile(inputPath, 'utf8'),
    readFile(taskPath, 'utf8'),
    readFile(configPath, 'utf8'),
  ]);
  const prepared = buildCodexTask({
    requirements,
    inputPath: 'ai-buildweek/examples/school-saas.input.md',
    promptPath: 'ai-buildweek/prompts/01-config-architect.prompt.md',
    outputPath: 'ai-buildweek/evidence/school-saas.gpt-5.6.codex.config.json',
  });
  assert.equal(taskText, prepared.text);
  assert.equal(prepared.privacy.blockers.length, 0);
  assert.equal(prepared.privacy.reviewItems.length, 0);
  assert.equal(validateGeneratedConfig(JSON.parse(configText)).valid, true);
});
