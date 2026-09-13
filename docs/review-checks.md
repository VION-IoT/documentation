# Review checks

One line per check: `Tn — name: what to look for, the shape of the violation`.
Numbers run per prefix; a new check takes the next free one; a number is never reused or renumbered.
No quotes, dates or session ids in a check.
A check fires when a journal line names it. Unnamed for three retro rounds: deleted. Fires constantly: becomes a gate, removed here.

- T1 — Verbosity: every paragraph is something the reader needs in order to act; an explanation of internals, design rationale, degraded-case behaviour or marketing, or a caveat that runs past one sentence.
- T2 — A new topic is not a new page: a feature gets a section on the page that owns its topic, and adjacent pages link rather than repeat; a page that exists only because the feature is new, or the same content in two places.
- T3 — Claims verified against source: every CLI flag, attribute, type name, default and lifecycle hook checked against `../dale-sdk` (CLI, SDK, compiled `examples/`), `../dale`, `../cloud-api` or `../mesh`; a plausible flag or command that does not exist, a renamed or removed API still described, or a code example that does not compile against the current SDK.
- T4 — Internal references never ship: no spec slug, Jira key, actor internal or messaging plumbing reaches a page; a paragraph that describes an internal mechanism without naming it, which the gate's literal patterns cannot see.
- T5 — No UI rendering detail: the SDK pages describe what the author declares; how the dashboard draws it, where it places it, or which editor shows it.
- T6 — Current state only: the page describes the product as it is; a rename, a dropped legacy form, or a version-gated note the reader has no earlier state for.
- T7 — Examples are invented: every type, product and model name in an example is made up and no more specific than it needs to be; a name from a customer's codebase or a real vendor's product, treated as a blocker.
- T8 — The scope of a claim is exact: every "always", "all", "automatically" and unqualified noun holds at that scope, and a limit sits on the page that owns it; an over-broad statement, or a general limit repeated on a topic page.
- T9 — Type names in prose, brackets in code: prose names the type, attribute brackets appear only in examples and inline code; bracket syntax in a sentence, or an adjacent concept dragged into an explanation that does not need it.
- T10 — Unavailable things are marked, not linked: anything not yet public is hidden or marked as coming; a link to something that does not exist yet, or an instruction the reader cannot follow.
- T12 — Correction logged: a branch that answers human feedback — fix-up commits reworking earlier ones, a message citing a review — with no matching `review` line in `docs/process-journal.md` in the same change.
- T13 — Style guide covers the call: a change that adds or substantially reworks a page leaves `docs/STYLE.md` covering the judgment calls the author had to make; a rule given in review twice and still absent from the style guide.
