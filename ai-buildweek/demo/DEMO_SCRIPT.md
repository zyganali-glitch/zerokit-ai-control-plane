# Üç dakikalık Build Week demo metni

## 0:00–0:18 — Tekrarlanan SaaS maliyeti

**Ekran:** Bitmiş okul preview'su, ardından okul senaryo girdisi.

**Anlatım:** “Her SaaS yönetim yüzeyi aynı pahalı sorularla başlıyor: hangi paneller var, kim ne yapabilir, hangi alanlar müşteriye göre değişir ve backend gerçekten beklenen sözleşmeyi karşılıyor mu? Boilerplate ilk günü hızlandırıyor; müşteri değişiklikleri sonraki teknik borcu oluşturuyor.”

## 0:18–0:35 — ZeroKit socket sözleşmesi

**Ekran:** Dört registry adı ve mimari şema.

**Anlatım:** “ZeroKit bu kararları dört parçalı bir socket sözleşmesine çeviriyor: panel registry, RBAC registry, field registry ve endpoint map. Route'lar değişebilir; payload şekli kanıtsız varsayılmaz.”

## 0:35–1:02 — Codex uygulamasında GPT-5.6

**Ekran:** `codex:prepare` PASS, görev dosyası, Codex model seçicide GPT-5.6 Sol, görev başlangıcı.

**Anlatım:** “Yerel guard sansürlenmiş okul brief'ini modelden önce kontrol ediyor. Codex uygulamasında GPT-5.6 Sol'u görünür şekilde seçiyoruz ve sınırlandırılmış görev dosyasını çalıştırıyoruz. Model API'si, API anahtarı veya production kaydı yok.”

## 1:02–1:25 — Doğrulama ve kanıt

**Ekran:** Codex'in config'i yazması, validator PASS, diff review ve manifest.

```bash
node ai-buildweek/scripts/validate-config.mjs ai-buildweek/evidence/school-saas.gpt-5.6.codex.config.json
```

**Anlatım:** “Codex sonucu doğrudan repo içinde oluşturuyor. Deterministik validator required registry'leri ve generated-artifact alanlarını kontrol ediyor. İnsan incelemesinden sonra manifest model beyanını, dosya hash'lerini ve PASS istatistiklerini kaydediyor; model doğrulamasını kriptografikmiş gibi göstermiyor.”

## 1:25–1:50 — Yerel kontrol düzlemi preview'su

**Ekran:** Yeni JSON'u preview'ya yükle; okul özeti, kapalı team billing, roller, endpoint'ler; TR/light geçişi.

**Anlatım:** “Browser-only preview; açık ve kapalı panelleri, RBAC rollerini, alanları, endpoint'leri, uyarıları ve mahremiyet notlarını gösteriyor. Türkçe ve İngilizce, light ve dark, desktop ve mobile çalışıyor. Yapıştırılan config bu tab'dan dışarı çıkmıyor.”

## 1:50–2:13 — Route iyimserliği yerine adaptör gerçeği

**Ekran:** PocketBase sentetik response, ardından `npm run demo:pocketbase` PASS.

**Anlatım:** “PocketBase açık kaynak backend'inin listesi items ve totalItems döndürüyor. Bu testli adaptör onu ZeroKit'in katı users ve total sözleşmesine çeviriyor ve eksik key'de fail-closed davranıyor. ZeroKit route-flexible; payload-shape agnostic değil.”

## 2:13–2:31 — Mahremiyet sınırı

**Ekran:** `AGENTS.md` yasakları, privacy boundary ve preview banner.

**Anlatım:** “Bu, SaaS veritabanını okuyan bir AI agent değil. Model; gereksinimleri, şemaları ve sentetik sözleşmeleri görüyor. Müşteri kayıtları, yetkilendirme ve tenant isolation müşteri altyapısında kalıyor. Pattern guard'ın tek başına yeterli olmadığını kabul ediyor ve insan review'u zorunlu tutuyoruz.”

## 2:31–2:48 — Kanıt

**Ekran:** Unit, privacy, üç config ve browser PASS satırları.

**Anlatım:** “Yarışma sürümü sıfır frontend runtime npm bağımlılığıyla build oluyor. Codex görev/manifest testleri, üç config doğrulaması, PocketBase adaptörü ve gerçek browser smoke kontrolleri tekrar üretilebilir PASS/FAIL kanıtı sağlıyor.”

## 2:48–3:00 — Etki

**Ekran:** Okul, sağlık ve ajans senaryo kartları, ardından repo URL'si.

**Anlatım:** “SaaS'ı bir kez sansürlenmiş şekilde tarif et; incelenebilir bir kontrol düzlemi sözleşmesi, adaptör planı ve test kapıları elde et. Müşteri veri düzlemini modelin dışında tut. ZeroKit AI Control Plane.”
