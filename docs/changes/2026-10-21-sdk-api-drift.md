---
slug: sdk-api-drift
status: proposed               # proposed | in-flight | archived
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
`4a0b0fd3` (all of it released by `v0.14.3`) and cloud-api `831116ec`, also found that the HTTP and
Modbus samples on `services.md` and the complete example on `testing.md` do not compile. This change
corrects what is wrong and adds what is missing, each on the page that owns it, example first.

### Decisions

- **D1 —** No new page: the HTTP server sits beside the HTTP client, the HTTP test kit and the
  provider-face helpers go in Testing, the `dale topology` verbs go under Topology files, and the
  list envelope is one note on Integration Examples (STYLE § When to Add a Page).
- **D2 —** Exception types, wire limits, DI plumbing and the six I/O wire message types stay off the
  guide pages, because a block author reaches them only through a receipt's outcome or not at all,
  and the generated API reference lists them.
- **D3 —** `DevelopmentOnlyHandlerAttribute` stays off: it pairs with a contract-type flag on an
  attribute that is not public API, and no guide covers writing a handler.
- **D4 —** Every C# sample this change writes or keeps on a touched page is compiled in a scratch
  project against the `v0.14.3` packages before its commit, and its shape is copied from a compiled
  example or test, with invented names.
- **D5 —** A sample's `using` lines are part of the sample (STYLE § C# Conventions); the ones this
  change touches gain them.

### Reviewer's questions

1. `[open]` **Scope beyond the drift issues.** The audit found defects no issue names (listed under
   *Found in passing* below). Options: (a) all of them in this change; (b) only those on pages this
   change already edits; (c) drift items only, the rest a separate fix-sized pull request.
   Recommended: (a). Each is a sentence or a sample, and two of them (`Logger`, the Services
   response) sit in samples a reader copies.
2. `[open]` **Modbus section shape.** Receipts, link state and limits apply to both transports, so
   `## Modbus RTU Example` would no longer describe its content. Options: (a) one `## Modbus` with
   `###` RTU, TCP, Receipts and link state, Limits and defaults; (b) keep the two transport sections
   and add a shared one after them. Recommended: (a).
3. `[open]` **The real meter model name** in the RTU sample (`services.md:110,115`) and on two
   agentic pages (`agentic/getting-started.md:83`, `agentic/index.md:96`) breaks the public-repo
   naming rule, and the denylist does not catch it. Options: (a) rename here and add it to the
   `real-world-name` denylist in `scripts/check-docs.mjs`; (b) the same, as a fix-sized pull request
   ahead of this one. Recommended: (b), since it is a breach on a published page.
4. `[open]` **`nextCursor` in the list note.** Only `GET /Me/Notifications` pages
   (`Cloud.Api/…/MeNotificationsController.cs:80-81`) and no page shows it. Options: (a) one clause
   in the note; (b) leave paging out until a documented call pages. Recommended: (a).

---

## Full design

Line numbers are `origin/main` `d565817` here; source paths are relative to `../dale-sdk` unless
they start with `Cloud.`.

### `sdk/services.md`

- **HTTP Client.** Replace the sample. It does not compile: the callbacks take one argument where
  the source takes `(response, receipt)` and `(exception, receipt)`
  (`Vion.Dale.Sdk.Http/ILogicBlockHttpClient.cs:64-70`), it calls a `Logger` member `LogicBlockBase`
  does not have (`Vion.Dale.Sdk/Core/LogicBlockBase.cs:53`), and it omits the abstract `Ready()`.
  The new sample shows `receipt.Outcome` (`HttpOutcome`, seven values) on failure and the client's
  `Summary` published from a timer; shape from the Energy example's HTTP service
  (`examples/Vion.Examples.Energy/…/Services/`, lines 81-110). One rule each: non-2xx answers reach
  the error callback with `receipt.StatusCode` set (`HttpReceipt.cs:533-535`); `SendRequest` takes
  no `headers` and its callback owns the response (`ILogicBlockHttpClient.cs:417,452-456`); a
  `timeout` only shortens the client's 30 s bound.
- **HTTP Server** (new section after it). `ILogicBlockHttpServerFactory.Create()`, then `Sync`
  with `SetResponse` and `TakeReceivedRequests`, `Port` and `IsEnabled`, disposed in `Stopping()`;
  shape from `examples/Vion.Examples.Http/…/LogicBlocks/HttpSimServer.cs:404-490`. One rule each:
  plain HTTP with no authentication; publish a response before enabling; `Port` is settable only
  while disabled; chunked request bodies are refused (`Server/ILogicBlockHttpServer.cs:30-32`).
- **Modbus** (shape per question 2). Both samples are replaced. Every operation takes the
  dispatcher, success and error callbacks carry a `ModbusReceipt`, and spans are named `count` and
  `startingAddress` (`Vion.Dale.Sdk.Modbus.Core/Client/IModbusClient.cs:335-343`). Link state is a
  snapshot the block publishes by assignment: `Link` (`ModbusLinkSummary`) on both transports,
  `Connection` (`ModbusTcpConnectionSummary`) on TCP. The TCP setters ignore an unchanged value, so
  settings are applied in the property setter rather than once in `Ready()`
  (`Vion.Dale.Sdk.Modbus.Tcp/Client/LogicBlock/ILogicBlockModbusTcpClient.cs:47-55`). The TCP table
  gains `ConnectBackoff` and `ConnectBackoffMax` (`:75-93`), and notes that the queue settings are
  fixed after the first enable (`:165-189`). A limits list, one line each: 125 registers per read,
  123 per write, 2000 bits per read, 1968 per write (`ModbusProtocolLimits`); operation timeout 1 s
  on TCP and 5 s on RTU; a request queued for longer than 30 s expires; nothing is retried
  automatically; a factory-created client is disposed by its block. Plus the RTU DevHost
  registration line (`examples/Vion.Examples.ModbusRtu/…DevHost/Program.cs:27`).
- **Provider faces** (new `###` under Built-in I/O Interfaces). A four-row table of
  `IDigitalOutputProvider`, `IDigitalInputProvider`, `IAnalogOutputProvider` and
  `IAnalogInputProvider`, a sample from `examples/Vion.Examples.ToggleLight/…/IdealRelay.cs:26-61`,
  and one rule: a block that binds a face is left out of the packed library, and `dale list` marks
  it development-only (`Vion.Dale.Cli/Commands/ListCommand.cs:159`).

### `sdk/properties.md` and `sdk/declarative-presentation.md`

- Emission Policy defaults: each knob resolves on its own, the class's value first, then the
  interface's, then (for `MinInterval`) the value type's `DefaultMinInterval`, then 250 ms
  (`Vion.Dale.Sdk/Emission/EmissionKnobs.cs:7-13,60-71`). The warning at `properties.md:225` is
  scoped accordingly; the SDK's four diagnostics summaries default to 30 s.
- A `DefaultMinInterval` sample (`Vion.Dale.Sdk/Core/DefaultMinIntervalAttribute.cs:24-29`) and an
  `IChangeThreshold<T>` sample (`examples/Vion.Examples.Emission/…/ThreePhaseChangeThreshold.cs:13-19`),
  which the library scan finds with no registration.
- `properties.md:696` and `declarative-presentation.md:28-48` say a class re-declaration replaces
  the interface's entirely. The schema comes from the interface member and the knobs resolve one at a
  time. That the class's `Title` is then ignored is inferred, and it is checked before the sentence is
  written.

### `sdk/testing.md`

- **Testing HTTP** (new section after Testing I/O). The `Vion.Dale.Sdk.Http.TestKit` package,
  `FakeHttpHarness` for a client and `FakeHttpServerHarness` for a server; shapes from
  `examples/Vion.Examples.Energy/…Test/Http/` and `examples/Vion.Examples.Http/…Test/HttpSimServerShould.cs:20-52`.
- Testing I/O gains the provider-face helpers (`RaiseSetReceived`, `VerifyDigitalOutputConfirmed`,
  `VerifyDigitalInputDriven`; analog with a `tolerance`) and the missing `…TestKit` usings (`:184-192`).
- `:178`: the scaffolded test is a wired-DevHost xUnit test whose `CreateHostAsync` the reader
  implements (`Vion.Dale.Cli/Commands/ScenarioCommand.cs:64-67,130-134`).

### `sdk/scenarios.md`

- `--port` rows take the help's wording. The DevHost binds the first free port from 5000 up
  (`Vion.Dale.DevHost.Web/Services/WebHostService.cs:30-31,75-76`), prints
  `DevHost Web UI running at http://localhost:<port>` (`:120`), and the headless readiness line carries
  `port` (`Vion.Dale.DevHost.Web/DevHostWebRunner.cs:79`). `open` builds its URL from `--port`
  (`ScenarioCommand.cs:617`), not from the host's port as `:167` says.
- `schema` and `scaffold` write with `--out` (`-O`); `-o` is the deprecated alias.
- Topology files gain `dale topology validate` (`--dir`, `--require-schema-ref`) and
  `dale topology schema` (`--out`), and the field table gains `contractPairings` and per-instance
  `instantiationParameters`, with `logicBlockInstances` required
  (`Vion.Dale.DevHost/Topologies/DevTopologyFile.cs:86,314`).
- `:52`: a topology mismatch switches the DevHost to the scenario's topology when it can, and
  refuses the run only when it cannot (`Vion.Dale.DevHost.Web/Api/Controllers/ScenariosController.cs:121-155`).
- `:196-197`: one `ScenarioWire` carries both directions, since the attribute is not stackable
  (`Vion.Dale.Sdk/Abstractions/ScenarioWireAttribute.cs:41`).

### CLI on `sdk/installation.md`, `introduction/quick-start.md`, `agentic/*`

- Port lines (`installation.md:49,93`, `quick-start.md:149`) say 5000 or the next free port, and
  `quick-start.md:164` and the agentic recipes pass `--port` taken from the readiness line.
- `installation.md` gains a `dale topology` entry beside `dale scenario` that links to Scenarios, and
  `:299` states the `login -e` default: the stored environment, else production.
- Agentic pages (`agentic/index.md:38,52`, `getting-started.md:75`, `recipes.md:55`) call bare
  `dale scenario validate` offline. Without `--config` it needs a running DevHost
  (`ScenarioCommand.cs:747-774`), so they export first with `dale dev --export-config`.

### `cloud-api/examples.md`

- One note after the variables block: a list answers `{ "items": [ … ] }`
  (`Cloud.Api/Common/ListOutput.cs:10`); a paged list adds `nextCursor`, sent back as `cursor`, and
  `null` on the last page (`Cloud.Api/Common/PageOutput.cs:8`, question 4); `GET /Me` and
  `GET /Tenant/{tenantId}/Services` answer single objects. One response sample after the grants
  call, with invented values.

### Found in passing (question 1)

- `Logger.Log…` in samples on `logic-blocks.md:60,70` and `logic-interfaces.md:111,148,200,206`;
  `LogicBlockBase` has only a private `_logger`.
- `testing.md:212-259` (Complete Example) uses a non-generic `LogicBlockTestContext` and passes a
  `LogicBlockId` where an `InterfaceId` is taken; shape from
  `examples/Vion.Examples.PingPong/…Test/PingShould.cs:13,38-47`.
- `publishing.md:67` passes an integrator name to `dale config set-integrator`, which takes
  `--integrator-id` and selects on its own when there is one membership
  (`Vion.Dale.Cli/Commands/Config/SetIntegratorCommand.cs:58-71`); `installation.md:312` says it
  has no flags.
- `installation.md:182` says `dale add` cannot find the project from the solution root; it can when
  exactly one project references the SDK (`Vion.Dale.Cli/Helpers/CommandHelpers.cs:54-71`).
- `installation.md:37-50,331-346` show a template the CLI no longer ships
  (`Vion.Dale.Cli/Commands/NewCommand.cs:157-171`); both point at the Quick Start's tree instead.
- `quick-start.md:247` asks the reader to register a block that `dale add logicblock` already
  registered (`Vion.Dale.Cli/Commands/Add/AddLogicBlockCommand.cs:53-58`).
- `cloud-api/examples.md:63,73-74` calls `flatMap` on the Services response, which is an object with
  a `services` array (`Cloud.Api/…/ServicesOutput.cs:14`); `:35` says the services are grouped by edge
  gateway, but each service carries its own `edgeGatewayId`.
- `cloud-api/examples.md:156-162` omits the required `aggregationInterval`
  (`Cloud.Api/…/MeasuringPointQueryInput.cs:23`) and comma-joins `measuringPointIdentifiers`, which
  are inferred to bind as one identifier; the dashboard repeats the key.

## Drift checkpoints

## Tasks

- **T-001** — `services.md` HTTP Client and HTTP Server
- **T-002** — `services.md` Modbus, in the shape question 2 settles
- **T-003** — `services.md` provider faces
- **T-004** — `properties.md` and `declarative-presentation.md` emission defaults, `DefaultMinInterval`, `IChangeThreshold`
- **T-005** — `testing.md` HTTP test kit, provider-face helpers, scaffolded test
- **T-006** — `scenarios.md` port, `--out`, topology verbs and fields, mismatch, `ScenarioWire`
- **T-007** — `installation.md`, `quick-start.md`, `agentic/*` CLI items
- **T-008** — `cloud-api/examples.md` list envelope
- **T-009** — the found-in-passing items question 1 admits
- **T-010** — archive this doc
