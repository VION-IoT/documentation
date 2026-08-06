---
title: Translations
description: Optional per-language translation of a logic block library's display strings in the VION Cloud, and the identifier rules that decide what a rename costs.
---

# Translations

Translation is optional. A library that ships one language declares its display strings in code — `[LogicBlock(Name = …)]`, `Title`, `Description`, `[EnumLabel]` — and needs nothing else; those strings are what the Dashboard renders.

For more than one language, the VION Cloud translates the same strings per language, without a code change or a re-upload. There is nothing to annotate and no SDK feature to enable.

## Using It

[Upload a library version](/sdk/publishing). The VION Cloud catalogs every translatable string it declares, keyed by the identifiers around it.

The library's Translations tab in the Dashboard, under Integrator → Libraries, shows that catalog as keys against languages. Cells can be edited directly, exported and re-imported as CSV for an external translator, or bulk-filled by AI for review.

Translations apply on the next language switch. Any string without one renders the value compiled into your package.

## What Can Be Translated

| Display string | Keyed by |
|----------------|----------|
| Block name — `[LogicBlock(Name = …)]` | the block's full type name (namespace **and** class) |
| Property and measuring point `Title` and `Description` | the block, its service identifier, and the C# property name |
| `[Presentation(DisplayName = …)]` | the annotated member's title key — a `Title` and a `DisplayName` on one member are one key, not two |
| Contract name — `[ServiceProviderContractBinding(DefaultName = …)]` | the binding's `Identifier`, defaulting to the holding property's name |
| Interface and role names — `[LogicBlockInterfaceBinding]`, `[LogicBlockContract]` | the binding's `Identifier`, defaulting to `{PropertyName}_{InterfaceName}` or the bare interface name |
| Enum labels — `[EnumLabel("…")]` | the enum's short type name and the member name |
| Struct field `Title` and `Description` — `[StructField]` | the struct's short type name and the camelCase field name |
| Custom group labels | the group-key string itself |

`dale list --output json` prints these identifiers, which is how to read them before a rename.

## Rules and Caveats

- Authoring is owner-only — an integrator consuming a shared or public library cannot translate it.
- Renaming any identifier in the table above mints a new key and orphans the translations authored against the old one; they stay visible for manual copy-over, but nothing re-attaches them.
- Editing a display string is not a rename — the key survives, and existing translations keep serving but are flagged outdated.
- Enum members are cataloged exhaustively: a member with no `[EnumLabel]` is translatable too, with its raw C# member name as the source string.
- Well-known `PropertyGroup` keys are translated by the platform — only custom group keys resolve through your library.
- Every key is prefixed with the library's `<PackageId>`, so changing it orphans every translation at once.
- Services, service properties, and measuring points have no identifier override — their C# names are their identifiers.

## Pinning an Identifier

`[ServiceProviderContractBinding]` and `[LogicBlockInterfaceBinding]` accept an explicit `Identifier`, which frees the C# name to change without minting a new key:

```csharp
// Renaming the property from Relay to MainContactor: pinning the old identifier
// leaves the translation key unchanged.
[ServiceProviderContractBinding(Identifier = "Relay", DefaultName = "Main contactor")]
public IDigitalOutput MainContactor { get; private set; } = null!;
```

These are the only two attributes that carry the knob. For the attributes that declare display strings, see [Declarative Presentation](/sdk/declarative-presentation) and [Properties & Measuring Points](/sdk/properties).
