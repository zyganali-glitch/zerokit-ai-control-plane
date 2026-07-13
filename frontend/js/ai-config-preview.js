import { createConfigPreview, resolvePreviewOptions } from './config-preview-model.js';
import { validateZeroKitConfig } from './config-validator.js';

const COPY = {
  en: {
    page_title: 'ZeroKit AI Control Plane — Local Preview', skip: 'Skip to config input', controls_nav: 'Preview controls', theme_light: 'Light theme', theme_dark: 'Dark theme',
    edition: 'Public Build Week judging edition', title: 'Turn a SaaS idea into a reviewable control-plane contract.',
    tagline: 'Preview panels, roles, fields, and endpoint mappings generated with Codex + GPT-5.6—without sending production customer data to AI.',
    privacy_title: 'Local privacy boundary', privacy_body: ' Pasted configuration stays in this browser tab. This page makes no external request.',
    input_heading: 'Load or paste a generated config', input_help: 'Use a bundled synthetic scenario, choose a local JSON file, or paste JSON. Review before applying.',
    scenario_label: 'Synthetic scenario', scenario_school: 'School SaaS', scenario_healthcare: 'Healthcare SaaS', scenario_agency: 'Agency SaaS',
    load_sample: 'Load sample', choose_file: 'Choose local JSON', config_label: 'Generated ZeroKit config JSON', config_placeholder: 'Paste generated JSON here',
    validate: 'Validate locally', clear: 'Clear', status_idle: 'Waiting for a config', status_loading: 'Loading synthetic sample…',
    status_pass: 'PASS — config is structurally valid', status_fail: 'FAIL — review the errors below', status_parse: 'FAIL — JSON could not be parsed',
    results_heading: 'Review the generated control plane', results_help: 'Counts are a projection of configuration intent, not a claim that a customer backend already matches every payload contract.',
    summary_label: 'Configuration summary', enabled_panels: 'Enabled panels', hidden_panels: 'Hidden panels', roles: 'Roles', endpoints: 'Endpoint mappings',
    panel_map: 'Panel map', role_model: 'RBAC roles', endpoint_map: 'Endpoint map', field_map: 'Fields and options', warnings: 'Warnings and privacy notes',
    permission_all: 'all permissions', permission_count: 'permissions', option_count: 'entries/options', no_items: 'None configured',
    footer: 'Configuration is reviewed before use. Runtime data and authorization remain on your infrastructure.', local_file_error: 'The local file could not be read.', sample_error: 'The bundled sample could not be loaded.',
  },
  tr: {
    page_title: 'ZeroKit AI Control Plane — Yerel Önizleme', skip: 'Config girişine geç', controls_nav: 'Önizleme kontrolleri', theme_light: 'Açık tema', theme_dark: 'Koyu tema',
    edition: 'Herkese açık Build Week jüri sürümü', title: 'SaaS fikrini incelenebilir bir kontrol düzlemi sözleşmesine dönüştür.',
    tagline: 'Codex + GPT-5.6 ile üretilen panel, rol, alan ve endpoint eşlemelerini üretim müşteri verisini yapay zekâya göndermeden önizle.',
    privacy_title: 'Yerel gizlilik sınırı', privacy_body: ' Yapıştırılan config bu tarayıcı sekmesinde kalır. Bu sayfa harici istek yapmaz.',
    input_heading: 'Üretilen config’i yükle veya yapıştır', input_help: 'Paketli sentetik bir senaryo, yerel JSON dosyası veya yapıştırılmış JSON kullan. Uygulamadan önce incele.',
    scenario_label: 'Sentetik senaryo', scenario_school: 'Okul SaaS', scenario_healthcare: 'Sağlık SaaS', scenario_agency: 'Ajans SaaS',
    load_sample: 'Örneği yükle', choose_file: 'Yerel JSON seç', config_label: 'Üretilen ZeroKit config JSON’u', config_placeholder: 'Üretilen JSON’u buraya yapıştır',
    validate: 'Yerelde doğrula', clear: 'Temizle', status_idle: 'Config bekleniyor', status_loading: 'Sentetik örnek yükleniyor…',
    status_pass: 'PASS — config yapısal olarak geçerli', status_fail: 'FAIL — aşağıdaki hataları incele', status_parse: 'FAIL — JSON ayrıştırılamadı',
    results_heading: 'Üretilen kontrol düzlemini incele', results_help: 'Sayılar config niyetinin izdüşümüdür; müşteri backend’inin her payload sözleşmesiyle zaten eşleştiği iddiası değildir.',
    summary_label: 'Config özeti', enabled_panels: 'Etkin paneller', hidden_panels: 'Gizli paneller', roles: 'Roller', endpoints: 'Endpoint eşlemeleri',
    panel_map: 'Panel haritası', role_model: 'RBAC rolleri', endpoint_map: 'Endpoint haritası', field_map: 'Alanlar ve seçenekler', warnings: 'Uyarılar ve gizlilik notları',
    permission_all: 'tüm izinler', permission_count: 'izin', option_count: 'kayıt/seçenek', no_items: 'Yapılandırılmadı',
    footer: 'Config kullanımdan önce incelenir. Runtime verisi ve yetkilendirme kendi altyapınızda kalır.', local_file_error: 'Yerel dosya okunamadı.', sample_error: 'Paketli örnek yüklenemedi.',
  },
};

const elements = Object.fromEntries([
  'languageButton', 'themeButton', 'sampleSelect', 'loadSampleButton', 'fileInput', 'configInput', 'validateButton', 'clearButton',
  'status', 'results', 'enabledCount', 'hiddenCount', 'roleCount', 'endpointCount', 'panelList', 'roleList', 'endpointList', 'fieldList', 'warningList',
].map((id) => [id, document.getElementById(id)]));

const initialOptions = resolvePreviewOptions(window.location.search);
let locale = initialOptions.locale;
let lastPreview = null;

function t(key) { return COPY[locale][key] || COPY.en[key] || key; }

function applyCopy() {
  document.documentElement.lang = locale;
  document.title = t('page_title');
  document.querySelectorAll('[data-i18n]').forEach((node) => { node.textContent = t(node.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => { node.placeholder = t(node.dataset.i18nPlaceholder); });
  document.querySelectorAll('[data-i18n-aria]').forEach((node) => { node.setAttribute('aria-label', t(node.dataset.i18nAria)); });
  elements.languageButton.textContent = locale === 'en' ? 'TR' : 'EN';
  elements.themeButton.textContent = t(document.documentElement.dataset.theme === 'dark' ? 'theme_light' : 'theme_dark');
  if (lastPreview) renderPreview(lastPreview);
}

function clearNode(node) { node.replaceChildren(); }

function message(text, className = 'message') {
  const item = document.createElement('p');
  item.className = className;
  item.textContent = text;
  return item;
}

function renderRows(node, rows, render) {
  clearNode(node);
  if (!rows.length) node.append(message(t('no_items')));
  rows.forEach((row) => node.append(render(row)));
}

function renderPreview(preview) {
  lastPreview = preview;
  elements.results.hidden = false;
  elements.enabledCount.textContent = String(preview.enabledPanels.length);
  elements.hiddenCount.textContent = String(preview.hiddenPanels.length);
  elements.roleCount.textContent = String(preview.roles.length);
  elements.endpointCount.textContent = String(preview.endpoints.length);

  renderRows(elements.panelList, [...preview.enabledPanels, ...preview.hiddenPanels], (panel) => {
    const chip = document.createElement('span');
    chip.className = `chip ${panel.enabled ? 'enabled' : 'hidden'}`;
    chip.textContent = panel.slug;
    return chip;
  });
  renderRows(elements.roleList, preview.roles, (role) => {
    const row = document.createElement('div'); row.className = 'list-row';
    const slug = document.createElement('span'); slug.textContent = role.slug;
    const count = document.createElement('small'); count.textContent = role.permissionCount === 'all' ? t('permission_all') : `${role.permissionCount} ${t('permission_count')}`;
    row.append(slug, count); return row;
  });
  renderRows(elements.endpointList, preview.endpoints, (endpoint) => {
    const row = document.createElement('div'); row.className = 'endpoint-row';
    const key = document.createElement('span'); key.textContent = endpoint.key;
    const path = document.createElement('code'); path.textContent = endpoint.path;
    row.append(key, path); return row;
  });
  renderRows(elements.fieldList, preview.fields, (field) => {
    const row = document.createElement('div'); row.className = 'list-row';
    const key = document.createElement('span'); key.textContent = `${field.panel}.${field.key}`;
    const count = document.createElement('small'); count.textContent = `${field.optionCount} ${t('option_count')}`;
    row.append(key, count); return row;
  });

  clearNode(elements.warningList);
  preview.errors.forEach((item) => elements.warningList.append(message(item, 'message error')));
  preview.warnings.forEach((item) => elements.warningList.append(message(item, 'message warning')));
  preview.privacyNotes.forEach((item) => elements.warningList.append(message(item, 'message privacy')));
  if (!elements.warningList.childElementCount) elements.warningList.append(message(t('no_items')));
}

function validateInput() {
  try {
    const config = JSON.parse(elements.configInput.value);
    const validation = validateZeroKitConfig(config);
    renderPreview(createConfigPreview(config, validation));
    elements.status.className = `status ${validation.valid ? 'pass' : 'fail'}`;
    elements.status.textContent = t(validation.valid ? 'status_pass' : 'status_fail');
  } catch (error) {
    const validation = { valid: false, errors: [error instanceof Error ? error.message : String(error)], warnings: [] };
    renderPreview(createConfigPreview({}, validation));
    elements.status.className = 'status fail';
    elements.status.textContent = t('status_parse');
  }
}

async function loadSample() {
  elements.status.className = 'status idle'; elements.status.textContent = t('status_loading');
  try {
    const scenario = elements.sampleSelect.value;
    const response = await fetch(`/ai-buildweek/examples/${scenario}.generated.config.json`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    elements.configInput.value = JSON.stringify(await response.json(), null, 2);
    validateInput();
  } catch (_) {
    elements.status.className = 'status fail'; elements.status.textContent = t('sample_error');
  }
}

elements.languageButton.addEventListener('click', () => { locale = locale === 'en' ? 'tr' : 'en'; applyCopy(); });
elements.themeButton.addEventListener('click', () => {
  document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; applyCopy();
});
elements.loadSampleButton.addEventListener('click', loadSample);
elements.validateButton.addEventListener('click', validateInput);
elements.clearButton.addEventListener('click', () => {
  elements.configInput.value = ''; elements.results.hidden = true; lastPreview = null;
  elements.status.className = 'status idle'; elements.status.textContent = t('status_idle'); elements.configInput.focus();
});
elements.fileInput.addEventListener('change', async () => {
  const [file] = elements.fileInput.files || [];
  if (!file) return;
  try { elements.configInput.value = await file.text(); validateInput(); }
  catch (_) { elements.status.className = 'status fail'; elements.status.textContent = t('local_file_error'); }
});

document.documentElement.dataset.theme = initialOptions.theme;
elements.sampleSelect.value = initialOptions.scenario;
applyCopy();
void loadSample();
