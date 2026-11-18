---
title: Stability and Changes
description: What each Cloud API stability level promises, how a deprecation is announced, and where to read and follow what changed.
---

# Stability and Changes

Every Cloud API operation is stable or beta. This page states what each level promises, where a deprecation shows on the API itself, how to write a client that keeps working across change, and where to read and follow what changed.

## Stability Levels

| Level | What it promises |
|-------|------------------|
| `stable` | The operation changes only additively, or by a deprecation that publishes the date it ends |
| `beta` | The operation changes without notice |

An operation is beta unless it is declared stable. A beta operation can become stable; a stable one stays stable. Read an operation's level from the API:

- in the [OpenAPI document](https://api.vion.swiss/openapi/v1.json), as `x-stability-level`, `stable` or `beta`, on every operation;
- on the operation's row of `GET /capabilities`, as `stability`, `Stable` or `Beta`.

## How a Stable Operation Changes

A stable operation changes in two ways:

- **It gains something**, for example an optional member in an answer, an enum value or a kind of a union. A [tolerant client](#write-a-tolerant-client) keeps working without a change.
- **It, or a part of it, is deprecated, then removed.** The deprecation publishes its sunset, the first day the deprecated part may be gone, and nothing is removed before it. The sunset is at least 8 weeks (56 days) after the day the deprecation began.

There is one exception. A break that cannot wait for a sunset, for example one that closes a security hole, is made without one. It is published in the [changelog](#follow-the-changelog) with its reason, and it is announced.

### What the Document Cannot Show

A change in what a value means, or a different status code for the same case, leaves the OpenAPI document as it was. Such a change is announced only in the changelog.

## Where a Deprecation Shows

A deprecation shows in three places on the API itself:

| Where | What it carries |
|-------|-----------------|
| OpenAPI document | `deprecated: true` and `x-sunset`, the sunset as an ISO date, on a deprecated operation or a deprecated member of a body |
| `GET /capabilities` | `deprecation` on the operation's row: `since`, `sunset` and `replacedBy`, the operation to call instead or `null`. It is `null` on an operation that is not deprecated |
| Responses | The `Deprecation`, `Sunset` and `Link` headers, on every response of a deprecated operation |

For an operation deprecated on 2027-01-04 with its sunset on 2027-03-01, every response carries:

```text
Deprecation: @1799020800
Sunset: Mon, 01 Mar 2027 00:00:00 GMT
Link: </changelog>; rel="deprecation"
```

- `Deprecation` is `@` and the first instant of the day the deprecation began, in Unix seconds.
- `Sunset` is the first instant of the sunset, as an HTTP date.
- `Link` names the changelog, whose entry says what to do instead.

The headers are on a response that refuses your permissions too. A request refused before that — a `401`, a path that matches no operation — carries none of them. A deprecated member of a body sends no header at all: read it from the OpenAPI document.

## Write a Tolerant Client

A client that reads answers tolerantly keeps working across every additive change to a stable operation:

- Ignore a member of an answer you do not know. Turn off any setting of your JSON library that fails on an unknown member.
- Handle an enum value you do not know as an unknown case, not as an error.
- Skip a kind of a union you do not know.
- Log the `Deprecation` and `Sunset` headers whenever a response carries them, so a deprecation reaches you even when nobody reads the changelog.
- Move off a deprecated operation or member before its sunset.

## Follow the Changelog

The changelog lists what changed, one heading per release, newest first, each entry under its kind: Added, Changed, Deprecated, Removed, Fixed or Security. An entry states its own change and what a client does about it; what the levels and a deprecation promise is stated on this page. The Cloud API serves it without a token:

| Route | What it serves |
|-------|----------------|
| [`/changelog`](https://api.vion.swiss/changelog) | A page, each release anchored by its version |
| [`/changelog/v1.json`](https://api.vion.swiss/changelog/v1.json) | The same releases and entries as JSON |
| [`/changelog/v1.atom`](https://api.vion.swiss/changelog/v1.atom) | An Atom feed, one feed entry per changelog entry, for a feed reader or a chat tool's feed integration |

Each environment lists what it has deployed. The [test environment's changelog](https://api.test.vion.swiss/changelog) shows what is coming before production has it.

### Notification

A release is announced when it carries an entry that deprecates or removes something of a stable operation, an entry that makes a break under the exception above, or an entry that removes an operation. VION can mark any other entry to be announced too.

Everyone who may manage the service accounts of a tenant or an integrator that has at least one service account receives one notification per announced release, in their inbox and by mail. Each recipient can switch the mail off.

## Next Steps

- [Integration Examples](/cloud-api/examples) — common Cloud API operations as `curl` and JavaScript.
- [API Reference](/cloud-api/reference) — every operation, with its request and answer schemas.
