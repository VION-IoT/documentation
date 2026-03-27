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

### Constructor

```csharp
ServicePropertyAttribute(
    string? defaultName = null,
    string? unit = null,
    double minValue = double.NaN,
    double maxValue = double.NaN
)
```

| Parameter | Description |
|-----------|-------------|
| `defaultName` | Display name shown in the Dashboard. Defaults to the C# property name. |
| `unit` | Unit of measurement (e.g., `"°C"`, `"%"`, `"kWh"`, `"lux"`). |
| `minValue` | Minimum allowed value. The Dashboard enforces this in input controls. |
| `maxValue` | Maximum allowed value. The Dashboard enforces this in input controls. |

### Basic Example

```csharp
[ServiceProperty("Target Temperature", "°C", minValue: 10, maxValue: 35)]
[Category(PropertyCategory.Configuration)]
public double TargetTemp { get; set; } = 21.0;
```

This creates a property named "Target Temperature" that users can adjust between 10 and 35 degrees. Because the setter is public, the Dashboard renders an input control. The default value is 21.0.

### Read-Only Properties

Use a `private set` to make a property read-only from the Dashboard. The logic block can still update the value internally.

```csharp
[ServiceProperty("Power Consumption", "W")]
public double PowerConsumption { get; private set; }
```

### Computed Properties

Properties with only a getter (no setter at all) work as well. These are useful for values derived from other state:

```csharp
[ServiceProperty("Total Power", "W")]
public double TotalPower => HeaterPower + FanPower;

[ServiceProperty("Is Running")]
public bool IsRunning => Status == DeviceStatus.Online;
```

Computed properties are always read-only. Their value is evaluated whenever the runtime reads the property, so they automatically reflect the current state.

### Supported Types

Service properties support the following C# types:

| Type | Dashboard Control |
|------|------------------|
| `bool` | Toggle switch |
| `int`, `long` | Number input |
| `double`, `float` | Number input (with decimal) |
| `string` | Text input |
| `DateTime` | Date/time picker |
| `enum` | Dropdown (see [Enum Properties](#enum-properties)) |

## The `[ServiceMeasuringPoint]` Attribute

The `[ServiceMeasuringPoint]` attribute marks a property as a telemetry value. Measuring points are recorded in the time-series database and can be visualized as charts, exported, and used in analytics.

### Constructor

```csharp
ServiceMeasuringPointAttribute(
    string? defaultName = null,
    string? unit = null
)
```

| Parameter | Description |
|-----------|-------------|
| `defaultName` | Display name shown in charts and exports. Defaults to the C# property name. |
| `unit` | Unit of measurement for axis labels and tooltips. |

### Example

```csharp
[ServiceMeasuringPoint("Room Humidity", "%")]
public double Humidity { get; private set; }
```

### Property and Measuring Point Combined

A property can be **both** a `[ServiceProperty]` and a `[ServiceMeasuringPoint]`. This is common for values that you want to display on the dashboard **and** record over time.

```csharp
[ServiceProperty("Current Temperature", "°C")]
[ServiceMeasuringPoint("Current Temperature", "°C")]
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
    [ServiceProperty("Target Temperature", "°C", minValue: 10, maxValue: 35)]
    [Category(PropertyCategory.Configuration)]
    public double TargetTemp { get; set; } = 21.0;

    [ServiceProperty("Current Temperature", "°C")]
    [ServiceMeasuringPoint("Current Temperature", "°C")]
    [Category(PropertyCategory.Status)]
    public double CurrentTemp { get; private set; }

    [ServiceProperty("Energy Today", "kWh")]
    [Category(PropertyCategory.Metric)]
    public double EnergyToday { get; private set; }

    [ServiceProperty("Reset Statistics")]
    [Category(PropertyCategory.Action)]
    public bool ResetStats { get; set; }
}
```

## Display Attributes

### `[Display]` -- UI Grouping and Ordering

The `[Display]` attribute controls how properties are grouped and ordered in the Dashboard detail view.

```csharp
[Display(name: "Target Temperature", group: "Climate", order: 1)]
[ServiceProperty("Target Temperature", "°C", minValue: 10, maxValue: 35)]
[Category(PropertyCategory.Configuration)]
public double TargetTemp { get; set; } = 21.0;

[Display(name: "Fan Speed", group: "Climate", order: 2)]
[ServiceProperty("Fan Speed", "%", minValue: 0, maxValue: 100)]
[Category(PropertyCategory.Configuration)]
public double FanSpeed { get; set; } = 50.0;

[Display(name: "Firmware Version", group: "Device Info", order: 1)]
[ServiceProperty("Firmware Version")]
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
[ServiceProperty("Current Temperature", "°C")]
[ServiceMeasuringPoint("Current Temperature", "°C")]
[Importance(Importance.Primary)]
public double CurrentTemp { get; private set; }

[ServiceProperty("Humidity", "%")]
[ServiceMeasuringPoint("Humidity", "%")]
[Importance(Importance.Secondary)]
public double Humidity { get; private set; }

[ServiceProperty("Sensor Firmware")]
[Importance(Importance.Normal)]
public string SensorFirmware { get; private set; } = "2.1.0";

[ServiceProperty("Internal Calibration Offset")]
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
| `Warning` | Yellow / Orange |
| `Error` | Red |
| `Info` | Blue / Gray |

### Using the Status Indicator

```csharp
[ServiceProperty("Status")]
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

    [ServiceProperty("Status")]
    [StatusIndicator]
    [Importance(Importance.Primary)]
    public MonitorStatus Status { get; private set; } = MonitorStatus.Offline;

    [ServiceProperty("Power", "W")]
    [ServiceMeasuringPoint("Power", "W")]
    [Importance(Importance.Primary)]
    public double Power { get; private set; }

    [ServiceProperty("Energy Today", "kWh")]
    [ServiceMeasuringPoint("Energy Today", "kWh")]
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
[ServiceProperty("Operating Mode")]
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
[ServiceProperty("Reset Statistics")]
[Category(PropertyCategory.Action)]
[Persistent(Exclude = true)]
public bool ResetStats { get; set; }
```

### Opting In for Read-Only Properties

Read-only properties (private setter) are **not** persisted by default. To persist them, add the `[Persistent]` attribute explicitly:

```csharp
[ServiceProperty("Total Energy", "kWh")]
[ServiceMeasuringPoint("Total Energy", "kWh")]
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
    [ServiceProperty("Temperature", "°C")]
    [ServiceMeasuringPoint("Temperature", "°C")]
    double Temperature { get; }

    [ServiceProperty("Humidity", "%")]
    [ServiceMeasuringPoint("Humidity", "%")]
    double Humidity { get; }

    [ServiceProperty("Target Temperature", "°C", minValue: 10, maxValue: 35)]
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
    [ServiceProperty("Status")]
    [StatusIndicator]
    [Importance(Importance.Primary)]
    public ThermostatStatus Status { get; private set; } = ThermostatStatus.Idle;

    // --- Primary telemetry: visible on the tile and recorded ---
    [ServiceProperty("Current Temperature", "°C")]
    [ServiceMeasuringPoint("Current Temperature", "°C")]
    [Importance(Importance.Primary)]
    [Display(name: "Current Temperature", group: "Climate", order: 1)]
    public double CurrentTemp { get; private set; }

    // --- Secondary telemetry ---
    [ServiceProperty("Humidity", "%")]
    [ServiceMeasuringPoint("Humidity", "%")]
    [Importance(Importance.Secondary)]
    [Display(name: "Humidity", group: "Climate", order: 2)]
    public double Humidity { get; private set; }

    // --- User-configurable settings ---
    [ServiceProperty("Target Temperature", "°C", minValue: 10, maxValue: 35)]
    [Category(PropertyCategory.Configuration)]
    [Display(name: "Target Temperature", group: "Settings", order: 1)]
    public double TargetTemp { get; set; } = 21.0;

    [ServiceProperty("HVAC Mode")]
    [Category(PropertyCategory.Configuration)]
    [Display(name: "HVAC Mode", group: "Settings", order: 2)]
    public HvacMode Mode { get; set; } = HvacMode.Auto;

    // --- Persistent cumulative counter ---
    [ServiceProperty("Total Runtime", "h")]
    [ServiceMeasuringPoint("Total Runtime", "h")]
    [Persistent]
    [Category(PropertyCategory.Metric)]
    public double TotalRuntime { get; private set; }

    // --- Non-persistent action trigger ---
    [ServiceProperty("Reset Statistics")]
    [Category(PropertyCategory.Action)]
    [Persistent(Exclude = true)]
    public bool ResetStats { get; set; }
}
```
