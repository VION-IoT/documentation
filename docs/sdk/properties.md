---
title: Properties & Measuring Points
description: Define observable state, telemetry, and presentation hints on logic blocks using service properties, measuring points, and the [Presentation] attribute.
---

# Properties & Measuring Points

Properties and measuring points are how a logic block exposes its state. **Service properties** represent observable and optionally configurable values. **Measuring points** represent telemetry recorded over time. A single value can be both. A separate `[Presentation]` attribute controls how the value is grouped and rendered on the dashboard.

::: info
logic blocks do **not** read each other's service properties directly. Inter-block communication is done exclusively through [logic interfaces](/sdk/logic-interfaces) (commands, request/response, state updates).
:::

## The `[ServiceProperty]` Attribute

`[ServiceProperty]` makes a C# property visible to the VION platform. It defines the schema-side facts about the value — its display name, unit, allowed range, and whether it is a secret.

```csharp
[ServiceProperty(Title = "...", Description = "...", Unit = "...",
                 Minimum = ..., Maximum = ..., WriteOnly = ...)]
```

| Parameter | Description |
|-----------|-------------|
| `Title` | Display name. Defaults to the C# property name. |
| `Description` | Long-form text for tooltips, search, and accessibility. |
| `Unit` | Unit of measurement (e.g., `"°C"`, `"%"`, `"kWh"`). |
| `Minimum` | Minimum allowed value. Defaults to `double.NegativeInfinity`. |
| `Maximum` | Maximum allowed value. Defaults to `double.PositiveInfinity`. |
| `WriteOnly` | Marks a `string` / `string?` property as a secret. See [Secrets](#secrets). |
| `MinInterval`, `MinChange`, `Immediate` | Outbound re-publish throttle, deadband, and bypass. See [Emission Policy](#emission-policy). |

### Basic Example

A user-configurable setpoint:

```csharp
[ServiceProperty(Title = "Target Temperature", Unit = "°C", Minimum = 10, Maximum = 35)]
[Presentation(Group = PropertyGroup.Configuration)]
public double TargetTemp { get; set; } = 21.0;
```

### Read-Only Properties

Use `private set` to make a property read-only from the dashboard. The logic block can still update the value internally.

```csharp
[ServiceProperty(Title = "Power Consumption", Unit = "W")]
[Presentation(Group = PropertyGroup.Status)]
public double PowerConsumption { get; private set; }
```

### Computed Properties

Properties with only a getter work as well. The value is evaluated each time the runtime reads it.

```csharp
[ServiceProperty(Title = "Total Power", Unit = "W")]
[Presentation(Group = PropertyGroup.Status)]
public double TotalPower => HeaterPower + FanPower;
```

### Supported Types

| Type | Notes |
|------|-------|
| `bool` | |
| `byte`, `short`, `ushort`, `int`, `uint`, `long` | |
| `float`, `double` | |
| `string` | |
| `DateTime`, `TimeSpan` | Formatting via `Presentation.Format`. |
| `enum` | See [Enum Properties](#enum-properties). |
| `T?` (nullable) | |
| `ImmutableArray<T>` | See [Complex Value Types](#complex-value-types). |
| `readonly record struct` | See [Complex Value Types](#complex-value-types). |

Container types compose — `ImmutableArray<Coordinates?>` is a valid shape.

## The `[ServiceMeasuringPoint]` Attribute

`[ServiceMeasuringPoint]` marks a property as telemetry. Measuring points are recorded in the time-series database for charts, exports, and analytics.

```csharp
[ServiceMeasuringPoint(Title = "...", Description = "...", Unit = "...",
                       Minimum = ..., Maximum = ..., Kind = ...)]
```

| Parameter | Description |
|-----------|-------------|
| `Title` | Display name. Defaults to the C# property name. |
| `Description` | Long-form text for tooltips and metadata. |
| `Unit` | Unit of measurement. |
| `Minimum` | Lower bound. Defaults to `double.NegativeInfinity`. |
| `Maximum` | Upper bound. Defaults to `double.PositiveInfinity`. |
| `Kind` | Time-series shape: `Measurement` (default), `Total`, or `TotalIncreasing`. See [Measuring Point Kinds](#measuring-point-kinds). |
| `MinInterval`, `MinChange`, `Immediate` | Outbound re-publish throttle, deadband, and bypass. See [Emission Policy](#emission-policy). |

### Basic Example

```csharp
[ServiceMeasuringPoint(Title = "Room Humidity", Unit = "%", Minimum = 0, Maximum = 100)]
public double Humidity { get; private set; }
```

### Measuring Point Kinds

The `Kind` field tells the chart engine what shape the time-series has. Picking the wrong one shows misleading averages or counter resets as drops.

| Kind | Use For |
|------|---------|
| `Measurement` (default) | Instantaneous samples — temperature, voltage, RPM, state-of-charge percent. Can rise or fall freely. |
| `Total` | Cumulative values that can both increase and decrease — stored energy, tank level, buffer fill. |
| `TotalIncreasing` | Monotonically increasing counters with possible resets — imported energy, total runtime, packet count. |

```csharp
[ServiceMeasuringPoint(Title = "Power", Unit = "kW", Kind = MeasuringPointKind.Measurement)]
public double Power { get; private set; }

[ServiceMeasuringPoint(Title = "Stored Energy", Unit = "kWh", Kind = MeasuringPointKind.Total)]
public double StoredEnergy { get; private set; }

[Persistent]
[ServiceMeasuringPoint(Title = "Energy Imported", Unit = "kWh", Kind = MeasuringPointKind.TotalIncreasing)]
public double EnergyImported { get; private set; }
```

`MeasuringPointKind` lives in `Vion.Dale.Sdk.Core`, the same namespace as `[ServiceMeasuringPoint]` and the other authoring attributes — a single `using Vion.Dale.Sdk.Core;` covers it, with no separate wire- or schema-namespace import.

## Combining Service Properties and Measuring Points

A property can be both. This is common for live values shown on a dashboard tile **and** recorded over time.

```csharp
[ServiceProperty(Title = "Current Temperature", Unit = "°C")]
[ServiceMeasuringPoint]
[Presentation(Group = PropertyGroup.Status, Importance = Importance.Primary)]
public double CurrentTemp { get; private set; }
```

### Cross-Fill

When both attributes are present, the runtime cross-fills any shared field set on only one side. `Title`, `Description`, `Unit`, `Minimum`, and `Maximum` all cross-fill, so declare them once.

```csharp
[ServiceProperty(Title = "Power", Unit = "kW")]
[ServiceMeasuringPoint]
public double Power { get; private set; }

[ServiceProperty(Title = "Charge", Unit = "%")]
[ServiceMeasuringPoint(Kind = MeasuringPointKind.Total)]
public double StateOfCharge { get; private set; }
```

`WriteOnly` is property-only. `Kind` is measuring-point-only.

### When to Use Which

| Scenario | Use |
|----------|-----|
| User-configurable setting | `[ServiceProperty]` with public setter |
| Read-only runtime state | `[ServiceProperty]` with private setter |
| Telemetry recorded over time | `[ServiceMeasuringPoint]` |
| Dashboard value **and** time-series recording | Both attributes |
| Cumulative counter charted as a delta | `[ServiceMeasuringPoint(Kind = MeasuringPointKind.TotalIncreasing)]` |
| Secret string the operator sets but never reads back | `[ServiceProperty(WriteOnly = true)]` |

## Emission Policy

Three init-only knobs on `[ServiceProperty]` and `[ServiceMeasuringPoint]` govern how often a logic block re-publishes its own state, on top of an always-on dedup that drops unchanged values.

```csharp
using Microsoft.Extensions.Logging;
using Vion.Dale.Sdk.Core;

namespace Examples.Emission
{
    [LogicBlock(Name = "Emission Policy Demo", Icon = "device-line")]
    public class SensorBlock : LogicBlockBase
    {
        // Plain writable input — writes are always forwarded, no policy.
        [ServiceProperty(Title = "Setpoint", Unit = "kW", Minimum = 0, Maximum = 100)]
        [Presentation(Group = PropertyGroup.Configuration)]
        public double Setpoint { get; set; } = 25.0;

        // Deadband: re-emitted only when it moves by at least 0.5.
        [ServiceMeasuringPoint(Title = "Reading", Unit = "kW", MinInterval = "0", MinChange = "0.5")]
        [Presentation(Group = PropertyGroup.Metric)]
        public double Reading { get; private set; }

        // Throttle and deadband together.
        [ServiceMeasuringPoint(Title = "Temperature", Unit = "°C", MinInterval = "2s", MinChange = "0.5")]
        [Presentation(Group = PropertyGroup.Metric)]
        public double Temperature { get; private set; }

        // Dual-annotated: two independently throttled streams.
        [ServiceProperty(Title = "Power", Unit = "W", MinInterval = "2s")]
        [ServiceMeasuringPoint(Title = "Power", Unit = "W", MinInterval = "500ms", MinChange = "1")]
        [Presentation(Group = PropertyGroup.Metric)]
        public double Power { get; private set; }

        public SensorBlock(ILogger logger) : base(logger) { }

        [Timer(1)]
        public void OnTick()
        {
            Reading = Setpoint;
            Temperature = Setpoint + 2.0;
            Power = Setpoint * 40.0;
        }

        protected override void Ready() { }
    }
}
```

The knobs are identical on both attributes:

| Knob | Description |
|------|-------------|
| `MinInterval` | Minimum spacing between two emitted values, as a duration string. Defaults to `"250ms"`. `"0"` disables interval throttling. |
| `MinChange` | Deadband: the minimum change a new value must clear before it re-emits. Defaults to none. |
| `Immediate` | When `true`, emits every change immediately, bypassing the throttle and deadband. Defaults to `false`. |

::: warning
The 250 ms `MinInterval` throttle is **on by default**. A read-only value emits at most ~4 Hz unless you set `MinInterval = "0"` or `Immediate = true`. Inbound writes are unaffected.
:::

Emission is **outbound-only**: writes into a writable property are always forwarded immediately, so put these knobs on read-only computed or sensed values, not operator inputs.

- `MinInterval` is leading-edge: the first change after idle emits immediately; later changes within the interval coalesce latest-wins and flush at the boundary. Durations take an optional `us` / `ms` / `s` / `m` / `h` suffix; a bare number is milliseconds.
- `MinChange` takes an invariant-culture number for `double` / `float` / `decimal` / `int` / `long` (e.g. `"0.5"`) or a duration for `TimeSpan` (e.g. `"1s"`); `bool` is a compile error.
- `Immediate = true` emits every change, but the value-equality floor still drops no-op assignments. Use it for safety and error flags.

A member carrying **both** attributes throttles independently per stream — neither gate suppresses the other, and the knobs do **not** cross-fill.

To assert these gates deterministically under the TestKit, see [Testing emission policy](/sdk/testing#testing-emission-policy).

## Complex Value Types

The Dale SDK supports three composable container shapes: nullables, immutable arrays, and `readonly record struct`. These can be combined — `ImmutableArray<Coordinates?>` is a valid measuring-point type.

### Nullable Values

Append `?` to any supported primitive, enum, or struct type. `null` means "unknown" and is distinct from a zero or default value.

```csharp
[ServiceProperty(Title = "Optional Setpoint", Unit = "kW")]
public double? OptionalTarget { get; set; }
```

### Arrays (`ImmutableArray<T>`)

Use `ImmutableArray<T>` to expose a sequence of values. Immutability is required so snapshots can be safely shared across the runtime boundary.

```csharp
using System.Collections.Immutable;

[ServiceMeasuringPoint(Title = "Histogram Buckets", Unit = "A")]
public ImmutableArray<double> HistogramBuckets { get; private set; }
    = ImmutableArray<double>.Empty;
```

Initialize the property with `ImmutableArray<T>.Empty` — the default `default(ImmutableArray<T>)` is not iterable. Assign a new array to replace contents:

```csharp
ScheduleHours = ImmutableArray.Create(6, 12, 18);
```

### Custom Structs

Bundle related scalars into a `readonly record struct`. Each field can carry its own unit and range via `[StructField]`.

```csharp
public readonly record struct Coordinates(
    [StructField(Unit = "deg", Minimum = -90, Maximum = 90)]
    double Lat,
    [StructField(Unit = "deg", Minimum = -180, Maximum = 180)]
    double Lon);
```

`[StructField]` accepts `Title`, `Description`, `Unit`, `Minimum`, `Maximum`, and `WriteOnly` — the last marks a member as a secret (see [Secrets](#secrets)).

Structs used as service-element values must be **flat**:

- Declare as `readonly record struct`. Mutable or non-record structs are rejected.
- Fields must be primitives, enums, `string`, `DateTime`, `TimeSpan`, or nullable of those.
- No nested structs and no arrays inside a struct. Use `ImmutableArray<MyStruct>` at the property level.

## The `[Presentation]` Attribute

`[Presentation]` carries the UI-side hints that the schema-side attributes do not. `[ServiceProperty]` says what the value **is**; `[Presentation]` says how it is **shown**.

```csharp
[Presentation(DisplayName = "...", Group = ..., Order = ..., Importance = ...,
              StatusIndicator = ..., Decimals = ..., UiHint = ..., Format = ...)]
```

| Field | Type | Purpose |
|-------|------|---------|
| `DisplayName` | `string?` | Override the label. Falls back to `Title` or the C# property name. Useful for enum-/struct-typed properties where the schema title names the type itself. |
| `Group` | `string?` | Section the property is rendered in. Use a `PropertyGroup` constant or your own. See [Groups](#groups). |
| `Order` | `int` | Sort hint within a group. Lower values render first; negatives are allowed. Unset falls back to base-to-derived hierarchy order. |
| `Importance` | `Importance` | Tile-vs-detail visibility: `Primary`, `Secondary`, `Normal` (default), `Hidden`. |
| `StatusIndicator` | `bool` | Marks an enum-typed property as an operational status. |
| `Decimals` | `int` | Display precision for numeric values. Unset uses sensible per-type defaults. |
| `UiHint` | `string?` | Routing key for non-default renderers. Use a `UiHints` constant or your own. |
| `Format` | `string?` | Format-token string for date/duration rendering. Use a `Formats` constant or a moment.js / day.js token. |
| `VisibleWhen` | `string?` | Predicate that shows or hides the member in the UI based on sibling property values. See [Conditional Visibility](#conditional-visibility). |

The attribute is **not sealed** — see [Preset Attributes](#preset-attributes).

### Groups

The dashboard renders all properties with the same `Group` key in one section. The platform ships well-known constants in `PropertyGroup`; integrators may use their own string keys.

| Constant | Use For |
|----------|---------|
| `PropertyGroup.Identity` | Manufacturer, model, serial number, firmware version. |
| `PropertyGroup.Status` | Live read-only operational state. |
| `PropertyGroup.Configuration` | Anything the operator can write — settings, runtime controls, triggers. |
| `PropertyGroup.Metric` | Counters, totals, accumulated values. |
| `PropertyGroup.Diagnostics` | Troubleshooting and health — last error, response time, connectivity. |
| `PropertyGroup.Alarm` | Active alarm state, fault codes. |
| `PropertyGroup.None` | Ungrouped (fallback bucket). |

```csharp
[ServiceProperty(Title = "Target Temperature", Unit = "°C")]
[Presentation(Group = PropertyGroup.Configuration)]
public double TargetTemp { get; set; } = 21.0;
```

Use one of the `PropertyGroup` constants. Custom string keys are accepted, but unknown keys carry no UI guarantees — they're rendered verbatim today, and that may change. Block-level section ordering is set on `[LogicBlock(Groups = [...])]` — see [Section Ordering](/sdk/logic-blocks#section-ordering).

### UI Hints

`UiHint` routes a property to a non-default renderer. The platform ships well-known constants in `UiHints`; integrators may supply their own keys.

| Constant | Purpose |
|----------|---------|
| `UiHints.StatusIndicator` | Auto-emitted when `StatusIndicator = true`. Do not set directly. |
| `UiHints.Trigger` | Writable `bool` rendered as a button. See [Action Triggers](#action-triggers). |
| `UiHints.Sparkline` | Inline sparkline for numeric arrays. |
| `UiHints.Multiline` | Writable `string` as a multi-line textarea. |
| `UiHints.Json` | Writable `string` as a JSON code editor. |
| `UiHints.Slider` | Bounded numeric as a slider control. Requires both `Minimum` and `Maximum`. |

```csharp
[ServiceProperty(Title = "Operator Notes")]
[Presentation(UiHint = UiHints.Multiline)]
public string Notes { get; set; } = "";
```

Unrecognized hints fall back to the default renderer.

### Format

`Format` controls how date and duration values are rendered. The dashboard interprets the value as a moment.js / day.js compatible format token. Two reserved sentinels short-circuit the token interpreter:

| Constant | Token | Renders As |
|----------|-------|------------|
| `Formats.Relative` | `"relative"` | Auto-updating "3 minutes ago" (locale-aware). Requires `DateTime`. |
| `Formats.Humanize` | `"humanize"` | Humanized duration: "3 hours". Requires `TimeSpan`. |
| `Formats.LocaleFull` | `"LLLL"` | "Wednesday, May 13, 2026 2:32 PM". |
| `Formats.LocaleLong` | `"LLL"` | "May 13, 2026 2:32 PM". |
| `Formats.Iso` | `"YYYY-MM-DD HH:mm:ss"` | Explicit ISO-ish date-time. |
| `Formats.IsoMillis` | `"YYYY-MM-DD HH:mm:ss.SSS"` | With millisecond precision. |
| `Formats.Clock` | `"HH:mm:ss"` | Clock-style duration. |
| `Formats.ClockMillis` | `"HH:mm:ss.SSS"` | Clock-style duration with milliseconds. |

`Formats` carries additional locale-aware shortcuts (`LocaleShort`, `LocaleDate`, `LocaleTime`). Any moment-compatible token string works directly.

```csharp
[ServiceMeasuringPoint(Title = "Last Sample")]
[Presentation(Group = PropertyGroup.Diagnostics, Format = Formats.Relative)]
public DateTime LastSampleAt { get; private set; } = DateTime.UtcNow;

[ServiceMeasuringPoint(Title = "Uptime")]
[Presentation(Group = PropertyGroup.Diagnostics, Format = Formats.Humanize)]
public TimeSpan Uptime { get; private set; }
```

`Format` is orthogonal to `UiHint` and `Decimals` — the three control different aspects of rendering.

## Conditional Visibility

`VisibleWhen` shows or hides a property or measuring point based on the live values of other properties in the same logic block. It is a **UI-only** hint: the member keeps existing everywhere else — the Dale runtime still reads and writes it, it still emits telemetry, still persists, and still travels on the wire. `VisibleWhen` only decides whether the dashboard and DevHost render its row.

A boolean toggle that reveals a dependent field is the canonical case. The CT-ratio input only applies when the meter is **not** in direct-measurement mode:

```csharp
[ServiceProperty(Title = "Direct Measurement (no CT)")]
[Presentation(Group = PropertyGroup.Configuration)]
public bool DirectMeasurement { get; set; }

[ServiceProperty(Title = "Primary Current", Unit = "A", Minimum = 1, Maximum = 5000)]
[Presentation(Group = PropertyGroup.Configuration, VisibleWhen = "DirectMeasurement == false")]
public double PrimaryCurrent { get; set; }
```

Toggling `DirectMeasurement` in the dashboard form hides or shows `PrimaryCurrent` immediately — evaluation is reactive against the value the form currently displays.

`Importance.Hidden` still wins: it is a static, unconditional hide, and `VisibleWhen` is only evaluated for members that would otherwise render. Use `Importance.Hidden` to hide a member always, `VisibleWhen` to hide it conditionally.

`VisibleWhen` cascades per field like every other presentation hint — an interface can declare it and an implementing class can override it (see [Declarative Presentation](/sdk/declarative-presentation#cascade-rules)).

### Predicate Syntax

A predicate is a small boolean expression — the reference on the left, a literal on the right.

| Form | Example |
|------|---------|
| Comparison | `Mode == 'Eco'`, `Threshold >= 10`, `Mode != 'Off'` |
| Membership | `Mode in ['Eco', 'Auto']` |
| Boolean reference | `AdvancedMode` (the property must be `bool`) |
| Combination | `DirectMeasurement == false && Mode == 'Manual'` |

- Comparisons use `==`, `!=`, `<`, `<=`, `>`, `>=`. The relational operators (`<`, `<=`, `>`, `>=`) apply to integer properties only.
- Enum values are quoted strings matching the member name — `Mode == 'Eco'`. Single quotes are the authoring style.
- Combine terms with `&&`, `||`, and `!`, and group with parentheses: `!(Mode == 'Off') && AdvancedMode`.

Most gates are a single comparison — you rarely need more than one operator.

### What a Predicate Can Reference

A reference like `DirectMeasurement` names another property in the same logic block. Referenced properties must be one of these types:

- `bool`
- `enum`
- integer (`int`, `long`, `short`, `byte`, and their unsigned kin)
- `string`

`double` and `float` are excluded — an analog value would make visibility flap. `WriteOnly` secrets and measuring-point-only members cannot be referenced either. The **annotated** member is unrestricted: the `PrimaryCurrent` double above carries `VisibleWhen` fine; only the properties a predicate *references* are limited.

### Referencing a Sibling Service

Most logic blocks expose a single service, where a plain reference reaches every property. A block that exposes several services — a root service plus component services — can reach across them with a **qualified** reference, written `Service.Property`:

```csharp
[ServiceProperty(Title = "CP2 Current Limit", Unit = "A")]
[Presentation(Group = PropertyGroup.Configuration,
              VisibleWhen = "ChargingPoint2.EnableCharging == true")]
public int ChargingPoint2Limit { get; set; }
```

Services are addressed by their identifier:

- A **component service** is identified by the name of the property that holds it — `ChargingPoint2` above.
- The **root service** is identified by the logic block's class name — for a block class `Charger`, a root-level property is `Charger.MaintenanceMode`.

References resolve within a single logic-block instance; a predicate cannot reach across blocks or gateways.

### Validation

`dale build` validates every predicate, so a broken or misspelled one is caught at build time rather than surfacing in the dashboard. Preview the result with `dale dev` — the DevHost evaluates `VisibleWhen` the same way the dashboard does.

## Property Ordering

Within a group, properties render in this order:

1. Properties with an explicit `[Presentation(Order = N)]` value sort ascending. Negative values are allowed.
2. Properties without an explicit `Order` follow **base-to-derived hierarchy order**: interface defaults first, base classes next, the most-derived class last. Within each level, source declaration order is preserved.

```csharp
public interface IMeter
{
    // Renders first (inherited, no Order).
    [ServiceProperty(Title = "Manufacturer")]
    [Presentation(Group = PropertyGroup.Identity)]
    string Manufacturer { get; }
}

public class ElectricityMeter : LogicBlockBase, IMeter
{
    public string Manufacturer { get; private set; } = "ACME";

    // Renders BEFORE Manufacturer — explicit negative Order wins.
    [ServiceProperty(Title = "Model")]
    [Presentation(Group = PropertyGroup.Identity, Order = -10)]
    public string Model { get; private set; } = "EM-100";

    // Renders AFTER Manufacturer — no Order, derived in source order.
    [ServiceProperty(Title = "Firmware Version")]
    [Presentation(Group = PropertyGroup.Identity)]
    public string FirmwareVersion { get; private set; } = "1.2.0";
}
```

## Status Indicators

A status indicator is an enum-typed property that drives a status badge on the dashboard tile. Set `StatusIndicator = true` on `[Presentation]` and decorate the enum members with `[EnumLabel]` (display label) and `[Severity]` (severity level).

```csharp
public enum DeviceStatus
{
    [EnumLabel("Connected")]
    [Severity(StatusSeverity.Success)]
    Connected,

    [EnumLabel("Connecting")]
    [Severity(StatusSeverity.Warning)]
    Connecting,

    [EnumLabel("Disconnected")]
    [Severity(StatusSeverity.Error)]
    Disconnected,
}

[ServiceProperty(Title = "Connection Status")]
[Presentation(Group = PropertyGroup.Alarm, StatusIndicator = true, Importance = Importance.Primary)]
public DeviceStatus Status { get; private set; } = DeviceStatus.Disconnected;
```

`StatusSeverity` values: `Success`, `Info`, `Warning`, `Error`, `Neutral`.

A block may declare more than one status indicator — distinct status dimensions like operating mode, connection state, and activity status all surface on the tile.

## Action Triggers

A writable `bool` with `UiHint = UiHints.Trigger` renders as a button. Click commits `true`; the property's getter must always return `false` so the button visually returns to its resting state.

```csharp
[ServiceProperty(Title = "Reset Statistics")]
[Presentation(Group = PropertyGroup.Configuration, UiHint = UiHints.Trigger)]
[Persistent(Exclude = true)]
public bool ResetStats
{
    get => false;
    set
    {
        if (value)
        {
            TimesGreeted = 0;
        }
    }
}
```

The getter-always-false pattern is a transitional bridge until a first-class `[ServiceAction]` primitive ships. Combine with `[Persistent(Exclude = true)]` so the trigger does not re-fire on every restart.

## Secrets

A `string` or `string?` property with `WriteOnly = true` is a secret. On the read path the Dale runtime replaces the real value with a redaction sentinel (`"***"`) before anything leaves the gateway, so operators can set, clear, and overwrite the value — but never read it back.

```csharp
[ServiceProperty(Title = "API Key", WriteOnly = true)]
[Presentation(Group = PropertyGroup.Configuration)]
public string? ApiKey { get; set; }
```

The setter inside the logic block receives the real value — cache it, hand it to your client library, or persist it normally. Three states are distinguishable through the dashboard: never set, cleared, and set-and-hidden.

On a set, an incoming `"***"` sentinel is resolved back to the currently stored value — a re-submitted secret reads as *unchanged* rather than overwriting the real value with the literal `"***"`. A real string overwrites it; `null` clears it. So an operator can edit other fields of a configuration and leave a secret field still showing `"***"` untouched, without wiping it.

`WriteOnly` is restricted to `string` / `string?` in v1 — the redaction sentinel is itself a string literal. Persistence works as usual; opt out with `[Persistent(Exclude = true)]` if a secret should be re-entered on every restart.

::: warning
At-rest encryption is out of scope. The gateway's persistence store keeps the real value on disk. `WriteOnly` protects the wire path, not the local disk.
:::

### Secrets Inside a Struct

`WriteOnly` also works per member on a `[StructField]`, so a secret can sit beside visible fields in a `readonly record struct` — a token next to its endpoint, for example:

```csharp
public readonly record struct ConnectionCredentials(
    [StructField(Title = "Endpoint")]
    string Endpoint,
    [StructField(Title = "Access Token", WriteOnly = true)]
    string? AccessToken);
```

Only the marked member is redacted; the others stay visible. Declare the secret member as `string?` so it can be cleared (`null` = cleared), and keep it `string` / `string?` — the same v1 restriction as the top-level attribute. The re-submit rule applies per member: an echoed `"***"` leaves that member's stored secret unchanged, so editing the visible fields never wipes the secret.

## Enum Properties

Enums are a natural fit for properties with a fixed set of values. The dashboard renders them as dropdowns by default, or as status badges when marked as indicators.

```csharp
public enum OperatingMode
{
    [EnumLabel("Automatic")]
    Auto,

    [EnumLabel("Manual Override")]
    Manual,

    [EnumLabel("Energy Saving")]
    Eco,

    [EnumLabel("Off")]
    Off,
}

[ServiceProperty(Title = "Operating Mode")]
[Presentation(Group = PropertyGroup.Configuration, Importance = Importance.Secondary)]
public OperatingMode Mode { get; set; } = OperatingMode.Auto;
```

`[EnumLabel]` provides a human-readable display name for each member. Without it, the C# identifier is used.

## Preset Attributes

`[Presentation]`, `[ServiceProperty]`, and `[ServiceMeasuringPoint]` are all un-sealed. Subclass any of them to pre-fill the constructor and stay DRY across a logic block library:

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

See [Declarative Presentation](/sdk/declarative-presentation) for the cascade rules and the cross-cutting model.

## Persistence

Writable service properties (public setter) are **automatically persisted** across restarts. The gateway restores the last-known value before the logic block enters the `Ready` state.

Opt a writable property out of persistence with `[Persistent(Exclude = true)]`:

```csharp
[ServiceProperty(Title = "Reset Statistics")]
[Presentation(Group = PropertyGroup.Configuration, UiHint = UiHints.Trigger)]
[Persistent(Exclude = true)]
public bool ResetStats { get => false; set { if (value) DoReset(); } }
```

Read-only properties (private setter) are **not** persisted by default. Add `[Persistent]` to keep cumulative counters across restarts:

```csharp
[Persistent]
[ServiceProperty(Title = "Total Energy", Unit = "kWh")]
[ServiceMeasuringPoint(Kind = MeasuringPointKind.TotalIncreasing)]
[Presentation(Group = PropertyGroup.Metric)]
public double TotalEnergy { get; private set; }
```

For more detail, see [Persistence](/sdk/persistence).

## Service Interfaces

Service interfaces standardize the data surface of your logic blocks. Define a C# interface decorated with `[ServiceInterface]` and apply the attributes to its members. Logic blocks that implement the interface inherit the metadata.

```csharp
[ServiceInterface]
public interface IClimateService
{
    [ServiceProperty(Title = "Temperature", Unit = "°C")]
    [ServiceMeasuringPoint]
    [Presentation(Group = PropertyGroup.Status, Importance = Importance.Primary)]
    double Temperature { get; }

    [ServiceProperty(Title = "Target Temperature", Unit = "°C", Minimum = 10, Maximum = 35)]
    [Presentation(Group = PropertyGroup.Configuration)]
    double TargetTemperature { get; set; }
}
```

A logic block implements the interface directly:

```csharp
[LogicBlock(Name = "Room Climate Controller")]
public class RoomClimateBlock : LogicBlockBase, IClimateService
{
    public RoomClimateBlock(ILogger logger) : base(logger) { }

    public double Temperature { get; private set; }
    public double TargetTemperature { get; set; } = 21.0;

    protected override void Ready() { }
}
```

`[Presentation]` cascades per-field — the interface declares defaults; the class can override any single field without re-declaring the rest. Schema attributes cascade as a whole — overriding `[ServiceProperty]` on the class replaces the interface's declaration entirely. See [Declarative Presentation](/sdk/declarative-presentation#cascade-rules).

### Service Relations

Use `[ServiceRelation]` to declare directional relationships between service interfaces.

```csharp
[ServiceInterface]
[ServiceRelation("PingPong", ServiceRelationDirection.Outwards, typeof(IPongService))]
public interface IPingService
{
    [ServiceProperty]
    [ServiceMeasuringPoint]
    int PingsPerSecond { get; }
}
```

The matching interface must declare the same `relationType` with the opposite direction (`Inwards`).

## Using the Dale CLI

Add a service property:

```bash
dale add serviceproperty TargetTemp --type double --to ThermostatBlock
```

| Flag | Description |
|------|-------------|
| `--type` / `-t` (required) | C# type (`double`, `string`, `bool`, etc.) |
| `--to` | Target logic block class (auto-detected if only one exists) |
| `--setter` | `public` or `private` (default: `private`) |
| `--default-name` | Sets the `Title` field on the emitted attribute |
| `--persistent` | Adds `[Persistent]` |
| `--group` | `[Presentation]` group — a `PropertyGroup` name (`Status`, `Configuration`, `Metric`, `Diagnostics`, `Identity`, `Alarm`) or an arbitrary raw key |
| `--importance` | `[Presentation]` importance — `Primary`, `Secondary`, `Normal`, or `Hidden` |
| `--decimals` | `[Presentation]` numeric display precision |
| `--format` | `[Presentation]` date/duration/numeric format token |

The four presentation flags emit a `[Presentation(...)]` attribute alongside `[ServiceProperty]`; supplying none omits the attribute entirely. A known `--group` name renders as the `PropertyGroup` constant, any other value as a raw string key:

```bash
dale add serviceproperty TargetTemp --type double --to ThermostatBlock --group Configuration --importance Secondary --decimals 1
```

This generates:

```csharp
[ServiceProperty(Title = "TargetTemp")]
[Presentation(Group = PropertyGroup.Configuration, Importance = Importance.Secondary, Decimals = 1)]
public double TargetTemp { get; private set; }
```

Add a measuring point:

```bash
dale add measuringpoint CurrentTemp --type double --to ThermostatBlock --kind Total
```

Measuring points take the same flags except `--setter` (always `private set`), plus `--kind` (`Measurement`, `Total`, or `TotalIncreasing`), emitted inside the attribute as `[ServiceMeasuringPoint(Kind = MeasuringPointKind.…)]`. The command adds the `using Vion.Dale.Sdk.Core;` for `MeasuringPointKind` automatically.

For a value that is both a property and a measuring point, run the CLI for one and add the other attribute by hand — the CLI refuses to add to an existing property.

## Complete Example

A thermostat block exercising properties, measuring points, presentation, status indicators, and persistence:

```csharp
[LogicBlock(Name = "Smart Thermostat", Icon = "temp-cold-line",
            Groups = new[]
                     {
                         PropertyGroup.Alarm,
                         PropertyGroup.Status,
                         PropertyGroup.Metric,
                         PropertyGroup.Configuration,
                         PropertyGroup.Identity,
                     })]
public class SmartThermostatBlock : LogicBlockBase
{
    public enum ThermostatStatus
    {
        [EnumLabel("Heating")]
        [Severity(StatusSeverity.Warning)]
        Heating,

        [EnumLabel("Cooling")]
        [Severity(StatusSeverity.Info)]
        Cooling,

        [EnumLabel("Idle")]
        [Severity(StatusSeverity.Success)]
        Idle,

        [EnumLabel("Fault")]
        [Severity(StatusSeverity.Error)]
        Fault,
    }

    [ServiceProperty(Title = "State")]
    [Presentation(Group = PropertyGroup.Alarm, StatusIndicator = true,
                  Importance = Importance.Primary)]
    public ThermostatStatus State { get; private set; } = ThermostatStatus.Idle;

    [ServiceProperty(Title = "Current Temperature", Unit = "°C")]
    [ServiceMeasuringPoint]
    [Presentation(Group = PropertyGroup.Status, Importance = Importance.Primary)]
    public double CurrentTemp { get; private set; }

    [ServiceProperty(Title = "Target Temperature", Unit = "°C", Minimum = 10, Maximum = 35)]
    [Presentation(Group = PropertyGroup.Configuration, UiHint = UiHints.Slider)]
    public double TargetTemp { get; set; } = 21.0;

    [Persistent]
    [ServiceProperty(Title = "Total Runtime", Unit = "h")]
    [ServiceMeasuringPoint(Kind = MeasuringPointKind.TotalIncreasing)]
    [Presentation(Group = PropertyGroup.Metric)]
    public double TotalRuntime { get; private set; }

    [ServiceMeasuringPoint(Title = "Last Service")]
    [Presentation(Group = PropertyGroup.Diagnostics, Format = Formats.Relative)]
    public DateTime LastServiceAt { get; private set; } = DateTime.UtcNow.AddDays(-7);

    [ServiceProperty(Title = "Reset Statistics")]
    [Presentation(Group = PropertyGroup.Configuration, UiHint = UiHints.Trigger)]
    [Persistent(Exclude = true)]
    public bool ResetStats
    {
        get => false;
        set
        {
            if (value)
            {
                TotalRuntime = 0;
            }
        }
    }
}
```

Run `dale dev` to preview the block in the local DevHost — it renders presentations the same way the production dashboard does, giving fast feedback during authoring.
