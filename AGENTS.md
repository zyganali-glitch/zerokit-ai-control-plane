# ZeroKit Codex working rules

This repository is a competition surface for OpenAI Build Week and uses synthetic data only.

## Required workflow

1. In the Codex app, visibly select **GPT-5.6 Sol**. Use `high` reasoning for quality, or the highest available reasoning level for the final recording.
2. Run the scenario through the local privacy check with `npm run codex:prepare -- <input.md>`.
3. Follow the generated `ai-buildweek/runs/*.codex-task.md` file in a new Codex task.
4. Validate the generated JSON with `node ai-buildweek/scripts/validate-config.mjs <output.json>`.
5. After human review, create a hash manifest with `npm run codex:record -- ... --confirm-model-visible --confirm-reviewed`.

## Prohibited actions

- Do not call OpenAI or any other model API. Do not request, read, or write an API key.
- Do not read `.env` files, credential stores, production logs, customer records, real email addresses, invoices, health/student records, or private messages.
- Do not claim that a script verified the model selection. The evidence is the visible Codex UI plus operator confirmation; it is not cryptographic proof.
- Do not assume backend compatibility without a payload fixture and a test.
- Do not apply or report a config as PASS unless it passes validation.

## Completion gates

```bash
npm run build
npm run test:unit
npm run test:privacy
npm run demo:pocketbase
npm run test:browser
```

Do not call this repository “production-ready,” “compatible with every backend,” or unconditionally “zero dependency.”
