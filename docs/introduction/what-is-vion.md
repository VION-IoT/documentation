---
title: What is VION?
description: Overview of the VION Edge Operations Platform.
---

# What is VION?

VION is an **Edge Operations Platform** for building, deploying, and operating IoT logic on edge gateways. It is built for system integrators who need to connect hardware, run control logic, and give their customers visibility — without building infrastructure from scratch.

VION is the product as a whole. The **Dale SDK** is the part integrators build on — a .NET SDK and CLI for writing logic blocks that run on the edge. On the edge gateway, the **Dale runtime** hosts those logic blocks as plugins, and **Mesh** bridges the gateway to VION Cloud. The Dale SDK is source-available at [VION-IoT/dale-sdk](https://github.com/VION-IoT/dale-sdk/); packages are published to [nuget.org](https://www.nuget.org/) under the `Vion.*` prefix.

## The Big Picture

```mermaid
flowchart LR
    subgraph You["You Develop "]
        direction TB
        CLI["Dale CLI "]
        Code["Logic Blocks "]
        CLI --- Code
    end

    subgraph Cloud["VION Cloud "]
        direction TB
        Dash["Dashboard "]
        API["API "]
        Mon["Monitoring "]
        Dash --- API --- Mon
    end

    subgraph Edge["Edge Gateway "]
        direction TB
        Runtime["Dale Runtime "]
        HW["Hardware "]
        Runtime --- HW
    end

    You -->|"publish"| Cloud
    Cloud -->|"deploy"| Edge
    Edge -.->|"telemetry"| Cloud

    classDef light fill:#ecfbfa,stroke:#32656c,stroke-width:1.5px,color:#192f33
    classDef dark fill:#32656c,stroke:#2b474e,stroke-width:1.5px,color:#ffffff
    classDef muted fill:#f6f7f5,stroke:#c8c9be,stroke-width:1.5px,color:#282921

    class CLI,Code light
    class Dash,API,Mon dark
    class Runtime,HW muted
```

You write logic in C#. VION Cloud manages deployment and monitoring. The edge runs the logic close to the hardware.

## Development Workflow

```mermaid
flowchart LR
    A["Scaffold "]
    B["Code "]
    C["Test "]
    D["Debug "]
    E["Publish "]
    F["Deploy "]

    A --> B --> C --> D --> E --> F
    C -.->|"fix"| B
    D -.->|"iterate"| B

    classDef dev fill:#ecfbfa,stroke:#32656c,stroke-width:1.5px,color:#192f33,rx:8
    classDef cloud fill:#32656c,stroke:#2b474e,stroke-width:1.5px,color:#ffffff,rx:8

    class A,B,C,D dev
    class E,F cloud
```

Everything happens through the **Dale CLI** — from project creation to cloud deployment. Local testing with DevHost and TestKit means you don't need hardware to develop.

## What Runs Where

```mermaid
flowchart TB
    subgraph EdgeBox["Edge Gateway"]
        direction LR
        SP["Service Providers "]
        Dale["Dale Runtime "]
        Mesh["Mesh "]
        OTel["OTel Collector "]
        SP <-->|"I/O"| Dale
        Dale <--> Mesh
        Dale --> OTel
    end

    subgraph CloudBox["VION Cloud"]
        direction LR
        CloudAPI["Cloud API "]
        Dashboard["Dashboard "]
        Grafana["Grafana "]
        Dashboard --> CloudAPI
    end

    Mesh <-->|"MQTT over TLS"| CloudAPI
    OTel -->|"OpenTelemetry"| Grafana

    classDef edgeNode fill:#ecfbfa,stroke:#32656c,stroke-width:1.5px,color:#192f33,rx:8
    classDef cloudNode fill:#32656c,stroke:#2b474e,stroke-width:1.5px,color:#ffffff,rx:8

    class SP,Dale,Mesh,OTel edgeNode
    class CloudAPI,Dashboard,Grafana cloudNode
```

**Logic runs on the edge** — close to the hardware, with millisecond latency and offline resilience. VION Cloud handles configuration, deployment, and monitoring but is not in the critical path.

## Who Is It For

```mermaid
flowchart TB
    Platform["VION Platform "]
    Int1["Integrator A "]
    Int2["Integrator B "]
    T1["Tenant 1 "]
    T2["Tenant 2 "]
    T3["Tenant 3 "]

    Platform --> Int1
    Platform --> Int2
    Int1 --> T1
    Int1 --> T2
    Int2 --> T3

    classDef platform fill:#32656c,stroke:#2b474e,stroke-width:1.5px,color:#ffffff,rx:8
    classDef integrator fill:#ecfbfa,stroke:#32656c,stroke-width:1.5px,color:#192f33,rx:8
    classDef tenant fill:#f6f7f5,stroke:#c8c9be,stroke-width:1.5px,color:#282921,rx:8

    class Platform platform
    class Int1,Int2 integrator
    class T1,T2,T3 tenant
```

VION is built for **system integrators** — companies that develop IoT solutions for their customers. Each integrator manages their own logic block libraries, tenants, and edge gateways independently. Role-based access control is enforced at every level.

## Next Steps

<div class="vp-card-grid">

- **[Key Concepts](/introduction/key-concepts)** — design principles and mental model
- **[Quick Start](/introduction/quick-start)** — build and run your first logic block
- **[SDK Development](/sdk/installation)** — dive into the Dale SDK

</div>
