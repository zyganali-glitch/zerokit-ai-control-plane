# Validator coverage and limits

ZeroKit uses dependency-free, deterministic JavaScript validation for the Build Week judging contract. The repository does not bundle AJV and does not claim to implement the complete JSON Schema 2020-12 specification.

## Two validation surfaces

| Surface | Purpose | What a PASS means |
| --- | --- | --- |
| Browser preview | Fast, client-side structure review for pasted or bundled configs | The JSON parses and satisfies the shared structural checks described below. It is safe to inspect, but it is not yet approved for application. |
| Generated-artifact CLI and manifest gate | Final contract gate for Codex output | The shared structural checks pass and all required generated-artifact sections are present and non-empty where required. Human review is still mandatory. |

The strict generated-artifact path is used by:

- `node ai-buildweek/scripts/validate-config.mjs <output.json>`;
- the safe demo apply and report commands that reuse that file validator; and
- `npm run codex:record`, which refuses to create a manifest for an invalid output.

## Shared structural checks

The browser-safe shared validator checks:

- the root is a JSON object;
- `panel_registry`, `rbac_registry`, `field_registry`, and `endpoint_map` are objects;
- panel `enabled` and `visible` values are booleans when present;
- panel `order` is a finite number and `group` is a non-empty string when present;
- `rbac_registry.roles` is a non-empty array;
- every role is an object with a unique, non-empty `slug`;
- role permissions are either `"*"` or an array of non-empty strings;
- every field-registry group is an object;
- every endpoint mapping is a non-empty string;
- non-root-relative endpoint strings produce a review warning; and
- missing or empty `privacy_notes` produce a review warning in the browser preview.

## Strict generated-artifact checks

The CLI and manifest gate add requirements for the full generated contract:

- `version` is a positive integer;
- `panel_registry`, `field_registry`, and `endpoint_map` are present and non-empty;
- `rbac_registry.roles` is present and non-empty through the shared gate;
- `brand_config` is an object;
- `privacy_notes` is a non-empty array of non-empty strings; and
- `test_checklist` is a non-empty array of non-empty strings.

Together, the strict path requires these top-level sections:

1. `version`
2. `panel_registry`
3. `rbac_registry`
4. `field_registry`
5. `endpoint_map`
6. `brand_config`
7. `privacy_notes`
8. `test_checklist`

The checked-in [`zerokit.config.schema.json`](../../config/zerokit.config.schema.json) documents the same generated-artifact sections. It is a contract reference, not evidence that a complete JSON Schema runtime executed.

## Deliberate limits

This validator does not evaluate every JSON Schema keyword, prove business correctness, execute authorization policies, contact a backend, or infer response-payload compatibility. It also cannot prove that a product brief contains no domain-specific sensitive information.

A customer integration still requires:

- a sanitized payload fixture for every enabled operation;
- a fail-closed adapter test for each response shape;
- authorization and least-privilege review;
- integration and negative-path tests; and
- human review before application.

This is a deliberate dependency and honesty tradeoff: the public judging path stays small, auditable, browser-compatible, and reproducible while backend-specific claims remain gated by backend-specific evidence.

## Reproduce the strict checks

```bash
node ai-buildweek/scripts/validate-config.mjs ai-buildweek/examples/school-saas.generated.config.json
node ai-buildweek/scripts/validate-config.mjs ai-buildweek/examples/healthcare-saas.generated.config.json
node ai-buildweek/scripts/validate-config.mjs ai-buildweek/examples/agency-saas.generated.config.json
```

All three committed synthetic scenarios must report `PASS`. A validator PASS is necessary but never replaces human review or adapter evidence.
