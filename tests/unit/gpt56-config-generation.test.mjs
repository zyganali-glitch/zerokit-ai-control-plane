import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildGenerationManifest,
  buildGenerationRequest,
  extractOutputText,
  generateConfigWithGPT56,
  validateGeneratedConfig,
} from '../../ai-buildweek/lib/gpt56-config-generation.mjs';

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

test('generation request uses GPT-5.6, disables storage, and requests JSON', () => {
  const { body, privacy } = buildGenerationRequest({ prompt: 'Create config.', requirements: 'Synthetic roles only.' });
  assert.equal(body.model, 'gpt-5.6');
  assert.equal(body.store, false);
  assert.equal(body.text.format.type, 'json_object');
  assert.equal(privacy.safeToSend, true);
});

test('output text extractor supports Responses API content items', () => {
  assert.equal(extractOutputText({ output: [{ content: [{ type: 'output_text', text: '{"ok":true}' }] }] }), '{"ok":true}');
  assert.throws(() => extractOutputText({ output: [] }), /did not contain output text/);
});

test('generated artifact gate requires version, brand, privacy, and test checklist', () => {
  const invalid = validateGeneratedConfig({
    panel_registry: {},
    rbac_registry: { roles: [{ slug: 'owner', permissions: '*' }] },
    field_registry: {},
    endpoint_map: {},
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.some((error) => error.startsWith('version')));
  assert.ok(invalid.errors.some((error) => error.startsWith('brand_config')));
  assert.ok(invalid.errors.some((error) => error.startsWith('privacy_notes')));
  assert.ok(invalid.errors.some((error) => error.startsWith('test_checklist')));
});

test('mocked GPT-5.6 response is validated and produces secret-free evidence', async () => {
  const apiResponse = {
    id: 'resp_demo_01',
    model: 'gpt-5.6-sol',
    created_at: 1783900800,
    output: [{ content: [{ type: 'output_text', text: JSON.stringify(validConfig) }] }],
    usage: { input_tokens: 100, output_tokens: 50, total_tokens: 150 },
  };
  const fetchImpl = async (_url, options) => {
    assert.match(options.headers.Authorization, /^Bearer /u);
    assert.equal(JSON.parse(options.body).store, false);
    return { ok: true, json: async () => apiResponse };
  };
  const result = await generateConfigWithGPT56({
    apiKey: 'test-key-never-written',
    prompt: 'Create config.',
    requirements: 'Synthetic school roles.',
    fetchImpl,
  });
  assert.equal(result.validation.valid, true);
  const manifest = buildGenerationManifest({
    ...result,
    modelRequested: 'gpt-5.6',
    prompt: 'Create config.',
    requirements: 'Synthetic school roles.',
  });
  assert.equal(manifest.storage_requested, false);
  assert.equal(manifest.model_returned, 'gpt-5.6-sol');
  assert.doesNotMatch(JSON.stringify(manifest), /test-key-never-written/u);
  assert.equal(manifest.hashes.output_sha256.length, 64);
});

test('API failures expose status/code but never echo a raw response body', async () => {
  const fetchImpl = async () => ({
    ok: false,
    status: 400,
    json: async () => ({ error: { code: 'invalid_request', message: 'echoed-secret-value' } }),
  });
  await assert.rejects(
    generateConfigWithGPT56({
      apiKey: 'test-key',
      prompt: 'Create config.',
      requirements: 'Synthetic school roles.',
      fetchImpl,
    }),
    (error) => {
      assert.match(error.message, /400, invalid_request/u);
      assert.doesNotMatch(error.message, /echoed-secret-value/u);
      return true;
    },
  );
});
