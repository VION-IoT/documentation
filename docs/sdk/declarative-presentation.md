---
title: Declarative Presentation
description: How the Dale SDK separates schema, presentation, and runtime metadata; how the cascade between interfaces and implementations works; and how to ship preset attributes.
---

# Declarative Presentation

The Dale SDK separates **what a value is** (its schema) from **how it is shown** (its presentation). Both travel together for every property, but they are declared by different attributes, cascade differently across interfaces, and are consumed by different layers. This page explains the model and the cascade rules.

For the per-field reference, see [Properties & Measuring Points](/sdk/properties).

## Three Sibling Documents

Every service property and measuring point emits three independent metadata documents:

| Document | Source | Consumed By |
|----------|--------|-------------|
| Schema | `[ServiceProperty]`, `[ServiceMeasuringPoint]`, `[StructField]` — `Title`, `Description`, `Unit`, `Minimum`, `Maximum`, `WriteOnly`, `Kind` | Codec, validators, cloud-api, the time-series store |
| Presentation | `[Presentation]` — `DisplayName`, `Group`, `Order`, `Importance`, `StatusIndicator`, `Decimals`, `UiHint`, `Format` | Dashboard renderer, DevHost, custom UIs |
| Runtime | The CLR type plus `[Persistent]`, `[Timer]` | Dale runtime, persistence, scheduler |

The three documents are siblings: changes to one do not implicitly change another. A new presentation hint never alters the schema; a schema rename never re-flows through presentation. This separation is what lets integrator vocabularies (kilowatts, percent, cumulative-energy) compose freely with platform building blocks (status indicators, ordering, group sections).

## Cascade Rules

Logic-block interfaces declare default schema and presentation values on their members. Implementing classes inherit those defaults and may override individual fields. The two sides cascade differently.

### Schema — Full Override

When an implementing class re-declares `[ServiceProperty]` or `[ServiceMeasuringPoint]`, it **replaces the interface's declaration entirely**. Any field not re-stated reverts to the attribute default.

```csharp
[ServiceInterface]
public interface IElectricityMeter
{
    [ServiceProperty(Title = "Voltage", Unit = "V", Minimum = 0, Maximum = 500)]
    double Voltage { get; }
}

public class CustomMeter : LogicBlockBase, IElectricityMeter
{
    // OVERRIDES — Minimum/Maximum from the interface are lost; reverts to ±∞.
    [ServiceProperty(Title = "Phase A Voltage", Unit = "V")]
    public double Voltage { get; private set; }
}
```

This matches JSON Schema semantics: a schema is a contract, and a partial schema redeclaration would create ambiguous downstream codec behavior.

### Presentation — Per-Field Merge

When an implementing class re-declares `[Presentation]`, it **merges field-by-field with the interface's declaration**. Fields not stated on the class fall back to the interface's value.

```csharp
[ServiceInterface]
public interface IElectricityMeter
{
    [ServiceProperty(Title = "Voltage", Unit = "V")]
    [Presentation(Group = PropertyGroup.Status, Importance = Importance.Primary, Decimals = 1)]
    double Voltage { get; }
}

public class CustomMeter : LogicBlockBase, IElectricityMeter
{
    // Inherits Group = Status, Importance = Primary. Overrides Decimals only.
    [Presentation(Decimals = 3)]
    public double Voltage { get; private set; }
}
```

The dominant pattern is "the interface declares the canonical UI; the class adjusts one thing" — full-override would force every implementer to re-state every field, which leads to drift.

## Preset Attributes

`[Presentation]`, `[ServiceProperty]`, and `[ServiceMeasuringPoint]` are all un-sealed `Attribute` subclasses. Integrators subclass them and pre-fill the constructor to stay DRY across a logic-block library:

```csharp
public class Kilowatts : ServicePropertyAttribute
{
    public Kilowatts() { Unit = "kW"; Minimum = 0; }
}

public class StateMetric : PresentationAttribute
{
    public StateMetric()
    {
        Group = PropertyGroup.Status;
        Importance = Importance.Primary;
        Decimals = 1;
    }
}
```

Apply them like the platform attributes; per-property arguments override preset defaults:

```csharp
[Kilowatts]
[StateMetric]
public double ActivePower { get; private set; }

[Kilowatts(Minimum = -50)] // Allow negative — battery discharging.
public double NetPower { get; private set; }
```

The preset is plain C# inheritance — `GetCustomAttribute<ServicePropertyAttribute>()` returns the subclass instance, refactor tools work as expected, and there is no magic.

## Property Ordering

Within a group, properties render in this order:

1. Properties with an explicit `[Presentation(Order = N)]` value sort ascending. Negative values are allowed and useful for promoting a derived property above its inherited siblings.
2. Properties without an explicit `Order` follow **base-to-derived hierarchy order** — interface defaults first, base classes next, the most-derived class last. Within each level, source declaration order is preserved.

See [Property Ordering](/sdk/properties#property-ordering) for a worked example.

## Block-Level Composition

A block does not declare a summary as a single attribute. The auto-generated dashboard tile composes from the block's properties:

- `[Presentation(Importance = Importance.Primary)]` surfaces on the tile prominently.
- `[Presentation(Importance = Importance.Secondary)]` surfaces on the tile alongside primaries.
- `[Presentation(StatusIndicator = true)]` on an enum property surfaces as a status badge.

This means a tile's summary cascades through interfaces automatically — an interface that declares its key property as Primary surfaces every implementer's value without each implementer re-declaring it.

Section order on the block view is set by `[LogicBlock(Groups = [...])]` — see [Section Ordering](/sdk/logic-blocks#section-ordering).
