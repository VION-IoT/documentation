---
title: Limitations
description: Known limitations of the VION observability stack.
---

# Limitations

This page documents known limits of the VION observability stack, including data retention, ingestion rates, and data filtering.

## Data Retention

Metrics and logs are retained for a limited period. Retention is configured per environment and may vary. Contact your platform administrator for the exact retention period in your environment.

## Ingestion Limits

| Limit | Value |
|-------|-------|
| **OTLP batch size** | 512 events per batch |
| **Batch timeout** | 5 seconds |
| **Collector memory** | 64 MiB hard limit per gateway |
| **MQTT connections** | 32 concurrent connections per gateway |

If the telemetry collector reaches its memory limit, it will start dropping data to prevent the gateway from becoming unresponsive.

## Queue and Buffering

Telemetry data is buffered on the edge gateway when VION Cloud is temporarily unreachable:

- **Queue storage**: File-backed, up to ~115 GB
- **Retry strategy**: Exponential backoff (1s → 30s)
- **Compaction**: Automatic, every 15 seconds if threshold exceeded

Data is not lost during short cloud outages — it queues on the gateway and syncs when connectivity is restored.

## Filtered Data

To reduce noise, certain high-frequency MQTT messages are excluded from tracing by default:

- Property state updates (`property/state`)
- Measuring point state updates (`measuringPoint/state`)

These can be enabled by setting `trace.enabled=true` in the telemetry configuration if needed for debugging.

## Tenant Isolation

- Each tenant sees only their own data (filtered by `tenant_id`)
- Cross-tenant queries are not possible
- Custom dashboards are scoped to your tenant's folder
- Viewer role cannot modify pre-built dashboards

## What Is NOT Collected

- **Personal data (PII)** — no user-identifying information is sent to the observability stack
- **Raw MQTT payloads** — message contents are not logged by default
- **Historical property values** — use the [Cloud API measuring points endpoint](/cloud-api/examples#query-measuring-point-data) for time-series property data
