---
outline: deep
title: Run and Debug Locally
---

# Run and Debug Locally

This guide covers how to run the DevHost (local web host) to develop and debug your LogicBlocks without real hardware. It focuses on configuring the host, adding simulated hardware, registering LogicBlock instances and interface mappings, running the host (F5), and interacting with the Web UI (mocked I/O, service properties, measuring points).

1. Configure the DevHost

- Open the `.DevHost` project in your solution (for template projects this is `MyFirstVionLibrary.DevHost`).
- The DevHost usually exposes a `DevConfigurationBuilder` in `Program.cs` or a configuration helper where you can add hardware blocks and LogicBlocks. Example snippets:

```csharp
var config = DevConfigurationBuilder.Create()
		.AddHardwareBlock("gpio", hw => hw
				.WithDigitalInputs("button1", "button2")
				.WithDigitalOutputs("led1", "led2")
				.WithAnalogInputs("temp1"))
		.AddLogicBlock<HelloWorld>("HelloWorld", "hw-1")
		.AddLogicBlock<TemperatureMonitor>("TempMonitor", "tm-1")
		.Build();
```

- Use `.WithIoMapping(...)` to map LogicBlock properties (named I/O) to hardware identifiers when you need to simulate interactions between blocks and hardware:

```csharp
.AddLogicBlock<MyLogicBlock>("MyBlock", "instance-1", lb => lb
		.WithIoMapping("Button", "gpio", "button1")
		.WithIoMapping("LED", "gpio", "led1"))
```

2. Simulated hardware components

- Hardware blocks added via `AddHardwareBlock` are simulated by the DevHost. Use digital/analog inputs/outputs to simulate sensor readings and actuators in the Web UI.
- Typical simulated components:
	- Digital inputs (buttons, switches)
	- Digital outputs (LEDs, relays)
	- Analog inputs (sensors)

3. LogicBlock instances and mappings

- Register your LogicBlocks in the DevHost configuration using `AddLogicBlock<T>(name, id)`.
- When LogicBlocks communicate via contract interfaces, connect them with  `WithLogicInterfaceMapping()` .

4. Run the DevHost

- In your IDE: set the `.DevHost` project as startup and press F5.
- From the command line (DevHost project directory):

```pwsh
dotnet run
```

- The DevHost opens a browser at `http://localhost:5000` (default). If it doesn't, open the URL manually.
- The DevHost opens also a Console window where Logs, Exceptions, etc are diaplayed.

5. Web UI features — what you can do in the DevHost UI

- Services / Instances list: see all LogicBlock instances and their status.
- Service Properties: editable properties exposed with `[ServiceProperty]`. Change values in the UI to modify runtime behavior immediately.
- Measuring Points: telemetry exposed with `[ServiceMeasuringPoint]`. View current values and historical trends where available.
- Simulated I/O: interact with digital/analog inputs and outputs in the UI. For example:
	- Toggle a digital input (button) to raise an input event for a LogicBlock.
	- Observe digital outputs (LEDs) changing state when LogicBlocks set them.
	- Send analog values from the UI to simulate sensors.
- Logic Interfaces / Messages: observe or trigger interface messages between LogicBlocks if supported by the DevHost UI.

6. Debugging tips

- Use breakpoints in your LogicBlock code (hosted in the `.DevHost` solution) and press F5 to hit them when the DevHost runs.
- Use `ILogger<T>` for structured logs — the DevHost UI and console will show log output to help trace behavior.

7. Example workflow

1. Register your LogicBlock and mappings in the DevHost `Program.cs`.
2. Start the DevHost (F5).
3. Open the Web UI and find your LogicBlock instance.
4. Change a service property or toggle a simulated input.
5. Watch the logic react (property updates, measuring point values updates, log messages, I/O state changes).

That's it — the DevHost lets you iterate quickly on LogicBlocks with immediate feedback and without hardware dependencies.
