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
- **Project name (24/60 characters):** `ZeroKit AI Control Plane`
- **Elevator pitch (152/200 characters):** `Turn sanitized SaaS requirements into validated control-plane configs, least-privilege RBAC, endpoint maps, and auditable evidence with Codex + GPT-5.6.`

## 3. Project Story — About the project

```text
## Inspiration

SaaS teams repeatedly rebuild the same administration infrastructure: navigation, roles and permissions, configurable fields, backend routes, and release gates. Those decisions quickly become scattered code and hard-to-review integration assumptions. We wanted one developer workflow that makes those choices visible before runtime without putting production customer data into the model loop.

## What it does

ZeroKit AI Control Plane turns a sanitized SaaS brief into one reviewable configuration contract. The result covers enabled and hidden panels, least-privilege RBAC, configurable fields, endpoint mappings, brand settings, privacy notes, and test gates.

The public GitHub Pages preview gives judges a no-rebuild path for inspecting the projected control plane. The repository also includes three synthetic scenarios, a fresh reviewed GPT-5.6 evidence artifact, deterministic validators, a fail-closed PocketBase response-envelope fixture, and repeatable unit, privacy, browser, and build checks.

## How we built it

A dependency-free local privacy preflight first blocks high-confidence secret patterns and non-reserved email addresses. It then prepares a bounded Codex task that allows only synthetic requirements, public contracts, and a specific output path. Codex with GPT-5.6 generates the JSON inside the repository. A stricter local gate rejects incomplete generated artifacts; a human reviews the result; and an operator-confirmed manifest records hashes and validation counts. The browser preview re-validates a chosen JSON file locally and makes panels, roles, fields, routes, warnings, and the evidence chain reviewable.

## How we used Codex and GPT-5.6

Codex was the primary development environment for the Build Week extension, and GPT-5.6 contributed to architecture, implementation, tests, evidence design, official-rules alignment, and the demonstrated config-generation workflow. In the final recorded run, GPT-5.6 Sol with Ultra intelligence handled a bounded synthetic task, wrote the fresh School SaaS config, and returned strict validation PASS. Model selection is operator-confirmed from the visible Codex interface, not cryptographically verified.

## Challenges

The hardest part was keeping AI generation useful without turning it into an unsupported trust claim. We separated model reasoning from deterministic acceptance, made human review mandatory, kept production records and runtime authorization outside the workflow, and documented validator limits. We also made GitHub Pages work correctly under a project subpath and built a browser smoke runner without adding a frontend runtime dependency.

## Accomplishments and lessons

The fresh reviewed artifact passes with 8 panels, 5 roles, 3 field groups, and 3 endpoints. The final gates pass with unit 20/20, privacy 8/8, browser 16/16, three bundled config validations, and the synthetic PocketBase adapter fixture. The main lesson is that AI-generated architecture becomes more useful when uncertainty, privacy boundaries, deterministic validation, and human approval are visible parts of the product.

## Build Week extension

ZeroKit is a pre-existing project under the Official Rules. Its public foundation predates the Submission Period and is not presented as new competition work. During the Submission Period, it was meaningfully extended with the no-rebuild Pages deployment and project-subpath support, URL tests, a visible evidence chain and synthetic-data boundary, strict generated-artifact validation, official-rules-aligned submission materials, and the fresh GPT-5.6/Codex generation, review, and manifest workflow. Timestamped commits and the exact prior/new-work boundary are documented at https://github.com/zyganali-glitch/zerokit-ai-control-plane/blob/main/ai-buildweek/reports/build-week-delta.md.

## What is next

ZeroKit remains a judging-ready developer workflow, not a production-ready authorization system or a universal backend adapter. A real deployment would require a backend-specific fixture and adapter, authorization review, integration tests, and normal deployment controls. The browser preview intentionally runs no Codex task or shell command and makes no model API request.
```

## 4. How we used Codex and GPT-5.6

```text
Codex was the primary development environment for the public Build Week judging edition. GPT-5.6 was used meaningfully for architecture, implementation, testing, evidence design, official-rules compliance, and the final product workflow—not as a decorative chatbot.

For the demonstrated workflow, the operator visibly selected GPT-5.6 Sol with Ultra intelligence. A dependency-free local privacy check turned a synthetic School SaaS brief into a bounded Codex task. GPT-5.6 generated the target config in the repository, strict deterministic validation returned PASS, a human reviewed the result, and a hash manifest recorded the reviewed files. Model selection is operator-confirmed from the visible Codex interface, not cryptographically verified. The video shows that chain, and the in-period repository commits document the meaningful extension.
```

## 5. Built with

Add these as separate Devpost tags:

`Codex` · `GPT-5.6` · `JavaScript` · `Node.js 22+` · `HTML` · `CSS` · `GitHub Actions` · `GitHub Pages`

## 6. Final evidence shown in the video

The bundled School SaaS config is orientation material, not final run evidence. The recording must show this real sequence:

1. visible GPT-5.6 Sol selection and the actual selected intelligence level;
2. fresh output at `ai-buildweek/evidence/school-saas.gpt-5.6.codex.config.json`;
3. strict validator PASS;
4. human review;
5. operator-confirmed hash manifest;
6. **Choose local JSON** in the English preview;
7. selection of that exact fresh evidence config, followed by local PASS.

Do not use **Load sample** as a substitute for the final evidence-file shot. The preview must state **No third-party or model requests**.

## 7. URLs and private Codex evidence

- **Repository:** <https://github.com/zyganali-glitch/zerokit-ai-control-plane>
- **Live demo:** <https://zyganali-glitch.github.io/zerokit-ai-control-plane/> — verified live
- **YouTube:** <https://www.youtube.com/watch?v=vGYXv_pltRE> — Public, verified signed out, **2:38** (158.221 seconds)
- **Codex Session ID:** Paste the Session ID produced by `/feedback` in the primary Codex task only into Devpost's private Session ID field. Never paste it into the public description, README, video, screenshot, issue, commit, or repository.

GitHub Pages supplies the public demo for free. ZeroKit does not require a paid domain, paid hosting, a model API, or an API key. Codex itself uses the operator's signed-in account and remains subject to that account's access and usage limits.

For **Try it out links**, add these in this order:

1. `https://zyganali-glitch.github.io/zerokit-ai-control-plane/`
2. `https://github.com/zyganali-glitch/zerokit-ai-control-plane`

For **URL to your public or private code repo**, paste:

`https://github.com/zyganali-glitch/zerokit-ai-control-plane`

## 8. Project media

Upload these files in this order. The first 3:2 image is the project thumbnail; the other four are 16:9 evidence images.

1. `devpost-thumbnail.png`
   - Caption: `ZeroKit turns synthetic SaaS requirements into a reviewable, locally validated control-plane contract before runtime.`
2. `devpost-gallery-codex-proof.png`
   - Caption: `GPT-5.6 Sol with Ultra intelligence executes a bounded, synthetic-only Codex task.`
3. `devpost-gallery-fresh-config-pass.png`
   - Caption: `The fresh reviewed config passes local validation and exposes panels, roles, fields, and endpoint mappings.`
4. `devpost-gallery-evidence-chain.png`
   - Caption: `A nine-step evidence chain connects privacy preflight, Codex generation, validation, human review, adapter proof, and repeatable tests.`
5. `devpost-gallery-projected-control-plane.png`
   - Caption: `The projected control plane makes enabled and hidden panels, least-privilege roles, fields, and routes reviewable before runtime.`

For **Video demo link**, paste:

`https://www.youtube.com/watch?v=vGYXv_pltRE`

## 9. Judge testing instructions

```text
No-rebuild path: open the GitHub Pages URL. The School SaaS synthetic scenario loads automatically; switch scenario, language, or theme and inspect panels, RBAC, fields, endpoints, warnings, and the local validation state.

Reproducible local path: Node.js 22+ on Windows, macOS, or Linux. Run npm ci, npm run build, npm run test:unit, npm run test:privacy, npm run demo:pocketbase, npm run test:browser, and npm run dev. Open http://127.0.0.1:4173. Chrome or Edge is required only for the browser smoke test. In Windows PowerShell, use npm.cmd instead of npm if script execution is blocked.
```

For **If applicable, link to your project for judges to check and test & any necessary instructions**, paste:

```text
No-rebuild judge path: https://zyganali-glitch.github.io/zerokit-ai-control-plane/

The synthetic School SaaS scenario loads automatically. Switch scenario, language, or theme and inspect the local PASS state, enabled and hidden panels, RBAC, fields, endpoints, warnings, and the nine-step evidence chain. No login, API key, paid account, model API, or rebuild is required.

Source and reproducible evidence: https://github.com/zyganali-glitch/zerokit-ai-control-plane
```

For **If your project is a plugin or dev tool, provide installation instructions, supported platforms, instructions for testing, etc**, paste:

```text
Supported platforms: Windows, macOS, and Linux.

No-rebuild test: open https://zyganali-glitch.github.io/zerokit-ai-control-plane/

Local test prerequisite: Node.js 22+; Chrome or Edge is required only for the browser smoke test.

Run:
npm ci
npm run build
npm run test:unit
npm run test:privacy
npm run demo:pocketbase
npm run test:browser
npm run dev

Then open http://127.0.0.1:4173. On Windows PowerShell, use npm.cmd instead of npm if script execution is blocked. The workflow uses synthetic data only and requires no model API or API key.
```

## 10. Build Week delta summary

```text
ZeroKit had a public foundation before the official Submission Period. The submission-period extension adds Pages deployment and project-subpath portability, URL tests, a visible evidence chain and synthetic boundary in the product, strict generated-artifact validation, official-rules-aligned submission/video/session evidence, and the final fresh GPT-5.6 Codex generation and manifest workflow. Timestamped commits and the Build Week Delta document distinguish the foundation from submitted in-period work.
```

Full disclosure: [build-week-delta.md](../reports/build-week-delta.md).

## 11. Verified public YouTube video

- URL: <https://www.youtube.com/watch?v=vGYXv_pltRE>
- Actual duration: **2:38** (158.221 seconds)
- Visibility: **Public**; metadata reports neither Private nor Unlisted
- Signed-out playback: **PASS**
- Audio: English explanation of ZeroKit, Codex, and GPT-5.6
- Evidence shown: working preview, visible GPT-5.6 Sol with Ultra, strict PASS, reviewed fresh config, adapter boundary, and repeatable gates

## 12. Final Devpost click path

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

## 13. Final checklist before Submit

- Submission result: **Submitted**; operator confirmed the green status in My Projects on 2026-07-18.
- [x] Developer Tools is the only selected track for this project.
- [x] Title, tagline, description, and Codex/GPT-5.6 explanation are in English.
- [x] Repository is public and opens in a private browser window.
- [x] Pages URL is live; deployment, anonymous HTTP assets, and a real-Chrome scenario smoke are verified.
- [x] YouTube video is Public, English, and 2:38—strictly below three minutes.
- [x] Video explains both what was built and how Codex plus GPT-5.6 were used.
- [x] Final visible GPT-5.6 Sol selection, actual selected intelligence level, fresh generated target, strict validator PASS, review, manifest, and tests are real.
- [x] The preview uses **Choose local JSON** to load the fresh reviewed evidence config and shows PASS; **Load sample** is not used as final proof.
- [x] The preview states **No third-party or model requests**.
- [x] Operator confirmed that the `/feedback` Session ID is in the private Devpost field and nowhere public; its value was never exposed to this task.
- [x] Build Week delta contains the final in-period evidence commit SHA.
- [x] No personal data, credential, `.env`, Session ID, unrelated private screen, notification, or unlicensed music appears.
- [x] Test access remains free and unrestricted through judging.
- [x] Submitted before **2026-07-21 5:00 PM Pacific Time**.

## Optional Devpost plugin

The Devpost Hackathons plugin may be useful as an optional submission helper. It is not required, gives no stated judging advantage, is not a product dependency, and is not integrated into this repository. The Devpost website and Official Rules remain authoritative.
