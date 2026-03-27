---
title: Quick Start
description: Build and run your first VION logic block library in 15 minutes.
---

# Quick Start

This guide walks you through creating, testing, and running a logic block library locally using the Dale CLI.

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- A terminal (bash, PowerShell, or cmd)

## Install the Dale CLI

```bash
dotnet tool install -g Dale.Cli
```

Verify the installation:

```bash
dale --version
```

## Create a New Project

```bash
dale new my-first-library
```

The Dale CLI will interactively prompt you for:
- **Package ID** — a unique identifier for your library (e.g., `com.mycompany.my-first-library`)
- **Author** — your name or organization
- **First logic block name** — the name of your first logic block class

This scaffolds a complete project structure:

```
my-first-library/
├── MyFirstLibrary/               # Logic block library
│   ├── DependencyInjection.cs    # Service registration
│   └── MyLogicBlock.cs           # Your first logic block
├── MyFirstLibrary.DevHost/       # Local development server
└── MyFirstLibrary.Test/          # Unit tests
```

## Explore the Generated Code

Open `MyFirstLibrary/MyLogicBlock.cs` to see a basic logic block:

```csharp
[LogicBlock]
public class MyLogicBlock : LogicBlockBase
{
    public override Task Ready()
    {
        // Your logic starts here
        return Task.CompletedTask;
    }
}
```

## Run Locally

Start the DevHost to test your logic block with a web UI:

```bash
dale dev
```

Open `http://localhost:5000` in your browser. You'll see your logic block running with controls to inspect and modify properties in real-time.

## Add a Property

Add a configurable property to your logic block:

```bash
dale add serviceproperty Temperature --type double --to MyLogicBlock
```

This generates the property with the correct attributes and registers it automatically.

## Run Tests

```bash
dale test
```

## Build and Package

```bash
dale build
dale pack
```

## Publish to VION Cloud

To upload your library to VION Cloud, you need a VION account. If you don't have one yet, you can start with the **trial workflow** in the [VION Dashboard](https://dashboard.vion.swiss) — it guides you through account creation and your first upload.

```bash
dale login
dale upload
```

Once uploaded, your logic block library is available for deployment to edge gateways through the Dashboard.

## Next Steps

- [logic blocks](/sdk/logic-blocks) — learn about lifecycle, state, and attributes
- [Properties & Measuring Points](/sdk/properties) — observable state and telemetry
- [Testing](/sdk/testing) — unit testing with TestKit and DevHost
- [AI-Assisted Development](/agentic/) — use AI coding agents with VION
