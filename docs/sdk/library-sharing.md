---
title: Library Visibility & Sharing
description: How logic block library visibility and integrator-to-integrator grants control which integrators can consume a library.
---

# Library Visibility & Sharing

Logic block libraries are owned by the integrator that uploads them, and they are Private by default. There are two orthogonal ways to widen who can use a library: make it Public, or grant it to a specific integrator. Both are managed in the Dashboard under Integrator → Libraries; the [Dale CLI](/sdk/publishing) has no visibility flag.

## Visibility (Private and Public)

Every library starts Private, including those created by `dale upload`. Private means the library is usable only by the owning integrator and by integrators the owner has explicitly granted access to.

To make a library Public, open Integrator → Libraries in the [Dashboard](https://dashboard.vion.swiss/), edit the library, and turn on the Public toggle. A Public library is visible to and usable by every integrator on the platform, regardless of grants. Visibility is owner-set: only the owning integrator can change it.

## Sharing a private library by slug

A grant gives one named integrator access to a single private library, without making it Public. In the Dashboard, open the library's Share library dialog and enter the grantee integrator's slug.

The slug is the integrator's globally unique handle. Integrator names are not unique, so sharing is keyed on the slug rather than the name. The grantee shares its slug with you out of band; you enter it to create the grant. Each grant is a one-directional relationship from the owning integrator to the grantee for one library.

## Consuming a shared or public library

A library you can use but do not own appears in your library list alongside your own libraries, with a provenance label that names the owner:

| Provenance | Meaning |
| --- | --- |
| Public · owner | The owner published the library platform-wide. |
| Shared by owner | The owner granted the library to your integrator. |

The library list also has a Source filter with Owned, Public, and Shared options to narrow the view. You can use the logic blocks from a consumed library in your logic configurations, but you cannot edit, archive, or re-share it — management actions stay with the owner.

## Revoking access

Turning Public off or revoking a grant is prospective. Configurations that are already activated and running keep working, because revocation is not enforced against live edge gateways. Enforcement happens at the next activation: when a tenant activates a logic configuration that still references a library that is no longer visible to its integrator, the activation is blocked with an error naming the affected packages, for example:

```text
The logic configuration references logic block libraries that are not available to this tenant: <package id>. Remove those logic blocks or obtain a grant before activating.
```

To recover, remove the affected logic blocks from the configuration, or obtain a Public publication or a fresh grant for the library, then activate again.

For packaging and uploading libraries, see [Publishing & CI/CD](/sdk/publishing).
