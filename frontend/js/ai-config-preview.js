import { createConfigPreview, resolvePreviewOptions } from './config-preview-model.js';
import { validateZeroKitConfig } from './config-validator.js';
import { buildSampleUrl } from './static-paths.js';

const COPY = {
  en: {
    page_title: 'ZeroKit AI Control Plane — Local Preview', skip: 'Skip to config input', controls_nav: 'Preview controls', theme_light: 'Light theme', theme_dark: 'Dark theme',
    workspace_nav: 'Workspace navigation', open_menu: 'Open navigation menu', nav_workspace: 'Workspace', nav_overview: 'Overview', nav_contract: 'Contract workspace', nav_evidence: 'Validation evidence',
    environment: 'Local environment', network: 'Network', local_only: 'Local only', data: 'Data', synthetic: 'Synthetic', mode: 'Mode', review_mode: 'Review', sidebar_privacy: 'No credentials. No customer data. No model API.',
    synthetic_sample: 'Synthetic sample', disclosure_body: 'Bundled configs demonstrate the workflow. Competition evidence comes from a fresh, visible Codex run and deterministic validation.', active_workspace: 'Active workspace', no_external_requests: 'No external requests',
    edition: 'OpenAI Build Week · Developer Tools entry', title: 'A reviewable control plane, before runtime.',
    tagline: 'Transform synthetic SaaS requirements into a bounded configuration contract with GPT-5.6 in Codex, then verify every claim locally.', inspect_contract: 'Inspect contract', view_evidence: 'View evidence path',
    assurance_summary: 'Assurance summary', assurance_label: 'Control assurance', ready_review: 'Ready for review', assurance_privacy: 'Privacy preflight defined', assurance_schema: 'Schema gate active', assurance_human: 'Human approval required', assurance_note: 'Workflow controls are present; this is not a backend compatibility claim.',
    privacy_title: 'Local privacy boundary', privacy_body: ' Pasted configuration stays in this browser tab. This page makes no external request.',
    workflow_label: 'Evidence workflow', workflow_heading: 'From idea to auditable contract', three_gates: '3 controlled gates', evidence_path_label: 'Build Week evidence path',
    contract_label: 'Contract workspace', input_heading: 'Inspect the generated configuration', input_help: 'Use a bundled synthetic scenario, choose a local JSON file, or paste JSON. Review before applying.', browser_memory: 'Browser memory only',
    scenario_label: 'Synthetic scenario', scenario_school: 'School SaaS', scenario_healthcare: 'Healthcare SaaS', scenario_agency: 'Agency SaaS',
    load_sample: 'Load sample', choose_file: 'Choose local JSON', config_label: 'Generated ZeroKit config JSON', config_placeholder: 'Paste generated JSON here',
    validate: 'Validate locally', clear: 'Clear', status_idle: 'Waiting for a config', status_loading: 'Loading synthetic sample…',
    status_pass: 'PASS — config is structurally valid', status_fail: 'FAIL — review the errors below', status_parse: 'FAIL — JSON could not be parsed',
    validation_state: 'Validation state', execution: 'Execution', client_side: 'Client-side', retention: 'Retention', none: 'None', apply_state: 'Apply state', not_applied: 'Not applied',
    evidence_label: 'Validation evidence', results_heading: 'Review the projected control plane', results_help: 'Counts are a projection of configuration intent, not a claim that a customer backend already matches every payload contract.', structure_valid: 'Structure valid', structure_invalid: 'Review required',
    summary_label: 'Configuration summary', enabled_panels: 'Enabled panels', hidden_panels: 'Hidden panels', roles: 'Roles', endpoints: 'Endpoint mappings',
    panel_map: 'Panel map', role_model: 'RBAC roles', endpoint_map: 'Endpoint map', field_map: 'Fields and options', warnings: 'Warnings and privacy notes',
    registry: 'Registry', access_control: 'Access control', adapter_contract: 'Adapter contract', configuration: 'Configuration', review_notes: 'Review notes',
    permission_all: 'all permissions', permission_count: 'permissions', option_count: 'entries/options', no_items: 'None configured',
    proof_preflight: 'Local preflight', proof_preflight_body: 'Sensitive patterns are blocked before a bounded Codex task is prepared.',
    proof_model: 'GPT-5.6 in Codex', proof_model_body: 'The selected model turns synthetic requirements into a reviewable JSON contract.',
    proof_validation: 'Deterministic gates', proof_validation_body: 'Schema, privacy, adapter, and browser checks report honest PASS or FAIL evidence.',
    evidence_boundary: 'Evidence boundary', evidence_boundary_body: 'Bundled scenarios are synthetic examples. Final competition evidence requires a fresh visible GPT-5.6 Codex run, human review, validation, and a hash manifest.',
    footer: 'Configuration is reviewed before use. Runtime data and authorization remain on your infrastructure.', buildweek_edition: 'Build Week judging edition', local_file_error: 'The local file could not be read.', sample_error: 'The bundled sample could not be loaded.',
  },
  tr: {
    page_title: 'ZeroKit AI Control Plane — Yerel Önizleme', skip: 'Config girişine geç', controls_nav: 'Önizleme kontrolleri', theme_light: 'Açık tema', theme_dark: 'Koyu tema',
    workspace_nav: 'Çalışma alanı menüsü', open_menu: 'Gezinme menüsünü aç', nav_workspace: 'Çalışma alanı', nav_overview: 'Genel bakış', nav_contract: 'Sözleşme alanı', nav_evidence: 'Doğrulama kanıtı',
    environment: 'Yerel ortam', network: 'Ağ', local_only: 'Yalnızca yerel', data: 'Veri', synthetic: 'Sentetik', mode: 'Mod', review_mode: 'İnceleme', sidebar_privacy: 'Kimlik bilgisi yok. Müşteri verisi yok. Model API’si yok.',
    synthetic_sample: 'Sentetik örnek', disclosure_body: 'Paketli config’ler iş akışını gösterir. Yarışma kanıtı görünür ve taze bir Codex çalışmasıyla belirlenimci doğrulamadan gelir.', active_workspace: 'Etkin çalışma alanı', no_external_requests: 'Harici istek yok',
    edition: 'OpenAI Build Week · Geliştirici Araçları başvurusu', title: 'Çalışma zamanından önce, incelenebilir bir kontrol düzlemi.',
    tagline: 'Sentetik SaaS gereksinimlerini Codex içindeki GPT-5.6 ile sınırlandırılmış bir config sözleşmesine dönüştür; ardından her iddiayı yerelde doğrula.', inspect_contract: 'Sözleşmeyi incele', view_evidence: 'Kanıt akışını gör',
    assurance_summary: 'Güvence özeti', assurance_label: 'Kontrol güvencesi', ready_review: 'İncelemeye hazır', assurance_privacy: 'Gizlilik ön kontrolü tanımlı', assurance_schema: 'Şema kapısı etkin', assurance_human: 'İnsan onayı zorunlu', assurance_note: 'İş akışı kontrolleri mevcut; bu, backend uyumluluğu iddiası değildir.',
    privacy_title: 'Yerel gizlilik sınırı', privacy_body: ' Yapıştırılan config bu tarayıcı sekmesinde kalır. Bu sayfa harici istek yapmaz.',
    workflow_label: 'Kanıt iş akışı', workflow_heading: 'Fikirden denetlenebilir sözleşmeye', three_gates: '3 kontrollü kapı', evidence_path_label: 'Build Week kanıt akışı',
    contract_label: 'Sözleşme çalışma alanı', input_heading: 'Üretilen config’i incele', input_help: 'Paketli sentetik bir senaryo, yerel JSON dosyası veya yapıştırılmış JSON kullan. Uygulamadan önce incele.', browser_memory: 'Yalnızca tarayıcı belleği',
    scenario_label: 'Sentetik senaryo', scenario_school: 'Okul SaaS', scenario_healthcare: 'Sağlık SaaS', scenario_agency: 'Ajans SaaS',
    load_sample: 'Örneği yükle', choose_file: 'Yerel JSON seç', config_label: 'Üretilen ZeroKit config JSON’u', config_placeholder: 'Üretilen JSON’u buraya yapıştır',
    validate: 'Yerelde doğrula', clear: 'Temizle', status_idle: 'Config bekleniyor', status_loading: 'Sentetik örnek yükleniyor…',
    status_pass: 'PASS — config yapısal olarak geçerli', status_fail: 'FAIL — aşağıdaki hataları incele', status_parse: 'FAIL — JSON ayrıştırılamadı',
    validation_state: 'Doğrulama durumu', execution: 'Çalıştırma', client_side: 'Tarayıcı tarafı', retention: 'Saklama', none: 'Yok', apply_state: 'Uygulama durumu', not_applied: 'Uygulanmadı',
    evidence_label: 'Doğrulama kanıtı', results_heading: 'Öngörülen kontrol düzlemini incele', results_help: 'Sayılar config niyetinin izdüşümüdür; müşteri backend’inin her payload sözleşmesiyle zaten eşleştiği iddiası değildir.', structure_valid: 'Yapı geçerli', structure_invalid: 'İnceleme gerekli',
    summary_label: 'Config özeti', enabled_panels: 'Etkin paneller', hidden_panels: 'Gizli paneller', roles: 'Roller', endpoints: 'Endpoint eşlemeleri',
    panel_map: 'Panel haritası', role_model: 'RBAC rolleri', endpoint_map: 'Endpoint haritası', field_map: 'Alanlar ve seçenekler', warnings: 'Uyarılar ve gizlilik notları',
    registry: 'Kayıt dizini', access_control: 'Erişim kontrolü', adapter_contract: 'Adaptör sözleşmesi', configuration: 'Yapılandırma', review_notes: 'İnceleme notları',
    permission_all: 'tüm izinler', permission_count: 'izin', option_count: 'kayıt/seçenek', no_items: 'Yapılandırılmadı',
    proof_preflight: 'Yerel ön kontrol', proof_preflight_body: 'Sınırlandırılmış Codex görevi hazırlanmadan önce hassas veri kalıpları engellenir.',
    proof_model: 'Codex içinde GPT-5.6', proof_model_body: 'Seçilen model sentetik gereksinimleri incelenebilir JSON sözleşmesine dönüştürür.',
    proof_validation: 'Belirlenimci kapılar', proof_validation_body: 'Şema, gizlilik, adaptör ve tarayıcı kontrolleri dürüst PASS veya FAIL kanıtı üretir.',
    evidence_boundary: 'Kanıt sınırı', evidence_boundary_body: 'Paketli senaryolar sentetik örneklerdir. Nihai yarışma kanıtı; görünür, taze bir GPT-5.6 Codex çalışması, insan incelemesi, doğrulama ve hash manifesti gerektirir.',
    footer: 'Config kullanımdan önce incelenir. Runtime verisi ve yetkilendirme kendi altyapınızda kalır.', buildweek_edition: 'Build Week jüri sürümü', local_file_error: 'Yerel dosya okunamadı.', sample_error: 'Paketli örnek yüklenemedi.',
  },
};

const elements = Object.fromEntries([
  'languageButton', 'themeButton', 'menuButton', 'sidebar', 'sidebarBackdrop', 'activeScenario', 'sampleSelect', 'loadSampleButton', 'fileInput', 'configInput', 'validateButton', 'clearButton',
  'status', 'statusVisual', 'statusIcon', 'results', 'resultsState', 'resultsStateText', 'enabledCount', 'hiddenCount', 'roleCount', 'endpointCount', 'panelList', 'roleList', 'endpointList', 'fieldList', 'warningList',
].map((id) => [id, document.getElementById(id)]));

const initialOptions = resolvePreviewOptions(window.location.search);
let locale = initialOptions.locale;
let lastPreview = null;
let currentValidationState = 'idle';

function t(key) { return COPY[locale][key] || COPY.en[key] || key; }

function applyCopy() {
  document.documentElement.lang = locale;
  document.title = t('page_title');
  document.querySelectorAll('[data-i18n]').forEach((node) => { node.textContent = t(node.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => { node.placeholder = t(node.dataset.i18nPlaceholder); });
  document.querySelectorAll('[data-i18n-aria]').forEach((node) => { node.setAttribute('aria-label', t(node.dataset.i18nAria)); });
  elements.languageButton.textContent = locale === 'en' ? 'TR' : 'EN';
  elements.themeButton.textContent = t(document.documentElement.dataset.theme === 'dark' ? 'theme_light' : 'theme_dark');
  updateScenarioLabel();
  setValidationState(currentValidationState);
  if (lastPreview) renderPreview(lastPreview);
}

function updateScenarioLabel() {
  const selected = elements.sampleSelect.selectedOptions[0];
  elements.activeScenario.textContent = selected?.textContent || elements.sampleSelect.value;
}

function setMenu(open) {
  document.body.classList.toggle('nav-open', open);
  elements.menuButton.setAttribute('aria-expanded', String(open));
  elements.sidebarBackdrop.hidden = !open;
}

function setValidationState(state) {
  currentValidationState = state;
  elements.statusVisual.className = `status-visual ${state}`;
  elements.statusIcon.textContent = state === 'pass' ? '✓' : state === 'fail' ? '!' : '…';
  if (state === 'pass' || state === 'fail') {
    elements.resultsState.className = `section-state ${state === 'pass' ? 'validated' : 'invalid'}`;
    elements.resultsStateText.textContent = t(state === 'pass' ? 'structure_valid' : 'structure_invalid');
  }
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
    setValidationState(validation.valid ? 'pass' : 'fail');
  } catch (error) {
    const validation = { valid: false, errors: [error instanceof Error ? error.message : String(error)], warnings: [] };
    renderPreview(createConfigPreview({}, validation));
    elements.status.className = 'status fail';
    elements.status.textContent = t('status_parse');
    setValidationState('fail');
  }
}

async function loadSample() {
  elements.status.className = 'status idle'; elements.status.textContent = t('status_loading');
  setValidationState('idle');
  try {
    const scenario = elements.sampleSelect.value;
    updateScenarioLabel();
    const response = await fetch(buildSampleUrl(scenario, import.meta.url), { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    elements.configInput.value = JSON.stringify(await response.json(), null, 2);
    validateInput();
  } catch (_) {
    elements.status.className = 'status fail'; elements.status.textContent = t('sample_error'); setValidationState('fail');
  }
}

elements.languageButton.addEventListener('click', () => { locale = locale === 'en' ? 'tr' : 'en'; applyCopy(); });
elements.themeButton.addEventListener('click', () => {
  document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; applyCopy();
});
elements.loadSampleButton.addEventListener('click', loadSample);
elements.sampleSelect.addEventListener('change', updateScenarioLabel);
elements.menuButton.addEventListener('click', () => setMenu(!document.body.classList.contains('nav-open')));
elements.sidebarBackdrop.addEventListener('click', () => setMenu(false));
const navLinks = [...elements.sidebar.querySelectorAll('a[href^="#"]')];
navLinks.forEach((link) => link.addEventListener('click', () => {
  navLinks.forEach((item) => item.classList.toggle('active', item === link));
  setMenu(false);
}));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });
const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${visible.target.id}` || (visible.target.id === 'evidencePath' && link.hash === '#overview')));
}, { rootMargin: '-20% 0px -65%', threshold: [0, 0.2, 0.6] });
document.querySelectorAll('#overview, #workspace, #results').forEach((section) => sectionObserver.observe(section));
elements.validateButton.addEventListener('click', validateInput);
elements.clearButton.addEventListener('click', () => {
  elements.configInput.value = ''; elements.results.hidden = true; lastPreview = null;
  elements.status.className = 'status idle'; elements.status.textContent = t('status_idle'); setValidationState('idle'); elements.configInput.focus();
});
elements.fileInput.addEventListener('change', async () => {
  const [file] = elements.fileInput.files || [];
  if (!file) return;
  try { elements.configInput.value = await file.text(); validateInput(); }
  catch (_) { elements.status.className = 'status fail'; elements.status.textContent = t('local_file_error'); setValidationState('fail'); }
});

document.documentElement.dataset.theme = initialOptions.theme;
elements.sampleSelect.value = initialOptions.scenario;
applyCopy();
void loadSample();
