---
title: Dashboard Setup
description: Configuring and managing an edge gateway after onboarding through the VION Dashboard.
---

# Dashboard Setup

After [onboarding](/edge-gateway/onboarding), you manage your edge gateway through the Dashboard. This page covers the key tasks after your gateway is connected.

## Navigating to Your Gateway

After onboarding completes, you'll be redirected to your project's logic configuration page. To find your gateway later:

1. Select your **tenant** and **project** from the navigation
2. Go to **Project → Edge Gateways** to see all connected gateways

## Logic Configuration

The logic configuration editor lets you:

- **Deploy logic block libraries** — select and install libraries on the gateway
- **Create logic block instances** — instantiate blocks from deployed libraries
- **Wire contracts** — connect logic block contracts to service provider implementations
- **Link interfaces** — connect logic block interfaces to enable inter-block communication
- **Configure properties** — set initial values for configurable properties

Changes to the logic configuration are pushed to the gateway in real time.

## Monitoring Gateway Status

The Dashboard shows the current status of each gateway:

- **Connection state** — online / offline
- **Deployed software** — versions of all deployed components
- **Service providers** — registered hardware interfaces
- **Logic block status** — running instances and their health

## Software Updates

Software updates (Dale runtime, Mesh, monitoring agents) are managed through the platform's OTA update system powered by Mender. Updates are deployed from the platform level — no manual SSH access is required after initial onboarding.
