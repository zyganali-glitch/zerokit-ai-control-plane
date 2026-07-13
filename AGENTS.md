# ZeroKit Codex çalışma kuralları

Bu repo OpenAI Build Week için hazırlanmış, sentetik verilerle çalışan bir yarışma yüzeyidir.

## Zorunlu akış

1. Codex uygulamasında model seçiciden **GPT-5.6 Sol** seçilir. Kalite önceliğinde `high`, son kayıt için uygunsa `max` efor kullanılır.
2. Senaryo girdisi önce `npm run codex:prepare -- <input.md>` ile yerel mahremiyet kontrolünden geçirilir.
3. Oluşan `ai-buildweek/runs/*.codex-task.md` dosyası yeni bir Codex görevinde takip edilir.
4. Üretilen JSON `node ai-buildweek/scripts/validate-config.mjs <output.json>` ile doğrulanır.
5. İnsan incelemesinden sonra `npm run codex:record -- ... --confirm-model-visible --confirm-reviewed` ile hash manifesti oluşturulur.

## Yasaklar

- OpenAI veya başka bir model API'si çağırma; API anahtarı isteme, okuma veya yazma.
- `.env`, kimlik bilgisi deposu, üretim logu, müşteri kaydı, gerçek e-posta, fatura, sağlık/öğrenci kaydı ya da özel mesaj okuma.
- Model seçimini script tarafından doğrulanmış gibi gösterme. Model kanıtı, Codex arayüzündeki görünür seçim ve operatör onayıdır; kriptografik değildir.
- Backend uyumluluğunu payload fixture ve test olmadan varsayma.
- Doğrulamadan geçmeyen config'i uygulama veya PASS olarak raporlama.

## Kapanış kapıları

```bash
npm run build
npm run test:unit
npm run test:privacy
npm run demo:pocketbase
npm run test:browser
```

Repo “production-ready”, “her backend ile uyumlu” veya niteliksiz “sıfır bağımlılık” iddiasında bulunmaz.
