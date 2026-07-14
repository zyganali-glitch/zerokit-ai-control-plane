# Three-minute Build Week demo with English voiceover

The final video must be public on YouTube, shorter than three minutes, and include English audio. The lines below are intentionally short enough for clear human speech or English text-to-speech; the current official FAQ permits AI-assisted narration. Use readable English captions for accessibility and do not use copyrighted music.

The bundled School SaaS sample is orientation material, not final run evidence. Record the browser segment only after the fresh GPT-5.6 Sol output has passed the strict CLI validator, completed human review, and received its hash manifest. Use **Choose local JSON** to load that exact evidence file. Never substitute **Load sample** for this final proof.

| Time | Screen | Voiceover | Caption | Evidence |
| --- | --- | --- | --- | --- |
| 0:00–0:07 | Hold on the English product hero. | “This is ZeroKit AI Control Plane, a developer tool built with Codex and GPT-5.6.” | `ZeroKit AI Control Plane` | Product name and working UI |
| 0:07–0:16 | Keep the product workspace visible while pointing to panels, roles, fields, and endpoints. | “SaaS teams repeatedly rebuild roles, navigation, fields, endpoints, and release checks.” | `Repeated admin infrastructure becomes one reviewable contract.` | Problem and target user |
| 0:16–0:27 | Show the proof strip and preview metrics. | “ZeroKit turns a sanitized product brief into one reviewable control-plane configuration.” | `Panels · RBAC · Fields · Endpoints` | Product value and configuration scope |
| 0:27–0:38 | Run `npm.cmd run codex:prepare -- ai-buildweek/examples/school-saas.input.md --force`. | “Before Codex sees the task, a local privacy preflight blocks sensitive patterns and prepares a bounded file.” | `Local privacy preflight: PASS` | Zero blockers and generated task path |
| 0:38–0:48 | Open the Codex selector; show **GPT-5.6 Sol** and the actual selected mode and effort. | “I selected GPT-5.6 Sol and made the selected mode and effort visible in the Codex app.” | `GPT-5.6 Sol · Selected mode and effort visible` | Visible model, mode, and effort selection |
| 0:48–0:58 | Open `ai-buildweek/runs/school-saas.codex-task.md`. | “The prepared task limits Codex to synthetic requirements, the public schema, and a specific output path.” | `Bounded task · Synthetic inputs only` | Allowed files, prohibited sources, target path |
| 0:58–1:08 | Show the English task sent to Codex, then the finished target file. | “Codex uses GPT-5.6 to generate the target configuration inside the public repository.” | `Codex-generated target config` | `ai-buildweek/evidence/school-saas.gpt-5.6.codex.config.json` |
| 1:08–1:18 | Show the strict validator command and PASS output. | “The strict local validator rejects incomplete sections, malformed roles, and missing review evidence.” | `Strict validator: PASS` | Strict generated-artifact PASS and counts |
| 1:18–1:29 | Show human review, then `codex:record` PASS and the manifest hash. | “After human review, an operator-confirmed manifest records file hashes without claiming cryptographic model proof.” | `Human reviewed · Hash manifest recorded` | Review confirmation, manifest path, hash |
| 1:29–1:45 | In the English preview, click **Choose local JSON**, select `school-saas.gpt-5.6.codex.config.json`, then hold on PASS. | “I load the fresh reviewed evidence JSON, and the browser re-validates it locally without third-party or model requests.” | `Fresh reviewed JSON · Local PASS` | File chooser, fresh evidence filename, structural PASS, request boundary |
| 1:45–1:59 | Scroll through panels, roles, fields, and endpoints created from the selected evidence file. | “Judges can inspect enabled and hidden panels, least-privilege roles, field options, and route mappings before integration.” | `Review before integration` | Panel/RBAC/field/endpoint sections |
| 1:59–2:11 | Run or reveal `npm.cmd run demo:pocketbase`. | “A synthetic PocketBase fixture proves one payload adapter boundary and fails closed on malformed shapes.” | `PocketBase adapter proof: PASS` | Two synthetic items, strict mapped output |
| 2:11–2:25 | Show unit, privacy, and browser test results. | “Repeatable unit, privacy, and browser gates produce honest PASS or FAIL evidence.” | `Unit · Privacy · Browser: PASS` | Exact current test totals |
| 2:25–2:38 | Hold on the evidence-boundary note and privacy banner. | “Production customer records, credentials, private messages, and runtime authorization stay outside the model loop.” | `Production customer data stays outside the model loop.` | Privacy boundary and synthetic disclosure |
| 2:38–2:49 | Show the GitHub Pages preview, then the public GitHub repository. | “The free live preview needs no rebuild, paid domain, or model API, while the repository contains reproducible evidence.” | `Free live demo · No paid domain or model API` | Pages URL and public repository URL |
| 2:49–2:54 | End on the product hero and URL. | “ZeroKit makes AI-generated control-plane decisions visible, testable, and reviewable.” | `github.com/zyganali-glitch/zerokit-ai-control-plane` | Final public URL |

## English task to paste into Codex

```text
Follow AGENTS.md. Read ai-buildweek/runs/school-saas.codex-task.md and complete the task. Use only the synthetic files allowed by that task. Do not read any .env file, credential, production log, customer record, or private file outside this repository. Run the required strict local validator, fix every failure, and report the final validation result and assumptions.
```

If the real Codex run takes longer than the video allows, remove only the waiting interval and add `Codex run shortened for time`. Never remove the visible model selection, prepared task, fresh generated target, validator PASS, human review, manifest, **Choose local JSON** selection, local PASS, or final tests. If the fresh evidence file is unavailable, stop and complete the workflow; do not fall back to a bundled sample.

Exact voiceover source: [VOICEOVER_SCRIPT.md](VOICEOVER_SCRIPT.md). Turkish click-by-click production guide: [DEMO_VIDEO_ROADMAP.md](DEMO_VIDEO_ROADMAP.md).
