# Healthcare SaaS — sanitized architect input

## Product

A clinic administration control plane for staff accounts, security policy, compliance audit, notifications, aggregate operational reports, legal/help content, and upload policy. This scenario uses invented field names and no PHI.

## Roles

- `clinic_owner`: configuration owner.
- `physician_admin`: staff administration and aggregate reporting.
- `billing_staff`: billing operations visibility without clinical access.
- `compliance_viewer`: read-only audit, security, legal, and report access.

## Panels and fields

Panels: users, audit, security, notifications, reports, legal/help, uploads. Synthetic staff fields: clinic unit, license category, account status. Upload types are policy metadata only; patient documents are excluded.

## Sanitized endpoint summary

Routes live below `/clinic-control/v1/`. Reports contain de-identified aggregate counts. The adapter contract must reject any field named `patient_record`, `diagnosis`, or equivalent from the AI configuration workflow.

