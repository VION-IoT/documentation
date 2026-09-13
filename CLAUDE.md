> **Cross-repo work**: this repo is part of the VION platform.
> Architecture state, decisions, and cross-repo specs live in [`../architecture`](https://github.com/VION-IoT/architecture).
> Clone it: `git clone git@github.com:VION-IoT/architecture.git ../architecture`
> Before planning a feature with scope ≥ 2 repos, read the relevant `architecture/systems/*.md`
> and run `/spec <slug> <repos>` from the architecture repo.

# CLAUDE.md — VION Documentation

## Project

VitePress documentation site for the VION Edge Operations Platform. Hosted on AKS via Docker/nginx.

## Repo Scope

**This repository is public** (source-available, Apache 2.0 — see [CONTRIBUTING.md](CONTRIBUTING.md)).
Of the VION repos, only this one and `dale-sdk` are; `mesh`, `dashboard`, `cloud-api`, `dale` and
`architecture` are all private, so a convention imported from them does not carry their privacy
assumption with it.

**"Not rendered" is not "not published."** `srcExclude` keeps a file off the site; it does nothing
about `github.com` or `git clone`. Anything committed here is public regardless of whether VitePress
builds it — including the process journal and retro notes.

Never commit a customer's identifiers, a real vendor's product or model names, unreleased VION
product names, credentials, or internal infrastructure detail — in **any** file, published or not.
Describe the thing instead; a rule reads fine without the name. `pnpm check` carries a denylist for
the known cases and applies it to the substrate too.

## Working agreement

### Lanes

At the start of a task, answer two questions out loud: is the change local? is a design point open?

- **Fix-sized** — local, nothing open: branch, commit, review, pull request. No document. A change
  that turns out not to be local stops and says so, and becomes feature-sized.
- **Feature-sized** — a change doc first, in `docs/changes/`. Ratified before code when a question
  in it is open. Archived in the pull request that lands it.

### STOPs

- A STOP is named up front — by the brief, by an open question in the change doc, or by the lane
  answer — and there is no other. With none named, the human review is on the pull request.
- A STOP is a `partial` REPORT with a question in it.
- A decision nobody named is surfaced, not taken. A hedge in a brief is a STOP when it fails.
- Scope does not widen on its own: a design or naming question is answered with options and changes
  nothing until the human chooses; work nobody asked for is proposed, not produced.
- A question from the human is a question, not an instruction.
- Anything committed after a `done` REPORT needs a new REPORT.
- A request that breaks a convention of this repo is pushed back on before complying, naming the
  convention.
- Verification only a human can do is not a STOP: it is written as "not run, routes to a human" under
  the pull request's Verification.

### Communication

- Say what was run, not that it worked.
- A count is pasted with the command that produced it.
- Expand an initialism the first time it is used.
- Promise no notification that cannot be subscribed to.
- A finding cites the line, or says it is inferred.

### Never

- Push to or commit on the default branch.
- Force-push.
- Delete a remote branch.
- Merge a pull request.
- Write to Jira without saying so first.
- Paste a secret into chat.

## Skills in this repo

`.claude/settings.json` enables `vion-git` and `vion-improve` from the `vion` marketplace in the
sibling `../architecture` checkout.

| moment | skill |
|---|---|
| starting work on a change | `/vion-git:branch` |
| a unit of work lands — a task, an acceptance criterion, a fixed review finding | `/vion-git:commit` |
| the branch is ready for a pull request | `/vion-improve:codify`, then `/vion-git:pr` |
| codify reports the journal's live window past 40 entries | `/vion-improve:retro` |

### Pre-PR obligations

In this order:

1. `pnpm check`
2. `pnpm build`
3. `/vion-improve:codify`

## Commands

```bash
pnpm dev              # Dev server at localhost:5173
pnpm check            # Style gate — the machine-checkable subset of docs/STYLE.md
pnpm build            # Production build (fails on dead links)
```

`pnpm check` runs in CI before the build. Run it before opening a PR; it is faster than the build
and catches the rules that otherwise cost a review round.

## Documentation Style

**Read [docs/STYLE.md](docs/STYLE.md) before writing or editing any documentation page.** It defines terminology, page structure, tone, and formatting rules. Every change must conform to the style guide.

Key rules:
- "logic block" (lowercase, two words in prose)
- Code examples always preceded by explanatory text
- Max heading depth: h3
- Tables for parameters/options, never three-column with "Required"
- VitePress containers (:::tip, :::warning) used sparingly

## Architecture

- `docs/.vitepress/config.ts` — site config, nav, sidebar, theme, and `srcExclude` (what stays off
  the public site)
- `docs/` — all markdown pages
- `docs/STYLE.md` — documentation style guide
- `scripts/check-docs.mjs` — the style gate behind `pnpm check`
- `Dockerfile` + `nginx/` — production hosting

**Not everything under `docs/` is published.** The style guide and the process substrate below are
excluded from the build via `srcExclude`. Anything added there that should stay internal must be
added to that list — `pnpm check` fails if the list goes missing entirely.

## Pre-PR Review

**Before opening a PR, run `/vion-git:review`.** It reviews the change against `STYLE.md` and
[`docs/review-checks.md`](docs/review-checks.md), the findings taxonomy mined from this repo's own
history — verbosity, unverified SDK claims, leaked internal or customer material.

This is the repo's definition of done, and `/fix` and `/implement` briefs from the architecture repo
condition theirs on it.

## Process Substrate

The improvement loop, tracked here per architecture decision 0113. All of it is public
(§ Repo Scope).

- [`docs/process-journal.md`](docs/process-journal.md) — friction log, in the grammar its header
  states.
- [`docs/review-checks.md`](docs/review-checks.md) — the checks `/vion-git:review` runs.
- [`docs/changes/`](docs/changes/) — change docs for feature-sized work, shaped by `_template.md`.
- [`docs/retro/`](docs/retro/) — dated retro notes and archived journal windows. [Retro-0](docs/retro/2026-08-14-review-mining-round.md)
  mined the transcript corpus that produced the review taxonomy; that corpus has since aged out, so
  the journal is now the only capture.

## Auto-Generated Content

- `docs/api-reference/index.md` — generated by Dale repo CI, do NOT edit manually
- Dale repo pushes updates via `DOCS_REPO_PAT` secret on SDK releases
- It is **exempt from `pnpm check`** because a fix made here is overwritten on the next SDK release.
  It currently carries RFC references and analyzer IDs that the style guide bans; the conventions
  stand and the page is the non-conforming one. Fixes belong in the generator, upstream in the dale
  repo. See [retro-0 D5](docs/retro/2026-08-14-review-mining-round.md).

## Diagrams (Mermaid)

- Use `classDef` for styling, not inline `style` per node
- Three semantic classes: `light` (developer/edge), `dark` (cloud/platform), `muted` (neutral)
- Theme config in `docs/.vitepress/config.ts` → `mermaid.themeVariables` sets colors globally
- CSS overrides in `vion-overrides.css` handle rounded corners, label overflow, edge label transparency
- Keep node labels short (single line) — multiline `<br/>` works but `<b>`/`<small>` cause clipping
- Subgraph labels clip easily — CSS `overflow: visible` fix is applied globally

## Environment URLs

Cloud API and auth have moved to `vion.swiss`:

- Production Cloud API: `https://api.vion.swiss` (Scalar at `/scalar/`)
- Test Cloud API: `https://api.test.vion.swiss`
- Production auth (Keycloak): `https://auth.vion.swiss/realms/vion`
- Test auth: `https://auth.test.vion.swiss/realms/vion`

- Dashboard: `https://dashboard.vion.swiss/`
- Dashboard onboarding: `https://dashboard.vion.swiss/#/onboarding`

Only `test` and `production` environments exist — `staging` is no longer a named environment in the Dale CLI.

## Conventions

- **Verify every claim against the source, per claim, not per page.** This repo documents four other
  repos and drifts from them silently. CLI and SDK both live in `../dale-sdk` (`dale <command> -h`,
  and the compiled `examples/` are the best reference); `../dale` is the runtime only. Also
  `../cloud-api` and `../mesh`. A confident wrong sentence is worse than a missing one — see
  [STYLE.md § Accuracy](docs/STYLE.md).
- Examples use invented names only — never a customer's type, never a real product
- All pages must have frontmatter with `title` and `description`
- `pnpm check` and `pnpm build` must pass — style gate and dead links
- Work on a branch and open a PR; do not commit to `main` and do not merge without being asked
