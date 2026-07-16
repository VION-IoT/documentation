---
title: Service Provider SDK
description: Author on-edge service providers in C# with the Vion.ServiceProvider.Sdk package, which handles registration, declaration, health, and system control.
---

# Service Provider SDK

`Vion.ServiceProvider.Sdk` is an optional C# convenience for authoring on-edge service providers. It runs the registration handshake, resends the declaration on every reconnect, answers health polls, and handles restart and log-level commands — so a C# provider does not hand-write any of the [Service Provider Protocol](/sdk/service-provider-protocol).

The SDK is not the wire format. Every payload type, MQTT topic, and user-property name lives in `Vion.Contracts`; a provider written in Python, Structured Text, or any other MQTT-capable technology implements the protocol directly. Use this page when the provider is written in C#; use the [Service Provider Protocol](/sdk/service-provider-protocol) when it is not.

## Install

Add the package to your service provider project:

```bash
dotnet add package Vion.ServiceProvider.Sdk
```

The package targets `net10.0` and is AOT-compatible.

## Client lifecycle

A provider builds a `ServiceProviderClientConfiguration`, constructs a `ServiceProviderClient`, and starts it. `StartAsync` runs the full flow — register, connect operationally, declare, subscribe, publish initial state — and re-runs it on every reconnect until the token is cancelled.

```csharp
using System.Threading;
using Microsoft.Extensions.Logging;
using MQTTnet;
using Vion.Contracts.Events.MeshToCloud;
using Vion.ServiceProvider.Sdk.RegistrationFlow;

var connectionData = new MqttConnectionData(
    ServiceProviderIdentifier: "hal-sim",
    Host: "nanomq",
    Port: 1883);

var configuration = new ServiceProviderClientConfigurationBuilder(connectionData, secret)
    .WithDeclaration(BuildDeclaration)
    .WithHandlers(handlers =>
    {
        handlers.WithContractHandler("di", "di0", HandleDigitalInputAsync);
        handlers.WithHealthCheckEvaluator(() => new HealthCheckResult(HealthStatus.Healthy));
    })
    .Build();

var client = new ServiceProviderClient(configuration, new MqttClientFactory(), logger);
await client.StartAsync(stoppingToken);
```

Two inputs are always supplied: `connectionData` (the local broker host and port, and this provider's identifier) and `secret` (the pairing secret, generated on first run and persisted — see [Registration](/sdk/service-provider-protocol#registration)). The SDK uses both only to complete registration; Mesh issues the operational broker credentials on acceptance and the SDK reconnects with those.

`WithReconnectDelay(TimeSpan)` overrides the delay before the SDK re-runs its startup flow after the operational connection ends (default 5 seconds). `WithOnOperationalReady(...)` registers an async callback that fires once the provider is fully operational after each (re)connect — use it to re-publish state the broker may have lost while offline.

## Declaration

`WithDeclaration` takes a callback returning the [declaration payload](/sdk/service-provider-protocol#declaration). The SDK invokes it on every reconnect, so keep it cheap and idempotent:

```csharp
using Vion.Contracts.Events.MeshToCloud;

static ServiceProviderDeclarationPayload BuildDeclaration() => new()
{
    Services =
    [
        new ServiceProviderDeclarationPayload.ServiceInfo
        {
            Identifier = "di",
            Contracts =
            [
                new ServiceProviderDeclarationPayload.ContractInfo { Identifier = "di0", Type = "DigitalInput" },
            ],
        },
    ],
};
```

To declare typed service properties and measuring points instead of hand-building each schema, use [`ServiceSchema<T>`](#typed-service-state).

## Handlers

Register message handlers inside `WithHandlers`. Every handler is a `ServiceProviderMessageHandler`:

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using MQTTnet;
using Vion.ServiceProvider.Sdk.RegistrationFlow;

Task HandleDigitalInputAsync(
    IServiceProviderPublisher publisher,
    MqttApplicationMessage message,
    Guid correlationId,
    CancellationToken cancellationToken)
{
    // decode message.Payload, act, and optionally publish through `publisher`
    return Task.CompletedTask;
}
```

The handler builder offers two registration methods:

| Method | Subscribes to |
|--------|---------------|
| `WithContractHandler(service, contract, handler)` | `{installationTopic}/{serviceProviderIdentifier}/{service}/{contract}/#` — all traffic for one declared contract |
| `WithHandler(topic, handler)` | An explicit topic filter (MQTT `+` / `#` wildcards allowed) |

Both take an optional `noLocal` parameter (default `true`) so the broker does not deliver back messages this provider itself published.

`IServiceProviderPublisher` is the strict publish surface handed to every handler. It always sets a correlation ID and `published_at`, and requires `schema` plus `Content-Type` on any non-empty payload. `PublishResponseAsync(topic, status, ...)` answers a request on its `ResponseTopic` with a `RequestStatus` of `Success` or `Error` — see [Request-response](/sdk/service-provider-protocol#interaction-patterns). Publishing never throws on a transport failure; it returns `false`.

## Health

Register a health evaluator with `WithHealthCheckEvaluator`. The SDK calls it to answer Mesh's health polls and to publish the retained `online` state, so one evaluator serves both channels:

```csharp
using Vion.Contracts.Events.MeshToCloud;
using Vion.ServiceProvider.Sdk.RegistrationFlow;

handlers.WithHealthCheckEvaluator(() =>
    _upstreamReachable
        ? new HealthCheckResult(HealthStatus.Healthy)
        : new HealthCheckResult(HealthStatus.Unhealthy, Reason: "upstream unreachable"));
```

`HealthCheckResult(HealthStatus Status, string? Reason = null, DateTime? Since = null)` maps onto the [health response](/sdk/service-provider-protocol#health-reporting). Return the same values while a condition persists — a `Reason` or `Since` that changes on every call floods the cloud-bound outbox. A provider with nothing of its own to report returns `new HealthCheckResult(HealthStatus.Healthy)`; the response-timeliness check carries it.

The SDK publishes `online` (retained) on connect and wires the Last Will that publishes `offline` on disconnect. To push a health change proactively (rather than waiting to be polled), call `PublishHealthStateAsync` on the publisher; the pushed state reflects whatever the evaluator returns at that moment.

::: warning
`online` / `offline` mean local-broker connectivity only. An unreachable *upstream* dependency is `Healthy = false` on the evaluator, never `offline`. See [Connection state](/sdk/service-provider-protocol#connection-state-online-offline).
:::

## System control

The SDK ships default handlers for the two [System Control](/sdk/service-provider-protocol#system-control) commands, on by default:

- **Restart** — the default handler stops the host so the process supervisor restarts it.
- **Log level** — the default handler updates `LogLevelManager.CurrentLevel`, persists the new level so it survives a restart (see below), and republishes the `logLevel/state` message.

`LogLevelManager` is a static holder for the provider's current level. Wire your logging pipeline to read it so a remote change takes effect immediately — the [Telemetry](/sdk/telemetry) export does this through its `CurrentLevelProvider`:

```csharp
using Vion.ServiceProvider.Sdk.SystemControl;

CurrentLevelProvider: () => LogLevelManager.CurrentLevel
```

`LogLevelManager.InitializeFromConfig(configuration)` seeds the initial level from `Logging:LogLevel:Default`. The SDK also persists a cloud-set level — as the enum name, in `logLevel.txt` — and `AddVionServiceProviderSdk` restores it over that default on startup, so a remote change survives a restart. Precedence: persisted file > `Logging:LogLevel:Default` > `Information`; a missing or unparseable file falls back to the config default.

To replace either default, pass an override on the builder. `WithRestartCallback(handler)` and `WithLogLevelChangeCallback(handler, currentLevelProvider?)` both take a `ServiceProviderMessageHandler`; the log-level payload is a `SetLogLevelPayload` carrying the new `LogLevel`. The SDK still republishes `logLevel/state` after your handler runs. Overriding the log-level handler replaces the default's write-through, so persist the level yourself if the override should still survive a restart.

## Typed service state

For providers whose declaration is a set of typed service properties and measuring points, the SDK builds the declaration schema and manages state instead of hand-rolling JSON.

`ServiceSchema<TService>` is the field catalog for one service. Each `ServiceField<TService>` carries a `TypeSchema` (the single source of the wire type and its annotations) and a `ServiceFieldKind` (`Property` or `MeasuringPoint`). `BuildServiceInfo()` produces the declaration entry:

```csharp
using System.Collections.Generic;
using Vion.ServiceProvider.Sdk.Services;

public sealed class ConnectionSchema : ServiceSchema<Config>
{
    public override string ServiceIdentifier => "connection";
    protected override string ServiceDescription => "Upstream broker connection";

    // Each field pairs a TypeSchema with read/write delegates over the Config snapshot.
    public override IReadOnlyList<IServiceField<Config>> All { get; } = BuildFields();
}
```

Two helpers move values across the wire and apply [write-only](/sdk/service-provider-protocol#write-only-properties) redaction automatically, keyed off each field's schema:

| Type | Role |
|------|------|
| `ServiceStatePublisher` | Publishes a field's value to its state topic, replacing write-only positions with the `"***"` sentinel before broadcast. |
| `ServiceStateStore<TService>` | Persists configuration-style state to disk and, on set, resolves an echoed `"***"` back to the stored value (`null` clears; any other value replaces). |

Declaring a member `WriteOnly` in its `TypeSchema` is all a provider does; the store and publisher handle redaction and resolution, so provider code holds no secret-handling logic. `ServiceStateStore<TService>` is for configuration values restored on restart — not high-frequency measuring-point readings, which should be published, not persisted on every change.

## Dependency-injection registration

For a hosted provider, `AddVionServiceProviderSdk` registers the client, wires the default system-control handlers from DI, seeds `LogLevelManager` from configuration, and restores any persisted log level over that default (see [System control](#system-control)). The persistence file defaults to `data/logLevel.txt` under the app base directory; pass `logLevelFilePath` to change it:

```csharp
using Microsoft.Extensions.DependencyInjection;
using Vion.ServiceProvider.Sdk;

builder.Services.AddVionServiceProviderSdk(
    builder.Configuration,
    serviceProvider => new ServiceProviderClientConfigurationBuilder(connectionData, secret)
        .WithDeclaration(BuildDeclaration)
        .WithHandlers(ConfigureHandlers)
        .Build());
```

The registered `ServiceProviderClient` (and its `IServiceProviderClient` / `IServiceProviderPublisher` facets) is resolved from DI; start it from a hosted service with `StartAsync`. Because the default restart handler resolves the host's `IHostApplicationLifetime`, a restart command stops the host cleanly.

## Next steps

- [Service Provider Protocol](/sdk/service-provider-protocol) — the MQTT wire this SDK implements, and the reference for non-C# providers.
- [Properties & Measuring Points](/sdk/properties) — the type model shared with logic blocks, including secrets and units.
- [Telemetry](/sdk/telemetry) — export logs, traces, and metrics, and wire `LogLevelManager` into the log pipeline.
