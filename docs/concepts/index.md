---
outline: deep
title: Core Concepts
---

# Core Concepts

Understanding the fundamental building blocks of the Vion IoT SDK.

## Overview

The Vion IoT SDK is a modern, high-performance framework for building and running custom IoT applications in .NET. It provides a unified programming model that simplifies the complexity of concurrent systems while standardizing communication with hardware, cloud services, and application logic.

Built on proven patterns and native .NET technologies, the SDK enables developers to focus on business logic rather than infrastructure concerns.

## Design Principles

### Actor-Based Concurrency

At its core, the Vion SDK uses the **actor model** to manage concurrency and state isolation. Each LogicBlock runs as an independent actor, processing messages sequentially in its own context. This eliminates the need for complex locking mechanisms and makes concurrent programming significantly simpler.

**Key benefits:**
- **No race conditions** - Each LogicBlock processes one message at a time
- **Isolation** - LogicBlocks don't share mutable state
- **Scalability** - Actors can be distributed across cores and devices
- **Simplicity** - Write straightforward, sequential code without threading concerns

```csharp
// Your code is simple and sequential
[Timer(1)]
public void UpdateState()
{
    // No locks needed - the actor model handles concurrency
    this.Counter++;
    this.LastUpdate = DateTime.Now;
    OnPropertyChanged(nameof(Counter));
}
```

### Standardized Interfaces

The SDK provides consistent abstraction layers for all external interactions:

**Hardware I/O**
- Unified interface for communication with hardware like for digital and analog I/O, Serial communication like Modbus RTU or M-BUS
- Hardware-agnostic programming model
- Simulation support for development and testing
- Seamless transition from development to production hardware

**Cloud Services**
- Standardized service properties and measuring points
- Built-in serialization and communication
- Automatic state synchronization

**Logic Interfaces**
- Type-safe communication between LogicBlocks
- Message-centric contract definition
- Loose coupling for maintainable systems
- Testable and composable architecture

### Performance by Design

The SDK is built for resource-constrained IoT devices:

- **Efficient message passing** - Minimal overhead for inter-actor communication
- **Optimized memory usage** - Careful resource management
- **Native .NET** - No interpreted layers or unnecessary abstractions
- **Async-first** - Non-blocking I/O for maximum throughput

### Simplicity and Developer Experience

Complex systems shouldn't require complex code:

- **Declarative attributes** - Express intent, not implementation
- **Convention over configuration** - Sensible defaults, minimal boilerplate
- **IntelliSense-friendly** - Strong typing throughout
- **Familiar .NET patterns** - Dependency injection, logging, async/await

## Core Architecture

### LogicBlocks

LogicBlocks are the fundamental unit of functionality in the Vion SDK. Each LogicBlock:

- Encapsulates a single responsibility (device control, data processing, business logic)
- Runs as an isolated actor with its own state
- Exposes properties, telemetry, and commands through attributes
- Communicates with other LogicBlocks through interfaces

[Learn more about LogicBlocks →](logic-blocks)

### Properties and Measuring Points

Data flows through the system via two primary mechanisms:

- **ServiceProperty** - Bidirectional, user-configurable values (settings, control inputs)
- **ServiceMeasuringPoint** - Unidirectional telemetry data (sensor readings, status)

This distinction enables efficient data synchronization and clear separation of concerns.

[Learn more about Properties and Measuring Points →](services)

### Declarative and conventional configuration

For common use cases, sensible configuration defaults are used by convention. For more complex cases and more fine-grained control declarative configuration can be used (built-in C#-Attributes).

Attributes provide a declarative way to wire up behavior:

- **`[Timer]`** - Periodic execution
- **`[Command]`** - User-triggered actions
- **`[DigitalInput]` / `[DigitalOutput]`** - Hardware I/O
- **`[InterfaceAttribute]`** - Communication contracts
- And more...


### Communication Patterns

LogicBlocks communicate through well-defined patterns:

- **Interfaces** - Typed, contract-based dependencies
- **Request/Response** - Bidirectional messaging between two logic blocks
- **Commands** - Uni-directional messaging between a commanding logic block and n receiving logic blocks
- **State Updates** - Uni-directional messaging betwenn a sending logic block and n subscribed receiving logic blocks

[Learn more about Connecting LogicBlocks →](logic-interfaces)

## The Actor Model in Practice

Understanding how the actor model eliminates concurrency complexity:

**Traditional Approach:**
```csharp
// Traditional code requires explicit locking
private readonly object _lock = new object();
private int _counter;

public void Increment()
{
    lock (_lock) // Manual synchronization
    {
        _counter++;
    }
}
```

**Vion SDK Approach:**
```csharp
// No locking needed - actor model handles it
[ServiceMeasuringPoint]
public int Counter { get; private set; }

[Timer(1)]
public void Increment()
{
    Counter++; // Safe - single-threaded execution per actor
    OnPropertyChanged(nameof(Counter));
}
```

The actor runtime ensures that all methods in a LogicBlock execute sequentially, even when timers, commands, and messages arrive concurrently. You write simple, single-threaded code while the framework handles the complexity.

## Learning Path

If you're new to the Vion SDK, follow this path:

1. **[Getting Started](/getting-started)** - Create your first project and LogicBlock
2. **[Core concepts](/concepts)** - Understand the core concepts like actor model

## Key Takeaways

::: tip Actor Model
The actor model isn't just a implementation detail - it's the foundation that makes concurrent IoT programming simple and safe. Embrace it.
:::

::: tip Standardization
Hardware, cloud, and logic all use the same patterns. Learn one, know them all.
:::

::: tip Performance Matters
The SDK is built for constrained devices. Prefer a reactive programming model, reasonable timer intervals, and efficient state updates.
:::

::: tip .NET Native
You're writing real .NET code with familiar patterns. Dependency injection, logging, and strong typing work as expected.
:::

## Next Steps

Ready to dive deeper? Explore the detailed concept pages:

- **[LogicBlocks](logic-blocks)** - Actor model, lifecycle, and state management
- **[Services](services)** - Data interface to the cloud
- **[Connecting LogicBlocks](logic-interfaces)** - Communication patterns
- **[Terminology](terminology)** - Reference guide for SDK terms and concepts

Or jump to **[How-To Guides](/how-to/)** for practical, step-by-step instructions.
