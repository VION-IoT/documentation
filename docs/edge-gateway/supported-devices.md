---
title: Supported Devices
description: Hardware requirements and tested devices for VION edge gateways.
---

# Supported Devices

VION edge gateways run on any Linux device capable of running Docker. The platform is designed to be hardware-agnostic — if it runs Linux and has network access, it can likely be a VION edge gateway.

## Requirements

| Requirement | Minimum |
|-------------|---------|
| **OS** | Debian-based Linux (Debian, Raspberry Pi OS, Ubuntu) |
| **RAM** | 256 MB |
| **Storage** | 4 GB free disk space |
| **Network** | Internet access (HTTPS outbound) |
| **Access** | SSH access for initial setup |
| **Runtime** | Docker & Docker Compose (installed during setup) |

## Tested Devices

The following devices have been tested and are known to work well:

| Device | Model | Architecture | Notes |
|--------|-------|-------------|-------|
| **Raspberry Pi 3** | Model B, B+ | armhf | Minimum viable hardware |
| **Raspberry Pi 4** | Model B (2/4/8 GB) | arm64 | Recommended for development |
| **Raspberry Pi 5** | All models | arm64 | Best performance |
| **WAGO PFC200** | 750-8212, 750-8214 | armhf | Industrial PLC, Linux variant |
| **Beckhoff CX** | CX8200 (Linux) | x86_64 | Industrial embedded PC |

::: tip Other Hardware
If your target device is not listed above but meets the requirements, it will likely work. [Contact VION](https://vion.swiss) for compatibility verification and support for additional hardware platforms.
:::

## Simulation Mode

For evaluation and development, VION offers a **simulated edge gateway** that runs entirely in VION Cloud. No physical hardware is required — the platform spins up a simulated gateway environment that behaves like a real device.

Select **Simulation** during the [onboarding wizard](https://nhpdashboardapp.test.ecocoa.ch/#/onboarding) to get started without hardware.
