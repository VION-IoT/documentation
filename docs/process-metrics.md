---
title: Process metrics
description: One observational row per retro round — the quantitative companion to the process journal.
---

# Process metrics

One observational row per retro round, appended by the round itself. This is the quantitative
companion to [`process-journal.md`](process-journal.md): the journal carries what was **felt**
(one-line narratives, written at the moment); this table carries what can be **counted afterwards
from durable artifacts** — git, `gh`, the journal itself. Never from transcripts (they age out) and
never live during work.

**Nothing here is a target. The moment a number becomes one, it stops measuring.** (Anti-Goodhart
clause, inherited from the architecture repo and the sibling repos.) The retro's felt impressions
get checked against this table — deciding what to change remains the retro's job.

No harvest script yet, deliberately — hand-fill a few rounds first; script the columns once they
stop changing.

## Columns and counting rules

- **round** — the retro note (dated file in `docs/retro/`).
- **window** — first..last day covered.
- **merged PRs** — `gh pr list --state merged` in the window.
- **review lines** — new `review` journal entries in the window; **/PR** = review lines ÷ merged PRs.
  No pre-loop baseline exists: retro-0 mined 64 follow-up turns across 10 sessions, but those are
  turns, not corrections, and the two are not comparable. The first row sets the baseline.
- **second asks** — `review` lines marked "(second ask)": things the human had to say twice — each
  is a standing candidate for absorption into the gate, the review check, or `STYLE.md`.
- **escapes** — corrections that reached the human on work that had already passed
  `/vion-code-review`. The loop-quality number: the gate > check > prose ordering is working when
  this falls.
- **source lines** — `source` journal entries: how often the SDK/CLI source contradicted the docs or
  was hard to verify against. This repo documents four other repos, so this is its own signal, and
  a rising count is an argument for a drift check rather than more careful reading.
- **gate catches** — `pnpm run check` and build (dead-link) failures on PR branches in the window:
  violations stopped before any human saw them.
- **journal other · acted** — non-review journal lines added, and total lines the round marked
  acted-on.
- **notes** — anything a number can't say.

| round | window | merged PRs | review lines (/PR) | second asks | escapes | source lines | gate catches | journal other · acted | notes |
| ----- | ------ | ---------- | ------------------ | ----------- | ------- | ------------ | ------------ | --------------------- | ----- |
| [retro-0](retro/2026-08-14-review-mining-round.md) | 2026-04-23..2026-08-14 | 9 (6 docs, 3 infra) | — | — | — | — | — | 1 · 0 | Mining round; loop did not exist yet, so every column but PRs is empty by construction. Taxonomy T1–T11 mined from 64 follow-up turns across 10 sessions, 47/47 quotes verbatim-verified. Baseline for review lines/PR is set by retro-1. |
