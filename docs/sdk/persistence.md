---
title: Persistence
description: How Dale automatically saves and restores logic block property values across restarts, including opt-in, opt-out, and testing.
---

# Persistence

Dale automatically saves and restores property values across restarts so that logic blocks can pick up where they left off. Values are saved periodically (every 60 seconds) and on graceful shutdown, and they are restored before `Ready()` is called.

## How Persistence Works

The persistence system runs in the background with no manual intervention required:

1. **Save** -- Every 60 seconds, and when the node shuts down gracefully, all persistent property values are written to local storage.
2. **Restore** -- When the node starts, saved values are read from storage and applied to each logic block's properties **before** `Ready()` is called.

This means that by the time your `Ready()` method executes, any previously saved state is already available on the block's properties.

## Automatic Persistence (Writable Properties)

All writable `[ServiceProperty]` values are persisted by default. You do not need any extra annotation:

```csharp
[ServiceProperty(Title = "Mode")]
public OperatingMode Mode { get; set; } = OperatingMode.Auto;
// ^^^ Automatically persisted because it has a public setter
```

If the property has a public or protected setter, Dale treats it as writable and includes it in the persistence cycle automatically.

## Opt-Out with `[Persistent(Exclude = true)]`

If a writable property should **not** be saved across restarts, exclude it explicitly:

```csharp
[ServiceProperty(Title = "Temporary Setting")]
[Persistent(Exclude = true)]
public string TempValue { get; set; } = "";
// ^^^ NOT persisted -- resets to "" on every restart
```

This is useful for transient state such as session tokens, cached computations, or values that should always start fresh.

## Opt-In for Read-Only Properties

Properties with a `private set` are **not** persisted by default because they are not writable from the Dashboard. If you need to persist a read-only property (for example, a running total that is only updated by the block itself), add the `[Persistent]` attribute:

```csharp
[Persistent]
[ServiceProperty(Title = "Total Energy", Unit = "kWh")]
public double TotalEnergy { get; private set; }
// ^^^ Explicitly persisted even though the setter is private
```

## What Gets Persisted

The persistence system stores values as JSON (camelCase, string-named enums) and restores them by coercing the stored payload back to the declared property type. Any service-property value type is persistable:

| Type | Storage format |
|---|---|
| `bool` | Boolean |
| `byte`, `short`, `ushort`, `int`, `uint`, `long` | Integer |
| `float`, `double` | Floating point |
| `string` | String |
| `DateTime`, `TimeSpan` | ISO 8601 string |
| Enums | String (enum member name) |
| `T?` (nullable) | Same as `T`, or `null` |
| `ImmutableArray<T>` | JSON array |
| `readonly record struct` | JSON object keyed by field name |
| Nested properties marked with `[Persistent]` | Recursive |

The container shapes (`Nullable<T>`, `ImmutableArray<T>`, `readonly record struct`) compose with one another, matching the rules described in [Properties & Measuring Points -- Complex Value Types](/sdk/properties#complex-value-types).

## Limitations

There are a few constraints to keep in mind:

- **Mutable collection types** such as `List<T>`, `Dictionary<TKey, TValue>`, and arbitrary custom classes are **not supported**. Use `ImmutableArray<T>` for sequences and `readonly record struct` for composite values.
- **Persistence is per-node**. Saved state lives on the local node and is not synced to VION Cloud or across nodes.
- **60-second save interval**. Because values are saved periodically, up to 60 seconds of recent changes may be lost if the node crashes (as opposed to shutting down gracefully).
- **Graceful shutdown** writes all pending state immediately, so no data is lost during planned restarts.

## Testing Persistence

The Dale TestKit lets you simulate restored persistence values so you can verify that your block behaves correctly after a restart.

Use `WithPersistentValue` on the test context builder to inject values that the block will see as if they were restored from storage:

```csharp
var testContext = block.CreateTestContext()
    .WithPersistentValue(b => b.Mode, OperatingMode.Manual)
    .WithPersistentValue(b => b.TotalEnergy, 1234.5)
    .Build();

// The block starts with Mode = Manual and TotalEnergy = 1234.5,
// exactly as if those values had been restored from a previous run.
```

This approach lets you test recovery scenarios without running a real persistence store. See the [Testing](/sdk/testing) page for more details on the TestKit.
