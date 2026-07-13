# Agency SaaS — sanitized architect input

## Product

A multi-client agency workspace control plane for CRM, kanban delivery, calendars, invoices, webhooks, API keys, and reports. All names and payloads are synthetic.

## Roles

- `agency_owner`: full workspace configuration.
- `project_manager`: projects, CRM, kanban, calendar, webhooks, and reports.
- `client_viewer`: read-only scoped delivery and report visibility.
- `finance_admin`: invoice/report administration.

## Panels and fields

Panels: CRM, kanban, calendar, invoices, webhooks, API keys, reports. Workspace fields include synthetic client tier, project stage, delivery status, and invoice currency.

## Sanitized endpoint summary

Custom routes live below `/agency-hub/api/`. Every request is workspace-scoped by the customer backend. The generated config maps routes but does not implement tenant authorization; backend enforcement remains mandatory.
