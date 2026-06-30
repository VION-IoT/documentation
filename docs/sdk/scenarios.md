---
title: Scenarios
description: Author and run *.scenario.json checks that drive the wired DevHost network and assert outcomes.
---

# Scenarios

A scenario is a committed, replayable check that drives the wired DevHost network and asserts outcomes. Scenarios live as `*.scenario.json` files under a project's `scenarios/` directory, run identically in CI and in the DevHost web UI, and are authored by both developers and agents.

This is an authoring path defined by [RFC 0006](https://github.com/VION-IoT/dale-sdk/blob/main/docs/rfcs/0006-scenario-files.md) and extended by the unified scenario and topology design. The file format is versioned: each file carries a `version`, and the supported authoring surface described here is the current one. Treat the deterministic stepping and `*.topology.json` features as the supported path while the format settles.

## Scenario files

A `*.scenario.json` file describes a staging situation, an ordered sequence of stimuli, a watch list, and the outcomes to assert. The runner is a sequential interpreter over the DevHost control surface — there are no loops, expressions, or computed values. Anything that needs logic graduates to a C# test (see [Testing](/sdk/testing)).

The file name is `<id>.scenario.json`, and its `id` field must match the file name. The DevHost discovers files under `{cwd}/scenarios/`. The template library ships one example, `scenarios/thermostat.scenario.json`:

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

The top-level fields are:

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

Properties are addressed by a dot-separated name path: `Block.Property`, or `Block.Service.Property` to disambiguate a multi-service block, with an optional trailing `.Field` to address a scalar leaf inside a struct. The runner resolves every path against the wired graph and fails loudly on a typo, an unknown target, or a read-only target.

A step is exactly one shape. The vocabulary is:

| Step | Description |
|------|-------------|
| `{ "set": "Block.Property", "value": … }` | Write a scalar, enum name, complete struct or array literal, or `null` to a service property. Writes are acked before the next step runs. |
| `{ "serviceProviderSet": { "logicBlock": …, "contract": … }, "value": … }` | Drive a mocked service provider input contract — a scalar for a digital or analog contract, a JSON object for a struct contract. |
| `{ "advance": { "seconds": N } }` | Let `N` seconds elapse — virtual time on a stepped host, real wall-clock otherwise. |
| `{ "settle": { "maxSeconds": 60, "until": [ … ] } }` | Run until the targeted paths stop changing (defaults to the `watch` list). Requires a stepped host; fails if `maxSeconds` elapses while a target still moves. |
| `{ "expect": { "property": "Block.Property", "equals": … } }` | Assert the current value of a name path with one comparator. Fails the run on mismatch. |
| `{ "serviceProviderExpect": { "logicBlock": …, "contract": …, "equals": … } }` | Assert the value a block last wrote on a service provider output contract, with one comparator. |
| `{ "waitUntil": { "property": "Block.Property", "equals": … }, "timeoutSeconds": 20 }` | Wait for a condition to hold, up to `timeoutSeconds`. |

Every comparator step (`expect`, `serviceProviderExpect`, `waitUntil`) takes exactly one of `above`, `below`, `equals`, `notEquals`, or `oneOf`; an `equals` on a number may carry a `tolerance`. Each step also accepts an optional `label` (shown in the Player and reports) and an optional `spec` trace id. A `setup` entry stages state only — it accepts the `set` and `serviceProviderSet` shapes.

Assert state, not the simulation's schedule. Drive the network to a steady state with `advance`, then assert the converged values with `expect`. Hop counts and the number of `advance` cycles are properties of the stepped clock, not of your logic blocks — an assertion that would still be meaningful against the production runtime is one worth keeping.

## Topology files

A topology declares the instance graph the scenarios run against: which logic block instances exist and how they wire together. A scenario references its topology by id (`"topology": "default"`), so many scenarios share one topology file.

Topology files live under `topologies/` as `<id>.topology.json`. The DevHost discovers logic block types from the loaded plugin assemblies, so you declare instances by type name rather than editing `Program.cs`. The template library's `topologies/default.topology.json` declares a single instance:

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

The fields are:

| Field | Description |
|-------|-------------|
| `id` (required) | The topology id a scenario references. |
| `logicBlockInstances` | The instances in the graph, each a `typeFullName` and an instance `name`. |
| `interfaceMappings` | Wiring between logic block interfaces. |
| `contractMappings` | Service provider contract bindings; an unmapped contract gets a DevHost mock. |

The instance `name` is what scenario name paths bind to — keep it short and stable. To migrate an existing C# preset to a topology file, run `dale dev --export-topology <file>`, which boots the wired network and writes it as a `*.topology.json` dev profile.

## Command group

The `dale scenario` verbs operate on files, processes, and the localhost control API. They have no SDK dependency, so they run wherever the Dale CLI is installed. Each verb accepts the global `-o json` option for machine-readable output, except `schema` and `scaffold`, where `-o` names an output file instead (shown below).

### run

`dale scenario run <id>` executes a scenario against the running DevHost and reports the result — the same report the Player's copy button produces, so an agent sees exactly what a developer would.

Run a scenario against a DevHost started with `dale dev`:

```bash
dale scenario run thermostat
```

Options:

| Flag | Description |
|------|-------------|
| `--port <port>` | Port of the running DevHost (default 5000). |
| `--restart` | Cancel an active run and take over. |
| `--timeout <timeout>` | Seconds to wait for the run to finish (default 600). |

### validate

`dale scenario validate` checks every scenario file for structure, name-path resolution, and topology match. It is the offline CI gate: it catches a rename fast without running the scenario. It does not check that a `waitUntil` is ever satisfiable — only `dale scenario run` confirms the runtime semantics.

Validate every scenario against a configuration exported from the DevHost:

```bash
dale dev --export-config config.json
dale scenario validate --config config.json
```

Options:

| Flag | Description |
|------|-------------|
| `--dir <dir>` | Scenarios directory (default `./scenarios`). |
| `--config <config>` | Configuration export from `dale dev --export-config`. When omitted, the running DevHost is used. |
| `--port <port>` | Port of the running DevHost (default 5000). |

### schema

`dale scenario schema` prints the scenario JSON Schema, enriched with the topology's actual name paths when a configuration is available. Commit it at `scenarios/.dale/scenario.schema.json` and reference it from each file via `"$schema"` for editor completion.

Generate the per-project schema offline from an exported configuration:

```bash
dale dev --export-config config.json
dale scenario schema --config config.json -o scenarios/.dale/scenario.schema.json
```

Options:

| Flag | Description |
|------|-------------|
| `-o <file>` | Write to this file instead of printing. Conventionally `scenarios/.dale/scenario.schema.json`. |
| `--config <config>` | Configuration export to enrich from. Defaults to the running DevHost. |
| `--port <port>` | Port of the running DevHost (default 5000). |

### scaffold

`dale scenario scaffold <id>` generates a typed C# test from a scenario file. The test runs the scenario's setup and steps, with TODO assertions for its human judgments — the graduation path when a scenario outgrows the format. See [Testing](/sdk/testing) for the test project setup.

Generate a test class from a scenario:

```bash
dale scenario scaffold thermostat
```

Options:

| Flag | Description |
|------|-------------|
| `--dir <dir>` | Scenarios directory (default `./scenarios`). |
| `--namespace <namespace>` | Namespace for the generated test class (default `ScenarioTests`). |
| `-o <file>` | Write to this file (default `<Id>ScenarioTest.cs`); pass `-` to print to stdout. |

### open

`dale scenario open <id>` opens a scenario in the running DevHost's Player, resolving the `#/scenario/{id}` deep link on the host's actual port. Cite a scenario by id in a pull request rather than a hardcoded localhost URL — the port is per-machine.

Open a scenario in the Player:

```bash
dale scenario open thermostat
```

Options:

| Flag | Description |
|------|-------------|
| `--port <port>` | Port of the running DevHost (default 5000). |

## Deterministic stepping

`dale dev --stepped` boots the DevHost on a controllable virtual clock instead of the wall clock. Under stepping, `advance` and `expect` steps execute exactly — the same scenario file produces the same result every run, in CI and in the Player. Use the default real-clock mode for live watching; under the stepped clock, timers idle between runs and the emission throttle is inactive.

Boot a stepped host for a reproducible scenario run:

```bash
dale dev --stepped --headless
```

## The Player

The Player is the DevHost web UI view for a scenario. It renders only the scenario's working set — the ordered steps with their acks and elapsed times, the watch tiles, and the judgment checklist — and a copy button that produces a verification report carrying the scenario id, file hash, step results, and judgment verdicts. Paste that report into a pull request to record what was verified.

The `--headless` mode of `dale dev` serves the same control API without the browser, which is the substrate that tools and agents drive. See [AI-Assisted Development](/agentic/) for the agent workflow.

## ScenarioWireAttribute

`ScenarioWireAttribute` marks a service provider handler with the wire struct its contract carries, so the DevHost can drive an input contract or assert an output contract from a scenario through the generic handler. It is a `[PublicApi]` declarative marker used only for scenario testing in the DevHost — the production runtime reaches hardware over MQTT and never reads it, so the attribute carries no runtime behavior.

Apply it to a `ServiceProviderHandlerBase`, declaring the inbound struct a scenario drives, the outbound struct a scenario asserts, or both:

```csharp
using Vion.Dale.Sdk.Abstractions;

[ScenarioWire(Inbound = typeof(DigitalInputChanged))]
[ScenarioWire(Outbound = typeof(SetDigitalOutput))]
public sealed class DigitalIoHandler : ServiceProviderHandlerBase
{
    // handler implementation
}
```
