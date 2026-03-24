---
title: Integration Examples
description: Practical curl examples for common VION Cloud API operations.
---

# Integration Examples

These examples show common API operations using `curl`. All examples assume you have an access token (see [Authentication](/cloud-api/authentication)).

For the full API reference, see the [Scalar API Documentation](https://cloudapi.test.ecocoa.ch/scalar/v1).

```bash
# Set these for the examples below
TOKEN="<your-access-token>"
API="https://cloudapi.test.ecocoa.ch"
TENANT_ID="<your-tenant-id>"
```

::: tip Finding Your IDs
Call `GET /Me` to see your tenant and integrator memberships with their IDs:
```bash
curl -H "Authorization: Bearer $TOKEN" $API/Me
```
:::

## Get All Services

Retrieve the complete service topology for a tenant — all services, properties, measuring points, and their current values:

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

Subscribe to receive real-time property value changes via MQTT:

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

→ **[Scalar API Reference](https://cloudapi.test.ecocoa.ch/scalar/v1)**
