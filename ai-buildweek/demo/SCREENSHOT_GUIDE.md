# Devpost / OpenAI ekran görüntüsü rehberi

Mobil adım dışında 1440×900 çek. Yalnız repodaki sentetik senaryoları kullan. İlgisiz sekmeleri, kişisel path gösteren terminalleri, bildirimleri ve credential arayüzlerini kapat.

## 1. Hero ve mahremiyet sözü

- `http://127.0.0.1:4173` adresini dark tema ve EN ile aç.
- Başlık, tagline, “Public Build Week judging edition” ve yerel privacy banner kadrajda olsun.
- Açıklama: “Codex uygulamasında GPT-5.6 ile geliştirici tarafı mimari akışı; production müşteri verisi modele girmez.”

## 2. Codex görev ve model kanıtı

- Codex uygulamasında proje adı, GPT-5.6 Sol model seçimi ve `school-saas.codex-task.md` görevini aynı karede göster.
- API anahtarı, `.env`, kişisel thread veya özel repo görünmesin.
- Açıklama: “Yerel privacy preflight sonrasında sınırlandırılmış Codex görevi.”

## 3. Okul config özeti

- School SaaS yükle ve dark temada kal.
- PASS, dört metric card, panel map ve roller kadrajda olsun.
- Kapalı `team_billing` chip'i görünsün.
- Açıklama: “Yerelde projekte edilen panel registry ve least-privilege RBAC.”

## 4. Endpoint ve field sözleşmesi

- School SaaS için Endpoint map ile Fields/options bölümlerine kaydır.
- users, invoices, reports, currency options ve privacy notes görünsün.
- Açıklama: “Route'lar yapılandırılabilir; payload uyumu ayrıca doğrulanır.”

## 5. Sağlık mahremiyet profili

- Tekrar üretilebilir durum için `http://127.0.0.1:4173/?lang=tr&theme=light&scenario=healthcare-saas` aç.
- PASS, kapalı impersonation/chat, roller ve privacy notes görünsün.
- Açıklama: “Sentetik sağlık senaryosu; PHI ve hasta kayıtları model kapsamı dışında.”

## 6. Mobil ve erişilebilirlik

- Viewport'u 375×812 yap ve `http://127.0.0.1:4173/?lang=tr&theme=light&scenario=agency-saas` aç.
- Agency SaaS özeti ve “Yerelde doğrula” üzerindeki görünür focus'u çek.
- Açıklama: “Responsive, keyboard-visible, bilingual jüri yüzeyi.”

## 7. PocketBase adaptör kanıtı

- Sentetik `items/totalItems` fixture'ını ve `npm run demo:pocketbase` PASS sonucunu göster.
- Açıklama: “Açık kaynak backend zarfı, testli ve fail-closed ZeroKit sözleşmesine dönüştürülür.”

## 8. Test kanıtı

- Temiz terminalde `npm run test:unit`, `npm run test:privacy` ve bir config doğrulaması çalıştır.
- Test sayısı, PASS ve config sayıları görünsün; kişisel filesystem path'i kırp.
- Açıklama: “Codex görev/manifest, privacy, adaptör ve senaryo contract testleri.”

## 9. Mimari kapanış karesi

- README mimari diyagramı ve “Why GPT-5.6/Codex is central” bölümünü çek.
- Açıklama: “AI config, adaptör ve kapıları tasarlar; müşteri veri düzlemi kullanıcı altyapısında kalır.”
