---
title: Telemetry
description: Export logs, traces, and metrics from a service provider to VION's OpenTelemetry collector with the Vion.Telemetry.Export package.
---

# Telemetry

`Vion.Telemetry.Export` wires the OpenTelemetry OTLP export pipeline — logs, traces, and metrics — behind a single `AddVionTelemetryExport(...)` call, so a service provider exports the same shape of observability data as the rest of VION without hand-rolling the pipeline. The package is published as [`Vion.Telemetry.Export`](https://www.nuget.org/packages/Vion.Telemetry.Export) on nuget.org. Span *creation* lives in the companion [`Vion.Telemetry.Instrumentation`](https://www.nuget.org/packages/Vion.Telemetry.Instrumentation) package (see [Exporting your own traces](#exporting-your-own-traces)).

The package is export-only. Creating spans stays with the code that records them, so OpenTelemetry never enters the dependency closure of code that does not export. See [Observability Overview](/observability/overview) for where the exported data goes once it leaves the gateway.

## Install

Add the package to your service provider project:

```bash
dotnet add package Vion.Telemetry.Export
```

The package targets `net10.0` and is AOT-compatible.

## Register

Call `AddVionTelemetryExport` on your `IServiceCollection` during startup. It registers the logging filter, the OTLP log/trace/metric exporters, the resource, the runtime-metric allow-list, and the batch/interval options:

```csharp
using System.Reflection;
using Microsoft.Extensions.Hosting;
using Vion.ServiceProvider.Sdk.SystemControl;
using Vion.Telemetry.Export;

var builder = Host.CreateApplicationBuilder(args);

var serviceVersion = Assembly.GetExecutingAssembly()
    .GetCustomAttribute<AssemblyInformationalVersionAttribute>()
    ?.InformationalVersion;

builder.Services.AddVionTelemetryExport(new VionTelemetryExportOptions(
    ApplicationName: "my-service-provider",
    ServiceVersion: serviceVersion,
    CurrentLevelProvider: () => LogLevelManager.CurrentLevel,
    ConsoleLoggingEnabled: builder.Environment.IsDevelopment(),
    CollectorUri: "http://otel:4317"));
```

Every value is supplied at the call site — the package reads no configuration keys itself, so it is not coupled to any specific key names.

`CurrentLevelProvider` is a delegate, not a fixed level, so the minimum log level can change at runtime and take effect on the next log entry. `LogLevelManager` (from the service provider SDK) holds the current level, and the SDK's default `logLevel/set` handler writes to it — so wiring the provider to `LogLevelManager.CurrentLevel` makes a remote log-level change apply immediately. If you are not building on the SDK, pass a getter over wherever your application holds its level.

On the edge gateway, the OTLP collector is reachable at `http://otel:4317` — the same collector Mesh and the Dale runtime export to.

## Options

`VionTelemetryExportOptions` is a record; construct it with named arguments. The first five parameters are required; the rest have defaults.

| Parameter | Description |
|-----------|-------------|
| `ApplicationName` (required) | `string`. Sets the OpenTelemetry resource's `service.name` — how this service provider is labelled in dashboards. |
| `ServiceVersion` (required) | `string?`. Sets the resource's `service.version`. Pass the assembly's informational version, or `null` to omit it. The parameter has no default, so a version is always a conscious choice rather than silently absent. |
| `CurrentLevelProvider` (required) | `Func<LogLevel>`. Invoked on every log entry to read the current minimum level; entries below it are dropped. A delegate rather than a fixed level so a runtime level change applies immediately. |
| `ConsoleLoggingEnabled` (required) | `bool`. Also write single-line logs to the console, in addition to the OTLP export. Typically enabled only in development. |
| `CollectorUri` (required) | `string`. OTLP collector endpoint that logs, traces, and metrics are exported to. |
| `CollectorProtocol` | `OtlpExportProtocol`. Export protocol for the collector endpoint. Defaults to `Grpc`. |
| `LogsEnabled` / `TracesEnabled` / `MetricsEnabled` | `bool`. Per-signal export toggles. Each defaults to `true`. |
| `LogFilters` | `(string Category, LogLevel Level)[]?`. Per-category log-level overrides applied on top of `CurrentLevelProvider`. Defaults to `null`. |
| `ActivitySourceNames` | `string[]?`. The `ActivitySource` names to export traces from. To collect VION's messaging spans, include `ActivitySources.Messaging.Name` from `Vion.Telemetry.Instrumentation`. Defaults to `null`. |
| `MeterNames` | `string[]?`. Additional `Meter` names to export metrics from. A subscribed meter's instruments are exported only with a matching `MetricViews` entry. Defaults to `null`. |
| `MetricViews` | `(string InstrumentName, MetricStreamConfiguration Configuration)[]?`. Metric views applied after the built-in runtime-metric allow-list. Defaults to `null`. |

## Exporting your own traces

`Vion.Telemetry.Export` exports traces from whatever `ActivitySource` names you pass in `ActivitySourceNames` — it has no built-in source. To collect VION's messaging spans (publish/consume), reference the companion `Vion.Telemetry.Instrumentation` package and pass its source name, `ActivitySources.Messaging.Name`.

To export spans your own code records, create an `ActivitySource` and pass its name through `ActivitySourceNames`. OpenTelemetry collects sources by name, so the name you register must match the name you construct the source with:

```csharp
using System.Diagnostics;
using Vion.ServiceProvider.Sdk.SystemControl;
using Vion.Telemetry.Export;

public static class Telemetry
{
    public const string SourceName = "MyServiceProvider";
    public static readonly ActivitySource Source = new(SourceName);
}

builder.Services.AddVionTelemetryExport(new VionTelemetryExportOptions(
    ApplicationName: "my-service-provider",
    ServiceVersion: serviceVersion,
    CurrentLevelProvider: () => LogLevelManager.CurrentLevel,
    ConsoleLoggingEnabled: builder.Environment.IsDevelopment(),
    CollectorUri: "http://otel:4317",
    ActivitySourceNames: [Telemetry.SourceName]));
```

Record spans against that source from anywhere in your service provider:

```csharp
using var activity = Telemetry.Source.StartActivity("ForwardMeasurement");
```

## Exporting custom metrics

By default the package exports a fixed set of .NET runtime metrics (GC, memory, CPU) and drops every other instrument. To export your own metric, subscribe its `Meter` through `MeterNames` **and** add a matching view through `MetricViews`:

```csharp
using OpenTelemetry.Metrics;
using Vion.ServiceProvider.Sdk.SystemControl;
using Vion.Telemetry.Export;

builder.Services.AddVionTelemetryExport(new VionTelemetryExportOptions(
    ApplicationName: "my-service-provider",
    ServiceVersion: serviceVersion,
    CurrentLevelProvider: () => LogLevelManager.CurrentLevel,
    ConsoleLoggingEnabled: builder.Environment.IsDevelopment(),
    CollectorUri: "http://otel:4317",
    MeterNames: ["MyServiceProvider.Metrics"],
    MetricViews: [("messages_forwarded", new MetricStreamConfiguration())]));
```

:::warning
The built-in allow-list drops any instrument without a matching view. A meter added through `MeterNames` alone exports nothing — its instruments are silently dropped until you add the corresponding `MetricViews` entry.
:::

## Next steps

- [Service Provider Protocol](/sdk/service-provider-protocol) — the SP↔Mesh wire that the messaging spans trace.
- [Observability Overview](/observability/overview) — how exported telemetry reaches Grafana, and how tenant isolation is enforced.
