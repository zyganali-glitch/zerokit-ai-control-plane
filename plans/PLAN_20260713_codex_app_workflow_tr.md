# Codex Uygulaması Akışı ve Türkçe Teslim Planı

- Durum: DEVAM_EDIYOR
- Tarih: 2026-07-13
- Sahip: ana ajan
- Yayın hedefi: `origin/main`

## Sonuç

API anahtarı, API kotası ve Responses API çağrısını tamamen kaldır; GPT-5.6 modelini Codex uygulamasında seçilen geliştirici iş akışına taşı; yerelde mahremiyet ön kontrolü, görev paketi, çıktı doğrulama ve operatör onaylı hash manifesti üret. Jüri raporu, demo senaryosu ve video prodüksiyon belgelerini Türkçeleştir. Hazır okul senaryosunu uçtan uca doğrula ve değişiklikleri uzak `main` dalına gönder.

## İstek matrisi

| ID | İstek | Kabul kanıtı | Durum |
| --- | --- | --- | --- |
| R1 | API yerine Codex uygulaması + GPT-5.6 akışı | `codex:prepare` ve `codex:record`; sıfır model API çağrısı | TAMAM |
| R2 | Jüri/video belgelerini Türkçe yap | Türkçe jüri raporu, video yol haritası ve demo metni | TAMAM |
| R3 | Okul senaryosunun hazır olduğunu doğrula | Girdi, config, görev paketi, doğrulama, preview ve adaptör kanıtı PASS | TAMAM |
| R4 | Önerileri uygula ve uzak repoya gönder | Testli commit, `origin/main` SHA eşitliği | DEVAM_EDIYOR |

## İddia kilidi

İzin verilen: Codex uygulamasında GPT-5.6 seçilerek yürütülen, yerel mahremiyet kontrolü ve deterministik doğrulamayla kapatılan geliştirici akışı; sentetik okul/sağlık/ajans örnekleri; yerel preview; PocketBase adaptör kanıtı.

İzin verilmeyen: model seçiminin script tarafından kriptografik doğrulandığı, her backend'in otomatik uyumlu olduğu, production-ready ürün, hiçbir hassas verinin kaçamayacağı veya API kullanıldığı iddiası.

## Fazlar ve kapılar

| Faz | Çıktı | Durum |
| --- | --- | --- |
| P1 Resmî ürün doğrulaması | GPT-5.6'nın Codex'te kullanılabilirliği doğrulandı | TAMAM |
| P2 Kod dönüşümü | API dosyalarını kaldır, Codex görev/kanıt araçlarını ekle | TAMAM |
| P3 Türkçe içerik | Jüri/video/demo ve ilgili güncel belgeler | TAMAM |
| P4 Doğrulama | Build, unit, privacy, browser, config, okul görevi, sır/ağ taraması | TAMAM |
| P5 Yayın | Commit, doğrudan push, uzak SHA doğrulaması | DEVAM_EDIYOR |

## Riskler

| Risk | Kontrol |
| --- | --- |
| Model seçimi kanıtı sahte güven verir | Manifest açıkça “operatör onayı, kriptografik değil” der; videoda model seçici görünür |
| Codex görevi hassas dosya okur | AGENTS.md denylist, yerel preflight, görev paketinde `.env`/secret/production yasakları |
| Türkçe demo uluslararası jüriye erişmez | Türkçe anlatım + gömülü İngilizce altyazı + çift dilli Devpost özeti önerilir |
| Eski API ifadeleri kafa karıştırır | Güncel README/rapor/demo/test/scriptlerden tamamen kaldır; tarihsel planı “yerine geçti” olarak işaretle |

## Kontrol noktası

Yayın öncesi kontrol noktası: model API dosyaları kaldırıldı; Codex task/manifest akışı ve kök AGENTS sınırı eklendi; Türkçe jüri/video/demo/mahremiyet belgeleri tamamlandı. `npm ci` ve build PASS; unit 18/18; focused privacy/Codex 8/8; okul task/input sync PASS; config 3/3; PocketBase PASS; gerçek browser 16/16; demo report/apply PASS; JSON/MJS/Markdown link/secret/model-network/diff bütünlük denetimleri PASS. Kalan: kapsamı commit edip `origin/main` push ve SHA doğrulaması.
