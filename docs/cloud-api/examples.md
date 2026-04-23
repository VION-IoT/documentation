---
title: Integration Examples
description: Practical curl examples for common VION Cloud API operations.
---

# Integration Examples

These examples show common API operations using `curl`. All examples assume you have an access token (see [Authentication](/cloud-api/authentication)).

For the full API reference, see the [Scalar API Documentation](https://api.vion.swiss/scalar).

```bash
# Set these for the examples below
TOKEN="<your-access-token>"
API="https://api.vion.swiss"
TENANT_ID="<your-tenant-id>"
```

::: tip Finding Your IDs
Call `GET /Me` to see your tenant and integrator memberships with their IDs:
```bash
curl -H "Authorization: Bearer $TOKEN" $API/Me
```
:::

## Get All Services

Retrieve the complete service topology for a tenant — all services, properties, and measuring points:

```bash
curl -H "Authorization: Bearer $TOKEN" \
  $API/Tenant/$TENANT_ID/Services
```

The response includes services grouped by edge gateway, with properties and measuring points nested under each service.

## Set a Property Value

Set a property on a specific service. You need the edge gateway ID, service provider identifier, service identifier, and property identifier:

```bash
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "value": 22.5 }' \
  "$API/Tenant/$TENANT_ID/Services/{edgeGatewayId}/{serviceProviderIdentifier}/{serviceIdentifier}/property/{propertyIdentifier}"
```

The value type must match the property type defined in the logic block (number, boolean, string, or enum).

## Subscribe to Property Updates

Subscribing tells the edge gateway to start publishing property values to the cloud MQTT broker. This is a two-step process:

**Step 1: Subscribe via REST API**

This triggers the edge gateway to begin sending updates for the specified properties:

```bash
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "subscriptions": [
      {
        "edgeGatewayId": "<gateway-id>",
        "serviceProviderIdentifier": "<sp-id>",
        "serviceIdentifier": "<service-id>",
        "propertyIdentifiers": ["Temperature", "Humidity"]
      }
    ]
  }' \
  "$API/Tenant/$TENANT_ID/Services/subscribeProperties"
```

**Step 2: Connect to the MQTT broker**

To receive the updates, connect an MQTT 5.0 client to the cloud broker and subscribe to the property state topics. Each service property includes a `topic` field in the API response that tells you exactly which MQTT topic to subscribe to.

Here is a minimal example using [mqtt.js](https://github.com/mqttjs/MQTT.js):

```js
import mqtt from "mqtt";

const client = mqtt.connect("wss://ws.vion.swiss:443", {
  protocolVersion: 5,
  username: "",
  password: TOKEN, // JWT access token from authentication
});

// Topic from the Services API response (ServiceProperty.topic)
const topic =
  "v1/{env}/{tenantId}/{edgeGatewayId}/{serviceProviderIdentifier}/{serviceIdentifier}/cloud/sw/properties/state/";

client.on("connect", () => {
  client.subscribe(topic);
});

client.on("message", (topic, message, packet) => {
  const schema = packet.properties?.userProperties?.schema;
  if (schema === "PropertiesStatePayload") {
    const { propertiesState } = JSON.parse(message.toString());
    // propertiesState: [{ propertyIdentifier: "Temperature", value: 22.5 }, ...]
    console.log(propertiesState);
  }
});
```

## Query Measuring Point Data

Retrieve time-series data for measuring points within a time range:

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "$API/Tenant/$TENANT_ID/MeasuringPoints/data?\
timeRangeStart=2026-03-01T00:00:00Z&\
timeRangeEnd=2026-03-24T00:00:00Z&\
edgeGatewayIds={gatewayId}&\
serviceProviderIdentifiers={spId}&\
serviceIdentifiers={serviceId}&\
measuringPointIdentifiers=Power,Energy"
```

## List Projects

```bash
curl -H "Authorization: Bearer $TOKEN" \
  $API/Tenant/$TENANT_ID/Projects
```

## List Logic Configurations

```bash
curl -H "Authorization: Bearer $TOKEN" \
  $API/Tenant/$TENANT_ID/LogicConfigurations
```

## Full API Reference

These examples cover the most common operations. For the complete API with all endpoints, request/response schemas, and interactive testing:

→ **[Scalar API Reference](https://api.vion.swiss/scalar)**
