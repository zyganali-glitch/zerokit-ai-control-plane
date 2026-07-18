# Privacy boundary

ZeroKit AI Control Plane uses GPT-5.6/Codex for developer-side architecture work. The model helps design configuration, adapter, and test artifacts; it does not connect to a customer production database or live admin session.

## Allowed inputs

- product and workflow requirements;
- role names and permission intent without real identities;
- panel and navigation requirements;
- synthetic field names, options, and table columns;
- schemas and example configs with invented values;
- non-sensitive OpenAPI fragments and route summaries;
- synthetic request/response payloads;
- local validation errors after secrets and records are removed.

## Inputs that must never be sent

- production customer or employee records;
- real names, email addresses, physical addresses, identifiers, or behavioral histories;
- passwords, tokens, session cookies, API keys, private certificates, or connection strings;
- real invoices, payments, banking records, or billing exports;
- health records, PHI, diagnoses, clinical notes, or patient documents;
- private messages, uploaded customer documents, support conversations, or confidential datasets;
- raw production logs or traffic captures that may contain any of the above;
- `.env` files, credential stores, or private files outside this repository.

## Contract sanitization

1. Extract only the operations and schema fragments required by enabled panels.
2. Remove server URLs, credentials, security examples, tenant identifiers, and internal hostnames.
3. Replace real values with clearly synthetic values such as `usr_demo_01` and `example.test`.
4. Reduce payload examples to key names, types, required/optional state, and nesting.
5. Search for email addresses, tokens, UUIDs, account numbers, free text, and vendor secrets.
6. Require human approval before an artifact enters a Codex task.

The supported `codex:prepare` command performs a local check before model use. It blocks high-confidence private/API keys, bearer tokens, JWTs, credential-bearing connection strings, cookie headers, and email addresses outside reserved example domains. UUIDs, public IP addresses, and production-data language create human-review findings.

A PASS from pattern scanning does not prove that text is safe or free of domain-specific sensitive data. Human review is mandatory.

## Codex app boundary

- The operator visibly selects the GPT-5.6 model in the Codex app.
- The prepared task contains only the allowed prompt, synthetic input, and target output paths.
- `AGENTS.md` prohibits access to `.env`, credentials, production logs, and private files outside this repository.
- No model API or model API key is used.
- A Codex-generated config is not applied unless it passes the deterministic validator.
- After human review, the manifest stores only the model attestation, file paths, hashes, validation statistics, and review state.
- The local script cannot read the selected in-app model; the manifest explicitly records a non-cryptographic operator confirmation.

## Runtime and application boundary

- The local preview parses and renders JSON in the browser and writes config-derived values with `textContent`.
- It fetches only checked-in synthetic examples from the same local origin.
- It has no analytics, telemetry, external API, model call, database connection, or persistence path.
- `apply-demo-config.mjs` writes to the isolated `ai-buildweek/demo-config/` location by default and backs up an existing target.
- Customer runtime data, authorization, tenant isolation, and payload enforcement remain in customer infrastructure.

## Difference from an AI agent reading a SaaS database

The model sees architectural inputs, not runtime records. It proposes a contract that a developer can inspect, test, and reject. It does not browse a customer database, act in a live admin session, or infer business state from production records. The value is design consistency and test planning while the customer data plane remains outside the AI boundary.

Turkish reference: [privacy-boundary.tr.md](privacy-boundary.tr.md)
