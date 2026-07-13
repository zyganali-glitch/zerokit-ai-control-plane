import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import test from 'node:test';
import { validateZeroKitConfig } from '../../frontend/js/config-validator.js';

const scenarios = ['school-saas', 'healthcare-saas', 'agency-saas'];

for (const scenario of scenarios) {
  test(`${scenario} generated config passes the shared validator`, async () => {
    const source = resolve('ai-buildweek', 'examples', `${scenario}.generated.config.json`);
    const config = JSON.parse(await readFile(source, 'utf8'));
    const result = validateZeroKitConfig(config);
    assert.equal(result.valid, true, result.errors.join('\n'));
    assert.equal(result.warnings.length, 0);
    assert.ok(result.stats.panels >= 8);
    assert.ok(result.stats.roles >= 4);
    assert.ok(result.stats.endpoints >= 7);
  });
}

test('validator reports malformed panels, roles, fields, and endpoints together', () => {
  const result = validateZeroKitConfig({
    panel_registry: { users: { enabled: 'yes', order: 'first' } },
    rbac_registry: { roles: [{ slug: '', permissions: null }] },
    field_registry: { users: [] },
    endpoint_map: { users: '' },
  });
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => error.includes('panel_registry.users.enabled')));
  assert.ok(result.errors.some((error) => error.includes('rbac_registry.roles[0].slug')));
  assert.ok(result.errors.some((error) => error.includes('field_registry.users')));
  assert.ok(result.errors.some((error) => error.includes('endpoint_map.users')));
  assert.ok(result.warnings.some((warning) => warning.includes('privacy_notes')));
});

test('validator warns about non-root-relative endpoint strategies without rejecting them', () => {
  const result = validateZeroKitConfig({
    panel_registry: {},
    rbac_registry: { roles: [{ slug: 'owner', permissions: '*' }] },
    field_registry: {},
    endpoint_map: { users: 'https://adapter.example.test/users' },
    privacy_notes: ['Synthetic contracts only.'],
  });
  assert.equal(result.valid, true);
  assert.equal(result.warnings.length, 1);
});

