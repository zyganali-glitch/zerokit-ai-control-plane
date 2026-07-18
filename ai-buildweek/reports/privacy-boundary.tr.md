# Mahremiyet sınırı

ZeroKit AI Control Plane, GPT-5.6/Codex'i mimari tasarım tarafında kullanır. Model config, adaptör ve test artifact'leri tasarlamaya yardım eder; müşteri production veritabanına veya admin oturumuna bağlanmaz.

## İzin verilen girdiler

- ürün ve workflow gereksinimleri;
- gerçek kimlik içermeyen rol adları ve permission niyeti;
- panel/navigation gereksinimleri;
- sentetik alan adları, seçenekler ve table column'ları;
- uydurma değerli schema ve örnek config'ler;
- hassas olmayan OpenAPI parçaları ve route özetleri;
- sentetik request/response payload'ları;
- secret ve kayıtları çıkarılmış yerel validation hataları.

## Asla gönderilmemesi gerekenler

- production müşteri veya çalışan kayıtları;
- gerçek ad, e-posta, adres, identifier veya davranış geçmişi;
- parola, token, session cookie, API key, private certificate veya connection string;
- gerçek fatura, ödeme, banka veya billing export'u;
- sağlık kaydı, PHI, teşhis, klinik not veya hasta belgesi;
- özel mesaj, yüklenen müşteri belgesi, destek konuşması veya gizli dataset;
- yukarıdakileri içerebilecek ham production log veya trafik kaydı;
- `.env`, credential store ve repo dışındaki özel dosyalar.

## Sözleşme sansürleme

1. Yalnızca açık paneller için gereken operation ve schema parçalarını çıkar.
2. Server URL, credential, security example, tenant identifier ve iç hostname'leri kaldır.
3. Gerçek değerleri `usr_demo_01` ve `example.test` gibi açıkça sentetik değerlerle değiştir.
4. Payload'ı key adı, type, required/optional durumu ve nesting seviyesine indir.
5. E-posta, token, UUID, hesap numarası, serbest metin ve vendor secret ara.
6. Artifact Codex görevine girmeden önce insan reviewer onayı al.

Desteklenen `codex:prepare` komutu modelden önce yerel kontrol yapar. Private/API key, bearer token, JWT, credential içeren connection string, cookie header ve reserved example domain dışındaki e-posta yüksek güvenle bloklanır. UUID, public IP ve production-data dili inceleme bulgusu oluşturur.

PASS olan pattern taraması, metnin veya alan-spesifik hassas verinin güvenli olduğunu kanıtlamaz. İnsan incelemesi zorunludur.

## Codex uygulaması sınırı

- Operatör Codex uygulamasında GPT-5.6 modelini görünür şekilde seçer.
- Hazırlanmış görev yalnız izinli prompt, sentetik input ve hedef output yollarını içerir.
- `AGENTS.md`, `.env`, credential, production log ve repo dışı özel dosya erişimini yasaklar.
- Model API'si veya API anahtarı kullanılmaz.
- Codex'in oluşturduğu config deterministik validator PASS almadan uygulanmaz.
- İnsan review sonrasında manifest yalnız model beyanı, dosya yolları, hash'ler, validation istatistiği ve review durumunu kaydeder.
- Script Codex'in seçili modelini okuyamaz; manifest bunu açıkça kriptografik olmayan operatör onayı olarak işaretler.

## Runtime ve uygulama sınırı

- Yerel preview JSON'u browser içinde parse/render eder ve config değerlerinde `textContent` kullanır.
- Sayfa yalnız repo içindeki sentetik örnekleri aynı local origin'den çeker.
- Preview'da analytics, telemetry, external API, model çağrısı, database connection veya persistence yolu yoktur.
- `apply-demo-config.mjs` varsayılan olarak izole `ai-buildweek/demo-config/` konumuna yazar ve mevcut hedefi yedekler.
- Customer runtime verisi, authorization, tenant isolation ve payload enforcement müşteri altyapısında kalır.

## “AI agent SaaS veritabanını okuyor” yaklaşımından farkı

Model runtime kayıtlarını değil mimari girdileri görür. Geliştiricinin inceleyebileceği, test edebileceği ve reddedebileceği bir sözleşme önerir. Müşteri veritabanını gezmez, canlı admin oturumunda işlem yapmaz ve production kaydından iş durumu çıkarmaz. Değer; veri düzlemini AI sınırının dışında tutarken tasarım tutarlılığı ve test planı üretmektir.
