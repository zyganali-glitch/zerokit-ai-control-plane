# Build Week judging notes

- Recommended track: **Developer Tools**
- Verified no-rebuild preview: `https://zyganali-glitch.github.io/zerokit-ai-control-plane/`
- Private submission evidence: `/feedback` Session ID from the primary Codex task; never commit it publicly
- Timing disclosure: [build-week-delta.md](build-week-delta.md)
- Validator scope: [validator-coverage.md](validator-coverage.md)
- Adapter claims: [adapter-compatibility-matrix.md](adapter-compatibility-matrix.md)

## Why this is a Build Week project

This repository is the public, competition-focused adaptation of a separate private commercial ZeroKit codebase. It targets a difficult and repeated part of SaaS delivery: turning product requirements and backend contracts into one coherent control-plane definition. The workflow is intentionally reviewable, runnable, and testable by judges.

## Why GPT-5.6/Codex is central

GPT-5.6/Codex acts as an architecture, configuration, and test co-designer:

1. The config architect turns sanitized product intent into panels, RBAC, fields, endpoints, branding, privacy notes, and test gates.
2. The adapter mapper compares a sanitized backend contract against a route-flexible, payload-strict expectation and does not invent compatibility.
3. The gate planner proposes unit, smoke, privacy, i18n, responsive, and evidence checks.
4. The English voiceover workflow turns real PASS/FAIL evidence into a concise judge-facing story and explains how Codex plus GPT-5.6 were used.

This is not a chatbot attached to admin data. Architectural reasoning does not require production customer records.

## Codex app workflow

- `codex:prepare` scans the synthetic input locally and creates a bounded task file.
- The operator visibly selects **GPT-5.6 Sol** and shows the actual selected mode and effort in the Codex app. For this single bounded task, use Max when available; Ultra is a parallel subagent mode, not a reasoning level. A mode or effort label alone is not model evidence.
- Codex follows the prepared task and writes the output inside the public repository.
- A generated artifact is rejected unless the strict deterministic CLI gate returns PASS.
- After human review, the operator records a hash manifest.
- The manifest explicitly labels model selection as operator-confirmed and not cryptographically verified.
- No model API or model API key is used.

## What the public competition edition contains

- four reusable GPT-5.6/Codex prompt workflows;
- synthetic school, healthcare, and agency input/config scenarios;
- a Codex task package, local privacy preflight, and evidence-manifest tools;
- a browser-safe structural validator plus a stricter generated-artifact CLI/manifest gate;
- safe demo apply and Markdown report generators;
- an English/Turkish, light/dark, responsive, browser-only judging preview;
- adapter-gap, privacy, build-evidence, demo, and screenshot documentation;
- a tested PocketBase response-envelope adapter using synthetic data.

## What remains separate

The private commercial donor codebase, its broader panel inventory, private roadmap, and commercial license are not included. This repository does not claim that the donor product's complete surface is submitted or production-ready here.

## What the tests prove

- All three examples contain the required registries and satisfy the public basic-type contract.
- Codex workflow tests cover the bounded local task, strict generated-artifact fields, operator attestations, and content-free manifest hashes.
- Privacy tests block high-confidence secrets and non-reserved email addresses before model use; human sanitization remains mandatory.
- PocketBase tests cover successful envelope projection and fail-closed behavior for missing or malformed keys.
- Preview tests retain enabled/hidden panels, RBAC, fields, endpoints, warnings, and privacy evidence.

The browser PASS is a fast structural review, not approval to apply a generated artifact. The CLI and manifest gate additionally require `version`, non-empty registries, `brand_config`, privacy evidence, and a test checklist. The exact checks and deliberate JSON Schema limits are documented in [validator-coverage.md](validator-coverage.md).

The tests do not prove arbitrary customer backend compatibility. Each backend still requires a fixture, adapter, authorization review, and integration tests. The proven PocketBase boundary and the status of broader adapter patterns are documented in [adapter-compatibility-matrix.md](adapter-compatibility-matrix.md).

## Final recorded evidence

| Command | Result |
| --- | --- |
| `npm run test:unit` | PASS, 20/20 |
| `npm run test:privacy` | PASS, 8/8 |
| `npm run test:browser` | PASS, 16/16 |
| `npm run demo:pocketbase` | PASS |
| Three config validations | PASS, 3/3 |

## Judge run path

Prerequisite for the full local path: Node.js 22 or newer and Chrome or Edge for the browser smoke.

```bash
npm ci
npm run build
npm run test:unit
npm run test:privacy
npm run codex:prepare -- ai-buildweek/examples/school-saas.input.md --force
npm run demo:pocketbase
npm run test:browser
npm run dev
```

Open `http://127.0.0.1:4173`, switch scenarios/language/theme, and inspect the adapter and privacy evidence. The final GPT-5.6 generation is an operator step performed in the Codex app with the prepared task file.

The public video must be under three minutes and include English voiceover or English text-to-speech explaining both the product and the meaningful Codex/GPT-5.6 contribution. Readable captions support the audio but do not replace it.

Turkish reference: [judging-notes.tr.md](judging-notes.tr.md)
