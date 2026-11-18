---
title: Stability and Changes
description: Which Cloud API operations you can build on, what changes in them, and how you hear about a change before it reaches your client.
---

# Stability and Changes

This page shows which Cloud API operations you can build on, what changes in them without notice, and how you hear about the rest. What changed is in the [changelog](https://api.vion.swiss/changelog) and its [Atom feed](https://api.vion.swiss/changelog/v1.atom).

## Stable and Beta

| Level | What to expect |
|-------|----------------|
| Stable | Safe to build on. Changes by additions, or by a deprecation announced with a date |
| Beta | Changes in any release, without notice |

An operation is beta until it is declared stable, and stays stable once it is. Its level is `x-stability-level` in the [OpenAPI document](https://api.vion.swiss/openapi/v1.json) and `stability` on its `GET /capabilities` row.

## What Changes in a Stable Operation

| Change | Notice | What you do |
|--------|--------|-------------|
| A new response member, enum value or union kind | None | Nothing, if your client [tolerates additions](#tolerate-additions) |
| A new operation | None | Nothing |
| Removing an operation, a parameter or a response member | A deprecation, at least 8 weeks before its sunset | Move off it before the sunset |
| A change the OpenAPI document cannot show, such as what a value means or which status code answers | A changelog entry | Read the entry |
| An urgent fix, such as closing a security hole | A changelog entry with its reason, without a sunset | Read the entry |

## Tolerate Additions

| Do | Don't |
|----|-------|
| Ignore a response member you don't know | Fail on an unknown member |
| Map an enum value you don't know to a fallback | Throw on an unknown enum value |
| Skip a union kind you don't know | Reject the whole response |

A client generated from the OpenAPI document needs the same: check that its generator accepts unknown members and enum values.

## Where a Deprecation Shows

| Where | What it carries |
|-------|-----------------|
| OpenAPI document | `deprecated: true` and the sunset as an ISO date in `x-sunset`, on the operation or member |
| `GET /capabilities` | `deprecation` on the operation's row: `since`, `sunset` and `replacedBy`, the operation to call instead |
| Response headers | The three headers below, on every response of a deprecated operation |
| [Changelog](https://api.vion.swiss/changelog) | An entry that says what to use instead |

| Header | Value | Example |
|--------|-------|---------|
| `Deprecation` | `@` and the day the deprecation began, in Unix seconds | `@1799020800` |
| `Sunset` | The first day the operation may be gone, as an HTTP date | `Mon, 01 Mar 2027 00:00:00 GMT` |
| `Link` | The changelog | `</changelog>; rel="deprecation"` |

A deprecated member sends no header, and a browser does not let a page's script read these headers.

## Follow the Changelog

The changelog lists every release, newest first, each change with what to do about it. It needs no token:

| Read it as | Address |
|------------|---------|
| A page | [`/changelog`](https://api.vion.swiss/changelog) |
| An Atom feed, for a feed reader or your team's chat | [`/changelog/v1.atom`](https://api.vion.swiss/changelog/v1.atom) |
| JSON, for your own tooling | [`/changelog/v1.json`](https://api.vion.swiss/changelog/v1.json) |

The [test environment's changelog](https://api.test.vion.swiss/changelog) shows what is coming before production has it.

If you manage service accounts for a tenant or an integrator, VION also notifies you, in your inbox and by mail, of a release worth acting on, such as one that deprecates something of a stable operation. You can switch the mail off.

## Next Steps

- [Integration Examples](/cloud-api/examples) — common Cloud API operations as `curl` and JavaScript.
- [API Reference](/cloud-api/reference) — every operation, with its request and response schemas.
