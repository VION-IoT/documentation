---
title: Troubleshooting
description: Common issues during edge gateway flashing, commissioning, and deployment, and how to resolve them.
---

# Troubleshooting

Before diving in, check the [VION status page](https://status.vion.swiss/) — a platform-wide incident can explain gateway or upload failures that otherwise look local.

## Image and Commissioning Issues

### Image won't boot or no identifier appears

The board does not start, or it boots but never shows a device identifier.

**Cause:** the image was written incompletely, the card is too small, or the board family does not match the image.

**Solution:** confirm you flashed the correct image for your board from [Supported Devices](/edge-gateway/supported-devices), and that the SD card or eMMC is 16 GB or larger. Reflash the image, then power-cycle the board. If you flashed with a raw writer, verify the write completed without errors.

### Identifier not appearing yet

The board is powered and online, but the device identifier has not shown up.

**Cause:** first-boot commissioning is still running. The first boot starts Docker, registers the Mender client, and enrolls the device certificate before it can derive and display the identifier.

**Solution:** wait for the first boot to finish, which can take several minutes on a fresh card. Confirm the board has network access. Once commissioning reaches the registration point, the identifier appears.

### Device was already commissioned

The board was onboarded before and you need to register it again, or commissioning will not restart.

**Cause:** the device already holds commissioning state from a previous onboarding.

**Solution:** reflash the image to reset the device. The device identifier is derived from the board's hardware, so it stays the same across reflashes — re-registering the same identifier is expected.

### WiFi not connecting

A Raspberry Pi board does not join the WiFi network after flashing.

**Cause:** WiFi is available only on Raspberry Pi boards, and the regulatory domain (country) must match the network. NanoPi and Beckhoff CX boards are Ethernet-only and have no WiFi.

**Solution:** set the WiFi SSID, passphrase, and country during the device's first-login commissioning prompt (see [onboarding](/edge-gateway/onboarding)). Make sure the country matches the band your access point uses. If the board is not a Raspberry Pi, connect it by Ethernet instead.

## Dashboard Deployment Issues

### Deployment stuck while installing software

The wizard shows the deployment in progress but it does not complete.

**Cause:** a service on the device has not started, or the device lost connectivity to VION Cloud.

**Solution:** the Dashboard polls for deployment status and times out after a window, then offers **Retry**. On the device, check that the core services are running:

```bash
sudo systemctl status mender-authd
sudo systemctl status mender-updated
sudo systemctl status docker
sudo docker ps
```

Confirm the device can reach VION Cloud:

```bash
curl -I https://api.vion.swiss
```

If all services are running, click **Retry** in the wizard.

### Gateway shows as offline after successful onboarding

The gateway connected during onboarding but later reports offline.

**Cause:** Mesh is not running, or the device certificate is no longer valid.

**Solution:** verify the Mesh container is running and inspect its logs:

```bash
sudo docker ps | grep mesh
sudo docker logs mesh
```

Confirm the device certificate is present and valid, and that the device can reach the VION Cloud broker.

## Network Requirements

The edge gateway needs outbound HTTPS access to VION Cloud and the container registry. All connections are outbound — no inbound ports need to be opened.

| Service | Purpose |
|---------|---------|
| VION Cloud API | REST API and commissioning |
| VION Cloud message broker | Real-time data sync over MQTT/TLS |
| Mender server | Over-the-air updates |
| VION certificate authority | Device certificate issuance and renewal |
| Container registry | Container images |

The exact hostnames for each environment are shown by the Dashboard and configured into the image. The certificate authority is the platform's Step CA; the Mender server is reachable per environment.

## Log Locations

| Component | How to access logs |
|-----------|-------------------|
| Mender | `sudo journalctl -u mender-authd -u mender-updated` |
| Docker | `sudo journalctl -u docker` |
| Mesh | `sudo docker logs mesh` |
| Dale runtime | `sudo docker logs dale` |
| All containers | `sudo docker ps`, then `sudo docker logs <name>` |
