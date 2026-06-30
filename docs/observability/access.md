---
title: Accessing Grafana
description: How to authenticate with Grafana and navigate the VION observability dashboards.
---

# Accessing Grafana

Grafana provides dashboards for monitoring your edge gateways. This page covers authentication, URL structure, and navigation.

## URL

Access Grafana at:

| Environment | URL |
|-------------|-----|
| Test | `https://grafana.test.vion.swiss` |
| Production | `https://grafana.vion.swiss` |

## Authentication

Grafana uses the same **Keycloak** identity provider as the rest of the VION platform. Log in with your VION account credentials via OAuth — no separate Grafana password is needed.

Your Grafana account is automatically provisioned when you are added to a tenant.

You have a single Grafana account tied to your VION identity. If you belong to more than one tenant, that same account shows each tenant's folder side by side. Being removed from one tenant only removes that tenant's folder from your view — it does not affect your access to the others.

## Permissions

| Role | What You Can Do |
|------|----------------|
| **Viewer** | View dashboards and data for your tenant |
| **Editor** | Create custom dashboards, modify panels |

By default, tenant members are assigned the **Viewer** role. Contact [VION support](https://vion.swiss) for elevated access.

## Navigation

After login, you'll see your tenant's folder in the Grafana sidebar. Each tenant has a dedicated folder containing three pre-built dashboards:

- **Logs** — searchable log stream from all edge components
- **Metrics** — edge-gateway resource metrics (memory, CPU, GC, messaging)
- **Actor Vitals** — per-actor health from the Dale runtime

## Data Sources

Two data sources are pre-configured:

| Data Source | Type | What It Contains |
|-------------|------|-----------------|
| **Mimir** | Prometheus-compatible | Metrics (uptime, health, custom) |
| **Loki** | Log aggregation | Structured logs from edge gateways |

When creating custom dashboards or panels, select the appropriate data source for your query.
