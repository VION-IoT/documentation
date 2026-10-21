---
title: Hardware & External Services
description: Connecting logic blocks to hardware I/O, Modbus devices, and external APIs through service provider contract bindings and utility packages.
---

# Hardware & External Services

The Dale SDK provides multiple ways to connect logic blocks to the outside world — from digital I/O and Modbus registers to HTTP APIs. Service provider contract bindings connect to hardware through the Dale runtime, while utility packages like Modbus TCP and HTTP are injected via dependency injection for direct communication.

## Built-in I/O Interfaces

Dale provides built-in interfaces for common I/O types:

| Interface        | Description                                        | Value Type |
| ---------------- | -------------------------------------------------- | ---------- |
| `IDigitalInput`  | Boolean input (button, switch, contact)            | `bool`     |
| `IDigitalOutput` | Boolean output (LED, relay, valve)                 | `bool`     |
| `IAnalogInput`   | Numeric input (temperature sensor, light sensor)   | `double`   |
| `IAnalogOutput`  | Numeric output (dimmer, valve position, fan speed) | `double`   |

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

## Digital I/O on the IPCBox-CM5-B

The service provider reaches a gateway as a Mender update and can be deployed via the VION dashboard.

The IPCBox-CM5-B exposes two isolated digital inputs and two isolated digital outputs on screw terminals, all under one service named `dio`. Bind them from a logic block the same way as any other I/O contract; the contract identifiers match the labels printed on the case, so an installer reading `out1` in the dashboard is reading the terminal in front of them.

| Contract       | Interface        | `true` means                                         |
| -------------- | ---------------- | ---------------------------------------------------- |
| `in1`, `in2`   | `IDigitalInput`  | voltage is present at the terminal                   |
| `out1`, `out2` | `IDigitalOutput` | the terminal is conducting and the load is energised |

A block written against these contracts behaves the same here as on a Raspberry Pi.

What a wiring plan needs:

- Inputs tolerate up to 36 V and read as active above 2 V.
- An input is isolated and needs a complete circuit — the supply's positive to the input terminal and its negative to the digital-input common. A probe touched to one terminal is not enough.
- Outputs are rated 150 V and 500 mA.
- Outputs are high-impedance at power-on, and logical off leaves the load de-energised.
- Input changes are debounced over a 50 ms trailing window, so a contract reports where the line settled rather than the first edge of a bounce.

## Modbus

Two packages read and write Modbus registers with the same typed, callback-based methods. Both callbacks receive a `ModbusReceipt` whose `Outcome` says how the request ended, and a client's `Link` property returns a summary of its link that a block can publish as a diagnostics property.

### Modbus RTU

The `Vion.Dale.Sdk.Modbus.Rtu` package provides the `IModbusRtu` interface — a service provider contract that works just like `IDigitalInput` or `IAnalogOutput`. Declare it with `[ServiceProviderContractBinding]`, the Dale runtime injects an implementation, and use it to read and write Modbus registers directly.

```csharp
using Microsoft.Extensions.Logging;
using Vion.Dale.Sdk.Core;
using Vion.Dale.Sdk.Modbus.Core.Diagnostics;
using Vion.Dale.Sdk.Modbus.Rtu;

[LogicBlock(Name = "Energy Meter", Icon = "flashlight-line")]
public class EnergyMeter : LogicBlockBase
{
    private readonly ILogger _logger;

    public EnergyMeter(ILogger logger) : base(logger)
    {
        _logger = logger;
    }

    [ServiceProviderContractBinding(Identifier = "Modbus", DefaultName = "Meter Modbus RTU")]
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

    [ServiceProperty(Title = "Link")]
    [Presentation(Group = PropertyGroup.Diagnostics)]
    public ModbusLinkSummary Link { get; private set; }

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
            count: 3,
            dispatcher: this,
            successCallback: (values, receipt) =>
            {
                VoltageL1 = values[0];
                VoltageL2 = values[1];
                VoltageL3 = values[2];
                Link = Modbus.Link;
            },
            errorCallback: (ex, receipt) =>
            {
                Link = Modbus.Link;
                _logger.LogWarning(ex, "Modbus read ended {Outcome}", receipt.Outcome);
            });
    }
}
```

The `IModbusRtu` interface provides typed read/write methods for all standard Modbus operations:

| Method                                                                      | Modbus Function                    |
| --------------------------------------------------------------------------- | ---------------------------------- |
| `ReadDiscreteInputs`                                                        | FC 2 — read discrete inputs        |
| `ReadCoils` / `WriteSingleCoil` / `WriteMultipleCoils`                      | FC 1, 5, 15 — coils                |
| `ReadInputRegistersAs{Float,Int,Short,...}`                                 | FC 4 — read input registers        |
| `ReadHoldingRegistersAs{Float,Int,Short,...}`                               | FC 3 — read holding registers      |
| `WriteSingleHoldingRegister` / `WriteMultipleHoldingRegistersAs{Float,...}` | FC 6, 16 — write holding registers |

All operations are callback-based and support configurable byte order, word order, and operation timeout:

```csharp
// Write a holding register with explicit byte order.
Modbus.WriteMultipleHoldingRegistersAsFloat(
    UnitId,
    startingAddress: 2,
    values: new[] { 15.0f },
    dispatcher: this,
    successCallback: receipt => _logger.LogInformation("Register written"),
    byteOrder: ByteOrder.MsbToLsb);
```

### Modbus TCP

The `Vion.Dale.Sdk.Modbus.Tcp` package provides `ILogicBlockModbusTcpClient` — a queue-based Modbus TCP client injected via dependency injection (not a service provider contract binding like RTU). Use it when a logic block connects directly to a Modbus TCP device over the network.

```csharp
using System;
using Microsoft.Extensions.Logging;
using Vion.Dale.Sdk.Core;
using Vion.Dale.Sdk.Modbus.Tcp.Client.LogicBlock;

[LogicBlock(Name = "Energy Meter TCP")]
public class EnergyMeterTcp : LogicBlockBase
{
    private readonly ILogger _logger;
    private readonly ILogicBlockModbusTcpClient _modbus;
    private string _ipAddress = "192.168.1.100";

    public EnergyMeterTcp(ILogger logger, ILogicBlockModbusTcpClient modbus) : base(logger)
    {
        _logger = logger;
        _modbus = modbus;
    }

    [ServiceProperty(Title = "IP Address")]
    [Presentation(Group = PropertyGroup.Configuration)]
    public string IpAddress
    {
        get => _ipAddress;
        set
        {
            _ipAddress = value;
            ApplyAddress();
        }
    }

    [ServiceProperty(Title = "Power", Unit = "kW")]
    [ServiceMeasuringPoint]
    [Presentation(Group = PropertyGroup.Status, Importance = Importance.Primary)]
    public double Power { get; private set; }

    protected override void Ready()
    {
        ApplyAddress();
        _modbus.IsEnabled = true;
    }

    [Timer(2)]
    public void Poll()
    {
        _modbus.ReadInputRegistersAsFloat(
            unitIdentifier: 1,
            startingAddress: 0,
            count: 1,
            dispatcher: this,
            successCallback: (values, receipt) => Power = values[0],
            errorCallback: (ex, receipt) => _logger.LogWarning(ex, "Modbus TCP read ended {Outcome}", receipt.Outcome));
    }

    private void ApplyAddress()
    {
        try
        {
            _modbus.IpAddress = _ipAddress;
        }
        catch (FormatException ex)
        {
            _logger.LogWarning(ex, "Invalid IP address {IpAddress}", _ipAddress);
        }
    }
}
```

A changed address or port applies from the next request, so set it from the property's setter rather than once in `Ready()`; an invalid address throws `FormatException`.

The TCP client provides the same typed read/write methods as `IModbusRtu` (same Modbus function codes), plus connection management:

| Feature              | Modbus RTU                         | Modbus TCP                                                   |
| -------------------- | ---------------------------------- | ------------------------------------------------------------ |
| Transport            | Serial via service provider        | TCP/IP direct connection                                     |
| Declaration          | `[ServiceProviderContractBinding]` | Constructor injection (DI)                                   |
| Connection           | Managed by runtime                 | `IpAddress`, `Port`, `ConnectionTimeout`                     |
| Queue management     | Managed by runtime                 | Configurable `QueueCapacity` and `QueueOverflowPolicy`       |
| Multiple connections | One per binding                    | Use `ILogicBlockModbusTcpClientFactory` for multiple clients |

For connecting to multiple Modbus TCP devices from one logic block, inject `ILogicBlockModbusTcpClientFactory` and call `Create()` for each connection.

Register the package in your `DependencyInjection` class:

```csharp
services.AddDaleModbusTcpSdk();
```

## HTTP Client

The `Vion.Dale.Sdk.Http` package provides `ILogicBlockHttpClient` — a non-blocking HTTP client for calling external APIs from logic blocks. All operations use callbacks dispatched through the actor system, so the logic block thread is never blocked.

```csharp
using System.Text.Json.Serialization;
using Microsoft.Extensions.Logging;
using Vion.Dale.Sdk.Core;
using Vion.Dale.Sdk.Http;

public class WeatherReading
{
    [JsonPropertyName("temperature")]
    public double Temperature { get; set; }
}

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

    [ServiceProperty(Title = "Last Error")]
    [Presentation(Group = PropertyGroup.Diagnostics)]
    public string LastError { get; private set; } = "";

    protected override void Ready() { }

    [Timer(300)]
    public void FetchWeather()
    {
        _http.GetJson<WeatherReading>(
            this,
            "https://weather.example.com/api/current",
            (reading, receipt) => Temperature = reading.Temperature,
            (ex, receipt) => LastError = $"{receipt.Outcome} {receipt.StatusCode}");
    }
}
```

A response with a non-success status code arrives at the error callback; `receipt.StatusCode` is set whenever a server answered, which tells it apart from a connection failure.

Available methods:

| Method                 | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| `GetJson<T>`           | GET request, deserialize JSON response                       |
| `PostJson<TReq, TRes>` | POST with JSON body, deserialize response                    |
| `PostJson<TReq>`       | POST with JSON body, no response body                        |
| `PutJson<TReq, TRes>`  | PUT with JSON body, deserialize response                     |
| `PutJson<TReq>`        | PUT with JSON body, no response body                         |
| `DeleteJson<T>`        | DELETE, deserialize response                                 |
| `Delete`               | DELETE, no response body                                     |
| `SendRequest`          | Raw `HttpRequestMessage`; the callback disposes the response |

All methods accept an optional `timeout`, and all but `SendRequest` optional `headers`. Register the package:

```csharp
services.AddDaleHttpSdk();
```

## HTTP Server

The same package lets a logic block serve HTTP. Inject `ILogicBlockHttpServer`, publish responses inside `Sync`, and enable it:

```csharp
using System.Net.Http;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using Vion.Dale.Sdk.Core;
using Vion.Dale.Sdk.Http.Server;

[LogicBlock(Name = "Status Endpoint")]
public class StatusEndpoint : LogicBlockBase
{
    private readonly ILogicBlockHttpServer _server;

    public StatusEndpoint(ILogger logger, ILogicBlockHttpServer server) : base(logger)
    {
        _server = server;
    }

    [ServiceProperty(Title = "Setpoint", Unit = "kW")]
    public double Setpoint { get; set; }

    protected override void Ready()
    {
        Publish();
        _server.IsEnabled = true;
    }

    [Timer(1)]
    public void Publish()
    {
        var body = JsonSerializer.Serialize(new { setpoint = Setpoint });
        _server.Sync(snapshot =>
            snapshot.SetResponse(HttpMethod.Get, "/status", HttpServerResponse.Json(body)));
    }
}
```

The server listens on `127.0.0.1:8080` until `ListenAddress` and `Port` say otherwise, and serves plain HTTP with no authentication. `snapshot.TakeReceivedRequests()` returns the requests received since the last call.

## Link Multiplicity

A service provider contract link has two multiplicity sides: how many providers a consuming block expects, and how many consumers a provided contract role accepts. Both use the same `LinkMultiplicity` vocabulary:

| Value        | Meaning                                                |
| ------------ | ------------------------------------------------------ |
| `ExactlyOne` | Required and single (1..1).                            |
| `ZeroOrOne`  | Optional and single (0..1).                            |
| `OneOrMore`  | Required and many (1..n).                              |
| `ZeroOrMore` | Optional and many, including none (0..n). The default. |

### Consumer Side

Set `Multiplicity` on `[ServiceProviderContractBinding]` to declare how many providers the block expects wired to that property. The default is `ZeroOrMore` (unconstrained); set a stricter value only where the logic depends on it:

```csharp
[ServiceProviderContractBinding(
    DefaultName = "Sensor",
    Multiplicity = LinkMultiplicity.ZeroOrOne)]
public IAnalogInput OptionalSensor { get; set; } = null!;
```

### Provider Side

A contract role can also cap how many consumers it accepts. `[ServiceProviderContractType]` carries a `Consumers` property (same `LinkMultiplicity`, default `ZeroOrMore`). This is where single-writer exclusivity lives: the built-in `IDigitalOutput` and `IAnalogOutput` declare `Consumers = LinkMultiplicity.ZeroOrOne`, so at most one block can drive a given output, while inputs stay `ZeroOrMore`. You only set this when authoring your own service provider contract type:

```csharp
[ServiceProviderContractType("DimmableLight", Consumers = LinkMultiplicity.ZeroOrOne)]
public interface IDimmableLight
{
    void SetBrightness(double level);
}
```

### Declared, Not Enforced

Both sides are declarative metadata — a forward contract for the platform. The Dale SDK and runtime do **not** validate or enforce multiplicity. VION Cloud validates it when a logic configuration is saved or activated (for example, rejecting two blocks wired to a single-writer output), and the dashboard logic editor uses it to guide wiring. See [Link Multiplicity](/sdk/logic-interfaces#declared-not-enforced) for the full model shared with logic-block interfaces.

## Custom Service Providers

Custom service providers can be built for any hardware, bus protocol, or external system. A service provider is a standalone process that communicates with the Dale runtime (for contract messaging) and Mesh (for registration and health) over the local MQTT broker using MQTT 5.0. It can be written in any language — .NET, Python, Rust, CODESYS, TwinCAT, or bare-metal firmware.

See [Service Provider Protocol](/sdk/service-provider-protocol) for the full MQTT protocol specification covering registration, declaration, health reporting, and service-specific messaging patterns.
