---
title: Getting Started with AI Agents
description: Setting up an AI coding agent for Dale development.
---

# Getting Started with AI Agents

## Prerequisites

- Dale CLI installed (`dotnet tool install -g Vion.Dale.Cli`)
- An AI coding tool that can run shell commands (Claude Code, Cursor, GitHub Copilot in terminal, etc.)

## Project Setup

Create a new project with the Dale CLI:

```bash
dale new MyProject
```

This scaffolds a complete project with a library, DevHost, and test project — including tailored **AGENTS.md** and **CLAUDE.md** files that give AI agents immediate context.

## Agent Context (Included Automatically)

Projects created with `dale new` include an `AGENTS.md` file with:

- All CLI commands and their usage, including the scenario commands
- SDK conventions and an attribute reference table
- Project structure explanation (library, test, DevHost, `topologies/`, `scenarios/`)
- Code style rules (explicit usings, nullable enabled, netstandard2.1 for the library)
- Common patterns (property change tracking, persistence, timers)
- Instructions for verifying headlessly through the DevHost and scenario files

The test project is xUnit (xunit.v3). Tests reference `Vion.Dale.Sdk.TestKit` for stubbed-collaborator unit tests, and `Vion.Dale.DevHost.Xunit` for wired-network scenario tests.

A `CLAUDE.md` file is also included. It is a one-line pointer to `AGENTS.md`, so Claude Code picks up the conventions automatically. Other tools like Cursor and Windsurf read `AGENTS.md` directly.

::: tip
If you're working on an existing project that doesn't have these files, run `dale new` in a temp directory and copy the generated `AGENTS.md` as a starting point. Customize it for your project's specific logic blocks and domain.
:::

## Project Introspection

Have the agent run `dale list --output json` to understand the current project structure:

```bash
dale list --output json
```

This returns a machine-readable overview of all logic blocks, their properties, measuring points, contracts, and interfaces. The agent can use this to understand what exists and what to add.

## Headless and Deterministic Runs

An agent verifies behavior by booting the DevHost headless and deterministic, then driving a committed scenario against it. Two flags on `dale dev` make the host agent-drivable:

```bash
dale dev --headless --stepped
```

`--headless` runs the host without opening a browser. It serves the control API and prints a JSON readiness line on stdout — `{"ready":true,"port":...}` — that the agent parses to learn the port before driving a scenario.

`--stepped` boots a deterministic virtual clock instead of the wall clock. Under the stepped clock, timers idle between runs and a scenario steps the clock explicitly: `advance` jumps the clock and fires `[Timer]` methods, and emission happens immediately under the stepped clock rather than after a real-time delay. The result is reproducible runs — the same scenario produces the same report every time, with no flakiness from wall-clock timing.

The DevHost boots the real wired network, the same messaging path that runs on the edge gateway. This catches wired-path bugs that the TestKit's stubbed collaborators miss.

## Recommended Workflow

Center the loop on a committed scenario the agent can run and re-run:

1. **Describe what you want** in natural language
2. **Let the agent scaffold** using `dale add` commands or direct code generation
3. **Build** — `dale build` catches compile errors immediately
4. **Author a scenario** — describe setup, steps, and expectations in a `scenarios/*.scenario.json` file (see [Scenarios](/sdk/scenarios))
5. **Run the loop** — boot `dale dev --headless --stepped`, then `dale scenario run <id>`; the agent reads the structured report and iterates on the failure detail
6. **Gate offline** — `dale scenario validate` resolves every name path and topology without a running host, the check to run in CI
7. **Graduate when needed** — `dale scenario scaffold <id>` turns a scenario into a typed xUnit test the agent runs with `dale test`
8. **Publish** — `dale upload` when ready

## Tips for Effective Prompting

- **Be specific about data types**: "a double property called Temperature in Celsius" is better than "a temperature property"
- **Mention the update interval**: "poll every 2 seconds" gives the agent what it needs for `[Timer(2)]`
- **Reference existing patterns**: "like the PingPong example" or "similar to the EM122 Modbus block"
- **Ask for tests**: "and write tests that verify the control logic" ensures coverage
