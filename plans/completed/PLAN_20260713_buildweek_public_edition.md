# ZeroKit AI Control Plane — Build Week Public Edition Plan

- Status: COMPLETE
- Date: 2026-07-13
- Mode: KOD-DEGISIKLIGI
- Owner: main agent (single writer)
- Source boundary: only this standalone repository may be modified or published.

## Outcome and claim lock

Deliver a runnable, privacy-preserving GPT-5.6/Codex config-architecture demo with three schema-compatible scenarios, local validation/report tooling, bilingual preview UI, honest evidence, and no production data.

Allowed claims: working Build Week edition, config-driven foundation, zero frontend runtime npm dependencies, validated sample configs, developer-side privacy boundary. Disallowed claims: production readiness, universal backend compatibility, zero total dependencies, no bugs, or enterprise readiness.

## Request compilation

| ID | Request | Acceptance evidence | Status |
| --- | --- | --- | --- |
| R1 | Public competition positioning and README | README contains positioning, privacy, quick start, evidence, scope, license | COMPLETE |
| R2 | Four GPT-5.6/Codex workflows | Four complete prompt files under `ai-buildweek/prompts` | COMPLETE |
| R3 | Three generated scenarios | Inputs and JSON configs for school, healthcare, agency; all validate | COMPLETE |
| R4 | Validation, safe apply, report scripts | CLI PASS/FAIL, backup-safe demo apply, generated markdown report | COMPLETE |
| R5 | Runnable judging preview | Local-only TR/EN, light/dark/mobile preview with warnings and privacy reminder | COMPLETE |
| R6 | Reports and demo package | Adapter, privacy, judging, build log, 3-minute script, screenshot guide | COMPLETE |
| R7 | Evidence and publication | npm/build/unit/config checks recorded; repository published through approved native Git fallback | COMPLETE |

## Allowlist / denylist

Allowlist: repository root public metadata; `ai-buildweek/**`; isolated `frontend/pages/**`, `frontend/js/**`, `frontend/styles/**`; `scripts/**`; `tests/**`; this plan.

Denylist: files outside this repository, auth or billing activation, telemetry, external runtime calls, secrets/customer records, database schema changes, destructive Git commands, and unrelated product surfaces.

## Phase plan and backlog

| Phase | Result | Depends on | Status |
| --- | --- | --- | --- |
| P1 Audit and contract extraction | Public-safe schema, config consumers, API contracts, and tests audited | none | COMPLETE |
| P2 Core package | Prompts, examples, scripts, preview, unit tests implemented | P1 | COMPLETE |
| P3 Documentation and evidence | README/reports/demo/evidence complete | P2 | COMPLETE |
| P4 Verification and closure | Reproducible checks pass; plan archived after publication | P3 | COMPLETE |
| P5 Publication | Commit and direct initial push to `main` | P4 and Git Credential Manager | COMPLETE |

Discovered work must be added here; required failures cannot be deferred as “later”. Browser work found and closed two issues: query parameters were lost by root redirect, and mobile top controls/privacy copy needed wrapping. GitHub CLI was not on PATH, so P5 used the documented native Git fallback and completed successfully.

## Modular design

| Surface | Module boundary | Reason |
| --- | --- | --- |
| Config rules | `frontend/js/config-validator.js` | One pure validator shared by browser, CLI, and tests |
| Preview projection | `frontend/js/config-preview-model.js` | Deterministic UI/report summaries without DOM coupling |
| Preview interaction | `frontend/js/ai-config-preview.js` | Local-only DOM and i18n behavior |
| CLI tools | `ai-buildweek/scripts/*.mjs` | Minimal Node entry points with no runtime packages |
| Static delivery | `scripts/build.mjs`, `scripts/dev-server.mjs` | Reproducible build and local server using Node built-ins |

## Role matrix and multi-role review stack

| Role | Responsibility | Write authority | Required proof / fallback |
| --- | --- | --- | --- |
| Main agent | Plan, implementation, claim lock, closure | Entire allowlist | Single writer |
| Live bug hunter | Runtime and responsive review | Read-only | Sequential review (no subagent requested) |
| Plan challenger | Scope, evidence, integrity audit | Read-only | Sequential cross-table audit |
| Test verifier | Independent command/gate verification | Read-only | Sequential clean reruns |
| Office worker / child | Simple flow and copy | Review | Obvious paste → validate → summary path |
| Professor / field analyst | Contract accuracy and practical adapter usefulness | Review | Explicit payload-shape and risk evidence |
| Researcher / aesthetic advisor | Guidance and professional presentation | Review | Actionable docs and coherent visual hierarchy |
| Senior engineer / accessibility advocate | Modularity, safety, keyboard, contrast, mobile | Review | Unit/build/manual browser evidence |

Fallback-to-sequential is active because the user did not request subagents and repository policy keeps a single writer.

## Gates

| Gate | Required evidence | Status |
| --- | --- | --- |
| Smoke / Binding | Preview serves, sample loads, validator and report scripts bind shared logic | PASS: browser + build + report + apply |
| Selftest / Related tests | Node unit tests plus three CLI validations | PASS: 8/8 unit; 3/3 configs; browser 16/16 |
| Parity | Examples follow the documented JSON shapes and route-flexible/payload-strict contract | PASS: required sections/types and documented registries |
| No-UI-Regression / I18N | TR+EN, keyboard, dark/light, 375px and desktop manual checks | PASS: 375×812 TR/light + EN/dark school smoke; raw keys 0 |
| Dependency-Reproducibility | Lockfile, clean `npm install`, build/test commands | PASS: npm install, 0 vulnerabilities, build PASS |
| Multi-Role Review | All eight review lenses recorded in judging/build evidence | PASS: judging notes + browser/adapter evidence |
| Integrity-Lock | Header, phases, requests, task table, risks, gates, handoff agree | PASS: publication blocker synchronized |
| Billing Continuity | Demo adds no billing activation, pricing engine, quota, or entitlement mutation | PASS |
| Admin Panel Impact | Isolated browser-only preview; no production runtime is modified | PASS |
| Release / NFR | No secrets, telemetry, external runtime dependency, broken promise, or unresolved required failure | PASS: required files/JSON/links/secrets/claims audit |

Stats, widget-param, widget-guidance, surface-continuity, new-card, and narrative gates are scoped out: this edition adds no analytics engine, widget, or export surface. The preview summary cards are read-only configuration projections and receive dedicated model/unit/UI checks.

## Live task table

| Phase | Step | Description | Status | Parent | Agent | Start | Finish | Parity | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P1 | 1.1 | Read repository instructions and required source/test files | COMPLETE | P1 | main | 2026-07-13 | 2026-07-13 | PASS | Repository boundary preserved |
| P1 | 1.2 | Reframe claims and isolate public scope | COMPLETE | P1 | main | 2026-07-13 | 2026-07-13 | PASS | Broad completion claims excluded |
| P2 | 2.1 | Implement shared validation/report model and CLIs | COMPLETE | P2 | main | 2026-07-13 | 2026-07-13 | PASS | Report generation PASS |
| P2 | 2.2 | Implement examples, prompts, and bilingual preview | COMPLETE | P2 | main | 2026-07-13 | 2026-07-13 | PASS | 7/7 unit; 3/3 CLI validation; build PASS |
| P3 | 3.1 | Complete README, reports, demo docs, evidence | COMPLETE | P3 | main | 2026-07-13 | 2026-07-13 | PASS | Required public package complete |
| P4 | 4.1 | Run checks, manual review, and final integrity audit | COMPLETE | P4 | main | 2026-07-13 | 2026-07-13 | PASS | Required files 22/22; JSON 6/6; links/secrets/claims PASS |
| P5 | 5.1 | Publish clean initial repository to `main` | COMPLETE | P5 | main | 2026-07-13 | 2026-07-13 | PASS | `main` pushed to `zyganali-glitch/zerokit-ai-control-plane` through GCM 2.6.1 |

## Risks

| Risk | Control | State |
| --- | --- | --- |
| Private or unrelated code/history leakage | Clean Git history; standalone judging surface; repository boundary | CONTROLLED |
| AI privacy overclaim | Explicit input denylist, synthetic examples, local preview, human review | CONTROLLED |
| Schema/consumer mismatch | Shared validator plus documented schema-shaped examples and tests | CONTROLLED: 3/3 config + 8/8 unit + 16/16 browser proof |
| GitHub publication blocked | Native Git + the operator's existing Git Credential Manager session; initial empty repo does not require PR | CONTROLLED |

## Handoff / checkpoint

Closure complete: public judging edition pushed to `https://github.com/zyganali-glitch/zerokit-ai-control-plane` on `main`. Evidence: Node 24.13.1; npm install PASS/0 vulnerabilities; build PASS; unit 8/8; self-contained browser 16/16 at 375×812 with server cleanup; config validation 3/3; report generation PASS; safe apply + backup PASS; required files 22/22; JSON 6/6; Markdown links/secrets/claims/repository-boundary PASS. Tech-Debt Delta: 0.
