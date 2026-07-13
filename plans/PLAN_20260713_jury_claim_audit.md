# ZeroKit AI Control Plane — Jury and Claim Audit Plan

- Status: IN_PROGRESS
- Date: 2026-07-13
- Owner: main agent (single writer)
- Publication target: `origin/main`

## Outcome and claim lock

Compare the public repository against the official OpenAI Build Week criteria, close material evidence gaps, prove the GPT-5.6 workflow without exposing production data or secrets, publish verified changes, and provide a record-ready demo video plan.

Allowed claims: GPT-5.6 Responses API workflow with `store: false`; automated preflight privacy guard; locally validated generated artifacts; synthetic scenarios; browser-only preview; zero frontend runtime npm dependencies. Disallowed claims: arbitrary backend compatibility, production readiness, zero total dependencies, prevention of every possible sensitive-data leak, or completion of the private donor product.

## Request compilation

| ID | Request | Acceptance evidence | Status |
| --- | --- | --- | --- |
| R1 | Compare competition, repository, and product claim | Official four-part rubric mapped to evidence and gaps | COMPLETE |
| R2 | Decide whether code meets the claim | Claim-by-claim verdict with honest limitations | COMPLETE |
| R3 | Fix material findings directly | Executable GPT-5.6 path, privacy guard, provenance, tests, docs | COMPLETE |
| R4 | Push completed work to GitHub | Clean commit and verified `origin/main` push | IN_PROGRESS |
| R5 | Provide detailed demo video roadmap | Primary scenario, open-source option, timing, setup, recovery, shots | COMPLETE |

## Allowlist / denylist

Allowlist: `README.md`, `package*.json`, `ai-buildweek/**`, `tests/**`, `.gitignore`, this plan. Existing frontend/build modules may be read and tested; modify only if a discovered required defect demands it.

Denylist: private donor writes, production/customer data, secret persistence or logging, paid calls without an explicit user-run command, telemetry, auth/billing activation, dependency churn, destructive Git commands, fabricated API evidence.

## Phases and gates

| Phase | Result | Status |
| --- | --- | --- |
| P1 Official rubric and repository audit | Competition/model facts and claim gaps evidenced | COMPLETE |
| P2 Evidence-path implementation | API runner, privacy guard, manifest, automated tests | COMPLETE |
| P3 Judge and demo package | Scorecard, claim matrix, PocketBase-aware recording roadmap | COMPLETE |
| P4 Verification | Build, unit, privacy, browser, config, secret/link audits pass | COMPLETE |
| P5 Publication | Intentional commit and direct push requested by user | IN_PROGRESS |

Required gates: dry-run must make no network call; sensitive fixture must fail closed; API key must never be written or printed; generated output must pass the shared validator before write; manifest must contain hashes/usage rather than prompt contents; existing build/unit/browser/config checks must remain green; Git worktree must be reviewed before commit.

## Risks

| Risk | Control | State |
| --- | --- | --- |
| Static-demo perception | Runnable GPT-5.6 Responses API path and provenance manifest | CONTROLLED; live manifest awaits funded quota |
| Sensitive input reaches model | Blocking local preflight plus explicit human-review boundary | CONTROLLED |
| API-cost surprise | Dry-run default in documentation; live call is an explicit command | CONTROLLED |
| Backend compatibility overclaim | Synthetic report remains explicit; PocketBase shown only as adapter proof | CONTROLLED |
| Publication failure | Existing native Git/GCM GridMedic path; verify remote SHA | PENDING |

## Handoff checkpoint

Ready for publication: official rubric/model facts verified; build PASS; unit 18/18; focused privacy/API 8/8; browser 16/16; config 3/3; PocketBase proof PASS; dry-run preflight PASS; JSON/syntax/links/secrets/diff checks PASS. A real API request was rejected before inference with `429 insufficient_quota`, so no output or false manifest was written. Live evidence remains a P0 submission action after quota restoration, not an unreported code PASS.
