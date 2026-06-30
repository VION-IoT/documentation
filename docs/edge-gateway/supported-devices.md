---
title: Supported Devices
description: Hardware boards and prebuilt images for VION edge gateways.
---

# Supported Devices

VION edge gateways run from custom Mender images built for specific hardware boards. Each image carries a Linux base, Docker, the Mender client, and the auto-commissioning tools the platform needs, so a board boots ready to join VION Cloud without manual installation.

## Supported boards

VION publishes a prebuilt image for each board below. Pick the board you have, download its image, and flash it during [onboarding](/edge-gateway/onboarding).

| Board | Network |
|-------|---------|
| Raspberry Pi 3 (Model B / B+) | Ethernet, WiFi |
| Raspberry Pi 4 (Model B) | Ethernet, WiFi |
| Raspberry Pi 5 (Model B) | Ethernet, WiFi |
| Raspberry Pi Zero 2 W | WiFi |
| NanoPi Zero2 | Ethernet |
| NanoPi NEO3 Plus | Ethernet |
| Beckhoff CX82xx | Ethernet |
| Beckhoff CX9240 | Ethernet |

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

Images are served from a public URL that follows a fixed convention. Replace `<board>` with the token for your board:

```
https://images.vion.swiss/releases/<board>.img.gz
```

The board tokens are:

| Board | Token |
|-------|-------|
| Raspberry Pi 3 | `raspberry-pi-3` |
| Raspberry Pi 4 | `raspberry-pi-4` |
| Raspberry Pi 5 | `raspberry-pi-5` |
| Raspberry Pi Zero 2 W | `raspberry-pi-zero2w` |
| NanoPi Zero2 | `nanopi-zero2` |
| NanoPi NEO3 Plus | `nanopi-neo3-plus` |
| Beckhoff CX82xx | `beckhoff-cx82xx` |
| Beckhoff CX9240 | `beckhoff-cx9240` |

For example, the Raspberry Pi 4 image is at `https://images.vion.swiss/releases/raspberry-pi-4.img.gz`. The image is gzip-compressed; the flashing tools in [onboarding](/edge-gateway/onboarding) decompress it as they write.

## Simulation Mode

For evaluation and development, VION offers a simulated edge gateway that runs entirely in VION Cloud. No physical hardware is required — the platform spins up a simulated gateway environment that behaves like a real device.

Select **Simulation** during the [onboarding wizard](https://dashboard.vion.swiss/#/onboarding) to get started without hardware.
