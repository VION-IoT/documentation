---
title: Observability Overview
description: Architecture of the VION observability stack and how telemetry flows from edge devices to dashboards.
---

# Observability Overview

VION provides a built-in observability stack that collects metrics, logs, and traces from your edge gateways and makes them available through Grafana dashboards.

## Architecture

```mermaid
flowchart LR
    subgraph Edge["Edge Gateway"]
        Dale["Dale Runtime"]
        Mesh["Mesh Gateway"]
        Alloy["Alloy Agent"]
    end

    subgraph Cloud["VION Cloud"]
        Mimir["Mimir<br/>(Metrics)"]
        Loki["Loki<br/>(Logs)"]
        Grafana["Grafana<br/>(Dashboards)"]
    end

    Dale -->|"OTLP"| Alloy
    Mesh -->|"OTLP"| Alloy
    Alloy -->|"Metrics"| Mimir
    Alloy -->|"Logs"| Loki
    Mimir --> Grafana
    Loki --> Grafana
```

## Data Flow

1. **Edge components** (Dale runtime, Mesh gateway) emit telemetry via the OpenTelemetry Protocol (OTLP)
2. **Alloy** (the OpenTelemetry collector running on the gateway) receives, batches, and forwards telemetry to VION Cloud
3. **Mimir** stores metrics (Prometheus-compatible) and **Loki** stores logs
4. **Grafana** provides dashboards to query and visualize the data

## What Data Is Available

| Data Type | Source | Storage | Query Language |
|-----------|--------|---------|----------------|
| **Metrics** | Gateway health, component uptime | Mimir | PromQL |
| **Logs** | Structured logs from all edge components | Loki | LogQL |
| **Traces** | Distributed traces across components | OpenTelemetry Collector | — |

## Tenant Isolation

All telemetry data is tagged with a `tenant_id` label. Each tenant can only see their own data — isolation is enforced at the Grafana level through teams and folders.
