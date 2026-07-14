# Devpost submission guide

This is an operator checklist. Devpost and the Official Rules remain the source of truth if any wording changes.

## 1. Start the submission

1. Sign in at <https://openai.devpost.com/>.
2. Click **Join hackathon** if the account has not joined yet.
3. Click **Submit a project** or open the existing draft project.
4. Open or create the **ZeroKit AI Control Plane** submission draft.
5. Select only **Developer Tools**. Do not select or describe another track for this project.

## 2. Project identity

- **Track/category:** Developer Tools
- **Title:** `ZeroKit AI Control Plane — GPT-5.6/Codex SaaS Architect`
- **Tagline:** `A privacy-controlled developer workflow that turns sanitized SaaS requirements into validated control-plane configs, RBAC, endpoint maps, adapter checks, and test evidence with Codex + GPT-5.6.`

## 3. Project description draft

```text
SaaS teams repeatedly rebuild the same administration infrastructure: navigation, roles and permissions, configurable fields, backend routes, and release gates. Those decisions quickly become scattered code and hard-to-review integration assumptions.

ZeroKit AI Control Plane turns a sanitized SaaS brief into one reviewable control-plane contract. Inside the Codex app, GPT-5.6 reasons across panel visibility, least-privilege RBAC, field registries, endpoint mappings, privacy notes, and test gates. A local preflight blocks high-confidence sensitive patterns before the task is prepared. Deterministic code then validates the generated JSON, a human reviews it, and an operator-confirmed manifest records hashes for the evidence chain.

The public project includes a browser-only preview, three synthetic scenarios, a fail-closed PocketBase adapter proof, unit/privacy/browser gates, and a GitHub Pages demo. Production customer records and runtime authorization remain outside the model loop. The project does not claim universal backend compatibility: each payload shape still requires a fixture, adapter, authorization review, and tests.
```

## 4. How we used Codex and GPT-5.6

```text
Codex was the primary development environment for the public Build Week judging edition. GPT-5.6 was used meaningfully for architecture, implementation, testing, evidence design, official-rules compliance, and the final product workflow—not as a decorative chatbot.

For the demonstrated workflow, the operator visibly selects GPT-5.6 Sol and shows the actual selected Codex mode and effort. For this single bounded task, use Max mode when it is available; otherwise show the real available labels without overstating them. Ultra is a parallel subagent mode, not a reasoning level. A dependency-free local privacy check turns a synthetic School SaaS brief into a bounded Codex task. GPT-5.6 generates the target config in the repository, strict deterministic validation must return PASS, a human reviews the result, and a hash manifest records the reviewed files. The video shows that chain and the in-period repository commits document the meaningful extension.
```

## 5. Final evidence shown in the video

The bundled School SaaS config is orientation material, not final run evidence. The recording must show this real sequence:

1. visible GPT-5.6 Sol selection and the actual selected mode and effort;
2. fresh output at `ai-buildweek/evidence/school-saas.gpt-5.6.codex.config.json`;
3. strict validator PASS;
4. human review;
5. operator-confirmed hash manifest;
6. **Choose local JSON** in the English preview;
7. selection of that exact fresh evidence config, followed by local PASS.

Do not use **Load sample** as a substitute for the final evidence-file shot. The preview must state **No third-party or model requests**.

## 6. URLs and private Codex evidence

- **Repository:** <https://github.com/zyganali-glitch/zerokit-ai-control-plane>
- **Live demo:** <https://zyganali-glitch.github.io/zerokit-ai-control-plane/> — verified live
- **YouTube:** `PASTE_PUBLIC_YOUTUBE_URL_HERE`
- **Codex Session ID:** Paste the Session ID produced by `/feedback` in the primary Codex task only into Devpost's private Session ID field. Never paste it into the public description, README, video, screenshot, issue, commit, or repository.

GitHub Pages supplies the public demo for free. ZeroKit does not require a paid domain, paid hosting, a model API, or an API key. Codex itself uses the operator's signed-in account and remains subject to that account's access and usage limits.

## 7. Judge testing instructions

```text
No-rebuild path: open the GitHub Pages URL. The School SaaS synthetic scenario loads automatically; switch scenario, language, or theme and inspect panels, RBAC, fields, endpoints, warnings, and the local validation state.

Reproducible local path: Node.js 22+ on Windows, macOS, or Linux. Run npm ci, npm run build, npm run test:unit, npm run test:privacy, npm run demo:pocketbase, npm run test:browser, and npm run dev. Open http://127.0.0.1:4173. Chrome or Edge is required only for the browser smoke test. In Windows PowerShell, use npm.cmd instead of npm if script execution is blocked.
```

## 8. Build Week delta summary

```text
ZeroKit had a public foundation before the official Submission Period. The submission-period extension adds Pages deployment and project-subpath portability, URL tests, a visible evidence chain and synthetic boundary in the product, strict generated-artifact validation, official-rules-aligned submission/video/session evidence, and the final fresh GPT-5.6 Codex generation and manifest workflow. Timestamped commits and the Build Week Delta document distinguish the foundation from submitted in-period work.
```

Full disclosure: [build-week-delta.md](../reports/build-week-delta.md).

## 9. YouTube upload and public verification

1. Upload `ZeroKit-Build-Week-Demo-English.mp4` at <https://www.youtube.com/> using **Create → Upload video**.
2. Keep the final duration at or below **2:54**, safely below three minutes.
3. The video must contain English explanatory audio and readable English captions. The current official [Build Week FAQ](https://openai.devpost.com/details/faqs) explicitly permits text-to-speech or an AI voice tool.
4. In **Audience**, select the truthful not-made-for-kids choice for this developer tool.
5. In **Visibility**, select **Public**—not Private, Unlisted, or Scheduled—and publish.
6. Copy the final YouTube URL.
7. Open a new incognito/private window, paste the URL while signed out, and verify that the video plays with audible English narration and readable captions.
8. Reopen YouTube Studio and confirm that visibility still says **Public**.

## 10. Final Devpost click path

1. Sign in at <https://openai.devpost.com/> and open the ZeroKit draft.
2. Confirm that **Developer Tools** is the only selected track.
3. Fill the title, tagline, description, Codex/GPT-5.6 explanation, repository URL, free Pages URL, and public YouTube URL in English.
4. Paste the `/feedback` Session ID only into the private Session ID field.
5. Paste the judge testing instructions above where installation/testing instructions are requested.
6. Save the draft and open **Preview** if available.
7. Check every URL and remove any unsupported productivity, customer, production-readiness, or universal-backend claim.
8. Click **Submit project** or **Submit to hackathon**.
9. Resolve every required-field warning and submit again if necessary.
10. Do not close the page until the project shows **Submitted**.

After submission, use an incognito/private window to verify the public repository, free Pages URL, and public YouTube URL. The Session ID must never appear in this public check.

## 11. Final checklist before Submit

- [ ] Developer Tools is the only selected track for this project.
- [ ] Title, tagline, description, and Codex/GPT-5.6 explanation are in English.
- [ ] Repository is public and opens in a private browser window.
- [x] Pages URL is live; deployment, anonymous HTTP assets, and a real-Chrome scenario smoke are verified.
- [ ] YouTube video is Public, English, at or below 2:54, and has audible English narration plus readable English captions.
- [ ] Video explains both what was built and how Codex plus GPT-5.6 were used.
- [ ] Final visible GPT-5.6 Sol selection, actual selected mode and effort, fresh generated target, strict validator PASS, review, manifest, and tests are real.
- [ ] The preview uses **Choose local JSON** to load the fresh reviewed evidence config and shows PASS; **Load sample** is not used as final proof.
- [ ] The preview states **No third-party or model requests**.
- [ ] `/feedback` Session ID is in the private Devpost field and nowhere public.
- [ ] Build Week delta contains the final in-period commit SHA.
- [ ] No personal data, credential, `.env`, Session ID, unrelated private screen, notification, or unlicensed music appears.
- [ ] Test access remains free and unrestricted through judging.
- [ ] Submit before **2026-07-21 5:00 PM Pacific Time**.

## Optional Devpost plugin

The Devpost Hackathons plugin may be useful as an optional submission helper. It is not required, gives no stated judging advantage, is not a product dependency, and is not integrated into this repository. The Devpost website and Official Rules remain authoritative.
