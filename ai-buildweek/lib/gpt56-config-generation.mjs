import { createHash } from 'node:crypto';
import { validateZeroKitConfig } from '../../frontend/js/config-validator.js';
import { assertPrivacySafe, PRIVACY_GUARD_VERSION } from './privacy-guard.mjs';

export const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses';
export const DEFAULT_MODEL = 'gpt-5.6';

export function sha256(value) {
  return createHash('sha256').update(value, 'utf8').digest('hex');
}

export function buildGenerationRequest({ prompt, requirements, model = DEFAULT_MODEL }) {
  const privacy = assertPrivacySafe(requirements, 'requirements');
  return {
    privacy,
    body: {
      model,
      store: false,
      reasoning: { effort: 'medium' },
      input: [
        {
          role: 'developer',
          content: `${prompt}\n\nAPI OUTPUT OVERRIDE:\nReturn exactly one JSON object and no Markdown or commentary. The object must be the requested ZeroKit configuration.`,
        },
        {
          role: 'user',
          content: `SANITIZED DEVELOPER REQUIREMENTS:\n\n${requirements}`,
        },
      ],
      text: { format: { type: 'json_object' } },
    },
  };
}

export function extractOutputText(response) {
  if (typeof response?.output_text === 'string' && response.output_text.trim()) {
    return response.output_text;
  }
  for (const item of response?.output ?? []) {
    for (const content of item?.content ?? []) {
      if (content?.type === 'output_text' && typeof content.text === 'string') return content.text;
      if (typeof content?.text === 'string') return content.text;
    }
  }
  throw new Error('OpenAI response did not contain output text.');
}

export function validateGeneratedConfig(config) {
  const base = validateZeroKitConfig(config);
  const errors = [...base.errors];
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

export async function generateConfigWithGPT56({
  apiKey,
  prompt,
  requirements,
  model = DEFAULT_MODEL,
  fetchImpl = fetch,
}) {
  if (!apiKey) throw new Error('OPENAI_API_KEY is required for a live generation.');
  const { body, privacy } = buildGenerationRequest({ prompt, requirements, model });
  const response = await fetchImpl(OPENAI_RESPONSES_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let errorCode = 'unknown_error';
    try {
      const payload = await response.json();
      if (typeof payload?.error?.code === 'string') errorCode = payload.error.code;
      else if (typeof payload?.error?.type === 'string') errorCode = payload.error.type;
    } catch {
      // Intentionally omit raw response bodies: invalid-request errors can echo submitted values.
    }
    throw new Error(`OpenAI Responses API failed (${response.status}, ${errorCode}).`);
  }

  const apiResponse = await response.json();
  const outputText = extractOutputText(apiResponse);
  const config = JSON.parse(outputText);
  const validation = validateGeneratedConfig(config);
  if (!validation.valid) {
    throw new Error(`GPT-5.6 output failed local validation: ${validation.errors.join(' | ')}`);
  }

  return { apiResponse, body, config, outputText, privacy, validation };
}

export function buildGenerationManifest({ apiResponse, modelRequested, prompt, requirements, outputText, privacy, validation }) {
  const createdAt = Number.isFinite(apiResponse?.created_at)
    ? new Date(apiResponse.created_at * 1000).toISOString()
    : new Date().toISOString();
  return {
    evidence_version: 1,
    provider: 'OpenAI Responses API',
    response_id: apiResponse?.id ?? null,
    model_requested: modelRequested,
    model_returned: apiResponse?.model ?? null,
    created_at: createdAt,
    storage_requested: false,
    reasoning_effort: 'medium',
    response_format: 'json_object',
    hashes: {
      prompt_sha256: sha256(prompt),
      requirements_sha256: sha256(requirements),
      output_sha256: sha256(outputText),
    },
    privacy_guard: {
      version: PRIVACY_GUARD_VERSION,
      blocking_findings: privacy.blockers.length,
      review_findings: privacy.reviewItems.length,
      human_review_required: true,
    },
    validation: {
      valid: validation.valid,
      warnings: validation.warnings,
      stats: validation.stats,
    },
    usage: apiResponse?.usage ?? null,
    note: 'The manifest intentionally excludes the API key, prompt contents, requirements contents, and model reasoning.',
  };
}
