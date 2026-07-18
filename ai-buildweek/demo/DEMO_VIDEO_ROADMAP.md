# İngilizce seslendirmeli demo videosu — sıfırdan, tıklama tıklama kılavuz

Bu belge teknik bilgisi ve İngilizcesi olmayan bir kullanıcının bile videoyu tek başına hazırlayabilmesi için yazılmıştır. Senin İngilizce konuşman gerekmiyor: güncel resmî FAQ yapay zekâ destekli seslendirmeye izin veriyor. Hazır İngilizce metni Clipchamp'in **Text to speech / Metinden konuşmaya** özelliğine yapıştırıp İngilizce ses oluşturacağız. Hazırlık açıklamaları Türkçe; jüriye giden uygulama ve yapay ses İngilizce olacaktır. Resmî şartlarda altyazı zorunlu değildir; ürün kanıtını kapatmamak için dolgu kutulu altyazı eklenmeyecektir. Başvuru gününde [Devpost Official Rules](https://openai.devpost.com/rules) ve [FAQ](https://openai.devpost.com/details/faqs) sayfalarını son kez kontrol et; resmî metin her zaman önceliklidir.

## En kısa cevaplar

- Hazır giriş senaryomuz **sentetik School SaaS** gereksinimleridir.
- Nihai tarayıcı kanıtı paketli örnekten değil, videoda GPT-5.6 Sol ile taze üretilen ve insan tarafından incelenen evidence JSON dosyasından gelecektir.
- Ana videoda yalnız açık repodaki çalışan ZeroKit yüzeyi, Terminal ve bu projeye ait Codex görevi gösterilecek.
- Ajana yapıştırılacak komut **İngilizce** olacak.
- `http://127.0.0.1:4173` yalnızca kendi bilgisayarında açılan, ücretsiz yerel adrestir.
- Herkese açık adresimiz ücretsiz GitHub Pages'tir: <https://zyganali-glitch.github.io/zerokit-ai-control-plane/>.
- Demo için ücretli alan adı, ücretli hosting, model API'si veya API anahtarı gerekmez.
- Codex uygulaması internet ve hesabındaki Codex erişimini kullanır; bu bir API faturası değildir ama hesabının plan/kullanım sınırlarına tabidir.
- Video İngilizce olacak: ekrandaki uygulama dili ve yapay ses İngilizce olacak. Video üç dakikadan kısa ve **Public / Herkese açık** YouTube videosu olacak. Dolgu kutulu altyazı eklenmeyecek.

## En önemli kanıt kuralı

Paketli `school-saas.generated.config.json` dosyası ürünün nasıl göründüğünü önceden denemek içindir. Nihai yarışma kanıtı değildir. Final videoda şu sıra bozulmamalıdır:

1. GPT-5.6 Sol görünür biçimde seçilir.
2. Taze dosya `ai-buildweek/evidence/school-saas.gpt-5.6.codex.config.json` yoluna üretilir.
3. Sıkı yerel validator gerçek `PASS` verir.
4. Dosya insan tarafından incelenir.
5. Hash manifesti kaydedilir.
6. Tarayıcıda **Choose local JSON** düğmesine basılır ve aynı taze evidence dosyası seçilir.
7. Ekranda `PASS — config is structurally valid` görülür.

Taze evidence dosyası yoksa veya validator/manifest tamamlanmadıysa kayıt durdurulur. **Load sample** düğmesine basıp paketli örneği final kanıt gibi gösterme.

## Küçük sözlük

| Kelime | Çok basit anlamı |
|---|---|
| Repo / repository | Projenin bütün dosyalarının bulunduğu klasör |
| Codex | Kod üzerinde çalışan OpenAI masaüstü çalışma alanı |
| Task / görev | Codex'e verdiğimiz tek iş |
| Model picker | Codex'te kullanılacak modeli seçtiğimiz açılır menü |
| Terminal | Yazılı komut verdiğimiz siyah veya koyu pencere |
| Komut | Terminale yapıştırıp `Enter` tuşuna bastığımız satır |
| Local / yerel | Yalnızca kendi bilgisayarında çalışan |
| Preview | Projenin tarayıcıda görünen deneme ekranı |
| Config | Panelleri, rolleri, alanları ve adresleri tarif eden JSON dosyası |
| Evidence JSON | Bu kayıtta GPT-5.6 Sol ile taze üretilen ve incelenen kanıt dosyası |
| PASS | Kontrol başarıyla geçti |
| FAIL | Kontrol başarısız; videoya devam etmeden düzeltilmeli |
| Clip | Videonun küçük bir parçası |
| Manifest | İncelenen dosyaların özet/hash kanıtı; dosya içeriğini kopyalamaz |

## Kullanacağımız şeyler ve ücret durumu

| Araç | Ne için? | Ücretli şart mı? |
|---|---|---|
| Node.js 22 veya daha yeni | Yerel komutları ve testleri çalıştırmak | Hayır; ücretsiz LTS sürümü yeterli |
| Codex masaüstü uygulaması | GPT-5.6 ile okul config'ini üretmek | Ayrı model API anahtarı/faturası yok; mevcut OpenAI hesabının Codex erişimi gerekir |
| Windows Terminal / PowerShell | Hazırlık ve test komutları | Hayır |
| Chrome veya Edge | Yerel preview'yu göstermek | Hayır |
| Windows Ekran Alıntısı Aracı | Ekran videosu kaydetmek | Hayır |
| Microsoft Clipchamp | Klipleri birleştirip İngilizce yazıları eklemek | 1080p için ücretsiz özellikleri kullanabiliriz; elmas simgeli premium öğeleri seçme |
| GitHub Pages | Jüriye herkese açık canlı preview göstermek | Hayır; bu repo için ücretsiz adres hazırdır |
| YouTube | Zorunlu herkese açık demo videosu | Hayır |

`127.0.0.1`, bilgisayarın kendisini ifade eder. `4173` ise preview'nun kullandığı kapı numarasıdır. Bu adres internette yayınlanmaz; başka biri kendi bilgisayarından senin `127.0.0.1` adresine ulaşamaz. Video kaydı için bu iyidir. Jürinin açacağı herkese açık kopya zaten ücretsiz GitHub Pages üzerindedir. Ücretli alan adı veya ek hosting satın alma.

İnternet yalnız şu işler için gerekebilir: Codex uygulamasının hesabındaki modeli kullanması, GitHub'a gönderim, Pages/YouTube/Devpost'u açma ve ilk npm kontrolü. Yerel preview seçtiğin JSON'u tarayıcıda inceler; üçüncü taraf veya model isteği göndermez, ücretli domaine ya da canlı müşteri backend'ine bağlanmaz.

## Bölüm 1 — Kayıttan bir gün önce hazırlık

### 1.1 Kişisel şeyleri kapat

1. Tarayıcıdaki e-posta, banka, sosyal medya ve özel proje sekmelerini kapat.
2. Bildirimlerin videoya düşmemesi için Windows'ta sağ alttaki saat bölümüne tıkla.
3. Görünen panelde **Rahatsız etmeyin** seçeneğini aç. Bu ad yoksa **Odak** seçeneğini aç.
4. Masaüstünde kişisel dosya adları görünüyorsa bütün kayıt boyunca uygulamaları tam ekran kullan.
5. Codex'te bu projeyle ilgisiz bir görev açıksa kapat veya ZeroKit görevine geç.

Beklenen sonuç: ekranda yalnız yarışma projesi, Terminal ve preview bulunacak.

### 1.2 Proje klasörünün doğru olduğunu doğrula

Kullanacağımız klasör aşağıdadır. `%USERPROFILE%`, Windows'un senin kullanıcı klasörünü kendiliğinden bulması anlamına gelir; bunu değiştirmen gerekmez.

```text
%USERPROFILE%\Desktop\zerokit\zerokit-ai-control-plane
```

1. Klavyede Windows logolu tuşa bas.
2. `Dosya Gezgini` yaz ve çıkan uygulamaya tıkla.
3. Pencerenin üstündeki adres çubuğuna bir kez tıkla.
4. Yukarıdaki klasör yolunu yapıştır.
5. `Enter` tuşuna bas.

Beklenen sonuç: klasörde `README.md`, `package.json`, `frontend` ve `ai-buildweek` adlarını görürsün. Bunlardan biri görünmüyorsa yanlış klasördesin.

### 1.3 Node.js 22 veya daha yeni olduğunu kontrol et

Node.js, aşağıdaki `npm.cmd` komutlarının çalışmasını sağlayan ücretsiz programdır.

1. Klavyede Windows logolu tuşa bas.
2. `Terminal` yaz ve **Terminal** veya **Windows Terminal** sonucuna tıkla.
3. Aşağıdaki komutu yapıştır ve `Enter` tuşuna bas:

```powershell
node --version
```

Beklenen sonuç `v22.` ile başlayan veya daha büyük bir sayı, örneğin `v22.17.0` ya da `v24.1.0` görmektir.

- `node is not recognized` benzeri bir hata görürsen Node.js kurulu değildir.
- Sonuç `v20` veya daha küçükse bu repo için sürüm eskidir.

Kurmak veya güncellemek gerekiyorsa:

1. Chrome veya Edge'i aç.
2. Adres çubuğuna `https://nodejs.org/en/download` yazıp `Enter` tuşuna bas.
3. **LTS** ve **Windows Installer (.msi)** yazan 64-bit seçeneği indir. “Current” yerine LTS seçmek daha güvenlidir.
4. İndirilen `.msi` dosyasına çift tıkla.
5. Kurulum pencerelerinde **Next / İleri** düğmesine bas; lisans onayını işaretle; varsayılan seçenekleri değiştirmeden **Install / Yükle** düğmesine bas.
6. Windows izin sorarsa **Yes / Evet** seç.
7. **Finish / Bitir** düğmesine bas.
8. Açık Terminal pencerelerini tamamen kapat ve yeniden Terminal aç.
9. `node --version` komutunu yeniden çalıştır.
10. Son olarak şunu çalıştır:

```powershell
npm.cmd --version
```

Beklenen sonuç: iki komut da kırmızı hata vermeden sürüm numarası gösterir. Bu iki kontrol geçmeden sonraki adıma geçme.

### 1.4 Codex'te doğru proje ve modeli aç

OpenAI arayüzü güncellemelerle küçük farklılıklar gösterebilir. Aşağıdaki adlardan biri görünür; anlamı aynıdır.

1. Codex masaüstü uygulamasını aç.
2. Sol tarafta **New task**, **Yeni görev**, `+` veya kalem simgesi görürsen ona tıkla.
3. Proje seçili değilse sol üstteki proje/klasör adına tıkla.
4. **Open folder**, **Add project** veya **Klasör aç** seçeneğini seç.
5. Bir önceki bölümdeki `zerokit-ai-control-plane` klasörünü seç ve **Klasör Seç** düğmesine bas.
6. Yeni görevin yazı kutusunun yakınındaki model adına tıkla. Gerekirse **Advanced / Gelişmiş** seçeneğini aç.
7. Model listesinden doğrudan **GPT-5.6 Sol** seç. Yalnız `High` yazması model kanıtı değildir; model adı ayrıca görünmelidir.
8. **Intelligence / Zekâ düzeyi** seçeneğinde **Ultra** görünüyorsa final kayıt için onu seç. Güncel Codex rehberi Ultra'yı maksimum akıl yürütme ve uygun işlerde proaktif alt ajan kullanımı sunan en yüksek düzey olarak tanımlar.
9. Ultra görünmüyorsa var olmayan bir etiketi söyleme; ekranda gerçekten bulunan en yüksek düzeyi seç. Bu etiket **Max**, **Extra High** veya **High** olabilir.
10. Seçiciyi bir kez tekrar açıp **GPT-5.6 Sol** ve seçili gerçek zekâ düzeyinin görünür olduğunu kontrol et; henüz görev başlatma.

GPT-5.6 Sol hiç görünmüyorsa:

1. Codex uygulamasında profil/ayar simgesine tıkla.
2. **Settings / Ayarlar** ve ardından **About / Hakkında** bölümünü ara.
3. Güncelleme düğmesi varsa güncelle ve uygulamayı yeniden aç.
4. Hesabının doğru hesap olduğunu kontrol et.
5. Yine görünmüyorsa başka modeli GPT-5.6 diye göstermeden kaydı ertele. Bu, dürüst kanıt için önemlidir.

Resmî başvuru öncesi kontrol bağlantısı: <https://help.openai.com/en/articles/20001354-gpt-56-in-chatgpt>

### 1.5 Hazırlık Terminalini aç

1. Klavyede Windows logolu tuşa bas.
2. `Terminal` yaz.
3. Sonuçlarda **Terminal** veya **Windows Terminal** uygulamasına tıkla.
4. Terminal açılınca aşağıdaki satırı bütünüyle kopyala.
5. Terminal penceresinin içine bir kez tıkla ve `Ctrl+V` ile yapıştır.
6. `Enter` tuşuna bas.

```powershell
cd "$env:USERPROFILE\Desktop\zerokit\zerokit-ai-control-plane"
```

Beklenen sonuç: komut satırının solunda veya başında `zerokit-ai-control-plane` klasörü görünür. Kırmızı hata görürsen klasör yolunu tekrar kopyala; tırnak işaretlerini silme.

### 1.6 Komutları tek tek çalıştır

Aşağıdaki komutların hepsini birden yapıştırma. Her birini ayrı ayrı yapıştır, `Enter` tuşuna bas, bitmesini bekle, sonra diğerine geç.

> **Windows PowerShell için önemli:** Bu rehberde `npm` yerine `npm.cmd` yazıyoruz. Bazı Windows bilgisayarlarında PowerShell, `npm` komutunu `npm.ps1` dosyasına yönlendirir ve “running scripts is disabled” hatası verir. `npm.cmd`, Node.js ile birlikte gelen resmî Windows komutudur ve PowerShell güvenlik ayarını değiştirmenizi gerektirmez. Bu hata daha önce çıktıysa Terminali kapatmadan aşağıdaki `npm.cmd` komutlarıyla devam edebilirsiniz. `Set-ExecutionPolicy` çalıştırmayın.

#### Komut 1 — kurulum durumunu eşitle

```powershell
npm.cmd ci
```

Beklenen: kırmızı `ERR!` olmadan komut satırı geri gelir. `0 vulnerabilities` görmen normaldir.

#### Komut 2 — projeyi oluştur

```powershell
npm.cmd run build
```

Beklenen: satırlardan birinde `PASS` görürsün.

#### Komut 3 — küçük kod kontrolleri

```powershell
npm.cmd run test:unit
```

Beklenen: en sonda başarısız test sayısı `0` olur.

#### Komut 4 — mahremiyet kontrolleri

```powershell
npm.cmd run test:privacy
```

Beklenen: testler geçer ve hata sayısı `0` olur.

#### Komut 5 — İngilizce Codex görevini hazırla

```powershell
npm.cmd run codex:prepare -- ai-buildweek/examples/school-saas.input.md --force
```

Beklenen dört önemli satır:

```text
PASS Codex task package ready
privacy blockers: 0
human review items: 0
NEXT: Select GPT-5.6 Sol
```

#### Komut 6 — açık kaynak PocketBase adaptör kanıtı

```powershell
npm.cmd run demo:pocketbase
```

Beklenen: `PASS` ve PocketBase adaptörünün başarılı olduğuna dair İngilizce satırlar.

#### Komut 7 — gerçek tarayıcı kontrolü

```powershell
npm.cmd run test:browser
```

Beklenen: en sonda `16/16` veya bütün kontrollerin geçtiğini anlatan `PASS` satırı.

Bu komutlardan herhangi biri `FAIL`, `ERR!` veya kırmızı hata verirse video kaydına başlama. Hata ekranının fotoğrafını al ve Codex'e şu İngilizce komutu ver:

```text
The preparation command shown in the terminal failed. Diagnose the failure using only this public repository, fix it, and rerun the same command. Do not read any .env file, credential, production log, customer record, or private file outside this repository.
```

## Bölüm 2 — Sentetik okul görevini Codex'te çalıştır

Bu bölüm gerçek GPT-5.6 kanıtıdır. Hazır okul senaryomuzda gerçek öğrenci, veli, öğretmen veya okul kaydı yoktur; rol, panel, alan ve route adları uydurmadır.

### 2.1 Codex görevini başlat

1. Codex uygulamasına dön.
2. Proje adının `zerokit-ai-control-plane` olduğunu kontrol et.
3. **New task / Yeni görev** düğmesine tıkla.
4. Yazı kutusunun yakınındaki model menüsünü aç.
5. Model olarak **GPT-5.6 Sol** seç. Zekâ düzeyinde görünüyorsa final kayıt için **Ultra** kullan; Ultra yoksa ekranda bulunan en yüksek gerçek düzeyi seç. Videoda model ve seçili gerçek zekâ düzeyi görünür olmalıdır.
6. Menüyü kapatmadan önce bu görünümün daha sonra kaydedileceğini aklında tut.
7. Yazı kutusuna aşağıdaki İngilizce komutu aynen yapıştır:

```text
Follow AGENTS.md. Read ai-buildweek/runs/school-saas.codex-task.md and complete the task. Use only the synthetic files allowed by that task. Do not read any .env file, credential, production log, customer record, or private file outside this repository. Run the required strict local validator, fix every failure, and report the final validation result and assumptions.
```

8. Gönder düğmesine veya klavyede `Enter` tuşuna bas.
9. Codex çalışırken başka bir görev başlatma.
10. İzin sorusu çıkarsa yalnızca bu açık repo içindeki dosyaları okuma/yazma ve yerel test komutlarına izin ver. `.env`, repo dışı klasör, ağ erişimi veya credential istenirse izin verme.

### 2.2 Bittiğini nasıl anlarsın?

Codex'in son mesajında şunları ara:

- hedef dosya: `ai-buildweek/evidence/school-saas.gpt-5.6.codex.config.json`
- validation veya validator kelimesinin yanında `PASS` ya da başarılı sonuç
- assumptions / varsayımlar özeti
- human review / insan incelemesi uyarısı

Dosya oluşmadıysa veya validator başarısızsa şu İngilizce takip komutunu yapıştır:

```text
The required output or validation is incomplete. Finish the task exactly as specified in ai-buildweek/runs/school-saas.codex-task.md, write the target JSON file, run the local validator, and fix every failure before reporting completion.
```

### 2.3 İnsan incelemesi ve manifest

Codex başarı bildirdikten sonra Terminale dön ve şu komutu çalıştır:

```powershell
node ai-buildweek/scripts/validate-config.mjs ai-buildweek/evidence/school-saas.gpt-5.6.codex.config.json
```

`PASS` görürsen config dosyasını Codex içinde aç. Şunları gözle kontrol et:

- Gerçek kişi adı, e-posta, telefon veya okul adı yok.
- `users`, `invoices`, `reports` gibi panel adları sentetik ve genel.
- `owner`, `school_admin`, `teacher`, `student_support` ve `readonly` gibi sentetik roller bulunuyor.
- API anahtarı, parola veya gerçek internet adresi yok.
- `privacy_notes` ve `test_checklist` boş değil.

Hepsi uygunsa Terminalde aşağıdaki komutu **tek satır halinde** çalıştır:

```powershell
npm.cmd run codex:record -- ai-buildweek/examples/school-saas.input.md ai-buildweek/runs/school-saas.codex-task.md ai-buildweek/evidence/school-saas.gpt-5.6.codex.config.json --model="GPT-5.6 Sol" --confirm-model-visible --confirm-reviewed --force
```

Beklenen: `PASS Codex run evidence recorded` ve `operator-confirmed, not cryptographically verified` satırları.

Manifest dosyasının oluştuğunu gözle kontrol et:

1. Codex'in sol dosya listesindeki `ai-buildweek` klasörünü aç.
2. Altındaki `evidence` klasörünü aç.
3. Şu iki dosyanın birlikte göründüğünü doğrula:

```text
school-saas.gpt-5.6.codex.config.json
school-saas.gpt-5.6.codex.config.manifest.json
```

İkisinden biri yoksa tarayıcı çekimine geçme.

### 2.4 `/feedback` Session ID'yi yalnız Devpost için al

Bu kimlik başvuruda zorunludur ama gizli tutulmalıdır. Videoya, ekran görüntüsüne, README'ye veya GitHub'a koyma.

1. Çoğu temel ZeroKit çalışmasının yapıldığı **aynı ana Codex görevini** aç.
2. Ekran kaydının kapalı olduğunu kontrol et.
3. Mesaj kutusuna `/feedback` yaz ve gönder.
4. Açılan geri bildirim akışını tamamla.
5. Codex'in verdiği Session ID'yi **Copy / Kopyala** düğmesiyle kopyala.
6. Kimliği yalnız bilgisayarındaki geçici, özel bir nota koy veya Devpost formu açıksa doğrudan ilgili özel alana yapıştır.
7. Bu notu repo klasörüne kaydetme.
8. Session ID görünen pencerenin ekran görüntüsünü alma ve bu bölümü videoya ekleme.

Beklenen sonuç: Session ID Devpost'a yapıştırılmak üzere özel olarak saklanır; hiçbir public dosyada görünmez.

## Bölüm 3 — Yerel preview'yu aç

### 3.1 Sunucu Terminalini aç

Hazırlık Terminalini kapatma. İkinci bir Terminal aç:

1. Terminal penceresinin üst tarafındaki `+` işaretine tıkla. Bulamazsan Windows tuşuna basıp yeniden `Terminal` aç.
2. Şu klasör komutunu yapıştır ve `Enter` tuşuna bas:

```powershell
cd "$env:USERPROFILE\Desktop\zerokit\zerokit-ai-control-plane"
```

3. Şu komutu çalıştır:

```powershell
npm.cmd run dev
```

Beklenen: ekranda `http://127.0.0.1:4173` adresi görünür. Bu Terminali kapatma; kapatırsan preview durur.

### 3.2 İngilizce okul preview'sunu aç

1. Chrome veya Edge'i aç.
2. En üstteki adres çubuğuna tıkla.
3. Aşağıdaki adresi yapıştır ve `Enter` tuşuna bas:

```text
http://127.0.0.1:4173/?lang=en&theme=dark&scenario=school-saas
```

Beklenen:

- koyu renkli, kurumsal kontrol paneli görünümü;
- solda `ZEROKIT / AI CONTROL PLANE` adı ve üç bölümlü menü;
- `A reviewable control plane, before runtime.` başlığı;
- üst tarafta `TR`, `Light theme` ve `No third-party or model requests` göstergesi;
- `Synthetic scenario` alanında `School SaaS`;
- aşağıda üç aşamalı kanıt akışı, config çalışma alanı ve panel/rol/endpoint doğrulama kartları.

Pencere dar olduğu için soldaki menü görünmüyorsa bu hata değildir. Sol üstteki üç çizgili düğmeye tıkladığında menü açılır; ekran genişletildiğinde menü kendiliğinden solda sabit görünür.

Sayfa ilk açıldığında paketli School SaaS örneğini otomatik gösterebilir. Bu yalnız başlangıç görünümüdür. Final kanıt klibinde aşağıdaki adımlarla taze evidence dosyasını bunun üzerine yükleyeceksin.

Sayfa açılmazsa:

1. Sunucu Terminalinin hâlâ açık olduğunu kontrol et.
2. Terminalde kırmızı hata varsa ekran görüntüsü al.
3. Adresi `https` değil `http` ile yazdığını kontrol et.
4. `127.0.0.1` ve `4173` sayılarını değiştirme.

### 3.3 Taze, incelenmiş evidence JSON'unu seç ve PASS göster

Bu bölüm final videonun tarayıcıdaki gerçek kanıtıdır. Önce Bölüm 2'deki JSON, insan incelemesi ve manifest tamamlanmış olmalıdır.

1. İngilizce preview açıkken sayfayı aşağı doğru kaydır.
2. `Contract workspace` ve `Inspect the generated configuration` başlıklarını bul.
3. **Load sample** düğmesine basma. Bu düğme paketli örneği yeniden yükler.
4. **Choose local JSON** düğmesine bir kez tıkla.
5. Windows dosya seçme penceresi açılır. Pencerenin üst tarafındaki adres çubuğuna bir kez tıkla. Adres çubuğu seçilmiyorsa `Ctrl+L` tuşlarına bas.
6. Şu klasör yolunu yapıştır ve `Enter` tuşuna bas:

```text
%USERPROFILE%\Desktop\zerokit\zerokit-ai-control-plane\ai-buildweek\evidence
```

7. Listede `school-saas.gpt-5.6.codex.config.json` dosyasını bul. Adında `.manifest` geçen dosyayı seçme; tarayıcıya config JSON'u yüklenir.
8. Config dosyasına bir kez tıkla.
9. Sağ alttaki **Open / Aç** düğmesine tıkla.
10. Dosya seçme penceresi kapanınca JSON metninin büyük kutuya geldiğini görmelisin. Preview bu dosyayı otomatik doğrular.
11. Emin olmak için **Validate locally** düğmesine bir kez tıkla.
12. Sağdaki doğrulama alanında şu İngilizce satırı ara:

```text
PASS — config is structurally valid
```

13. Alt bölümde panel, rol, endpoint ve alan kartlarının dolduğunu kontrol et.
14. Üstteki istek sınırı göstergesinin `No third-party or model requests` dediğini doğrula.
15. Video klibinde dosya seçme penceresinde taze dosyanın adını ve ardından PASS sonucunu okunabilecek kadar uzun göster.

Şunlardan biri olursa kayda devam etme:

- Evidence klasörü veya taze config dosyası yok.
- Yanlışlıkla `.manifest.json` dosyasını seçtin.
- Ekranda `FAIL` çıktı.
- Taze dosyayı seçtikten sonra **Load sample** düğmesine bastın.

Yanlış dosya seçtiysen **Choose local JSON** düğmesine tekrar bas ve doğru config JSON'u seç. `FAIL` çıktıysa tarayıcıda metni elle düzeltme; Codex görevine dön, dosyayı kaynakta düzelt, sıkı CLI validator'ı yeniden çalıştır, insan incelemesini ve manifesti yenile, sonra bu bölüme geri dön.

## Bölüm 4 — Ekran kliplerini kaydet

Tek seferde kusursuz üç dakika çekmeye çalışma. Aşağıdaki kısa klipleri ayrı ayrı kaydetmek daha kolaydır. Her klipte fareyi yavaş hareket ettir; tıklamadan önce yarım saniye bekle.

### 4.1 Windows kayıt aracını aç

1. Klavyede `Windows + Shift + R` tuşlarına aynı anda bas.
2. Ekran hafif koyulaşır ve kayıt çubuğu görünür.
3. Fareyle ekranın kaydedilecek kısmını sol üstten sağ alta doğru çizerek seç. En güvenlisi uygulama penceresinin tamamını seçmektir.
4. **Start / Başlat** düğmesine tıkla.
5. Üç saniyelik geri sayım biter; sonra hareket etmeye başla.
6. Klip bitince üstteki kırmızı kare **Stop / Durdur** düğmesine tıkla.
7. Açılan Ekran Alıntısı Aracı penceresinde sağ üstteki disket **Kaydet** simgesine tıkla.
8. Dosyayı `Videolar` klasörüne aşağıdaki adlardan uygun olanıyla kaydet.

Kısayol çalışmazsa Windows tuşuna bas, `Ekran Alıntısı Aracı` veya `Snipping Tool` yaz, uygulamayı aç, video kamera biçimli **Record** düğmesine, sonra **New** düğmesine tıkla.

### 4.2 Kaydedilecek sekiz klip

| Dosya adı | Yaklaşık ham süre | Ekranda yapacağın hareket |
|---|---:|---|
| `01-title-preview.mp4` | 12 sn | İngilizce preview'nun en üstünü sabit göster |
| `02-privacy-preflight.mp4` | 18 sn | Terminalde `codex:prepare` komutunu çalıştır ve PASS'i göster |
| `03-model-and-task.mp4` | 25 sn | Codex'te seçiciyi aç, GPT-5.6 Sol'u ve gerçekten seçili zekâ düzeyini göster, İngilizce komutu gönder |
| `04-codex-result.mp4` | 32 sn | Codex'in taze hedef dosyasını, sıkı validator PASS'i, insan incelemesini ve manifest PASS/hash sonucunu yavaşça göster |
| `05-fresh-json-pass.mp4` | 30 sn | Preview'da **Choose local JSON**a tıkla, taze evidence config dosyasını seç, **Open**a tıkla ve PASS'i göster; **Load sample**a basma |
| `06-control-plane.mp4` | 30 sn | Taze evidence dosyasından oluşan panel, rol, alan ve endpoint kartlarına yavaşça kaydır |
| `07-pocketbase-tests.mp4` | 28 sn | Terminalde PocketBase PASS ve ardından test PASS satırlarını göster |
| `08-ending.mp4` | 12 sn | Preview hero veya GitHub repo sayfasını sabit göster |

Codex çalışması uzun sürerse tamamını üç dakikalık videoda bekletme. Başlangıç ve bitişi ayrı kaydet; montajda yalnız bekleme bölümünü kes. Son videoya `Codex run shortened for time` yazısını ekle. Görünür GPT-5.6 Sol seçimini, taze hedefi, validator PASS'i, insan incelemesini, manifesti, **Choose local JSON** adımını ve tarayıcı PASS'ini kesme.

## Bölüm 5 — Üç dakikalık kesin video ve ses akışı

İngilizce ses cümlelerinin üretim kaynağı [VOICEOVER_SCRIPT.md](VOICEOVER_SCRIPT.md) dosyasıdır. Oradaki 2:54 tablosu yayımlama öncesi zaman planıdır; doğrulanmış Public videonun gerçek süresi **2:38**'dir.

1. Dosyayı Codex'te sol taraftaki dosya ağacından aç.
2. Her satırdaki **English voiceover line** metnini sırayla kullan.
3. Her ses parçasını tablodaki başlangıç zamanına taşı.
4. Görüntüyü sesin anlattığı kanıtla eşleştir.
5. Türkçe açıklamaları videoya koyma.
6. Ürünün üzerini kapatan altyazı veya dolgu kutusu ekleme.

## Bölüm 6 — Clipchamp'te İngilizce sesi ekle

### 6.1 Yeni video oluştur

1. Windows tuşuna bas.
2. `Clipchamp` yaz ve Microsoft Clipchamp uygulamasına tıkla.
3. Microsoft hesabı isterse Windows'ta kullandığın hesapla giriş yap.
4. Ana ekranda **Create a new video / Yeni video oluştur** düğmesine tıkla.
5. Sol üstte proje adına tıkla ve `ZeroKit Build Week Demo` yaz.

### 6.2 Klipleri içeri al

1. Sol tarafta **Your media / Medyanız** bölümüne tıkla.
2. **Import media / Medyayı içeri aktar** düğmesine tıkla.
3. `Videolar` klasörüne git.
4. `01-` ile başlayan klipten `08-` ile başlayan klipe kadar hepsini seç.
5. **Open / Aç** düğmesine tıkla.
6. İlk klibi tutup en alttaki uzun zaman çizgisine sürükle.
7. Diğer klipleri numara sırasıyla ilkinin sağına sürükle.

Beklenen: zaman çizgisinde sekiz video kutusu soldan sağa sıralanır.

### 6.3 Gereksiz başlangıç ve bitişleri kes

1. Zaman çizgisindeki ilk klipe tıkla.
2. Klibin sol ve sağ kenarında tutamaçlar görünür.
3. Kayıt aracını açtığın gereksiz saniyeleri kaldırmak için sol kenarı sağa sürükle.
4. Durdurma düğmesine gittiğin son saniyeleri kaldırmak için sağ kenarı sola sürükle.
5. Ortadaki oynat düğmesine basıp sonucu izle.
6. Aynı işlemi bütün kliplere uygula.

### 6.4 Görüntüyü açık bırak

1. **Text / Metin** veya **Captions / Altyazılar** aracından dolgu kutulu yazı ekleme.
2. Arayüzün kendi İngilizce metinleri, düğmeleri, PASS sonuçları ve dosya yolları kanıt olarak açık kalmalı.
3. Yalnız gerçek Codex bekleme süresi kesilmişse, görüntüyü kapatmayacak küçük ve sade `Codex run shortened for time` notunu kısa süreli ekleyebilirsin.
4. Bu teknik kurgu notu gerekmiyorsa videoya sonradan hiçbir yazı ekleme.

### 6.5 İngilizce yapay ses oluştur

1. Sol araç çubuğunda **Record & create / Kaydet ve oluştur** bölümüne tıkla.
2. Açılan seçeneklerden **Text to speech / Metinden konuşmaya** seçeneğine tıkla.
3. Sağ tarafta açılan dil listesinden **English (United States)** veya anlaşılır başka bir İngilizce seçeneği seç.
4. Ses listesindeki örnek dinleme düğmelerine bas. Sakin, profesyonel ve kolay anlaşılan tek bir ses seç; video boyunca sesi değiştirme.
5. **Advanced settings / Gelişmiş ayarlar** bölümünü aç. Hızı önce normal bırak; üç dakikaya sığmazsa çok az hızlandır. Anlaşılmayacak kadar hızlandırma.
6. [VOICEOVER_SCRIPT.md](VOICEOVER_SCRIPT.md) içindeki ilk İngilizce ses cümlesini kopyala ve metin kutusuna yapıştır.
7. **Preview / Önizle** düğmesine basıp dinle. `ZeroKit`, `Codex`, `GPT-5.6`, `RBAC` veya `PocketBase` yanlış okunuyorsa noktalama veya yazımı kulağa uygun olacak kadar düzenle; ekrandaki marka yazısını değiştirme.
8. **Save / Kaydet** düğmesine bas. Ses parçası zaman çizgisinde video kliplerinin üstünde görünür.
9. Ses parçasını fareyle tutup Bölüm 5'teki başlangıç saniyesine sürükle.
10. Kalan bütün İngilizce ses cümleleri için aynı işlemi tekrarla. Metin sınırı çıkarsa zaten satır satır çalıştığın için her satırı ayrı ses parçası olarak kaydet.
11. Ekran kayıtlarında yanlışlıkla mikrofon, bildirim veya tıklama sesi varsa ilgili video klibini seç, **Audio / Ses** bölümünde o klibin sesini `0` yap. Yapay ses parçalarının sesini kapatma.
12. Baştan sona oynat. Her görüntünün o anda söylenen cümleyi kanıtladığını ve sesin açıkça duyulduğunu kontrol et.

### 6.6 1080p dışa aktar

1. Sağ üstteki **Export / Dışa aktar** düğmesine tıkla.
2. **1080p HD** seç.
3. Elmas/premium uyarısı çıkarsa ödeme yapma; projeye dönüp elmas simgeli öğeyi kaldır ve yeniden dışa aktar.
4. İşlem bitince MP4 dosyasını `ZeroKit-Build-Week-Demo-English.mp4` adıyla kaydet.
5. Dosyayı bir kez baştan sona izle.

Son kontrol:

- Süre üç dakikayı geçmiyor.
- İngilizce ses baştan sona açık, anlaşılır ve görüntüyle uyumlu.
- Bütün açıklamalar İngilizce.
- Yazılar okunmadan kaybolmuyor.
- GPT-5.6 seçimi gerçekten görünür.
- GPT-5.6 Sol ve seçili gerçek zekâ düzeyi görünür; Ultra yalnız gerçekten seçildiyse seslendirmede söylenir.
- Codex komutu İngilizce.
- Taze evidence JSON, sıkı validator PASS, insan incelemesi ve manifest gerçekten görünür.
- **Choose local JSON** ile aynı taze evidence config dosyası seçiliyor; ardından yerel PASS görünüyor.
- Final kanıt için **Load sample** kullanılmıyor.
- En az bir PocketBase PASS ve gerçek test PASS görünür.
- `No third-party or model requests` sınırı görünür.
- Kişisel dosya, bildirim, Session ID, API anahtarı, `.env` veya ilgisiz özel ekran görünmüyor.
- Son karede doğru GitHub adresi bulunuyor.

## Bölüm 7 — Açık kaynak proje gösterimi sorusunun cevabı

Evet, açık kaynak proje gösterimi değerlidir; fakat ana ürün yerine geçmemelidir. Bu demoda PocketBase'in kendisini kurup admin dashboard'unu dolaşmayacağız. Repoda bulunan **sentetik PocketBase response fixture'ını** ve onu ZeroKit sözleşmesine çeviren adaptör testini göstereceğiz. Böylece:

- gerçek müşteri verisi kullanılmaz;
- canlı backend veya ücretli servis gerekmez;
- route ile payload şeklinin farklı sorunlar olduğu kanıtlanır;
- ana hikâye GPT-5.6/Codex ve ZeroKit'te kalır.

## Sorun olursa hızlı karar tablosu

| Sorun | Yapılacak şey |
|---|---|
| `node --version` v22'den küçük veya komut bulunamıyor | Node.js LTS Windows Installer'ı kur/güncelle, bütün Terminal pencerelerini kapatıp yeniden aç ve sürümü tekrar kontrol et |
| PowerShell “running scripts is disabled” diyor | `npm` yerine `npm.cmd` kullan; `Set-ExecutionPolicy` çalıştırma ve aynı Terminalde komutu yeniden dene |
| `127.0.0.1` açılmıyor | `npm.cmd run dev` çalışan Terminali açık tut; adresi `http` ile yeniden yaz |
| GPT-5.6 görünmüyor | Uygulamayı güncelle, doğru hesabı ve plan/rollout erişimini kontrol et; başka modeli GPT-5.6 diye gösterme |
| `codex:prepare` FAIL | Görevi modele gönderme; bulguyu sentetik girdiden temizle ve komutu yeniden çalıştır |
| Codex yanlış dosyaya yazdı | İngilizce takip komutuyla tam hedef yolu tekrar belirt |
| Validator FAIL | Codex'e aynı validator komutunu çalıştırıp bütün hataları düzeltmesini söyle |
| Evidence JSON veya manifest görünmüyor | Tarayıcı kaydına geçme; Bölüm 2'yi tamamla ve iki dosyanın da `ai-buildweek/evidence` altında oluştuğunu doğrula |
| **Choose local JSON** sonrası FAIL | Tarayıcıda elle düzeltme yapma; doğru config dosyasını seçtiğini kontrol et, sonra kaynak dosyayı Codex'te düzeltip validator/review/manifest zincirini yenile |
| Video çok uzun | Bekleme ve fare hareketlerini kes; PASS/model/ürün kanıtlarını kesme |
| İngilizce yazı okunmuyor | Daha kısa metin, daha büyük yazı ve en az 3–4 saniye görünme süresi kullan |
| Clipchamp ödeme istiyor | Elmas simgeli premium metin/stock öğesini kaldır; sade metin ve 1080p kullan |
| Yanlışlıkla kişisel veya ilgisiz bir ekran göründü | O klibi tamamen sil ve yalnız ZeroKit ekranıyla yeniden kaydet |

## Bölüm 8 — Videoyu YouTube'a herkese açık yükle

Devpost bağlantıyı yalnızca herkese açık YouTube videosu olarak kabul eder. **Private / Özel** veya **Unlisted / Liste dışı** seçme.

### 8.1 Yüklemeyi başlat

1. Chrome veya Edge'i aç.
2. Adres çubuğuna `https://www.youtube.com/` yaz ve `Enter` tuşuna bas.
3. Sağ üstte **Sign in / Oturum aç** görünüyorsa Google hesabınla giriş yap.
4. Sağ üstte kamera içinde `+` işareti veya **Create / Oluştur** düğmesini bul ve tıkla.
5. Açılan menüde **Upload video / Video yükle** seçeneğine tıkla.
6. Ortadaki **Select files / Dosya seç** düğmesine tıkla.
7. Dışa aktardığın `ZeroKit-Build-Week-Demo-English.mp4` dosyasını seç.
8. **Open / Aç** düğmesine tıkla ve yüklemenin başlamasını bekle.

### 8.2 Video ayrıntılarını doldur

1. **Title / Başlık** alanına İngilizce bir başlık yaz:

```text
ZeroKit AI Control Plane — OpenAI Build Week Demo
```

2. **Description / Açıklama** alanına şu kısa İngilizce metni yapıştır:

```text
ZeroKit turns a sanitized SaaS brief into a reviewed control-plane configuration with Codex and GPT-5.6, then validates the result locally.

Repository: https://github.com/zyganali-glitch/zerokit-ai-control-plane
Live demo: https://zyganali-glitch.github.io/zerokit-ai-control-plane/
```

3. Küçük resim yüklemek zorunlu değildir. Kişisel fotoğraf veya lisanssız görsel kullanma.
4. **Audience / Kitle** bölümünde bu geliştirici aracının çocuklar için hazırlanmadığını belirten **No, it's not made for kids / Hayır, çocuklara özel değil** seçeneğini işaretle.
5. **Next / İleri** düğmesine tıkla.
6. **Video elements / Video öğeleri** ekranında zorunlu olmayan kartları geçebilir veya sade bırakabilirsin. **Next / İleri** düğmesine tıkla.
7. **Checks / Kontroller** ekranında telif uyarısı olmadığını kontrol et. İşlem sürüyorsa tamamlanmasını bekle; sonra **Next / İleri** düğmesine tıkla.

### 8.3 Mutlaka Public seç

1. **Visibility / Görünürlük** ekranında **Public / Herkese açık** seçeneğini işaretle.
2. **Private / Özel**, **Unlisted / Liste dışı** veya ileri tarihli **Schedule / Planla** seçme.
3. **Publish / Yayınla** veya **Save / Kaydet** düğmesine tıkla.
4. YouTube bağlantısı göründüğünde **Copy link / Bağlantıyı kopyala** düğmesine tıkla.
5. Bağlantıyı geçici özel notuna `YouTube URL` adıyla kaydet. Bu URL public'tir; Session ID değildir.

### 8.4 Gizli pencerede gerçek public kontrolü yap

1. Chrome'da sağ üstteki üç noktaya tıkla.
2. **New Incognito window / Yeni Gizli pencere** seçeneğine tıkla. Klavye kısayolu `Ctrl+Shift+N`dir.
3. Oturum açmadan, kopyaladığın YouTube bağlantısını adres çubuğuna yapıştır ve `Enter` tuşuna bas.
4. Video açılmıyorsa veya “private” uyarısı varsa YouTube Studio'ya dön ve görünürlüğü **Public** yap.
5. Videonun süresinin üç dakikadan kısa olduğunu kontrol et.
6. Hoparlör simgesinin kapalı olmadığını kontrol et ve videoyu baştan sona dinle.
7. İngilizce sesin açık, anlaşılır ve görüntüyle uyumlu olduğunu doğrula.
8. Görüntüde Session ID, kişisel bilgi, bildirim, credential veya `.env` olmadığını son kez kontrol et.

## Bölüm 9 — Devpost başvurusunu doldur ve gönder

### 9.1 ZeroKit taslağını aç

1. Normal tarayıcı penceresinde `https://openai.devpost.com/` adresini aç.
2. Sağ üstte **Log in / Giriş yap** seçeneğine tıkla ve hesabına gir.
3. Henüz yarışmaya katılmadıysan **Join hackathon** düğmesine tıkla ve katılım adımlarını tamamla.
4. **Submit a project**, **Manage submissions** veya **My projects** seçeneklerinden görünen uygun düğmeye tıkla.
5. ZeroKit taslağı varsa onu aç; yoksa yeni proje oluştur.

### 9.2 Alanları doldur

Devpost arayüzündeki alan adları küçük farklılık gösterebilir. Aşağıdaki bilgileri İngilizce gir:

1. Proje adı: `ZeroKit AI Control Plane — GPT-5.6/Codex SaaS Architect`.
2. Kısa açıklama/tagline: [DEVPOST_SUBMISSION_GUIDE.md](../submission/DEVPOST_SUBMISSION_GUIDE.md) içindeki güncel İngilizce metin.
3. Track/category bölümünde yalnız **Developer Tools** seç.
4. Uzun proje açıklamasına aynı rehberdeki güncel İngilizce açıklamayı yapıştır.
5. Repository/code URL alanına şunu yapıştır:

```text
https://github.com/zyganali-glitch/zerokit-ai-control-plane
```

6. Demo/website URL alanı varsa ücretsiz Pages adresini yapıştır:

```text
https://zyganali-glitch.github.io/zerokit-ai-control-plane/
```

7. Video URL alanına Bölüm 8'de gizli pencerede doğruladığın public YouTube bağlantısını yapıştır.
8. Codex veya `/feedback` Session ID için ayrılmış **özel alana** Bölüm 2.4'te aldığın kimliği yapıştır.
9. Session ID'yi proje açıklamasına, yorum alanına, repository URL alanına, ekran görüntüsüne veya videoya yapıştırma.
10. Kurulum, desteklenen platformlar ve test talimatı isteyen alana [DEVPOST_SUBMISSION_GUIDE.md](../submission/DEVPOST_SUBMISSION_GUIDE.md) içindeki Judge testing instructions metnini yapıştır.
11. Görsel istenirse yalnız bu açık ZeroKit arayüzünden alınmış, kişisel bilgi içermeyen ekran görüntüsü kullan.

### 9.3 Taslağı kontrol et ve gönder

1. Önce **Save draft / Taslağı kaydet** düğmesine tıkla.
2. Varsa **Preview / Önizle** düğmesine tıkla.
3. Başlığın, Developer Tools track'inin, repo URL'sinin, Pages URL'sinin ve YouTube URL'sinin doğru olduğunu tek tek kontrol et.
4. Açıklamada gerçek olmayan hız, müşteri, production readiness veya evrensel backend uyumluluğu iddiası olmadığını kontrol et.
5. Session ID'nin yalnız özel Session ID alanında bulunduğunu kontrol et.
6. Sayfanın altındaki gerekli onay kutularını gerçek durumuna göre okuyup işaretle.
7. **Submit**, **Submit project** veya **Submit to hackathon** düğmesine tıkla.
8. Bir eksik alan uyarısı çıkarsa uyarıda adı verilen alanı doldur, tekrar kaydet ve yeniden gönder.
9. Başarılı gönderim ekranını veya `Submitted` durumunu görmeden sayfayı kapatma.
10. **My projects / Projelerim** bölümüne dön ve ZeroKit'in bu yarışmada `Submitted` olarak göründüğünü doğrula.

Son başvuru zamanı resmî kurallara göre **21 Temmuz 2026, 17:00 Pacific Time**; İstanbul için **22 Temmuz 2026, 03:00** eder. Son saate bırakma.

## Bölüm 10 — Son gizli pencere kontrolü

Yeni bir gizli pencere aç ve oturum açmadan şu üç bağlantıyı sırayla kontrol et:

1. Repo: <https://github.com/zyganali-glitch/zerokit-ai-control-plane>
2. Ücretsiz canlı demo: <https://zyganali-glitch.github.io/zerokit-ai-control-plane/>
3. Public YouTube: kendi yüklediğin bağlantı

Sonra şu listeyi tamamla:

- README'deki hızlı başlangıç komutları Node.js 22+ ile çalışıyor.
- Windows'ta komut gerekirse `npm` yerine `npm.cmd` ile çalışıyor.
- Taze evidence config ve manifest gerçek final çalışmaya ait.
- Sıkı validator, unit, privacy, PocketBase ve browser kapıları gerçek PASS verdi.
- Videoda GPT-5.6 Sol ile gerçekten seçili zekâ düzeyi görünür; Ultra yalnız gerçekten seçildiyse söylenir.
- Videoda taze evidence dosyası **Choose local JSON** ile seçiliyor ve PASS oluyor.
- Videoda paketli örnek nihai kanıt gibi sunulmuyor.
- İngilizce ses açık, anlaşılır ve görüntüyle uyumlu; ürün kanıtını kapatan altyazı yok.
- Video üç dakikadan kısa ve YouTube görünürlüğü Public.
- Ücretli domain, model API'si veya API anahtarı iddia edilmiyor ya da gerekmiyor.
- `/feedback` Session ID yalnız Devpost'un özel alanında; repo, video ve ekran görüntülerinde yok.
- Devpost track'i yalnız Developer Tools.
- Devpost proje durumu `Submitted`.

## Kaynaklar

- OpenAI Build Week Official Rules: <https://openai.devpost.com/rules>
- OpenAI Build Week FAQ: <https://openai.devpost.com/details/faqs>
- OpenAI GPT-5.6 ve Codex erişimi: <https://help.openai.com/en/articles/20001354-gpt-56-in-chatgpt>
- Windows Ekran Alıntısı Aracı video kaydı: <https://support.microsoft.com/en-us/windows/apps/use-snipping-tool-to-capture-screenshots>
- Clipchamp'te metin ekleme: <https://support.microsoft.com/en-us/clipchamp/how-to-add-text-and-titles-to-a-video>
- Clipchamp 1080p dışa aktarma: <https://support.microsoft.com/en-us/clipchamp/exporting-and-saving-a-video-in-clipchamp>
