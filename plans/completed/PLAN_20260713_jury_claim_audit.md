# Tarihsel jüri/iddia denetimi — YERİNE YENİSİ GELDİ

- Tarih: 2026-07-13
- Durum: TAMAM, SONRADAN DEĞİŞTİRİLDİ
- Yerine geçen plan: `plans/PLAN_20260713_codex_app_workflow_tr.md`

Bu planın ilk sürümü GPT-5.6 için model API'si kullanan bir kanıt yolu denemiş ve `ad9761a` commit'iyle yayımlanmıştı. Kullanıcının açık tercihi üzerine bu yaklaşım aynı gün kaldırıldı.

Güncel ürün akışı:

1. sentetik gereksinimi yerelde mahremiyet kontrolünden geçirir;
2. tekrar üretilebilir Codex görev dosyası hazırlar;
3. operatörün Codex uygulamasında GPT-5.6 Sol seçmesini ister;
4. config'i repo içinde üretir ve deterministik doğrular;
5. insan review sonrasında model beyanı ve dosya hash'lerinden oluşan manifest kaydeder;
6. hiçbir model API'si veya API anahtarı kullanmaz.

İlk denetimin yarışma kriteri, claim-scope, PocketBase adaptörü ve test disiplinine ilişkin sonuçları güncel Türkçe jüri raporunda korunur: `ai-buildweek/reports/jury-claim-audit.md`.
