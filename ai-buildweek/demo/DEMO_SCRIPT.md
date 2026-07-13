# Sessiz üç dakikalık Build Week demo metni

Videoda konuşma, müzik veya ortam sesi kullanılmaz. Ekran İngilizce tutulur. Aşağıdaki `On-screen text` satırları Clipchamp'te videonun üzerine İngilizce olarak eklenir; Türkçe açıklamalar videoya girmez.

| Zaman | Ekran | On-screen text |
|---|---|---|
| 0:00–0:08 | İngilizce ZeroKit hero | `ZeroKit AI Control Plane` |
| 0:08–0:18 | School SaaS preview | `From a sanitized SaaS brief to a reviewable control-plane contract.` |
| 0:18–0:34 | `codex:prepare` ve sıfır blocker | `Local privacy checks run before the model sees the task.` |
| 0:34–0:48 | Codex model seçici | `GPT-5.6 works inside the Codex app — no model API key.` |
| 0:48–1:03 | İngilizce Codex görevi | `Only synthetic roles, panels, fields, and routes are allowed.` |
| 1:03–1:16 | Üretilen config | `Codex generates the config in the public repository.` |
| 1:16–1:28 | Validator ve manifest PASS | `Deterministic validation and human review close the loop.` |
| 1:28–1:42 | Preview sayaçları | `One config controls navigation, roles, fields, and endpoints.` |
| 1:42–1:57 | Panel map | `Enabled and hidden panels are explicit and reviewable.` |
| 1:57–2:10 | RBAC roles | `Least-privilege RBAC is visible before integration.` |
| 2:10–2:23 | Endpoint map | `Routes can change. Payload compatibility must be tested.` |
| 2:23–2:36 | PocketBase fixture/adaptör PASS | `An open-source PocketBase fixture proves the adapter boundary.` |
| 2:36–2:48 | Unit, privacy ve browser PASS | `Repeatable local gates produce honest PASS or FAIL evidence.` |
| 2:48–2:58 | Privacy banner | `Production customer data stays outside the model loop.` |
| 2:58–3:00 | Repo URL | `github.com/zyganali-glitch/zerokit-ai-control-plane` |

## Codex'e yapıştırılacak İngilizce görev

```text
Follow AGENTS.md. Read ai-buildweek/runs/school-saas.codex-task.md and complete the task. Use only the synthetic files allowed by that task. Do not read any .env file, private donor file, credential, production log, customer record, or private file outside this repository. Run the required local validator, fix every failure, and report the final validation result and assumptions.
```

## Kurgu kuralı

Gerçek Codex çalışması uzunsa bekleme kısmı kesilebilir. Başlangıçtaki görünür GPT-5.6 seçimi, İngilizce görev, oluşturulan hedef dosya ve son PASS kesilmez. Kesilen bölümün üzerine `Codex run shortened for time` yazılır.

Tıklama tıklama hazırlık, kayıt ve Clipchamp anlatımı için [DEMO_VIDEO_ROADMAP.md](DEMO_VIDEO_ROADMAP.md) belgesini kullan.
