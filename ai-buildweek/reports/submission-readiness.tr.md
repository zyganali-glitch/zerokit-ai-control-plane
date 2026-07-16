# OpenAI Build Week başvuru ve jüri değerlendirmesi

- Değerlendirme tarihi: 2026-07-16
- Hedef track: **Developer Tools**
- Resmî kaynaklar: [Devpost ana sayfa](https://openai.devpost.com/), [Official Rules](https://openai.devpost.com/rules), [FAQ](https://openai.devpost.com/details/faqs)
- Not: Aşağıdaki puanlar resmî jüri puanı veya kazanma garantisi değildir.

## Kısa hüküm

Proje iddiasının dar ve dürüst hâli kod tarafından karşılanıyor:

> ZeroKit, Codex uygulamasında görünür biçimde seçilen GPT-5.6 ile temizlenmiş SaaS gereksinimlerini yerelde doğrulanan bir kontrol düzlemi sözleşmesine, adaptör sınırına ve test kanıtına dönüştüren geliştirici iş akışıdır.

“Her backend'e otomatik bağlanan production-ready sistem” iddiası karşılanmıyor ve kullanılmamalıdır. Mevcut ürünün güçlü tarafı, GPT-5.6'yı sohbet kutusu olarak değil; panel, RBAC, alan, endpoint ve test kararlarını birlikte kuran mimari eş tasarımcı olarak kullanmasıdır.

## Resmî uygunluk durumu

| Şart | Repo durumu | Başvuru öncesi gereken |
| --- | --- | --- |
| Codex + GPT-5.6 ile çalışan proje | **Tamamlandı** | Görünür GPT-5.6 Sol + Ultra, taze hedef, validator PASS, insan incelemesi ve manifest `15439ab` kanıt commit'inde |
| Tek track | Hazır | Developer Tools seç |
| İngilizce açıklama | Taslak hazır | Devpost alanlarına yapıştır ve son kez oku |
| Üç dakikadan kısa, sesli YouTube | Plan ve 2:54 metin hazır | TTS sesli videoyu üret ve public yükle |
| Açık repo ve kurulum | Hazır | Gizli pencerede doğrula |
| `/feedback` Session ID | Rehber hazır | Ana Codex görevinde üret, yalnız Devpost'a yapıştır |
| Yeniden build gerektirmeyen test | **Tamamlandı** | Pages build/deploy başarılı; canlı URL anonim HTTP ve gerçek Chrome ile doğrulandı |
| Başvuru dönemi içi anlamlı geliştirme | **Tamamlandı** | Final kanıt SHA'sı delta belgesine işlendi |
| Çalıştığı gibi gösterme | Ham kayıtlar tamamlandı | Gerçek PASS görüntülerini İngilizce sesli final videoda birleştir |

Başvuru paketi henüz yalnız iki manuel kapı nedeniyle tamamlanmış değildir: herkese açık İngilizce sesli video ve yalnız Devpost'a konacak özel `/feedback` Session ID. Submission-period delta ve final kanıt commit'i tamamlanmıştır.

## En kritik tarih bulgusu

Git geçmişindeki `7ca084b`–`74605f7` commit'leri 2026-07-13 saat 14:38–16:42 UTC+03 aralığındadır. Resmî Submission Period 2026-07-13 09:00 PDT, yani 19:00 UTC+03'te başlamıştır. Dolayısıyla eski çekirdek commit'ler başvuru dönemi öncesidir.

Bu yüzden son tur yalnız belge düzeltmesi değildir: Pages alt-yol taşınabilirliği, URL testleri, ürün içi kanıt zinciri, sentetik/final kanıt ayrımı, Pages dağıtımı ve final GPT-5.6 akışı başvuru dönemi içindeki anlamlı genişletme olarak birlikte sunulmalıdır. Ayrıntı: [build-week-delta.md](build-week-delta.md).

## Dört eşit kriterde koşullu puan

| Kriter | Manuel kapılar tamamlanırsa | Neden |
| --- | ---: | --- |
| Technical Implementation | 8.5/10 | Gerçek validator, privacy guard, fail-closed adaptör, Pages testleri ve taze GPT-5.6 final çalışması güçlü; model seçimi dürüstçe operatör onaylı ve kriptografik olmayan kanıt olarak kaydedildi. |
| Design | 8.2/10 | Responsive ve iki dilli preview anlaşılır; Codex ile preview hâlâ iki ayrı yüzeydir. |
| Potential Impact | 7.5/10 | Tekrarlanan SaaS kontrol düzlemi problemi inandırıcı; müşteri görüşmesi, süre ölçümü veya pilot yoktur. |
| Quality of Idea | 8.5/10 | GPT-5.6'nın config/contract/test eş tasarımcısı olarak kullanılması ve mahremiyet sınırı ayırt edicidir. |
| **Eşit ağırlıklı tahmin** | **8.2/10** | Güçlü ve ciddiye alınabilir; fakat track birinciliği için final video anlatısı olağanüstü net olmalıdır. |

## Jüri mercekleri

Resmî sayfadaki görev unvanlarından hareketle aşağıdaki noktalar birer **çıkarımdır**, jüri üyelerinin söylediği doğrulanmış kişisel görüşler değildir.

- **Thibault Sottiaux — Head of Product & Platform:** İlk 30 saniyede sıradan bir geliştiricinin problemi, ürünün yaptığı iş ve çalışan akış anlaşılmalı. Pages demo ve kısa problem cümlesi bu merceğe hizmet eder.
- **Kath Korevec — Member of Product Staff:** Ürün anlatısı ve kullanıcı yolunun gereksiz teknik ayrıntıya boğulmaması önemlidir. Video bir özellik listesi değil, “brief → güvenli görev → config → PASS → preview” hikâyesi olmalıdır.
- **Tara Seshan — Member of Product Staff:** İş değeri, güven sınırı ve operasyonel dürüstlük önem kazanır. Evrensel uyumluluk iddiasından kaçınmak ve fail-closed adaptör göstermek güçlüdür.
- **Leah Belsky — VP of Education:** School SaaS örneği anlaşılır bir gerçek dünya bağlamı sağlar. Ancak başvuru track'i Education değil Developer Tools olmalı; okul yalnızca genişletilebilirliği gösterir.
- **Peter Steinberger — MTS, “Clawfather”:** Agent-native iş akışı, gerçek yürütme, geliştirici ergonomisi ve teknik özgünlük öne çıkar. GPT-5.6 seçimini yalnız rozet olarak değil, bounded task ve üretilen dosya üzerinden kanıtlamak gerekir.

## Kazanma şansı hakkında dürüst görüş

Bu düzenlemeler ve manuel kapılar tamamlanırsa proje “ciddiye alınacak, teknik olarak tutarlı bir Developer Tools başvurusu” seviyesindedir. Mahremiyet, deterministik doğrulama ve dürüst adaptör sınırı onu birçok yüzeysel AI demosundan ayırır. Buna rağmen her track'te yalnız iki para ödülü olduğu için projeyi favori veya kazanması muhtemel diye adlandırmak doğru olmaz.

En büyük ödül riski kod kalitesi değil, anlatıdır: jüri üç dakikada GPT-5.6'nın neden zorunlu olduğunu anlamazsa ürün iyi bir config viewer gibi görünebilir. İkinci risk, çekirdeğin dönem öncesi olmasıdır; in-period genişletme ve final Codex Session kanıtı açıkça görünmelidir. Üçüncü risk, etki iddiasında ölçüm/pilot olmamasıdır.

## Kalan ödül odaklı sıra

1. Tamamlanan ham görüntüleri 2:54 İngilizce TTS videoda birleştir; ilk 27 saniyede problem, ürün ve GPT-5.6 değerini kur.
2. Teknik kanıtı gerçek PASS sonuçlarıyla göster; yalnız bekleme sürelerini kes ve sonucu kurgu ile üretme.
3. Videoyu herkese açık YouTube bağlantısıyla yayımla.
4. `/feedback` Session ID'yi yalnız Devpost formuna koy.
5. İngilizce Devpost metni, repo, Pages ve YouTube bağlantılarını gizli pencerede son kez aç ve Developer Tools altında gönder.
