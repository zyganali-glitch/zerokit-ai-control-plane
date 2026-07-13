function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function countFieldOptions(value) {
  if (Array.isArray(value)) return value.length;
  if (isPlainObject(value) && Array.isArray(value.options)) return value.options.length;
  if (isPlainObject(value)) return Object.keys(value).length;
  return value === undefined ? 0 : 1;
}

export function resolvePreviewOptions(search = '') {
  const params = new URLSearchParams(search);
  const locale = params.get('lang') === 'tr' ? 'tr' : 'en';
  const theme = params.get('theme') === 'light' ? 'light' : 'dark';
  const allowedScenarios = new Set(['school-saas', 'healthcare-saas', 'agency-saas']);
  const requestedScenario = params.get('scenario');
  return {
    locale,
    theme,
    scenario: allowedScenarios.has(requestedScenario) ? requestedScenario : 'school-saas',
  };
}

export function createConfigPreview(config, validation) {
  const panels = Object.entries(config.panel_registry || {})
    .map(([slug, entry]) => ({
      slug,
      enabled: entry?.enabled !== false && entry?.visible !== false,
      order: Number.isFinite(entry?.order) ? entry.order : Number.MAX_SAFE_INTEGER,
      group: entry?.group || 'ungrouped',
    }))
    .sort((left, right) => left.order - right.order || left.slug.localeCompare(right.slug));

  const roles = Array.isArray(config.rbac_registry?.roles)
    ? config.rbac_registry.roles.map((role) => ({
      slug: role.slug,
      permissionCount: role.permissions === '*' ? 'all' : role.permissions.length,
    }))
    : [];

  const endpoints = Object.entries(config.endpoint_map || {})
    .map(([key, path]) => ({ key, path }))
    .sort((left, right) => left.key.localeCompare(right.key));

  const fields = Object.entries(config.field_registry || {})
    .flatMap(([panel, entry]) => Object.entries(entry || {}).map(([key, value]) => ({
      panel,
      key,
      optionCount: countFieldOptions(value),
    })))
    .sort((left, right) => `${left.panel}.${left.key}`.localeCompare(`${right.panel}.${right.key}`));

  return {
    valid: validation.valid,
    enabledPanels: panels.filter((panel) => panel.enabled),
    hiddenPanels: panels.filter((panel) => !panel.enabled),
    roles,
    endpoints,
    fields,
    privacyNotes: Array.isArray(config.privacy_notes) ? config.privacy_notes : [],
    errors: validation.errors,
    warnings: validation.warnings,
  };
}
