import assert from 'node:assert/strict';
import test from 'node:test';
import { createConfigPreview, resolvePreviewOptions } from '../../frontend/js/config-preview-model.js';

test('preview separates enabled and hidden panels and sorts by order', () => {
  const config = {
    panel_registry: {
      reports: { enabled: true, visible: true, order: 20, group: 'ops' },
      users: { enabled: true, visible: true, order: 10, group: 'people' },
      billing: { enabled: false, visible: false, order: 30, group: 'money' },
    },
    rbac_registry: { roles: [{ slug: 'owner', permissions: '*' }, { slug: 'viewer', permissions: ['report:read'] }] },
    field_registry: { reports: { report_types: ['overview', 'cohort'] } },
    endpoint_map: { reports: '/reports' },
    privacy_notes: ['No production data.'],
  };
  const preview = createConfigPreview(config, { valid: true, errors: [], warnings: [] });
  assert.deepEqual(preview.enabledPanels.map((panel) => panel.slug), ['users', 'reports']);
  assert.deepEqual(preview.hiddenPanels.map((panel) => panel.slug), ['billing']);
  assert.deepEqual(preview.roles.map((role) => role.permissionCount), ['all', 1]);
  assert.equal(preview.fields[0].optionCount, 2);
});

test('preview keeps validation evidence and privacy notes visible', () => {
  const preview = createConfigPreview({ privacy_notes: ['Synthetic only.'] }, {
    valid: false,
    errors: ['Missing registries.'],
    warnings: ['Review boundary.'],
  });
  assert.equal(preview.valid, false);
  assert.deepEqual(preview.errors, ['Missing registries.']);
  assert.deepEqual(preview.warnings, ['Review boundary.']);
  assert.deepEqual(preview.privacyNotes, ['Synthetic only.']);
});

test('preview URL options accept only known locale, theme, and synthetic scenario values', () => {
  assert.deepEqual(
    resolvePreviewOptions('?lang=tr&theme=light&scenario=healthcare-saas'),
    { locale: 'tr', theme: 'light', scenario: 'healthcare-saas' },
  );
  assert.deepEqual(
    resolvePreviewOptions('?lang=de&theme=neon&scenario=../../private'),
    { locale: 'en', theme: 'dark', scenario: 'school-saas' },
  );
});
