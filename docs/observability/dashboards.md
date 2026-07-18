---
title: Dashboards & Metrics
description: The three pre-built Grafana dashboards every VION tenant receives and how to build custom dashboards against the metrics and logs datasets.
---

# Dashboards & Metrics

Every VION tenant receives three pre-built Grafana dashboards in its folder, and can build custom dashboards against the full metrics and logs datasets.

## Pre-Built Dashboards

When you are added to a tenant, three dashboards are provisioned automatically in that tenant's folder: Logs, Metrics, and Actor Vitals. Every panel is already scoped to your tenant, so you see only your gateways and your data.

### Logs

The Logs dashboard is a searchable log stream from every edge gateway in the tenant. A filter bar at the top scopes the stream through dropdowns for Service, Device, Gateway, and Level, plus a typed line filter for matching arbitrary text in log lines. A histogram above the stream groups entries by level so you can spot error spikes at a glance, and the log panel below shows the matching lines.

The default time range is the last 15 minutes. Broad queries over long ranges can be slow, so widen the range deliberately after narrowing with the filters. See [Limitations](/observability/limitations#query-performance) for guidance.

### Metrics

The Metrics dashboard shows edge-gateway resource metrics, grouped into four rows: Memory & GC, CPU, Messaging, and Other. Each metric appears twice — once as a fleet total across the tenant's gateways, and once broken down by service — so you can compare overall load against the contribution of an individual service.

The rows cover the following metrics.

| Row | Metrics |
|-----|---------|
| Memory & GC | cgroup memory (current, anonymous, page cache, file-mapped, kernel), major page faults, working-set refaults, memory-limit hits and OOM kills, .NET working set, GC committed memory, GC heap size and by generation, GC collections, allocation rate, GC pause time |
| CPU | CPU cores used (total and by service), thread pool queue length, lock contentions, CPU cores available |
| Messaging | publish, consume, disconnection, and pending counts — each as a total, by service, and broken down by connection |
| Other | exceptions (total and by service) and mesh automation actions |

The default time range is the last 1 hour. A Service dropdown drives the per-generation, per-connection, and other service-scoped panels.

### Actor Vitals

The Actor Vitals dashboard reports per-actor health from the Dale runtime. It covers both logic block actors and the runtime's own actors (such as the MQTT client and the property and measuring-point publishers), so you can see where messages are being handled and where they are backing up.

The dashboard includes these panels.

| Panel | What it shows |
|-------|---------------|
| Messages handled (rate) | Rate of messages processed per actor |
| Errors (rate) | Rate of handler errors per actor |
| Handler busy fraction | Share of time actors spend inside their handlers |
| Mean handler duration | Cumulative handler time divided by messages handled |
| Max handler duration (windowed) | Worst-case handler duration in the recent window |
| Mailbox depth (current & peak) | Queued messages waiting per actor, current and windowed peak |
| `[Timer]` callback duration & jitter | Duration of `[Timer]` callbacks and their scheduling jitter |
| Actors (current snapshot) | A table of the actors currently running |

Series are grouped by actor kind, role, and logic block type, so each block type aggregates its instances into one line rather than producing one line per running block. The default time range is the last 1 hour and the dashboard refreshes every 30 seconds.

## Creating Custom Dashboards

With Editor permissions, you can build custom dashboards in your tenant's folder. Two data sources are pre-configured: Mimir for metrics (queried with PromQL) and Loki for logs (queried with LogQL).

Follow these steps to add a dashboard:

1. Click **+ → New Dashboard** in Grafana.
2. Add a panel and select **Mimir** for metrics or **Loki** for logs as the data source.
3. Write your query in PromQL (Mimir) or LogQL (Loki).
4. Save the dashboard in your tenant's folder.

To chart gateway CPU usage over a longer window, query the .NET process CPU metric in Mimir with PromQL:

```promql
rate(dotnet_process_cpu_time_seconds_total{tenant_id="your-tenant-id"}[5m])
```

Set the time range to the window you want and the visualization to **Time series**.

To search logs for a specific term, query Loki with LogQL:

```logql
{tenant_id="your-tenant-id"} |= "Modbus" |= "error"
```

Set the visualization to **Logs** for a searchable stream.
