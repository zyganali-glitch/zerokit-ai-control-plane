const REQUIRED_OBJECT_SECTIONS = [
  'panel_registry',
  'rbac_registry',
  'field_registry',
  'endpoint_map',
];

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function addTypeError(errors, path, expected) {
  errors.push(`${path} must be ${expected}.`);
}

export function validateZeroKitConfig(config) {
  const errors = [];
  const warnings = [];

  if (!isPlainObject(config)) {
    return {
      valid: false,
      errors: ['Config root must be a JSON object.'],
      warnings,
      stats: { panels: 0, roles: 0, fields: 0, endpoints: 0 },
    };
  }

  for (const section of REQUIRED_OBJECT_SECTIONS) {
    if (!isPlainObject(config[section])) {
      addTypeError(errors, section, 'an object');
    }
  }

  if (isPlainObject(config.panel_registry)) {
    for (const [panelId, panel] of Object.entries(config.panel_registry)) {
      const path = `panel_registry.${panelId}`;
      if (!isPlainObject(panel)) {
        addTypeError(errors, path, 'an object');
        continue;
      }
      for (const flag of ['enabled', 'visible']) {
        if (flag in panel && typeof panel[flag] !== 'boolean') {
          addTypeError(errors, `${path}.${flag}`, 'a boolean');
        }
      }
      if ('order' in panel && (typeof panel.order !== 'number' || !Number.isFinite(panel.order))) {
        addTypeError(errors, `${path}.order`, 'a finite number');
      }
      if ('group' in panel && !isNonEmptyString(panel.group)) {
        addTypeError(errors, `${path}.group`, 'a non-empty string');
      }
    }
  }

  const roles = isPlainObject(config.rbac_registry) ? config.rbac_registry.roles : undefined;
  if (!Array.isArray(roles) || roles.length === 0) {
    errors.push('rbac_registry.roles must be a non-empty array.');
  } else {
    const slugs = new Set();
    roles.forEach((role, index) => {
      const path = `rbac_registry.roles[${index}]`;
      if (!isPlainObject(role)) {
        addTypeError(errors, path, 'an object');
        return;
      }
      if (!isNonEmptyString(role.slug)) {
        addTypeError(errors, `${path}.slug`, 'a non-empty string');
      } else if (slugs.has(role.slug)) {
        errors.push(`${path}.slug duplicates role "${role.slug}".`);
      } else {
        slugs.add(role.slug);
      }
      const permissionsValid = role.permissions === '*'
        || (Array.isArray(role.permissions)
          && role.permissions.every(isNonEmptyString));
      if (!permissionsValid) {
        errors.push(`${path}.permissions must be "*" or an array of non-empty strings.`);
      }
    });
  }

  if (isPlainObject(config.field_registry)) {
    for (const [panelId, fields] of Object.entries(config.field_registry)) {
      if (!isPlainObject(fields)) {
        addTypeError(errors, `field_registry.${panelId}`, 'an object');
      }
    }
  }

  if (isPlainObject(config.endpoint_map)) {
    for (const [key, endpoint] of Object.entries(config.endpoint_map)) {
      if (!isNonEmptyString(endpoint)) {
        addTypeError(errors, `endpoint_map.${key}`, 'a non-empty string');
      } else if (!endpoint.startsWith('/')) {
        warnings.push(`endpoint_map.${key} does not start with "/"; verify the adapter base URL strategy.`);
      }
    }
  }

  if (!Array.isArray(config.privacy_notes) || config.privacy_notes.length === 0) {
    warnings.push('privacy_notes is missing or empty; document the AI/runtime boundary before applying this config.');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    stats: {
      panels: isPlainObject(config.panel_registry) ? Object.keys(config.panel_registry).length : 0,
      roles: Array.isArray(roles) ? roles.length : 0,
      fields: isPlainObject(config.field_registry) ? Object.keys(config.field_registry).length : 0,
      endpoints: isPlainObject(config.endpoint_map) ? Object.keys(config.endpoint_map).length : 0,
    },
  };
}

export function formatValidationReport(result, sourceLabel = 'config') {
  const lines = [
    `${result.valid ? 'PASS' : 'FAIL'} ${sourceLabel}`,
    `  panels: ${result.stats.panels}`,
    `  roles: ${result.stats.roles}`,
    `  field groups: ${result.stats.fields}`,
    `  endpoints: ${result.stats.endpoints}`,
  ];
  for (const error of result.errors) lines.push(`  ERROR: ${error}`);
  for (const warning of result.warnings) lines.push(`  WARN: ${warning}`);
  return lines.join('\n');
}
