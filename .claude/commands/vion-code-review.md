---
description: Adversarially review a documentation change (uncommitted, branch, or PR) against this repo's style guide and the lead's known findings taxonomy, and a spec or brief if one is given
argument-hint: [uncommitted|branch[:base]|pr[:N]] [spec-path] [notes]
---

Another agent produced the change under review. You did **not** write it, and you are not here to
rewrite it — find where it diverges from what it was supposed to do, or from this repo's
conventions, and report that. Do not edit, commit, stage, or post anything to a PR.

This repo ships prose, so the dominant failure is not a broken build — it is a page that is
**correct and too long**, or **confidently wrong about the SDK**. Weight the review accordingly.

## 1. Resolve what to review

Look at the first argument:

- omitted, or `uncommitted` → the uncommitted working tree of whatever branch you're on: `git diff HEAD`
- `branch` → everything this branch adds relative to its base (default `main`), **including**
  uncommitted work. Compute it from the fork point so the base branch's own later commits don't
  leak in: diff from `git merge-base <base> HEAD` to the working tree. Override with `branch:<base>`.
- `pr:<N>` → fetch that PR's diff read-only with `gh pr diff <N>` and review it here. Never comment on it.
- `pr` → **the PR this branch is on**: resolve it with `gh pr view --json number,url`, then proceed
  as `pr:<N>`. If the branch has no PR, say so and fall back to `branch`.

If the first argument is a path or prose rather than one of those keywords, treat the scope as
`uncommitted` — **except** when the prose plainly names a PR ("this pr", "the pr"), which means `pr`.
On a fully-pushed branch `uncommitted` is an empty diff, so following the literal mapping would
report "no findings" on an unreviewed change; say which scope you resolved before reporting anything.

## 2. Intent

If a spec or brief path was given (the next argument that looks like a path): read it, treat it as
the statement of intent, and focus only on the documentation section. Treat any remaining text as
`notes` — decisions the user explicitly set ("keep it to one page", "don't mention the editor").
Check the change against both.

If **no** path was given: skip intent-conformance entirely. Review only against conventions and
general quality, and say so at the top of your findings so the coverage gap is explicit.

## 3. Rubric

Read [`docs/STYLE.md`](../../docs/STYLE.md) in full — it is the rulebook, and every `[convention]`
finding quotes a line from it. Read [`CLAUDE.md`](../../CLAUDE.md) for repo scope and the
auto-generated carve-out.

The machine baseline is `pnpm run check` (the mechanically checkable subset of STYLE.md) and
`pnpm build` (dead links). **Ignore anything those two would catch** — no findings about missing
frontmatter, h4 headings, untagged fences, relative links, RFC references, analyzer IDs, or the
name denylist. They are gated in CI; re-reporting them is noise. Your job is the part no gate can
decide.

## 4. Review

Read enough of the surrounding page — and the pages it links to — to judge each change in context;
never review a hunk blind. A page can only be judged too long against what the reader needs, so
skim the whole page even when the diff is small. Report findings ranked by severity:

- **[blocker]** — factually wrong about the SDK, CLI, or platform; a broken instruction; a leak of
  customer or internal material
- **[convention]** — violates a rule in `STYLE.md`; quote the rule
- **[judgment]** — you would have written it differently; list these last, one line each

For each finding give `file:line`, the concrete problem (not a vague smell), and the specific rule
or taxonomy check (T-number below) it breaks. Where a `note` says a choice was deliberate, don't
flag it as a mistake — but if it still looks actively wrong, surface it as "noted as intended, but
flag: …" and let the user decide.

Prefer three real findings over fifteen speculative ones. Ignore anything on lines the change didn't
touch. If there are no material issues, say so plainly. Do not edit anything — hand the findings
back for the user to apply.

**The user's reply choosing which findings to apply is itself a correction**: whoever applies them
appends a one-line `review` entry to [`docs/process-journal.md`](../../docs/process-journal.md) in
the commit that carries the fix. Having run the review is not a substitute for logging what it cost
— that line is the only durable record.

## 5. The lead's taxonomy

These are the review findings the human lead actually makes, mined from every documentation session
in this repo between 2026-04-23 and 2026-08-14 (evidence and verbatim quotes:
[`docs/retro/2026-08-14-review-mining-round.md`](../../docs/retro/2026-08-14-review-mining-round.md)).
Run each as a named adversarial check; cite the T-number in findings.

- **T1 — Verbosity is the default failure** (by far the loudest; it recurred in five of six
  authoring sessions and always ended in deletion). For every paragraph ask: does the reader need
  this to *act*? Explanation of how something works internally, why it was designed that way, what
  happens in degraded cases, and any sentence that reads as marketing are all findings.
  *"generally a bit too verbose. more code, less explanation, not every last feature has to be
  explained in detail"* · *"tune down the verbosity a bit, omit explanation and marketing stuff"* ·
  *"the dev will only need to know that we check, not how and what happens in degraded cases"*.
  A caveat gets one sentence, never a paragraph: *"valid but a short warning is enough, not a full
  praragraph"*.

- **T2 — A new topic is not a new page.** A feature landing this week does not earn its own page.
  Default to a section on the page that owns the topic; a new page needs a reason beyond the
  feature being new. Where two pages cover adjacent ground, check for duplication — the rule is one
  home plus a link. *"just becaue it is the topic of the moment it does not mean it deserves an own
  page and more level of detail"* · *"an own page for secrets explaining the reasoning of how it was
  implemented? no, a small chapter with an example in the properties page is enough"* · *"there
  should not be duplication, references instead"*.

- **T3 — Claims verified against source, not inferred** (the one that produces `[blocker]`s). Every
  statement about a CLI flag, an attribute, a type name, a default, or a lifecycle hook must be
  checked against the source and cited — CLI and SDK both in `../dale-sdk` (`Vion.Dale.Cli`,
  `Vion.Dale.Sdk*`, the compiled `examples/`), runtime behaviour in `../dale`, and `../cloud-api` /
  `../mesh` for their surfaces. A plausible-looking flag that
  does not exist is the failure mode: *"dale test -- --filter Name~Foo: is that true? validate it in
  code"* · *"dale scenario scaffold: does it really exist?"* · *"the cli may have changed slightly
  (---default-anme stil exists?) check that"* · *"are you sure the sdk docs are up to date on your
  branch? if in doubt look at the source code"*. Renamed and removed API is the same check from the
  other side: *"Configure is not a public lifecycle hook anymore, don't mention it. Ready is the
  one"*. Code examples must compile against the current SDK, not a remembered one.

- **T4 — Internal references never ship.** RFC numbers, analyzer IDs, spec slugs, Jira keys, actor
  internals, MQTT topic plumbing. *"no RFC 0006 or other rfc references in docs, this is internal"* ·
  *"no dale analyzer ids anywhere"*. The literal patterns are gated by `pnpm run check`; your job is
  the ones a regex cannot see — a paragraph that describes an internal mechanism without naming it.

- **T5 — No UI rendering detail.** The SDK docs describe what the author declares, not what the
  dashboard draws. Pixel behaviour changes without notice and the reader will see it when they test.
  *"no detailed desciption how ui will render stuff in specific places (e.g. the status indicator
  pills +N), this can change anytime and the user wil see how it is rendered when testing"* ·
  *"if they add a custom one they will see what happens (probably verbatim display in the ui for a
  start but no guarantees)"* · *"don't mention the Logic Editor, ui is independen from the sdk"*.

- **T6 — Current state only; no migration history.** No "X was renamed to Y", no "the legacy form
  was dropped", no version-gated notes. The product is pre-public; the reader has never seen the old
  name. *"strip that, we're still pre public. describe the current state only"*.

- **T7 — Examples are invented** (treat a miss as a `[blocker]`, not a nit — this is customer
  material). Never a type name lifted from a customer's codebase, never a real vendor's product or
  model number. Two such corrections landed on 2026-07-15; the identifiers are deliberately not
  reproduced here because **this repo is public** — the rule needs no examples to apply, and
  `pnpm run check` carries the literal denylist. Invented names also stay unspecific where
  specificity adds nothing: *"an EV charging station presents anywhere from one to six charge points
  depending on its model." too specific, why 6 several is good enough"*.

- **T8 — The scope of a claim is exact.** An over-broad statement is as wrong as a false one. Check
  every "always", "all", "automatically", and every unqualified noun: does the constraint hold at
  that scope? *"is ambiguous. the property must be in the same logic block"* · *"this is not
  happening automatically in all cases … don't be specific"*. And a limit that is not specific to
  the page's topic belongs on the page that owns it: *"remove the <PackageId> is unique across all
  integrators limit, it is not specific to translations"*.

- **T9 — Type names in prose, brackets in code.** Attribute-bracket syntax reads as noise in a
  sentence. *"the paragraphs with attribute brackets look odd, use the type name instead, attribute
  brackets in examples or inline text"*. Related: don't drag an adjacent concept into an explanation
  that doesn't need it — *"leave MeasuringPoint out of it, not relevant here"*.

- **T10 — Unavailable things are marked, not linked.** Anything not yet public gets hidden or a
  "coming soon", never a dead link or an instruction the reader cannot follow. Two corrections on
  2026-06-30: an unreleased in-house tool documented as if available, and a link to a hardware image
  that did not exist yet. Names withheld for the same reason as T7.

- **T11 is not a check here.** The retro's T11 (branch and PR discipline — work on a branch, don't
  commit until asked) is a working agreement, not a property of the change under review. It lives in
  [`CLAUDE.md`](../../CLAUDE.md) § Conventions. The number is kept aligned with the retro rather than
  reused, so a journal line citing a T-number resolves to one thing.

- **T12 — Correction logged.** When the branch already answers human feedback — fix-up commits
  reworking earlier ones, a commit message citing the review —
  [`docs/process-journal.md`](../../docs/process-journal.md) must carry a matching `review` line in
  the same change. An untouched journal is a finding. Two blind spots: on a first-pass review no
  correction has happened yet, so T12 can only fire on a re-review (the §4 instruction covers the
  first pass); and T12 has no corpus evidence behind it — it is loop discipline, added with the
  journal, not mined from it.

## 6. One structural check

Beyond the diff: if the change adds or substantially reworks a page, say in one line whether
[`docs/STYLE.md`](../../docs/STYLE.md) already covers the judgment calls the author had to make. A
rule the lead has now given twice belongs in the style guide, and this review is where that gets
noticed. The user asked for exactly this once already — *"please have a look at STYLE.md and nudge
it in the direction my feedback steered you"* — which is the correction that should not need making
a second time.
