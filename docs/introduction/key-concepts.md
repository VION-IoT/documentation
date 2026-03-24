---
title: Key Concepts
description: Core terminology and mental model for the VION platform.
---

# Key Concepts

Understanding these concepts will help you work effectively with the VION platform.

## Logic Block

The fundamental building unit in Dale. A logic block is an **actor** — an independent unit of computation that:
- Has its own state (properties, measuring points)
- Processes messages asynchronously
- Communicates with other logic blocks via logic interfaces
- Binds to hardware or external systems via services

Logic blocks are defined as C# classes extending `LogicBlockBase` and decorated with attributes.

## Property

An observable, configurable value on a logic block. Properties are the primary interface between logic blocks and the outside world (dashboard, cloud, other blocks).

- Decorated with `[ServiceProperty]`
- Can be read/written from the cloud and dashboard
- Support categories, units, and display hints
- Can be marked `[Persistent]` for state recovery after restart

## Measuring Point

A read-only observable value, typically representing sensor data or computed metrics. Similar to properties but designed for telemetry — high-frequency data that flows from edge to cloud.

## Service

A typed contract between a logic block and a **service provider** (hardware abstraction or external system). Services define the I/O interface:
- Digital and analog inputs/outputs
- Custom typed data channels
- Declared with `[Service]` attribute and bound at configuration time

## Service Provider

An external process that implements one or more service contracts. Service providers bridge the gap between Dale logic and the physical world:
- Hardware Abstraction Layers (GPIO, Modbus, BACnet, etc.)
- Protocol adapters
- Simulated devices for testing

Service providers communicate with Dale via MQTT using FlatBuffers serialization.

## Logic Interface

A communication channel between logic blocks. Logic interfaces enable:
- **Commands** — fire-and-forget messages
- **Request/Response** — synchronous-style queries between blocks
- **State updates** — one-to-many notifications

Defined with `[Interface]` and connected at configuration time in the dashboard.

## DevHost

A local development server that runs Dale logic blocks on your machine with a web UI. Allows you to:
- Inspect and modify property values in real-time
- Simulate service provider inputs
- Debug logic block behavior without a physical device

## Node

A logical representation of an edge gateway in the VION cloud. Each node:
- Runs a Dale runtime, Mesh gateway, and service providers
- Has a unique identity and certificate
- Belongs to a project within a tenant

## Project

A grouping of nodes within a tenant. Projects organize related devices — for example, all gateways in a single building or installation.
