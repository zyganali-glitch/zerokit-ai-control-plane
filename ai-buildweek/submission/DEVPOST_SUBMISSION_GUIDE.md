# Devpost submission guide

This is an operator checklist. Devpost and the Official Rules remain the source of truth if any wording changes.

## 1. Start the submission

1. Sign in at <https://openai.devpost.com/>.
2. Click **Join hackathon** if the account has not joined yet.
3. Click **Submit a project** or open the existing draft project.
4. Submit this repository as its own project. Do not merge it with the separate `codex-control-tower` entry.

## 2. Project identity

- **Track/category:** Developer Tools
- **Title:** `ZeroKit AI Control Plane — GPT-5.6/Codex SaaS Architect`
- **Tagline:** `A privacy-preserving developer workflow that turns sanitized SaaS requirements into validated control-plane configs, RBAC, endpoint maps, adapter checks, and test evidence with Codex + GPT-5.6.`

## 3. Project description draft

```text
SaaS teams repeatedly rebuild the same administration infrastructure: navigation, roles and permissions, configurable fields, backend routes, and release gates. Those decisions quickly become scattered code and hard-to-review integration assumptions.

ZeroKit AI Control Plane turns a sanitized SaaS brief into one reviewable control-plane contract. Inside the Codex app, GPT-5.6 reasons across panel visibility, least-privilege RBAC, field registries, endpoint mappings, privacy notes, and test gates. A local preflight blocks high-confidence sensitive patterns before the task is prepared. Deterministic code then validates the generated JSON, a human reviews it, and an operator-confirmed manifest records hashes for the evidence chain.

The public project includes a browser-only preview, three synthetic scenarios, a fail-closed PocketBase adapter proof, unit/privacy/browser gates, and a GitHub Pages demo. Production customer records and runtime authorization remain outside the model loop. The project does not claim universal backend compatibility: each payload shape still requires a fixture, adapter, authorization review, and tests.
```

## 4. How we used Codex and GPT-5.6

```text
Codex was the primary development environment for the public Build Week judging edition. GPT-5.6 was used meaningfully for architecture, implementation, testing, evidence design, official-rules compliance, and the final product workflow—not as a decorative chatbot.

For the demonstrated workflow, the operator visibly selects GPT-5.6 Sol with high reasoning in Codex. A dependency-free local privacy check turns a synthetic School SaaS brief into a bounded Codex task. GPT-5.6 generates the target config in the repository, deterministic validation must return PASS, a human reviews the result, and a hash manifest records the reviewed files. The video shows that chain and the in-period repository commits document the meaningful extension.
```

## 5. URLs and private Codex evidence

- **Repository:** <https://github.com/zyganali-glitch/zerokit-ai-control-plane>
- **Live demo:** <https://zyganali-glitch.github.io/zerokit-ai-control-plane/> — verified live
- **YouTube:** `PASTE_PUBLIC_YOUTUBE_URL_HERE`
- **Codex Session ID:** Paste the Session ID produced by `/feedback` in the primary Codex task into the Devpost field. Do not paste it into the public README, video, issue, or repository.

## 6. Judge testing instructions

```text
No-rebuild path: open the GitHub Pages URL. The School SaaS synthetic scenario loads automatically; switch scenario, language, or theme and inspect panels, RBAC, fields, endpoints, warnings, and the local validation state.

Reproducible local path: Node.js 20+ on Windows, macOS, or Linux. Run npm ci, npm run build, npm run test:unit, npm run test:privacy, npm run demo:pocketbase, npm run test:browser, and npm run dev. Open http://127.0.0.1:4173. Chrome or Edge is required only for the browser smoke test.
```

## 7. Build Week delta summary

```text
This standalone public judging edition draws on prior private SaaS-control-plane research, while the separate private commercial codebase is not included or required for judging. The submission-period extension adds Pages deployment and project-subpath portability, URL tests, a visible evidence chain and synthetic boundary in the product, official-rules-aligned submission/video/session evidence, and the final fresh GPT-5.6 Codex generation and manifest workflow. Timestamped commits and the Build Week Delta document distinguish prior context from submitted work.
```

Full disclosure: [build-week-delta.md](../reports/build-week-delta.md).

## 8. Final checklist before Submit

- [ ] Developer Tools is the only selected track for this project.
- [ ] Title, tagline, description, and Codex/GPT-5.6 explanation are in English.
- [ ] Repository is public and opens in a private browser window.
- [x] Pages URL is live; deployment, anonymous HTTP assets, and a real-Chrome scenario smoke are verified.
- [ ] YouTube video is public, English, under three minutes, and has English audio plus readable captions.
- [ ] Video explains both what was built and how Codex plus GPT-5.6 were used.
- [ ] Final visible model selection, generated target, validator PASS, review, manifest, and tests are real.
- [ ] `/feedback` Session ID is in the private Devpost field and nowhere public.
- [ ] Build Week delta contains the final in-period commit SHA.
- [ ] No private donor screen, personal data, credential, `.env`, notification, or unlicensed music appears.
- [ ] Test access remains free and unrestricted through judging.
- [ ] Submit before **2026-07-21 5:00 PM Pacific Time**.

## Optional Devpost plugin

The Devpost Hackathons plugin may be useful as an optional submission helper. It is not required, gives no stated judging advantage, is not a product dependency, and is not integrated into this repository. The Devpost website and Official Rules remain authoritative.
