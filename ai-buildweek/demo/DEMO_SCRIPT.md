# Silent three-minute Build Week demo

Use no narration, music, or ambient audio. Keep the application UI and every added caption in English. The separate private donor admin panel must not appear.

## Judge video shot list

| Time | On-screen action and required evidence | On-screen text |
| --- | --- | --- |
| 0:00–0:08 | Hold on the English ZeroKit hero. | `ZeroKit AI Control Plane` |
| 0:08–0:18 | Show the School SaaS preview. | `From a sanitized SaaS brief to a reviewable control-plane contract.` |
| 0:18–0:32 | Run `codex:prepare`; keep `PASS`, `privacy blockers: 0`, and the prepared task path visible. | `Local privacy checks run before the model sees the task.` |
| 0:32–0:44 | Open the Codex model picker and visibly show GPT-5.6 Sol or the documented High reasoning selection. | `GPT-5.6 works inside the Codex app — no model API key.` |
| 0:44–0:58 | Open `school-saas.codex-task.md`, then paste and submit the English task. | `Only synthetic roles, panels, fields, and routes are allowed.` |
| 0:58–1:12 | Show the new target at `ai-buildweek/evidence/school-saas.gpt-5.6.codex.config.json`. | `Codex generates the config in the public repository.` |
| 1:12–1:24 | Show validator PASS. | `Deterministic validation rejects incomplete artifacts.` |
| 1:24–1:34 | Show `codex:record` PASS, the operator-confirmed label, and manifest hash. | `Human review and an operator-confirmed manifest close the loop.` |
| 1:34–1:48 | Show preview metrics and the selected School SaaS scenario. | `One config controls navigation, roles, fields, and endpoints.` |
| 1:48–2:00 | Scroll through enabled and hidden panels. | `Enabled and hidden panels are explicit and reviewable.` |
| 2:00–2:12 | Show RBAC roles. | `Least-privilege RBAC is visible before integration.` |
| 2:12–2:24 | Show endpoint mappings. | `Routes can change. Payload compatibility must be tested.` |
| 2:24–2:36 | Run or reveal the PocketBase adapter PASS. | `An open-source PocketBase fixture proves the adapter boundary.` |
| 2:36–2:48 | Show unit 18/18, privacy 8/8, and browser 16/16 PASS evidence. | `Repeatable local gates produce honest PASS or FAIL evidence.` |
| 2:48–2:58 | Hold on the local privacy banner or privacy-boundary document. | `Production customer data stays outside the model loop.` |
| 2:58–3:00 | Show the public repository URL. | `github.com/zyganali-glitch/zerokit-ai-control-plane` |

## English task to paste into Codex

```text
Follow AGENTS.md. Read ai-buildweek/runs/school-saas.codex-task.md and complete the task. Use only the synthetic files allowed by that task. Do not read any .env file, private donor file, credential, production log, customer record, or private file outside this repository. Run the required local validator, fix every failure, and report the final validation result and assumptions.
```

## Editing rule

If the real Codex run takes too long, remove only the waiting interval and add `Codex run shortened for time`. Do not cut the visible model selection, prepared task, generated target path, validator PASS, operator-confirmed manifest, or final test evidence.

The full Turkish click-by-click preparation, recording, and Clipchamp guide remains in [DEMO_VIDEO_ROADMAP.md](DEMO_VIDEO_ROADMAP.md). Turkish script reference: [DEMO_SCRIPT.tr.md](DEMO_SCRIPT.tr.md).
