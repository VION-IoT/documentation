---
title: Supported Devices
description: Hardware boards and prebuilt images for VION edge gateways.
---

# Supported Devices

VION edge gateways run from custom Mender images built for specific hardware boards. Each image carries a Linux base, Docker, the Mender client, and the auto-commissioning tools the platform needs, so a board boots ready to join VION Cloud without manual installation.

## Supported boards

VION publishes a prebuilt image for each board below. Pick the board you have, download its image, and flash it during [onboarding](/edge-gateway/onboarding).

| Board | Network | Image |
|-------|---------|-------|
| Raspberry Pi 3 (Model B / B+) | Ethernet, WiFi | [raspberry-pi-3.img.gz](https://images.vion.swiss/releases/raspberry-pi-3.img.gz) |
| Raspberry Pi 4 (Model B) | Ethernet, WiFi | [raspberry-pi-4.img.gz](https://images.vion.swiss/releases/raspberry-pi-4.img.gz) |
| Raspberry Pi 5 (Model B) | Ethernet, WiFi | [raspberry-pi-5.img.gz](https://images.vion.swiss/releases/raspberry-pi-5.img.gz) |
| Raspberry Pi Zero 2 W | WiFi | [raspberry-pi-zero2w.img.gz](https://images.vion.swiss/releases/raspberry-pi-zero2w.img.gz) |
| NanoPi Zero2 | Ethernet | [nanopi-zero2.img.gz](https://images.vion.swiss/releases/nanopi-zero2.img.gz) |
| NanoPi NEO3 Plus | Ethernet | [nanopi-neo3-plus.img.gz](https://images.vion.swiss/releases/nanopi-neo3-plus.img.gz) |
| Beckhoff CX82xx | Ethernet | [beckhoff-cx82xx.img.gz](https://images.vion.swiss/releases/beckhoff-cx82xx.img.gz) |
| Beckhoff CX9240 | Ethernet | [beckhoff-cx9240.img.gz](https://images.vion.swiss/releases/beckhoff-cx9240.img.gz) |

WiFi is available on Raspberry Pi boards only. The NanoPi and Beckhoff CX boards are Ethernet-only — connect them by cable.

## Image contents

Every image ships in an identical, ready-to-commission state. The board derives its identity from a hardware identifier on first boot, so VION performs no per-device provisioning step before shipping.

Each image includes:

- A Debian or Armbian Linux base
- Docker and the Docker Compose plugin as the container runtime
- The Mender client for over-the-air updates
- The VION auto-commissioning tools that run on first boot

The flashed image is approximately 9.8 GB after expansion. Use an SD card or eMMC of 16 GB or larger.

## Downloading an image

Each image link above resolves to `https://images.vion.swiss/releases/<board>.img.gz`. The image is gzip-compressed; the flashing tool in [onboarding](/edge-gateway/onboarding) decompresses it as it writes.

## Simulation Mode

For evaluation and development, VION offers a simulated edge gateway that runs entirely in VION Cloud. No physical hardware is required — the platform spins up a simulated gateway environment that behaves like a real device.

Select **Simulation** during the [onboarding wizard](https://dashboard.vion.swiss/#/onboarding) to get started without hardware.
