---
title: API Reference
description: Interactive VION Cloud API reference powered by Scalar.
---

# Cloud API Reference

The full VION Cloud API reference is available as an interactive Scalar document:

**→ [Open API Reference (Scalar)](https://cloudapi.vion.swiss/scalar)**

## What You Can Do

Scalar lets you browse all endpoints, see request/response schemas, and make live API calls directly from the browser.

### Authenticate

1. Click the **Authorize** button at the top
2. Sign in with your VION credentials (Keycloak OAuth)
3. You can now make authenticated requests directly from the docs

### Key Endpoint Groups

| Group | Scope | Examples |
|-------|-------|---------|
| **Me** | Common | Get your identity and memberships |
| **Services** | Tenant | List services, set properties, subscribe to changes |
| **Service Providers** | Tenant | View contracts, approve registrations |
| **Projects** | Tenant | Create and manage projects |
| **Logic Configurations** | Tenant | Deploy and activate logic configurations |
| **Measuring Points** | Tenant | Query time-series measurement data |
| **Logic Block Libraries** | Integrator | Manage libraries and versions |
| **Edge Gateways** | Integrator/Tenant | Device management |

### URL Pattern

All endpoints follow the scoped URL pattern described in [Authentication](/cloud-api/authentication#api-url-structure):

```
GET /Tenant/{tenantId}/Services
POST /Integrator/{integratorId}/LogicBlockLibraryVersions
```

For practical examples using `curl`, see [Integration Examples](/cloud-api/examples).
