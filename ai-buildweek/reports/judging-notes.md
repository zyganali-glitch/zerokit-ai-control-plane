# Build Week judging notes

- Recommended track: **Developer Tools**
- No-rebuild preview target: `https://zyganali-glitch.github.io/zerokit-ai-control-plane/` after Pages is enabled and anonymously verified
- Private submission evidence: `/feedback` Session ID from the primary Codex task; never commit it publicly
- Timing disclosure: [build-week-delta.md](build-week-delta.md)

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
- The operator visibly selects **GPT-5.6 Sol** as the model and **High** or a higher available reasoning level in the Codex app. A reasoning label alone is not model evidence.
- Codex follows the prepared task and writes the output inside the public repository.
- A generated artifact is rejected unless the deterministic validator returns PASS.
- After human review, the operator records a hash manifest.
- The manifest explicitly labels model selection as operator-confirmed and not cryptographically verified.
- No model API or model API key is used.

## What the public competition edition contains

- four reusable GPT-5.6/Codex prompt workflows;
- synthetic school, healthcare, and agency input/config scenarios;
- a Codex task package, local privacy preflight, and evidence-manifest tools;
- a shared validator used by the CLI, tests, and browser preview;
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

The tests do not prove arbitrary customer backend compatibility. Each backend still requires a fixture, adapter, authorization review, and integration tests.

## Final recorded evidence

| Command | Result |
| --- | --- |
| `npm run test:unit` | PASS, 20/20 |
| `npm run test:privacy` | PASS, 8/8 |
| `npm run test:browser` | PASS, 16/16 |
| `npm run demo:pocketbase` | PASS |
| Three config validations | PASS, 3/3 |

## Judge run path

```bash
npm ci
npm run build
npm run test:unit
npm run test:privacy
npm run codex:prepare -- ai-buildweek/examples/school-saas.input.md --force
npm run demo:pocketbase
npm run dev
```

Open `http://127.0.0.1:4173`, switch scenarios/language/theme, and inspect the adapter and privacy evidence. The final GPT-5.6 generation is an operator step performed in the Codex app with the prepared task file.

The public video must be under three minutes and include English voiceover or English text-to-speech explaining both the product and the meaningful Codex/GPT-5.6 contribution. Readable captions support the audio but do not replace it.

Turkish reference: [judging-notes.tr.md](judging-notes.tr.md)
