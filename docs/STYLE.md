# VION Documentation Style Guide

This guide defines the conventions for all VION documentation. It serves both human authors and AI coding agents — any session that modifies docs must follow these rules.

Part of this guide is machine-enforced: `pnpm run check` decides frontmatter, heading depth, fence
language tags, relative links, and the banned-content patterns, and it runs in CI before the build.
The rest needs judgment and is checked by [`/vion-code-review`](../.claude/commands/vion-code-review.md)
before a PR opens. Rules that keep costing review rounds move down that ladder — gate first, review
check second, prose last.

## Terminology

Use these exact forms. Never substitute synonyms.

| Term | Usage | Never use |
|------|-------|-----------|
| VION | The product as a whole: "VION is an Edge Operations Platform". Always all-caps. | Vion, vion, the platform (alone, when ambiguous) |
| Dale SDK | The logic system integrators build on: "the Dale SDK provides..." | the SDK (without Dale, unless context is obvious), Dale (alone, for the SDK) |
| Dale runtime | Lowercase `runtime`: "the Dale runtime loads logic block libraries as plugins". Runs on the edge gateway and executes logic blocks. | Dale (alone), the runtime (alone, when ambiguous), Dale Runtime (in prose — proper casing in diagram labels is fine) |
| Mesh | The gateway between the edge and VION Cloud. Capitalized: "Mesh orchestrates service provider registration and bridges MQTT to the cloud". | mesh, the mesh, mesh gateway (in prose — "Mesh gateway" as a diagram label is acceptable) |
| logic block | Lowercase in prose: "a logic block handles..." Capitalized in headings, titles, and link text: "[Logic Blocks](/sdk/logic-blocks)" | LogicBlock (only in code), block (ambiguous), component |
| service property | "a service property is readable by the Dale runtime" | property (alone, when ambiguous), field |
| measuring point | "measuring points are read-only" | metric, measurement, sensor value |
| service provider contract | "the service provider contract binds I/O" | I/O binding (alone), hardware contract |
| edge gateway | "deploy to the edge gateway" | device (alone), gateway (alone), node |
| Dale CLI | Always capitalized in prose: "install the Dale CLI" | dale cli, the CLI (without Dale), the tool |
| VION Cloud | Always capitalized: "upload to VION Cloud" | the cloud, vion cloud, Cloud API (that's the API) |
| integrator | "an integrator develops libraries" | partner, developer org, company |
| tenant | "tenants are customers of integrators" | client, end user, customer |
| DevHost | One word, capital D and H: "start the DevHost" | dev host, devhost, dev server |

## Page Structure

### Opening

Every page follows this structure:

```markdown
---
title: Page Title
description: One sentence describing what this page covers.
---

# Page Title

Opening paragraph (1-2 sentences) explaining what this page covers and why it matters.

## First Section
```

The h1 must match the frontmatter title. The opening paragraph appears before any h2.

### Heading Depth

- **h2** (`##`) for major sections
- **h3** (`###`) for sub-sections within an h2 (variants, sub-commands, sub-topics)
- **Never use h4 or deeper** — if you need h4, restructure the content

A heading must describe everything under it. When a section outgrows its title — a "Limits" list that fills up with behaviors and rules — rename the section rather than stretch the word.

### When to Add a Page

**A new feature is not a new page.** Default to a section on the page that already owns the topic —
a secrets mechanism belongs in Properties, a new attribute field belongs beside its attribute. The
fact that something is the topic of the moment is not evidence that it needs its own page or its own
depth.

A new page needs a reason that survives the feature being six months old: a distinct task the reader
comes to do, or a concept that several pages need to link to. If two pages end up covering adjacent
ground, one of them owns the content and the other links to it. Never explain the same thing twice.

### Cross-References

Use absolute paths with descriptive link text:

```markdown
See [Testing](/sdk/testing) for unit testing with the TestKit.
```

Never use relative paths (`../`), never use bare URLs in prose.

## Code Examples

### Placement

Code is **always** preceded by text explaining what it does. Never place a code block without an introduction.

```markdown
<!-- GOOD -->
Verify the installation:

```bash
dale --version
```

<!-- BAD -->
```bash
dale --version
```
```

### Language Tags

Always specify the language: `bash`, `csharp`, `json`, `xml`, `yaml`. Use `text` for anything with
no language — command output, URLs, topic patterns, plain lists. Never leave the tag off.

### Naming in Examples

**Every name in an example is invented.** Never a customer's type, never a real product or model
number, never a name copied out of a partner's repository — including in a snippet lifted from
working code, which is where these arrive. Prefer the obvious generic: `IChargePoint`, `MyBlock`,
`Acme`.

Keep invented details unspecific unless the specificity teaches something. "A charging station
presents several charge points" is better than naming a number, because the number is not the point
and dates the page the moment a model ships with a different one.

### C# Conventions

- Use explicit `using` statements (ImplicitUsings is false in Dale projects)
- Show complete, runnable examples — no pseudo-code
- When a code example can be generated by the Dale CLI, mention it:

```markdown
```bash
dale add serviceproperty Temperature --type double --to MyBlock
```

This generates:

```csharp
[ServiceProperty]
public double Temperature { get; set; }
```
```

### CLI Examples

- Show the command, then optionally the output
- Use `#` comments for inline explanations in output blocks
- Use `$` prefix only when distinguishing input from output

## Accuracy

This repo documents code that lives in other repositories. It can drift from all of them silently,
and a confident wrong sentence is worse than a missing one — the reader has no way to tell.

**Verify against the source, never from memory.** Before documenting a CLI flag, an attribute, a
field, a default value, a type name, or a lifecycle hook, read it in the source:

- Dale CLI — `dale <command> -h`, or `Vion.Dale.Cli` in `../dale-sdk`
- Dale SDK — the `Vion.Dale.Sdk*` projects and `examples/` in `../dale-sdk`; the examples are the
  most useful reference because they are compiled against the current SDK
- Dale runtime — `../dale`. Runtime behaviour only: the SDK, CLI, DevHost, examples and templates
  all live in `dale-sdk`, and `dale` consumes them as NuGet packages
- Cloud API — `../cloud-api`
- Mesh and the service provider protocol — `../mesh`

Cite what you read when the claim is load-bearing. "This flag exists" is a claim; so is "this is the
default", "this is the only way", and "this cannot be done".

**Verification is per-claim, not per-page.** A page that was accurate last month is not evidence.
When touching a page, re-check the specific statements the change depends on.

**Renamed and removed API is the same check from the other side.** A hook that is no longer public,
a field that moved, an attribute that was replaced — these read as correct to anyone who learned the
old shape, and they are the errors that survive review.

**State the scope exactly.** An over-broad claim is as wrong as a false one. Check every "always",
"all", "automatically", and every unqualified noun against what actually holds: a property in *the
same logic block* is not the same claim as a property in the same service, and "the cloud deploys
software once the device is ready" is not true when an operator can do it by hand. When a behaviour
has cases, either name the constraint or stay general — never state the common case as the rule.

**A rule that is not specific to the page's topic belongs on the page that owns it**, with a link.

## Structured Data

### Options and Parameters

Use **two-column tables** (Flag | Description):

```markdown
| Flag | Description |
|------|-------------|
| `--type` (required) | C# type (`double`, `string`, `bool`, etc.) |
| `--to` | Target logic block (auto-detected if only one exists) |
```

Never use three-column tables with "Required" — indicate it inline: `(required)`.

### Lists vs Tables

- **Tables** for reference data (options, parameters, supported types, comparisons)
- **Ordered lists** for sequential steps (onboarding procedures, setup flows)
- **Unordered lists** for non-sequential items (features, requirements, "next steps")

## VitePress Containers

Use sparingly. Containers interrupt reading flow — only use when the information truly needs to stand out.

| Container | When to use |
|-----------|-------------|
| `:::tip` | Helpful advice the reader might miss. "You can also..." |
| `:::info` | Important context that's not part of the main flow. Background knowledge. |
| `:::warning` | Things that will cause problems if ignored. Breaking changes, prerequisites. |
| `:::danger` | Data loss, security risks. Use very rarely. |

Never put core documentation content inside containers. If every reader needs the information, it belongs in the main text.

## Tone and Voice

### General Tone

- **Imperative** for instructions: "Add a property", "Install the CLI"
- **Declarative** for concepts: "Logic blocks are the core computation units"
- **Technical but accessible**: assume C#/.NET knowledge, don't assume IoT expertise
- **Concise**: one idea per sentence, no filler

### Economy

Write the shortest version that lets the reader act.

- **State optionality first.** If a feature can be skipped, say so in the opening sentence and describe the do-nothing path before the feature itself.
- **One sentence per rule.** Constraints, caveats, and behaviors belong in a list, one sentence each — not a paragraph each.
- **Omit rationale.** Why a design was chosen belongs in the architecture repo. Document what the reader can do, how to do it, and what will bite them.
- **Never restate a table in prose.** If a table already carries the detail, point at it ("any identifier in the table above") instead of enumerating the cases again.
- **Cut mechanism and degraded cases.** The reader needs to know *that* something is validated, not how the validator works or what happens when it fails. Internal machinery, fallback behaviour and design reasoning are the first things to delete — and the most common thing left in.
- **More code, less explanation.** When a code example makes the point, the surrounding prose is one sentence, not three. Not every feature needs a worked narrative.

### Referring to Code in Prose

Use the **type name** in a sentence — "the `Presentation` attribute", "an instantiation parameter" —
and keep attribute-bracket syntax for code examples and short inline references. A paragraph built
out of `[Bracketed]` names reads as noise.

Don't drag an adjacent concept into an explanation that doesn't need it. If a rule is about service
properties, measuring points do not need to appear in it.

### What to Avoid

- Marketing language ("powerful", "seamless", "cutting-edge")
- Hedging ("you might want to", "it could be useful to")
- Informal language ("just do X", "simply", "easy")
- Passive voice when active is clearer ("the property is set by the Dale runtime" → "the Dale runtime sets the property")

## Page Types

### Concept Pages (`/introduction/`)

- Explain **why** something exists and how to think about it
- Use diagrams (mermaid) for architecture and flow
- Link to specific guide pages for "how to do it"

### Guide Pages (`/sdk/`, `/edge-gateway/`)

- Explain **how** to accomplish tasks
- Lead with code, then explain
- Include prerequisites at the top if the page assumes prior setup
- End with "Next Steps" or cross-references to related pages

### Reference Pages (`/api-reference/`, `/cloud-api/reference`)

- Explain **what** exists — precise, complete, no opinions
- Auto-generated content is acceptable here
- Tables and lists over prose

### Troubleshooting Pages

- Follow the pattern: **Problem** → **Cause** → **Solution**
- Use h3 for each problem
- Include the exact error message or symptom the user sees

## Diagrams

- Use **mermaid** for all diagrams (inline in markdown)
- Keep diagrams simple — max 10-12 nodes
- Use the VION color palette for styling (see mermaid theme in config)
- User-facing diagrams show concepts, not internal implementation details

## What Not to Document

- **Internal references.** RFC numbers, spec slugs, Dale analyzer IDs (`DALE0xx`), issue keys.
  These are internal artifacts; the reader cannot open them. State the rule, not the diagnostic code
  that enforces it, and describe the behaviour, not the document that specified it. *(Gated by
  `pnpm run check`.)*
- **Internal implementation details** — MQTT topic plumbing, actor internals, how a validator works.
- **How the UI renders.** The SDK docs describe what the author declares; the dashboard decides how
  it looks, and it changes without notice. No badge layouts, no overflow behaviour, no "the first
  three then +N". The reader sees the rendering the moment they test. The same rule retires UI
  screenshots and click-by-click paths — name the surface and what it does. Where the SDK and the UI
  are genuinely independent, say nothing about the UI at all.
- **Rename and migration history.** No "X was renamed to Y", no "the legacy form was dropped", no
  version-gated notes. The product is pre-public — the reader has never seen the old name, and the
  note only teaches them something they must then unlearn. **Describe the current state only.**
- **Unstable features not marked `[PublicApi]`**, and features that may be removed before public
  release.
- **Rules that are not specific to the page's topic** — document them on the page that owns them
  and link.

### Things That Do Not Exist Yet

Never link to something unavailable and never write an instruction the reader cannot follow. Mark
the row "coming soon", or leave the thing out entirely and recommend what does work today. A page
that promises a download that 404s costs more trust than an omission.
