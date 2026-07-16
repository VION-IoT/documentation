---
title: Service Provider Protocol
description: MQTT protocol specification for implementing custom service providers that communicate with Mesh and the Dale runtime.
---

# Service Provider Protocol

A service provider is a standalone process that exposes hardware, bus protocols, or external systems to VION over MQTT. This page defines the protocol that all service providers must implement.

The protocol has two layers:

1. **Mandatory protocol** — registration, declaration, and health reporting. Same for every service provider. Mesh orchestrates this layer.
2. **Service-specific messaging** — topics and payloads defined by each service provider type. The Dale runtime consumes this layer to drive logic blocks. The protocol makes no assumptions about topic or payload structure.

## Architecture

```mermaid
graph LR
  SP["Service Provider<br/>(any technology)"] <-->|MQTT| B["MQTT Broker<br/>(NanoMQ)"]
  B <-->|registration<br/>+ health| M["Mesh"]
  B <-->|contract messaging| D["Dale Runtime"]
  D --> LB["Logic Blocks"]
```

The service provider never communicates with Mesh or the Dale runtime directly — all messages flow through the local MQTT broker. Mesh handles registration and periodic health checks; the Dale runtime subscribes to contract messages (state, commands, responses) and dispatches them to logic blocks. Service providers can be written in any language or technology that supports MQTT 5.0 — .NET, Python, Rust, CODESYS, TwinCAT, or bare-metal firmware.

## Prerequisites

- MQTT 5.0 client library
- Access to the local MQTT broker (default: `nanomq:1883` on the local network)

## Registration

Registration lets Mesh discover new service providers and provision credentials on the local MQTT broker. The same broker is used for both the registration exchange (unauthenticated) and operational messaging (authenticated with the provisioned credentials). A service provider runs this flow on every connect, even when it already has credentials stored. Re-registering is cheap, and it keeps the protocol self-healing: if the broker ever loses its ACL store (for example after a reset), the next reconnect re-provisions credentials without any manual recovery.

### Generate a Secret

On first startup, generate a random, non-guessable secret and persist it to survive restarts. The secret is used as a single MQTT topic segment — it ensures that only the service provider that generated it can receive its registration response.

::: warning MQTT Topic Segment Constraints
The secret, serviceProviderIdentifier, serviceIdentifier, and contractIdentifier are all embedded directly in MQTT topics, so each **must be a valid single topic segment**:
- Must **not** contain `/` (topic level separator)
- Must **not** contain `+` or `#` (MQTT wildcard characters)
- Must **not** contain null characters
- Must **not** be empty
- Should be kept under 128 characters (MQTT topics have a 65535-byte UTF-8 limit, but shorter is better for broker performance)
- Should use only ASCII alphanumeric characters to avoid encoding issues across MQTT client implementations

**Recommended secret format:** A UUID v4 without hyphens — 32 lowercase hex characters (e.g., `a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6`). This is what Mesh uses internally.

For .NET service providers, generate the secret with `Guid.NewGuid().ToString("N")` and hand it to the `ServiceProviderClientConfigurationBuilder` from the [`Vion.ServiceProvider.Sdk`](https://www.nuget.org/profiles/VION-IoT) package — the SDK runs the registration flow and reconnects with the Mesh-issued credentials for you.
:::

### Subscribe to the Response

Connect to the broker unauthenticated (no username or password) and subscribe to both:

- `system/serviceProvider/registration/accepted/{secret}`
- `system/serviceProvider/registration/denied/{secret}`

The broker rejects wildcard subscriptions on `system/serviceProvider/registration/accepted/#` and `.../accepted/+` so only the service provider that knows the secret can receive credentials.

### Publish the Registration Request

Once subscribed, publish a single registration message:

| Field | Value |
|-------|-------|
| Topic | `system/serviceProvider/registration/request/{secret}` |
| Payload | JSON: `{ "serviceProviderIdentifier": "hal-sim" }` |
| QoS | 0 |
| Retain | yes |
| Content-Type | `application/json` |
| User property `schema` | `ServiceProviderRegistrationRequestPayload` |

The `serviceProviderIdentifier` is a human-readable identifier for this provider instance (for example, `hal-sim`, `codesys-bridge-01`). It must be unique within the gateway (not globally unique — different gateways may have providers with the same identifier).

**Publish once per connection, not repeatedly.** The retained flag keeps the request on the broker so Mesh can pick it up as soon as it subscribes — even if Mesh is offline, restarting, or not yet connected when the service provider publishes. The only time to resend the registration is when the service provider's MQTT connection drops and reconnects, at which point the full registration flow runs again.

### Handle Acceptance

A registration request is accepted in one of two ways:

- **Manual accept** — a user in the cloud dashboard accepts (or denies) the pending registration.
- **Auto-accept** — Mesh has the service provider's secret mounted alongside its own configuration (conventionally, the same `secrets.txt` file the service provider reads), and recognizes the incoming secret as a known, pre-provisioned one. When the secret matches, Mesh accepts automatically without any dashboard action. Only the VION team can set up auto-accept because it requires mounting files into the Mesh container, which customers do not have access to.

On acceptance, Mesh provisions credentials in the broker's ACL store and **restarts the broker to apply them**. The restart disconnects every MQTT client, including the registering service provider. On reconnect, the service provider runs the registration flow again — this time, because the credentials already exist, Mesh responds immediately with the accepted payload:

```json
{
  "installationTopic": "v1/test/tenant123/gateway456",
  "host": "nanomq",
  "port": 1883,
  "clientId": "sp-hal-sim-a1b2c3",
  "username": "hal-sim",
  "password": "generated-password"
}
```

Store these credentials, disconnect, and reconnect with them to enter the operational phase.

### Handle Denial

If denied, log the reason and retry after a delay.

## Operational Connection

Reconnect to the broker using the credentials from the accepted registration payload.

| Field | Value |
|-------|-------|
| Host | `host` from accepted payload |
| Port | `port` from accepted payload |
| Client ID | `clientId` from accepted payload |
| Username | `username` from accepted payload |
| Password | `password` from accepted payload |
| Protocol | MQTT 5.0 |

### Last Will Testament

Configure a Last Will Testament (LWT) so the broker publishes an offline health status if the service provider disconnects unexpectedly:

| Field | Value |
|-------|-------|
| Will Topic | `{installationTopic}/{serviceProviderIdentifier}/component/health/state` |
| Will Payload | `ComponentHealthStatusPayload` with `connectionStatus: Offline` |
| Will Content-Type | `application/json` |
| Will QoS | 1 |
| Will Retain | yes |

## Declaration

After connecting operationally, publish a declaration describing the services and contracts this provider offers.

| Field | Value |
|-------|-------|
| Topic | `{installationTopic}/{serviceProviderIdentifier}/system/serviceProvider/declaration` |
| Payload | JSON (see below) |
| QoS | 0 |
| Retain | yes |
| Content-Type | `application/json` |

Declaration payload:

```json
{
  "services": [
    {
      "identifier": "di",
      "contracts": [
        { "identifier": "di0", "type": "DigitalInput" },
        { "identifier": "di1", "type": "DigitalInput" }
      ]
    },
    {
      "identifier": "do",
      "contracts": [
        { "identifier": "do0", "type": "DigitalOutput" },
        { "identifier": "do1", "type": "DigitalOutput" }
      ]
    }
  ]
}
```

The `type` field must match a `[ServiceProviderContractType]` known to the Dale runtime (for example, `DigitalInput`, `DigitalOutput`, `AnalogInput`, `AnalogOutput`, `ModbusRtu`, or a custom type from a third-party Dale SDK package).

### Properties and measuring points

A service may also declare **properties** (typed read/writable values) and **measuring points** (read-only telemetry) alongside its contracts. Each is an object with a required `identifier` and a required `schema`, plus optional `presentation` and `runtime` siblings:

| Field | Description |
|-------|-------------|
| `identifier` (required) | The name used on the value's state topic and in the dashboard. Must be a valid MQTT topic segment. |
| `schema` (required) | A JSON Schema 2020-12 document in the *Dale profile* describing the value's type, unit, bounds, and read/write mode. |
| `presentation` | UI hints — display name, grouping, ordering. |
| `runtime` | Dale-runtime hints such as persistence. A Dale concern; service providers normally omit it. |

This is the same `{schema, presentation, runtime}` model the Dale runtime emits for logic-block introspection, so the dashboard renders provider values with the same type fidelity as logic-block values. The `schema` maps the value's type onto JSON Schema `type` / `format`:

| Value type | `schema` |
|------------|----------|
| boolean | `{ "type": "boolean" }` |
| integer | `{ "type": "integer", "format": "int32" }` (also `int16`, `int64`, `uint8`, …) |
| number | `{ "type": "number", "format": "double" }` (also `float`) |
| string | `{ "type": "string" }` |
| timestamp | `{ "type": "string", "format": "date-time" }` |
| GUID | `{ "type": "string", "format": "uuid" }` |
| enum | `{ "type": "string", "enum": ["Off", "On", "Auto"] }` |
| struct | `{ "type": "object", "properties": { … }, "required": [ … ], "additionalProperties": false }` |
| array | `{ "type": "array", "items": { … } }` |
| nullable `T?` | the `type` is widened to a list, e.g. `{ "type": ["string", "null"] }` |

The schema carries these extra keywords:

| Keyword | Meaning |
|---------|---------|
| `readOnly` | The value is reported by the provider and never set. Always present on measuring points; add it to properties the dashboard must not write. |
| `writeOnly` | The value is a secret — see [Write-only properties](#write-only-properties). |
| `x-unit` | The engineering unit, e.g. `"W"`, `"kWh"`, `"°C"`. |
| `x-kind` | The measuring-point kind: `"measurement"` (instantaneous reading), `"total"` (cumulative, may rise or fall), or `"totalIncreasing"` (monotonic counter). |
| `minimum` / `maximum` | Numeric bounds. |
| `format` | An advisory string format, e.g. `"ipv4"`, `"hostname"`, `"email"`, `"uri"`. |

A minimal declaration — one writable property and one measuring point:

```json
{
  "services": [
    {
      "identifier": "inverter",
      "properties": [
        {
          "identifier": "targetPower",
          "schema": { "type": "number", "minimum": 0, "maximum": 5000 },
          "presentation": { "displayName": "Target Power" }
        }
      ],
      "measuringPoints": [
        {
          "identifier": "actualPower",
          "schema": { "type": "number", "readOnly": true }
        }
      ]
    }
  ]
}
```

A richer declaration — a struct-typed property with a secret member, and two measuring points carrying units and kinds:

```json
{
  "services": [
    {
      "identifier": "connection",
      "description": "Upstream broker connection",
      "properties": [
        {
          "identifier": "config",
          "schema": {
            "type": "object",
            "title": "Config",
            "properties": {
              "host": { "type": "string" },
              "port": { "type": "integer", "format": "int32", "minimum": 1, "maximum": 65535 },
              "password": { "type": ["string", "null"], "writeOnly": true }
            },
            "required": ["host", "port"],
            "additionalProperties": false
          },
          "presentation": { "displayName": "Connection", "group": "Upstream" }
        }
      ],
      "measuringPoints": [
        {
          "identifier": "activePower",
          "schema": { "type": "number", "format": "double", "readOnly": true, "x-unit": "W", "x-kind": "measurement" }
        },
        {
          "identifier": "energyImported",
          "schema": { "type": "number", "format": "double", "readOnly": true, "x-unit": "kWh", "x-kind": "totalIncreasing" }
        }
      ]
    }
  ]
}
```

.NET providers build these from a `ServiceSchema<T>` — the SDK's `ServiceField`s carry the typed schema and emit the JSON. See [Service Provider SDK](/sdk/service-provider-sdk). Other languages emit the JSON directly.

### Write-only properties

A **write-only** property is a secret — a password, token, or client certificate — that the provider accepts but must never echo back in clear text. Mark the string (a whole-value string property, or a `string` member of a struct) with `"writeOnly": true` in its schema. In v1 only `string` / `string?` positions may be write-only.

Write-only changes how the value crosses the wire in both directions:

- **On read (state publish):** replace every set write-only value with the redaction sentinel `"***"` before publishing. A write-only value that is unset stays `null`, so a reader can still tell an empty secret from a stored, hidden one.
- **On set (property-set):** re-submitting the sentinel `"***"` keeps the stored value unchanged ("leave the secret as-is"); `null` clears it; any other value replaces it. The sentinel is never itself stored.

This is a wire-read-path protection, not encryption at rest: a value stored on disk is not encrypted, and a literal value of exactly `"***"` cannot be distinguished from the sentinel.

.NET providers get this for free — declare the field `WriteOnly` and the SDK redacts on publish and resolves on set at its state boundaries. See [Service Provider SDK](/sdk/service-provider-sdk). Other languages implement the substitution themselves.

## Health Reporting

Health uses **two channels**: the service provider publishes lifecycle `online` / `offline` to the **state** topic, and Mesh **pulls** health detail on demand with a query/response. The `since` / `reason` discipline at the end of this section matters — getting it wrong floods the cloud.

### Connection state (`online` / `offline`)

`online` / `offline` mean exactly one thing: **whether the service provider is connected to the local broker.** Publish `online` (retained) once you are operationally connected, and configure your [Last Will](#last-will-testament) so the broker publishes `offline` if you drop. **Never** flip `online` / `offline` for any other reason — if an *external* dependency is unreachable (your provider can't reach its upstream cloud or field bus), you are still `online`; report that as **unhealthy** in your health response, not as `offline`.

| Field | Value |
|-------|-------|
| Topic | `{installationTopic}/{serviceProviderIdentifier}/component/health/state` |
| Payload | `ComponentHealthStatusPayload` |
| QoS | 0 |
| Retain | yes |

On an `online` / `offline` message the health **status defaults to `Unknown`** unless you assert one (for example `online` + `Healthy`), which Mesh respects. Set a UTC-now `since` when you can — it lets Mesh distinguish a genuine new `online` from a duplicate (two `online`s with `since` unset are ambiguous). The state topic is **not** only for `online` / `offline` — pushing an actual health *change* here is allowed. But **never push to `state` as part of answering a health poll:** Mesh **clears its pending health request the moment a message lands on the state topic**, so replying on the `ResponseTopic` *and* pushing to `state` corrupts Mesh's request tracking (and a poll doesn't change your health, so there's nothing to push). The only reason to push a health change to `state` is when *another* service provider watches your state and must react when you go unhealthy without polling you. For Mesh, never push — it polls, and the poll response time is part of the evaluation (next section).

### Respond to health queries

Subscribe to `{installationTopic}/{serviceProviderIdentifier}/component/health/get`. When a query arrives, publish your current health to the request's `ResponseTopic`, echoing its `CorrelationData`.

Response timeliness **gates whether Mesh trusts your status at all:** reply **in time** and Mesh respects whatever you report — a timely `Unhealthy` is `Unhealthy`, a timely `Healthy` is `Healthy`. Reply **late, or not at all,** and Mesh ignores your reported status and marks you **unhealthy** ("did not respond in time") — a `Healthy` that arrives too late is still unhealthy. So timeliness is itself the liveness signal, and a provider with nothing of its own to report just answers **`Healthy`, `since = null`, `reason = null`**.

### Keep `since` and `reason` stable

::: warning
Mesh diffs successive health to detect state changes, and **every change is written to a store-and-forward outbox and forwarded to the cloud.** A `since` or `reason` that changes on every response makes *every poll* look like a new state change — and after a cloud-link outage those phantom changes pile up in the outbox, where they can take **hours** to drain on reconnect, delaying real telemetry behind them. So:

- A `null` `since` is fine — Mesh assigns the transition time itself when it first sees the state.
- **Never** stamp the current time on every response.
- **Never** put a constantly-changing value in `reason`. Use a stable category — `"messages dropped"`, not `"dropped 1234 messages"`. Keep the varying count in your logs.
:::

### Wire format

Health is a **JSON** `ComponentHealthStatusPayload`, published with `Content-Type: application/json` and the `schema` user property `ComponentHealthStatusPayload`. Set the same `application/json` `Content-Type` on your [Last Will](#last-will-testament) so the broker's retained `offline` will decodes correctly. JSON keeps health reportable from any provider, including those without a FlatBuffers toolchain (Python, TwinCAT / Structured Text, bare-metal firmware).

The payload wraps a single `component`:

```json
{
  "component": {
    "name": "hal-sim",
    "connectionStatus": "Online",
    "healthStatus": "Healthy",
    "since": null,
    "reason": null,
    "subComponents": null
  }
}
```

| Field | Meaning |
|-------|---------|
| `name` | The component's identifier — a service provider reports its own `serviceProviderIdentifier`. |
| `connectionStatus` | `Online` / `Offline` / `Unknown` — connectivity to the local broker only. |
| `healthStatus` | `Healthy` / `Unhealthy` / `Unknown`. |
| `since` | The UTC timestamp the status has held since, or `null`. |
| `reason` | A stable reason category, or `null`. |
| `subComponents` | An optional nested list of `component` objects, or `null`. |

`subComponents` lets a component report a tree of child statuses, nested to any depth — useful when one provider fronts several devices or upstreams and reports each separately:

```json
{
  "component": {
    "name": "modbus-gateway",
    "connectionStatus": "Online",
    "healthStatus": "Unhealthy",
    "since": null,
    "reason": "device unreachable",
    "subComponents": [
      { "name": "meter-1", "connectionStatus": "Online", "healthStatus": "Healthy", "since": null, "reason": null, "subComponents": null },
      { "name": "meter-2", "connectionStatus": "Online", "healthStatus": "Unhealthy", "since": null, "reason": "device unreachable", "subComponents": null }
    ]
  }
}
```

By convention — **not** enforced by the platform — a component rolls its children's health up into its own `healthStatus`: any `Unhealthy` child makes the parent `Unhealthy` (this takes precedence), otherwise any `Unknown` child makes the parent `Unknown`, and the parent is `Healthy` only when every child is. So one `Unknown` child alone yields `Unknown`; one `Unhealthy` child yields `Unhealthy`; an `Unhealthy` child alongside an `Unknown` child still yields `Unhealthy`. Subcomponents do **not** change the parent's `connectionStatus` — that stays a statement about the parent's own broker connection. This is how other components in the system behave; deriving your own `healthStatus` from your subcomponents is ultimately up to you.

The retained [Last Will](#last-will-testament) carries the same shape with `connectionStatus` `Offline` and `healthStatus` `Unknown`:

```json
{
  "component": {
    "name": "hal-sim",
    "connectionStatus": "Offline",
    "healthStatus": "Unknown",
    "since": null,
    "reason": null,
    "subComponents": null
  }
}
```

## System Control

Mesh can restart a service provider and change its log level at runtime. Both are Mesh → provider commands published under the same `{installationTopic}/{serviceProviderIdentifier}/system/serviceProvider/` prefix as the [declaration](#declaration). Implementing them is recommended — it lets an operator restart a misbehaving provider and raise its log verbosity remotely — but it is not enforced. A provider that does not subscribe simply does not respond: the command is published to a topic with no subscriber and dropped, and nothing errors.

### Restart

A restart command tells the provider to restart. The target is the provider addressed by the topic; the command carries no payload.

| Field | Value |
|-------|-------|
| Topic | `{installationTopic}/{serviceProviderIdentifier}/system/serviceProvider/restart` |
| Direction | Mesh → provider |
| Payload | empty — `RestartPayload` has no fields |

On receipt, exit the process and let your supervisor (a container restart policy, systemd, etc.) bring it back; restarting in place is equally valid. The platform only requires that the provider re-runs registration and re-publishes its declaration afterward. There is no restart response — Mesh observes the provider go `offline`, then `online` again, on the [health state topic](#connection-state-online-offline).

### Log level

A log-level command sets the minimum severity the provider logs at, so an operator can raise verbosity on a misbehaving provider without redeploying it.

| Field | Value |
|-------|-------|
| Topic | `{installationTopic}/{serviceProviderIdentifier}/system/serviceProvider/logLevel/set` |
| Direction | Mesh → provider |
| Payload | JSON: `{ "logLevel": "Debug" }` |
| User property `schema` | `SetLogLevelPayload` |

The level is one of `Trace`, `Debug`, `Information`, `Warning`, `Error`, `Critical`, `None`.

After applying the change, publish the new level back so the cloud reflects the provider's active level:

| Field | Value |
|-------|-------|
| Topic | `{installationTopic}/{serviceProviderIdentifier}/system/serviceProvider/logLevel/state` |
| Direction | provider → Mesh |
| Payload | JSON: `{ "logLevel": "Debug" }` |
| Retain | yes |
| User property `schema` | `LogLevelStatePayload` |

## MQTT Message Conventions

All messages during the operational phase follow these conventions:

| Convention | Detail |
|------------|--------|
| Protocol version | MQTT 5.0 required |
| User property `schema` | Payload type name (e.g., `DiStatePayload`, `SetDoPayload`) |
| User property `published_at` | ISO 8601 UTC timestamp |
| Content-Type | `application/x-flatbuffers`, `application/json`, or `application/octet-stream` |

## Service-Specific Messaging

Everything beyond registration, declaration, and health is defined by each service provider type. The protocol does not prescribe topic structure or payload format for service-specific messaging.

### Topic Structure

All service-specific topics follow this pattern:

```
{installationTopic}/{serviceProviderIdentifier}/{service}/{contract}/{contract-specific-path}
```

| Segment | Description |
|---------|-------------|
| `{installationTopic}` | Received during registration |
| `{serviceProviderIdentifier}` | This provider's identifier |
| `{service}` | Service identifier from the declaration |
| `{contract}` | Contract identifier from the declaration |
| `{contract-specific-path}` | Must start with a unique routing segment, followed by provider-defined actions |

The first three segments after `{installationTopic}` form a **routing prefix** that identifies the provider, service, and contract. The contract-specific path must start with a **routing segment** — a fixed string unique to the contract type that the Dale runtime uses to dispatch messages to the correct handler (e.g., `hw/di` for digital inputs, `hw/modbus` for Modbus, `codesys` for a custom CODESYS handler). Everything after the routing segment is provider-defined.

This structure enables simple broker ACL rules — a provider can be restricted to `{installationTopic}/{its-identifier}/#` with a single rule. Multiple providers can coexist on the same gateway, each providing the same contract types under their own namespace.

### Built-in Contract Type Topics

The built-in contract types (DigitalIo, AnalogIo, ModbusRtu) use fixed action paths that correspond to the `Topics` constants defined in the `Shared.Contracts` package:

DigitalIo provider:

| Topic | Direction |
|-------|-----------|
| `{installationTopic}/{serviceProviderIdentifier}/{service}/{contract}/hw/di/state` | Provider → Runtime (state update) |
| `{installationTopic}/{serviceProviderIdentifier}/{service}/{contract}/hw/do/set` | Runtime → Provider (set command) |
| `{installationTopic}/{serviceProviderIdentifier}/{service}/{contract}/hw/do/set/dale/response` | Provider → Runtime (set acknowledgement) |
| `{installationTopic}/{serviceProviderIdentifier}/{service}/{contract}/hw/do/state` | Provider → Runtime (state confirmation) |

AnalogIo provider:

| Topic | Direction |
|-------|-----------|
| `{installationTopic}/{serviceProviderIdentifier}/{service}/{contract}/hw/ai/state` | Provider → Runtime (state update) |
| `{installationTopic}/{serviceProviderIdentifier}/{service}/{contract}/hw/ao/set` | Runtime → Provider (set command) |
| `{installationTopic}/{serviceProviderIdentifier}/{service}/{contract}/hw/ao/set/dale/response` | Provider → Runtime (set acknowledgement) |
| `{installationTopic}/{serviceProviderIdentifier}/{service}/{contract}/hw/ao/state` | Provider → Runtime (state confirmation) |

Modbus RTU provider:

| Topic | Direction |
|-------|-----------|
| `{installationTopic}/{serviceProviderIdentifier}/{service}/{contract}/hw/modbus/get` | Runtime → Provider (read request) |
| `{installationTopic}/{serviceProviderIdentifier}/{service}/{contract}/hw/modbus/get/dale/response` | Provider → Runtime (read response) |
| `{installationTopic}/{serviceProviderIdentifier}/{service}/{contract}/hw/modbus/set` | Runtime → Provider (write request) |
| `{installationTopic}/{serviceProviderIdentifier}/{service}/{contract}/hw/modbus/set/dale/response` | Provider → Runtime (write response) |

### Custom Contract Type Topics

Custom service providers define their own action paths. The contract-specific path must start with a **routing segment** — a fixed, non-ambiguous topic part that the Dale runtime uses to dispatch messages to the correct handler actor. The runtime matches incoming topics using `topic.Contains(routingSegment)`, so the routing segment must be unique across all registered handler types.

For example, the built-in types use `hw/di`, `hw/do`, `hw/ai`, `hw/ao`, and `hw/modbus` as routing segments. A custom CODESYS provider would define its own (e.g., `codesys`).

::: warning Routing Segment Uniqueness
The routing segment must not be a substring of any other registered routing segment, and vice versa. For example, a segment `hw` would conflict with the built-in `hw/di` because one contains the other. The runtime rejects handler registrations with conflicting routing segments at startup.
:::

The structure after the routing segment is entirely up to the provider. It can be as granular as individual symbol addresses or as simple as a single action keyword with everything else in the payload:

```
{installationTopic}/{serviceProviderIdentifier}/{service}/{contract}/{routing-segment}/{action...}
```

CODESYS provider (example — one handler, granular topic addressing):

```
{installationTopic}/codesys-01/plc/cpu1/codesys/state          # Variable state from PLC
{installationTopic}/codesys-01/plc/cpu1/codesys/set            # Write command to PLC
{installationTopic}/codesys-01/plc/cpu1/codesys/get            # Read request
{installationTopic}/codesys-01/plc/cpu1/codesys/get/response   # Read response
```

The Dale runtime subscribes to `{installationTopic}/+/+/+/codesys/#` and routes all matching messages to the `CodesysHandler`. The handler then interprets the remaining topic segments and payload to determine what to do.

Alternatively, a provider that prefers a flat topic structure can put addressing in the payload:

```
{installationTopic}/codesys-01/plc/cpu1/codesys/rpc    # All requests/responses on one topic
```

### Interaction Patterns

Service providers typically use one or more of these patterns:

**State publishing** — the provider publishes retained state messages. Subscribers receive the latest value immediately on subscription and updates as they occur.

**Command handling** — the Dale runtime publishes commands (e.g., set a digital output). The provider processes the command and publishes a state confirmation.

**Request-response** — for operations the requester needs to confirm, or that return data (a property or register *write*, a Modbus register *read*), use the MQTT 5.0 `ResponseTopic` and `CorrelationData` properties. The requester sets `ResponseTopic` to indicate where the reply should go and `CorrelationData` to correlate it. The responder publishes to that topic, echoing the same `CorrelationData`, and sets a `status` user property — `Success` (with the resulting value as the payload) or `Error` (with an optional `error_message`). Whether the requester blocks on the reply, consumes it asynchronously, or ignores it is the requester's concern — the responder's obligation is the same either way.

::: warning Always reply when a request names a response topic
A `ResponseTopic` on an incoming request is the requester declaring it wants a reply — honor it unconditionally: `Success` once applied, or `Error` with an `error_message` if you reject the request (e.g. a value out of range, or a read-only target). You cannot tell from the message what the requester does while waiting. Some requesters consume replies asynchronously or not at all — but the platform runtime sends automation-driven property sets as *awaited* requests, and if you apply the change without replying it cannot tell success from a dropped message: it retries the set and ultimately reports the automation as failed, **even though you applied the value**. A request without a `ResponseTopic` is fire-and-forget — do not reply. The same applies in reverse: when your provider is the requester and does not need a reply, simply omit the `ResponseTopic`.
:::

### Serialization

Service providers choose their own serialization format. The `Content-Type` MQTT property distinguishes formats:

| Content-Type | Description |
|-------------|-------------|
| `application/x-flatbuffers` | FlatBuffers binary format (used by built-in DigitalIo and AnalogIo) |
| `application/json` | JSON (recommended for custom providers — easiest to implement across technologies) |
| `application/octet-stream` | Custom binary format |

The dale runtime handler for each contract type must understand the serialization used by its corresponding service provider.

### Reserved Topic Prefixes

Service-specific topics must not use these prefixes:

| Prefix | Used by |
|--------|---------|
| `system/serviceProvider/` | Registration protocol (before the installation topic is assigned) |
| `{installationTopic}/{serviceProviderIdentifier}/system/serviceProvider/` | Declaration, restart, and log level |
| `{installationTopic}/{serviceProviderIdentifier}/component/` | Health reporting |

## Lifecycle Summary

```mermaid
sequenceDiagram
    participant SP as Service Provider
    participant B as MQTT Broker<br/>(NanoMQ)
    participant M as Mesh
    participant D as Dale

    rect rgb(50, 101, 108, 0.1)
    Note over SP,M: Registration Phase
    Note over SP: Generate + persist secret
    SP->>B: Connect (unauthenticated)
    SP->>B: Subscribe to system/.../accepted/{secret}<br/>and system/.../denied/{secret}
    SP->>B: Publish registration (retained, QoS 0)<br/>payload: { serviceProviderIdentifier }
    M->>B: Subscribe to system/.../request/+
    B-->>M: Deliver retained registration
    Note over M: Auto-accept (VION-configured)<br/>or user accepts in dashboard
    Note over M: Provision credentials<br/>+ restart broker to apply ACL
    B--xSP: Broker restart disconnects SP
    SP->>B: Reconnect + republish registration
    M-->>B: Publish system/.../accepted/{secret}<br/>(plaintext credentials)
    B-->>SP: Receive accepted payload
    SP->>B: Disconnect
    end

    rect rgb(50, 101, 108, 0.1)
    Note over SP,D: Operational Phase
    SP->>B: Connect with credentials<br/>(+ LWT for health)
    SP->>B: Publish declaration
    SP->>B: Publish initial health state
    SP->>B: Subscribe to health queries

    loop Contract Messaging
        SP->>B: Publish state messages
        B->>D: Deliver state messages
        D->>B: Publish commands
        B->>SP: Deliver commands
        SP->>B: Publish responses
        B->>D: Deliver responses
    end

    loop Health Monitoring
        M->>B: Publish health query
        B->>SP: Deliver health query
        SP->>B: Publish health response
        B->>M: Deliver health response
    end
    end
```
