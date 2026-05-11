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
# dale 1.0.0 - Vion IoT
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

### `dale test` — Run Tests

Runs unit tests using the Dale TestKit.

```bash
dale test
# Passed!  - Failed: 0, Passed: 4, Skipped: 0, Total: 4
```

### `dale dev` — Local Development

Starts the DevHost with a web UI for live testing.

```bash
dale dev
# Web UI at http://localhost:5000
```

The DevHost lets you inspect and modify property values, simulate inputs, and debug logic block behavior — all in your browser.

### `dale list` — Introspect Project

Shows all logic blocks, contracts, properties, and measuring points.

```bash
dale list
```

```
  Project: MyDemo (v0.0.1)
  SDK: Vion.Dale.Sdk 1.0.0

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
  "sdkVersion": "1.0.0",
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

## `dale add` — Code Generation

Add elements to a logic block without writing boilerplate. Run these commands from inside the logic block project folder, or pass `--project <path>` to target it explicitly — unlike `dale new`, `dale build`, and `dale test`, `dale add` cannot auto-detect the right project from the solution root when multiple csproj files exist.

### Add a Logic Block

```bash
dale add logicblock TemperatureController
# ✔ Added logicblock TemperatureController to MyLibrary
```

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

Measuring points are always generated with `private set;` — there is no `--setter` flag.

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
| `--environment` | Target environment (overrides stored config) |
| `--integrator-id` | Integrator ID (overrides stored config) |
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
