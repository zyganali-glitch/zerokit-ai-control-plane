# GPT-5.6/Codex prompt — 3-minute Build Week demo with English voiceover

Write a precise demo under three minutes for “ZeroKit AI Control Plane — GPT-5.6/Codex SaaS Architect”. The audience is a technical Build Week judging panel. Include simple English voiceover lines suitable for text-to-speech. Do not add overlay captions that obscure product evidence. Do not use copyrighted music. Do not claim production readiness or capabilities beyond the evidence in this repository.

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

Return a timestamped shot list with on-screen action, an English voiceover line, and an evidence file/command. Fit within 180 seconds, reserve at least 15 seconds for privacy and at least 15 seconds for test evidence. Explain both what was built and how Codex plus GPT-5.6 were used. Use only claims backed by supplied evidence. Call the repository a standalone public judging edition. Show only the reproducible ZeroKit preview and committed evidence.

## Developer input template

```text
Scenario to demo:
Commands that passed:
Preview URL:
Adapter report findings:
Known limitations:
Submission call to action:
```
