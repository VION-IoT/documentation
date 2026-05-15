---
title: Logic Blocks
description: logic blocks are the fundamental building unit of the Dale SDK. Each block is an independent actor that manages its own state and processes messages asynchronously.
---

# Logic Blocks

logic blocks are the core building units of every Dale application. Each block represents a self-contained unit of logic that can receive inputs, maintain state, and produce outputs.

## What is a Logic Block?

A logic block is an **actor** — an independent unit of computation that:

- Has its own internal state
- Processes messages asynchronously, one at a time
- Communicates with other blocks through message passing
- Runs concurrently with other blocks without shared mutable state

In C#, a logic block is defined as a class that extends `LogicBlockBase`.

## Creating a Logic Block

A minimal logic block looks like this:

```csharp
[LogicBlock(Name = "My Block", Icon = "settings-line")]
public class MyBlock : LogicBlockBase
{
    public MyBlock(ILogger logger) : base(logger) { }

    protected override void Ready()
    {
        // Called when the block is configured and ready to run.
    }
}
```

The `[LogicBlock]` attribute provides display metadata for the dashboard. `Ready()` is where the block's runtime behavior is set up.

## Lifecycle

logic blocks follow a well-defined lifecycle with three key methods:

| Method | When it runs | Typical use |
|--------|--------------|-------------|
| `Starting()` | After the block is initialized | One-time setup, opening connections |
| `Ready()` | After configuration is applied and the block is ready to run | Attach event handlers, start processing |
| `Stopping()` | Before the block is removed | Clean up resources, close connections |

`Ready()` is abstract and must be overridden in every logic block. `Starting()` and `Stopping()` are virtual.

```csharp
[LogicBlock(Name = "Sensor Reader", Icon = "sensor-line")]
public class SensorReader : LogicBlockBase
{
    public SensorReader(ILogger logger) : base(logger) { }

    protected override void Starting()
    {
        Logger.LogInformation("SensorReader is starting up");
    }

    protected override void Ready()
    {
        // Set up event handlers and begin processing.
    }

    protected override void Stopping()
    {
        Logger.LogInformation("SensorReader is shutting down");
    }
}
```

## The `[LogicBlock]` Attribute

`[LogicBlock]` carries block-level display metadata for the dashboard. It is **optional** — if omitted, the C# class name is used as the display name and a generic icon is shown.

```csharp
[LogicBlock(Name = "...", Icon = "...", Groups = new[] { ... })]
```

| Parameter | Description |
|-----------|-------------|
| `Name` | Human-readable display name shown in the dashboard. Defaults to the class name. |
| `Icon` | A [Remixicon](https://remixicon.com/) name without the `ri-` prefix (e.g., `"battery-2-line"`, `"charging-pile-line"`). A generic icon is used if omitted. |
| `Groups` | Optional ordered list of `PropertyGroup` keys controlling dashboard section order for this block. See [Section Ordering](#section-ordering). |

## Section Ordering

A block's dashboard view is divided into sections, one per `PropertyGroup` value used by its properties. The `Groups` field on `[LogicBlock]` controls the order of those sections.

```csharp
[LogicBlock(Name = "Power Plant",
            Icon = "flashlight-line",
            Groups = new[]
                     {
                         PropertyGroup.Alarm,
                         PropertyGroup.Status,
                         PropertyGroup.Metric,
                         PropertyGroup.Configuration,
                         PropertyGroup.Diagnostics,
                         PropertyGroup.Identity,
                     })]
public class PowerPlantBlock : LogicBlockBase { /* ... */ }
```

When `Groups` is omitted, the platform default order applies:

```
[Alarm, Status, Metric, Configuration, Diagnostics, Identity, None]
```

Groups used by the block's properties but not listed in `Groups` render after the listed ones, in the platform default order. The `None` group (`PropertyGroup.None`, the empty-string key) is always rendered last.

For per-property grouping and ordering within a section, see [Properties & Measuring Points](/sdk/properties#property-ordering).

## Block Summary Composition

A logic block does not declare its summary as a single attribute. Instead, the auto-generated tile composes a summary from the block's properties marked with `[Presentation(Importance = Importance.Primary)]` and `Importance.Secondary`. Status indicators (`StatusIndicator = true`) render as badges or pills on the tile.

```csharp
[LogicBlock(Name = "Battery", Icon = "battery-2-charge-line")]
public class BatteryBlock : LogicBlockBase
{
    // Primary — large on the tile.
    [ServiceProperty(Title = "State of Charge", Unit = "%")]
    [ServiceMeasuringPoint]
    [Presentation(Group = PropertyGroup.Status, Importance = Importance.Primary)]
    public double StateOfCharge { get; private set; }

    // Secondary — smaller on the tile.
    [ServiceProperty(Title = "Power", Unit = "kW")]
    [ServiceMeasuringPoint]
    [Presentation(Group = PropertyGroup.Status, Importance = Importance.Secondary)]
    public double Power { get; private set; }

    // Status indicator — badge on the tile.
    [ServiceProperty(Title = "Mode")]
    [Presentation(Group = PropertyGroup.Alarm, StatusIndicator = true,
                  Importance = Importance.Primary)]
    public BatteryMode Mode { get; private set; }
}
```

See [Properties & Measuring Points](/sdk/properties) for the full `[Presentation]` surface. A block may declare more than one status indicator — distinct status dimensions all surface on the tile.

## Thread Safety

Because logic blocks are actors, message processing is single-threaded within each block. Property changes and message handling happen inside the actor context automatically.

If code from an external callback (such as an OS event or timer) needs to mutate state, use the synchronization helpers:

```csharp
// Execute an action inside the actor context.
InvokeSynchronized(() =>
{
    MyOutput.Value = newValue;
});

// Execute an action inside the actor context after a delay.
InvokeSynchronizedAfter(() =>
{
    MyOutput.Value = delayedValue;
}, TimeSpan.FromSeconds(5));
```

- **`InvokeSynchronized(Action)`** queues the action to run on the actor's thread.
- **`InvokeSynchronizedAfter(Action, TimeSpan)`** queues the action to run on the actor's thread after the specified delay.

These methods ensure that state mutations are always safe, even when triggered by external events.

## Dependency Injection

logic blocks are resolved through dependency injection. Register them in a class that implements `IConfigureServices`:

```csharp
public class DependencyInjection : IConfigureServices
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddTransient<MyBlock>();
    }
}
```

Key rules:

- logic blocks **must** be registered as `Transient`. The runtime creates a new instance for each block placed in a project.
- External services (HTTP clients, database connections, custom services) can be injected through the constructor alongside the required `ILogger`.

```csharp
public class MyBlock : LogicBlockBase
{
    private readonly IMyService _myService;

    public MyBlock(ILogger logger, IMyService myService) : base(logger)
    {
        _myService = myService;
    }

    protected override void Ready()
    {
        // Use _myService here.
    }
}
```

## Using the Dale CLI

The fastest way to create a new logic block is with the `dale` CLI:

```bash
dale add logicblock MyBlock
```

This scaffolds a new logic block class with the correct base class, attribute, and lifecycle methods already in place.

For CLI installation and full command reference, see [Installation](/sdk/installation).
