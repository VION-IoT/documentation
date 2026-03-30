---
title: Key Concepts
description: The design principles and mental model behind the VION platform.
---

# Key Concepts

## Actor-Based Logic

Every logic block in Dale is an **actor** — an isolated unit of computation with its own state that processes messages one at a time. This means:

- **No shared state** — logic blocks cannot directly access each other's data
- **No locks or threading issues** — the runtime guarantees single-threaded execution per block
- **Message-driven communication** — blocks exchange typed messages through contracts

You don't need to think about concurrency. Write straightforward sequential code and the runtime handles the rest. This is what makes Dale logic blocks reliable in production — even when dozens of blocks run on the same gateway.

## Declarative, Attribute-Driven Design

Dale uses C# attributes to describe what a logic block does rather than how the runtime should manage it:

```csharp
[ServiceProperty("Temperature", "°C")]
[ServiceMeasuringPoint("Temperature", "°C")]
[Importance(Importance.Primary)]
public double Temperature { get; private set; }
```

This single declaration tells the runtime to:
- Expose a property called "Temperature" with unit °C
- Publish its value as telemetry
- Display it prominently in the Dashboard

The runtime, cloud, and UI all derive their behavior from these attributes. You declare intent once — everything else follows.

## Batteries Included

VION provides a complete toolchain, not just an SDK:

| Tool | Purpose |
|------|---------|
| **Dale CLI** | Scaffold, build, test, introspect, and publish — all from the command line |
| **DevHost** | Run and debug logic blocks locally with a web UI, no hardware needed |
| **TestKit** | Unit test logic blocks with a lightweight actor context, mocks, and assertions |
| **Observability** | Grafana dashboards with metrics and logs from every gateway, out of the box |
| **Utility packages** | Ready-made, non-blocking clients for HTTP, Modbus TCP, and Modbus RTU — callback-based, actor-safe, no boilerplate |

The goal is that you go from idea to deployed IoT logic as fast as possible, without having to set up infrastructure or write plumbing code.

## Modern .NET

Dale embraces the .NET ecosystem rather than fighting it:

- **Dependency injection** — logic blocks and services are registered in a standard `IServiceCollection`
- **Standard logging** — `ILogger` everywhere, structured logging with OpenTelemetry
- **NuGet packaging** — logic block libraries are standard NuGet packages
- **Unit testing** — MSTest or any test framework, with the TestKit providing the actor harness

If you know .NET, you already know how to build with Dale. There's no proprietary build system, no custom project format, no special IDE.

## Edge-First, Cloud-Connected

Logic runs on the edge gateway, not in VION Cloud. This means:

- **Low latency** — control loops execute locally in milliseconds
- **Offline resilience** — logic continues running when VION Cloud is unreachable
- **Data efficiency** — only relevant state changes are synced to VION Cloud

VION Cloud provides configuration management, monitoring, OTA updates, and a Dashboard — but the intelligence lives on the edge.

## Multi-Tenancy and RBAC

The platform is built for system integrators serving multiple customers:

- **Platform** → manages integrators
- **Integrator** → your organization, manages tenants and develops logic block libraries
- **Tenant** → your tenant, manages their projects and gateways

Each level has its own roles and permissions. A developer at the integrator level can publish libraries. An operator at the tenant level can configure and monitor gateways. Access is enforced at every layer — API, Dashboard, and CLI.

## Agent-Ready Development

The Dale CLI and SDK are designed with AI coding agents in mind:

- **`dale new`** scaffolds a project with AGENTS.md and CLAUDE.md files for immediate AI agent context
- **`dale list --output json`** gives agents machine-readable project introspection
- **`dale add`** commands let agents scaffold code without writing boilerplate
- **`dale build` / `dale test`** provide a fast feedback loop for iterative development

The attribute-based, strongly-typed design gives AI agents clear patterns to follow — reducing hallucination and increasing reliability of generated code.
