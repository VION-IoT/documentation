---
title: Limitations
description: Known limitations of the VION observability stack.
---

# Limitations

This page documents known limits of the VION observability stack, including data retention, ingestion rates, and data filtering.

## Data Retention

Metrics and logs are retained for a limited period. Retention is configured per environment and may vary. Contact [VION support](https://vion.swiss) for the exact retention period in your environment.

## Ingestion Limits

The telemetry collector on each gateway batches signals before forwarding and runs under a bounded memory limit. If it reaches that limit, it starts dropping data to keep the gateway responsive rather than letting telemetry consume the resources the workload needs. Exact batch sizes, timeouts, and memory ceilings are configured per environment; contact [VION support](https://vion.swiss) for the values in your environment.

## Queue and Buffering

Telemetry data is buffered on the edge gateway when VION Cloud is temporarily unreachable. The buffer is file-backed and the collector retries with backoff until connectivity is restored. Data is not lost during short cloud outages — it queues on the gateway and syncs when the cloud is reachable again. Buffer sizes and retry timing are configured per environment.

## Filtered Data

To reduce noise, certain high-frequency MQTT messages are excluded from tracing by default:

- Property state updates (`property/state`)
- Measuring point state updates (`measuringPoint/state`)

These can be enabled by setting `trace.enabled=true` in the telemetry configuration if needed for debugging.

## Query Performance

The Logs dashboard defaults to a 15-minute window because broad log queries over long ranges can be slow. Narrow the result first with the Service, Device, Gateway, and Level filters, then widen the time range deliberately rather than starting from a multi-day window. The same applies to custom Loki queries: scope by `tenant_id` and a label filter before extending the range.

## Tenant Isolation

Dashboard visibility is scoped per tenant. You see your own folder, and the pre-built dashboards in it show your gateways and your data. Custom dashboards you create live in your tenant's folder, and the Viewer role cannot modify the pre-built dashboards.

## What Is NOT Collected

- **Personal data (PII)** — no user-identifying information is sent to the observability stack
- **Raw MQTT payloads** — message contents are not logged by default
- **Historical property values** — use the [Cloud API measuring points endpoint](/cloud-api/examples#query-measuring-point-data) for time-series property data
