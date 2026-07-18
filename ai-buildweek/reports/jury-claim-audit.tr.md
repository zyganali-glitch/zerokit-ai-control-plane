# OpenAI Build Week jüri ve iddia denetimi

- Denetim tarihi: 2026-07-16
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
| Teknolojik uygulama | 8,5/10 | Görev paketi, mahremiyet engeli, taze GPT-5.6 kanıtı, katı çıktı kapısı, manifest, preview, PocketBase, Pages alt-yol testi ve dağıtım akışı var; production entegrasyonu ve tam JSON Schema motoru bilinçli olarak kapsam dışı. |
| Tasarım / UX | 8,2/10 | İki dilli responsive preview ve kanıt zinciri tutarlı; görev hazırlama → Codex → preview hâlâ iki uygulamada ilerliyor. |
| Potansiyel etki | 7,7/10 | SaaS özelleştirme problemi gerçek ve üç sektörle anlatılıyor; müşteri görüşmesi, süre ölçümü veya pilot kanıtı yok. |
| Fikir kalitesi | 8,5/10 | GPT-5.6'yı chatbot yerine config/sözleşme/test eş tasarımcısı olarak konumlamak özgün ve mahremiyet odaklı. |
| **Eşit ağırlıklı jüri vekili toplamı** | **8,2/10** | Pages, taze GPT-5.6 kanıt zinciri ve public 2:38 İngilizce sesli video doğrulandı; özel Session ID yalnız Devpost işlemi olarak kalıyor. |

## İddia bazında sonuç

| İddia | Sonuç | Kanıt | Sınır |
| --- | --- | --- | --- |
| GPT-5.6/Codex merkezde | **Taze operatör kanıtıyla destekleniyor** | Dört prompt, görev üreticisi, görünür GPT-5.6 Sol + Ultra kaydı, [taze config](../evidence/school-saas.gpt-5.6.codex.config.json) ve [manifest](../evidence/school-saas.gpt-5.6.codex.config.manifest.json) | Model seçimi görünür ve operatör onaylıdır; kriptografik olarak doğrulandığı iddia edilmez. |
| Sansürlenmiş gereksinimden config üretir | **Taze çalışmada PASS** | Okul girdisi, hazır görev paketi, commit'lenmiş taze hedef ve sıkı validator PASS | Paketli baseline yalnız tanıtım içindir; yarışma çalışması evidence yolundadır. |
| Mahremiyet kontrollü AI akışı | **İş akışı kontrolü olarak destekleniyor** | Yerel engel, `.env`/secret denylist, sentetik fixture, preview'da üçüncü taraf/model isteği yok | İnsan onayı zorunlu. |
| Production verisi modele gitmez | **Repo ve desteklenen akış için doğru** | Dahil girdiler sentetik, görev dosyası özel dosyaları yasaklıyor | Süreç disiplini yine gerekir. |
| Backend adaptör uyumluluğu | **Bir gerçek sınırda kanıtlı** | PocketBase `items/totalItems` → ZeroKit `users/total`, fail-closed testler | [Adaptör matrisi](adapter-compatibility-matrix.md) her backend'in otomatik uyumlu olmadığını açıklar. |
| Jüri sözleşmesi doğrulaması | **İki açık kapıyla destekleniyor** | Browser yapısal inceleme, katı CLI/manifest kapısı, üç sentetik senaryo | [Validator kapsamı](validator-coverage.md); tam JSON Schema 2020-12 motoru değildir. |
| Çalışan ürün | **Çalışan jüri preview'su** | Build, yerel preview, safe apply, rapor, tarayıcı smoke | Production-ready yetkilendirme veya dağıtım sistemi değildir. |

## Son test kanıtı

| Komut | Sonuç |
| --- | --- |
| `npm run test:unit` | PASS, 20/20 |
| `npm run test:privacy` | PASS, 8/8 |
| `npm run test:browser` | PASS, 16/16 |
| `npm run demo:pocketbase` | PASS |
| Üç config doğrulaması | PASS, 3/3 |
| Taze GPT-5.6 School SaaS kanıtı | PASS, 8 panel / 5 rol / 3 alan grubu / 3 endpoint; insan incelemesi tamam; çıktı SHA-256 `af47eb14261d3aca6c76d31e563087070bf7c0856bf4e06a1d7fbfd5faf807e3` |

Browser preview hızlı yapısal kapıyı çalıştırır. CLI ve manifest yolu daha katı generated-artifact gereksinimlerini uygular; iki kapı da backend payload uyumunu veya iş doğruluğunu tek başına kanıtlamaz.

## Sentetik okul SaaS hazır mı?

**Evet.** Sansürlenmiş okul gereksinimi, baseline config, browser preview, PocketBase sentetik adaptörü, hazır Codex görev paketi ve yerel testler mevcuttur.

Final operatör kanıtı tamamlandı: Codex'te **GPT-5.6 Sol** ve **Ultra** görünürken hazır görev çalıştırıldı, taze hedef üretildi, sıkı validator PASS verdi, insan incelemesi yapıldı ve operatör onaylı manifest kaydedildi. Manifest kriptografik model doğrulaması iddia etmez. Public 2:38 İngilizce sesli video gizli oturumda oynatılarak doğrulandı. Kalan yarışma kapısı, daha önce alınan Session ID'nin yalnız özel Devpost alanına operatör tarafından yapıştırılması ve başvurunun gönderilmesidir.

## Jüriye söylenecek tek cümle

> ZeroKit, Codex uygulamasında seçilen GPT-5.6 ile sansürlenmiş SaaS gereksinimlerini yerelde doğrulanan bir kontrol düzlemi sözleşmesine ve adaptör/test kanıtına dönüştürür; müşteri kayıtları ve çalışma zamanı yetkilendirmesi model sınırının dışında kalır.
