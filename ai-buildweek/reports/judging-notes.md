# Build Week judging notes

## Why this is a Build Week project

This repository is a focused public competition adaptation of a private commercial ZeroKit codebase. It selects a difficult, repeatable part of SaaS delivery—turning requirements and backend contracts into a coherent control-plane specification—and makes that workflow inspectable, runnable, and testable for judges.

## How GPT-5.6/Codex is central

GPT-5.6/Codex is the architecture/config/test co-designer:

1. The config architect turns sanitized product intent into panels, RBAC, fields, endpoints, brand metadata, privacy notes, and test gates.
2. The adapter mapper compares sanitized backend contracts with ZeroKit’s route-flexible/payload-strict expectations and refuses to invent compatibility.
3. The gate planner produces unit, smoke, privacy, i18n, responsive, and evidence checks.
4. The demo generator converts real PASS/FAIL evidence into a concise judging narrative.

This is deliberately not a chatbot bolted onto admin records. The model does not need production data to reason about architecture.

## What the public edition contains

- four reusable GPT-5.6/Codex prompt workflows;
- school, healthcare, and agency scenario inputs with schema-compatible generated configs;
- one shared zero-runtime-dependency validator used by CLI, tests, and browser preview;
- safe demo apply and Markdown report generators;
- an isolated TR/EN, light/dark, responsive, browser-only preview;
- synthetic adapter-gap, privacy, build-evidence, demo, and screenshot guidance.

## What remains separate

The full private commercial donor codebase, its broader panel inventory, private roadmap, and commercial license are not included or relicensed. This repository does not claim that the donor’s entire product surface is complete or represented here.

## What the tests prove

- Three examples contain the required registries and satisfy the public basic type contract.
- Panel flags/order, role slugs/permissions, field groups, and endpoint strings are validated by shared code.
- Preview projection separates enabled/hidden panels and preserves RBAC, field, endpoint, warning, and privacy evidence.
- Build output can be produced using Node built-ins and the frontend adds zero runtime npm packages.

The tests do not prove a customer backend’s payload compatibility; that requires the adapter report and backend-specific integration tests.

## Multi-role review parity

- Office worker: one load/paste → validate → review path and exact commands.
- Child-level clarity: numbered steps, plain PASS/FAIL status, visible privacy reminder.
- Academic rigor: compatibility is evidence-based and `unknown` remains an allowed result.
- Field analyst: adapter transformations, failure states, and practical test matrix are explicit.
- Researcher: prompts state allowed inputs, assumptions, and unresolved decisions.
- Aesthetic advisor: restrained information hierarchy, readable summary, coherent light/dark tokens.
- Senior engineer: shared pure modules, no runtime package, CSP, safe text rendering, backups, tests.
- Accessibility advocate: semantic headings/labels, skip link, focus-visible state, live status, 44px controls, reduced-motion and mobile rules.

## Judge run path

```bash
npm install
npm run build
npm run test:unit
node ai-buildweek/scripts/validate-config.mjs ai-buildweek/examples/healthcare-saas.generated.config.json
npm run dev
```

Open `http://127.0.0.1:4173`, switch scenarios/language/theme, and inspect the adapter and privacy reports.
