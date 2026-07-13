import { createHash } from 'node:crypto';
import { isAbsolute, relative } from 'node:path';
import { validateZeroKitConfig } from '../../frontend/js/config-validator.js';
import { assertPrivacySafe, PRIVACY_GUARD_VERSION } from './privacy-guard.mjs';

const ALLOWED_MODELS = new Set(['GPT-5.6 Sol', 'GPT-5.6 Terra', 'GPT-5.6 Luna']);

export function sha256(value) {
  return createHash('sha256').update(value, 'utf8').digest('hex');
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

export function buildCodexTask({ requirements, inputPath, promptPath, outputPath }) {
  const privacy = assertPrivacySafe(requirements, 'scenario requirements');
  const inputHash = sha256(requirements);
  const text = `# Codex uygulaması görevi — ZeroKit config mimarı

## Operatör ön koşulu

Bu görevi başlatmadan önce Codex uygulamasındaki model seçiciden **GPT-5.6 Sol** seç. Kalite için \`high\`, son demo kaydı için hesabında varsa \`max\` efor kullan. Script model seçimini doğrulayamaz; kayıt videosunda model seçici görünmelidir.

## Kaynaklar

- Mimari prompt: \`${promptPath}\`
- Sansürlenmiş senaryo girdisi: \`${inputPath}\`
- Girdi SHA-256: \`${inputHash}\`
- Hedef config: \`${outputPath}\`

## Görev

1. \`AGENTS.md\`, mimari prompt ve senaryo girdisini oku.
2. \`.env\`, kimlik bilgileri, üretim logları, müşteri kayıtları veya repo dışındaki özel dosyaları okuma.
3. Model API'si veya harici ağ çağrısı kullanma; bu görev Codex uygulamasının kendi oturumunda yürür.
4. Yalnızca sentetik girdiden ZeroKit config üret ve hedef JSON dosyasına yaz.
5. Config; \`version\`, \`panel_registry\`, \`rbac_registry\`, \`field_registry\`, \`endpoint_map\`, \`brand_config\`, \`privacy_notes\` ve \`test_checklist\` içermelidir.
6. Backend uyumluluğunu uydurma; bilinmeyenleri notlarda açık bırak.
7. Şu komutu çalıştır ve FAIL varsa düzelt:

   \`node ai-buildweek/scripts/validate-config.mjs ${outputPath}\`

8. Değişiklik özetinde varsayımları, doğrulama sonucunu ve insan incelemesi gereğini belirt. Manifesti oluşturma; onu operatör incelemeden sonra kaydedecek.
`;
  return { inputHash, privacy, text };
}

function workspacePath(filePath) {
  const result = relative(process.cwd(), filePath).replaceAll('\\', '/');
  if (!result || result.startsWith('../') || isAbsolute(result)) {
    throw new Error(`Evidence files must stay inside the workspace: ${filePath}`);
  }
  return result;
}

export function buildCodexRunManifest({
  inputPath,
  taskPath,
  outputPath,
  inputText,
  taskText,
  outputText,
  modelLabel,
  modelVisibleConfirmed,
  humanReviewConfirmed,
  threadReference = null,
}) {
  if (!ALLOWED_MODELS.has(modelLabel)) {
    throw new Error(`Model label must be one of: ${[...ALLOWED_MODELS].join(', ')}.`);
  }
  if (!modelVisibleConfirmed) {
    throw new Error('Visible Codex model selection must be confirmed by the operator.');
  }
  if (!humanReviewConfirmed) {
    throw new Error('Human review must be confirmed before recording evidence.');
  }
  const privacy = assertPrivacySafe(inputText, 'scenario requirements');
  const config = JSON.parse(outputText);
  const validation = validateGeneratedConfig(config);
  if (!validation.valid) {
    throw new Error(`Codex output failed local validation: ${validation.errors.join(' | ')}`);
  }

  return {
    evidence_version: 1,
    surface: 'Codex uygulaması',
    model_selection: {
      label: modelLabel,
      visible_in_app_confirmed_by_operator: true,
      cryptographically_verified: false,
      evidence_note: 'Model seçimi Codex arayüzü ve demo videosuyla kanıtlanır; yerel script uygulama içi modeli okuyamaz.',
    },
    thread_reference: threadReference,
    recorded_at: new Date().toISOString(),
    files: {
      input: workspacePath(inputPath),
      task: workspacePath(taskPath),
      output: workspacePath(outputPath),
    },
    hashes: {
      input_sha256: sha256(inputText),
      task_sha256: sha256(taskText),
      output_sha256: sha256(outputText),
    },
    privacy_guard: {
      version: PRIVACY_GUARD_VERSION,
      blocking_findings: privacy.blockers.length,
      review_findings: privacy.reviewItems.length,
    },
    validation: {
      valid: true,
      warnings: validation.warnings,
      stats: validation.stats,
    },
    human_review: {
      completed: true,
      required_for_application: true,
    },
    note: 'Manifest; girdi, görev veya çıktı içeriğini, özel dosyaları ya da model muhakemesini içermez.',
  };
}

export const CODEX_APP_MODEL_LABELS = [...ALLOWED_MODELS];
