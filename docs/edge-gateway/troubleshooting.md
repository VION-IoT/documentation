---
title: Troubleshooting
description: Common issues during edge gateway setup and how to resolve them.
---

# Troubleshooting

## Provisioning Script Issues

### Script fails with "distribution not recognized"

The provisioning script supports Debian-based distributions (Debian, Raspberry Pi OS, Ubuntu). If you see:

```
ERROR: your distribution (alpine) is either not recognized or not supported
```

Make sure you're running a supported OS. See [Supported Devices](/edge-gateway/supported-devices) for requirements.

### Script fails with "already commissioned"

```
Error: already commisioned! device id: aB3xK-Ym9pQ-Rz7wL-nhpClient
```

The script detected an existing device identity from a previous onboarding attempt. If you need to re-provision the device, contact your VION platform administrator to reset the device registration.

### Mender installation fails

If the Mender client installation fails, check:

- **Internet connectivity:** `curl -I https://get.mender.io/`
- **Disk space:** `df -h` (needs at least 500 MB free)
- **Permissions:** the script must run with `sudo`

### Certificate signing retries repeatedly

If the script keeps retrying certificate signing:

- Verify you've entered the Device ID in the Dashboard
- Check DNS resolution: `nslookup cloudapi.test.ecocoa.ch`
- Check time synchronization: `date` (certificates require accurate system time)

Run `sudo timedatectl set-ntp true` to enable NTP if the clock is off.

## Dashboard Deployment Issues

### Deployment stuck at "Software wird installiert"

The Dashboard polls for deployment status every 15 seconds with a 30-minute timeout. If deployment seems stuck:

1. **Check the Mender client** on the device:
   ```bash
   sudo systemctl status mender-authd
   sudo systemctl status mender-updated
   ```

2. **Check Docker** is running:
   ```bash
   sudo systemctl status docker
   sudo docker ps
   ```

3. **Check connectivity** to the VION Cloud:
   ```bash
   curl -I https://cloudapi.test.ecocoa.ch
   ```

4. If all services are running, click **Retry** in the Dashboard wizard.

### Gateway shows as offline after successful onboarding

- Verify the Mesh container is running: `sudo docker ps | grep mesh`
- Check Mesh logs: `sudo docker logs mesh`
- Verify MQTT connectivity to VION Cloud broker
- Check that the device certificate is valid: `step certificate inspect device-cert.pem`

## Network Requirements

The edge gateway needs outbound HTTPS access to the following services:

| Service | URL Pattern | Purpose |
|---------|-------------|---------|
| Cloud API | `cloudapi.*.ecocoa.ch` | REST API, provisioning |
| MQTT Broker | `mqtt.*.ecocoa.ch` | Real-time data sync |
| Mender Server | `mender.*.ecocoa.ch` | OTA updates |
| CA Server | `ca.*.ecocoa.ch` | Certificate management |
| Root CA | `roots.*.ecocoa.ch` | Root certificate |
| Docker Hub | `docker.io` | Container images |

::: tip Firewall Configuration
All connections are outbound only — no inbound ports need to be opened on the edge gateway.
:::

## Log Locations

| Component | How to access logs |
|-----------|-------------------|
| Mender | `sudo journalctl -u mender-authd -u mender-updated` |
| Docker | `sudo journalctl -u docker` |
| Mesh | `sudo docker logs mesh` |
| Dale Runtime | `sudo docker logs dale` |
| All containers | `sudo docker ps` then `sudo docker logs <name>` |
