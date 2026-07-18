# İngilizce seslendirmeli üç dakikalık Build Week demo metni

Bu belge, yayımlama öncesi Türkçe üretim rehberidir. Final video <https://www.youtube.com/watch?v=vGYXv_pltRE> adresinde Public olarak yayımlandı; gerçek süresi **2:38** ve İngilizce ses içeriyor. Aşağıdaki zaman tablosu, tarihsel 2:54 çekim planını gösterir; final süre iddiası değildir.

Paketli School SaaS örneği yalnız tanıtım içindir; nihai çalışma kanıtı değildir. Tarayıcı bölümünü ancak taze GPT-5.6 Sol çıktısı sıkı CLI validator’dan geçtikten, insan tarafından incelendikten ve hash manifesti kaydedildikten sonra çek. Tarayıcıda **Choose local JSON** düğmesiyle tam olarak bu evidence dosyasını seç. Nihai kanıt çekiminde **Load sample** kullanma.

| Zaman | Ekran | İngilizce seslendirme | Gösterilen kanıt |
| --- | --- | --- | --- |
| 0:00–0:07 | İngilizce ürün giriş ekranı | “This is ZeroKit AI Control Plane, a developer tool built with Codex and GPT-5.6.” | Ürün ve çalışan arayüz |
| 0:07–0:16 | Ürün çalışma alanı; panel, rol, alan ve endpoint başlıkları | “SaaS teams repeatedly rebuild roles, navigation, fields, endpoints, and release checks.” | Sorun ve hedef kullanıcı |
| 0:16–0:27 | Kanıt zinciri ve sayaçlar | “ZeroKit turns a sanitized product brief into one reviewable control-plane configuration.” | Ürün değeri |
| 0:27–0:38 | `codex:prepare` komutu | “Before Codex sees the task, a local privacy preflight blocks sensitive patterns and prepares a bounded file.” | Sıfır engel ve görev yolu |
| 0:38–0:48 | Codex seçici; GPT-5.6 Sol ve Ultra görünür | “I selected GPT-5.6 Sol with Ultra intelligence in the Codex app.” | Görünür gerçek model ve zekâ düzeyi seçimi |
| 0:48–0:58 | Hazırlanan görev dosyası | “The prepared task limits Codex to synthetic requirements, the public schema, and a specific output path.” | İzinli dosyalar ve hedef |
| 0:58–1:08 | Codex görevi ve oluşan hedef | “Codex uses GPT-5.6 to generate the target configuration inside the public repository.” | Taze hedef JSON |
| 1:08–1:18 | Sıkı validator PASS | “The strict local validator rejects incomplete sections, malformed roles, and missing review evidence.” | Gerçek sıkı PASS ve sayılar |
| 1:18–1:29 | İnsan incelemesi ve manifest | “After human review, an operator-confirmed manifest records file hashes without claiming cryptographic model proof.” | İnceleme, manifest ve hash |
| 1:29–1:45 | **Choose local JSON** → taze evidence dosyası → PASS | “I load the fresh reviewed evidence JSON, and the browser re-validates it locally without third-party or model requests.” | Dosya seçici, taze evidence dosyası, yapısal PASS, istek sınırı |
| 1:45–1:59 | Seçilen evidence dosyasından panel, rol, alan ve endpoint’ler | “Judges can inspect enabled and hidden panels, least-privilege roles, field options, and route mappings before integration.” | Kontrol düzlemi bölümleri |
| 1:59–2:11 | PocketBase adaptör kanıtı | “A synthetic PocketBase fixture proves one payload adapter boundary and fails closed on malformed shapes.” | Sentetik dönüşüm |
| 2:11–2:25 | Test sonuçları | “Repeatable unit, privacy, and browser gates produce honest PASS or FAIL evidence.” | Güncel gerçek test toplamları |
| 2:25–2:38 | Kanıt/gizlilik sınırı | “Production customer records, credentials, private messages, and runtime authorization stay outside the model loop.” | Sentetik veri sınırı |
| 2:38–2:49 | Ücretsiz Pages ve GitHub reposu | “The free live preview needs no rebuild, paid domain, or model API, while the repository contains reproducible evidence.” | Ücretsiz canlı site ve repo |
| 2:49–2:54 | Son ekran | “ZeroKit makes AI-generated control-plane decisions visible, testable, and reviewable.” | Herkese açık URL |

Codex'e yapıştırılacak İngilizce görev ve kurgu sınırları [DEMO_SCRIPT.md](DEMO_SCRIPT.md) içindedir. Programlarda nereye tıklayacağını öğrenmek için [DEMO_VIDEO_ROADMAP.md](DEMO_VIDEO_ROADMAP.md) belgesini izle.
