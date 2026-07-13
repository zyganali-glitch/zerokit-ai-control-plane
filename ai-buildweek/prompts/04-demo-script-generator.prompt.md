# GPT-5.6/Codex prompt — silent 3-minute Build Week demo

Write a precise, silent three-minute demo for “ZeroKit AI Control Plane — GPT-5.6/Codex SaaS Architect”. The audience is a technical Build Week judging panel. The video has no narration, voice, music, or ambient audio. Use short English on-screen captions. Do not claim the public edition is the complete private commercial product.

The script must show, in order:

1. the repeated cost of custom SaaS admin/control-plane infrastructure;
2. ZeroKit’s config-driven socket architecture;
3. a developer giving Codex + GPT-5.6 sanitized requirements, roles, fields, and contract snippets;
4. generated `panel_registry`, `rbac_registry`, `field_registry`, and `endpoint_map`;
5. local validation and application to the demo-safe location;
6. the browser-only control-plane preview;
7. the backend adapter compatibility/gap report;
8. the privacy boundary: no production records sent to AI and runtime stays on user infrastructure;
9. test/gate evidence and honest scope;
10. the practical impact and closing line.

Return a timestamped shot list with English on-screen text, on-screen action, and evidence file/command. Do not return narration. Fit within 180 seconds, keep each caption readable for at least three seconds, reserve at least 15 seconds for privacy and at least 15 seconds for test evidence. Use only claims backed by the supplied evidence. Call the repository a public competition adaptation and selected, hardened judging surface. Do not show the separate private donor admin panel as competition evidence.

## Developer input template

```text
Scenario to demo:
Commands that passed:
Preview URL:
Adapter report findings:
Known limitations:
Submission call to action:
```
