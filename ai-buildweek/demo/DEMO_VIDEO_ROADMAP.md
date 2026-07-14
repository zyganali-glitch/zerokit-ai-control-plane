# İngilizce seslendirmeli demo videosu — sıfırdan, tıklama tıklama kılavuz

Bu belge teknik bilgisi ve İngilizcesi olmayan bir kullanıcının bile videoyu tek başına hazırlayabilmesi için yazılmıştır. Senin İngilizce konuşman gerekmiyor: hazır İngilizce metni Clipchamp'in **Text to speech / Metinden konuşmaya** özelliğine yapıştırıp İngilizce ses oluşturacağız. Hazırlık açıklamaları Türkçe; jüriye giden ses, uygulama ve altyazılar İngilizce olacaktır.

## En kısa cevaplar

- Hazır demo projemiz **sentetik School SaaS** senaryosudur.
- Ana videoda özel donör admin paneli **gösterilmeyecek**. Açık repodaki çalışan ZeroKit jüri paneli gösterilecek.
- Ajana yapıştırılacak komut **İngilizce** olacak.
- `http://127.0.0.1:4173` yalnızca kendi bilgisayarında açılan, ücretsiz yerel adrestir.
- Demo için ücretli alan adı, hosting, model API'si veya API anahtarı gerekmez.
- Codex uygulaması internet ve hesabındaki Codex erişimini kullanır; bu bir API faturası değildir ama hesabının plan/kullanım sınırlarına tabidir.
- Video İngilizce olacak: ekrandaki uygulama dili, yapay ses ve altyazılar İngilizce olacak. Video üç dakikadan kısa ve herkese açık YouTube videosu olacak.

## Donör admin panelini neden göstermiyoruz?

Donör proje özel ve ayrı bir üründür. Bu yarışma reposu onun seçilmiş, izole ve açık jüri yüzeyidir. Ana videoda donör panelini göstermek üç sorun çıkarır:

1. Jüri GitHub reposunu açtığında aynı paneli bulup çalıştıramaz.
2. Özel ürünün tamamı bu yarışma teslimatının parçasıymış gibi yanlış bir izlenim oluşabilir.
3. Özel kod, müşteri verisi, lisans veya kişisel dosya yanlışlıkla ekrana girebilir.

Bu nedenle videonun ürünü, repoda gerçekten bulunan ve test edilen `frontend/` preview'sudur. Donör yalnızca geçmiş tasarım tecrübesi ve şema ilhamı olarak açıklanabilir; ekranda ürün kanıtı olarak kullanılmaz. İleride donör görünümünü açık repoya lisanslı ve tekrar üretilebilir biçimde gerçekten taşırsak bu karar yeniden değerlendirilebilir.

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
| PASS | Kontrol başarıyla geçti |
| FAIL | Kontrol başarısız; videoya devam etmeden düzeltilmeli |
| Caption / overlay | Videonun üzerine sonradan eklenen kısa İngilizce yazı |
| Clip | Videonun küçük bir parçası |
| Manifest | İncelenen dosyaların özet/hash kanıtı; dosya içeriğini kopyalamaz |

## Kullanacağımız şeyler ve ücret durumu

| Araç | Ne için? | Ücretli şart mı? |
|---|---|---|
| Codex masaüstü uygulaması | GPT-5.6 ile okul config'ini üretmek | Ayrı API anahtarı/faturası yok; mevcut OpenAI hesabının Codex erişimi gerekir |
| Windows Terminal / PowerShell | Hazırlık ve test komutları | Hayır |
| Chrome veya Edge | Yerel preview'yu göstermek | Hayır |
| Windows Ekran Alıntısı Aracı | Ekran videosu kaydetmek | Hayır |
| Microsoft Clipchamp | Klipleri birleştirip İngilizce yazıları eklemek | 1080p için ücretsiz özellikleri kullanabiliriz; elmas simgeli premium öğeleri seçme |
| GitHub | Açık kaynak kodu göstermek | Bu demo için ücretli alan adı gerektirmez |

`127.0.0.1`, bilgisayarın kendisini ifade eder. `4173` ise preview'nun kullandığı kapı numarasıdır. Bu adres internette yayınlanmaz; başka biri kendi bilgisayarından senin `127.0.0.1` adresine ulaşamaz. Video kaydı için bu iyidir. Jürinin canlı siteyi açabilmesi istenirse ayrıca bir hosting gerekir; şu anki demo ve repo bunu gerektirmez.

İnternet yalnız şu işler için gerekebilir: Codex uygulamasının modeli kullanması, GitHub'a gönderim ve ilk npm kontrolü. Preview açıldıktan sonra ürün bir model API'sine, ücretli domaine veya canlı müşteri backend'ine bağlanmaz.

## Bölüm 1 — Kayıttan bir gün önce hazırlık

### 1.1 Kişisel şeyleri kapat

1. Tarayıcıdaki e-posta, banka, sosyal medya ve özel proje sekmelerini kapat.
2. Bildirimlerin videoya düşmemesi için Windows'ta sağ alttaki saat bölümüne tıkla.
3. Görünen panelde **Rahatsız etmeyin** seçeneğini aç. Bu ad yoksa **Odak** seçeneğini aç.
4. Masaüstünde kişisel dosya adları görünüyorsa bütün kayıt boyunca uygulamaları tam ekran kullan.
5. Codex'te özel donör repo açık bir görev varsa kapat veya bu yarışma görevine geç.

Beklenen sonuç: ekranda yalnız yarışma projesi, Terminal ve preview bulunacak.

### 1.2 Proje klasörünün doğru olduğunu doğrula

Kullanacağımız klasör aşağıdadır. `%USERPROFILE%`, Windows'un senin kullanıcı klasörünü kendiliğinden bulması anlamına gelir; bunu değiştirmen gerekmez.

```text
%USERPROFILE%\.gemini\antigravity\scratch\zerokit-ai-control-plane
```

1. Klavyede Windows logolu tuşa bas.
2. `Dosya Gezgini` yaz ve çıkan uygulamaya tıkla.
3. Pencerenin üstündeki adres çubuğuna bir kez tıkla.
4. Yukarıdaki klasör yolunu yapıştır.
5. `Enter` tuşuna bas.

Beklenen sonuç: klasörde `README.md`, `package.json`, `frontend` ve `ai-buildweek` adlarını görürsün. Bunlardan biri görünmüyorsa yanlış klasördesin.

### 1.3 Codex'te doğru proje ve modeli aç

OpenAI arayüzü güncellemelerle küçük farklılıklar gösterebilir. Aşağıdaki adlardan biri görünür; anlamı aynıdır.

1. Codex masaüstü uygulamasını aç.
2. Sol tarafta **New task**, **Yeni görev**, `+` veya kalem simgesi görürsen ona tıkla.
3. Proje seçili değilse sol üstteki proje/klasör adına tıkla.
4. **Open folder**, **Add project** veya **Klasör aç** seçeneğini seç.
5. Bir önceki bölümdeki `zerokit-ai-control-plane` klasörünü seç ve **Klasör Seç** düğmesine bas.
6. Yeni görevin yazı kutusunun yakınındaki model adına tıkla. Gerekirse **Advanced / Gelişmiş** seçeneğini aç.
7. Model listesinden doğrudan **GPT-5.6 Sol** seç. Yalnız `High` yazması model kanıtı değildir; `High` ayrı bir düşünme düzeyidir.
8. Ayrı reasoning/efor listesinde kayıt için **High** veya hesabında bulunan daha yüksek düzeyi seç.
9. Model menüsünü bir kez tekrar açıp hem **GPT-5.6 Sol** hem reasoning düzeyinin görünür olduğunu kontrol et; henüz görev başlatma.

GPT-5.6 Sol hiç görünmüyorsa:

1. Codex uygulamasında profil/ayar simgesine tıkla.
2. **Settings / Ayarlar** ve ardından **About / Hakkında** bölümünü ara.
3. Güncelleme düğmesi varsa güncelle ve uygulamayı yeniden aç.
4. Hesabının doğru hesap olduğunu kontrol et.
5. Yine görünmüyorsa başka modeli GPT-5.6 diye göstermeden kaydı ertele. Bu, dürüst kanıt için önemlidir.

Resmî başvuru öncesi kontrol bağlantısı: <https://help.openai.com/en/articles/20001354-gpt-56-in-chatgpt>

### 1.4 Hazırlık Terminalini aç

1. Klavyede Windows logolu tuşa bas.
2. `Terminal` yaz.
3. Sonuçlarda **Terminal** veya **Windows Terminal** uygulamasına tıkla.
4. Terminal açılınca aşağıdaki satırı bütünüyle kopyala.
5. Terminal penceresinin içine bir kez tıkla ve `Ctrl+V` ile yapıştır.
6. `Enter` tuşuna bas.

```powershell
cd "$env:USERPROFILE\.gemini\antigravity\scratch\zerokit-ai-control-plane"
```

Beklenen sonuç: komut satırının solunda veya başında `zerokit-ai-control-plane` klasörü görünür. Kırmızı hata görürsen klasör yolunu tekrar kopyala; tırnak işaretlerini silme.

### 1.5 Komutları tek tek çalıştır

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
The preparation command shown in the terminal failed. Diagnose the failure using only this public repository, fix it, and rerun the same command. Do not read any .env file, private donor file, credential, production log, or customer record.
```

## Bölüm 2 — Sentetik okul görevini Codex'te çalıştır

Bu bölüm gerçek GPT-5.6 kanıtıdır. Hazır okul senaryomuzda gerçek öğrenci, veli, öğretmen veya okul kaydı yoktur; rol, panel, alan ve route adları uydurmadır.

### 2.1 Codex görevini başlat

1. Codex uygulamasına dön.
2. Proje adının `zerokit-ai-control-plane` olduğunu kontrol et.
3. **New task / Yeni görev** düğmesine tıkla.
4. Yazı kutusunun yakınındaki model menüsünü aç.
5. Model olarak **GPT-5.6 Sol**, reasoning/efor olarak **High** veya daha yüksek düzeyi seç.
6. Menüyü kapatmadan önce bu görünümün daha sonra kaydedileceğini aklında tut.
7. Yazı kutusuna aşağıdaki İngilizce komutu aynen yapıştır:

```text
Follow AGENTS.md. Read ai-buildweek/runs/school-saas.codex-task.md and complete the task. Use only the synthetic files allowed by that task. Do not read any .env file, private donor file, credential, production log, customer record, or private file outside this repository. Run the required local validator, fix every failure, and report the final validation result and assumptions.
```

8. Gönder düğmesine veya klavyede `Enter` tuşuna bas.
9. Codex çalışırken başka bir görev başlatma.
10. İzin sorusu çıkarsa yalnızca bu açık repo içindeki dosyaları okuma/yazma ve yerel test komutlarına izin ver. `.env`, repo dışı klasör, özel donör repo, ağ erişimi veya credential istenirse izin verme.

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
- `owner`, `staff`, `viewer` gibi roller bulunuyor.
- API anahtarı, parola veya gerçek internet adresi yok.
- `privacy_notes` ve `test_checklist` boş değil.

Hepsi uygunsa Terminalde aşağıdaki komutu **tek satır halinde** çalıştır:

```powershell
npm.cmd run codex:record -- ai-buildweek/examples/school-saas.input.md ai-buildweek/runs/school-saas.codex-task.md ai-buildweek/evidence/school-saas.gpt-5.6.codex.config.json --model="GPT-5.6 Sol" --confirm-model-visible --confirm-reviewed --force
```

Beklenen: `PASS Codex run evidence recorded` ve `operator-confirmed, not cryptographically verified` satırları.

## Bölüm 3 — Yerel preview'yu aç

### 3.1 Sunucu Terminalini aç

Hazırlık Terminalini kapatma. İkinci bir Terminal aç:

1. Terminal penceresinin üst tarafındaki `+` işaretine tıkla. Bulamazsan Windows tuşuna basıp yeniden `Terminal` aç.
2. Şu klasör komutunu yapıştır ve `Enter` tuşuna bas:

```powershell
cd "$env:USERPROFILE\.gemini\antigravity\scratch\zerokit-ai-control-plane"
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
- üst tarafta `TR`, `Light theme` ve `No external requests` göstergesi;
- `Synthetic scenario` alanında `School SaaS`;
- aşağıda üç aşamalı kanıt akışı, config çalışma alanı ve panel/rol/endpoint doğrulama kartları.

Pencere dar olduğu için soldaki menü görünmüyorsa bu hata değildir. Sol üstteki üç çizgili düğmeye tıkladığında menü açılır; ekran genişletildiğinde menü kendiliğinden solda sabit görünür.

Sayfa açılmazsa:

1. Sunucu Terminalinin hâlâ açık olduğunu kontrol et.
2. Terminalde kırmızı hata varsa ekran görüntüsü al.
3. Adresi `https` değil `http` ile yazdığını kontrol et.
4. `127.0.0.1` ve `4173` sayılarını değiştirme.

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
| `03-model-and-task.mp4` | 25 sn | Codex'te model seçimini aç, model olarak GPT-5.6 Sol'u ve reasoning olarak High'ı göster, İngilizce komutu gönder |
| `04-codex-result.mp4` | 25 sn | Codex'in bitmiş cevabını ve validator PASS sonucunu yavaşça göster |
| `05-control-plane.mp4` | 45 sn | Preview'da School SaaS, sayılar, panel map, roller ve endpoint map'e kaydır |
| `06-language-theme.mp4` | 15 sn | `Light theme`e tıkla, sonra `Dark theme`; `TR`ye tıkla ve hemen `EN`ye dön |
| `07-pocketbase-tests.mp4` | 28 sn | Terminalde PocketBase PASS ve ardından test PASS satırlarını göster |
| `08-ending.mp4` | 12 sn | Preview hero veya GitHub repo sayfasını sabit göster |

Codex çalışması uzun sürerse tamamını üç dakikalık videoda bekletme. Başlangıç ve bitişi ayrı kaydet; montajda aradaki bekleme bölümünü kes. Son videoya `Codex run shortened for time` yazısını ekle. Gerçek sonucu göstermeye devam et.

## Bölüm 5 — Üç dakikalık kesin video, ses ve altyazı akışı

Kesin zaman, görüntü, İngilizce ses cümlesi, altyazı ve kanıt tablosu [VOICEOVER_SCRIPT.md](VOICEOVER_SCRIPT.md) dosyasındadır. O dosya **tek doğru kaynak**tır ve toplam süre 2 dakika 57 saniyedir.

1. Dosyayı Codex'te sol taraftaki dosya ağacından aç.
2. Her satırdaki **English voiceover line** metnini sırayla kullan.
3. Aynı satırdaki **On-screen caption** metnini ekrana yaz.
4. Her ses parçasını tablodaki başlangıç zamanına taşı.
5. Görüntüyü sesin anlattığı kanıtla eşleştir.
6. Türkçe açıklamaları videoya koyma.

## Bölüm 6 — Clipchamp'te İngilizce ses ve altyazıları ekle

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

### 6.4 İngilizce yazı ekle

1. Sol araç çubuğunda **Text / Metin** bölümüne tıkla.
2. Sade bir başlık seç. Elmas simgesi olan premium seçeneği kullanma.
3. Seçtiğin metni zaman çizgisinde videonun **üstündeki** satıra sürükle.
4. Sağ taraftaki metin alanına Bölüm 5'teki ilk İngilizce yazıyı yapıştır.
5. Metin kutusunun zaman çizgisindeki sağ ve sol kenarlarını sürükleyerek tabloda belirtilen saniyeler boyunca görünmesini sağla.
6. Yazı rengi beyaz, arka planı koyu ve okunaklı olsun.
7. Yazıyı uygulamanın önemli düğmelerini kapatmayacak biçimde alt orta veya üst ortaya yerleştir.
8. Tablodaki bütün İngilizce yazılar için aynı adımları tekrarla.

Kısa ekran kartlarını **Text** aracıyla elle eklemek en kontrollü yoldur. İstersen ses eklendikten sonra **Captions / Altyazılar** bölümünden otomatik altyazı üret; fakat her kelimeyi İngilizce kaynak metinle karşılaştırıp yanlışları düzelt.

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
- Codex komutu İngilizce.
- En az bir validator PASS, PocketBase PASS ve test PASS görünür.
- Kişisel dosya, bildirim, API anahtarı, `.env` veya donör panel görünmüyor.
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
| PowerShell “running scripts is disabled” diyor | `npm` yerine `npm.cmd` kullan; `Set-ExecutionPolicy` çalıştırma ve aynı Terminalde komutu yeniden dene |
| `127.0.0.1` açılmıyor | `npm.cmd run dev` çalışan Terminali açık tut; adresi `http` ile yeniden yaz |
| GPT-5.6 görünmüyor | Uygulamayı güncelle, doğru hesabı ve plan/rollout erişimini kontrol et; başka modeli GPT-5.6 diye gösterme |
| `codex:prepare` FAIL | Görevi modele gönderme; bulguyu sentetik girdiden temizle ve komutu yeniden çalıştır |
| Codex yanlış dosyaya yazdı | İngilizce takip komutuyla tam hedef yolu tekrar belirt |
| Validator FAIL | Codex'e aynı validator komutunu çalıştırıp bütün hataları düzeltmesini söyle |
| Video çok uzun | Bekleme ve fare hareketlerini kes; PASS/model/ürün kanıtlarını kesme |
| İngilizce yazı okunmuyor | Daha kısa metin, daha büyük yazı ve en az 3–4 saniye görünme süresi kullan |
| Clipchamp ödeme istiyor | Elmas simgeli premium metin/stock öğesini kaldır; sade metin ve 1080p kullan |
| Yanlışlıkla donör panel açıldı | O klibi sil ve yalnız açık repo preview'sunu yeniden kaydet |

## Yarışmaya yüklemeden hemen önce

1. GitHub reposunu gizli pencerede aç ve herkese açık olduğunu doğrula.
2. README'deki hızlı başlangıç komutlarını temiz bir Terminalde çalıştır.
3. Son videoyu kulaklıkla izle; İngilizce sesin anlaşılır, altyazıların doğru ve arka planın temiz olduğunu kontrol et.
4. İngilizce yazım hatalarını kontrol et.
5. Repo URL'sinin `zyganali-glitch/zerokit-ai-control-plane` olduğunu kontrol et.
6. Videoda özel donör repo, gerçek kişi verisi, credential veya API anahtarı olmadığını tekrar kontrol et.
7. Devpost açıklamasında ürünün “public competition adaptation” olduğunu ve preview'nun local çalıştığını dürüstçe belirt.

## Kaynaklar

- OpenAI GPT-5.6 ve Codex erişimi: <https://help.openai.com/en/articles/20001354-gpt-56-in-chatgpt>
- Windows Ekran Alıntısı Aracı video kaydı: <https://support.microsoft.com/en-us/windows/apps/use-snipping-tool-to-capture-screenshots>
- Clipchamp'te metin ekleme: <https://support.microsoft.com/en-us/clipchamp/how-to-add-text-and-titles-to-a-video>
- Clipchamp 1080p dışa aktarma: <https://support.microsoft.com/en-us/clipchamp/exporting-and-saving-a-video-in-clipchamp>
