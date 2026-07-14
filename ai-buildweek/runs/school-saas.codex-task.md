# Codex app task — ZeroKit config architect

## Operator prerequisite

Before starting this task, select **GPT-5.6 Sol** in the Codex app model picker. For this single bounded task, use **Max** when it is available; otherwise use the highest visible single-task reasoning effort such as **Extra High** or **High**. Ultra is a parallel subagent mode, not a reasoning level. This script cannot verify the in-app selection, so keep the actual model, mode, and effort visible in the recording.

## Inputs

- Architecture prompt: `ai-buildweek/prompts/01-config-architect.prompt.md`
- Sanitized scenario input: `ai-buildweek/examples/school-saas.input.md`
- Input SHA-256: `399a7ac37cd1d465230476c7457e9e3698a8e4d93a3abdc8c00c7a16b2eed995`
- Target config: `ai-buildweek/evidence/school-saas.gpt-5.6.codex.config.json`

## Task

1. Read `AGENTS.md`, the architecture prompt, and the scenario input.
2. Do not read `.env` files, credentials, production logs, customer records, private donor files, or private files outside this repository.
3. Do not call a model API or make an external network request. Complete this task inside the current Codex app session.
4. Generate a ZeroKit config only from the synthetic input and write it to the target JSON file.
5. The config must include `version`, `panel_registry`, `rbac_registry`, `field_registry`, `endpoint_map`, `brand_config`, `privacy_notes`, and `test_checklist`.
6. Do not invent backend compatibility. Record unknowns explicitly in the notes.
7. Run this command and fix every failure:

   `node ai-buildweek/scripts/validate-config.mjs ai-buildweek/evidence/school-saas.gpt-5.6.codex.config.json`

8. In the change summary, state the assumptions, validation result, and need for human review. Do not create the manifest; the operator records it after review.
