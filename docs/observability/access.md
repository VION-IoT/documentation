---
title: Accessing Grafana
description: How to authenticate with Grafana and navigate the VION observability dashboards.
---

# Accessing Grafana

## URL

Access Grafana at:

| Environment | URL |
|-------------|-----|
| Test | `https://grafana.test.ecocoa.ch` |
| Staging | `https://grafana.staging.ecocoa.ch` |
| Production | `https://grafana.ecocoa.ch` |

## Authentication

Grafana uses the same **Keycloak** identity provider as the rest of the VION platform. Log in with your VION account credentials via OAuth — no separate Grafana password is needed.

Your Grafana account is automatically provisioned when you are added to a tenant.

## Permissions

| Role | What You Can Do |
|------|----------------|
| **Viewer** | View dashboards and data for your tenant |
| **Editor** | Create custom dashboards, modify panels |

By default, tenant members are assigned the **Viewer** role. Contact your platform administrator for elevated access.

## Navigation

After login, you'll see your tenant's folder in the Grafana sidebar. Each tenant has a dedicated folder containing their pre-built dashboards:

- **Overview** — gateway uptime, active gateways, error rate
- **Logs** — searchable log stream from all edge components

## Data Sources

Two data sources are pre-configured:

| Data Source | Type | What It Contains |
|-------------|------|-----------------|
| **Mimir** | Prometheus-compatible | Metrics (uptime, health, custom) |
| **Loki** | Log aggregation | Structured logs from edge gateways |

When creating custom dashboards or panels, select the appropriate data source for your query.
