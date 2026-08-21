---
title: Minimal Client
description: A runnable REST + MQTT example client for live service property values.
---

# Minimal Client

Live service property values arrive over MQTT; the Cloud API only registers your interest in them. This page links a single-file example client that runs that flow end to end, and lists the seven things your own client has to get right.

## Run the example

The example is one HTML file with no build step, no framework and no bundler — view its source to see everything it does: <a href="/vion-minimal-client.html" target="_blank" rel="noopener">open the minimal client</a>. It opens in a new tab, so this page stays beside it.

It works down five stages, each printing the exact call it made — method, URL, and either the request body or the MQTT connect options — so you can copy that call into your own client. Nothing is stored: tokens live in the browser tab and are gone on reload.

## The contract

Seven things decide whether a client sees values at all. The example gets each of them right; the table is what to check when your own client sees nothing.

| Rule | What happens when it is wrong |
|------|-------------------------------|
| The subscriber ID is your identity provider user ID, an underscore, six alphanumeric characters and a closing underscore — and the MQTT client ID is that same string | any other value connects, then has its subscription refused, which closes the connection |
| Register a last will on `cloud/subscriber/lastWill/{identityProviderUserId}/{subscriberId}` — the example uses QoS 1 | without one, VION Cloud keeps forwarding values after your client disconnects: the last will is what tears the subscription down |
| Subscribe at QoS 0 | a subscription at QoS 1 is refused exactly like a malformed subscriber ID, and looks identical from the client |
| Subscribe on MQTT **before** calling `subscribeProperties` | you miss the initial value and see nothing until the property next changes on its own |
| Connect with MQTT 5, an empty username and the access token as the password, and set the password again on every reconnect | a reconnect after the token expired presents the expired token and is refused |
| Read a message only when its `schema` user property is `PropertiesStatePayload` | a client that skips the check parses whatever arrives on the topic as property state |
| Take the topic from each property's `topic` field in the Services response, never build it | a hand-built topic does not match the one values are published on |

Your identity provider user ID is the `user.identityProviderUserId` field of `GET /Me`. Read it from there rather than typing it in — it is one half of both the subscriber ID and the last will topic.

A clean MQTT `DISCONNECT` tells the broker *not* to fire the will, so a client that exits politely leaves its registration standing and the edge gateway publishing to nobody. Publish an empty message to the last will topic yourself before disconnecting; the example's **Sign out** does that, then discards the token.

## The order that matters

1. Connect to the MQTT broker at `wss://ws.vion.swiss/ws`, with the last will above.
2. Subscribe to the topics, and wait for the broker to acknowledge them.
3. Only then `POST` to `subscribeProperties`.

Inverting steps 2 and 3 still returns `200 OK`, which is why the order is worth stating: the failure is a silent empty screen, not an error. The same order applies after every reconnect — the last will has by then removed the registration, so a reconnecting client has to re-subscribe and re-register, in that order.

## Getting an access token

The example accepts a token three ways: sign in, a service account client ID and secret, or a token pasted into the page. Pasting has no prerequisites — request one with the client credentials flow described in [Authentication](/cloud-api/authentication):

```bash
curl -X POST https://auth.vion.swiss/realms/vion/protocol/openid-connect/token \
  -d "grant_type=client_credentials" \
  -d "client_id=<your-client-id>" \
  -d "client_secret=<your-client-secret>"
```

One token covers the REST calls, the MQTT connection and the last will topic — but only when its Keycloak client is configured for all three. A working one carries the `cloud-api` and `rabbitmq` audiences and both the `api_access` and `web_mqtt_access` scopes. REST succeeds without the MQTT ones, so a client missing them looks correct until the broker refuses it.

A pasted token cannot be refreshed, so that mode stops working when the token expires. The other two modes refresh before expiry and hand the new token to the broker on the next reconnect. The example's **Force refresh & reconnect** control does both immediately.

## Writing values

A writable property gets a control in the last stage; setting it posts to the property endpoint and the new value comes back on the subscription you already hold. That round trip — writing a value and watching that exact value arrive on your own topic — is the check that your subscription is genuinely yours. Values are validated against the property's schema server-side, so an out-of-range write is rejected rather than applied.

:::warning
The example defaults to the production environment, and writes reach real hardware. Its first write in a page session asks you to confirm the environment, the property and the value; later writes in the same session do not.
:::

## Next steps

- [Integration Examples](/cloud-api/examples) — the same flow as `curl` and mqtt.js snippets, plus the other common Cloud API operations.
- [Authentication](/cloud-api/authentication) — token flows, URL structure and environments.
