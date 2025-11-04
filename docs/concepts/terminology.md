---
outline: deep
title: Terminology
---

# Terminology

Key terms and concepts used throughout the Vion IoT SDK documentation.

## Core Components

### LogicBlock
The fundamental building block of a Vion application. A LogicBlock is a class that inherits from `LogicBlockBase` and encapsulates a single unit of business logic, device control, or data processing. Each LogicBlock runs as an isolated actor in the actor system.

**Example:** `TemperatureMonitor`, `SmartLedController`, `DataAggregator`

### Actor
A computational entity that processes messages sequentially. In the Vion SDK, each LogicBlock instance is an actor. Actors maintain their own state and communicate with other actors through message passing, eliminating the need for locks and traditional concurrency control.

### Actor Reference
An identifier of an other actor, used to pass messages to it or identify the sender of incoming messages.

## Data & Communication

### ServiceProperty
A C# property of a LogciBlock that can be read and/or modified at runtime through the runtime, e.g. via a UI control or an API call. ServiceProperties are typically used for configuration values and control inputs. The runtime intercepts C# property setters with the help of INotifyPropertyChanged and sends the values to the cloud.

**Examples:** `TemperatureThreshold`, `DeviceName`, `UpdateInterval`

### ServiceMeasuringPoint
A unidirectional (read-only) property that exposes telemetry data. ServiceMeasuringPoints are used for sensor readings, status information, and metrics. They are scraped by the runtime and sent to the cloud in regular intervals.
The runtime intercepts C# property setters with the help of INotifyPropertyChanged.

**Examples:** `CurrentTemperature`, `IsConnected`, `MessageCount`

### Logic Interface/Contract
An interface/contract that defines how LogicBlocks communicate with each other. Logic interfaces/contracts are a set of struct messages decorated with attributes that enable typed, loosely-coupled communication between LogicBlocks.

### Message
Developer-devfined data passed between logic blocks as part of a interface/contract.
**Example message types:** `Command`, `StateUpdate`, `RequestResponse`

### Command
An message type attributed with the (`[Command]`) attribute that defines that the sender logic block can tell a specific receiver logic block something to do. The sender needs to know the receiver.

### State Update
An message type attributed with the (`[StateUpdate]`) attribute that defines that the sender logic block notifies all linked logic blocks about some changed state. The sender does not need to know the receiver

### Request/Response
An message type attributed with the (`[RequestResponse]`) attribute that defines that the requestor logic block sends a message to a specific responder logic block, that needs to handle the message by returning a specific response message to the requestor. The requestor needs to know the responser.


### Timers
An attribute (`[Timer]`) that causes a method to be invoked periodically by the rutime at a specified interval (in seconds).

### I/Os
A property of a logic block of a special type that can be mapped to hardware I/Os. These interfaces provide e.g. access to I/O value changes, allow setting I/O values or use bus protocols.  Common I/O types include `[DigitalInput]`, `[DigitalOutput]`,`[AnalogInput]`, and `[AnalogOutput]`.

## Hardware

### Hardware Block
A logical grouping of hardware I/O pins configured in DevHost. Hardware blocks simulate or represent physical hardware like GPIO controllers, ADCs, or communication buses.

**Example:** A GPIO hardware block with digital inputs for buttons and digital outputs for LEDs.

### I/O Mapping
The configuration that links a LogicBlock's I/O property to a specific pin or channel on a hardware block. I/O mapping is typically done in DevHost configuration.

### Digital Input
A binary (on/off, high/low) input signal from hardware, such as a button press or switch state.

### Digital Output
A binary (on/off, high/low) output signal to hardware, such as controlling an LED or relay.

### Analog Input
A continuous value input from hardware, such as a voltage reading from a sensor (typically 0-5V converted to a digital value).

## Logic block life cycle

### Ready()
A protected virtual method in `LogicBlockBase` that is called when the LogicBlock has been fully initialized and all dependencies have been resolved. Use `Ready()` for initialization like attaching event handlers to I/Os, initializing state, etc.

### Starting()
A protected virtual method in `LogicBlockBase` that is called just before the LogicBlock starts to run. Use `Starting()` for logic that should only run once after start.

### Stopping()
A protected virtual method in `LogicBlockBase` that is called just before the LogicBlock is stopped and removed, e.g. because of a configuration update. Use `Stopping()` for cleanup logic.

### Actor Context
The execution environment for an actor. Each LogicBlock runs in its own context, ensuring thread safety and state isolation.

## Dependency Injection

### Dependency Injection (DI)
A design pattern where dependencies are provided to a class rather than created by the class. The Vion SDK uses .NET's built-in DI container to provide services to LogicBlocks via constructor injection.

### Interface Dependency

## See Also

- [Core Concepts](./index) - Overview of SDK architecture
- [LogicBlocks](logic-blocks) - Deep dive into LogicBlocks and the actor model
- [Getting Started](/getting-started) - Quick start guide with examples
