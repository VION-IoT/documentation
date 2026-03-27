---
title: Quick Start
description: Create, extend, test, and run a logic block library in 15 minutes.
---

# Quick Start

This guide walks you through creating a logic block library, adding properties and a timer, testing it, and running it locally — all using the Dale CLI.

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

::: info Early Access
The Dale CLI is currently distributed via a private NuGet feed. Contact [VION](https://vion.swiss) for access. Public NuGet distribution is planned.
:::

## Create a New Project

```bash
dale new SmartThermostat
```

The Dale CLI prompts for a package ID, author, and first logic block name. Defaults are shown in brackets — press Enter to accept them.

This scaffolds a complete project:

```
SmartThermostat/
├── SmartThermostat/               # Logic block library
│   ├── DependencyInjection.cs     # Service registration
│   ├── HelloWorld.cs              # Simple example logic block
│   └── SmartLedController.cs      # Comprehensive I/O example
├── SmartThermostat.DevHost/       # Local DevHost with web UI
├── SmartThermostat.Test/          # Unit tests
├── CLAUDE.md                      # AI agent instructions
└── AGENTS.md                      # Agent conventions and patterns
```

## Explore the Generated Code

The scaffolded `HelloWorld.cs` shows the essential building blocks — a writable property, a read-only measuring point, and a timer:

```csharp
using Dale.Sdk.Core;
using Microsoft.Extensions.Logging;

public class HelloWorld : LogicBlockBase
{
    private readonly ILogger _logger;

    /// <summary>A writable property for the greeting message.</summary>
    [ServiceProperty]
    public string Greeting { get; set; } = "Hello, World!";

    /// <summary>A measuring point tracking how many times we greeted.</summary>
    [ServiceMeasuringPoint]
    public int TimesGreeted { get; private set; }

    public HelloWorld(ILogger logger) : base(logger)
    {
        _logger = logger;
    }

    /// <summary>Called every 5 seconds by the runtime.</summary>
    [Timer(5)]
    public void Greet()
    {
        _logger.LogInformation(Greeting);
        TimesGreeted++;
    }

    protected override void Ready()
    {
        _logger.LogInformation("HelloWorld is ready.");
    }
}
```

What you see here:

- **`[ServiceProperty]`** with a public setter makes `Greeting` writable — you can change it from the Dashboard or API at runtime, and it is automatically persisted across restarts.
- **`[ServiceMeasuringPoint]`** with a private setter makes `TimesGreeted` a read-only metric. It is recorded over time and visible in dashboards.
- **`[Timer(5)]`** calls `Greet()` every 5 seconds. The method runs inside the actor context, so it is thread-safe.
- **`Ready()`** is where initialization happens — subscribe to events, set initial state.

## Run Locally

Start the DevHost to test your logic block with a web UI:

```bash
dale dev
```

Open `http://localhost:5000` in your browser. The DevHost shows your logic blocks with controls to inspect properties, modify writable values, and watch measuring points update in real-time.

## Add Your Own Property

Use the Dale CLI to add a service property without writing boilerplate:

```bash
dale add serviceproperty TargetTemperature --type double --to HelloWorld
```

This generates the property with the correct attributes. Open `HelloWorld.cs` to see the result:

```csharp
[ServiceProperty]
public double TargetTemperature { get; set; }
```

Add a measuring point for the current temperature:

```bash
dale add measuringpoint CurrentTemperature --type double --to HelloWorld
```

Now use them in the timer:

```csharp
[Timer(5)]
public void Greet()
{
    // Simulate a temperature reading
    CurrentTemperature = 18.0 + Random.Shared.NextDouble() * 4.0;

    if (CurrentTemperature < TargetTemperature)
        _logger.LogInformation("Heating: {Current}°C → {Target}°C", CurrentTemperature, TargetTemperature);
    else
        _logger.LogInformation("Target reached: {Current}°C", CurrentTemperature);

    TimesGreeted++;
}
```

Run `dale dev` again and watch the temperature values update in the DevHost UI.

## Run Tests

The scaffolded project includes unit tests. Run them with:

```bash
dale test
```

## Build, Package, and Upload

Build and package your library:

```bash
dale build
dale pack
```

To upload to VION Cloud, authenticate and upload in one step:

```bash
dale login
dale upload
```

Once uploaded, your logic block library is available for deployment to edge gateways through the [VION Dashboard](https://dashboard.vion.swiss).

## Next Steps

- [Logic Blocks](/sdk/logic-blocks) — lifecycle methods, thread safety, attributes
- [Properties & Measuring Points](/sdk/properties) — categories, display hints, computed properties
- [Service Provider Contracts](/sdk/services) — connect to hardware I/O and Modbus devices
- [Testing](/sdk/testing) — unit testing with the Dale TestKit
- [AI-Assisted Development](/agentic/) — use Claude Code or other AI agents with the scaffolded AGENTS.md
