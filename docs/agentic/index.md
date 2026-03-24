---
title: AI-Assisted Development
description: Why VION's Dale SDK and CLI are designed for AI coding agents, enabling fast, reliable IoT development.
---

# AI-Assisted Development

The Dale SDK is built with patterns that make it an excellent fit for AI-assisted coding — whether you use Claude Code, GitHub Copilot, Cursor, or any other AI coding tool.

## Why Dale Works Well with AI Agents

Most IoT development involves boilerplate: declaring properties, wiring events, setting up timers, handling state. Dale's **attribute-based design** turns these into declarative patterns that AI agents can generate reliably.

A logic block is essentially a class with:
- Attributes that describe its structure (`[ServiceProperty]`, `[Timer]`, `[ServiceProviderContract]`)
- A single entry point (`Ready()`) for event wiring
- Strongly-typed interfaces for inter-block communication

This is exactly the kind of structured, pattern-driven code that AI agents excel at generating.

## The CLI as the Agent's Interface

The Dale CLI gives AI agents a complete development feedback loop:

| Command | What the Agent Gets |
|---------|-------------------|
| `dale new MyProject` | Scaffolded project with build, test, and DevHost setup |
| `dale build` | Compile errors to fix |
| `dale test` | Test failures to diagnose |
| `dale list --output json` | Machine-readable project introspection |
| `dale add logicblock Thermostat` | Code generation without writing boilerplate |
| `dale add serviceproperty Temperature --type double` | Add properties via command |
| `dale add timer Poll --interval 5` | Add timers via command |

The `--output json` flag on every command means agents can parse results programmatically rather than scraping terminal output.

## What This Means in Practice

Instead of writing logic blocks line by line, you describe what you want:

> "Create a logic block that reads temperature from a Modbus RTU device every 5 seconds, exposes it as a service property, and turns on a cooling relay when it exceeds 30°C"

An AI agent with access to the Dale CLI and SDK documentation can:

1. `dale add logicblock TemperatureController`
2. Add the Modbus and digital output contracts
3. Implement the polling and control logic
4. Write tests using the TestKit
5. `dale build` and `dale test` to verify
6. `dale upload` to publish

This workflow turns natural-language requirements into deployed IoT logic in minutes.

## Tool-Agnostic

This approach works with any AI coding tool that can run shell commands and edit files. The Dale CLI and SDK don't depend on any specific AI product — they provide the structure and feedback loop that any agent can use.

See [Getting Started](/agentic/getting-started) for setup instructions.
