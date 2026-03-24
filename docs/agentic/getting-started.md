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

This scaffolds a complete project with a library, DevHost, and test project. The AI agent can immediately start working.

## Give the Agent Context

The most important step is giving your AI agent context about the Dale SDK. Two approaches:

### Option 1: CLAUDE.md / AGENTS.md (Recommended)

Create a `CLAUDE.md` (or `AGENTS.md`) file in your project root. This file is automatically read by Claude Code and other AI tools that support it:

```markdown
# MyProject

Dale LogicBlock library for building automation.

## Commands
- `dale build` — Build the project
- `dale test` — Run tests
- `dale list --output json` — Introspect logic blocks
- `dale dev` — Start DevHost with web UI at http://localhost:5000
- `dale add logicblock <Name>` — Add a new logic block
- `dale add serviceproperty <Name> --type <type>` — Add a property
- `dale add measuringpoint <Name> --type <type>` — Add a measuring point
- `dale add timer <MethodName> --interval <seconds>` — Add a timer

## Patterns
- Logic blocks extend `LogicBlockBase`
- Properties use `[ServiceProperty]` and `[ServiceMeasuringPoint]` attributes
- Hardware I/O uses `[ServiceProviderContract]` with interfaces like `IDigitalInput`
- Inter-block communication uses contracts with `[Command]`, `[RequestResponse]`, `[StateUpdate]`
- Tests use `LogicBlockTestHelper.CreateLoggerMock()` and `.InitializeForTest()`
- Override `Ready()` to attach event handlers — it runs when the block is fully initialized

## Build & Test
Always run `dale build` after changes to check for errors.
Always run `dale test` to verify logic.
```

### Option 2: Project Introspection

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
