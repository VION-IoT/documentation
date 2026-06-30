---
title: Scenarios
description: Author and run *.scenario.json checks that drive the wired DevHost network and assert outcomes.
---

# Scenarios

A scenario is a committed, replayable JSON check that drives the wired DevHost network and asserts outcomes. Scenarios live as `*.scenario.json` files under a project's `scenarios/` directory and run identically in CI and in the DevHost web UI.

## Scenario files

The runner is a sequential interpreter over the DevHost control surface — no loops or computed values; anything needing logic graduates to a C# test (see [Testing](/sdk/testing)). The file name is `<id>.scenario.json`, its `id` field must match the file name, and the DevHost discovers files under `{cwd}/scenarios/`. The template library ships `scenarios/thermostat.scenario.json`:

```json
{
  "$schema": "./.dale/scenario.schema.json",
  "version": 1,
  "id": "thermostat",
  "title": "Thermostat heats to the setpoint",
  "description": "From a cold 20 °C start, ask for 24 °C and step the virtual clock.",
  "topology": "default",
  "setup": [
    { "set": "Thermostat.Mode", "value": "Auto" },
    { "set": "Thermostat.CurrentTemperature", "value": 20.0 }
  ],
  "steps": [
    { "label": "Ask for 24 °C", "set": "Thermostat.TargetTemperature", "value": 24.0 },
    { "label": "One control tick — the thermostat engages", "advance": { "seconds": 1 } },
    { "label": "Status pill goes Heating", "expect": { "property": "Thermostat.Status", "equals": "Heating" } },
    { "label": "Warm the room for 25 s of virtual time", "advance": { "seconds": 25 } },
    { "label": "The room has climbed past 22 °C", "expect": { "property": "Thermostat.CurrentTemperature", "above": 22.0 } },
    { "label": "…but is still short of the 24 °C setpoint", "expect": { "property": "Thermostat.CurrentTemperature", "below": 24.0 } }
  ],
  "watch": [
    "Thermostat.CurrentTemperature",
    "Thermostat.Status",
    "Thermostat.EnergyUsedKwh"
  ],
  "judge": [
    { "text": "The Status pill shows Heating while warming, then settles on Idle near the setpoint" }
  ]
}
```

Top-level fields:

| Field | Description |
|-------|-------------|
| `version` (required) | Vocabulary version. Runners reject unknown versions. |
| `id` (required) | URL-safe slug; must match the file name. The deep-link route is `#/scenario/{id}`. |
| `title`, `description` | Human-readable text shown in the Player and reports. |
| `topology` (required) | The topology id the scenario expects, compared against the running network. A mismatch blocks the run. |
| `specs` | Free-form trace ids for the scenario as a whole. |
| `setup` | Staging entries applied in file order before the steps run. |
| `steps` | The ordered sequence of stimuli and assertions. |
| `watch` | Name paths pinned as live value tiles and validated up front. |
| `judge` | Human-judgment checklist items reported as `requires human` in CI. |

Name paths are `Block.Property`, `Block.Service.Property` to disambiguate a multi-service block, with an optional trailing `.Field` for a scalar leaf in a struct. The runner resolves every path against the wired graph and fails on a typo, unknown target, or read-only target.

A step is exactly one shape:

| Step | Description |
|------|-------------|
| `{ "set": "Block.Property", "value": … }` | Write a scalar, enum name, complete struct or array literal, or `null` to a service property. Writes are acked before the next step runs. |
| `{ "serviceProviderSet": { "logicBlock": …, "contract": … }, "value": … }` | Drive a mocked service provider input contract — a scalar for a digital or analog contract, a JSON object for a struct contract. |
| `{ "advance": { "seconds": N } }` | Let `N` seconds elapse — virtual time on a stepped host, real wall-clock otherwise. |
| `{ "settle": { "maxSeconds": 60, "until": [ … ] } }` | Run until the targeted paths stop changing (defaults to the `watch` list). Requires a stepped host; fails if `maxSeconds` elapses while a target still moves. |
| `{ "expect": { "property": "Block.Property", "equals": … } }` | Assert the current value of a name path with one comparator. Fails the run on mismatch. |
| `{ "serviceProviderExpect": { "logicBlock": …, "contract": …, "equals": … } }` | Assert the value a block last wrote on a service provider output contract, with one comparator. |
| `{ "waitUntil": { "property": "Block.Property", "equals": … }, "timeoutSeconds": 20 }` | Wait for a condition to hold, up to `timeoutSeconds`. |

Every comparator step (`expect`, `serviceProviderExpect`, `waitUntil`) takes exactly one of `above`, `below`, `equals`, `notEquals`, or `oneOf`; an `equals` on a number may carry a `tolerance`. Each step also accepts an optional `label` and `spec` trace id; a `setup` entry accepts only the `set` and `serviceProviderSet` shapes. Assert converged state (drive with `advance`, then `expect`), not the simulation's schedule.

## Topology files

A topology declares the instance graph scenarios run against — which logic block instances exist and how they wire — referenced by id (`"topology": "default"`) so many scenarios share one file. Files live under `topologies/` as `<id>.topology.json`:

```json
{
  "$schema": "./.dale/topology.schema.json",
  "id": "default",
  "logicBlockInstances": [
    {
      "typeFullName": "VionIotLibraryTemplate.Thermostat",
      "name": "Thermostat"
    }
  ],
  "interfaceMappings": [],
  "contractMappings": []
}
```

| Field | Description |
|-------|-------------|
| `id` (required) | The topology id a scenario references. |
| `logicBlockInstances` | The instances in the graph, each a `typeFullName` and an instance `name`. |
| `interfaceMappings` | Wiring between logic block interfaces. |
| `contractMappings` | Service provider contract bindings; an unmapped contract gets a DevHost mock. |

The instance `name` is what scenario name paths bind to. To migrate an existing C# preset, run `dale dev --export-topology <file>`.

## Command group

The `dale scenario` verbs have no SDK dependency and run wherever the Dale CLI is installed. Each accepts the global `-o json` option, except `schema` and `scaffold`, where `-o` names an output file instead.

### run

Execute a scenario against the running DevHost and report the result — the same report the Player's copy button produces.

```bash
dale scenario run thermostat
```

| Flag | Description |
|------|-------------|
| `--port <port>` | Port of the running DevHost (default 5000). |
| `--restart` | Cancel an active run and take over. |
| `--timeout <timeout>` | Seconds to wait for the run to finish (default 600). |

### validate

Check every scenario file for structure, name-path resolution, and topology match — the offline CI gate. It does not check that a `waitUntil` is satisfiable; only `dale scenario run` confirms runtime semantics.

```bash
dale dev --export-config config.json
dale scenario validate --config config.json
```

| Flag | Description |
|------|-------------|
| `--dir <dir>` | Scenarios directory (default `./scenarios`). |
| `--config <config>` | Configuration export from `dale dev --export-config`. When omitted, the running DevHost is used. |
| `--port <port>` | Port of the running DevHost (default 5000). |

### schema

Print the scenario JSON Schema, enriched with the topology's actual name paths when a configuration is available. Commit it at `scenarios/.dale/scenario.schema.json` and reference it from each file via `"$schema"` for editor completion.

```bash
dale dev --export-config config.json
dale scenario schema --config config.json -o scenarios/.dale/scenario.schema.json
```

| Flag | Description |
|------|-------------|
| `-o <file>` | Write to this file instead of printing. Conventionally `scenarios/.dale/scenario.schema.json`. |
| `--config <config>` | Configuration export to enrich from. Defaults to the running DevHost. |
| `--port <port>` | Port of the running DevHost (default 5000). |

### scaffold

Generate a typed C# test from a scenario file — the graduation path when a scenario outgrows the format. The test runs the scenario's setup and steps, with TODO assertions for its human judgments. See [Testing](/sdk/testing).

```bash
dale scenario scaffold thermostat
```

| Flag | Description |
|------|-------------|
| `--dir <dir>` | Scenarios directory (default `./scenarios`). |
| `--namespace <namespace>` | Namespace for the generated test class (default `ScenarioTests`). |
| `-o <file>` | Write to this file (default `<Id>ScenarioTest.cs`); pass `-` to print to stdout. |

### open

Open a scenario in the running DevHost's Player, resolving the `#/scenario/{id}` deep link on the host's actual port. Cite a scenario by id in a pull request rather than a per-machine localhost URL.

```bash
dale scenario open thermostat
```

| Flag | Description |
|------|-------------|
| `--port <port>` | Port of the running DevHost (default 5000). |

## Deterministic stepping

`dale dev --stepped` boots the DevHost on a controllable virtual clock instead of the wall clock, so the same scenario file produces the same result every run. Use the default real-clock mode for live watching; under the stepped clock, timers idle between runs and the emission throttle is inactive.

```bash
dale dev --stepped --headless
```

## The Player

The Player is the DevHost web UI view for a scenario: ordered steps with acks and elapsed times, watch tiles, and the judgment checklist, plus a copy button that produces a verification report (scenario id, file hash, step results, judgment verdicts) to paste into a pull request. `dale dev --headless` serves the same control API without the browser — the substrate tools and agents drive (see [AI-Assisted Development](/agentic/)).

## ScenarioWireAttribute

`ScenarioWireAttribute` marks a service provider handler with the wire struct its contract carries, letting the DevHost drive an input contract or assert an output contract through the generic handler. It is a DevHost-only declarative marker for scenario testing — the production runtime never reads it and it carries no runtime behavior. Apply it to a `ServiceProviderHandlerBase` with the inbound struct a scenario drives, the outbound struct a scenario asserts, or both:

```csharp
using Vion.Dale.Sdk.Abstractions;

[ScenarioWire(Inbound = typeof(DigitalInputChanged))]
[ScenarioWire(Outbound = typeof(SetDigitalOutput))]
public sealed class DigitalIoHandler : ServiceProviderHandlerBase
{
    // handler implementation
}
```
