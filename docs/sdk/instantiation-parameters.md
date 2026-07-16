---
title: Instantiation Parameters & Inclusion Gates
description: Make a logic block's member set config-determined — operators pick [InstantiationParameter] scalars at instantiation time, and [IncludedWhen] gates decide which members the configured instance actually has.
---

# Instantiation Parameters & Inclusion Gates

Most logic blocks expose a fixed set of members. Some devices don't — a charging station presents several charge points, and how many depends on the model. `[InstantiationParameter]` and `[IncludedWhen]` move the decision of *which members a logic block has* from compile time to instantiation time, so one logic block covers a whole device family instead of one class per variant.

The two attributes are a designed pair, both in `Vion.Dale.Sdk.Core`: a parameter is a scalar chosen at instantiation time; an inclusion gate is a predicate over those parameters that decides whether a member is part of the configured instance.

## `InstantiationParameterAttribute`

A parameter is a service property whose value is chosen at instantiation time — stored on the instance, applied before binding, and never settable at runtime:

```csharp
[ServiceProperty(Title = "Charge Points", Minimum = 1, Maximum = 6)]
[InstantiationParameter]
public int ChargePointCount { get; init; } = 1;
```

- **Types** — discrete scalars only: `bool`, `enum`, the integer kinds, and `string`. Not `double`/`float` (an analog value must not drive structure), not structs or arrays, and never `WriteOnly`.
- **Placement** — on a property of the logic-block class itself (own or a shared base), root service only.
- **Recommended shape** — `{ get; init; }`, so the compiler backstops the analyzer that forbids assigning it in block code.

The value is available from `Ready()` onward; the constructor sees only the C# initializer default, so never branch on a parameter there. Per-model behavior is then ordinary C#:

```csharp
protected override void Ready()
{
    _maxStationPowerKw = ChargePointCount * 22;
}
```

A parameter is read-only at runtime — the Dale runtime rejects writes to it. Changing one means re-configuring the instance and re-activating, which recycles the block.

## `IncludedWhenAttribute`

A gate is a predicate over the block's instantiation parameters. When it is **true**, the member is part of the configured instance; when **false**, the member does not exist for that instance — unbound, not wireable, no MQTT topic, and no cloud read-model row. A member with no gate is unconditional, so every block that ships today is unaffected.

```csharp
[LogicBlockInterfaceBinding(typeof(IChargePoint), Multiplicity = LinkMultiplicity.ZeroOrMore)]
public ChargingPoint Point1 { get; }                    // unconditional — every station has one

[LogicBlockInterfaceBinding(typeof(IChargePoint), Multiplicity = LinkMultiplicity.ZeroOrMore)]
[IncludedWhen("ChargePointCount >= 2")]
public ChargingPoint Point2 { get; }

[LogicBlockInterfaceBinding(typeof(IChargePoint), Multiplicity = LinkMultiplicity.ZeroOrMore)]
[IncludedWhen("ChargePointCount >= 3")]
public ChargingPoint Point3 { get; }
```

The predicate uses the same dialect as `VisibleWhen` (see [Predicate Syntax](/sdk/properties#predicate-syntax)), referencing `[InstantiationParameter]` scalars on the same block. It is evaluated strict / fail-closed: an unparseable predicate or a missing parameter value fails the block. Gating a component gates everything the binders derive from it — its interface binding and its whole service.

An enum or string parameter gates with the `in` operator, and conditions compose with `&&`, `||`, and `!`:

```csharp
[LogicBlockInterfaceBinding(typeof(IChargePoint), Multiplicity = LinkMultiplicity.ZeroOrMore)]
[IncludedWhen("Model in ['Duo', 'Max'] && HasAcOutlet")]
public ChargingPoint AcPoint { get; }
```

### Where Gates Go

A gate belongs on a **bound unit** — something that can be wired or published — never on a lone scalar.

| Declaration site | Gateable? | Instead |
|------------------|-----------|---------|
| Interface binding — `[LogicBlockInterfaceBinding]` on a component implementing a `[LogicInterface]` | Yes | — |
| Contract binding — a `[ServiceProviderContractBinding]` property | Yes | null when excluded — see below |
| Service-bearing component — a property whose type carries `[ServiceProperty]`/`[ServiceMeasuringPoint]` members | Yes | — |
| Scalar `[ServiceProperty]` / `[ServiceMeasuringPoint]` | No | it keeps publishing — use `VisibleWhen` for display relevance |
| `[Timer]` method | No | gate in code: `if (ChargePointCount < 3) return;` |
| Class-implemented interface | No | use a property-based interface binding |
| The block class itself | No | the instance is added, or it isn't |

:::warning
An excluded **contract** property (`[ServiceProviderContractBinding]`) is never constructed — it is `null` at runtime. Declare gated contract properties nullable (`IDigitalOutput?`) and null-guard your fan-out. An excluded interface *component* stays non-null but inert.
:::

## `IncludedWhenAttribute` vs `VisibleWhen`

Both take a predicate in the same dialect, but act on different layers. [`VisibleWhen`](/sdk/properties#conditional-visibility) hides a member that still exists everywhere; `[IncludedWhen]` removes it.

| | `[IncludedWhen]` | `VisibleWhen` |
|--|------------------|---------------|
| Controls | whether a member **exists** | whether an existing member is **shown** |
| Layer | structural — instantiation-time | presentation — runtime |
| When the predicate is false | absent everywhere: unbound, not wireable, no topic, no read-model row | still bound, read, written, telemetered, persisted — only its row is hidden |
| References | `[InstantiationParameter]` scalars on the same block | any sibling service property, incl. `Service.Property` |
| Evaluated | once, when the config is applied | reactively, against the live value |
| Change the outcome by | re-configuring and re-activating (recycle) | nothing — it reacts live |
| On a bad predicate | fail-closed — the block won't start | fail-open — the member is shown |

The asymmetry is deliberate: visibility *is* presentation, so `VisibleWhen` is a `[Presentation]` field; inclusion is not, so `[IncludedWhen]` is its own attribute.

## Validation

`dale build` validates gates and parameters for the common mistakes — a predicate that doesn't parse, a reference to a non-parameter, a gate on a member that can't be gated, a mis-declared parameter — so they fail the build, not the deploy. Preview a configured shape with `dale dev`.
