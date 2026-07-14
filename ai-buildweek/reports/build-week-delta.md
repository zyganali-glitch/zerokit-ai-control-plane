# Build Week Delta

## Submitted project

ZeroKit AI Control Plane is a standalone public Build Week judging edition. Judges should evaluate this public repository: its Codex/GPT-5.6 workflow, privacy preflight, generated-config evidence path, validator, browser preview, adapter proof, tests, documentation, and demo surface.

## Prior private context

The project direction draws on the author's prior private SaaS-control-plane research and a separate private commercial codebase. That private codebase is not included, exposed, required for judging, or claimed as part of this entry.

The public repository also had an initial foundation before the official Submission Period. Git records show that foundation ending at commit `74605f7` on **2026-07-13 16:42:28 UTC+03:00**. The official Submission Period began on **2026-07-13 09:00 PDT**, which was **19:00 UTC+03:00**. This timing is disclosed so judges can distinguish prior public context from in-period work.

## New public Build Week work

The final in-period extension begins on 2026-07-14 and is intentionally more than a documentation pass. It includes:

- a GitHub Pages deployment workflow and no-rebuild judge path;
- project-subpath-safe browser routing and sample loading for `github.io/zerokit-ai-control-plane/`;
- automated tests that prove those Pages URL rules;
- a new visible evidence chain in the product UI: local preflight, GPT-5.6/Codex generation, and deterministic gates;
- a visible boundary between bundled synthetic examples and final competition evidence;
- official-rules-aligned English audio/voiceover, Devpost, `/feedback`, Pages, and judge guidance;
- the final fresh GPT-5.6 Codex generation, review, manifest, video, and Session ID steps documented below as operator evidence gates.

The commit SHA for this in-period extension must be inserted here after the final commit: `PENDING_FINAL_IN_PERIOD_COMMIT`.

## Codex/GPT-5.6 contribution

Codex is the development environment and GPT-5.6 is the reasoning model used to extend and polish the submitted project. In the product workflow, GPT-5.6 also turns a bounded synthetic SaaS brief into a reviewable config while deterministic local code validates the result. Meaningful use is evidenced by the visible model selection, the primary Codex session, in-period commits, a fresh generated target, validator PASS, human review, and hash manifest.

Model selection is operator-confirmed from the visible Codex UI. The repository does not claim that a local script cryptographically verifies the selected model.

## What is intentionally excluded

- the separate private commercial codebase;
- production customer records, credentials, logs, invoices, student or health records, and private messages;
- any OpenAI or third-party model API, key, or runtime dependency;
- claims of universal backend compatibility or production readiness.

## Evidence checklist

- [ ] Final in-period commit SHA replaces the placeholder above.
- [ ] GitHub Pages is enabled and the anonymous live URL is verified.
- [ ] GPT-5.6 Sol and the selected reasoning level are visible in Codex.
- [ ] Fresh School SaaS target is generated from the prepared task.
- [ ] Validator returns PASS.
- [ ] Human review is completed and the manifest is recorded.
- [ ] Completion gates return their real results.
- [ ] `/feedback` Session ID is placed only in Devpost.
- [ ] Public YouTube video is under three minutes with English audio.

## Judge evaluation boundary

Bundled sample configs demonstrate the product and are clearly labeled synthetic. The final generated target and manifest demonstrate the in-period Codex/GPT-5.6 workflow. Judges should evaluate only public, reproducible evidence and should not infer capabilities from the separate private codebase.
