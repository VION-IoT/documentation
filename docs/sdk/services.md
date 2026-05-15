---
title: Hardware & External Services
description: Connecting logic blocks to hardware I/O, Modbus devices, and external APIs through service provider contract bindings and utility packages.
---

# Hardware & External Services

The Dale SDK provides multiple ways to connect logic blocks to the outside world — from digital I/O and Modbus registers to HTTP APIs. Service provider contract bindings connect to hardware through the Dale runtime, while utility packages like Modbus TCP and HTTP are injected via dependency injection for direct communication.

## Built-in I/O Interfaces

Dale provides built-in interfaces for common I/O types:

| Interface | Description | Value Type |
|-----------|-------------|------------|
| `IDigitalInput` | Boolean input (button, switch, contact) | `bool` |
| `IDigitalOutput` | Boolean output (LED, relay, valve) | `bool` |
| `IAnalogInput` | Numeric input (temperature sensor, light sensor) | `double` |
| `IAnalogOutput` | Numeric output (dimmer, valve position, fan speed) | `double` |

### Declaring I/O Contract Bindings

Use `[ServiceProviderContractBinding]` on a property to declare the I/O binding. `DefaultName` provides a human-readable label shown in the dashboard during wiring.

```csharp
[LogicBlock(Name = "Toggle Light")]
public class ToggleLightBlock : LogicBlockBase
{
    public ToggleLightBlock(ILogger logger) : base(logger) { }

    [ServiceProviderContractBinding(DefaultName = "Button")]
    public IDigitalInput Button { get; set; } = null!;

    [ServiceProviderContractBinding(DefaultName = "LED")]
    public IDigitalOutput Led { get; set; } = null!;

    [ServiceProperty(Title = "LED Enabled")]
    [Presentation(Group = PropertyGroup.Status, Importance = Importance.Primary)]
    public bool LedEnabled { get; private set; }

    protected override void Ready()
    {
        Button.InputChanged += (sender, value) =>
        {
            LedEnabled = value;
            Led.Set(value);
        };
    }
}
```

### Handling Input Events

Subscribe to `InputChanged` in the `Ready()` lifecycle method. The event fires whenever the physical (or simulated) input changes state.

```csharp
protected override void Ready()
{
    // Digital: value is a bool.
    Button.InputChanged += (sender, value) =>
    {
        Led.Set(value);
    };

    // Analog: value is a double.
    TemperatureSensor.InputChanged += (sender, value) =>
    {
        CurrentTemperature = value;
        if (value > Threshold)
            HeaterOutput.Set(0.0);
    };
}
```

### Writing to Outputs

Call `Set()` on an output property at any time:

```csharp
Led.Set(true);
HeaterOutput.Set(0.75); // 75% power
```

## Modbus RTU Example

The `Vion.Dale.Sdk.Modbus.Rtu` package provides the `IModbusRtu` interface — a service provider contract that works just like `IDigitalInput` or `IAnalogOutput`. Declare it with `[ServiceProviderContractBinding]`, the Dale runtime injects an implementation, and use it to read and write Modbus registers directly.

```csharp
[LogicBlock(Name = "EM122 Electricity Meter", Icon = "flashlight-line")]
public class Em122ElectricityMeter : LogicBlockBase
{
    public Em122ElectricityMeter(ILogger logger) : base(logger) { }

    [ServiceProviderContractBinding(Identifier = "Modbus", DefaultName = "EM122 Modbus RTU")]
    public IModbusRtu Modbus { get; set; } = null!;

    [ServiceProperty(Title = "Unit ID")]
    [Presentation(Group = PropertyGroup.Configuration)]
    public int UnitId { get; set; } = 1;

    [ServiceProperty(Title = "Voltage L1", Unit = "V")]
    [ServiceMeasuringPoint]
    [Presentation(Group = PropertyGroup.Status)]
    public double VoltageL1 { get; private set; }

    [ServiceProperty(Title = "Voltage L2", Unit = "V")]
    [ServiceMeasuringPoint]
    [Presentation(Group = PropertyGroup.Status)]
    public double VoltageL2 { get; private set; }

    [ServiceProperty(Title = "Voltage L3", Unit = "V")]
    [ServiceMeasuringPoint]
    [Presentation(Group = PropertyGroup.Status)]
    public double VoltageL3 { get; private set; }

    [ServiceProperty(Title = "Read Count")]
    [Presentation(Group = PropertyGroup.Diagnostics)]
    public int ReadCount { get; private set; }

    [ServiceProperty(Title = "Error Count")]
    [Presentation(Group = PropertyGroup.Diagnostics)]
    public int ErrorCount { get; private set; }

    protected override void Ready()
    {
        Modbus.IsEnabled = true;
    }

    // Poll every 2 seconds.
    [Timer(2)]
    public void Poll()
    {
        // Batch read: 3 contiguous float registers starting at address 0.
        Modbus.ReadInputRegistersAsFloat(
            UnitId,
            startingAddress: 0,
            quantity: 3,
            successCallback: values =>
            {
                VoltageL1 = values[0];
                VoltageL2 = values[1];
                VoltageL3 = values[2];
                ReadCount++;
            },
            errorCallback: OnError);
    }

    private void OnError(Exception ex)
    {
        ErrorCount++;
        Logger.LogWarning(ex, "Modbus error at unit {UnitId}", UnitId);
    }
}
```

The `IModbusRtu` interface provides typed read/write methods for all standard Modbus operations:

| Method | Modbus Function |
|--------|-----------------|
| `ReadDiscreteInputs` | FC 2 — read discrete inputs |
| `ReadCoils` / `WriteSingleCoil` / `WriteMultipleCoils` | FC 1, 5, 15 — coils |
| `ReadInputRegistersAs{Float,Int,Short,...}` | FC 4 — read input registers |
| `ReadHoldingRegistersAs{Float,Int,Short,...}` | FC 3 — read holding registers |
| `WriteSingleHoldingRegister` / `WriteMultipleHoldingRegistersAs{Float,...}` | FC 6, 16 — write holding registers |

All operations are callback-based and support configurable byte order, word order, and operation timeout:

```csharp
// Write a holding register with explicit byte order.
Modbus.WriteMultipleHoldingRegistersAsFloat(
    UnitId,
    registerAddress: 2,
    values: new[] { 15.0f },
    successCallback: () => Logger.LogInformation("Register written"),
    errorCallback: OnError,
    byteOrder: ByteOrder.MsbToLsb);
```

## Modbus TCP

The `Vion.Dale.Sdk.Modbus.Tcp` package provides `ILogicBlockModbusTcpClient` — a queue-based Modbus TCP client injected via dependency injection (not a service provider contract binding like RTU). Use it when a logic block connects directly to a Modbus TCP device over the network.

```csharp
[LogicBlock(Name = "Energy Meter TCP")]
public class EnergyMeterTcp : LogicBlockBase
{
    private readonly ILogicBlockModbusTcpClient _modbus;

    public EnergyMeterTcp(ILogger logger, ILogicBlockModbusTcpClient modbus) : base(logger)
    {
        _modbus = modbus;
    }

    [ServiceProperty(Title = "IP Address")]
    [Presentation(Group = PropertyGroup.Configuration)]
    public string IpAddress { get; set; } = "192.168.1.100";

    [ServiceProperty(Title = "Power", Unit = "kW")]
    [ServiceMeasuringPoint]
    [Presentation(Group = PropertyGroup.Status, Importance = Importance.Primary)]
    public double Power { get; private set; }

    protected override void Ready()
    {
        _modbus.IpAddress = IpAddress;
        _modbus.IsEnabled = true;
    }

    [Timer(2)]
    public void Poll()
    {
        _modbus.ReadInputRegistersAsFloat(
            unitIdentifier: 1,
            startingAddress: 0,
            quantity: 1,
            successCallback: values => { Power = values[0]; },
            errorCallback: ex => Logger.LogWarning(ex, "Modbus TCP error"));
    }
}
```

The TCP client provides the same typed read/write methods as `IModbusRtu` (same Modbus function codes), plus connection management:

| Feature | Modbus RTU | Modbus TCP |
|---------|------------|------------|
| Transport | Serial via service provider | TCP/IP direct connection |
| Declaration | `[ServiceProviderContractBinding]` | Constructor injection (DI) |
| Connection | Managed by runtime | `IpAddress`, `Port`, `ConnectionTimeout` |
| Queue management | Actor-based | Configurable `QueueCapacity` and `QueueOverflowPolicy` |
| Multiple connections | One per binding | Use `ILogicBlockModbusTcpClientFactory` for multiple clients |

For connecting to multiple Modbus TCP devices from one logic block, inject `ILogicBlockModbusTcpClientFactory` and call `Create()` for each connection.

Register the package in your `DependencyInjection` class:

```csharp
services.AddDaleModbusTcpSdk();
```

## HTTP Client

The `Vion.Dale.Sdk.Http` package provides `ILogicBlockHttpClient` — a non-blocking HTTP client for calling external APIs from logic blocks. All operations use callbacks dispatched through the actor system, so the logic block thread is never blocked.

```csharp
[LogicBlock(Name = "Weather Station")]
public class WeatherStation : LogicBlockBase
{
    private readonly ILogicBlockHttpClient _http;

    public WeatherStation(ILogger logger, ILogicBlockHttpClient http) : base(logger)
    {
        _http = http;
    }

    [ServiceProperty(Title = "Temperature", Unit = "°C")]
    [ServiceMeasuringPoint]
    [Presentation(Group = PropertyGroup.Status, Importance = Importance.Primary)]
    public double Temperature { get; private set; }

    [Timer(300)]
    public void FetchWeather()
    {
        _http.GetJson<WeatherResponse>(
            this,
            "https://api.open-meteo.com/v1/forecast?latitude=47.37&longitude=8.55&current=temperature_2m",
            response => { Temperature = response.Current.Temperature2m; },
            ex => Logger.LogWarning(ex, "Weather API error"));
    }
}
```

Available methods:

| Method | Description |
|--------|-------------|
| `GetJson<T>` | GET request, deserialize JSON response |
| `PostJson<TReq, TRes>` | POST with JSON body, deserialize response |
| `PostJson<TReq>` | POST with JSON body, no response body |
| `PutJson<TReq, TRes>` | PUT with JSON body, deserialize response |
| `PutJson<TReq>` | PUT with JSON body, no response body |
| `DeleteJson<T>` | DELETE, deserialize response |
| `Delete` | DELETE, no response body |
| `SendRequest` | Raw `HttpRequestMessage` for full control |

All methods accept optional `headers` and `timeout` parameters. Register the package:

```csharp
services.AddDaleHttpSdk();
```

## Cardinality and Sharing

`[ServiceProviderContractBinding]` supports cardinality and sharing options to control how many providers can be connected and whether they can be shared across blocks.

### Cardinality

| Value | Description |
|-------|-------------|
| `CardinalityType.Mandatory` | Exactly one provider must be connected (default). |
| `CardinalityType.Optional` | Zero or one provider may be connected. |
| `CardinalityType.Multiple` | Multiple providers can be connected. |

### Sharing

| Value | Description |
|-------|-------------|
| `SharingType.Shared` | Provider can be used by multiple blocks (default). |
| `SharingType.Exclusive` | Provider is reserved for this block only. |

```csharp
[ServiceProviderContractBinding(
    DefaultName = "Sensor",
    Cardinality = CardinalityType.Optional,
    Sharing = SharingType.Exclusive)]
public IAnalogInput OptionalSensor { get; set; } = null!;
```

## Custom Service Providers

Custom service providers can be built for any hardware, bus protocol, or external system. A service provider is a standalone process that communicates with the Dale runtime (for contract messaging) and Mesh (for registration and health) over the local MQTT broker using MQTT 5.0. It can be written in any language — .NET, Python, Rust, CODESYS, TwinCAT, or bare-metal firmware.

See [Service Provider Protocol](/sdk/service-provider-protocol) for the full MQTT protocol specification covering registration, declaration, health reporting, and service-specific messaging patterns.
