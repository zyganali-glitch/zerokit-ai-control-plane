# OpenAI Build Week judging and claim audit

- Audit date: 2026-07-14
- Scope: public `zerokit-ai-control-plane` repository
- Review perspective: senior product engineer and proxy Build Week judge
- Note: the scores below are evidence-based estimates, not official OpenAI scores.

## Judging basis

The [OpenAI Build Week page](https://openai.com/build-week/) describes technical implementation, design and user experience, potential impact, and idea quality as the judging dimensions. Strong submissions should use GPT-5.6 and Codex thoughtfully and explain a clear problem–solution–approach chain.

The [Devpost competition page](https://openai.devpost.com/) makes the dimensions more concrete:

- **Technical implementation:** Is GPT-5.6 used deeply and skillfully, and does the code demonstrate substantial working software?
- **Design:** Is there a coherent runnable product experience rather than only a technical concept?
- **Potential impact:** Does the project address a credible problem for a real audience?
- **Idea quality:** Does GPT-5.6 create non-obvious value, and does the team understand the problem domain?

## Executive judge verdict

**The repository supports this narrow, honest claim:** “A privacy-controlled developer workflow that uses GPT-5.6 selected in the Codex app to turn sanitized SaaS requirements into a locally validated control-plane config plus adapter and test evidence.”

**The repository does not support this broad claim:** “A production-ready AI control plane that automatically connects to every backend.” That wording should not be used.

Not using a model API is not a product weakness. Codex is the architecture work surface; local scripts provide privacy preflight, task boundaries, deterministic validation, and evidence. The key limitation is explicit: a local script cannot read the model selected in the Codex UI. GPT-5.6 evidence therefore consists of the visible model selection in the video plus an operator-confirmed manifest. No cryptographic model proof is claimed.

OpenAI's [GPT-5.6 announcement](https://openai.com/index/gpt-5-6/) describes GPT-5.6 availability in Codex and selectable model/reasoning options for eligible accounts. The operator must verify the visible choice in their own account before recording.

## Proxy scorecard

| Judging dimension | Current score | Why it is not higher |
| --- | ---: | --- |
| Technical implementation | 8.3/10 conditional | The bounded task, privacy guard, strict gate, manifest, preview, adapter, Pages portability tests, and deploy workflow are implemented; final operator evidence remains. |
| Design / UX | 8.2/10 conditional | The bilingual responsive preview and visible evidence chain are coherent; prepare → Codex → preview still spans two applications. |
| Potential impact | 7.7/10 | SaaS customization is a credible problem demonstrated across three sectors; there is no customer interview, timing study, or pilot evidence. |
| Idea quality | 8.5/10 | Positioning GPT-5.6 as a config/contract/test co-designer rather than a chatbot is distinctive and privacy-aware. |
| **Equal-weight proxy total** | **8.1/10 conditional** | Pages is verified; the remaining conditions are the visible GPT-5.6 run, English-audio video, and private Session ID. |

## Claim-by-claim result

| Claim | Result | Evidence | Boundary |
| --- | --- | --- | --- |
| GPT-5.6/Codex is central | **Code path ready; final operator evidence pending** | Four prompts, task generator, model-selection attestation, output validator | The video must show GPT-5.6 Sol as the model, the chosen reasoning level, and the manifest from that run. |
| Generates config from sanitized requirements | **Ready** | School input, prepared task, target path, validation command | Do not present the checked-in baseline config as a fresh Codex run; write new output to the evidence path. |
| Privacy-controlled AI workflow | **Supported as a workflow control** | Local guard, `.env`/secret denylist, synthetic fixtures, zero third-party/model preview requests | Pattern matching cannot guarantee complete sanitization; human review is mandatory. |
| Production data stays outside the model | **True for the repository and supported workflow** | Checked-in inputs are synthetic; task rules prohibit private sources | A developer could bypass process rules; operational discipline is still required. |
| Backend adapter compatibility | **Proved at one concrete boundary** | PocketBase `items/totalItems` → ZeroKit `users/total`, fail-closed tests | See the [adapter matrix](adapter-compatibility-matrix.md); this does not prove every PocketBase collection or arbitrary backend is compatible. |
| Judging-contract validation | **Supported with two explicit gates** | Browser structural review, strict CLI/manifest gate, JSON Schema reference, three scenarios | See [validator coverage](validator-coverage.md); the validator is not a complete JSON Schema 2020-12 engine. |
| Working product | **Working judging preview** | Build, local preview, safe apply, report, browser smoke | It is not the full production control plane or private donor product. |
| Zero dependency | **False if unqualified** | Node/npm and a browser are prerequisites | “Zero frontend runtime npm dependencies” is accurate. |

## Final evidence snapshot

| Command | Final recorded result |
| --- | --- |
| `npm run test:unit` | PASS, 20/20 |
| `npm run test:privacy` | PASS, 8/8 |
| `npm run test:browser` | PASS, 16/16 |
| `npm run demo:pocketbase` | PASS, 2 synthetic items → 2 users |
| Three required config validations | PASS, 3/3 |

The browser preview performs the fast structural gate. The CLI and manifest path enforce the stricter generated-artifact requirements; neither gate proves backend payload compatibility or business correctness.

## Implemented recommendations

1. Removed the model API, API key, quota, and Responses API execution path.
2. Added `codex:prepare` to create a reproducible Codex task after local privacy checks.
3. Connected visible GPT-5.6 selection, task execution, and the target JSON path in one operator workflow.
4. Added `codex:record` to store file hashes and validation statistics after human review.
5. Explicitly labels model selection as operator-confirmed and not cryptographically verified.
6. Added root `AGENTS.md` rules that prohibit private inputs and require completion gates.
7. Made judge-facing documentation English-first while preserving the Turkish beginner recording guide.
8. Prepared a runnable synthetic School SaaS task package.

## Is the synthetic School SaaS ready?

**Yes, the product/demo scenario is ready.** It includes:

- sanitized school requirements;
- a baseline config with panels, RBAC, fields, endpoints, branding, privacy notes, and a test checklist;
- a browser preview that loads the school config;
- synthetic user, role, plan, invoice, notification, help, audit, and aggregate-report surfaces;
- an explicit negative decision that keeps team billing disabled;
- a synthetic PocketBase user envelope and working adapter;
- a prepared `school-saas.codex-task.md` task;
- local config, unit, privacy, browser, and adapter tests.

One competition artifact is still manual: the operator must visibly select **GPT-5.6 Sol**, show the actual selected mode and effort, run the prepared task, review the fresh output, record its manifest, and capture those steps in the video. For this single bounded task, Max is preferred when available; Ultra is a parallel subagent mode, not a reasoning level. A mode or effort label alone is not proof of the model. This is a controlled recording-day step, not a missing code feature.

## Pre-submission P0 steps

1. Open this repository as a project in the Codex app.
2. Select **GPT-5.6 Sol**, choose the actual single-task mode/effort available to the account, and make the model plus those real labels visible in the recording.
3. Start a new task and paste:

   ```text
   Follow AGENTS.md. Read ai-buildweek/runs/school-saas.codex-task.md and complete the task. Use only the synthetic files allowed by that task. Run the required validator, fix every failure, and report the final result and assumptions.
   ```

4. Review `ai-buildweek/evidence/school-saas.gpt-5.6.codex.config.json` manually.
5. After validator PASS, run the manifest command.
6. Show the model picker, prepared task, generated target, validator PASS, and manifest hash in the English-audio video.

## Recommendations that could strengthen placement

- Keep the verified GitHub Pages URL in README/Devpost and recheck it before final submission.
- Use simple English voiceover or English text-to-speech. Overlay captions are intentionally omitted because the official requirements call for explanatory audio, not captions, and the product evidence should remain unobstructed.
- Do not show the private donor admin panel as competition evidence. Show the reproducible public preview.
- Measure manual first-draft time against Codex-assisted first-draft time as one internal experiment; do not generalize it into an unsupported productivity claim.
- Keep PocketBase evidence to roughly 10–15 seconds so the main story remains GPT-5.6/Codex and ZeroKit.
- After submission, consider merging input → preflight → Codex task → validation → preview into one interface.

## One-sentence judge pitch

> ZeroKit uses GPT-5.6 selected in the Codex app to turn sanitized SaaS requirements into a locally validated control-plane contract plus adapter and test evidence, while customer records and runtime authorization remain outside the model boundary.

This sentence is consistent with the current implementation and limitations.

Turkish reference: [jury-claim-audit.tr.md](jury-claim-audit.tr.md)
