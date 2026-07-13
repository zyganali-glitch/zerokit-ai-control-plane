# Three-minute Build Week demo script

## 0:00–0:20 — The repeated SaaS tax

**On screen:** README title, then the school scenario input.

**Narration:** “Every SaaS admin surface starts with the same expensive questions: which panels exist, who can do what, which fields vary, and how does the customer backend connect? Boilerplate helps once; customer-specific edits create the next layer of debt.”

## 0:20–0:40 — The ZeroKit socket

**On screen:** README architecture and the four registry names.

**Narration:** “ZeroKit turns those decisions into a socket contract: panel registry, RBAC registry, field registry, and endpoint map. Routes can move; response shapes stay explicit.”

## 0:40–1:10 — GPT-5.6/Codex as architect

**On screen:** `01-config-architect.prompt.md`, then `school-saas.input.md`, then the generated JSON.

**Narration:** “Codex + GPT-5.6 receives sanitized product requirements, synthetic roles and fields, and a non-sensitive contract summary. It produces the configuration, privacy notes, and test checklist. It never needs real student records, invoices, credentials, or production traffic.”

## 1:10–1:30 — Validate and apply safely

**On screen:** terminal.

```bash
node ai-buildweek/scripts/validate-config.mjs ai-buildweek/examples/school-saas.generated.config.json
node ai-buildweek/scripts/apply-demo-config.mjs ai-buildweek/examples/school-saas.generated.config.json
```

**Narration:** “The shared validator checks required registries, panel types, role slugs and permissions, and endpoint paths. PASS still requires human review. Application targets a demo-safe directory and backs up existing demo config.”

## 1:30–1:55 — Local control-plane preview

**On screen:** `http://127.0.0.1:4173`; school summary, hidden team billing, roles, endpoint routes; switch to TR and light theme.

**Narration:** “The browser-only preview shows configuration intent: enabled and hidden panels, RBAC roles, fields, endpoints, warnings, and privacy notes. It supports Turkish and English, light and dark, desktop and mobile. Pasted config never leaves this tab.”

## 1:55–2:20 — Adapter truth, not route optimism

**On screen:** `adapter-gap-report.example.md`, compatibility and mismatch tables.

**Narration:** “GPT-5.6/Codex also compares a sanitized customer contract. The school routes map cleanly, but roles and invoices need shims, audit is missing, and notification writes are unknown. ZeroKit is route-flexible—not payload-shape agnostic.”

## 2:20–2:38 — Privacy boundary

**On screen:** `privacy-boundary.md` allowed/never-send sections and the preview banner.

**Narration:** “This is not an AI agent reading your SaaS database. The model sees requirements, schemas, and synthetic contracts. Runtime records, authorization, and tenant isolation remain on customer infrastructure, and generated config is reviewed before use.”

## 2:38–2:52 — Evidence

**On screen:** build log and terminal PASS lines.

**Narration:** “The judging edition builds with zero frontend runtime npm dependencies. Unit tests, three sample validations, report generation, and focused browser checks are recorded with actual PASS or FAIL evidence.”

## 2:52–3:00 — Impact

**On screen:** agency and healthcare scenario cards, then title.

**Narration:** “Describe the SaaS once; get a reviewable control-plane contract, adapter plan, and gates—faster, consistent, and privacy-preserving. That is ZeroKit AI Control Plane.”

