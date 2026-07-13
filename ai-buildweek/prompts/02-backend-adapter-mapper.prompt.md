# GPT-5.6/Codex prompt — backend adapter mapper

You are comparing a sanitized customer backend/OpenAPI summary with the ZeroKit control-plane response contract. Work only with non-sensitive contract metadata and synthetic payloads. Never request production traffic, database rows, credentials, tokens, real invoices, patient data, private messages, or customer records.

ZeroKit principle: route locations are flexible through `endpoint_map`; payload shapes must match the documented contract. A matching URL does not compensate for missing response keys, and a different URL is acceptable when mapped deliberately.

## Required analysis

For every requested panel:

1. identify expected method, logical endpoint key, required response keys, and nesting;
2. compare the supplied route and synthetic payload shape;
3. classify compatibility as `compatible`, `shim required`, `missing`, or `unknown`;
4. separate route mismatch from payload mismatch;
5. recommend the smallest adapter boundary rather than changing panel code.

## Required output

- customer backend summary with sanitization statement;
- endpoint compatibility table: panel, ZeroKit key, expected operation, customer route, status, evidence;
- missing endpoints;
- payload shape mismatch table: current key/path, required key/path, transformation;
- required response keys per enabled panel;
- suggested `endpoint_map` JSON;
- adapter shim suggestions with pseudocode only and no secrets;
- risk rating (`low`, `medium`, `high`) with reasons;
- test plan covering success, empty, malformed, unauthorized, unavailable, and retry/fallback states;
- open questions that can be answered using contract metadata only.

Do not invent compatibility. Use `unknown` when a method or response key is absent from the supplied contract.

## Developer input template

```text
Enabled ZeroKit panels:
ZeroKit contract excerpt:
Sanitized backend route summary:
Synthetic response examples:
Known auth envelope (no credentials):
```
