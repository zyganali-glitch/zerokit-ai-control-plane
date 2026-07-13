# School SaaS — sanitized architect input

## Product

A multi-school operations SaaS for account administration, billing configuration, notifications, audit review, and aggregate reporting. This is a synthetic scenario; it contains no student records.

## Roles

- `owner`: full configuration authority.
- `school_admin`: manage users, roles, notifications, reports, and billing settings.
- `teacher`: read user directory and reports; update notifications.
- `student_support`: read/update users and read invoices/help.
- `readonly`: read-only oversight.

## Panels and fields

Panels: users, roles, plans, invoices, notifications, help, audit, reports. Currency options: TRY and EUR. Synthetic user fields: campus, department, support status. Reports use aggregate enrollment and billing summaries only.

## Sanitized endpoint summary

School backend routes live below `/school-api/v2/admin/`. Users return `{ users: [], total: number }`; invoices return `{ invoices: [], total: number }`; reports return aggregate metrics. No raw classroom activity or student content is exposed to this workflow.

