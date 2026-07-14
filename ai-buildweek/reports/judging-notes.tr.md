# Build Week jüri notları

- Önerilen track: **Developer Tools**
- Doğrulanmış, yeniden build gerektirmeyen preview: `https://zyganali-glitch.github.io/zerokit-ai-control-plane/`
- Özel Devpost kanıtı: ana Codex görevindeki `/feedback` Session ID; repoya yazılmaz
- Zaman/delta açıklaması: [build-week-delta.md](build-week-delta.md)

## Neden Build Week projesi?

Bu repo, özel ticari ZeroKit kod tabanının yarışmaya odaklanmış açık uyarlamasıdır. SaaS teslimatının zor ve tekrarlanan bölümünü seçer: gereksinim ve backend sözleşmesini tutarlı bir kontrol düzlemi tanımına dönüştürmek. Akışı jüri için incelenebilir, çalıştırılabilir ve test edilebilir yapar.

## GPT-5.6/Codex neden merkezde?

GPT-5.6/Codex mimari/config/test eş tasarımcısıdır:

1. Config mimarı sansürlenmiş ürün niyetini panel, RBAC, alan, endpoint, marka, mahremiyet notu ve test kapılarına dönüştürür.
2. Adaptör mapper, sansürlenmiş backend sözleşmesini route-flexible/payload-strict beklentiyle karşılaştırır ve uyumluluk uydurmaz.
3. Gate planner unit, smoke, privacy, i18n, responsive ve evidence kontrolleri üretir.
4. Demo generator gerçek PASS/FAIL kanıtını kısa jüri anlatısına dönüştürür.

Bu bir admin verisine eklenmiş chatbot değildir. Modelin mimari reasoning için production veriye ihtiyacı yoktur.

## Codex uygulaması akışı

- `codex:prepare` sentetik girdiyi yerelde tarar ve sınırlandırılmış görev dosyası üretir.
- Operatör Codex uygulamasında GPT-5.6 Sol'u görünür şekilde seçer.
- Codex görev dosyasını çalıştırır ve output'u repo içinde oluşturur.
- Deterministik validator PASS almayan artifact reddedilir.
- İnsan review sonrasında hash manifesti oluşturulur.
- Manifest model seçimini operatör onaylı ve kriptografik olmayan kanıt diye açıkça etiketler.
- Model API'si ve API anahtarı yoktur.

## Açık yarışma sürümü ne içeriyor?

- dört tekrar kullanılabilir GPT-5.6/Codex prompt workflow'u;
- okul, sağlık ve ajans sentetik input/config senaryoları;
- Codex görev paketi, privacy preflight ve manifest araçları;
- CLI, test ve browser preview tarafından paylaşılan sıfır-runtime-package validator;
- güvenli demo apply ve Markdown rapor üreticileri;
- TR/EN, light/dark, responsive browser-only preview;
- sentetik adaptör gap, privacy, build evidence, demo ve screenshot rehberi;
- testli PocketBase response-envelope adaptörü.

## Neler ayrı kalıyor?

Özel ticari donor kod tabanı, geniş panel envanteri, özel roadmap ve ticari lisansı bu repoya dahil değildir. Repo donor ürünün tüm yüzeyinin tamamlandığını iddia etmez.

## Testler neyi kanıtlıyor?

- Üç örnekte required registry'ler vardır ve açık basic type contract'ını karşılar.
- Codex testleri görev paketinin yalnız yerel dosya sınırını kullandığını, katı generated-artifact alanlarını, model/review beyanını ve secret içermeyen manifesti doğrular.
- Privacy testleri yüksek güvenli secret ve non-reserved e-postayı modelden önce bloklar; insan sanitization yine gerekir.
- PocketBase testleri başarılı zarf dönüşümünü ve eksik/yanlış key'de fail-closed davranışı doğrular.
- Preview projection açık/kapalı panel ile RBAC, field, endpoint, warning ve privacy kanıtını korur.

Testler müşteri backend payload uyumunu genel olarak kanıtlamaz; her backend için fixture, adaptör ve authorization testi gerekir.

## Jüri çalıştırma yolu

```bash
npm ci
npm run build
npm run test:unit
npm run test:privacy
npm run codex:prepare -- ai-buildweek/examples/school-saas.input.md --force
npm run demo:pocketbase
npm run dev
```

`http://127.0.0.1:4173` adresini aç; senaryo/dil/tema değiştir ve adaptör/mahremiyet raporlarını incele. Son GPT-5.6 üretimi Codex uygulamasında hazır görev dosyasıyla yürütülür.

Herkese açık video üç dakikadan kısa olmalı; ürünün ne yaptığını ve Codex/GPT-5.6'nın nasıl kullanıldığını açıklayan İngilizce insan sesi veya İngilizce TTS içermelidir. İngilizce altyazılar sesi destekler, sesin yerini tutmaz.
