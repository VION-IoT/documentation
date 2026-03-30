---
title: "logic blocks"
description: "logic blocks are the fundamental building unit of the Dale SDK. Each block is an independent actor that manages its own state and processes messages asynchronously."
---

# Logic Blocks

logic blocks are the core building blocks of every Dale application. Each block represents a self-contained unit of logic that can receive inputs, maintain state, and produce outputs.

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
[LogicBlockInfo("My Block", "settings-line")]
public class MyBlock : LogicBlockBase
{
    public MyBlock(ILogger logger) : base(logger) { }

    protected override void Ready()
    {
        // Called when the block is configured and ready to run
    }
}
```

The `LogicBlockInfo` attribute provides metadata used by the Dashboard, and the `Ready()` method is where you set up your block's runtime behavior.

## Lifecycle

logic blocks follow a well-defined lifecycle with three key methods you can override:

| Method | When it runs | Typical use |
|---|---|---|
| `Starting()` | After the block is initialized | One-time setup, opening connections |
| `Ready()` | After configuration is applied and the block is ready to run | Attach event handlers, start processing |
| `Stopping()` | Before the block is removed | Clean up resources, close connections |

`Ready()` is abstract and must be overridden in every logic block. `Starting()` and `Stopping()` are virtual and can be overridden when needed.

```csharp
[LogicBlockInfo("Sensor Reader", "sensor-line")]
public class SensorReader : LogicBlockBase
{
    public SensorReader(ILogger logger) : base(logger) { }

    protected override void Starting()
    {
        Logger.LogInformation("SensorReader is starting up");
    }

    protected override void Ready()
    {
        // Set up event handlers and begin processing
    }

    protected override void Stopping()
    {
        Logger.LogInformation("SensorReader is shutting down");
    }
}
```

## LogicBlockInfo Attribute

The `[LogicBlockInfo]` attribute provides display metadata for the Dashboard. It is **optional** — if omitted, the class name is used as the display name and a generic icon is shown.

```csharp
[LogicBlockInfo("My Block", "settings-line")]
```

| Parameter | Description |
|---|---|
| `defaultName` | The display name shown in the Dashboard. Defaults to the class name if omitted. |
| `icon` | A [Remixicon](https://remixicon.com/) name without the `ri-` prefix (e.g., `"battery-2-line"`, `"charging-pile-line"`). A generic icon is used if omitted. |

## Thread Safety

Because logic blocks are actors, message processing is inherently single-threaded within each block. All property changes and message handling happen inside the actor context automatically.

However, if you need to execute code from an external callback or event (such as an OS event or a timer) back into the actor context, use the synchronization helpers:

```csharp
// Execute an action inside the actor context
InvokeSynchronized(() =>
{
    // Safe to modify state here
    MyOutput.Value = newValue;
});

// Execute an action inside the actor context after a delay
InvokeSynchronizedAfter(() =>
{
    // This runs on the actor thread after the specified delay
    MyOutput.Value = delayedValue;
}, TimeSpan.FromSeconds(5));
```

- **`InvokeSynchronized(Action)`** queues the action to run on the actor's thread.
- **`InvokeSynchronizedAfter(Action, TimeSpan)`** queues the action to run on the actor's thread after the specified delay.

These methods ensure that state mutations are always safe, even when triggered by external events.

## Dependency Injection

logic blocks are resolved through dependency injection. You register them in a class that implements `IConfigureServices`:

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
        // Use _myService here
    }
}
```

## Using the Dale CLI

The fastest way to create a new logic block is with the `dale` CLI:

```bash
dale add logicblock MyBlock
```

This scaffolds a new logic block class with the correct base class, attribute, and lifecycle methods already in place.

For CLI installation and full command reference, see the [Installation](/sdk/installation) page.
