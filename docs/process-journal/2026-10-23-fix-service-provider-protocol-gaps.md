2026-10-23 · gate · pnpm · `pnpm install` refused in the new worktree: host Node 26 and pnpm 11.20 sit outside package.json engines (node ^22, pnpm ^10 || 11.13.0); `pnpm check` and `pnpm build` were run as their node scripts against the main checkout's node_modules through a temporary junction. (self)

2026-10-23 · brief · service-provider-protocol-gaps · brief gave "the broker keeps retained messages in memory only" as the reason for the republish rule; nothing in the workspace confirms it (the only broker config found is an upstream sample that sets a storage directory), so the page states the duty without that reason. (self)

2026-10-23 · review · service-provider-protocol · republish duty was a bare directive with no reason; asked for the reason in two steps — Mesh learns values only by subscribing, so they are retained; the broker retains in memory only, so every connect republishes — and for the first step scoped to Mesh rather than "state is never queried".
