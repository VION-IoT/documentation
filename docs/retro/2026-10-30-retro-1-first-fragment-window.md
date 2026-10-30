---
title: Retro-1 — the first fragment window
description: The first journal-driven retro, over the per-branch fragments from 2026-09-13 to 2026-10-24.
---

# Retro-1 — the first fragment window

Window 2026-09-13 → 2026-10-24: 43 entries in 9 fragments (15 review, 14 brief, 8 gate, 5 decision,
1 manual); no extra paths; 17 merged bodies, #20–#36, of 31 merged. Recount correction: #30 cites
CHK-01, CHK-07 and CHK-12 only by renaming them from T-numbers, so it is no firing.

## Clusters

| cluster | count | pointers | outcome |
|---|---|---|---|
| Brief written without checking this repo or its tooling | 11 | journal-2026-09-13-to-2026-10-24 (F1:1, F1:2, F1:4, F1:8, F2:4, F4:2, F9:1, F9:3), #26, #30, #35 | routed to the architecture repo through the REPORT's Friction |
| Brief or upstream states platform behaviour wrongly | 6 | F2:3, F2:11, F5:7, F6:1, #34, #36 | left: pushback with evidence worked each time |
| Claim scope wrong on protocol pages (CHK-08) | 6 | F2:5, F2:6, F2:13–15, #33 | recurred; CHK-08 kept |
| Harness edit left nearby text contradicting it | 5 | F1:5–7, F1:9, #23 | left: branch review caught each |
| Pages drift from their source; nothing compiles the samples (CHK-03) | 4 | F5:1, F5:3, F5:9, #20 | recurred; gate deferred |
| Too much detail, or the same thing on two pages (CHK-01/02) | 4 | F2:7, F2:9, F5:11, #31 | recurred; CHK-01/02 kept |
| Unshipped things named as if available (CHK-10) | 4 | F2:2, F2:8, F2:10, #24 | recurred; CHK-10 kept |
| CLAUDE.md restatements and byte budget | 4 | F3:1, F3:2, F4:3, #29 | left: decisions, not friction |
| Host toolchain outside `engines` | 3 | F2:1, F7:1, F8:1 | left: host now Node 22.22.2, pnpm 10.22.0; #35 installed natively |
| Reason dropped as unverifiable | 3 | F7:3, F7:5, #32 | left: one event |
| Pre-PR review skipped | 3 | #21, #22, #27 | left: every body from #29 on records a review |

F1–F9 are the fragments in file-name order, each marked by a comment in
[`journal-2026-09-13-to-2026-10-24.md`](journal-2026-09-13-to-2026-10-24.md); `Fn:line` counts from it.

## Checks by citing bodies

`grep -lw <id> bodies/*.md`; firings exclude #30's rename.

- CHK-01: #30, #31 — one firing
- CHK-02: none
- CHK-03: #31, #34
- CHK-04, CHK-05, CHK-06: none
- CHK-07: #30 — no firing
- CHK-08: #32, #34, #35
- CHK-09, CHK-10: none
- CHK-11: none — pruned
- CHK-12: #30 — no firing

Retro-0 gave no per-check counts, so no check is pruned for zero citations this round.

## Landings, prunes, what was left

- **Landings:** none in this repo. The largest cluster's owner is the brief writer in the
  architecture repo; it is routed there.
- **Pruned:** the twelve `(was Tn)` aliases in `docs/review-checks.md`; the ids count from this
  round. CHK-11 "Correction logged": no citing body, no window support, and retro-0 recorded none;
  its rule is the journal skill's, triggered from `CLAUDE.md`. CHK-12 keeps its number; 11 stays retired, and the next new
  check is CHK-13.
- **Kept against the recurrence rule:** CHK-01/02, CHK-08, CHK-10 and the review lane. Their
  recurrences are the checks firing before merge — `(self)` branch-review entries and review notes
  fixed in #31, #32, #34, #35 — not escapes.
- **Deferred:** a gate compiling the pages' C# samples against the SDK, CHK-03's next rung. Worth
  doing, not now. Open when taken: opt-in marker or every fence; pinned SDK package or the sibling
  checkout.
- **Routed with the brief cluster:** journal hygiene. About 13 entries log findings the agent found
  and fixed, or carry fixes and reasoning, which the grammar bars; that inflates the scope-claim and
  harness-edit clusters.
- **Singletons:** the real-world-name denylist is word-bounded and missed a class-name spelling
  (F5:5); an open question raised only in the pull request body (F8:3); #28 merged with the empty
  template.
- Retro-0's pointers to `process-journal.md`, `process-metrics.md` and the acted-on marker are
  stale; a record is history and stays as written.

## For the next round

- Does the sample drift recur once the deferred gate is still absent, and does that change the call?
- Which checks are at zero again? Three counted rounds at zero prune one; this is the first.
- Did the routed brief cluster shrink after the architecture repo took it?
- Does the window still carry self-found, self-fixed findings as entries?
