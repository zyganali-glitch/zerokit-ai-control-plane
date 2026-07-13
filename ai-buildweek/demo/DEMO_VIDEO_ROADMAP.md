# Demo video prodüksiyon yol haritası

## Stratejik karar

Ana demoda **bu repo ve hazır sentetik okul SaaS senaryosu** kullanılmalı. Başka bir proje ana ürün yapılmamalı. ZeroKit yarışmaya sunduğumuz üründür; okul senaryosu RBAC, navigasyon, alanlar, faturalandırma görünürlüğü, endpoint eşleme, TR/EN ve mahremiyet sınırını gerçek öğrenci verisi kullanmadan tek akışta gösterir.

**PocketBase yalnızca kısa açık kaynak uyumluluk kanıtı** olmalı. PocketBase, MIT lisanslı ve yerelde kolay çalışan bir backend'dir. Belgelenmiş `items/totalItems` cevabının ZeroKit'in `users/total` sözleşmesinden farklı olması adaptör değerini birkaç saniyede anlatır.

Bu kurgu iki jüri sorusunu ayırır:

1. “Başvurulan ürün çalışıyor mu?” — ZeroKit'i baştan sona göster.
2. “Bu yalnızca elle hazırlanmış bir JSON mu?” — Codex görevini, manifesti ve PocketBase adaptörünü göster.

## API kullanmadan GPT-5.6/Codex akışı

Ürün hiçbir model API'si çağırmaz ve API anahtarı kullanmaz. Akış şudur:

1. Yerel script sentetik girdiyi mahremiyet açısından tarar.
2. Script, sınırları ve hedef dosyayı içeren tekrar üretilebilir Codex görev dosyası hazırlar.
3. Operatör Codex uygulamasında **GPT-5.6 Sol** seçer.
4. Codex görev dosyasını okuyup config'i doğrudan repo içinde oluşturur.
5. Deterministik validator config'i kontrol eder.
6. İnsan config'i inceler.
7. Yerel script model seçimi beyanını, dosya hash'lerini ve validation sonucunu manifest olarak kaydeder.

Model seçimi arayüzde görünür olmalıdır. Manifest bu seçimi kriptografik doğruladığını iddia etmez; operatör onayı ve video kanıtı kullanır.

## Açık kaynak proje göstermek uygun mu?

Evet. OpenAI Build Week mevcut bir proje üzerinde geliştirmeye izin veriyor. Ancak lisansa ve atfa dikkat edilmeli.

PocketBase kullanırken:

- “PocketBase, adaptör kanıtında kullanılan açık kaynak backend'dir” de.
- PocketBase'in ZeroKit'in parçası veya projeyi destekleyen kuruluş olduğunu ima etme.
- ZeroKit markasını PocketBase markasıyla değiştirme.
- Yazılı başvuruda PocketBase repo ve dokümantasyon bağlantılarını ver.
- Dahil fixture'ın belgelenmiş liste zarfını taklit eden sentetik veri olduğunu söyle.
- Canlı PocketBase kullanırsan sürümü sabitle; proje 1.0 öncesi geriye uyumluluk konusunda uyarı yapıyor.

## Dil kararı

Yarışma sayfasında İngilizce anlatım zorunluluğu belirtilmiyor. Bu nedenle:

- anlatım dili **Türkçe** olabilir;
- videoya okunabilir, gömülü **İngilizce altyazı** eklenmeli;
- Devpost açıklaması kısa Türkçe ve İngilizce özet içermeli;
- ekrandaki ürün dili ana akışta İngilizce tutulabilir, TR geçişi iki saniyelik kanıt olarak gösterilebilir.

Bu düzen hem anlatanı rahatlatır hem uluslararası jüri erişimini korur.

## Önerilen teknik format

- Hedef süre: Devpost farklı bir üst sınır açıklayana kadar **2:50–2:58**.
- Çözünürlük: 1920×1080.
- Kare hızı: 30 fps.
- Codec: H.264, yüksek kalite.
- Terminal/editor yazısı: ekranda en az 18–22 px görünmeli.
- Ses: konuşma tepe seviyesi yaklaşık -6 dB; hafif gürültü azaltma.
- İmleç: görünür, normal hızda; anlatım hedefe gelmeden hareket ettirme.
- Kurgu: düz kesmeler, iki veya üç kısa callout; uzun logo animasyonu kullanma.

## Kayıttan önce zorunlu P0 kapısı

Temiz terminalde çalıştır:

```bash
npm ci
npm run build
npm run test:unit
npm run test:privacy
npm run codex:prepare -- ai-buildweek/examples/school-saas.input.md --force
npm run demo:pocketbase
npm run test:browser
```

PASS koşulları:

- görev paketi hazırlanır;
- mahremiyet engeli ve inceleme bulgusu sıfırdır;
- görev dosyası yalnızca izinli prompt/input/output yollarını içerir;
- hiçbir model API'si, API anahtarı veya harici model çağrısı yoktur;
- 18 birim, 8 mahremiyet/Codex, 16 browser kontrolü ve üç config doğrulaması geçer;
- PocketBase adaptörü `2 items → 2 users` PASS verir;
- worktree yalnızca bilinçli değişiklikler içerir.

Sonra Codex uygulamasında:

1. Proje olarak bu repo klasörünü aç.
2. Model seçiciden **GPT-5.6 Sol** seç.
3. Eforu önce `high`, son kayıt için hesabında varsa `max` yap.
4. Yeni görev aç.
5. Şunu yaz:

   ```text
   AGENTS.md kurallarına uy. ai-buildweek/runs/school-saas.codex-task.md dosyasını oku ve görevi tamamla.
   ```

6. Codex'in hedef config'i yazmasını ve validator çalıştırmasını bekle.
7. Diff'i incele; gerçek veri, fazla yetki, uydurulmuş uyumluluk veya gereksiz dosya olmadığını kontrol et.
8. Çıktıyı insan gözüyle onayla.
9. Manifesti kaydet:

   ```bash
   npm run codex:record -- \
     ai-buildweek/examples/school-saas.input.md \
     ai-buildweek/runs/school-saas.codex-task.md \
     ai-buildweek/evidence/school-saas.gpt-5.6.codex.config.json \
     --model="GPT-5.6 Sol" --confirm-model-visible --confirm-reviewed \
     --thread=school-demo-run
   ```

## Kayıttan bir gün önce hazırlık

### 1. Temiz jüri klonu

Yeni klasöre klon al. Komutların temiz klonda çalıştığını doğrula. Özel donor repo veya kişisel dosya içeren çalışma alanından kayıt alma.

### 2. Dört pencere hazırla

1. Codex uygulaması: repo açık, model seçici görünür.
2. Editor: okul input, görev dosyası, yeni config ve manifest sekmeleri hazır.
3. Terminal: repo kökü, büyük font, kısa prompt, temiz geçmiş.
4. Browser: `http://127.0.0.1:4173`, İngilizce/dark, %100 zoom.

Kayıttan önce sekmeleri sırala; dosya ağacında arama yapmak süre kaybettirir.

### 3. Yerel preview

Görünmeyen ayrı terminalde `npm run dev` çalıştır. Okul senaryosunu bir kez yükle, console hatası olmadığını kontrol et, sonra başlangıç ekranına dön.

### 4. Codex çalışma süresi

Gerçek Codex çalışmasını kesintisiz ayrı klip olarak kaydet. Uzun sürerse videoda hızlandır veya kes; ekrana “Gerçek Codex görevi — geçen süre 00:XX” yaz. Başlangıçtaki GPT-5.6 Sol seçimini ve son PASS'i koru. Kesmenin gerçek zaman olmadığını gizleme.

## Tam 2:55 çekim planı

| Zaman | Ekran | Eylem | Jürinin aklında kalması gereken |
| --- | --- | --- | --- |
| 0:00–0:12 | Bitmiş ZeroKit preview | Panel, rol ve endpoint sayısını göster; okul/ajans arasında hızlı geçiş | Bu çalışan ürün sonucu, yalnızca prompt değil. |
| 0:12–0:25 | Okul girdisi | Roller, paneller, sentetik endpoint özeti ve “öğrenci kaydı yok” satırını vurgula | Model yalnızca sansürlenmiş mimari sözleşmeyi görür. |
| 0:25–0:37 | Terminal + görev dosyası | `codex:prepare` PASS ve görev paketini göster | Hassas input modelden önce yerelde kontrol edilir. |
| 0:37–0:52 | Codex uygulaması | Model seçicide GPT-5.6 Sol ve eforu göster; görevi başlat | GPT-5.6, gerçek Codex ürün akışının merkezindedir. |
| 0:52–1:12 | Hızlandırılmış Codex klibi | Codex'in config yazıp validator çalıştırmasını göster | Model yalnızca metin üretmiyor; repoda sınırlandırılmış işi tamamlıyor. |
| 1:12–1:27 | Diff + manifest | İnsan review, model beyanı, output hash ve validation PASS | Sonuç denetlenebilir; model seçimi dürüstçe operatör onaylıdır. |
| 1:27–1:50 | Preview | Yeni config'i yükle; panel/RBAC/field/endpoint/privacy; TR/light geçişi | Sonuç tutarlı, kullanılabilir, responsive ve bilingual. |
| 1:50–2:12 | PocketBase kanıtı | `items/totalItems`, ardından `npm run demo:pocketbase` PASS | Route esnek olabilir; payload uyumu açık ve testlidir. |
| 2:12–2:29 | Mahremiyet sınırı | AGENTS denylist ve preview'daki mahremiyet notlarını göster | Müşteri kayıtları ve runtime authorization model sınırının dışındadır. |
| 2:29–2:45 | Test kanıtı | Unit, privacy, browser ve üç senaryo PASS | Uygulama basit olmayan ve tekrar üretilebilir mühendislik içerir. |
| 2:45–2:55 | Kapanış | Okul → sağlık → ajans, repo URL'si ve tek cümle iddia | Bir tarif; incelenebilir config, adaptör planı ve kapılar. |

## Türkçe anlatım omurgası

> “Her özelleştirilmiş SaaS yönetim paneli aynı riskli sorularla başlıyor: hangi yüzeyler var, kim ne yapabilir ve müşteri backend'i gerçekten beklenen sözleşmeye uyuyor mu? ZeroKit önce sentetik gereksinimi yerelde mahremiyet kontrolünden geçiriyor. Sonra Codex uygulamasında seçtiğimiz GPT-5.6 Sol, bu sınırlı görev dosyasından incelenebilir bir kontrol düzlemi config'i üretiyor. Deterministik doğrulama ve insan incelemesi sonucu kapatıyor. Matching URL, matching payload demek olmadığı için PocketBase'in items/totalItems zarfını ZeroKit'in users/total sözleşmesine çeviren adaptör de fail-closed test ediliyor. Böylece mimari ilk taslağı hızlanırken müşteri veri düzlemi model döngüsünün dışında kalıyor.”

Şunları söyleme: “anında”, “production-ready”, “her backend ile çalışır”, “sıfır bağımlılık”, “hiç veri sızamaz”, “model seçimi script tarafından doğrulandı”.

## PocketBase için iki gösterim seviyesi

### Üç dakikalık ana video: deterministik fixture

```bash
npm run demo:pocketbase
```

Avantajları: indirme yok, ağ yok, deterministik çıktı, hızlı reset ve jüri tarafından hemen tekrar üretilebilir. Sınırı açık söyle: bir belgelenmiş response zarfını kanıtlar; canlı PocketBase deployment'ı değildir.

### İsteğe bağlı uzun teknik video: yerel PocketBase

1. Resmî repodan sabit bir PocketBase sürümü indir.
2. `127.0.0.1:8090` üzerinde geçici data klasörüyle başlat.
3. `school_users` koleksiyonu oluştur.
4. Alanlar: `display_name`, `role`, `account_status`, `campus`, `department`, `support_status`.
5. Yalnızca repodaki iki sentetik kaydı ekle.
6. Collection list/view kurallarını bilinçli yapılandır.
7. `GET /api/collections/school_users/records?page=1&perPage=30` çağrısını yerelde yap.
8. Sentetik cevabı adaptör CLI'ına ver.
9. `items → users`, `totalItems → total` dönüşümünü göster.
10. Kayıt sonrasında geçici data klasörünü sil.

Ana videoda PocketBase dashboard kurulumuna zaman harcama; bu, PocketBase'i ürün gibi gösterir ve Codex/GPT-5.6 hikâyesini gömer.

## Manifestte gösterilecek alanlar

- `surface`
- `model_selection.label`
- `visible_in_app_confirmed_by_operator`
- `cryptographically_verified: false`
- `hashes.input_sha256`
- `hashes.task_sha256`
- `hashes.output_sha256`
- `privacy_guard.blocking_findings`
- `validation.valid`
- `human_review.completed`

Manifest girdi/görev/çıktı içeriğini veya model muhakemesini içermez.

## Hata ve kurtarma planı

| Sorun | Yapılacak |
| --- | --- |
| GPT-5.6 Sol model seçicide yok | Uygulamayı güncelle, hesabın rollout/plan erişimini kontrol et; başka modeli GPT-5.6 diye gösterme. |
| Codex görev süresi uzun | Gerçek klibi süre etiketiyle hızlandır veya kes. |
| Model çıktısı validation FAIL | Hatayı saklama; görevi/refine talimatını düzelt, yeniden çalıştır, geçen çıktıyı review et. |
| Privacy guard input'u blokladı | Guard'ı atlama; girdiyi sansürle ve yeniden hazırla. |
| Model yanlış dosya okuyor | Görevi durdur; AGENTS/task denylist'ini sıkılaştır; temiz thread aç. |
| Browser state eski | Hard refresh, okul senaryosunu yükle, English/dark başlangıcına dön. |
| PocketBase proof bozuk | Canlı DB ile uğraşma; checked-in fixture ve unit teste dön. |
| Bildirim açıldı | Özel içerik görünürse klibi tamamen yeniden çek. |

## Görsel ve kurgu kuralları

- README ile değil sonuç ekranıyla aç.
- Her sahnede tek fikir ve tek vurgulu bölge olsun.
- İki kalıcı kavram kullan: “AI tasarım düzlemi” ve “müşteri veri düzlemi”.
- Yeşili yalnızca doğrulanmış PASS için kullan; amber insan incelemesi; kırmızı block/FAIL.
- Kişisel Windows hesap yollarını mümkün olduğunca kadraj dışında tut.
- Önceden kaldırılması gereken özel bilgiyi blur ile kurtarmaya çalışma.
- 0:12'den sonra alt köşede küçük repo URL'si göster.
- Export sonrası videoyu normal hızda baştan sona izle ve terminal satırlarının laptop ekranında okunabildiğini doğrula.

## Çekimi iptal edip yeniden alma ölçütleri

- Gerçek e-posta, özel repo, müşteri benzeri kayıt veya kişisel bildirim görünür.
- Ekrandaki çıktı ile manifest hash'i uyuşmaz.
- Komut FAIL verirken anlatım PASS der.
- GPT-5.6 seçilmemişken seçilmiş gibi anlatılır.
- Bir PocketBase adaptöründen genel backend uyumu iddia edilir.
- İlk 15 saniyede ürün sonucu görünmez.
- Video Devpost'un yayımladığı süre sınırını aşar.

## Başvuru paketi kontrol listesi

- GitHub repo test edilen commit'e işaret ediyor.
- README quick start temiz klonda çalışıyor.
- Video giriş yapmadan izlenebiliyor.
- Türkçe anlatım üzerinde gömülü İngilizce altyazı var.
- Devpost açıklaması desteklenen dar iddiayı Türkçe ve İngilizce veriyor.
- Teknolojiler: GPT-5.6, Codex uygulaması, Node.js, browser API'leri; PocketBase yalnız adaptör kanıtı.
- Repo, video ve Devpost aynı proje adını ve test sayılarını kullanıyor.
- Lisans ve özel donor sınırı açık.
- Git geçmişi, video kareleri, altyazı ve açıklamada secret yok.
- Gönderim günü Devpost'un güncel dosya/süre/alan gereksinimleri tekrar kontrol edilmiş.

## Önerilen ek materyaller

1. Bu plana göre 2:55 ana jüri videosu.
2. 20–30 saniyelik sessiz GIF: input → görev → validate → preview.
3. 5–7 dakikalık isteğe bağlı teknik video: Codex task sınırı, privacy testleri, PocketBase adaptörü, browser smoke.
4. GPT-5.6 tasarım girdileri ile müşteri runtime verisini kalın çizgiyle ayıran tek mimari görsel.

Ana video tek başına anlaşılmalıdır; ek materyaller güveni derinleştirir.
