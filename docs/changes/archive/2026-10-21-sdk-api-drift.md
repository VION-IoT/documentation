---
slug: sdk-api-drift
status: archived               # proposed | in-flight | archived
areas: [sdk, cli, agentic, cloud-api]
author: Jonas Bertsch
created: 2026-10-21
updated: 2026-10-21
---

# Bring the SDK, CLI and Cloud API pages level with their source

## At a glance

### Summary

Seventeen open drift issues in the architecture repo (five CLI help, twelve SDK public API, filed
2026-08-18 to 2026-09-25) and the Cloud API list envelope (live on test and production since
2026-10-20) have not reached the guide pages. An audit of every page they touch, against dale-sdk
`4a0b0fd3` (all of it released by `v0.14.3`) and cloud-api `831116ec`, also found samples that do not
compile. This change corrects what is wrong and adds the few things most readers use, each on the
page that owns it.

### Decisions

- **D1 —** No new page: the HTTP server sits beside the HTTP client, the HTTP test kit goes in
  Testing, the `dale topology` verbs go under Topology files, and the list envelope is one note on
  Integration Examples (STYLE § When to Add a Page).
- **D2 —** Off the guide pages, per STYLE § What Not to Document (every member, option and limit):
  exception types, the Modbus and HTTP limits and defaults, the TCP link-policy settings, the HTTP
  server's wire rules, the provider faces and their test helpers (the DevHost already mocks an
  unmapped contract), topology `contractPairings`, the HTTP and Modbus request summaries beyond one
  sentence, and `DefaultMinInterval` and `IChangeThreshold<T>` beyond one clause each.
- **D3 —** `DevelopmentOnlyHandlerAttribute` stays off: it pairs with a contract-type flag on an
  attribute that is not public API.
- **D4 —** Every C# sample this change writes or rewrites is compiled in a scratch project against
  the `v0.14.3` packages before its commit, its shape copied from a compiled example or test, with
  invented names and its `using` lines.

### Reviewer's questions

1. `[resolved]` Scope beyond the drift issues — **A:** every found-in-passing item is in.
2. `[resolved]` Modbus section shape — **A:** one `## Modbus` with `###` sub-sections.
3. `[resolved]` The real meter model name on three pages — **A:** renamed in this change, and added
   to the `real-world-name` denylist.
4. `[resolved]` `nextCursor` in the list note — **A:** one clause.

---

## Full design

Line numbers are `origin/main` `d565817` here; source paths are relative to `../dale-sdk` unless
they start with `Cloud.`.

### `sdk/services.md`

- **HTTP Client.** The sample is replaced: its callbacks take one argument where the source takes
  `(response, receipt)` and `(exception, receipt)`
  (`Vion.Dale.Sdk.Http/ILogicBlockHttpClient.cs:64-70`), it calls a `Logger` member `LogicBlockBase`
  does not have (`Vion.Dale.Sdk/Core/LogicBlockBase.cs:53`), and it omits the abstract `Ready()`.
  One rule: a non-2xx answer reaches the error callback, with `receipt.StatusCode` set
  (`Vion.Dale.Sdk.Http/HttpReceipt.cs:533-535`). The methods table stops claiming `headers` on
  `SendRequest` (`ILogicBlockHttpClient.cs:452-456`).
- **HTTP Server**, a short section after it: one sample of `ILogicBlockHttpServerFactory.Create()`,
  `Sync` with `SetResponse`, and `IsEnabled`, from
  `examples/Vion.Examples.Http/…/LogicBlocks/HttpSimServer.cs:404-490`, and one rule: plain HTTP,
  no authentication.
- **Modbus**, one `## Modbus` section. Both samples are rewritten to compile: every operation takes
  the dispatcher, both callbacks carry a `ModbusReceipt`, spans are named `count` and
  `startingAddress` (`Vion.Dale.Sdk.Modbus.Core/Client/IModbusClient.cs:335-343`). The TCP sample
  applies its address in the property setter, because the setters ignore an unchanged value
  (`Vion.Dale.Sdk.Modbus.Tcp/Client/LogicBlock/ILogicBlockModbusTcpClient.cs:47-55`). One sentence
  on `Link`, the summary a block may publish. The meter's model name becomes an invented one.

### `sdk/properties.md` and `sdk/declarative-presentation.md`

- The 250 ms `MinInterval` default gains its one exception a reader meets, a value type's
  `DefaultMinInterval` (`Vion.Dale.Sdk/Core/DefaultMinIntervalAttribute.cs:24-29`), and the
  `MinChange` type list gains one clause on `IChangeThreshold<T>` for other types
  (`Vion.Dale.Sdk/Emission/IChangeThreshold.cs:5-19`).
- `properties.md:696` and `declarative-presentation.md:28-48` say a class re-declaration replaces
  the interface's entirely; the knobs resolve one at a time
  (`Vion.Dale.Sdk/Emission/EmissionKnobs.cs:7-13,60-71`). The sentence is rewritten to what the source
  shows, after reading which other fields the class can override.

### `sdk/testing.md`

- **Testing HTTP**, after Testing I/O: one `FakeHttpHarness` sample from the Energy example's HTTP
  tests, and one sentence naming `FakeHttpServerHarness` for a server.
- Testing I/O gains its missing `…TestKit` usings (`:184-192`).
- The Complete Example (`:212-259`) is rewritten to compile: the context is generic and the mapping
  takes an `InterfaceId`; shape from `examples/Vion.Examples.PingPong/…Test/PingShould.cs:13,38-47`.
- `:178`: the scaffolded test is a wired-DevHost xUnit test whose `CreateHostAsync` the reader
  implements (`Vion.Dale.Cli/Commands/ScenarioCommand.cs:64-67,130-134`).

### `sdk/scenarios.md`

- `--port` rows take the help's wording; `open` builds its URL from `--port`
  (`ScenarioCommand.cs:617`), not from the host's port as `:167` says.
- `schema` and `scaffold` write with `--out`; `-o` is the deprecated alias.
- Topology files gain `dale topology schema` and `dale topology validate`, and mark
  `logicBlockInstances` required (`Vion.Dale.DevHost/Topologies/DevTopologyFile.cs:86,314`).
- `:52`: the DevHost switches to the scenario's topology when it can, and refuses the run only when
  it cannot (`Vion.Dale.DevHost.Web/Api/Controllers/ScenariosController.cs:121-155`).
- `:196-197`: one `ScenarioWire` carries both directions; the attribute is not stackable
  (`Vion.Dale.Sdk/Abstractions/ScenarioWireAttribute.cs:41`).

### CLI on `sdk/installation.md`, `sdk/publishing.md`, `introduction/quick-start.md`, `agentic/*`

- The DevHost takes 5000 or the next free port (`Vion.Dale.DevHost.Web/Services/WebHostService.cs:30-31,120`):
  `installation.md:49,93`, `quick-start.md:149`, and `--port` where a page runs a scenario.
- `installation.md`: a `dale topology` entry beside `dale scenario`; the `login -e` default (`:299`);
  `set-integrator --integrator-id` (`:312`, and `publishing.md:67`;
  `Vion.Dale.Cli/Commands/Config/SetIntegratorCommand.cs:58-71`); `dale add` finds the project when
  one references the SDK (`:182`; `Vion.Dale.Cli/Helpers/CommandHelpers.cs:54-71`); the stale
  template tree (`:37-50,331-346`; `Vion.Dale.Cli/Commands/NewCommand.cs:157-171`).
- `quick-start.md:247`: `dale add logicblock` has already registered the block
  (`Vion.Dale.Cli/Commands/Add/AddLogicBlockCommand.cs:53-58`).
- Agentic pages: bare `dale scenario validate` needs a running DevHost (`ScenarioCommand.cs:747-774`),
  so the offline form exports first; the meter's model name becomes an invented one.

### `sdk/logic-blocks.md`, `sdk/logic-interfaces.md`

- Samples calling `Logger.Log…` keep their own `ILogger` field.

### `cloud-api/examples.md`

- One note: a list answers `{ "items": [ … ] }` (`Cloud.Api/Common/ListOutput.cs:10`); a paged list
  adds `nextCursor` (`Cloud.Api/Common/PageOutput.cs:8`); `GET /Me` and the Services call answer
  single objects. One response sample after the grants call.
- `:63,73-74` read the Services response's `services` array, not the response
  (`Cloud.Api/…/ServicesOutput.cs:14`); `:35` drops "grouped by edge gateway".
- `:156-162` add the required `aggregationInterval` (`Cloud.Api/…/MeasuringPointQueryInput.cs:23`)
  and repeat `measuringPointIdentifiers`, after checking how the list binds.

## Drift checkpoints

- 2026-10-21: the HTTP Server sample injects `ILogicBlockHttpServer` instead of calling the factory; it
  is registered transient (`Vion.Dale.Sdk.Http/ServiceCollectionExtensions.cs:72`) and the block's scope
  disposes it, so the sample needs no `Stopping()`.
- 2026-10-21: the `real-world-name` pattern's trailing word boundary missed the class-name form of the
  meter name, so that entry matches as a prefix.
- 2026-10-21: the comma-joined `measuringPointIdentifiers` question is settled by the controller's
  `[FromQuery]` with a `List<string>` and no custom binder
  (`Cloud.Api/…/MeasuringPointsController.cs:42`); the example repeats the key.
- 2026-10-21: three found-in-passing items not listed above also landed: `logic-blocks.md` no longer
  says `dale add logicblock` always emits the attribute
  (`Vion.Dale.Cli/Commands/Add/AddLogicBlockCommand.cs:89-92`); `agentic/getting-started.md` no longer
  says the template's test project references the DevHost test package; and a rationale paragraph on
  `declarative-presentation.md` that argued for the old cascade went.
- 2026-10-21: every rewritten C# sample was compiled against the `v0.14.3` packages, and the Testing
  samples run green, `WeatherStation` included; the `ScenarioWire` fragment was compiled on an abstract
  handler, since the page leaves its body out.

## Tasks

- **T-001** — `services.md` HTTP Client and HTTP Server
- **T-002** — `services.md` Modbus, and the meter name with its denylist entry
- **T-003** — `properties.md` and `declarative-presentation.md`
- **T-004** — `testing.md`
- **T-005** — `scenarios.md`
- **T-006** — `installation.md`, `publishing.md`, `quick-start.md`, `agentic/*`
- **T-007** — `logic-blocks.md` and `logic-interfaces.md` samples
- **T-008** — `cloud-api/examples.md`
- **T-009** — archive this doc
