# GPT-5.6/Codex config architect workflow

## Goal

Turn a non-sensitive SaaS description into a validated ZeroKit control-plane contract, an adapter decision record, and a test gate plan. The model operates on developer artifacts; production customer data stays out of scope.

## Inputs to prepare

1. Copy one scenario shape from `ai-buildweek/examples/*.input.md`.
2. Replace product, roles, panels, synthetic fields, and route names.
3. Include only sanitized OpenAPI operations or summarized response keys.
4. Remove real hosts, identifiers, example records, credentials, logs, and free text.
5. Have a human reviewer approve the prompt input.

## Run the four passes

### 1. Config architecture

Use `ai-buildweek/prompts/01-config-architect.prompt.md`. Save only the strict JSON object as a new file below `ai-buildweek/examples/` or another reviewed workspace.

```bash
node ai-buildweek/scripts/validate-config.mjs path/to/generated.config.json
```

A `FAIL` blocks application. A `PASS` proves basic structure/types, not backend payload compatibility.

### 2. Backend mapping

Use `02-backend-adapter-mapper.prompt.md` with the generated config, enabled operations, ZeroKit contract excerpt, and sanitized customer contract. Treat `unknown`, `missing`, and `shim required` as work—not as compatible.

### 3. Test gates

Use `03-test-gate-planner.prompt.md` with the actual changed modules and available commands. Keep `NOT_RUN` honest and blocking unless an explicit scope exception explains it.

### 4. Demo narrative

After checks have run, use `04-demo-script-generator.prompt.md` with real evidence. Do not feed it hoped-for PASS results.

## Safe local application

```bash
node ai-buildweek/scripts/apply-demo-config.mjs path/to/generated.config.json
node ai-buildweek/scripts/generate-demo-report.mjs path/to/generated.config.json
npm run dev
```

The apply tool defaults to `ai-buildweek/demo-config/`, creates a timestamped backup when needed, and refuses the donor config target without an explicit override flag. Manual review remains required.

## Review checklist

- Every panel has an intentional enabled/hidden state and navigation group.
- Each role follows least privilege and has a unique slug.
- Fields/options contain no personal or production-derived values.
- Endpoint map values are routes only; secrets and hosts are absent.
- Every enabled endpoint has a separate payload compatibility result.
- Privacy notes describe allowed and forbidden AI inputs.
- Unit, config, browser, and adapter gates contain actual evidence.

