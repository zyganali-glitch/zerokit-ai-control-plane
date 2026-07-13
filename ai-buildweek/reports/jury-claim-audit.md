# OpenAI Build Week jüri ve iddia denetimi

- Denetim tarihi: 2026-07-13
- Kapsam: herkese açık `zerokit-ai-control-plane` reposu
- İnceleme bakışı: kıdemli ürün mühendisi + OpenAI Build Week jüri vekili
- Not: Aşağıdaki puanlar resmî OpenAI puanı değil, kanıta dayalı değerlendirme tahminidir.

## Resmî değerlendirme temeli

[OpenAI Build Week sayfası](https://openai.com/build-week/) başvuruların teknik uygulama, tasarım ve kullanıcı deneyimi, potansiyel etki ve fikir kalitesi üzerinden değerlendirildiğini söylüyor. Güçlü başvuruların GPT-5.6 ve Codex'i düşünülmüş şekilde kullanması ve problem–çözüm–yaklaşım zincirini açık anlatması bekleniyor.

[Devpost yarışma sayfası](https://openai.devpost.com/) ölçütleri daha somut tarif ediyor:

- **Teknolojik uygulama:** GPT-5.6 ne kadar kapsamlı ve ustalıklı kullanılıyor; kod gerçek emek ve çalışan, basit olmayan bir uygulama gösteriyor mu?
- **Tasarım:** Çalıştırılabilir, tutarlı bir ürün deneyimi var mı; yoksa yalnızca teknik bir kavram kanıtı mı?
- **Potansiyel etki:** Gerçek bir kitle için gerçek bir problem açık ve inandırıcı şekilde çözülüyor mu?
- **Fikir kalitesi:** GPT-5.6 kullanımı yaratıcı ve bariz olmayan bir değer sağlıyor mu; ekip problem alanını gerçekten anlıyor mu?

## Kısa jüri kararı

**Repo şu dar ve dürüst iddiayı karşılıyor:** “Codex uygulamasında seçilen GPT-5.6 ile sansürlenmiş SaaS gereksinimlerini, yerelde doğrulanan bir kontrol düzlemi config'ine ve adaptör/test kanıtına dönüştüren mahremiyet kontrollü geliştirici akışı.”

**Repo şu geniş iddiayı karşılamıyor:** “Her backend'e otomatik bağlanan, production-ready bir AI control plane.” Bu geniş ifade kullanılmamalı.

API kullanmama kararı ürünün zayıflığı değildir. Build Week'in odağı Codex ile üretmektir; bu repo Codex uygulamasını çalışma yüzeyi, yerel scriptleri ise mahremiyet, görev sınırı, deterministik doğrulama ve kanıt katmanı olarak kullanır. En önemli dürüst sınır şudur: yerel script Codex arayüzündeki model seçimini okuyamaz. GPT-5.6 kanıtı, videoda görünür model seçimi ve operatör onaylı manifest ile sağlanır; kriptografik model doğrulaması iddia edilmez.

[OpenAI'nin GPT-5.6 duyurusu](https://openai.com/index/gpt-5-6/) model ailesinin Codex'te kullanılabildiğini; uygun Plus, Pro, Business ve Enterprise hesaplarında Sol, Terra ve Luna seçenekleri ile efor düzeylerinin seçilebildiğini belirtiyor. Yarışma kaydı öncesinde kendi hesabındaki model seçiciyi görünür şekilde kontrol et.

## Jüri vekili puan kartı

| Resmî ölçüt | Güncel puan | Neden daha yüksek değil? |
| --- | ---: | --- |
| Teknolojik uygulama | 7,6/10 | Codex görev paketi, mahremiyet engeli, katı çıktı kapısı, hash manifesti, preview ve PocketBase adaptörü var; GPT-5.6 Sol ile son operatör çalışması ve videosu henüz kaydedilmedi. |
| Tasarım / UX | 8,1/10 | Bilingual ve responsive preview tutarlı; görev hazırlama → Codex → preview zinciri hâlâ iki uygulama arasında ilerliyor. |
| Potansiyel etki | 7,7/10 | SaaS özelleştirme problemi gerçek ve üç sektörle anlatılıyor; müşteri görüşmesi, süre ölçümü veya pilot kanıtı yok. |
| Fikir kalitesi | 8,5/10 | GPT-5.6'yı chatbot yerine config/sözleşme/test eş tasarımcısı olarak konumlamak özgün ve mahremiyet odaklı. |
| **Eşit ağırlıklı jüri vekili toplamı** | **8,0/10** | Rekabetçi ve inandırıcı; üst seviye derece için görünür GPT-5.6 çalışması, güçlü video ve mümkünse canlı preview bağlantısı gerekir. |

## İddia bazında sonuç

| İddia | Sonuç | Kanıt | Sınır |
| --- | --- | --- | --- |
| GPT-5.6/Codex merkezde | **Kod düzeyinde hazır; son operatör kanıtı bekliyor** | Dört prompt, Codex görev üreticisi, model-seçim beyanı, çıktı doğrulayıcı | Videoda GPT-5.6 Sol seçimi ve bu çalışmaya ait manifest gösterilmeli. |
| Sansürlenmiş gereksinimden config üretir | **Hazır** | Okul girdisi, hazır görev paketi, hedef dosya ve doğrulama komutu | Mevcut örnek config'i yeni Codex çalışmasıymış gibi sunma; yeni çıktı ayrı evidence yoluna yazılmalı. |
| Mahremiyet korumalı AI akışı | **İş akışı kontrolü olarak destekleniyor** | Yerel engel, `.env`/secret denylist, sentetik fixture, preview'da dış istek yok | Hiçbir pattern taraması bütün hassas verileri garanti edemez; insan onayı zorunlu. |
| Production verisi modele gitmez | **Repo ve desteklenen akış için doğru** | Dahil girdiler sentetik, görev dosyası özel dosyaları yasaklıyor | Geliştirici kuralları atlayabilir; süreç disiplini yine gerekir. |
| Backend adaptör uyumluluğu | **Bir gerçek sınırda kanıtlı** | PocketBase `items/totalItems` → ZeroKit `users/total`, fail-closed testler | Her PocketBase koleksiyonu veya herhangi bir backend otomatik uyumlu değildir. |
| Şema uyumlu config | **Açık yarışma sözleşmesi seviyesinde destekleniyor** | Ortak validator, JSON Schema belgesi, üç senaryo, katı üretilmiş-artifact kapısı | Validator tam bir JSON Schema 2020-12 motoru değildir. |
| Çalışan ürün | **Çalışan jüri preview'su** | Build, yerel preview, safe apply, rapor, tarayıcı smoke | Production control plane veya özel donor ürünün tamamı değildir. |
| Sıfır bağımlılık | **Niteliksiz söylenirse yanlış** | Node/npm ve tarayıcı ön koşul | “Sıfır frontend runtime npm bağımlılığı” ifadesi doğrudur. |

## Bu turda kabul edilip uygulanan öneriler

1. Model API'si, API anahtarı, kota ve Responses API katmanı tamamen kaldırıldı.
2. Yerel mahremiyet kontrolünden sonra tekrar üretilebilir Codex görev dosyası hazırlayan `codex:prepare` eklendi.
3. Codex uygulamasında GPT-5.6 Sol seçimi, görev yürütme ve hedef JSON yolu açık bir operatör akışına bağlandı.
4. İnsan incelemesinden sonra dosya hash'leri ve validation istatistiklerini kaydeden `codex:record` eklendi.
5. Manifest, model seçimini “operatör onaylı, kriptografik değil” diye açıkça işaretliyor.
6. Kök `AGENTS.md`, Codex'in hangi dosyalara dokunamayacağını ve hangi kapıları çalıştıracağını tanımlıyor.
7. Jüri raporu, demo metni ve video prodüksiyon planı Türkçeleştirildi.
8. Sentetik okul SaaS için çalıştırılabilir Codex görev paketi hazırlandı.

## Sentetik okul SaaS hazır mı?

**Evet, ürün/demonstrasyon senaryosu hazırdır.** Şunlar mevcut ve doğrulanabilir:

- sansürlenmiş okul gereksinimi;
- panel, RBAC, alan, endpoint, marka, mahremiyet ve test checklist'i içeren baseline config;
- okul config'ini yükleyen browser preview;
- kullanıcı, rol, plan, fatura, bildirim, yardım, audit ve aggregate rapor yüzeyleri;
- team billing'in kapalı tutulduğu görünür negatif karar;
- PocketBase sentetik kullanıcı zarfı ve çalışan adaptörü;
- hazır `school-saas.codex-task.md` görev paketi;
- yerel config, unit, privacy, browser ve adapter testleri.

Henüz yapılmamış tek yarışma kanıtı: operatörün Codex'te **GPT-5.6 Sol** seçip hazır görevi çalıştırması, yeni output'u incelemesi, manifest oluşturması ve bunu videoda göstermesi. Bu bir kod eksiği değil, kayıt günündeki kontrollü insan adımıdır.

## Başvuru öncesi P0 adımları

1. Codex uygulamasında bu repoyu proje olarak aç.
2. Model seçiciden **GPT-5.6 Sol**, efor olarak `high` veya son kayıt için uygunsa `max` seç.
3. Yeni görevde şunu yaz:

   ```text
   AGENTS.md kurallarına uy. ai-buildweek/runs/school-saas.codex-task.md dosyasını oku ve görevi tamamla.
   ```

4. Üretilen `ai-buildweek/evidence/school-saas.gpt-5.6.codex.config.json` dosyasını insan gözüyle incele.
5. Validator PASS aldıktan sonra manifest komutunu çalıştır.
6. Model seçici, görev dosyası, PASS ve manifest hash'ini tek video akışında göster.

## Yerleştirmeyi güçlendiren sonraki öneriler

- Statik preview'yu HTTPS altında yayınla ve README/Devpost'un ilk ekranına koy.
- Türkçe anlatım kullan; videoya gömülü İngilizce altyazı ekle. Devpost açıklamasında kısa Türkçe + İngilizce özet kullan.
- “Manuel ilk taslak süresi” ile “Codex destekli ilk taslak süresi”ni tek iç deney olarak ölç; bunu genelleştirilmiş verimlilik iddiası gibi sunma.
- PocketBase kanıtını 10–15 saniye göster; ana hikâyeyi PocketBase kurulumuna dönüştürme.
- Başvuru sonrası input → preflight → Codex görev → validation → preview akışını tek UI altında birleştir.

## Jüriye söylenecek tek cümle

> ZeroKit, Codex uygulamasında seçilen GPT-5.6 ile sansürlenmiş SaaS gereksinimlerini yerelde doğrulanan bir kontrol düzlemi sözleşmesine ve adaptör/test kanıtına dönüştürür; müşteri kayıtları ve çalışma zamanı yetkilendirmesi model sınırının dışında kalır.

Bu cümle mevcut kod ve sınırlamalarla uyumludur.
