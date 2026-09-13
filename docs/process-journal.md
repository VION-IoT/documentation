# Process journal

Where the process creaked, one line per event. Not a work log: what shipped is in git.

## Format

```
YYYY-MM-DD · <where> · <topic or —> · <what happened, one line> [ (second ask)] [ (self)] [ → codified: <path>]
```

- `where` is one of five: `review` a correction to produced work · `gate` tooling fought or false-passed · `brief` upstream was wrong · `decision` a settled point, with its reason · `manual` a human grumble.
- `topic` names what it is about — a component, a skill, a document slug, an issue key — or `—`.
- `(second ask)`: the same thing was asked for twice. `(self)`: the agent found it, not a human.
- `→ codified: <path>`: the file a rule or fix for this entry landed in.
- An entry says what was produced, what was wrong, and what was asked instead. No reasoning, no fix, no quote. At most 400 characters.
- A physical line that does not start with a date continues the entry above. Blank lines between entries are allowed.
- Written by the agent in the commit that carries the fix, for every `where` but `manual`. A fixed review finding counts, and its entry names the finding and the file that should have prevented it.
- Newest last, below the retro marker. Entries above the marker have been read by a retro.

## Entries

<!-- retro-0 marker -->

2026-09-13 · brief · journal rotation · The brief expected two journal windows around the acted-on marker; the marker sat directly under `## Entries` with 0 entries above and 10 below, and the phrase "acted-on marker" also matched a header prose line. The human chose one archive for the 10 and no file for the empty window.
2026-09-13 · gate · claude plugin list · After `claude plugin install vion-git@vion --scope project` and the same for vion-improve, `claude plugin list` printed each plugin four times, all at project scope and enabled; the brief anticipated twice. (self)
2026-09-13 · decision · repository settings · Squash merges switched to PR_TITLE / PR_BODY with merge commits and rebase merges off; the previous values kept for rollback were COMMIT_OR_PR_TITLE / COMMIT_MESSAGES with merge commits and rebase merges on.
2026-09-13 · brief · CLAUDE.md · The brief asked § Process Substrate to keep its public-repo warning; the section carried none, the warning lived in § Repo Scope, so a one-line pointer to it was added. (self) → codified: CLAUDE.md
2026-09-13 · review · CLAUDE.md · The branch review found § Conventions still allowing a merge when asked beside the working agreement's never-merge rule; the bullet was deleted. The brief's "every other section stays" should have prevented it. (self)
2026-09-13 · review · CLAUDE.md · The branch review found § Pre-PR Review telling agents to run /vion-git:review before a PR while /vion-git:pr already runs it; reworded to say pr runs it. The brief's instruction to name the review there should have prevented it. (self)
