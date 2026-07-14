# Live demo and no-rebuild judge path

The browser preview is a static site built into `dist/`. GitHub Pages can host it for free, so judges can inspect scenarios, validation, panels, RBAC, fields, endpoints, language, and theme without cloning or rebuilding the repository.

Target URL after the repository owner enables **GitHub Actions** as the Pages source:

<https://zyganali-glitch.github.io/zerokit-ai-control-plane/>

Do not call that URL live until an anonymous browser check succeeds. The repository workflow at `.github/workflows/pages.yml` builds and deploys `dist/` on every push to `main`.

## Owner setup — one-time GitHub click path

1. Open <https://github.com/zyganali-glitch/zerokit-ai-control-plane> while signed in.
2. Click **Settings** in the repository's top navigation. If it is hidden, open the `…` menu and choose **Settings**.
3. In the left sidebar, click **Pages** under **Code and automation**.
4. Under **Build and deployment**, find **Source**.
5. Choose **GitHub Actions**.
6. Return to the repository and click **Actions**.
7. Open **Deploy static judging demo to GitHub Pages** and wait for both `build` and `deploy` to show green check marks.
8. Open the target URL in a private/incognito browser window.
9. Confirm that School SaaS loads with a visible PASS state, then test one language or theme switch.

If GitHub shows no workflow yet, first push `.github/workflows/pages.yml` to `main`. If the workflow initially failed because Pages was not enabled, complete the steps above and use **Run workflow** from its Actions page.

## Local fallback

The local workflow remains the source of truth for Codex task preparation, validation, manifest creation, adapter evidence, and completion tests. Judges can also use:

```bash
npm ci
npm run build
npm run dev
```

Then open <http://127.0.0.1:4173>. On Windows PowerShell, use `npm.cmd` instead of `npm` if script execution is blocked.

The live static page never performs the Codex generation itself and does not send pasted configuration to a model. It is the no-rebuild product preview; the repository contains the reproducible generation and validation path.
