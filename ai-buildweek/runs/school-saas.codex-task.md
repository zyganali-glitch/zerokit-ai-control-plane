# Codex uygulaması görevi — ZeroKit config mimarı

## Operatör ön koşulu

Bu görevi başlatmadan önce Codex uygulamasındaki model seçiciden **GPT-5.6 Sol** seç. Kalite için `high`, son demo kaydı için hesabında varsa `max` efor kullan. Script model seçimini doğrulayamaz; kayıt videosunda model seçici görünmelidir.

## Kaynaklar

- Mimari prompt: `ai-buildweek/prompts/01-config-architect.prompt.md`
- Sansürlenmiş senaryo girdisi: `ai-buildweek/examples/school-saas.input.md`
- Girdi SHA-256: `399a7ac37cd1d465230476c7457e9e3698a8e4d93a3abdc8c00c7a16b2eed995`
- Hedef config: `ai-buildweek/evidence/school-saas.gpt-5.6.codex.config.json`

## Görev

1. `AGENTS.md`, mimari prompt ve senaryo girdisini oku.
2. `.env`, kimlik bilgileri, üretim logları, müşteri kayıtları veya repo dışındaki özel dosyaları okuma.
3. Model API'si veya harici ağ çağrısı kullanma; bu görev Codex uygulamasının kendi oturumunda yürür.
4. Yalnızca sentetik girdiden ZeroKit config üret ve hedef JSON dosyasına yaz.
5. Config; `version`, `panel_registry`, `rbac_registry`, `field_registry`, `endpoint_map`, `brand_config`, `privacy_notes` ve `test_checklist` içermelidir.
6. Backend uyumluluğunu uydurma; bilinmeyenleri notlarda açık bırak.
7. Şu komutu çalıştır ve FAIL varsa düzelt:

   `node ai-buildweek/scripts/validate-config.mjs ai-buildweek/evidence/school-saas.gpt-5.6.codex.config.json`

8. Değişiklik özetinde varsayımları, doğrulama sonucunu ve insan incelemesi gereğini belirt. Manifesti oluşturma; onu operatör incelemeden sonra kaydedecek.
