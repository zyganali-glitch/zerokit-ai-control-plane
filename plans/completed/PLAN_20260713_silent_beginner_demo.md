# Sessiz ve Acemi-Dostu Demo Rehberi Planı

- Durum: TAMAM
- Tarih: 2026-07-13
- Yayın hedefi: `origin/main`
- Ana uygulama commit'i: `be63721`

## Sonuç

Demo akışı konuşmasız, İngilizce ekran yazılı ve acemi kullanıcıya uygun hâle getirildi. Türkçe rehber; her aşamada hangi programın açılacağını, nereye tıklanacağını, ne yazılacağını, ne görülmesi gerektiğini ve hata olursa ne yapılacağını adım adım açıklıyor. Codex'e verilen görev metinleri İngilizceleştirildi. Donör admin paneli, localhost, domain/API/maliyet sınırları dürüstçe açıklandı.

## İstek matrisi

| ID | İstek | Kabul kanıtı | Durum |
| --- | --- | --- | --- |
| R1 | Konuşmasız İngilizce demo | Sessiz kayıt planı, İngilizce ekran kartları | TAMAM |
| R2 | Aşırı detaylı acemi rehberi | Tıklama, beklenen ekran, sonraki adım, hata kurtarma | TAMAM |
| R3 | Donör admin paneli kararı | Public preview ile private donor farkı açık karar | TAMAM |
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

- Demo sessizdir; ses kaydı/mikrofon gerekmez.
- Video içi bütün açıklamalar İngilizcedir; hazırlık ve kullanım rehberi Türkçedir.
- `127.0.0.1` yalnız kullanıcının bilgisayarında çalışan ücretsiz local adrestir; jüri uzaktan açamaz.
- Ücretli domain, hosting veya model API'si zorunlu değildir.
- Private donor admin paneli public yarışma ürünüymüş gibi gösterilmez.
- Model seçici ve Codex UI sürüme göre değişebileceği için rehber görünür etikete göre yönlendirir; olmayan düğme uydurmaz.

## Fazlar

| Faz | Çıktı | Durum |
| --- | --- | --- |
| P1 UI ve kaynak doğrulaması | Public preview etiketleri, OpenAI model erişimi, Windows kayıt/Clipchamp resmî akışı | TAMAM |
| P2 Rehber dönüşümü | Sessiz storyboard + acemi hazırlık/kayıt/montaj adımları | TAMAM |
| P3 İngilizce agent görevleri | Task generator, hazır okul görevi, repo kuralları ve terminal kanıtı | TAMAM |
| P4 Bütünlük/doğrulama | Unit, privacy, PocketBase, browser, secret/path ve diff kontrolleri | TAMAM |
| P5 Yayın | Commit, push, uzak `main` doğrulaması ve plan arşivi | TAMAM |
