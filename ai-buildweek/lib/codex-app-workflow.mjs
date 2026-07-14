import { createHash } from 'node:crypto';
import { isAbsolute, relative } from 'node:path';
import { validateZeroKitConfig } from '../../frontend/js/config-validator.js';
import { assertPrivacySafe, PRIVACY_GUARD_VERSION } from './privacy-guard.mjs';

const ALLOWED_MODELS = new Set(['GPT-5.6 Sol']);

export function sha256(value) {
  return createHash('sha256').update(value, 'utf8').digest('hex');
}

export function validateGeneratedConfig(config) {
  const base = validateZeroKitConfig(config);
  const errors = [...base.errors];
  for (const section of ['panel_registry', 'field_registry', 'endpoint_map']) {
    if (config?.[section]
      && typeof config[section] === 'object'
      && !Array.isArray(config[section])
      && Object.keys(config[section]).length === 0) {
      errors.push(`${section} must not be empty for a generated artifact.`);
    }
  }
  if (!Number.isInteger(config?.version) || config.version < 1) {
    errors.push('version must be a positive integer for a generated artifact.');
  }
  if (!config?.brand_config || typeof config.brand_config !== 'object' || Array.isArray(config.brand_config)) {
    errors.push('brand_config must be an object for a generated artifact.');
  }
  if (!Array.isArray(config?.privacy_notes)
    || config.privacy_notes.length === 0
    || !config.privacy_notes.every((note) => typeof note === 'string' && note.trim())) {
    errors.push('privacy_notes must be a non-empty string array for a generated artifact.');
  }
  if (!Array.isArray(config?.test_checklist)
    || config.test_checklist.length === 0
    || !config.test_checklist.every((item) => typeof item === 'string' && item.trim())) {
    errors.push('test_checklist must be a non-empty string array for a generated artifact.');
  }
  return { ...base, valid: errors.length === 0, errors };
}

export function buildCodexTask({ requirements, inputPath, promptPath, outputPath }) {
  const privacy = assertPrivacySafe(requirements, 'scenario requirements');
  const inputHash = sha256(requirements);
  const text = `# Codex app task — ZeroKit config architect

## Operator prerequisite

Before starting this task, select **GPT-5.6 Sol** in the Codex app model picker. For this single bounded task, use **Max** when it is available; otherwise use the highest visible single-task reasoning effort such as **Extra High** or **High**. Ultra is a parallel subagent mode, not a reasoning level. This script cannot verify the in-app selection, so keep the actual model, mode, and effort visible in the recording.

## Inputs

- Architecture prompt: \`${promptPath}\`
- Sanitized scenario input: \`${inputPath}\`
- Input SHA-256: \`${inputHash}\`
- Target config: \`${outputPath}\`

## Task

1. Read \`AGENTS.md\`, the architecture prompt, and the scenario input.
2. Do not read \`.env\` files, credentials, production logs, customer records, private donor files, or private files outside this repository.
3. Do not call a model API or make an external network request. Complete this task inside the current Codex app session.
4. Generate a ZeroKit config only from the synthetic input and write it to the target JSON file.
5. The config must include \`version\`, \`panel_registry\`, \`rbac_registry\`, \`field_registry\`, \`endpoint_map\`, \`brand_config\`, \`privacy_notes\`, and \`test_checklist\`.
6. Do not invent backend compatibility. Record unknowns explicitly in the notes.
7. Run this command and fix every failure:

   \`node ai-buildweek/scripts/validate-config.mjs ${outputPath}\`

8. In the change summary, state the assumptions, validation result, and need for human review. Do not create the manifest; the operator records it after review.
`;
  return { inputHash, privacy, text };
}

function workspacePath(filePath) {
  const result = relative(process.cwd(), filePath).replaceAll('\\', '/');
  if (!result || result.startsWith('../') || isAbsolute(result)) {
    throw new Error(`Evidence files must stay inside the workspace: ${filePath}`);
  }
  return result;
}

export function buildCodexRunManifest({
  inputPath,
  taskPath,
  outputPath,
  inputText,
  taskText,
  outputText,
  modelLabel,
  modelVisibleConfirmed,
  humanReviewConfirmed,
  threadReference = null,
}) {
  if (!ALLOWED_MODELS.has(modelLabel)) {
    throw new Error(`Model label must be one of: ${[...ALLOWED_MODELS].join(', ')}.`);
  }
  if (!modelVisibleConfirmed) {
    throw new Error('Visible Codex model selection must be confirmed by the operator.');
  }
  if (!humanReviewConfirmed) {
    throw new Error('Human review must be confirmed before recording evidence.');
  }
  const privacy = assertPrivacySafe(inputText, 'scenario requirements');
  const config = JSON.parse(outputText);
  const validation = validateGeneratedConfig(config);
  if (!validation.valid) {
    throw new Error(`Codex output failed local validation: ${validation.errors.join(' | ')}`);
  }

  return {
    evidence_version: 1,
    surface: 'Codex app',
    model_selection: {
      label: modelLabel,
      visible_in_app_confirmed_by_operator: true,
      cryptographically_verified: false,
      evidence_note: 'The selection is evidenced by the visible Codex UI and demo recording; the local script cannot read the in-app model.',
    },
    thread_reference: threadReference,
    recorded_at: new Date().toISOString(),
    files: {
      input: workspacePath(inputPath),
      task: workspacePath(taskPath),
      output: workspacePath(outputPath),
    },
    hashes: {
      input_sha256: sha256(inputText),
      task_sha256: sha256(taskText),
      output_sha256: sha256(outputText),
    },
    privacy_guard: {
      version: PRIVACY_GUARD_VERSION,
      blocking_findings: privacy.blockers.length,
      review_findings: privacy.reviewItems.length,
    },
    validation: {
      valid: true,
      warnings: validation.warnings,
      stats: validation.stats,
    },
    human_review: {
      completed: true,
      required_for_application: true,
    },
    note: 'The manifest stores hashes, not the input, task, output content, private files, or model reasoning.',
  };
}

export const CODEX_APP_MODEL_LABELS = [...ALLOWED_MODELS];
