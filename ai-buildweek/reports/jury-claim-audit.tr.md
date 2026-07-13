# OpenAI Build Week jüri ve iddia denetimi

- Denetim tarihi: 2026-07-13
- Kapsam: herkese açık `zerokit-ai-control-plane` reposu
- İnceleme bakışı: kıdemli ürün mühendisi + OpenAI Build Week jüri vekili
- Not: Aşağıdaki puanlar resmî OpenAI puanı değil, kanıta dayalı değerlendirme tahminidir.

## Kısa jüri kararı

**Repo şu dar ve dürüst iddiayı karşılıyor:** “Codex uygulamasında seçilen GPT-5.6 ile sansürlenmiş SaaS gereksinimlerini, yerelde doğrulanan bir kontrol düzlemi config'ine ve adaptör/test kanıtına dönüştüren mahremiyet kontrollü geliştirici akışı.”

**Repo şu geniş iddiayı karşılamıyor:** “Her backend'e otomatik bağlanan, production-ready bir AI control plane.” Bu geniş ifade kullanılmamalı.

Yerel script Codex arayüzündeki model seçimini okuyamaz. GPT-5.6 kanıtı, videoda görünür model seçimi ve operatör onaylı manifest ile sağlanır; kriptografik model doğrulaması iddia edilmez.

## Jüri vekili puan kartı

| Resmî ölçüt | Güncel puan | Neden daha yüksek değil? |
| --- | ---: | --- |
| Teknolojik uygulama | 7,6/10 | Codex görev paketi, mahremiyet engeli, katı çıktı kapısı, hash manifesti, preview ve PocketBase adaptörü var; son operatör çalışması ve videosu henüz kaydedilmedi. |
| Tasarım / UX | 8,1/10 | Bilingual ve responsive preview tutarlı; görev hazırlama → Codex → preview zinciri hâlâ iki uygulama arasında ilerliyor. |
| Potansiyel etki | 7,7/10 | SaaS özelleştirme problemi gerçek ve üç sektörle anlatılıyor; müşteri görüşmesi, süre ölçümü veya pilot kanıtı yok. |
| Fikir kalitesi | 8,5/10 | GPT-5.6'yı chatbot yerine config/sözleşme/test eş tasarımcısı olarak konumlamak özgün ve mahremiyet odaklı. |
| **Eşit ağırlıklı jüri vekili toplamı** | **8,0/10** | Rekabetçi ve inandırıcı; görünür GPT-5.6 çalışması, güçlü video ve mümkünse canlı preview bağlantısı gerekir. |

## İddia bazında sonuç

| İddia | Sonuç | Kanıt | Sınır |
| --- | --- | --- | --- |
| GPT-5.6/Codex merkezde | **Kod düzeyinde hazır; son operatör kanıtı bekliyor** | Dört prompt, Codex görev üreticisi, model-seçim beyanı, çıktı doğrulayıcı | Videoda görünür model seçimi ve bu çalışmaya ait manifest gösterilmeli. |
| Sansürlenmiş gereksinimden config üretir | **Hazır** | Okul girdisi, hazır görev paketi, hedef dosya ve doğrulama komutu | Mevcut örnek config'i yeni Codex çalışmasıymış gibi sunma. |
| Mahremiyet korumalı AI akışı | **İş akışı kontrolü olarak destekleniyor** | Yerel engel, `.env`/secret denylist, sentetik fixture, preview'da dış istek yok | İnsan onayı zorunlu. |
| Production verisi modele gitmez | **Repo ve desteklenen akış için doğru** | Dahil girdiler sentetik, görev dosyası özel dosyaları yasaklıyor | Süreç disiplini yine gerekir. |
| Backend adaptör uyumluluğu | **Bir gerçek sınırda kanıtlı** | PocketBase `items/totalItems` → ZeroKit `users/total`, fail-closed testler | Her backend otomatik uyumlu değildir. |
| Çalışan ürün | **Çalışan jüri preview'su** | Build, yerel preview, safe apply, rapor, tarayıcı smoke | Production control plane veya özel donor ürünün tamamı değildir. |

## Son test kanıtı

| Komut | Sonuç |
| --- | --- |
| `npm run test:unit` | PASS, 18/18 |
| `npm run test:privacy` | PASS, 8/8 |
| `npm run test:browser` | PASS, 16/16 |
| `npm run demo:pocketbase` | PASS |
| Üç config doğrulaması | PASS, 3/3 |

## Sentetik okul SaaS hazır mı?

**Evet.** Sansürlenmiş okul gereksinimi, baseline config, browser preview, PocketBase sentetik adaptörü, hazır Codex görev paketi ve yerel testler mevcuttur.

Henüz yapılmamış tek yarışma kanıtı: operatörün Codex'te görünür GPT-5.6 seçimiyle hazır görevi çalıştırması, yeni output'u incelemesi, manifest oluşturması ve bunu videoda göstermesidir.

## Jüriye söylenecek tek cümle

> ZeroKit, Codex uygulamasında seçilen GPT-5.6 ile sansürlenmiş SaaS gereksinimlerini yerelde doğrulanan bir kontrol düzlemi sözleşmesine ve adaptör/test kanıtına dönüştürür; müşteri kayıtları ve çalışma zamanı yetkilendirmesi model sınırının dışında kalır.
