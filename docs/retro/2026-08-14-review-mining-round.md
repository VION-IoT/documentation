---
title: Retro-0 — mining the documentation corpus
description: The transcript-mining round that seeded this repo's improvement loop, and the taxonomy it produced.
---

# Retro-0 — mining the documentation corpus

**Date:** 2026-08-14 · **Window:** 2026-04-23 → 2026-08-14 · **Method:** transcript mining

The round that seeded this repo's improvement loop. It exists because this repo had none of the
substrate its sibling repos had grown — no repo-local review, no friction journal, no metrics — and,
unlike them, no review lane of any kind: the one it used to have was deleted (see D2). The taxonomy
below is what [`/vion-code-review`](../../.claude/commands/vion-code-review.md) § 5 runs as checks —
**T1–T10 of it**. T11 is a working agreement rather than a property of a change, so it went to
`CLAUDE.md` § Conventions instead; the skill leaves the number unused and adds one check of its own,
**T12 (correction logged)**, which has no corpus evidence because the journal did not exist yet. One
T-number, one meaning, across both files.

## What was mined

The local Claude Code transcript store for this repo (`~/.claude/projects/C---gh-documentation/`):
**11 session files — 10 prior work sessions**, the eleventh being this round's own session. Human
turns were extracted, harness-injected payloads filtered out, and the **64 follow-up turns** —
everything the user said *after* the opening brief — read as the correction corpus.

The filter was audited rather than trusted: of 933 user-role entries, 849 were tool results, 6 task
notifications and 3 harness meta, leaving **75 human turns** (74 across the prior sessions) with
nothing silently dropped. Every candidate quote was then re-extracted from the raw `.jsonl` and
matched verbatim by substring — **47 of 47 verified**, each anchored to its session id and date.
Quotes reproduced below keep the user's original spelling; four of the 47 (under T7 and T10) are
described rather than quoted, because they name customer and unreleased-product identifiers and this
repo is public — see D8.

Ten sessions split three ways: **seven documentation-authoring** sessions (2026-05-11 → 2026-08-06),
which produced essentially the whole taxonomy, and three infrastructure sessions (2026-04-23 release
pipeline, 2026-04-23 URL rename, 2026-05-15 review-workflow removal) which produced D2 and little
else. Cross-checked against the durable record: 9 merged PRs in the window, 6 of them documentation.

**This window will not be re-openable.** Transcripts age out of `~/.claude/projects/` after weeks;
this round consumed the one corpus that existed. Everything from here is journalled as it happens
([`process-journal.md`](../process-journal.md)) or it is lost — that is the whole argument for the
journal, and it is why a second mining round is not a fallback plan.

## The taxonomy

Eleven shapes, ordered by how often and how expensively they recurred.

**T1 — Verbosity is the default failure.** The loudest by a wide margin: it recurred in five of the
seven authoring sessions and always ended in deletion rather than defence.
> *"while the generated docs look correct, i finde them way too detailed"* (05-15)
> *"generally a bit too verbose. more code, less explanation, not every last feature has to be
> explained in detail"* (06-30) — then, the same session: *"trim sdk pages a bit further"*
> *"generally: more concise."* (07-15)
> *"tune down the verbosity a bit, omit explanation and marketing stuff"* (08-06)

The specific cut is almost always the same one — mechanism and degraded-case behaviour the reader
never acts on: *"the dev will only need to know that we check, not how and what happens in degraded
cases"* (07-10) · *"skip the paragraph, mention that vaidiation is done for common cases"* (07-15).
And a caveat is one sentence: *"valid but a short warning is enough, not a full praragraph"* (07-15).

**T2 — A new topic is not a new page.** Scope inflation at the page level; the same YAGNI shape the
sibling repos found in code.
> *"just becaue it is the topic of the moment it does not mean it deserves an own page and more
> level of detail"* (05-15)
> *"an own page for secrets explaining the reasoning of how it was implemented? no, a small chapter
> with an example in the properties page is enough"* (05-15)
> *"integrator vocabulary cookbook? far too detailed"* → *"i think the cookbook can be omitted
> completely"* (05-15)
> *"there should not be duplication, references instead"* (05-15)

Outcome: of the three pages the 05-13 brief specified, `secrets.md` and
`integrator-vocabulary-cookbook.md` were both cut before merge. Neither exists today.

**T3 — Claims verified against source, not inferred.** The `[blocker]`-producing shape, and the one
most specific to this repo: it documents four other repos and can drift from all of them silently.
> *"are you sure the sdk docs are up to date on your branch? if in doubt look at the source code"* (05-13)
> *"dale test -- --filter Name~Foo: is that true? validate it in code"* (06-30)
> *"dale scenario scaffold: does it really exist?"* (06-30)
> *"the cli may have changed slightly (---default-anme stil exists?) check that"* (05-15)
> *"check if the dale-cli snapsot is still in line with the docs"* (05-11)
> *"Configure is not a public lifecycle hook anymore, don't mention it. Ready is the one"* (07-15)

**T4 — Internal references never ship.**
> *"no RFC 0006 or other rfc references in docs, this is internal"* (06-30)
> *"no dale analyzer ids anywhere"* (05-15)

**T5 — No UI rendering detail.** The SDK docs describe what the author declares, not what the
dashboard draws.
> *"no detailed desciption how ui will render stuff in specific places (e.g. the status indicator
> pills +N), this can change anytime and the user wil see how it is rendered when testing"* (05-15)
> *"if they add a custom one they will see what happens (probably verbatim display in the ui for a
> start but no guarantees)"* (05-15)
> *"don't mention the Logic Editor, ui is independen from the sdk"* (07-15)

**T6 — Current state only; no migration history.**
> *"strip that, we're still pre public. describe the current state only"* (05-15)

**T7 — Examples are invented.** The only shape with a confidentiality edge, which is why the review
skill grades a miss as a blocker.

Two corrections on 2026-07-15, both paraphrased here deliberately: a draft had taken an interface
name straight from a customer's codebase, and elsewhere had used a real vendor's product names as
example values. The user identified each as customer or real-product material and asked for invented
substitutes. **The literal identifiers are not reproduced in this repo** — it is public (see D8), and
the rule is fully legible without them.

A third correction the same day is safe to quote, and shows the other half of the rule — invented
detail still stays unspecific where the specificity teaches nothing:
> *"an EV charging station presents anywhere from one to six charge points depending on its model."
> too specific, why 6 several is good enough"* (07-15)

**T8 — The scope of a claim is exact.** An over-broad statement is as wrong as a false one.
> *"is ambiguous. the property must be in the same logic block"* (07-10)
> *"this is not happening automatically in all cases … don't be specific"* (06-30)
> *"remove the <PackageId> is unique across all integrators limit, it is not specific to
> translations"* (08-06)

**T9 — Type names in prose, brackets in code.**
> *"the paragraphs with attribute brackets look odd, use the type name instead, attribute brackets
> in examples or inline text"* (07-15)
> *"leave MeasuringPoint out of it, not relevant here"* (07-15)

**T10 — Unavailable things are marked, not linked.** Two corrections on 2026-06-30, paraphrased for
the same reason as T7: an unreleased in-house tool had been documented as if available (the user
asked to hide it and recommend the established third-party option instead), and a hardware image
that did not exist yet was linked (the user asked for "coming soon" in place of the link).

**T11 — Branch and PR discipline** (process, not page review). Consistent across sessions:
*"on branch, do not commit unitil i have reviewed"* (07-10) · *"go a s far as you can, just before
commiting all at once"* (05-13) · *"first find them, then i'll tell you the new ones, you fix tem on
a branch"* (04-23) · *"merge remote main in, branch is out of date with it currently"* (08-06).

## Decisions

**D1 — The style guide absorbs what the corrections taught, and the gate absorbs what is
decidable.** `STYLE.md` had already taken on part of this once — its *Economy* section and the
"heading must describe everything under it" rule are visibly the 2026-08-06 feedback, added when the
user asked: *"please have a look at STYLE.md and nudge it in the direction my feedback steered
you"*. That pass covered T1 and T8 partially and stopped there. T2, T3, T5, T6, T7, T9 and T10 had
no home in the repo at all. They do now.

**D2 — `/vion-code-review` lands here, carrying T1–T10 (plus T12) — and it replaces nothing, because the
review lane was empty.** This repo *had* an automated reviewer: `.github/workflows/claude-review.yml`
ran Claude against changed pages on every PR. It was deleted on 2026-05-15 (commit `0acc072`) with
the reason *"disable the docs review action (or remove if that is not possible), it fails all the
time"*. Nothing replaced it, so from 2026-05-15 to this round the repo had **no review of any kind**.

Removing it was right, and dashboard reached the same conclusion independently at its own retro-0:
a CI reviewer's hand-inlined rule digest drifts from the style guide by construction. Review belongs
before the PR, in a session where the doc graph is live. What was missing was the replacement.

The gap this closes is concrete and was silent:
[`/fix`](../../../architecture/.claude/commands/fix.md) conditions a brief's definition-of-done on
the repo *having* such a command — "where the repo defines a pre-PR review … the brief requires
running it before the REPORT, dispatched as a fresh-context read-only subagent". Every brief sent to
this repo has skipped that step, while the equivalent brief to mesh, dashboard or cloud-api did not.

**D3 — The mechanically decidable rules become a CI gate, not review checks.** `pnpm run check`
([`scripts/check-docs.mjs`](../../scripts/check-docs.mjs)) enforces frontmatter, heading depth, fence
language tags, relative links, and the T4/T7 literal patterns (RFC numbers, analyzer IDs, the
customer/product denylist). It runs before `pnpm build` in CI. The review skill is explicitly told to
**ignore** anything the gate catches, so the two do not duplicate.

**Enforcement ladder, applied honestly:** a rule goes to the gate if a regex can decide it, to
`/vion-code-review` if it needs judgment, and to `STYLE.md` if it needs a human to have read it. T1
("too verbose") can never be a gate. T4's literal patterns always should have been.

The ladder has already paid here once, before this round: the `promql` / `logql` syntax-highlighting
warnings the user hit on 2026-06-30 — *"The language 'promql' is not loaded, falling back to 'txt'
for syntax highlighting. need a plugin? fallback to something similar?"* — were fixed in
`config.ts` by aliasing both to `sql`, not documented as a gotcha. That is the pattern.

**D4 — `.gitignore` gets the decision-0113 carve-out.** The file ignored `.claude/` outright (twice
— the block was duplicated). Under that rule the `/vion-code-review` command this round adds would
have been **silently untracked**: present on one machine, invisible to every colleague, clone and
future session, which is the exact failure the command exists to prevent. `.claude/commands/` is now
negated; harness state stays ignored.

**D5 — The generated API reference is named as non-conforming, not waived, and not "fixed" here.**
`docs/api-reference/index.md` carries **19 RFC references, 21 analyzer-ID occurrences (10 distinct,
on 12 lines) and 1 Logic Editor
mention** — T4 and T5 violations in the hundreds of lines. Every one of the 34 hand-written pages is
clean of all three (verified by grep, with a positive control proving the file set matches).

The conventions stand as written; the generated page is the non-conforming code. It is exempt from
the gate for one reason only: it is overwritten by the dale repo's CI on every SDK release
(`CLAUDE.md` § Auto-Generated Content), so a fix made here cannot survive. The fix belongs in the
generator, upstream. Recorded here so the exemption is a known debt with an owner rather than a
silent hole in the gate.

**D6 — Machine-local memory needed no migration.** This repo's memory directory was already cleared
on 2026-08-12 and holds only the index and the bar it sets. Verified, not assumed. The personal
global `CLAUDE.md` was checked against the same test — tooling is personal, procedure is team
knowledge — and already complies: it keeps one developer's cluster-switching module and points at
`architecture/runbooks/cluster-database-access.md` for the procedure.

**D7 — No `/retro` command yet.** The architecture repo, dashboard and cloud-api all ran manual
rounds before freezing one, on the grounds that a command records which parts of a calibration are
invariant, and one round cannot tell. Copying an unproven command into a fourth repo is the T2
finding in process clothing. Revisit after retro-1.

**D8 — This repo is public, and the substrate had to be written for that.** Caught by the first real
`/vion-code-review` run on this PR, which is the loop working on its first use. `documentation` and
`dale-sdk` are **public**; `mesh`, `dashboard`, `cloud-api`, `architecture` and `dale` — every repo
this substrate pattern was imported from — are **private**. The pattern arrived carrying an
assumption that does not hold here.

The first draft got the control wrong in an instructive way: it added `srcExclude` so the retro would
not render on the site, with a comment saying that stopped customer names publishing. It does not.
`srcExclude` governs the VitePress build; the exposure is `github.com` and `git clone`, which no site
config touches. **"Not rendered" is not "not published"** — that distinction is now stated in
`CLAUDE.md` § Repo Scope, because getting it wrong cost a blocker.

Consequences, applied:

- Four quotes under T7 and T10 are described instead of reproduced. They carry no evidentiary weight
  the description doesn't — the rule is "never a customer's type name", and the literal name is not
  what makes it legible.
- The name denylist keeps its literal entries in `scripts/check-docs.mjs`, deliberately. A denylist
  cannot match what it does not name, and the surface it protects — a published documentation page —
  is far more exposed than four tokens in a build script. Accepted with the trade named rather than
  waived silently.
- The substrate carve-out no longer exempts the name rule: `retro/` and the journal are gated for
  customer names like any published page. Structure rules still don't apply to them.

**Left open, deliberately:** whether internal process substrate belongs in a public repo at all. The
journal will accumulate brief failures, infrastructure detail and customer-adjacent friction for as
long as it works. Decision 0113 mandates per-repo substrate and was reasoned entirely over private
repos; this is a case it did not consider, and amending it is `/decision` work in the architecture
repo, not a call to make inside a documentation PR. Until then the rule is the one above: write every
substrate line as if a stranger will read it, because one can.

## Deliberately not done

- **Resurrecting a CI review agent.** See D2 — it was removed for cause, and the replacement belongs
  in-session.
- **A drift check against the SDK source.** T3 is the most expensive shape and the most tempting to
  automate, but a gate that re-derives every documented CLI flag and attribute from `../dale-sdk` is
  a real build dependency on a sibling repo. The `source` journal line type exists to measure whether
  it is worth it; retro-1 decides with data instead of a guess.
- **Rewriting pages to match the new `STYLE.md` rules.** The rules are new; the back-catalogue was
  written without them. Pages get brought into line when they are next touched, which is also when
  someone has a reason to read them.
- **A metrics harvest script.** `process-metrics.md` gets hand-filled for a few rounds first — script
  the columns once they stop changing.

## Next round

Trigger: ~6 weeks, or when `review` lines pile up in [`../process-journal.md`](../process-journal.md).
Read everything below the acted-on marker in one sitting, plus the PR history since this note, and
promote each recurrence down the ladder — **CI gate > `/vion-code-review` check > `STYLE.md` prose**.
Mechanical fixes land in the retro PR; judgment calls get a recommendation and the user decides. Move
the marker, append a row to [`../process-metrics.md`](../process-metrics.md), and record the round as
a dated note here.

The open question this round cannot answer: **which of T1–T10 actually fire.** They are mined from
what the user said, not from what the review skill catches. Retro-1 has the first real evidence of
that, from journal lines naming T-numbers.
