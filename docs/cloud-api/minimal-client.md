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
| Take the subscriber ID from `POST /me/subscribers`, and use that same string as the MQTT client ID | any other value connects, then has its subscription refused, which closes the connection |
| Register the `lastWill` that answer names, at its `qos` | without one, VION Cloud keeps forwarding values after your client disconnects: the last will is what tears the subscription down |
| Subscribe at the answer's `subscribeQos` | a subscription at any other QoS is refused exactly like a wrong subscriber ID, and looks identical from the client |
| Subscribe on MQTT **before** calling `subscribeProperties` | you miss the initial value and see nothing until the property next changes on its own |
| Connect to the answer's `brokerUrl` with its `protocolVersion`, an empty username and the access token as the password, and set the password again on every reconnect | a reconnect after the token expired presents the expired token and is refused |
| Read a message only when its `schema` user property is `PropertiesStatePayload` | a client that skips the check parses whatever arrives on the topic as property state |
| Take each service's topic from its row in the services list, `meta.topics` under `tenant.serviceProperty.state`, never build it — and skip a service that has none there yet | a hand-built topic does not match the one values are published on, and a subscription the broker refuses closes the connection |

`POST /me/subscribers` answers a new subscriber on every call and stores nothing: call it once per connection, and keep its answer for that connection's reconnects. A token with no broker user to connect as is answered `409`.

A clean MQTT `DISCONNECT` tells the broker *not* to fire the will, so a client that exits politely leaves its registration standing and the edge gateway publishing to nobody. Publish an empty message to the last will topic yourself before disconnecting; the example's **Sign out** does that, then discards the token.

## The order that matters

1. `POST /me/subscribers` for a subscriber.
2. Connect to the MQTT broker at its `brokerUrl`, with its last will.
3. Subscribe to the topics, and wait for the broker to acknowledge them.
4. Only then `POST` to `subscribeProperties`.

Inverting steps 3 and 4 still returns `200 OK`, which is why the order is worth stating: the failure is a silent empty screen, not an error. The same order applies after every reconnect — the last will has by then removed the registration, so a reconnecting client has to re-subscribe and re-register, in that order.

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
