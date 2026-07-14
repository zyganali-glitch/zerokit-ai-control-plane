export function buildPreviewUrl(pageUrl) {
  const source = new URL(pageUrl);
  const target = new URL('./frontend/pages/ai-config-preview.html', source);
  target.search = source.search;
  return target;
}

export function buildSampleUrl(scenario, moduleUrl) {
  return new URL(`../../ai-buildweek/examples/${encodeURIComponent(scenario)}.generated.config.json`, moduleUrl);
}
