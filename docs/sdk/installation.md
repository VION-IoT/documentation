---
title: Installation & CLI
description: Install the Dale CLI and use it to scaffold, build, test, and publish logic block libraries.
---

# Installation & CLI

The Dale CLI and SDK packages are published to [nuget.org](https://www.nuget.org/) under the `Vion.*` package prefix. The Dale SDK source is available on GitHub at [VION-IoT/dale-sdk](https://github.com/VION-IoT/dale-sdk/).

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) or later

## Install

```bash
dotnet tool install -g Vion.Dale.Cli
```

Verify the installation:

```bash
dale --version
# dale <version> - Vion IoT
```

## Commands

### `dale new` — Scaffold a Project

Creates a new logic block library with DevHost and test projects.

```bash
dale new MyLibrary
```

Output:
```
✔ Created MyLibrary

    MyLibrary/MyLibrary.csproj              (logic block library)
    MyLibrary/MyLibrary.DevHost.csproj       (local DevHost with web UI)
    MyLibrary/MyLibrary.Test.csproj          (tests)

  Next steps:
    cd MyLibrary
    dale build
    dale test
    dale dev                                (web UI at localhost:5000)
```

Use `--no-interactive` to skip prompts (useful in CI):

```bash
dale new MyLibrary --no-interactive
```

### `dale build` — Build

Builds the project and all dependencies.

```bash
dale build
```

Unrecognized options after `--` forward to `dotnet build`. Pass a build configuration this way:

```bash
dale build -- -c Release
```

### `dale test` — Run Tests

Runs unit tests using the Dale TestKit.

```bash
dale test
# Passed!  - Failed: 0, Passed: 4, Skipped: 0, Total: 4
```

Unrecognized options after `--` forward to `dotnet test`. Filter to a subset of tests this way:

```bash
dale test -- --filter Name~Foo
```

### `dale dev` — Local Development

Starts the DevHost with a web UI for live testing.

```bash
dale dev
# Web UI at http://localhost:5000
```

The DevHost lets you inspect and modify property values, simulate inputs, and debug logic block behavior — all in your browser.

Options:
| Flag | Description |
|------|-------------|
| `--headless` | Run without opening a browser. Serves the control API and prints a JSON readiness line on stdout — for tools, CI, and agents. |
| `--stepped` | Boot in deterministic stepping mode (a controllable virtual clock) so [Scenarios](/sdk/scenarios) step exactly instead of waiting on the wall clock. |
| `--export-config <file>` | Boot the wired network, write its configuration as JSON to `<file>`, and exit — the data source for `dale scenario validate` and `dale scenario schema`. See [Scenarios](/sdk/scenarios). |
| `--export-topology <file>` | Boot the wired network, write it as a `*.topology.json` dev profile to `<file>`, and exit — the migration path from a C# preset to a topology file. |
| `--preset <name>` | Pass `<name>` as the DevHost app's first program argument (`args[0]`) to select a consumer-defined preset. Combines with `--export-config` / `--export-topology` to export a non-default preset. |

Extra arguments after `--` forward to the DevHost app:

```bash
dale dev -- my-preset
```

### `dale list` — Introspect Project

Shows all logic blocks, contracts, properties, and measuring points.

```bash
dale list
```

```
  Project: MyDemo (v0.0.1)
  SDK: Vion.Dale.Sdk <version>

┌ HelloWorld ─────────────────┐
│ Properties │ Greeting       │
│ Measuring  │ TimesGreeted   │
└─────────────────────────────┘

┌ SmartLedController ──────────────────────────────────────────┐
│ Contracts  │ Button (DigitalInput), LED (DigitalOutput)      │
│ Properties │ Mode, LedEnabled, BlinkIntervalSeconds          │
│ Measuring  │ ButtonPressed, TotalBlinks, ButtonPressCount    │
└──────────────────────────────────────────────────────────────┘
```

Use `--output json` for machine-readable output (useful for CI/CD and AI agents):

```bash
dale list --output json
```

```json
{
  "packageId": "MyDemo",
  "version": "0.0.1",
  "sdkVersion": "<version>",
  "logicBlocks": [
    {
      "name": "HelloWorld",
      "contracts": [],
      "services": [{
        "properties": [{ "name": "Greeting", "type": "System.String" }],
        "measuringPoints": [{ "name": "TimesGreeted", "type": "System.Int32" }]
      }]
    }
  ]
}
```

### `dale scenario` — Scenario Files

Runs, validates, and scaffolds `*.scenario.json` checks against the DevHost.

```bash
dale scenario validate
```

The verbs `run`, `validate`, `schema`, `scaffold`, and `open` are documented in [Scenarios](/sdk/scenarios).

## `dale add` — Code Generation

Add elements to a logic block without writing boilerplate. Run these commands from inside the logic block project folder, or pass `--project <path>` to target it explicitly — unlike `dale new`, `dale build`, and `dale test`, `dale add` cannot auto-detect the right project from the solution root when multiple csproj files exist.

### Add a Logic Block

```bash
dale add logicblock TemperatureController --name "Temperature Controller" --icon temp-cold-line
# ✔ Added logicblock TemperatureController to MyLibrary
```

Options:
| Flag | Description |
|------|-------------|
| `--name` | Human-readable name, emitted as `[LogicBlock(Name = "…")]` (defaults to the class name) |
| `--icon` | Icon identifier, emitted as `[LogicBlock(Icon = "…")]` (a Remixicon name without the `ri-` prefix) |

### Add a Property

```bash
dale add serviceproperty TargetTemp --type double --to TemperatureController
# ✔ Added [ServiceProperty] double TargetTemp (private set) to TemperatureController
```

Options:
| Flag | Description |
|------|-------------|
| `-t`, `--type` (required) | C# type (`double`, `string`, `bool`, etc.) |
| `--to` | Target logic block (auto-detected if only one exists) |
| `--setter <private\|public>` | Setter visibility (default: `private`) |
| `--default-name` | Display name for the property (emitted as `[ServiceProperty(Title = "…")]`) |
| `--persistent` | Add `[Persistent]` attribute |
| `--group` | `[Presentation]` group — a `PropertyGroup` name or raw key |
| `--importance` | `[Presentation]` importance — `Primary`, `Secondary`, `Normal`, or `Hidden` |
| `--decimals` | `[Presentation]` numeric display precision |
| `--format` | `[Presentation]` date/duration/numeric format token |

Supplying any of `--group`, `--importance`, `--decimals`, or `--format` emits a `[Presentation(...)]` attribute alongside `[ServiceProperty]`.

### Add a Measuring Point

```bash
dale add measuringpoint CurrentTemp --type double --to TemperatureController
# ✔ Added [ServiceMeasuringPoint] double CurrentTemp to TemperatureController

dale add measuringpoint TotalEnergy --type double --to TemperatureController --persistent
# ✔ Added [ServiceMeasuringPoint][Persistent] double TotalEnergy to TemperatureController
```

Options:
| Flag | Description |
|------|-------------|
| `-t`, `--type` (required) | C# type (`double`, `string`, `bool`, etc.) |
| `--to` | Target logic block (auto-detected if only one exists) |
| `--default-name` | Display name for the measuring point (emitted as `[ServiceMeasuringPoint(Title = "…")]`) |
| `--persistent` | Add `[Persistent]` attribute (measuring points are not persistent by default) |
| `--kind` | Time-series shape — `Measurement`, `Total`, or `TotalIncreasing`, emitted as `[ServiceMeasuringPoint(Kind = MeasuringPointKind.…)]` |
| `--group` | `[Presentation]` group — a `PropertyGroup` name or raw key |
| `--importance` | `[Presentation]` importance — `Primary`, `Secondary`, `Normal`, or `Hidden` |
| `--decimals` | `[Presentation]` numeric display precision |
| `--format` | `[Presentation]` date/duration/numeric format token |

Measuring points are always generated with `private set;` — there is no `--setter` flag. `--kind` adds a `using Vion.Dale.Sdk.Core;` for `MeasuringPointKind` automatically.

### Add a Timer

```bash
dale add timer CheckInterval --interval 5 --to TemperatureController
# ✔ Added [Timer(5)] CheckInterval to TemperatureController
```

Options:
| Flag | Description |
|------|-------------|
| `-i`, `--interval` (required) | Timer interval in seconds (must be > 0) |
| `--to` | Target logic block (auto-detected if only one exists) |

### `dale pack` — Package

Creates a NuGet package (`.nupkg`) for distribution.

```bash
dale pack
```

Options:
| Flag | Description |
|------|-------------|
| `--version <version>` | Override the package version, e.g. from a tag or CI. |

### `dale upload` — Publish to Cloud

Packages and uploads the library to VION Cloud in one step.

```bash
dale upload
```

Requires authentication via `dale login` first. For CI/CD, use service account credentials:

```bash
dale upload --client-id $CLIENT_ID --client-secret $CLIENT_SECRET
```

Options:
| Flag | Description |
|------|-------------|
| `--client-id` | Keycloak client ID (for CI) |
| `--client-secret` | Keycloak client secret (for CI) |
| `--release-notes` | Release notes for this version |
| `-e`, `--environment` | Target environment (overrides stored config) |
| `--integrator-id` | Integrator ID (overrides stored config) |
| `--version <version>` | Override the package version, e.g. from a tag or CI. |
| `--skip-duplicate` | Treat 409 Conflict (version already exists) as success — safe for CI re-runs |

### `dale login` / `dale logout` / `dale whoami` — Authentication

```bash
dale login                          # Opens browser for Keycloak OAuth
dale login --environment production # Target a specific environment
dale whoami                         # Show current identity
dale logout                         # Clear stored credentials
```

### `dale config` — Configuration

```bash
dale config show                            # Show current config
dale config set-environment production      # Switch environment
dale config set-integrator                  # Select active integrator (interactive)
```

`set-integrator` fetches the current user's integrator memberships from the cloud and prompts to pick one. There are no flags — run `dale login` first.

`set-environment` accepts the following options:

| Flag | Description |
|------|-------------|
| `<name>` (argument) | Environment name. `production` and `test` are built in. Anything else is treated as a custom environment. |
| `--auth-url` | Custom auth base URL (required for custom environments). |
| `--api-url` | Custom API base URL (required for custom environments). |
| `-f`, `--force` | Skip the confirmation prompt that warns when switching environments clears the active integrator. |

Custom environments:

```bash
dale config set-environment custom \
  --auth-url https://auth.example.com/realms/vion \
  --api-url https://api.example.com
```

## Project Structure

`dale new` creates three projects:

```
MyLibrary/
├── MyLibrary/                    # Logic block library (netstandard2.1)
│   ├── MyLibrary.csproj
│   ├── DependencyInjection.cs    # Service registration
│   ├── HelloWorld.cs             # Example logic block
│   └── SmartLedController.cs     # Example with I/O contracts
├── MyLibrary.DevHost/            # DevHost (net10.0)
│   └── MyLibrary.DevHost.csproj
└── MyLibrary.Test/               # Unit tests (net10.0)
    └── MyLibrary.Test.csproj
```

## Global Options

All commands support these options:

| Option | Description |
|--------|-------------|
| `--output <json\|table>` | Output format. `json` suppresses human-readable output and emits structured JSON — ideal for CI/CD pipelines and AI coding agents. |
| `--project <path>` | Path to a specific `.csproj` file. Auto-detected if omitted. |
| `--verbose` | Show detailed diagnostic output. |
