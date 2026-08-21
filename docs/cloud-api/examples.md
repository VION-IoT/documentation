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

Subscribing tells the edge gateway to start publishing property values to the cloud MQTT broker. It takes two steps, and the MQTT half comes first: the cloud publishes each property's current value the moment it registers your subscription, and that value is lost if your client is not listening on the topic yet.

The snippets below are the summary. For a version of this flow you can run instead of read, see [Minimal Client](/cloud-api/minimal-client).

**Step 1: Connect to the MQTT broker and subscribe**

Connect an MQTT 5.0 client to the cloud broker and subscribe to the property state topics. Each service property includes a `topic` field in the Services response that tells you exactly which topic to subscribe to — use that value; a topic built by hand does not match.

Two connect options decide whether this works. The `clientId` must be the same string you send as `subscriberId` in step 2, and it must be your identity provider user ID, an underscore, six alphanumeric characters and a closing underscore; any other value connects and then has its subscription refused. The last will is what tears the subscription down when your client goes away — without it the edge gateway keeps publishing after you close the tab.

Here is a minimal example using [mqtt.js](https://github.com/mqttjs/MQTT.js):

```js
import mqtt from "mqtt";

// identityProviderUserId comes from GET /Me. The same string is the subscriberId in step 2.
const subscriberId = `${identityProviderUserId}_${randomSixAlphanumeric}_`;

const client = mqtt.connect("wss://ws.vion.swiss/ws", {
  clientId: subscriberId,
  protocolVersion: 5,
  username: "",
  password: TOKEN, // JWT access token from authentication
  will: {
    topic: `cloud/subscriber/lastWill/${identityProviderUserId}/${subscriberId}`,
    payload: "",
    qos: 1,
  },
});

// From the Services API response (ServiceProperty.topic) — never assembled by hand.
const topic = property.topic;

client.on("connect", () => {
  // Step 2 runs in the callback, once the broker has acknowledged the subscription.
  client.subscribe(topic, registerSubscription);
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

**Step 2: Register the subscription via REST API**

This triggers the edge gateway to begin sending updates for the specified properties. `propertyIdentifier` is singular — one entry per property:

```bash
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "subscriberId": "<identityProviderUserId>_<six-alphanumeric>_",
    "properties": [
      {
        "edgeGatewayId": "<gateway-id>",
        "serviceProviderIdentifier": "<sp-id>",
        "serviceIdentifier": "<service-id>",
        "propertyIdentifier": "Temperature"
      },
      {
        "edgeGatewayId": "<gateway-id>",
        "serviceProviderIdentifier": "<sp-id>",
        "serviceIdentifier": "<service-id>",
        "propertyIdentifier": "Humidity"
      }
    ]
  }' \
  "$API/Tenant/$TENANT_ID/Services/subscribeProperties"
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

## Share a Library with Another Integrator

Logic block libraries are Private by default. To grant one of your libraries to another integrator, post to the grants endpoint with the library ID and the grantee integrator's slug. These operations are keyed on your integrator ID:

```bash
INTEGRATOR_ID="<your-integrator-id>"
```

Create a grant from your integrator to the partner integrator (the grantee is named by its globally unique slug, not its name):

```bash
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "logicBlockLibraryId": "<library-id>",
    "granteeIntegratorSlug": "<partner-slug>"
  }' \
  "$API/Integrator/$INTEGRATOR_ID/LogicBlockLibraryGrants"
```

List the grants you have made on your libraries:

```bash
curl -H "Authorization: Bearer $TOKEN" \
  "$API/Integrator/$INTEGRATOR_ID/LogicBlockLibraryGrants"
```

Revoke a grant by its ID:

```bash
curl -X DELETE \
  -H "Authorization: Bearer $TOKEN" \
  "$API/Integrator/$INTEGRATOR_ID/LogicBlockLibraryGrants/{grantId}"
```

To make a library Public instead of sharing it with a single integrator, send a `PUT` with `"visibility": "Public"` (the `name` and `description` fields are required):

```bash
curl -X PUT \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Library",
    "description": "Smart building blocks",
    "visibility": "Public"
  }' \
  "$API/Integrator/$INTEGRATOR_ID/LogicBlockLibraries/{libraryId}"
```

Revoking a grant or turning Public off is prospective: running configurations keep working, and the next activation referencing a now-invisible library is blocked.

## Full API Reference

These examples cover the most common operations. For the complete API with all endpoints, request/response schemas, and interactive testing:

→ **[Scalar API Reference](https://api.vion.swiss/scalar)**
