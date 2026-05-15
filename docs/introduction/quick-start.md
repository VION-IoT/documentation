---
title: Quick Start
description: Create, extend, test, and run your first logic block library in 15 minutes.
---

# Quick Start

This guide walks you through creating a logic block library, adding properties and a timer, testing it, and running it locally — all using the Dale CLI.

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- A terminal (bash, PowerShell, or cmd)

## Install the Dale CLI

```bash
dotnet tool install -g Vion.Dale.Cli
```

Verify the installation:

```bash
dale --version
```

The CLI and SDK packages are on [nuget.org](https://www.nuget.org/) under the `Vion.*` prefix. The Dale SDK source is available at [VION-IoT/dale-sdk](https://github.com/VION-IoT/dale-sdk/).

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
using Vion.Dale.Sdk.Core;
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

    /// <summary>Called every 5 seconds by the Dale runtime.</summary>
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

## Add Your Own Logic Block

The scaffolded HelloWorld shows the basics. Now create a second logic block — a simple thermostat controller. `dale add` runs from inside the logic block project folder:

```bash
cd SmartThermostat
dale add logicblock Thermostat
```

Open `SmartThermostat/Thermostat.cs` and replace the generated code:

```csharp
using Vion.Dale.Sdk.Core;
using Microsoft.Extensions.Logging;

[LogicBlock(Name = "Thermostat", Icon = "temp-cold-line")]
public class Thermostat : LogicBlockBase
{
    private readonly ILogger _logger;

    [ServiceProperty(Title = "Target Temperature", Unit = "°C")]
    [Presentation(Group = PropertyGroup.Configuration)]
    public double TargetTemperature { get; set; } = 21.0;

    [ServiceProperty(Title = "Heating Active")]
    [ServiceMeasuringPoint]
    [Presentation(Group = PropertyGroup.Status, Importance = Importance.Primary)]
    public bool HeatingActive { get; private set; }

    [ServiceMeasuringPoint(Title = "Current Temperature", Unit = "°C")]
    [Presentation(Group = PropertyGroup.Status, Importance = Importance.Secondary)]
    public double CurrentTemperature { get; private set; }

    public Thermostat(ILogger logger) : base(logger)
    {
        _logger = logger;
    }

    [Timer(2)]
    public void Poll()
    {
        // In production, this would read from a sensor via a service provider contract.
        // For local testing, the DevHost UI lets you set CurrentTemperature manually.
        HeatingActive = CurrentTemperature < TargetTemperature;

        _logger.LogInformation(
            "Thermostat: {Current:F1}°C / {Target:F1}°C → {State}",
            CurrentTemperature, TargetTemperature,
            HeatingActive ? "HEATING" : "idle");
    }

    protected override void Ready()
    {
        _logger.LogInformation("Thermostat ready. Target: {Target}°C", TargetTemperature);
    }
}
```

This logic block has:
- **`TargetTemperature`** — a writable property that operators can adjust from the dashboard, rendered in the **Configuration** section
- **`CurrentTemperature`** — a measuring point (in production, read from a sensor via a [service provider contract binding](/sdk/services)), rendered prominently in the **Status** section
- **`HeatingActive`** — both a property and a measuring point, surfaced as the primary tile value
- **`[Timer(2)]`** — polls every 2 seconds
- **`[Presentation(Group = ..., Importance = ...)]`** — separates UI hints from the schema, so `[ServiceProperty]` stays focused on the value itself (see [Declarative Presentation](/sdk/declarative-presentation))

Run `dale dev` and open the DevHost. You can change `TargetTemperature` and `CurrentTemperature` through the UI and watch `HeatingActive` respond in real-time.

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
