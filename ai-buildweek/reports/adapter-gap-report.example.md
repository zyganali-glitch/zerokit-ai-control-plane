# Synthetic backend adapter gap report

## Customer backend summary

Scenario: Northstar School Control. All names, routes, fields, and payloads below are synthetic. No student, staff, invoice, credential, or production record was used.

The customer backend exposes school-scoped administration under `/school-api/v2/admin`. ZeroKit routes can be remapped, but enabled panels still require the documented response keys and nesting.

## Matching panel requirements

Enabled judging path: users, roles, plans, invoices, notifications, help, audit, and aggregate reports. Team billing is disabled.

## Endpoint compatibility

| Panel | ZeroKit key | Expected operation/shape | Synthetic customer route | Status |
| --- | --- | --- | --- | --- |
| Users | `users` | `GET` → `{ users: [], total: number }` | `/school-api/v2/admin/users` | Compatible |
| Roles | `roles` | `GET` → role array/envelope with slug and permissions | `/school-api/v2/admin/roles` | Shim required |
| Plans | `plans` | `GET` → plan collection with currency and billing interval | `/school-api/v2/admin/billing/plans` | Compatible |
| Invoices | `invoices` | `GET` → `{ invoices: [], total: number }` | `/school-api/v2/admin/billing/invoices` | Shim required |
| Notifications | `notifications` | list/write operations and stable notification keys | `/school-api/v2/admin/notifications` | Unknown |
| Help | `help_cms` | article list/content envelope | `/school-api/v2/admin/help` | Compatible |
| Audit | `audit` | paged events with actor/action/time keys | `/school-api/v2/admin/audit` | Missing |
| Reports | `reports` | aggregate overview/revenue-style metrics | `/school-api/v2/admin/reports` | Shim required |

## Missing endpoints

- Audit events are currently available only as a nightly export. Add a read-only paged adapter route before enabling the audit panel against the customer backend.
- Notification write methods were not present in the sanitized contract. Keep writes disabled or classify the panel read-only until methods and authorization are documented.

## Payload mismatches

| Surface | Customer shape | Required shape | Adapter transformation |
| --- | --- | --- | --- |
| Roles | `{ items: [{ id, grants }] }` | roles containing `{ slug, permissions }` | map `items[].id` → `slug`; `grants` → `permissions` |
| Invoices | `{ data: [], count: n }` | `{ invoices: [], total: n }` | rename collection and count keys; preserve invoice field types |
| Reports | `{ students, paid_total }` | documented aggregate metric keys | map only approved aggregate values; do not expose records |

## Required response keys

- Users: `users`, `total`; each synthetic entry needs the panel’s documented identity/status fields.
- Roles: `slug`, `permissions`; localized name is recommended.
- Plans: stable plan slug, currency, billing interval, and configured price fields.
- Invoices: `invoices`, `total`; list items must preserve documented identifiers/status/amount types.
- Help: article identity, title, body/status contract expected by the selected consumer.
- Audit: event identity, actor label, action, timestamp, and pagination metadata.
- Reports: aggregate metric keys documented for each selected report operation.

## Suggested endpoint map

```json
{
  "users": "/school-api/v2/admin/users",
  "roles": "/school-api/v2/admin/roles",
  "plans": "/school-api/v2/admin/billing/plans",
  "invoices": "/school-api/v2/admin/billing/invoices",
  "notifications": "/school-api/v2/admin/notifications",
  "help_cms": "/school-api/v2/admin/help",
  "audit": "/school-api/v2/admin/audit",
  "reports": "/school-api/v2/admin/reports"
}
```

## Required adapter shims

1. Normalize roles into `slug` and string-array `permissions`; reject unknown grant types.
2. Rename the invoice envelope without changing amount/currency semantics.
3. Expose a read-only audit projection with deterministic pagination and authorization.
4. Convert reports to approved aggregate keys only; never forward row-level student data.
5. Return machine-readable error envelopes for unauthorized, missing, malformed, and unavailable states.

## Test plan

| Test | Evidence |
| --- | --- |
| Users success/empty | `{ users: [], total: 0 }` and populated synthetic fixture both render |
| Role normalization | Known grants map; unknown/non-string grants fail closed |
| Invoice envelope | `data/count` maps to `invoices/total`; currency types preserved |
| Audit paging | synthetic page boundaries, empty page, unauthorized, and unavailable cases |
| Report privacy | adapter rejects row-level/student-shaped values and emits aggregate keys only |
| Network/error states | 401, 403, 404, 422, 500, timeout; no false success or silent shape guessing |
| Contract regression | snapshot required response keys for every enabled operation |

## Risk rating

**Medium.** Route mapping is straightforward, but audit is missing, notification writes are unknown, and three payloads require explicit normalization. Risk becomes low only after adapter tests and authorization review pass. Do not enable unsupported writes merely because the panel is visible.

