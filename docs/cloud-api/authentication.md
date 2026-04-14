---
title: Authentication
description: Authenticating with the VION Cloud API using OIDC and Keycloak.
---

# Authentication

The VION Cloud API uses **Keycloak** as its identity provider with OpenID Connect (OIDC). All API calls require a valid Bearer token.

## Getting an Access Token

### Interactive (Authorization Code Flow)

For user-facing applications, use the **Authorization Code Flow with PKCE**:

1. Redirect the user to the Keycloak authorization endpoint
2. User authenticates and grants consent
3. Exchange the authorization code for tokens

```
Authorization URL: https://auth.vion.swiss/realms/vion/protocol/openid-connect/auth
Token URL:         https://auth.vion.swiss/realms/vion/protocol/openid-connect/token
```

| Parameter | Value |
|-----------|-------|
| `client_id` | Your registered client ID |
| `scope` | `openid user_impersonation` |
| `response_type` | `code` |
| `code_challenge_method` | `S256` (PKCE required) |

::: tip
The easiest way to explore the API interactively is through the [Scalar API Reference](https://cloudapi.vion.swiss/scalar/v1), which has built-in OAuth authentication.
:::

### Machine-to-Machine (Client Credentials Flow)

For CI/CD pipelines and service integrations, use the **Client Credentials Flow**:

```bash
curl -X POST https://auth.vion.swiss/realms/vion/protocol/openid-connect/token \
  -d "grant_type=client_credentials" \
  -d "client_id=<your-client-id>" \
  -d "client_secret=<your-client-secret>"
```

Response:
```json
{
  "access_token": "eyJhbGci...",
  "expires_in": 300,
  "token_type": "Bearer"
}
```

### Token Refresh

Access tokens are short-lived. Use the refresh token to get a new one without re-authenticating:

```bash
curl -X POST https://auth.vion.swiss/realms/vion/protocol/openid-connect/token \
  -d "grant_type=refresh_token" \
  -d "client_id=<your-client-id>" \
  -d "refresh_token=<your-refresh-token>"
```

## Using the Token

Include the access token in the `Authorization` header:

```bash
curl -H "Authorization: Bearer <access-token>" \
  https://cloudapi.vion.swiss/Me
```

## API URL Structure

The API uses a scoped URL pattern reflecting the multi-tenancy hierarchy:

| Level | URL Pattern | Example |
|-------|-------------|---------|
| **Common** | `/<controller>` | `GET /Me` |
| **Integrator** | `/Integrator/{integratorId}/<controller>` | `POST /Integrator/{id}/LogicBlockLibraryVersions` |
| **Tenant** | `/Tenant/{tenantId}/<controller>` | `GET /Tenant/{id}/Services` |

Most operational endpoints (services, properties, projects) are at the **Tenant** level.

## Environments

| Environment | Auth URL | API URL |
|-------------|----------|---------|
| Test | `auth.test.vion.swiss` | `cloudapi.test.vion.swiss` |
| Production | `auth.vion.swiss` | `cloudapi.vion.swiss` |
