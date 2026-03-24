---
title: What is VION?
description: Overview of the VION Edge Operations Platform.
---

# What is VION?

VION is an **Edge Operations Platform** for building, deploying, and operating IoT logic on edge gateways. It is built for system integrators who need to connect hardware, run control logic, and give their customers visibility — without building infrastructure from scratch.

## The Big Picture

```mermaid
flowchart LR
    subgraph You["You Develop"]
        direction TB
        CLI["Dale CLI"]
        Code["Logic Blocks<br/><small>C# / .NET</small>"]
        CLI --- Code
    end

    subgraph Cloud["VION Cloud"]
        direction TB
        Dash["Dashboard"]
        API["API & Auth"]
        Mon["Monitoring"]
        Dash --- API --- Mon
    end

    subgraph Edge["Edge Gateway"]
        direction TB
        Runtime["Dale Runtime"]
        HW["Hardware<br/>& Sensors"]
        Runtime --- HW
    end

    You -->|"publish"| Cloud
    Cloud -->|"deploy &<br/>configure"| Edge
    Edge -.->|"telemetry"| Cloud

    style You fill:#ecfbfa,stroke:#32656c,stroke-width:2px,color:#192f33
    style Cloud fill:#32656c,stroke:#2b474e,stroke-width:2px,color:#ffffff
    style Edge fill:#f6f7f5,stroke:#5d5e4e,stroke-width:2px,color:#282921
```

You write logic in C#. The cloud manages deployment and monitoring. The edge runs the logic close to the hardware.

## Development Workflow

```mermaid
flowchart LR
    A["<b>Scaffold</b><br/>dale new"] --> B["<b>Code</b><br/>Logic blocks,<br/>properties, timers"]
    B --> C["<b>Test</b><br/>dale test<br/><small>TestKit</small>"]
    C --> D["<b>Debug</b><br/>dale dev<br/><small>DevHost UI</small>"]
    D --> E["<b>Publish</b><br/>dale upload"]
    E --> F["<b>Deploy</b><br/>Dashboard"]
    C -.->|"fix"| B
    D -.->|"iterate"| B

    style A fill:#ecfbfa,stroke:#32656c,stroke-width:2px,color:#192f33
    style B fill:#ecfbfa,stroke:#32656c,stroke-width:2px,color:#192f33
    style C fill:#ecfbfa,stroke:#32656c,stroke-width:2px,color:#192f33
    style D fill:#ecfbfa,stroke:#32656c,stroke-width:2px,color:#192f33
    style E fill:#32656c,stroke:#2b474e,stroke-width:2px,color:#ffffff
    style F fill:#32656c,stroke:#2b474e,stroke-width:2px,color:#ffffff
```

Everything happens through the **Dale CLI** — from project creation to cloud deployment. Local testing with DevHost and TestKit means you don't need hardware to develop.

## What Runs Where

```mermaid
flowchart TB
    subgraph EdgeBox["Edge Gateway"]
        direction LR
        Dale["<b>Dale Runtime</b><br/>Runs logic blocks"]
        Mesh["<b>Mesh</b><br/>Cloud sync"]
        SP["<b>Service Providers</b><br/>Hardware drivers"]
        Alloy["<b>Alloy</b><br/>Telemetry"]
        SP <-->|"I/O"| Dale
        Dale <--> Mesh
        Dale --> Alloy
    end

    subgraph CloudBox["VION Cloud"]
        direction LR
        CloudAPI["<b>Cloud API</b><br/>Management"]
        Dashboard["<b>Dashboard</b><br/>UI"]
        Grafana["<b>Grafana</b><br/>Monitoring"]
        Dashboard --> CloudAPI
    end

    Mesh <-->|"MQTT over TLS"| CloudAPI
    Alloy -->|"OpenTelemetry"| Grafana

    style EdgeBox fill:#f6f7f5,stroke:#5d5e4e,stroke-width:2px,color:#282921
    style CloudBox fill:#32656c,stroke:#2b474e,stroke-width:2px,color:#ffffff
```

**Logic runs on the edge** — close to the hardware, with millisecond latency and offline resilience. The cloud handles configuration, deployment, and monitoring but is not in the critical path.

## Who Is It For

```mermaid
flowchart TB
    Platform["<b>VION Platform</b>"]
    Int1["<b>Integrator A</b><br/><small>Develops logic libraries</small>"]
    Int2["<b>Integrator B</b><br/><small>Develops logic libraries</small>"]
    T1["Tenant 1<br/><small>Customer</small>"]
    T2["Tenant 2<br/><small>Customer</small>"]
    T3["Tenant 3<br/><small>Customer</small>"]

    Platform --> Int1
    Platform --> Int2
    Int1 --> T1
    Int1 --> T2
    Int2 --> T3

    style Platform fill:#32656c,stroke:#2b474e,stroke-width:2px,color:#ffffff
    style Int1 fill:#ecfbfa,stroke:#32656c,stroke-width:2px,color:#192f33
    style Int2 fill:#ecfbfa,stroke:#32656c,stroke-width:2px,color:#192f33
    style T1 fill:#f6f7f5,stroke:#5d5e4e,stroke-width:2px,color:#282921
    style T2 fill:#f6f7f5,stroke:#5d5e4e,stroke-width:2px,color:#282921
    style T3 fill:#f6f7f5,stroke:#5d5e4e,stroke-width:2px,color:#282921
```

VION is built for **system integrators** — companies that develop IoT solutions for their customers. Each integrator manages their own logic block libraries, tenants, and edge gateways independently. Role-based access control is enforced at every level.

## Next Steps

<div class="vp-card-grid">

- **[Key Concepts](/introduction/key-concepts)** — design principles and mental model
- **[Quick Start](/introduction/quick-start)** — build and run your first logic block
- **[SDK Development](/sdk/installation)** — dive into the SDK

</div>
