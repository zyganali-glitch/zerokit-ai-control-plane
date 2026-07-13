#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { createConfigPreview } from '../../frontend/js/config-preview-model.js';
import { validateConfigFile } from './validate-config.mjs';

function table(rows, headers) {
  const head = `| ${headers.join(' | ')} |`;
  const separator = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.length
    ? rows.map((row) => `| ${row.map((cell) => String(cell).replace(/\|/g, '\\|')).join(' | ')} |`)
    : [`| ${headers.map((_, index) => index === 0 ? 'None' : '—').join(' | ')} |`];
  return [head, separator, ...body].join('\n');
}

function buildReport(source, preview, validation) {
  return `# Generated ZeroKit Demo Report

- Source: \`${source}\`
- Validation: **${validation.valid ? 'PASS' : 'FAIL'}**
- Generated: ${new Date().toISOString()}

## Enabled panels

${table(preview.enabledPanels.map((panel) => [panel.slug, panel.group, panel.order]), ['Panel', 'Group', 'Order'])}

## Hidden panels

${table(preview.hiddenPanels.map((panel) => [panel.slug, panel.group]), ['Panel', 'Group'])}

## Roles

${table(preview.roles.map((role) => [role.slug, role.permissionCount]), ['Role', 'Permissions'])}

## Endpoint mappings

${table(preview.endpoints.map((endpoint) => [endpoint.key, `\`${endpoint.path}\``]), ['Key', 'Path'])}

## Fields and options

${table(preview.fields.map((field) => [`${field.panel}.${field.key}`, field.optionCount]), ['Field registry key', 'Entries/options'])}

## Privacy notes

${preview.privacyNotes.length ? preview.privacyNotes.map((note) => `- ${note}`).join('\n') : '- No privacy notes supplied.'}

## Validation details

${validation.errors.length ? validation.errors.map((error) => `- FAIL: ${error}`).join('\n') : '- PASS: required registry structure and basic types are valid.'}
${validation.warnings.map((warning) => `- WARN: ${warning}`).join('\n')}
`;
}

function workspacePath(filePath) {
  const result = relative(process.cwd(), filePath).replaceAll('\\', '/');
  if (!result || result.startsWith('../') || isAbsolute(result)) {
    throw new Error(`Report source must stay inside the workspace: ${filePath}`);
  }
  return result;
}

async function main() {
  const sourceArg = process.argv[2];
  const output = resolve(process.argv[3] || 'ai-buildweek/reports/generated-demo-report.md');
  if (!sourceArg) {
    console.error('Usage: node ai-buildweek/scripts/generate-demo-report.mjs <config.json> [output.md]');
    process.exitCode = 2;
    return;
  }

  const { absolutePath, config, result } = await validateConfigFile(sourceArg);
  const preview = createConfigPreview(config, result);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, buildReport(workspacePath(absolutePath), preview, result), 'utf8');
  console.log(`${result.valid ? 'PASS' : 'FAIL'} Wrote ${workspacePath(output)}`);
  if (!result.valid) process.exitCode = 1;
}

try {
  await main();
} catch (error) {
  console.error(`FAIL ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
