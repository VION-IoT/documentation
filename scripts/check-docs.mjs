#!/usr/bin/env node
// Enforces the mechanically checkable subset of docs/STYLE.md and CLAUDE.md.
//
// Why a script and not a review check: these rules cost review rounds when they slip, and every
// one of them is decidable by reading the file. A CI gate is the cheapest place to enforce a rule
// that never needs judgment — the review skill and the style guide are for the rules that do.
//
// Everything here is a rule already written down. This file does not invent conventions; when a
// check and docs/STYLE.md disagree, STYLE.md wins and this file is the bug.
//
// Run: pnpm run check

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const DOCS = 'docs'
const CONFIG = join(DOCS, '.vitepress', 'config.ts')

// Directories that never carry hand-authored *markdown*.
const SKIP_DIRS = new Set(['.vitepress', 'public'])

// …but docs/public/ does carry hand-authored HTML, and it is published verbatim at the site root.
// The content rules below are about what this repo exposes, not about which file extension exposes
// it, so they run over these too. Without this the largest hand-written public asset in the repo is
// the one file no gate reads.
const PUBLIC_ASSETS = join(DOCS, 'public')
const PUBLIC_ASSET_EXTS = ['.html', '.htm', '.js', '.css', '.svg']

// Generated upstream by the dale repo's CI and overwritten on every SDK release (CLAUDE.md
// § Auto-Generated Content). It is exempt because nothing in this repo can fix a violation in it —
// the generator is the only place a fix would survive. Its current non-conformance is recorded in
// docs/retro/2026-08-14-review-mining-round.md, not waived.
const GENERATED = 'api-reference'

// What counts as internal substrate is defined once, by the site config: anything VitePress is told
// not to publish is not a documentation page, so the page rules do not apply to it. Deriving the
// list here rather than repeating it keeps the two from drifting — a retro note that starts
// publishing is exactly the failure this pairing prevents.
function readSubstrateGlobs() {
  const src = readFileSync(CONFIG, 'utf8')
  const block = src.match(/srcExclude:\s*\[([\s\S]*?)\]/)
  if (!block) {
    console.error(
      `check-docs: no srcExclude array found in ${CONFIG}. Internal pages would publish; refusing to`
      + ` report a clean run. Add srcExclude, or update this parser if the config shape changed.`,
    )
    process.exit(2)
  }
  const globs = [...block[1].matchAll(/['"`]([^'"`]+)['"`]/g)].map((m) => m[1])
  if (globs.length === 0) {
    console.error(`check-docs: srcExclude in ${CONFIG} is empty — expected the substrate list.`)
    process.exit(2)
  }
  return globs
}

// Only the two shapes the config actually uses: an exact path, or a directory wildcard.
function matchesGlob(relPath, glob) {
  if (glob.endsWith('/**')) return relPath.startsWith(glob.slice(0, -2))
  return relPath === glob
}

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) {
      if (SKIP_DIRS.has(entry)) continue
      walk(p, acc)
    } else if (entry.endsWith('.md')) {
      acc.push(p)
    }
  }
  return acc
}

function walkPublicAssets(dir, acc = []) {
  let entries
  try {
    entries = readdirSync(dir)
  } catch {
    return acc // no docs/public/ in this repo state; nothing to check
  }
  for (const entry of entries) {
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) walkPublicAssets(p, acc)
    else if (PUBLIC_ASSET_EXTS.some((ext) => entry.endsWith(ext))) acc.push(p)
  }
  return acc
}

// Applies every content rule regardless of `appliesToSubstrate`: a published asset is the strictest
// case, not an exempt one.
function checkContent(file, src, rules) {
  const lines = src.split(/\r?\n/)
  for (const { rule, re, detail } of rules) {
    lines.forEach((raw, i) => {
      for (const m of raw.matchAll(re)) report(file, i + 1, rule, `${detail} — found "${m[0]}"`)
    })
  }
}

const findings = []
const report = (file, line, rule, detail) =>
  findings.push({ file: file.split(sep).join('/'), line, rule, detail })

// ── Content checks ────────────────────────────────────────────────────────────────────────────
//
// Each traces to a correction the lead actually made; see the retro note for the verbatim quotes.
const CONTENT_RULES = [
  {
    // "no RFC 0006 or other rfc references in docs, this is internal" (2026-06-30)
    rule: 'internal-reference',
    re: /\bRFC[\s-]?\d{3,4}\b/gi,
    detail: 'RFC references are internal — describe the behaviour, not the document that specified it',
  },
  {
    // "no dale analyzer ids anywhere" (2026-05-15)
    rule: 'analyzer-id',
    re: /\bDALE\d{3}\b/g,
    detail: 'Dale analyzer IDs are internal — state the rule, not the diagnostic code',
  },
  {
    // Two corrections on 2026-07-15 (retro-0 T7): an interface name taken from a customer's
    // codebase, and a real vendor's product names used as example values. The identifiers below are
    // the denylist and nothing else — a denylist cannot match what it does not name. Do not restate
    // them in prose anywhere else in this repo (retro-0 D8).
    rule: 'real-world-name',
    re: /\b(evtec|Cappuccino|Corretto|IControllableConsumer)\b/gi,
    detail: "Examples must be invented — never a customer's code or a real product",
    // The one rule that also guards unpublished substrate: this repo is public, so these names are
    // exposed by `git clone` regardless of whether the page renders (retro-0 D8).
    appliesToSubstrate: true,
  },
]

// Site-root paths of everything under docs/public/, which VitePress copies verbatim. Used by the
// link check below.
function publicAssetPaths() {
  return new Set(
    walkPublicAssets(PUBLIC_ASSETS).map(
      (p) => '/' + relative(PUBLIC_ASSETS, p).split(sep).join('/'),
    ),
  )
}

// ── Structure checks ──────────────────────────────────────────────────────────────────────────
function checkStructure(file, src, publicPaths) {
  const lines = src.split(/\r?\n/)

  // Frontmatter with title and description (CLAUDE.md § Conventions).
  if (lines[0] !== '---') {
    report(file, 1, 'frontmatter', 'page has no frontmatter block')
  } else {
    const end = lines.indexOf('---', 1)
    if (end === -1) {
      report(file, 1, 'frontmatter', 'frontmatter block is not closed')
    } else {
      const fm = lines.slice(1, end)
      if (!fm.some((l) => /^title:\s*\S/.test(l))) report(file, 1, 'frontmatter', 'missing title')
      if (!fm.some((l) => /^description:\s*\S/.test(l)))
        report(file, 1, 'frontmatter', 'missing description')
    }
  }

  let inFence = false
  lines.forEach((raw, i) => {
    const n = i + 1
    const fence = raw.match(/^\s*```(\S*)/)
    if (fence) {
      if (!inFence) {
        inFence = true
        // STYLE.md § Language Tags: "Always specify the language".
        if (!fence[1])
          report(file, n, 'fence-language', 'code fence has no language tag (use `text` for plain output)')
      } else {
        inFence = false
      }
      return
    }
    if (inFence) return

    // STYLE.md § Heading Depth: "Never use h4 or deeper".
    if (/^#{4,}\s/.test(raw))
      report(file, n, 'heading-depth', `h${raw.match(/^#+/)[0].length} heading — restructure instead`)

    // STYLE.md § Cross-References: "Never use relative paths".
    const rel = raw.match(/\]\((\.\.?\/[^)]*)\)/)
    if (rel) report(file, n, 'relative-link', `relative link ${rel[1]} — use an absolute /path`)

    // A markdown link to a docs/public/ asset is silently broken at runtime: with cleanUrls the
    // VitePress router intercepts the click, strips `.html`, and routes to a page that does not
    // exist. The build's dead-link check does not see it — the file is real, the route is not.
    for (const m of raw.matchAll(/\]\((\/[^)\s]+)\)/g)) {
      const target = m[1].replace(/[?#].*$/, '')
      if (publicPaths.has(target)) {
        report(file, n, 'public-asset-link', `markdown link to the public asset ${target} — the router`
          + ` rewrites it and lands on a 404; use <a href="${target}" target="_blank" rel="noopener">`)
      }
    }
  })
}

const substrateGlobs = readSubstrateGlobs()
const publicPaths = publicAssetPaths()
const all = walk(DOCS)
if (all.length === 0) {
  console.error(`check-docs: no markdown found under ${DOCS}/ — the walk is broken, not the docs`)
  process.exit(2)
}

let checked = 0
let substrate = 0
let generated = 0

for (const file of all) {
  const rel = relative(DOCS, file).split(sep).join('/')

  if (rel.startsWith(GENERATED)) {
    generated++
    continue
  }
  const isSubstrate = substrateGlobs.some((g) => matchesGlob(rel, g))
  const src = readFileSync(file, 'utf8')
  const lines = src.split(/\r?\n/)

  for (const { rule, re, detail, appliesToSubstrate } of CONTENT_RULES) {
    // Most content rules are about what the site publishes, so unpublished substrate is exempt.
    // real-world-name is not: this repo is PUBLIC, so a customer name in a retro note is exposed by
    // `git clone` whether or not VitePress renders the page. srcExclude does not make it private.
    if (isSubstrate && !appliesToSubstrate) continue
    lines.forEach((raw, i) => {
      // Every match, not just the first: a line carrying two violations should cost one round,
      // not two.
      for (const m of raw.matchAll(re)) report(file, i + 1, rule, `${detail} — found "${m[0]}"`)
    })
  }

  if (isSubstrate) {
    substrate++
    continue
  }

  checked++
  checkStructure(file, src, publicPaths)
}

const publicAssets = walkPublicAssets(PUBLIC_ASSETS)
for (const file of publicAssets) checkContent(file, readFileSync(file, 'utf8'), CONTENT_RULES)

console.log(
  `check-docs: ${checked} published pages checked`
  + ` · ${publicAssets.length} public asset(s) content-checked (${DOCS}/public/)`
  + ` · ${generated} generated (${DOCS}/${GENERATED}/) exempt`
  + ` · ${substrate} internal substrate (srcExclude) exempt`,
)

if (findings.length === 0) {
  console.log('check-docs: clean')
  process.exit(0)
}

findings.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line)
for (const f of findings) console.error(`${f.file}:${f.line}  [${f.rule}] ${f.detail}`)
console.error(`\ncheck-docs: ${findings.length} violation(s). Rules live in ${DOCS}/STYLE.md.`)
process.exit(1)
