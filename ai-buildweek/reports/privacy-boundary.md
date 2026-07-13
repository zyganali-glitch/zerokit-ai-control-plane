# Privacy boundary

ZeroKit AI Control Plane uses GPT-5.6/Codex on the developer side of the architecture boundary. The model helps design configuration and adapter/test artifacts; it is not connected to a customer’s production database or admin session.

## Allowed input

- product and workflow requirements;
- role names and permission intent without real identities;
- panel/navigation requirements;
- synthetic field names, dropdown values, and table columns;
- schemas and sample configs with invented values;
- non-sensitive OpenAPI fragments and route summaries;
- synthetic request/response payloads;
- local validation failures with secrets and records removed.

## Never send

- production customer or employee records;
- real names, emails, addresses, identifiers, or behavioral histories;
- passwords, tokens, session cookies, API keys, private certificates, or connection strings;
- real invoices, payment details, bank information, or billing exports;
- medical records, PHI, diagnoses, clinical notes, or patient documents;
- private messages, uploaded customer documents, support transcripts, or confidential datasets;
- raw production logs or traffic captures that may contain any of the above.

## Sanitizing a contract

1. Export only the operations and schema components needed for enabled panels.
2. Remove server URLs, credentials, security examples, tenant identifiers, and internal hostnames.
3. Replace real values with obvious synthetic values such as `usr_demo_01` and `example.test`.
4. Reduce payloads to key names, types, required/optional status, and nesting.
5. Search the result for emails, tokens, UUIDs, account numbers, free text, and vendor secrets.
6. Have a human reviewer approve the sanitized artifact before it enters the prompt.

If sensitive material is discovered after submission, stop using the artifact, follow the organization’s incident process, rotate exposed credentials, and rebuild the prompt from a sanitized source.

## Runtime and application boundary

- The local preview parses and renders JSON in the browser and uses `textContent` for configuration-derived values.
- The page fetches only repository-bundled synthetic examples from the same local origin.
- There is no analytics, telemetry, external API, model call, database connection, or persistence path in the preview.
- `apply-demo-config.mjs` writes to the isolated `ai-buildweek/demo-config/` location by default and backs up an existing demo target.
- Customer runtime data, authorization, tenant isolation, and payload enforcement remain on customer infrastructure.
- Generated configuration requires validation and manual human review before integration.

## How this differs from “an AI agent reads your SaaS database”

The model sees architecture inputs, not runtime records. It proposes a contract that developers can inspect, test, and reject. It cannot browse a customer database, take actions in a live admin session, or infer business state from production data. The value comes from design consistency and test planning while the data plane stays outside the AI boundary.
