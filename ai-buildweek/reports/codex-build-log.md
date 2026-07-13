# Codex build and validation log

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
$ npm install
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
tests 8
pass 8
fail 0
PASS
```

Covered: enabled/hidden panel projection, role/permission projection, warning/privacy preservation, allowlisted URL start options, three complete scenario validations, aggregated malformed-config errors, and absolute endpoint strategy warning.

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

The generated report is intentionally ignored because it includes a local source path and timestamp; judges reproduce it with the exact command above.

## Browser evidence

```text
$ npm run test:browser
PASS Browser smoke: 16/16 assertions.
```

The self-contained, dependency-free Chrome DevTools runner starts the local preview when needed, then verified a real 375×812 viewport with the TR/light/healthcare state: 8 enabled panels, 2 hidden panels, 4 roles, 8 endpoints, 375px scroll width, no horizontal overflow, all buttons at least 44px high, zero raw i18n keys, three privacy notes, visible invalid-JSON failure, first-focus skip link, skip-link activation to the config input, zero external HTTP requests, and zero runtime exceptions. The screenshot was visually reviewed; a mobile privacy-banner wrap issue found during the first pass was fixed and the full smoke reran PASS.

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
| Unit/related tests | PASS | 18/18 current suite (8/8 original selected-surface baseline) |
| Config validation | PASS | 3/3 scenarios |
| Report generation | PASS | School report generated |
| Browser smoke | PASS | 16/16 CDP assertions + visual screenshot review |
| Privacy boundary | PASS | Same-origin bundled requests only; zero external requests/telemetry |
| Dependency reproducibility | PASS | Lockfile + Node-only scripts + 0 vulnerabilities |
| Billing continuity | PASS | No billing activation or pricing/entitlement runtime added |
| Donor admin impact | PASS | Isolated page; donor runtime not changed |

## Final repository audit

- Required file matrix: PASS, 22/22 required paths present.
- JSON parse: PASS, 6/6 JSON files.
- Markdown local links: PASS, no broken local targets.
- Secret signatures: PASS, no GitHub/OpenAI/AWS token or private-key signature found.
- Runtime network audit: PASS, preview fetches only allowlisted bundled examples; browser smoke observed zero external HTTP requests.
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

The public config validator intentionally checks the judging contract’s required sections and basic types without adding a JSON Schema runtime package. Backend payload compatibility still requires per-customer adapter tests; a structural config PASS does not prove backend integration.

## Jury/claim hardening rerun — 2026-07-13

The official OpenAI Build Week criteria and current GPT-5.6 model documentation were rechecked. The audit found that the selected surface was runnable but its GPT-5.6 claim relied on prompts and checked-in examples rather than an executable, provenance-producing model path.

Implemented controls:

- Responses API generation using the official `gpt-5.6` alias, medium reasoning, JSON output mode, and `store: false`;
- local pre-send privacy guard with blocking and human-review findings;
- validation-before-write and overwrite refusal;
- secret-free evidence manifest design with model/response identifiers, usage, hashes, and validation statistics;
- raw API error-body suppression;
- executable PocketBase `items/totalItems` to ZeroKit `users/total` adapter proof.

Clean rerun:

```text
npm ci                         PASS, 0 vulnerabilities
npm run build                  PASS
npm run test:unit              PASS, 18/18
npm run test:privacy           PASS, 8/8 focused
npm run ai:generate -- ... --dry-run
                               PASS, gpt-5.6, store:false, 0 blockers, no network
npm run demo:pocketbase        PASS, 2 items -> 2 users
three config validations       PASS, 3/3
npm run test:browser           PASS, 16/16
```

A real sanitized school-scenario request reached the OpenAI Responses API, but inference was rejected with HTTP 429 `insufficient_quota`. The script wrote no config or manifest. This remains a truthful P0 submission blocker: restore API quota, run the documented command, human-review the output, rerun gates, then commit the generated config and manifest before recording.
