# Build Week Delta

## Submitted project

ZeroKit AI Control Plane is a standalone public Build Week judging edition. Judges should evaluate this public repository: its Codex/GPT-5.6 workflow, privacy preflight, generated-config evidence path, validator, browser preview, adapter proof, tests, documentation, and demo surface.

## Prior public foundation

The public repository also had an initial foundation before the official Submission Period. Git records show that foundation ending at commit `74605f7` on **2026-07-13 16:42:28 UTC+03:00**. The official Submission Period began on **2026-07-13 09:00 PDT**, which was **19:00 UTC+03:00**. This timing is disclosed so judges can distinguish prior public context from in-period work.

## New public Build Week work

The meaningful in-period extension begins on 2026-07-14 and is intentionally more than a documentation pass. It includes:

- a GitHub Pages deployment workflow and no-rebuild judge path;
- project-subpath-safe browser routing and sample loading for `github.io/zerokit-ai-control-plane/`;
- automated tests that prove those Pages URL rules;
- a new visible evidence chain in the product UI: local preflight, GPT-5.6/Codex generation, and deterministic gates;
- a visible boundary between bundled synthetic examples and final competition evidence;
- official-rules-aligned English audio/voiceover, Devpost, `/feedback`, Pages, and judge guidance;
- the final fresh GPT-5.6 Codex generation, review, manifest, completion gates, and published 2:38 English-audio YouTube demo, with only the private Devpost Session ID operation left outside the public repository.

The first timestamped commit in this in-period extension is [`31ea6498ecf8124f483da097750da02454392526`](https://github.com/zyganali-glitch/zerokit-ai-control-plane/commit/31ea6498ecf8124f483da097750da02454392526), created on **2026-07-14 08:55:56 UTC+03:00**. It proves the start of the extension; it is not labeled as the final evidence commit.

The later technical-hardening commit [`f870814b274bd554a9218715caa98cbe650fe1a7`](https://github.com/zyganali-glitch/zerokit-ai-control-plane/commit/f870814b274bd554a9218715caa98cbe650fe1a7), created on **2026-07-14 11:39:57 UTC+03:00**, records the strict eight-section generated-artifact gate, schema alignment, Node 22 completion-gate CI, validator and adapter boundary reports, the nine-point browser evidence map, the theme/language status fix, and the final beginner recording/submission workflow.

The final evidence commit [`15439ab567efaf76eeda48bcbfad82769042ea38`](https://github.com/zyganali-glitch/zerokit-ai-control-plane/commit/15439ab567efaf76eeda48bcbfad82769042ea38), created on **2026-07-16 16:50:39 UTC+03:00**, records the fresh [School SaaS config](../evidence/school-saas.gpt-5.6.codex.config.json) and [hash manifest](../evidence/school-saas.gpt-5.6.codex.config.manifest.json). The manifest records GPT-5.6 Sol as visible and operator-confirmed—not cryptographically verified—plus completed human review, zero privacy findings, strict validation PASS, and the reviewed output hash.

## Codex/GPT-5.6 contribution

Codex is the development environment and GPT-5.6 is the reasoning model used to extend and polish the submitted project. In the product workflow, GPT-5.6 also turns a bounded synthetic SaaS brief into a reviewable config while deterministic local code validates the result. Meaningful use is evidenced by the visible model selection, the primary Codex session, in-period commits, a fresh generated target, validator PASS, human review, and hash manifest.

Model selection is operator-confirmed from the visible Codex UI. The repository does not claim that a local script cryptographically verifies the selected model.

## What is intentionally excluded

- production customer records, credentials, logs, invoices, student or health records, and private messages;
- any OpenAI or third-party model API, key, or runtime dependency;
- claims of universal backend compatibility or production readiness.

## Evidence checklist

- [x] First in-period extension commit SHA is recorded above.
- [x] Technical-hardening baseline commit SHA is recorded above.
- [x] Final submission/evidence commit SHA is recorded after the fresh artifact, manifest, and gates are complete.
- [x] GitHub Pages is enabled; build/deploy succeeded and the live URL was verified anonymously and with real Chrome.
- [x] GPT-5.6 Sol and Ultra are visible in the recorded Codex run.
- [x] Fresh School SaaS target is generated from the prepared task.
- [x] Validator returns PASS.
- [x] Human review is completed and the manifest is recorded.
- [x] Completion gates return their real results: unit 20/20, privacy 8/8, browser 16/16, PocketBase PASS, and three config validations PASS.
- [ ] `/feedback` Session ID is placed only in Devpost.
- [x] Public YouTube video is verified signed out at `https://www.youtube.com/watch?v=vGYXv_pltRE`, with English audio and a 2:38 runtime.

## Judge evaluation boundary

Bundled sample configs demonstrate the product and are clearly labeled synthetic. The final generated target and manifest demonstrate the in-period Codex/GPT-5.6 workflow. Judges should evaluate only the public, reproducible evidence in this repository.
