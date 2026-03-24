---
title: Dashboards & Metrics
description: Pre-built Grafana dashboards and available metrics from VION edge gateways.
---

# Dashboards & Metrics

## Pre-Built Dashboards

Every tenant gets two dashboards automatically:

### Overview Dashboard

Provides a high-level view of your edge gateway fleet:

| Panel | Description | Data Source |
|-------|-------------|-------------|
| **Gateway Uptime** | Time series showing online/offline status per gateway | Mimir |
| **Active Gateways** | Count of currently online gateways | Mimir |
| **Error Rate** | Number of error log entries in the last hour | Loki |
| **Error Logs** | Recent error log entries across all gateways | Loki |

Default time range: 1 hour, auto-refresh every 30 seconds.

### Logs Dashboard

A searchable log stream from all your edge gateways:

- Full-text search across all log entries
- Filter by gateway, component, or log level
- Default time range: last 6 hours

## Key Metrics

All metrics are labeled with `tenant_id` and `gateway_id` for filtering.

| Metric | Description | Example Query |
|--------|-------------|---------------|
| `up` | Gateway online status (1 = up, 0 = down) | `up{tenant_id="<id>"}` |
| Gateway count | Number of online gateways | `count(up{tenant_id="<id>"} == 1)` |
| Error count | Errors in time window | `count_over_time({tenant_id="<id>"} \|= "error" [1h])` |

## Creating Custom Dashboards

If you have Editor permissions, you can create custom dashboards:

1. Click **+ → New Dashboard** in Grafana
2. Add a panel and select **Mimir** (for metrics) or **Loki** (for logs) as the data source
3. Write your query using PromQL or LogQL
4. Save the dashboard in your tenant's folder

### Example: Gateway Uptime Over 24h

```promql
up{tenant_id="your-tenant-id"}
```

Set the time range to **Last 24 hours** and visualization to **Time series**.

### Example: Error Logs Containing "Modbus"

```logql
{tenant_id="your-tenant-id"} |= "Modbus" |= "error"
```

Set visualization to **Logs** for a searchable log stream.
