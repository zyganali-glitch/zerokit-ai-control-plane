# Codex build and validation log

> Historical snapshot from 2026-07-13. The current 2026-07-14 suite is 20/20 after GitHub Pages subpath tests were added; see README and the final submission-readiness report for current evidence.

- Date: 2026-07-13
- Environment: Windows PowerShell, Node.js v24.13.1
- Scope: public Build Week judging edition only
- Data policy: synthetic examples and donor contract metadata; no secrets or production customer data

## Donor audit

Read-only inspection covered the donor `README.md`, root and `.codex` agent instructions, Copilot instructions, active deep-audit plan, config/schema/brand contract, schema adapter, API mapper, app bootstrap, navigation consumer, OpenAPI, adapter guide, package/requirements, unit tests, and E2E config tests.

Key claim findings:

- Donor README used unqualified “zero dependencies”, broad “57+ production-ready panels”, commercial pricing, and commercial license wording.
- The accurate dependency statement for the public edition is “zero frontend runtime npm dependencies”.
- The donor deep-audit plan is `IN_PROGRESS` and records open i18n, UI parity, fallback, schema-depth, manual, and claim-parity work; full donor completion is not claimed here.
- The public edition therefore uses an isolated judging path and a clean Git history rather than copying donor history or presenting the private product as public.

## Automated commands

### Dependency install

```text
$ npm ci
up to date, audited 1 package
found 0 vulnerabilities
PASS
```

### Build

```text
$ npm run build
PASS Built static judging demo in dist/.
```

### Unit tests

```text
$ npm run test:unit
tests 18
pass 18
fail 0
PASS
```

At the time of this 2026-07-13 snapshot, coverage had grown from the original 8/8 selected-surface baseline to 18/18. The current 2026-07-14 suite is 20/20; the historical command output above is preserved rather than rewritten.

### Focused privacy tests

```text
$ npm run test:privacy
tests 8
pass 8
fail 0
PASS
```

### Required config validations

```text
$ node ai-buildweek/scripts/validate-config.mjs ai-buildweek/examples/school-saas.generated.config.json
PASS — panels 9, roles 5, field groups 5, endpoints 8

$ node ai-buildweek/scripts/validate-config.mjs ai-buildweek/examples/healthcare-saas.generated.config.json
PASS — panels 10, roles 4, field groups 5, endpoints 8

$ node ai-buildweek/scripts/validate-config.mjs ai-buildweek/examples/agency-saas.generated.config.json
PASS — panels 8, roles 4, field groups 7, endpoints 7
```

### Demo report

```text
$ node ai-buildweek/scripts/generate-demo-report.mjs ai-buildweek/examples/school-saas.generated.config.json
PASS Wrote ai-buildweek/reports/generated-demo-report.md
```

The generated report is intentionally ignored because it includes a generation timestamp. Its source path is stored relative to the repository so a report does not persist the operator's local Windows user path. Judges reproduce it with the exact command above.

## Browser evidence

```text
$ npm run test:browser
PASS Browser smoke: 16/16 assertions.
```

The self-contained, dependency-free Chrome DevTools runner starts the local preview when needed, then verified a real 375×812 viewport with the TR/light/healthcare state: 8 enabled panels, 2 hidden panels, 4 roles, 8 endpoints, 375px scroll width, no horizontal overflow, all buttons at least 44px high, zero raw i18n keys, three privacy notes, visible invalid-JSON failure, first-focus skip link, skip-link activation to the config input, zero third-party or model requests, and zero runtime exceptions. The screenshot was visually reviewed; a mobile privacy-banner wrap issue found during the first pass was fixed and the full smoke reran PASS.

Playwright is not configured in this selected static judging edition, so `npm run test:e2e:chromium` is not available or needed for this isolated surface. Judges can run `npm run test:browser`; set `CHROME_PATH` if Chrome/Edge is outside a standard location.

## Safe apply evidence

```text
$ node ai-buildweek/scripts/apply-demo-config.mjs ai-buildweek/examples/school-saas.generated.config.json
PASS Applied validated demo config to ai-buildweek/demo-config/school-saas.generated.config.json

$ node ai-buildweek/scripts/apply-demo-config.mjs ai-buildweek/examples/school-saas.generated.config.json
BACKUP ...school-saas.generated.config.json.<timestamp>.bak
PASS Applied validated demo config...
```

The repeated run proves that an existing demo target is backed up before replacement. The demo directory and generated backup are intentionally ignored.

## Gate snapshot

| Gate | Result | Evidence |
| --- | --- | --- |
| Build | PASS | Static output generated |
| Unit/related tests | PASS | 18/18 in this historical snapshot; current suite is 20/20 |
| Config validation | PASS | 3/3 scenarios |
| Report generation | PASS | School report generated |
| Browser smoke | PASS | 16/16 CDP assertions + visual screenshot review |
| Privacy boundary | PASS | Same-origin bundled requests only; zero third-party/model requests or telemetry |
| Dependency reproducibility | PASS | Lockfile + Node-only scripts + 0 vulnerabilities |
| Billing continuity | PASS | No billing activation or pricing/entitlement runtime added |
| Donor admin impact | PASS | Isolated page; donor runtime not changed |

## Final repository audit

- Required file matrix: PASS, 22/22 required paths present.
- JSON parse: PASS, 6/6 JSON files.
- Markdown local links: PASS, no broken local targets.
- Secret signatures: PASS, no GitHub/OpenAI/AWS token or private-key signature found.
- Runtime network audit: PASS, preview fetches only allowlisted same-origin bundled examples; browser smoke observed zero third-party or model requests.
- Apply self-target guard: PASS, source=target exits 1 without mutation.
- Donor isolation: PASS, `../zerokit` remains clean on `master...origin/master`.
- Claim audit: PASS, donor overclaims/pricing are discussed only as audit findings; public README uses scoped evidence.

## Publication

- Remote: `https://github.com/zyganali-glitch/zerokit-ai-control-plane.git`
- Branch: `main`
- Method: native Git push through the existing GridMedic Git Credential Manager session.
- Result: PASS, the previously empty remote received the complete public judging edition.
- Pull request: not applicable for the initial empty-repository publication; `main` was established directly at the user’s request.

## Current risk

The browser preview intentionally performs dependency-free structural checks, while the CLI and manifest path add strict generated-artifact requirements. Neither is a complete JSON Schema 2020-12 engine. See [validator coverage and limits](validator-coverage.md). Backend payload compatibility still requires per-customer fixtures and adapter tests; see the [adapter compatibility matrix](adapter-compatibility-matrix.md).

## Codex app workflow transition — 2026-07-13

At the operator's request, the execution path requiring a model API, API key, and API quota was removed. Current OpenAI documentation confirmed GPT-5.6 availability in the Codex app, and the competition workflow moved to that product surface.

Added controls:

- a local privacy guard before model use;
- a reproducible Codex task package with explicit allowed files and target;
- root `AGENTS.md` rules denying `.env`, secrets, production records, private donor files, and private files outside the repository;
- version, brand, registry, privacy-note, and test-checklist validation for generated artifacts;
- refusal to create a manifest without human review and visible-model confirmation;
- explicit “operator-confirmed, not cryptographically verified” model evidence;
- SHA-256 hashes instead of input/task/output contents;
- PocketBase `items/totalItems` → ZeroKit `users/total` adapter evidence.

Clean verification:

```text
npm ci                         PASS, 0 vulnerability
npm run build                  PASS
npm run test:unit              PASS, 18/18 (historical 2026-07-13 snapshot; current 20/20)
npm run test:privacy           PASS, 8/8
npm run codex:prepare -- school input --force
                               PASS, 0 blocker, 0 review finding
school task/input sync         PASS
npm run demo:pocketbase        PASS, 2 items -> 2 users
three config validations       PASS, 3/3
npm run test:browser           PASS, 16/16
```

## Final polish verification — 2026-07-14

The complete submission gate was rerun on Windows with Node.js v24.13.1 after the strict generated-artifact validator, evidence-map UI, status-preservation fix, Node 22 baseline, and Pages workflow hardening were applied.

| Command | Result |
| --- | --- |
| `npm ci` | PASS; 1 package audited, 0 vulnerabilities |
| `npm run codex:prepare -- ai-buildweek/examples/school-saas.input.md --force` | PASS; 0 blockers, 0 review findings, task/input synchronized |
| `npm run build` | PASS |
| `npm run test:unit` | PASS, 20/20 |
| `npm run test:privacy` | PASS, 8/8 |
| `npm run demo:pocketbase` | PASS, 2 synthetic items → 2 users |
| `npm run test:browser` | PASS, 16/16 |
| Strict School/Healthcare/Agency validations | PASS, 3/3 |

The browser run also proved nine neutral evidence points, preserved PASS across theme and language changes, no 375 px horizontal overflow, no short controls, no third-party requests, and no runtime exceptions. The Pages workflow now runs unit, privacy, PocketBase, all three strict config validations, build, and the real-browser smoke before deployment.

The final competition artifact is an operator step: visibly select GPT-5.6 Sol, show the actual selected mode and effort in the Codex app, run the prepared school task, review the output, and record the manifest. For this single bounded task, Max is preferred when available; Ultra is a parallel subagent mode, not a reasoning level. A mode or effort label alone is not model evidence. The local script cannot read the in-app model, so no cryptographic model verification is claimed.
