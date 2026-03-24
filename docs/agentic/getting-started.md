---
title: Getting Started with AI Agents
description: Setting up an AI coding agent for Dale development.
---

# Getting Started with AI Agents

## Prerequisites

- Dale CLI installed (`dotnet tool install -g Dale.Cli`)
- An AI coding tool that can run shell commands (Claude Code, Cursor, GitHub Copilot in terminal, etc.)

## Project Setup

Create a new project with the Dale CLI:

```bash
dale new MyProject
```

This scaffolds a complete project with a library, DevHost, and test project — including tailored **AGENTS.md** and **CLAUDE.md** files that give AI agents immediate context.

## Agent Context (Included Automatically)

Projects created with `dale new` include an `AGENTS.md` file with:

- All CLI commands and their usage
- SDK conventions and attribute reference table
- Project structure explanation
- Code style rules (explicit usings, nullable enabled, netstandard2.1)
- Common patterns (property change tracking, persistence, timers)
- DevHost instructions

A `CLAUDE.md` file is also included that references `AGENTS.md`, so Claude Code picks it up automatically. Other tools like Cursor and Windsurf read `AGENTS.md` directly.

::: tip
If you're working on an existing project that doesn't have these files, run `dale new` in a temp directory and copy the generated `AGENTS.md` as a starting point. Customize it for your project's specific logic blocks and domain.
:::

## Project Introspection

Have the agent run `dale list --output json` to understand the current project structure:

```bash
dale list --output json
```

This returns a machine-readable overview of all logic blocks, their properties, measuring points, contracts, and interfaces. The agent can use this to understand what exists and what to add.

## Recommended Workflow

1. **Describe what you want** in natural language
2. **Let the agent scaffold** using `dale add` commands or direct code generation
3. **Build** — `dale build` catches compile errors immediately
4. **Test** — `dale test` runs TestKit tests
5. **Iterate** — the agent fixes errors and adds tests
6. **Verify visually** — `dale dev` starts DevHost for manual testing
7. **Publish** — `dale upload` when ready

## Tips for Effective Prompting

- **Be specific about data types**: "a double property called Temperature in Celsius" is better than "a temperature property"
- **Mention the update interval**: "poll every 2 seconds" gives the agent what it needs for `[Timer(2)]`
- **Reference existing patterns**: "like the PingPong example" or "similar to the EM122 Modbus block"
- **Ask for tests**: "and write tests that verify the control logic" ensures coverage
