---
title: Quick Start
description: Scaffold the Dale SDK template, explore the worked Thermostat, run it locally, replay a scenario, test it, and add your own logic block in about 15 minutes.
---

# Quick Start

This guide scaffolds a logic block library from the Dale SDK template, walks through the worked Thermostat it ships, runs it in the DevHost, replays a scenario, runs the tests, and adds a second logic block of your own — all with the Dale CLI.

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- A terminal (bash, PowerShell, or cmd)

## Install the Dale CLI

Install the CLI as a global .NET tool:

```bash
dotnet tool install -g Vion.Dale.Cli
```

Verify the installation:

```bash
dale --version
```

The CLI and SDK packages are on [nuget.org](https://www.nuget.org/) under the `Vion.*` prefix. The Dale SDK source is available at [VION-IoT/dale-sdk](https://github.com/VION-IoT/dale-sdk/). See [Installation](/sdk/installation) for details.

## Create a New Project

Scaffold a new library from the template:

```bash
dale new SmartThermostat
```

`dale new` prompts for two values only: the project name (taken from the argument above) and the author (default `MyCompany`). The package ID is forced equal to the project name, so there is no separate package prompt and no "first logic block" prompt — the template always ships its own worked example. Pass `--no-interactive` to accept the defaults without prompting.

This scaffolds a complete solution:

```text
SmartThermostat/
├── SmartThermostat/                       # Logic block library (the publishable package)
│   ├── Thermostat.cs                      # Worked example logic block
│   ├── DependencyInjection.cs             # Service registration
│   └── SmartThermostat.csproj
├── SmartThermostat.DevHost/               # Local DevHost (folder-driven web UI)
├── SmartThermostat.Test/                  # xUnit tests
│   └── ThermostatShould.cs
├── topologies/
│   └── default.topology.json              # Which block instances the DevHost wires up
├── scenarios/
│   └── thermostat.scenario.json           # A replayable, asserted scenario
├── README.md
├── AGENTS.md                              # Agent conventions and patterns
├── CLAUDE.md                              # AI agent instructions
├── .gitignore
└── SmartThermostat.sln
```

## Explore the Generated Code

`Thermostat.cs` is a self-contained room-thermostat simulation — it reads a setpoint, drives a simulated heater/cooler, and reports live state, exercising the core SDK surface with no hardware and no other blocks. The full block is longer than a quick start needs, so the excerpt below shows the members that matter; open the file to read the simulation loop in full.

```csharp
using System;
using Microsoft.Extensions.Logging;
using Vion.Dale.Sdk.Core;

namespace SmartThermostat
{
    [LogicBlock(Name = "Thermostat", Icon = "temp-hot-line",
        Groups = new[] { PropertyGroup.Status, PropertyGroup.Configuration, PropertyGroup.Metric })]
    public class Thermostat : LogicBlockBase
    {
        private readonly ILogger _logger;
        private double _roomCelsius = 19.0;

        // Configuration — what you set (writable; persists across restarts).
        [ServiceProperty(Unit = "°C", Minimum = 5, Maximum = 30, Description = "The temperature the thermostat aims for.")]
        [Presentation(Group = PropertyGroup.Configuration, Importance = Importance.Primary, UiHint = UiHints.Slider, Decimals = 1)]
        public double TargetTemperature { get; set; } = 21.0;

        [ServiceProperty(Description = "Which way the thermostat is allowed to act.")]
        [Presentation(Group = PropertyGroup.Configuration)]
        public ThermostatMode Mode { get; set; } = ThermostatMode.Auto;

        // Status — what it is doing (read-only), shown as a colour-coded pill.
        [ServiceMeasuringPoint(Description = "What the thermostat is doing right now.")]
        [Presentation(DisplayName = "Status", Group = PropertyGroup.Status, StatusIndicator = true, Importance = Importance.Primary)]
        public ThermostatStatus Status { get; private set; } = ThermostatStatus.Idle;

        // One member that is BOTH a writable property and a read-only measuring point.
        [ServiceProperty(Unit = "°C", Description = "Live room temperature — also writable, so you can inject a reading for testing.")]
        [ServiceMeasuringPoint]
        [Presentation(Group = PropertyGroup.Status, Importance = Importance.Primary, Decimals = 1)]
        public double CurrentTemperature
        {
            get => Math.Round(_roomCelsius, 2);
            set => _roomCelsius = value;
        }

        // Metric — a billing-style accumulator that never resets.
        [ServiceMeasuringPoint(Unit = "kWh", Kind = MeasuringPointKind.TotalIncreasing, Description = "Energy used since start — never resets.")]
        [Presentation(Group = PropertyGroup.Metric, Decimals = 3)]
        public double EnergyUsedKwh { get; private set; }

        public Thermostat(ILogger logger) : base(logger)
        {
            _logger = logger;
        }

        [Timer(1)]
        public void Tick()
        {
            // Control loop + room-physics simulation — see Thermostat.cs for the body.
        }

        protected override void Ready()
        {
            _logger.LogInformation("Thermostat ready — aiming for {Target} °C.", TargetTemperature);
        }
    }
}
```

What you see here:

- `TargetTemperature` — a writable `[ServiceProperty]` with a `[Presentation]` slider hint and `Minimum`/`Maximum` bounds. Properties with a public setter persist across restarts.
- `Mode` — a writable enum property, which the UI renders as a dropdown.
- `Status` — a read-only `[ServiceMeasuringPoint]` enum with `StatusIndicator = true`, rendered as a colour-coded pill. The pill colour and label come from `[Severity]` and `[EnumLabel]` on the `ThermostatStatus` enum members.
- `CurrentTemperature` — one member carrying BOTH `[ServiceProperty]` and `[ServiceMeasuringPoint]`. You watch the live value and can also inject a reading for testing. The metadata is declared once on the property and the bare measuring point inherits it.
- `EnergyUsedKwh` — a `[ServiceMeasuringPoint]` with `Kind = MeasuringPointKind.TotalIncreasing`, a billing-style accumulator that only ever climbs.
- `[Timer(1)]` — calls `Tick()` once per second. The method runs inside the actor context, so it is thread-safe.
- `Ready()` — runs once at startup for initialization.

The two enums (`ThermostatMode` and `ThermostatStatus`) live in the same file. For the full attribute reference, see [Properties & Measuring Points](/sdk/properties) and [Declarative Presentation](/sdk/declarative-presentation).

## Run Locally

Start the DevHost to run the library with a web UI:

```bash
dale dev
```

Open `http://localhost:5000` in your browser. Drag the **Target Temperature** slider and watch **Current Temperature** track toward it while the **Status** pill changes colour — green `Idle`, then `Heating` or `Cooling` as the controller engages. The energy meter climbs while the thermostat is actively heating or cooling.

The DevHost is folder-driven: it discovers which block instances to wire up from `topologies/default.topology.json`, so you do not edit `Program.cs`. Register new blocks in `DependencyInjection.cs` and add their instances to the topology file.

## Run the Scenario

The template ships `scenarios/thermostat.scenario.json` — a replayable, asserted run that stages a cold start, asks for 24 °C, steps a virtual clock, and checks the room heats and the energy meter ticks. Boot the DevHost in deterministic stepping mode so timers advance exactly instead of on the wall clock:

```bash
dale dev --stepped
```

In a second terminal, run the scenario against the running DevHost and print its report:

```bash
dale scenario run thermostat
```

Scenarios are the committed, replayable check that the Player, CI, and agents all run from the same file. See [Scenarios](/sdk/scenarios) for the authoring loop.

## Run Tests

The template includes xUnit tests (xunit.v3) written with the Dale TestKit. `ThermostatShould.cs` constructs the block with a mocked logger, calls `InitializeForTest()`, and asserts behaviour after a `Tick()`. Run them with:

```bash
dale test
```

`dale test` forwards unrecognized options to `dotnet test` — for example `dale test --filter Heat_WhenRoomIsBelowTheSetpoint`. See [Testing](/sdk/testing) for the full TestKit surface.

## Add Your Own Logic Block

The Thermostat shows the pattern; now add a second, unrelated block — a water-tank level monitor. `dale add logicblock` writes the new class into the library project, so run it from inside that project folder:

```bash
cd SmartThermostat
dale add logicblock WaterTank --name "Water Tank" --icon drop-line
```

The `--name` flag sets the human-readable `[LogicBlock(Name = ...)]`, and `--icon` sets `[LogicBlock(Icon = ...)]` using a [Remixicon](https://remixicon.com/) name without the `ri-` prefix. Both default to the class name and a generic icon when omitted.

Open `SmartThermostat/WaterTank.cs` and replace the generated body with a level monitor that reports a status pill. A `StatusIndicator` measuring point must be an enum, so the status is a dedicated enum whose members carry `[Severity]` and `[EnumLabel]`:

```csharp
using Microsoft.Extensions.Logging;
using Vion.Dale.Sdk.Core;

namespace SmartThermostat
{
    [LogicBlock(Name = "Water Tank", Icon = "drop-line",
        Groups = new[] { PropertyGroup.Status, PropertyGroup.Configuration })]
    public class WaterTank : LogicBlockBase
    {
        private readonly ILogger _logger;

        [ServiceProperty(Unit = "%", Minimum = 0, Maximum = 100, Description = "Warn below this fill level.")]
        [Presentation(Group = PropertyGroup.Configuration, UiHint = UiHints.Slider)]
        public double LowLevelThreshold { get; set; } = 20.0;

        [ServiceProperty(Unit = "%", Description = "Current tank fill level — writable so you can inject a reading.")]
        [ServiceMeasuringPoint]
        [Presentation(Group = PropertyGroup.Status, Importance = Importance.Primary, Decimals = 0)]
        public double FillLevel { get; set; } = 80.0;

        [ServiceMeasuringPoint(Description = "Whether the tank is below its low-level threshold.")]
        [Presentation(DisplayName = "Status", Group = PropertyGroup.Status, StatusIndicator = true, Importance = Importance.Primary)]
        public TankStatus Status { get; private set; } = TankStatus.Ok;

        public WaterTank(ILogger logger) : base(logger)
        {
            _logger = logger;
        }

        [Timer(2)]
        public void Check()
        {
            Status = FillLevel < LowLevelThreshold ? TankStatus.Low : TankStatus.Ok;
        }

        protected override void Ready()
        {
            _logger.LogInformation("Water tank ready — warning below {Threshold} %.", LowLevelThreshold);
        }
    }

    public enum TankStatus
    {
        [Severity(StatusSeverity.Success)]
        [EnumLabel("OK")]
        Ok,

        [Severity(StatusSeverity.Warning)]
        [EnumLabel("Low")]
        Low,
    }
}
```

Register the new block in `DependencyInjection.cs`:

```csharp
using Microsoft.Extensions.DependencyInjection;
using Vion.Dale.Sdk.Core;

namespace SmartThermostat
{
    public class DependencyInjection : IConfigureServices
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<Thermostat>();
            services.AddTransient<WaterTank>();
        }
    }
}
```

Add an instance to `topologies/default.topology.json` so the DevHost wires it up, then run `dale dev` again to see both blocks. In production, `FillLevel` would come from a sensor through a [service provider contract](/sdk/services) rather than being set by hand.

## Inspect the Project

To see what the toolchain discovers in your library — logic blocks, contracts, and properties — run:

```bash
dale list
```

## Build, Package, and Upload

Build and package the library:

```bash
dale build
dale pack
```

To publish to VION Cloud, authenticate and upload:

```bash
dale login
dale upload
```

Once uploaded, your logic block library is available for deployment to edge gateways through the [VION Dashboard](https://dashboard.vion.swiss). See [Publishing](/sdk/publishing) for the full release flow.

## Next Steps

- [Logic Blocks](/sdk/logic-blocks) — lifecycle methods, thread safety, attributes
- [Properties & Measuring Points](/sdk/properties) — emission, units, categories, computed values
- [Declarative Presentation](/sdk/declarative-presentation) — groups, importance, UI hints, status indicators
- [Scenarios](/sdk/scenarios) — replayable, asserted runs of your blocks
- [Service Provider Contracts](/sdk/services) — connect to hardware I/O and Modbus devices
- [Testing](/sdk/testing) — unit testing with the Dale TestKit
- [AI-Assisted Development](/agentic/) — use Claude Code or other AI agents with the scaffolded AGENTS.md
