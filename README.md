# ZeroKit AI Control Plane — GPT-5.6/Codex SaaS Architect

> Generate a privacy-preserving SaaS control-plane config, RBAC model, endpoint map, and adapter report with Codex + GPT-5.6.

This Build Week edition is a public competition adaptation of a private commercial ZeroKit codebase. The private donor product remains separate; this repository contains the selected and hardened judging/demo surface, GPT-5.6/Codex workflows, synthetic sample configs, local validation tools, and a runnable privacy-preserving control-plane preview.

## The problem

SaaS teams repeatedly rebuild the same administration infrastructure: roles, permissions, navigation, billing surfaces, configurable fields, backend routes, and release gates. A boilerplate may accelerate day one, but customer-specific edits quickly become scattered code and technical debt. One school, clinic, or agency can require a completely different role model, panel set, currency, table shape, and backend contract.

## The solution

ZeroKit treats these choices as a configuration socket:

- `panel_registry` controls enabled/visible panels, order, and navigation groups.
- `rbac_registry` defines roles and least-privilege permissions.
- `field_registry` describes fields, dropdowns, and table columns.
- `endpoint_map` maps logical panel keys to customer routes.
- `brand_config` carries non-sensitive product identity and locale choices.

Codex + GPT-5.6 acts as a developer-side architecture and test co-designer. A runnable OpenAI Responses API path turns sanitized requirements and contract metadata into a reviewable config, while deterministic local code blocks high-confidence sensitive inputs and validates the result before it can be written. It is not a chatbot attached to production admin data.

## Architecture

```mermaid
flowchart LR
  A["Developer requirements"] --> P["Local privacy preflight"]
  P -->|"PASS only"| B["Codex + GPT-5.6 / Responses API\nstore: false"]
  B --> C["Generated ZeroKit config + hash manifest"]
  C --> D["Shared local validator"]
  D --> E["Browser-only control-plane preview"]
  D --> F["Markdown demo report"]
  G["Sanitized OpenAPI / contract summary"] --> H["Adapter mapper prompt"]
  C --> H
  H --> I["Compatibility and gap report"]
  I --> J["Human review and test gates"]
  E --> J
```

Route locations are flexible; response payload shapes are not. `endpoint_map` can point a panel at a customer route, but the adapter must still return the documented keys and nesting. This edition reports gaps instead of pretending arbitrary payloads are compatible.

## Privacy boundary

- GPT-5.6 receives only product requirements, synthetic examples, schemas, sample field/endpoint names, and non-sensitive backend contracts.
- A dependency-free local preflight blocks high-confidence secrets, tokens, connection strings, cookies, and non-reserved email addresses before the supported API workflow. UUIDs and production-language markers require human review.
- Responses API generation explicitly requests `store: false`; the evidence manifest stores hashes and usage metadata, not the prompt, requirements, API key, or model reasoning.
- GPT-5.6 does not receive production customer records, real user data, credentials, API keys, invoices, medical records, private messages, or confidential datasets.
- The browser preview validates pasted JSON locally and does not send it to an external service.
- The ZeroKit runtime and customer data remain on the user’s infrastructure.
- Every generated config is validated and manually reviewed before use.

See [privacy-boundary.md](ai-buildweek/reports/privacy-boundary.md) for sanitization and incident rules.

## Quick start

Prerequisite: Node.js 20 or newer.

```bash
npm install
npm run build
npm run test:unit
npm run test:browser
```

Validate all generated scenarios:

```bash
node ai-buildweek/scripts/validate-config.mjs ai-buildweek/examples/school-saas.generated.config.json
node ai-buildweek/scripts/validate-config.mjs ai-buildweek/examples/healthcare-saas.generated.config.json
node ai-buildweek/scripts/validate-config.mjs ai-buildweek/examples/agency-saas.generated.config.json
```

Preflight and run the real GPT-5.6 workflow:

```bash
# No API call; proves the input passes the local privacy preflight.
npm run ai:generate -- ai-buildweek/examples/school-saas.input.md --dry-run

# Requires a funded OPENAI_API_KEY. Output is written only after local validation.
npm run ai:generate -- ai-buildweek/examples/school-saas.input.md ai-buildweek/evidence/school-saas.gpt-5.6.config.json
```

The live command also writes a sibling `.manifest.json` containing the response/model identifiers, `store:false` evidence, token usage, validation statistics, and SHA-256 hashes. It refuses to overwrite an existing output unless `--force` is supplied. Human review remains mandatory because no pattern guard can detect every kind of sensitive or misleading input.

Generate and apply a demo-safe config:

```bash
node ai-buildweek/scripts/generate-demo-report.mjs ai-buildweek/examples/school-saas.generated.config.json
node ai-buildweek/scripts/apply-demo-config.mjs ai-buildweek/examples/school-saas.generated.config.json
npm run dev
```

Open `http://127.0.0.1:4173`. The apply script writes below `ai-buildweek/demo-config/`; it does not overwrite `config/zerokit.config.json` unless an explicit override flag and target are supplied. Existing demo targets receive a timestamped backup.

Run the open-source PocketBase adapter proof:

```bash
npm run demo:pocketbase
```

The checked-in synthetic fixture mirrors PocketBase's documented `items`/`totalItems` list envelope. The fail-closed adapter projects it to ZeroKit's strict `users`/`total` contract without a live database or real records. See [pocketbase-adapter-proof.md](ai-buildweek/reports/pocketbase-adapter-proof.md).

## Three-minute demo flow

1. Choose school, healthcare, or agency as a synthetic SaaS scenario.
2. Run privacy preflight, then the GPT-5.6 Responses API workflow with sanitized requirements.
3. Inspect the secret-free hash manifest and validate the generated JSON with the shared local validator.
4. Apply it to the demo-safe location.
5. Inspect enabled/hidden panels, RBAC, fields, endpoints, warnings, TR/EN, and light/dark behavior in the local preview.
6. Show the PocketBase adapter proof and the route-flexible/payload-strict rule.
7. Generate a Markdown report and show build/test evidence.
8. Close on the privacy boundary and required human review.

The narration is in [DEMO_SCRIPT.md](ai-buildweek/demo/DEMO_SCRIPT.md); the full production, open-source-project, failure-recovery, and submission plan is in [DEMO_VIDEO_ROADMAP.md](ai-buildweek/demo/DEMO_VIDEO_ROADMAP.md).

## Evidence

Evidence captured on 2026-07-13 is recorded in [codex-build-log.md](ai-buildweek/reports/codex-build-log.md).

| Check | Result | Evidence |
| --- | --- | --- |
| `npm install` | PASS | 1 package audited, 0 vulnerabilities; lockfile created |
| `npm run build` | PASS | Static judging demo emitted to `dist/` |
| `npm run test:unit` | PASS | 18/18 Node tests, including strict generated-artifact, privacy, API request/manifest, and PocketBase adapter tests |
| GPT-5.6 dry-run preflight | PASS | `gpt-5.6`, `store:false`, zero blockers, no network request |
| GPT-5.6 live generation | BLOCKED | API reached but account returned `429 insufficient_quota`; no output or false manifest written |
| School config validation | PASS | 9 panels, 5 roles, 5 field groups, 8 endpoints |
| Healthcare config validation | PASS | 10 panels, 4 roles, 5 field groups, 8 endpoints |
| Agency config validation | PASS | 8 panels, 4 roles, 7 field groups, 7 endpoints |
| School Markdown report generation | PASS | `ai-buildweek/reports/generated-demo-report.md` generated locally |
| PocketBase adapter proof | PASS | 2 synthetic `items` → 2 `users`; `totalItems` → `total`; malformed shapes fail closed in tests |
| `npm run test:browser` | PASS | 16/16 assertions at 375×812: TR/light/healthcare, overflow, keyboard, privacy, negative JSON, network and runtime errors |

Playwright is intentionally not added to this selected static surface. The dependency-free Chrome DevTools smoke runner uses an installed Chrome/Edge binary (`CHROME_PATH` can override discovery) and does not claim that the private donor product’s broader E2E suite applies to this repository.

## Repository structure

```text
ai-buildweek/
  prompts/       GPT-5.6/Codex architecture, adapter, gate, and demo prompts
  examples/      Three synthetic inputs and generated ZeroKit configs
  lib/           Privacy guard, GPT-5.6 request/evidence, and adapter modules
  reports/       Adapter, privacy, judging, claim audit, and build evidence
  scripts/       Generation, validation, adapter, safe apply, and report CLIs
  demo/          Architect guide, recording roadmap, script, and screenshot checklist
config/          Public config contract schema
frontend/
  pages/         Isolated local control-plane preview
  js/            Shared validator, preview model, and browser controller
  styles/        Responsive light/dark preview styling
scripts/         Node-only static build and local server
tests/unit/      Shared validator and preview projection tests
```

## Why GPT-5.6/Codex is central

The AI is used where architectural reasoning creates leverage: translating requirements into a coherent permission/navigation/field contract, comparing backend shapes, exposing uncertainty, and producing a test plan. The supported CLI now makes that model call directly through the Responses API, disables response storage, records provenance hashes, and rejects output that fails the shared local contract. Runtime customer data is deliberately outside that loop. This makes GPT-5.6/Codex a config and verification co-designer, not an agent reading a SaaS database.

The four reusable workflows live in [ai-buildweek/prompts](ai-buildweek/prompts), judge-oriented context lives in [judging-notes.md](ai-buildweek/reports/judging-notes.md), and the claim-by-claim competition assessment lives in [jury-claim-audit.md](ai-buildweek/reports/jury-claim-audit.md).

## Scope and dependency honesty

This repository demonstrates a working, validated AI-assisted control-plane configuration workflow and an isolated preview. The API integration is tested and its dry-run passes; a successful live evidence manifest is still required after the current API account's quota is restored. This repository does not claim that every panel in the private commercial donor product is part of this public edition or production-ready here.

The preview has **zero frontend runtime npm dependencies**. Development/test/build commands also use Node built-ins only in this edition. A customer backend, deployment stack, or the separate private donor product may have its own disclosed dependencies.

## License and private donor note

This public Build Week judging edition is licensed under the [MIT License](LICENSE). The separate private commercial donor codebase is not included and retains its own commercial terms. This license does not relicense or expose that private product.
