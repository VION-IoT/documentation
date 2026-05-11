---
title: Properties & Measuring Points
description: Defining observable state and telemetry on logic blocks using service properties and measuring points, including categories, display hints, status indicators, and persistence behavior.
---

# Properties & Measuring Points

Properties and measuring points are how a logic block exposes its state to the outside world. **Properties** represent observable and optionally configurable values. **Measuring points** represent read-only telemetry data that is recorded over time. A single value can be both.

## The `[ServiceProperty]` Attribute

The `[ServiceProperty]` attribute makes a C# property visible to the VION platform. It appears on dashboards and can be read and written (if writable) by the runtime — meaning through the API and the Dashboard UI.

::: info
Logic blocks do **not** read each other's service properties directly. Inter-block communication is done exclusively through [logic interfaces](/sdk/logic-interfaces) (commands, request/response, state updates).
:::

### Annotation Parameters

The attribute exposes four optional init-only properties. Set them with named-argument syntax:

```csharp
[ServiceProperty(Title = "...", Unit = "...", Minimum = ..., Maximum = ...)]
```

| Parameter | Description |
|-----------|-------------|
| `Title` | Display name shown in the Dashboard. Defaults to the C# property name. |
| `Unit` | Unit of measurement (e.g., `"°C"`, `"%"`, `"kWh"`, `"lux"`). |
| `Minimum` | Minimum allowed value. The Dashboard enforces this in input controls. Defaults to `double.NegativeInfinity`. |
| `Maximum` | Maximum allowed value. The Dashboard enforces this in input controls. Defaults to `double.PositiveInfinity`. |

::: info
The legacy names `DefaultName`, `MinValue`, and `MaxValue` are marked `[Obsolete]` and will be removed in the next major version. Migrate existing logic blocks to `Title`, `Minimum`, and `Maximum`.
:::

### Basic Example

```csharp
[ServiceProperty(Title = "Target Temperature", Unit = "°C", Minimum = 10, Maximum = 35)]
[Category(PropertyCategory.Configuration)]
public double TargetTemp { get; set; } = 21.0;
```

This creates a property named "Target Temperature" that users can adjust between 10 and 35 degrees. Because the setter is public, the Dashboard renders an input control. The default value is 21.0.

### Read-Only Properties

Use a `private set` to make a property read-only from the Dashboard. The logic block can still update the value internally.

```csharp
[ServiceProperty(Title = "Power Consumption", Unit = "W")]
public double PowerConsumption { get; private set; }
```

### Computed Properties

Properties with only a getter (no setter at all) work as well. These are useful for values derived from other state:

```csharp
[ServiceProperty(Title = "Total Power", Unit = "W")]
public double TotalPower => HeaterPower + FanPower;

[ServiceProperty(Title = "Is Running")]
public bool IsRunning => Status == DeviceStatus.Online;
```

Computed properties are always read-only. Their value is evaluated whenever the runtime reads the property, so they automatically reflect the current state.

### Supported Types

Service properties support the following C# types:

| Type | Dashboard Control |
|------|------------------|
| `bool` | Toggle switch |
| `byte`, `short`, `ushort`, `int`, `uint`, `long` | Integer input |
| `float`, `double` | Number input (with decimal) |
| `string` | Text input |
| `DateTime`, `TimeSpan` | Date/time picker |
| `enum` | Dropdown (see [Enum Properties](#enum-properties)) |
| `T?` (nullable) | Same control as `T`, with an explicit empty state |
| `ImmutableArray<T>` | List rendering (see [Complex Value Types](#complex-value-types)) |
| `readonly record struct` | Composite editor with one control per field |

Container types (`Nullable<T>`, `ImmutableArray<T>`, and `readonly record struct`) compose with one another — for example, `ImmutableArray<Coordinates?>` is a valid shape. See [Complex Value Types](#complex-value-types) for the full matrix and constraints.

## The `[ServiceMeasuringPoint]` Attribute

The `[ServiceMeasuringPoint]` attribute marks a property as a telemetry value. Measuring points are recorded in the time-series database and can be visualized as charts, exported, and used in analytics.

### Annotation Parameters

`[ServiceMeasuringPoint]` exposes the same init-only properties as `[ServiceProperty]`:

```csharp
[ServiceMeasuringPoint(Title = "...", Unit = "...", Minimum = ..., Maximum = ...)]
```

| Parameter | Description |
|-----------|-------------|
| `Title` | Display name shown in charts and exports. Defaults to the C# property name. |
| `Unit` | Unit of measurement for axis labels and tooltips. |
| `Minimum` | Lower bound used by charting and anomaly detection. Defaults to `double.NegativeInfinity`. |
| `Maximum` | Upper bound used by charting and anomaly detection. Defaults to `double.PositiveInfinity`. |

The legacy `DefaultName` property is `[Obsolete]` — use `Title` in new code.

### Example

```csharp
[ServiceMeasuringPoint(Title = "Room Humidity", Unit = "%", Minimum = 0, Maximum = 100)]
public double Humidity { get; private set; }
```

### Property and Measuring Point Combined

A property can be **both** a `[ServiceProperty]` and a `[ServiceMeasuringPoint]`. This is common for values that you want to display on the dashboard **and** record over time.

```csharp
[ServiceProperty(Title = "Current Temperature", Unit = "°C")]
[ServiceMeasuringPoint(Title = "Current Temperature", Unit = "°C")]
[Importance(Importance.Primary)]
public double CurrentTemp { get; private set; }
```

This value appears on the dashboard tile (because of `Importance.Primary`), and its history is recorded in the time-series database for charting.

### When to Use Which

| Scenario | Use |
|----------|-----|
| User-configurable setting (e.g., target temperature) | `[ServiceProperty]` with public setter |
| Read-only runtime state shown on dashboard (e.g., connection status) | `[ServiceProperty]` with private setter |
| Telemetry recorded over time (e.g., sensor reading) | `[ServiceMeasuringPoint]` |
| Dashboard value **and** time-series recording | Both attributes on the same property |

## Complex Value Types

Beyond scalar primitives, the Dale SDK supports three composable container shapes for `[ServiceProperty]` and `[ServiceMeasuringPoint]` values: nullables, immutable arrays, and `readonly record struct`. These can be combined — for example, `ImmutableArray<Coordinates?>` is a valid measuring-point type — and they participate in the same Dashboard, persistence, and time-series pipeline as scalars.

### Nullable Values

Append `?` to any supported primitive, enum, or struct type to mark the value as optional. A `null` value means "unknown" or "not set" and is distinct from a zero or default value.

```csharp
[ServiceProperty(Title = "Optional Setpoint", Unit = "kW")]
public double? OptionalTarget { get; set; }

[ServiceProperty(Title = "Sample Count")]
public int? OptionalCount { get; set; }

[ServiceMeasuringPoint(Title = "Last Error")]
public string? LastError { get; private set; }
```

Nullable measuring points are useful when a sensor occasionally fails to produce a reading — the gap is recorded as `null` instead of being interpolated.

### Arrays (`ImmutableArray<T>`)

Use `ImmutableArray<T>` to expose a sequence of values. Immutability is required so that snapshots can be safely shared across the runtime boundary without copying or locking.

```csharp
using System.Collections.Immutable;

[ServiceMeasuringPoint(Title = "Histogram Buckets", Unit = "A")]
public ImmutableArray<double> HistogramBuckets { get; private set; }
    = ImmutableArray<double>.Empty;

[ServiceProperty(Title = "Schedule Hours")]
public ImmutableArray<int> ScheduleHours { get; set; }
    = ImmutableArray<int>.Empty;
```

The element type `T` may itself be a nullable primitive, an enum, a string, or a `readonly record struct`. Initialize the property with `ImmutableArray<T>.Empty` to avoid the default `default(ImmutableArray<T>)` which is not iterable.

```csharp
[ServiceProperty(Title = "Samples With Gaps", Unit = "kW")]
public ImmutableArray<double?> SamplesWithGaps { get; set; }
    = ImmutableArray<double?>.Empty;
```

To replace the contents, assign a new immutable array — never mutate the existing one:

```csharp
ScheduleHours = ImmutableArray.Create(6, 12, 18);
```

### Custom Structs

Bundle related scalars into a `readonly record struct`. Each field can carry its own unit and range via the `[StructField]` attribute, which the Dashboard uses to render a composite editor or detail view.

```csharp
public readonly record struct Coordinates(
    [StructField(Unit = "deg", Minimum = -90, Maximum = 90)]
    double Lat,
    [StructField(Unit = "deg", Minimum = -180, Maximum = 180)]
    double Lon);

public readonly record struct ScheduledSetpoint(
    DateTime At,
    [StructField(Unit = "kW")] double PowerSetpoint,
    [StructField(Unit = "V")] double VoltageSetpoint);
```

Use the struct as a property type directly, as a nullable, or as the element type of an array:

```csharp
[ServiceMeasuringPoint(Title = "Position")]
public Coordinates CurrentLocation { get; private set; }

[ServiceProperty(Title = "Preferred Location")]
public Coordinates? PreferredLocation { get; set; }

[ServiceProperty(Title = "Setpoint Plan")]
public ImmutableArray<ScheduledSetpoint> Schedule { get; set; }
    = ImmutableArray<ScheduledSetpoint>.Empty;
```

`[StructField]` accepts the same metadata as `[ServiceProperty]` plus an optional `Description`:

| Parameter | Description |
|-----------|-------------|
| `Title` | Field display name. Defaults to the parameter or property name. |
| `Description` | Longer help text shown in detail views. |
| `Unit` | Unit of measurement for this field. |
| `Minimum`, `Maximum` | Field-level bounds. |

### Struct Constraints

To keep the introspection schema serializable, structs used as service-element values must be **flat**:

- Declare the type as `readonly record struct`. Mutable or non-record structs are rejected.
- Fields must be primitives (including `byte`, `ushort`, `uint`), enums, `string`, `DateTime`, `TimeSpan`, or nullable of those.
- No nested structs and no arrays inside a struct. Use `ImmutableArray<MyStruct>` at the property level instead of `MyStruct` containing an array.
- Prefer positional record-struct parameters — they are the canonical place to apply `[StructField]` annotations.

The Dale analyzer surfaces violations as `DALE016` at build time.

## Categories

The `[Category]` attribute organizes properties by their purpose. The Dashboard uses this to group and render properties appropriately.

```csharp
[Category(PropertyCategory.Configuration)]
```

### PropertyCategory Enum

| Value | Description | Dashboard Behavior |
|-------|-------------|--------------------|
| `Status` | Read-only runtime value (default) | Displayed as a label |
| `Configuration` | User-editable parameter | Displayed with an input control |
| `Action` | Trigger or command | Displayed as a button |
| `Metric` | Measurement or KPI | Displayed with emphasis |

### Example

```csharp
[LogicBlock("Thermostat")]
public class ThermostatBlock : LogicBlockBase
{
    [ServiceProperty(Title = "Target Temperature", Unit = "°C", Minimum = 10, Maximum = 35)]
    [Category(PropertyCategory.Configuration)]
    public double TargetTemp { get; set; } = 21.0;

    [ServiceProperty(Title = "Current Temperature", Unit = "°C")]
    [ServiceMeasuringPoint(Title = "Current Temperature", Unit = "°C")]
    [Category(PropertyCategory.Status)]
    public double CurrentTemp { get; private set; }

    [ServiceProperty(Title = "Energy Today", Unit = "kWh")]
    [Category(PropertyCategory.Metric)]
    public double EnergyToday { get; private set; }

    [ServiceProperty(Title = "Reset Statistics")]
    [Category(PropertyCategory.Action)]
    public bool ResetStats { get; set; }
}
```

## Display Attributes

### `[Display]` -- UI Grouping and Ordering

The `[Display]` attribute controls how properties are grouped and ordered in the Dashboard detail view.

```csharp
[Display(name: "Target Temperature", group: "Climate", order: 1)]
[ServiceProperty(Title = "Target Temperature", Unit = "°C", Minimum = 10, Maximum = 35)]
[Category(PropertyCategory.Configuration)]
public double TargetTemp { get; set; } = 21.0;

[Display(name: "Fan Speed", group: "Climate", order: 2)]
[ServiceProperty(Title = "Fan Speed", Unit = "%", Minimum = 0, Maximum = 100)]
[Category(PropertyCategory.Configuration)]
public double FanSpeed { get; set; } = 50.0;

[Display(name: "Firmware Version", group: "Device Info", order: 1)]
[ServiceProperty(Title = "Firmware Version")]
public string FirmwareVersion { get; private set; } = "1.2.0";
```

Properties in the same `group` are rendered together under a shared heading. The `order` determines the sort order within a group.

### `[Importance]` -- Dashboard Tile Visibility

The `[Importance]` attribute controls whether a property appears on the compact dashboard tile or only in the detail view.

```csharp
[Importance(Importance.Primary)]
```

| Value | Behavior |
|-------|----------|
| `Primary` | Shown prominently on the dashboard tile (large) |
| `Secondary` | Shown on the dashboard tile (smaller) |
| `Normal` | Shown only in the detail view (default) |
| `Hidden` | Excluded from the UI entirely |

### Example

```csharp
[ServiceProperty(Title = "Current Temperature", Unit = "°C")]
[ServiceMeasuringPoint(Title = "Current Temperature", Unit = "°C")]
[Importance(Importance.Primary)]
public double CurrentTemp { get; private set; }

[ServiceProperty(Title = "Humidity", Unit = "%")]
[ServiceMeasuringPoint(Title = "Humidity", Unit = "%")]
[Importance(Importance.Secondary)]
public double Humidity { get; private set; }

[ServiceProperty(Title = "Sensor Firmware")]
[Importance(Importance.Normal)]
public string SensorFirmware { get; private set; } = "2.1.0";

[ServiceProperty(Title = "Internal Calibration Offset")]
[Importance(Importance.Hidden)]
public double CalibrationOffset { get; private set; }
```

In this example, the dashboard tile shows the current temperature prominently and humidity in a smaller display. The sensor firmware is visible only when the user opens the detail view. The calibration offset is hidden from the UI entirely.

## Status Indicators

Use `[StatusIndicator]` together with `[StatusSeverity]` on enum values to display a colored status badge on the dashboard tile.

### Defining a Status Enum

```csharp
public enum DeviceStatus
{
    [EnumValueInfo("Connected")]
    [StatusSeverity(StatusSeverity.Success)]
    Connected,

    [EnumValueInfo("Connecting")]
    [StatusSeverity(StatusSeverity.Warning)]
    Connecting,

    [EnumValueInfo("Disconnected")]
    [StatusSeverity(StatusSeverity.Error)]
    Disconnected,

    [EnumValueInfo("Standby")]
    [StatusSeverity(StatusSeverity.Info)]
    Standby,
}
```

### StatusSeverity Values

| Severity | Dashboard Color |
|----------|----------------|
| `Success` | Green |
| `Info` | Blue |
| `Warning` | Yellow / Orange |
| `Error` | Red |
| `Neutral` | Gray (no specific severity) |

### Using the Status Indicator

```csharp
[ServiceProperty(Title = "Status")]
[StatusIndicator]
[Importance(Importance.Primary)]
public DeviceStatus Status { get; private set; } = DeviceStatus.Disconnected;
```

The Dashboard renders this as a colored badge directly on the tile. Combined with `Importance.Primary`, the status is always visible at a glance.

### Full Example

```csharp
[LogicBlock("Energy Monitor")]
public class EnergyMonitorBlock : LogicBlockBase
{
    public enum MonitorStatus
    {
        [EnumValueInfo("Online")]
        [StatusSeverity(StatusSeverity.Success)]
        Online,

        [EnumValueInfo("Degraded")]
        [StatusSeverity(StatusSeverity.Warning)]
        Degraded,

        [EnumValueInfo("Offline")]
        [StatusSeverity(StatusSeverity.Error)]
        Offline,
    }

    [ServiceProperty(Title = "Status")]
    [StatusIndicator]
    [Importance(Importance.Primary)]
    public MonitorStatus Status { get; private set; } = MonitorStatus.Offline;

    [ServiceProperty(Title = "Power", Unit = "W")]
    [ServiceMeasuringPoint(Title = "Power", Unit = "W")]
    [Importance(Importance.Primary)]
    public double Power { get; private set; }

    [ServiceProperty(Title = "Energy Today", Unit = "kWh")]
    [ServiceMeasuringPoint(Title = "Energy Today", Unit = "kWh")]
    [Importance(Importance.Secondary)]
    public double EnergyToday { get; private set; }
}
```

## Enum Properties

Enums are a natural fit for properties with a fixed set of values. The Dashboard automatically renders enum properties as dropdowns.

### Defining an Enum with Display Names

Use `[EnumValueInfo]` to provide a human-readable display name for each enum value.

```csharp
public enum OperatingMode
{
    [EnumValueInfo("Automatic")]
    Auto,

    [EnumValueInfo("Manual Override")]
    Manual,

    [EnumValueInfo("Energy Saving")]
    Eco,

    [EnumValueInfo("Off")]
    Off,
}
```

### Using the Enum Property

```csharp
[ServiceProperty(Title = "Operating Mode")]
[Category(PropertyCategory.Configuration)]
[Importance(Importance.Secondary)]
public OperatingMode Mode { get; set; } = OperatingMode.Auto;
```

The Dashboard renders this as a dropdown with the display names "Automatic", "Manual Override", "Energy Saving", and "Off". Users select a value, and the logic block receives the corresponding enum member.

## Persistence

Writable service properties (those with a public setter) are **automatically persisted** across restarts. When the gateway reboots, the last-known value is restored before the logic block enters the `Ready` state.

### Opting Out of Automatic Persistence

If a writable property should **not** be persisted (e.g., a transient action trigger), use the `[Persistent]` attribute with `Exclude = true`:

```csharp
[ServiceProperty(Title = "Reset Statistics")]
[Category(PropertyCategory.Action)]
[Persistent(Exclude = true)]
public bool ResetStats { get; set; }
```

### Opting In for Read-Only Properties

Read-only properties (private setter) are **not** persisted by default. To persist them, add the `[Persistent]` attribute explicitly:

```csharp
[ServiceProperty(Title = "Total Energy", Unit = "kWh")]
[ServiceMeasuringPoint(Title = "Total Energy", Unit = "kWh")]
[Persistent]
public double TotalEnergy { get; private set; }
```

This is useful for cumulative counters and totals that should survive restarts.

::: tip
For a deeper look at how the persistence system works, including serialization behavior and limitations, see [Persistence](/sdk/persistence).
:::

## Service Interfaces

Service interfaces allow you to standardize the data surface of your logic blocks. By defining a C# interface decorated with `[ServiceInterface]`, you ensure consistent property names, types, units, and annotations across blocks that implement the same interface.

```csharp
[ServiceInterface]
public interface IClimateService
{
    [ServiceProperty(Title = "Temperature", Unit = "°C")]
    [ServiceMeasuringPoint(Title = "Temperature", Unit = "°C")]
    double Temperature { get; }

    [ServiceProperty(Title = "Humidity", Unit = "%")]
    [ServiceMeasuringPoint(Title = "Humidity", Unit = "%")]
    double Humidity { get; }

    [ServiceProperty(Title = "Target Temperature", Unit = "°C", Minimum = 10, Maximum = 35)]
    double TargetTemperature { get; set; }
}
```

A logic block implements the interface directly — all the attribute metadata (names, units, min/max) is inherited:

```csharp
[LogicBlockInfo("Room Climate Controller")]
public class RoomClimateBlock : LogicBlockBase, IClimateService
{
    public RoomClimateBlock(ILogger logger) : base(logger) { }

    public double Temperature { get; private set; }
    public double Humidity { get; private set; }
    public double TargetTemperature { get; set; } = 21.0;

    protected override void Ready() { }
}
```

### Service Relations

Use `[ServiceRelation]` to declare directional relationships between service interfaces. This tells the platform how blocks connect to each other.

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

- `ServiceRelationDirection.Outwards` — this block provides the relation
- `ServiceRelationDirection.Inwards` — this block consumes the relation
- The matching interface must declare the same `relationType` with the opposite direction

## Using the Dale CLI

The Dale CLI can generate property and measuring point boilerplate for you.

### Add a Service Property

```bash
dale add serviceproperty TargetTemp --type double --to ThermostatBlock
# ✔ Added [ServiceProperty] double TargetTemp (private set) to ThermostatBlock
```

Use `--setter public` to make it writable from the Dashboard:

```bash
dale add serviceproperty TargetTemp --type double --setter public --to ThermostatBlock
# ✔ Added [ServiceProperty] double TargetTemp (public set) to ThermostatBlock
```

### Add a Measuring Point

```bash
dale add measuringpoint CurrentTemp --type double --to ThermostatBlock
# ✔ Added [ServiceMeasuringPoint] double CurrentTemp to ThermostatBlock
```

### Add Both at Once

For a value that needs to be both a property and a measuring point, run both commands. The Dale CLI detects the existing property and adds the second attribute:

```bash
dale add serviceproperty CurrentTemp --type double --to ThermostatBlock
dale add measuringpoint CurrentTemp --type double --to ThermostatBlock
```

## Complete Example

Putting it all together, here is a logic block that demonstrates properties, measuring points, categories, display attributes, status indicators, and persistence.

```csharp
[LogicBlock("Smart Thermostat")]
public class SmartThermostatBlock : LogicBlockBase
{
    // --- Status enum with severity badges ---
    public enum ThermostatStatus
    {
        [EnumValueInfo("Heating")]
        [StatusSeverity(StatusSeverity.Warning)]
        Heating,

        [EnumValueInfo("Cooling")]
        [StatusSeverity(StatusSeverity.Info)]
        Cooling,

        [EnumValueInfo("Idle")]
        [StatusSeverity(StatusSeverity.Success)]
        Idle,

        [EnumValueInfo("Error")]
        [StatusSeverity(StatusSeverity.Error)]
        Error,
    }

    public enum HvacMode
    {
        [EnumValueInfo("Automatic")]
        Auto,

        [EnumValueInfo("Heat Only")]
        Heat,

        [EnumValueInfo("Cool Only")]
        Cool,

        [EnumValueInfo("Off")]
        Off,
    }

    // --- Status indicator on the dashboard tile ---
    [ServiceProperty(Title = "Status")]
    [StatusIndicator]
    [Importance(Importance.Primary)]
    public ThermostatStatus Status { get; private set; } = ThermostatStatus.Idle;

    // --- Primary telemetry: visible on the tile and recorded ---
    [ServiceProperty(Title = "Current Temperature", Unit = "°C")]
    [ServiceMeasuringPoint(Title = "Current Temperature", Unit = "°C")]
    [Importance(Importance.Primary)]
    [Display(name: "Current Temperature", group: "Climate", order: 1)]
    public double CurrentTemp { get; private set; }

    // --- Secondary telemetry ---
    [ServiceProperty(Title = "Humidity", Unit = "%")]
    [ServiceMeasuringPoint(Title = "Humidity", Unit = "%")]
    [Importance(Importance.Secondary)]
    [Display(name: "Humidity", group: "Climate", order: 2)]
    public double Humidity { get; private set; }

    // --- User-configurable settings ---
    [ServiceProperty(Title = "Target Temperature", Unit = "°C", Minimum = 10, Maximum = 35)]
    [Category(PropertyCategory.Configuration)]
    [Display(name: "Target Temperature", group: "Settings", order: 1)]
    public double TargetTemp { get; set; } = 21.0;

    [ServiceProperty(Title = "HVAC Mode")]
    [Category(PropertyCategory.Configuration)]
    [Display(name: "HVAC Mode", group: "Settings", order: 2)]
    public HvacMode Mode { get; set; } = HvacMode.Auto;

    // --- Persistent cumulative counter ---
    [ServiceProperty(Title = "Total Runtime", Unit = "h")]
    [ServiceMeasuringPoint(Title = "Total Runtime", Unit = "h")]
    [Persistent]
    [Category(PropertyCategory.Metric)]
    public double TotalRuntime { get; private set; }

    // --- Non-persistent action trigger ---
    [ServiceProperty(Title = "Reset Statistics")]
    [Category(PropertyCategory.Action)]
    [Persistent(Exclude = true)]
    public bool ResetStats { get; set; }
}
```
