# GPT-5.6/Codex config mimarı çalışma akışı

> Bu belge teknik ayrıntı kaynağıdır. İlk kez video hazırlayan kullanıcı doğrudan [tıklama tıklama sessiz demo kılavuzunu](DEMO_VIDEO_ROADMAP.md) izlemelidir.

## Amaç

Hassas olmayan bir SaaS tarifini doğrulanmış ZeroKit kontrol düzlemi sözleşmesine, adaptör karar kaydına ve test kapısı planına dönüştürmek. Model geliştirici artifact'leri üzerinde çalışır; production müşteri verisi kapsam dışıdır.

## Codex uygulaması kurulumu

1. Bu repoyu Codex uygulamasında proje olarak aç.
2. Model seçiciden **GPT-5.6 Sol** seç.
3. Günlük iterasyonda `high`, son yarışma çalışmasında hesabında varsa `max` efor seç.
4. Model seçimini scriptin doğrulayamayacağını kabul et; yarışma videosunda model seçiciyi göster.
5. Model API'si veya API anahtarı kullanma.

## Girdi hazırlığı

1. `ai-buildweek/examples/*.input.md` biçiminden bir senaryo seç.
2. Ürün, rol, panel, sentetik alan ve route adlarını yaz.
3. Yalnızca sansürlenmiş OpenAPI operation'ları veya response key özetlerini ekle.
4. Gerçek host, identifier, kayıt, credential, log ve serbest müşteri metnini çıkar.
5. İnsan reviewer girdiyi onaylasın.

## Yerel preflight ve görev paketi

```bash
npm run codex:prepare -- ai-buildweek/examples/school-saas.input.md
```

Komut gizli anahtar ve gerçek görünümlü kimlik sinyallerini kontrol eder; ardından `ai-buildweek/runs/school-saas.codex-task.md` üretir. FAIL varsa görevi Codex'e verme.

## Codex görevini çalıştırma

Yeni Codex görevinde şu **İngilizce** komutu aynen yapıştır:

```text
Follow AGENTS.md. Read ai-buildweek/runs/school-saas.codex-task.md and complete the task. Use only the synthetic files allowed by that task. Do not read any .env file, private donor file, credential, production log, customer record, or private file outside this repository. Run the required local validator, fix every failure, and report the final validation result and assumptions.
```

Codex hedef config'i `ai-buildweek/evidence/` altında üretir ve validator çalıştırır. Codex'in `.env`, private donor, üretim logu veya repo dışındaki dosyaları okumasına izin verme.

## İnsan review ve manifest

Şunları kontrol et:

- bütün paneller bilinçli açık/kapalı ve doğru navigation grubunda;
- roller least privilege uyguluyor ve slug'lar benzersiz;
- field/options gerçek kişisel veya production değer içermiyor;
- endpoint map yalnız route içeriyor; secret ve host yok;
- uyumluluk kanıtsız uydurulmamış;
- privacy notes model/runtime sınırını doğru açıklıyor;
- test checklist gerçek riskleri kapsıyor.

Onaydan sonra:

```bash
npm run codex:record -- \
  ai-buildweek/examples/school-saas.input.md \
  ai-buildweek/runs/school-saas.codex-task.md \
  ai-buildweek/evidence/school-saas.gpt-5.6.codex.config.json \
  --model="GPT-5.6 Sol" --confirm-model-visible --confirm-reviewed
```

Manifest model seçimini “operatör onaylı, kriptografik değil” olarak kaydeder; input/task/output içeriklerini değil hash'lerini içerir.

## Dört düşünme geçişi

1. **Config mimarisi:** `01-config-architect.prompt.md`
2. **Backend eşleme:** `02-backend-adapter-mapper.prompt.md`; `unknown`, `missing`, `shim required` sonuçlarını uyumlu sayma.
3. **Test kapıları:** `03-test-gate-planner.prompt.md`; çalıştırılmayan kapıya dürüstçe `NOT_RUN` de.
4. **Demo anlatısı:** `04-demo-script-generator.prompt.md`; yalnız gerçek PASS/FAIL kanıtını kullan.

## Güvenli yerel uygulama

```bash
node ai-buildweek/scripts/apply-demo-config.mjs ai-buildweek/evidence/school-saas.gpt-5.6.codex.config.json
node ai-buildweek/scripts/generate-demo-report.mjs ai-buildweek/evidence/school-saas.gpt-5.6.codex.config.json
npm run dev
```

Apply aracı varsayılan olarak `ai-buildweek/demo-config/` kullanır, mevcut hedefi yedekler ve açık override olmadan donor config hedefini reddeder.
