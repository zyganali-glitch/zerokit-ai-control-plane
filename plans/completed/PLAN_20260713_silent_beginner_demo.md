# Önceki Acemi-Dostu Demo Rehberi Planı — geçersiz tarihsel plan

> **Resmî kurallarla geçersiz kılındı (2026-07-14):** Son Devpost videosunda İngilizce sesli anlatım zorunludur. Bu dosya yalnız tarihsel kayıttır; güncel uygulama için `ai-buildweek/demo/DEMO_VIDEO_ROADMAP.md` ve `VOICEOVER_SCRIPT.md` kullanılmalıdır.

- Durum: TAMAM
- Tarih: 2026-07-13
- Yayın hedefi: `origin/main`
- Ana uygulama commit'i: `be63721`

## Sonuç

Bu tarihsel turda demo yalnız İngilizce ekran yazılarına dayalı ve acemi kullanıcıya uygun hâle getirilmişti. Resmî ses şartı yayımlandıktan sonra yaklaşım tamamen geçersiz kılındı. Güncel Türkçe rehber; hangi programın açılacağını, nereye tıklanacağını, İngilizce TTS sesini ve kanıtları adım adım açıklar.

## İstek matrisi

| ID | İstek | Kabul kanıtı | Durum |
| --- | --- | --- | --- |
| R1 | Önceki yalnız-görsel İngilizce demo | Tarihsel ekran kartı planı | GEÇERSİZ KILINDI |
| R2 | Aşırı detaylı acemi rehberi | Tıklama, beklenen ekran, sonraki adım, hata kurtarma | TAMAM |
| R3 | Ürün kapsamı kararı | Public preview ile üretim sınırı açık karar | TAMAM |
| R4 | Codex komutlarını İngilizce yap | Görev paketi, repo kuralları, terminal çıktıları ve kopyala-yapıştır prompt İngilizce | TAMAM |
| R5 | Localhost/maliyet açıklaması | Local adres, domain/API/ücret gereksinimleri net | TAMAM |
| R6 | Test ve uzak yayın | Tüm kapılar PASS; `be63721` uzak `main` dalına gönderildi | TAMAM |

## Doğrulama kanıtı

- Build: PASS
- Unit: 18/18 PASS
- Privacy: 8/8 PASS
- PocketBase sentetik adaptör: PASS
- Chrome browser smoke: 16/16 PASS; dış istek 0; runtime exception 0
- Git diff whitespace: PASS
- Codex task generator ile committed school task senkronizasyonu: PASS
- Rapor kaynak yolu: repo-relative; kişisel Windows kullanıcı yolu persist edilmiyor
- Uzak yayın: `origin/main` `e074554..be63721`

## İddia ve güvenlik kilidi

- Bu eski ses yaklaşımı artık kullanılmaz; güncel teslim İngilizce voiceover/TTS gerektirir.
- Video içi bütün açıklamalar İngilizcedir; hazırlık ve kullanım rehberi Türkçedir.
- `127.0.0.1` yalnız kullanıcının bilgisayarında çalışan ücretsiz local adrestir; jüri uzaktan açamaz.
- Ücretli domain, hosting veya model API'si zorunlu değildir.
- Yalnız bu repodaki public preview ve kanıtlar yarışma ürünü olarak gösterilir.
- Model seçici ve Codex UI sürüme göre değişebileceği için rehber görünür etikete göre yönlendirir; olmayan düğme uydurmaz.

## Fazlar

| Faz | Çıktı | Durum |
| --- | --- | --- |
| P1 UI ve kaynak doğrulaması | Public preview etiketleri, OpenAI model erişimi, Windows kayıt/Clipchamp resmî akışı | TAMAM |
| P2 Rehber dönüşümü | Tarihsel storyboard + hazırlık/kayıt/montaj adımları | GEÇERSİZ KILINDI |
| P3 İngilizce agent görevleri | Task generator, hazır okul görevi, repo kuralları ve terminal kanıtı | TAMAM |
| P4 Bütünlük/doğrulama | Unit, privacy, PocketBase, browser, secret/path ve diff kontrolleri | TAMAM |
| P5 Yayın | Commit, push, uzak `main` doğrulaması ve plan arşivi | TAMAM |
