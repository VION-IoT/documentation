---
title: Process journal
description: Friction log for how this repo gets built — review corrections and process creaks, one line each.
---

# Process journal

Friction log for how this repo gets built — review corrections and process creaks, one line each,
written **the moment they happen**. Not a work log: what shipped is in git and the PRs. This file
records where the *process* creaked. Modeled on the architecture repo's `docs/workflow-journal.md`
and the sibling repos' `docs/process-journal.md`.

Why: corrections and friction are felt in the moment and remembered nowhere. Without this file they
surface only when someone has accumulated enough irritation to raise them all at once — by which
point the specifics are gone and only the annoyance is left. One line, written when it happens,
keeps the specifics. A one-line grumble beats a considered write-up never made.

**Transcripts are not a fallback.** They age out of `~/.claude/projects/` after weeks;
[retro-0](retro/2026-08-14-review-mining-round.md) mined them once and that window is closed.
Assistant memory is not a fallback either — it is machine-local, so a colleague, a CI runner or a
second workstation never sees it, and it goes stale silently.

## Format

```text
YYYY-MM-DD · <where> · <topic, issue key, or —> · <what happened, one line>
```

`where` is one of:

- `review` — the user corrected produced work in-session (**the most important line type**)
- `brief` — a brief from the architecture repo was wrong, ambiguous, or missing something; also
  where a `Friction:` field would have gone if the work had not been done locally
- `gate` — `pnpm run check` or the build gate false-fails, false-passes, or fights the work
- `source` — the SDK/CLI source contradicted the docs, or was hard to verify a claim against
- `infra` — CI runner, registry, credentials, deployment, cluster access
- `agent` — agent behavior or process
- `manual` — human grumble

Append at the bottom, newest last.

**Record what happened, not what should change** — the fix is the retro's job, and pre-judging it
here loses the evidence.

**Qualitative one-liners only.** Anything countable afterwards from durable artifacts — PRs merged,
corrections per PR, gate catches — is **not** journalled; the retro counts it into
[`process-metrics.md`](process-metrics.md) from git, `gh` and this file. Journal what was _felt_,
when it was felt; count what was _done_, later.

## Who writes, when

- **Agents**: when the user corrects produced work — a style violation, "too verbose", "that's not
  what the CLI does", "don't mention that" — append a `review` line **in the commit that carries the
  fix**, not afterwards. Also: when a gate false-fails, when a convention fights the work, when a
  brief turns out wrong, and when the human has to ask for the same thing twice (mark it
  "(second ask)" — that is the canonical absorb-into-the-process signal).
  - **Adjudicating review findings counts.** "Fix X, leave Y" on a `/vion-code-review` result is a
    correction like any other. Missing this is how the rule actually fails: the review feels like the
    process step, so logging its outcome feels already done. `/vion-code-review` T11 checks for the
    line on re-review; that check cannot fire on a first pass, so the habit is the primary mechanism.
  - **Record it even when the self-review caught it first.** Those are not
    [escapes](process-metrics.md) and a round should not count them as such — say so in the line, so
    the retro can tell a working loop from a leaking one.
- **Briefed sessions**: a brief from `/implement` or `/fix` asks for a `Friction:` field in the
  REPORT block, and the coordinator journals it in the architecture repo on your behalf — that file
  covers the cross-repo *workflow*. Anything about **this repo's** conventions, gates or pages
  belongs here as well, and here you can write it yourself.
- **Humans**: whenever something was awkward, slower than it should have been, or worked notably
  well.

Nothing is done with entries until a **retro round** reads everything below the acted-on marker in
one sitting and promotes recurrences down the enforcement ladder (CI gate → `/vion-code-review`
check → prose in [`STYLE.md`](STYLE.md)). Each round records a dated note under `docs/retro/` and
moves the marker.

## Entries

<!-- acted-on marker: entries above this line are acted on or consciously left. -->

2026-08-14 · manual · retro-0 · Journal seeded by the transcript-mining round

2026-08-14 · review · retro-0 PR #19 · First `/vion-code-review` run, on the PR that added the
command. Two blockers, both real. (1) The substrate was written as if this repo were private like
every repo it was imported from; it is public, and four verbatim customer / unreleased-product names
were committed. The author had seen the risk and reached for `srcExclude`, which governs the rendered
site and not `git clone` — "not rendered" is not "not published". Quotes are now described, the name
denylist applies to substrate too, and the rule is in CLAUDE.md § Repo Scope. (2) T11 meant two
different things across the retro and the skill, so a journal line citing it would not resolve — the
exact drift D2 argues killed the old CI reviewer, present at commit time. Also fixed: analyzer-ID
count mixed occurrences with lines; `.gitignore` carried rationale and migration history the same
commit's own rules forbid. Not an escape — nothing had shipped, and the review is what caught it.

2026-08-14 · agent · retro-0 PR #19 · The review cited `scripts/check-docs.mjs:1099` and `:1168` for
findings in a 196-line file. The substance was right and the line numbers were not; verifying them
cost a round. Worth watching whether reported locations hold up on later runs.

2026-08-21 · gate · VION-116 · `pnpm check` never read `docs/public/`: `SKIP_DIRS` excluded the
directory and `walk()` only collected `.md`. The first hand-authored public asset in the repo — a
1200-line HTML example client, published verbatim at the site root — was therefore the one file with
no name denylist and no internal-detail check on it, in a public repo. Found by
`/vion-code-review`, not by the gate. The content rules now also run over
`docs/public/**` assets, with the scope stated in STYLE.md.

2026-08-21 · review · VION-116 · `/vion-code-review` returned three blockers on the branch, all
real, all acted on. (1) A code comment in the example client explained the broker's queue-naming and
per-identity permission model to justify the subscriber-ID format — accurate enough to reverse
engineer, in a public file whose own footer invites the reader to view source; cut to the
requirement. (2) The contract table claimed to be exhaustive and was missing the QoS-0 constraint —
a subscription at QoS 1 is refused with the identical symptom the table attributes solely to a
malformed subscriber ID, and both pages prominently said QoS 1 for the last will, which is exactly
the cue that leads a reader there. The reviewer flagged it as read-from-source-but-not-executed; it
reproduced on the first try. (3) "One token covers all three surfaces" stated a Keycloak client
configuration as a property of the token endpoint. Also fixed from the same review: a banned "the
cloud", a replacement JS snippet carrying three undefined identifiers on the page whose unrunnable
snippet is the reason the issue exists, and an unchecked SUBACK that would have reported success on
a QoS-128 refusal. Not an escape — nothing had shipped.

2026-08-21 · agent · VION-116 · The author's own browser pass declared the page working while every
enum property's Set control was silently broken: `<option value="…">` was built by string
concatenation through an escaper that did not escape quotes, and `JSON.stringify` emits them, so
every option value was the empty string. Caught by the background security review as an
attribute-context escaping finding, not by the functional pass — which had exercised numbers and
booleans and generalised. A brief that asks for a round trip as the discriminator is only as good as
the number of control types the round trip is run through.

2026-08-21 · manual · — · Noticed while sweeping the branch for leaks:
`docs/.vitepress/theme/vion-tokens.css` had carried a workstation clone path and a private repo's
name in its header comment since it was written — in a public repo, and in a directory no gate
reads. Removed. The denylist cannot catch this class, because a clone path is not a name anyone
thought to list.

2026-08-21 · review · VION-116 · Four review points on the example client, all correct, all from
looking at the running page rather than the diff. (1) Every stage header went dark-on-dark on
hover — 1.41:1 — because the generic `button:hover` fill out-specifies `.stage-head`'s background,
and the only rule that rescued it covered completed stages. The header is a `<button>`; nothing in
the diff hints at that. (2) No sign-out existed. Adding it surfaced a gap in the page's own subject
matter: a clean MQTT DISCONNECT suppresses the will, so a polite exit left the cloud-side
registration standing — the page demonstrated the crash path and never the graceful one. Now
published explicitly, and documented. (3) and (4) asked what an account with no tenant membership,
or no readable services, actually sees. Both messages existed but stated the symptom, not the cause
or the fix, and the second could not distinguish "empty tenant" from "no permission" — which the
API makes indistinguishable by design. Also found while adding the sign-out control: `hidden` was
inert on it, because the element's own `display: flex` beats the attribute's UA default.
