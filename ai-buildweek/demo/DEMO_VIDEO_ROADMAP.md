# Demo video production roadmap

## The strategic decision

Use **this repository and the bundled synthetic school SaaS scenario as the primary demo**. Do not make an unrelated project the hero. ZeroKit itself is the submitted product; the school scenario is the clearest proof because it combines RBAC, navigation, fields, billing visibility, adapter mapping, localization, and a meaningful privacy boundary without using real student data.

Use **PocketBase as a short open-source compatibility proof**, not as the main product. PocketBase is an MIT-licensed open-source backend with a small local footprint and a documented paginated record envelope. Its `items/totalItems` response differs visibly from ZeroKit's `users/total` contract, making the adapter value understandable in seconds.

This structure answers two judge questions cleanly:

1. “Does the submitted product work?” — show ZeroKit end to end.
2. “Does this work beyond a handcrafted JSON file?” — show the tested PocketBase boundary.

## Can an open-source project be used?

Yes. OpenAI's Build Week page explicitly allows starting from scratch or building on an existing project, and the challenge accepts apps, websites, agents, developer tools, and workflows. Respect the upstream license and attribution, and be precise about what belongs to whom.

For PocketBase:

- Say “PocketBase is the open-source backend used for an adapter proof.”
- Do not imply PocketBase is part of ZeroKit or endorsed the project.
- Do not copy its branding into the ZeroKit identity.
- Link to its repository/docs in the written submission.
- State that the checked-in fixture mirrors its documented list envelope; it is not a live customer database.
- PocketBase is pre-1.0 and warns that full backward compatibility is not guaranteed, so pin the version if recording a live local instance.

## Recommended video format

- Language: English narration, English UI during the main path, optional Turkish toggle as a two-second proof.
- Captions: burned-in English captions plus platform captions if available.
- Target duration: **2:50–2:58** until Devpost publishes a different hard limit.
- Capture: 1920×1080, 30 fps, H.264, readable 18–22 px terminal/editor text.
- Audio: external or wired microphone, mono voice centered, peak around -6 dB, light noise reduction only.
- Cursor: visible, normal size, no rapid circles; move only when the narration reaches the target.
- Editing: straight cuts, two or three short callouts, no long logo animation, no background music that competes with speech.

## P0 readiness gate — do not record before this passes

The audit machine reached the OpenAI endpoint but received `429 insufficient_quota`. Fix account quota first. A video that skips the actual model generation would preserve the static-demo weakness.

Run these commands in a fresh terminal:

```bash
npm ci
npm run build
npm run test:unit
npm run test:browser
npm run ai:generate -- ai-buildweek/examples/school-saas.input.md --dry-run
npm run ai:generate -- ai-buildweek/examples/school-saas.input.md ai-buildweek/evidence/school-saas.gpt-5.6.config.json
node ai-buildweek/scripts/validate-config.mjs ai-buildweek/evidence/school-saas.gpt-5.6.config.json
npm run demo:pocketbase
```

Pass conditions:

- dry run says `store: false`, zero blockers, and no network call;
- live run returns PASS and creates config plus manifest;
- manifest says requested `gpt-5.6`, returned model, `storage_requested: false`, valid config, and zero blocking findings;
- output has no real identity, host, credential, record, or unsupported compatibility claim;
- unit/browser/config/PocketBase checks pass;
- `git status` contains only intentional evidence/doc changes.

If live generation fails, **do not fake it and do not record an old terminal line as if it were current**. Fix quota or network access, rerun, and record after a real pass.

## Day-before recording setup

### 1. Prepare a clean judge clone

Use a new folder so the path and commands match what judges can reproduce. Confirm the remote and commit SHA. Do not record from a workspace containing unrelated private repositories.

### 2. Prepare the API environment safely

- Set `OPENAI_API_KEY` before screen recording starts.
- Clear the terminal after setting it.
- Do not run environment listing commands.
- Do not keep `.env` open in the editor.
- Do not paste a key on camera.
- Use the exact `gpt-5.6` default unless a challenge rule later requires a snapshot.

### 3. Prepare four windows/tabs

1. Editor: `school-saas.input.md`, generated config, manifest, PocketBase report.
2. Terminal: repository root, large font, short prompt, no personal shell history.
3. Browser: `http://127.0.0.1:4173`, English/dark, 100% zoom.
4. README or one clean architecture slide: four registries and privacy boundary.

Order the editor tabs before recording; searching through the tree wastes time and exposes paths.

### 4. Prepare the local app

Run `npm run dev` in a separate terminal not shown in the main recording. Load the school scenario once, verify there are no console errors, then reset to the opening view.

### 5. Prepare truthful API timing

Record the real generation separately as one uninterrupted clip. If it takes longer than the allocated video time, use a speed-up or jump cut and overlay “real GPT-5.6 call — elapsed 00:XX.” Keep the first and final terminal states visible. Do not imply the cut is real-time.

## Exact 2:55 shot plan

| Time | Screen | Action | Message the judge must retain |
| --- | --- | --- | --- |
| 0:00–0:12 | Finished ZeroKit preview | Show enabled panels, roles, endpoint count; one quick school/agency switch | This is a working product outcome, not a prompt demo. |
| 0:12–0:27 | School input | Highlight roles, panels, synthetic endpoint summary, “no student records” | The input is a sanitized architecture contract. |
| 0:27–0:52 | Terminal generation clip | Run the live `ai:generate` command; cut/speed honestly; land on PASS | GPT-5.6 is in the executable product workflow. |
| 0:52–1:07 | Manifest + generated JSON | Highlight returned model, `storage_requested:false`, hashes, local validation | The run is auditable without persisting secrets or reasoning. |
| 1:07–1:25 | Terminal + preview paste | Validate generated JSON, paste/load it, press Validate | AI output is gated by deterministic code and human review. |
| 1:25–1:48 | Preview | Show enabled/hidden panel, RBAC, field, endpoint and privacy sections; toggle TR/light briefly | The result is coherent, usable, responsive, and bilingual. |
| 1:48–2:10 | PocketBase proof | Show fixture keys `items/totalItems`, run `npm run demo:pocketbase`, show `users/total` PASS | Routes can vary, but payload compatibility is explicit and tested. |
| 2:10–2:28 | Privacy boundary | Show guard dry-run result and “never send” list; mention same-origin browser | Customer records and runtime authorization remain outside the model boundary. |
| 2:28–2:45 | Test evidence | Show 18 unit tests, browser PASS, three scenario validations | Genuine effort and non-trivial implementation are reproducible. |
| 2:45–2:55 | Final product screen | School → healthcare → agency cards, then title/URL | One sanitized description becomes a reviewable contract, adapter plan, and gates. |

## Narration spine

Use conversational delivery, not a feature inventory:

> “Every customized SaaS admin starts with the same risky decisions: which surfaces exist, who can do what, and whether the customer backend actually matches. ZeroKit gives GPT-5.6 a sanitized architecture brief—not customer records—and produces a reviewable control-plane contract. Before the call, a local guard blocks common secrets and real-looking emails. After the call, deterministic validation and human review gate the result. The browser preview makes panels, RBAC, fields, routes, and privacy decisions visible. And because matching URLs do not mean matching payloads, this PocketBase proof converts its documented items/totalItems envelope into ZeroKit's strict users/total contract and fails closed on malformed input. The result is faster first-pass architecture without putting the customer data plane inside the model loop.”

Do not say “instant,” “production-ready,” “works with every backend,” “zero dependencies,” or “no data can ever leak.”

## PocketBase: two demo levels

### Recommended for the three-minute submission: deterministic fixture proof

Use the checked-in synthetic response:

```bash
npm run demo:pocketbase
```

Advantages: no download, no network, deterministic output, fast reset, and judges can reproduce it immediately. The limitation is explicit: it proves one documented response boundary, not a live PocketBase deployment.

### Optional longer technical demo: local PocketBase instance

Only add this to a longer companion video or README GIF:

1. Download a pinned PocketBase release from the official repository.
2. Run it on `127.0.0.1:8090` with a disposable local data directory.
3. Create a base collection named `school_users` with `display_name`, `role`, `account_status`, `campus`, `department`, and `support_status`.
4. Add only the two synthetic records in the checked-in fixture.
5. Configure collection list/view rules deliberately; never open a real user collection for the demo.
6. Call `GET /api/collections/school_users/records?page=1&perPage=30`.
7. Save only the synthetic response and feed it to the adapter CLI.
8. Show the exact `items → users` and `totalItems → total` mapping.
9. Delete the disposable data directory after recording.

Do not spend the main submission video creating the collection in the dashboard. It makes PocketBase look like the product and hides GPT-5.6.

## What to show in the generated manifest

Zoom only to these fields:

- `response_id`
- `model_requested`
- `model_returned`
- `storage_requested`
- `hashes.requirements_sha256`
- `hashes.output_sha256`
- `privacy_guard.blocking_findings`
- `validation.valid`
- `usage`

Do not show the API key, full environment, unrelated request logs, or model reasoning. The manifest intentionally does not contain them.

## Failure and recovery plan

| Failure during capture | Recovery |
| --- | --- |
| API 429 / quota | Stop. Add quota, wait for account propagation, rerun preflight/live call. Never substitute a fake PASS. |
| API latency | Keep the real clip, cut or accelerate with elapsed-time overlay. |
| Model output fails validation | Keep the failure for internal debugging, refine sanitized requirements/prompt, rerun; record only the reviewed passing run. Do not silently edit the model output and call it raw. |
| Privacy guard blocks input | Treat as success of the guard; replace the artifact with a sanitized version and rerun. Never bypass the guard for the demo. |
| Browser state is stale | Hard refresh, load school scenario, reset English/dark before restarting the take. |
| PocketBase proof fails | Revert to the checked-in fixture and rerun unit tests; do not troubleshoot a live database on camera. |
| Notification/OS popup | Record with notifications and chat clients disabled; restart the take if private content appears. |

## Visual and editing rules

- Open with the result, not the README.
- Keep one idea per shot and one highlighted region at a time.
- Use two recurring labels: “AI design plane” and “customer data plane.”
- Use green only for verified PASS, amber for human review, red for blocked/invalid.
- Crop personal Windows account paths where possible.
- Blur nothing that should have been removed before capture; blurring keys is not a safe workflow.
- Add a small persistent repository URL in the lower corner after 0:12.
- Export once, watch the final file at normal speed, and verify every terminal line is legible on a laptop-sized player.

## Retake criteria

Discard and redo the take if any of these occur:

- key, token, personal email, private repository, or customer-like record appears;
- generated artifact shown on screen is not the artifact referenced by the manifest hash;
- a command reports FAIL while narration says PASS;
- the API generation is represented as live when it was prerecorded without disclosure;
- the video claims general backend compatibility from the one PocketBase adapter;
- the main outcome is not visible in the first 15 seconds;
- total duration exceeds the published Devpost limit.

## Submission package checklist

- Public GitHub repository points to the exact tested commit.
- README quick start works in a clean clone.
- Demo video link is public/unlisted and playable without login.
- Devpost description uses the narrow supported one-sentence claim.
- Technologies list includes GPT-5.6, Codex, Responses API, Node.js, browser APIs, and PocketBase only as adapter proof.
- Repository, video, and Devpost use the same project name and numbers.
- Live preview URL is included if deployed.
- License and private-donor boundary remain explicit.
- No secrets exist in Git history, video frames, captions, or description.
- Exact Devpost requirements are rechecked on submission day because the challenge page stated that full details would be published when submissions open.

## Recommended companion assets

1. 2:55 main judging video using the shot plan above.
2. 20–30 second silent GIF: input → validate → preview.
3. Optional 5–7 minute technical walkthrough: API request design, privacy guard tests, PocketBase adapter, browser smoke architecture.
4. One architecture image with a hard boundary between GPT-5.6 design inputs and customer runtime data.

The main video should stand alone. Companion assets deepen confidence; they must not carry facts missing from the main submission.
