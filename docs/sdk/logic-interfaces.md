---
title: Logic Interfaces
description: Connect logic blocks through interfaces, contracts, and bindings. Commands, request/response, and state updates flow between implementations wired together in the dashboard.
---

# Logic Interfaces

logic interfaces are the communication channels between logic blocks. They are defined as C# interfaces, and connections between them are configured at design time in the dashboard. Each interface declares what messages it can send or receive, enabling blocks to collaborate without direct references to one another.

## What are Logic Interfaces?

A logic interface is a C# interface that a logic block implements (or composes) to declare a communication endpoint. When two blocks implement complementary interfaces, the dashboard allows you to wire them together so messages can flow between them.

Key characteristics:

- **Defined as C# interfaces** attached to logic blocks
- **Connected at configuration time** in the dashboard (not in code)
- **Identified at runtime** by an `InterfaceId` that the framework provides
- **Three message patterns**: Commands, Request/Response, and State Updates

```mermaid
graph LR
    subgraph CMD["Command (1:1)"]
        A1["Block A"] -->|"SendCommand"| B1["Block B"]
    end
    subgraph RR["Request/Response (1:1)"]
        A2["Block A"] -->|"SendRequest"| B2["Block B"]
        B2 -.->|"Response"| A2
    end
    subgraph SU["State Update (1:N)"]
        A3["Block A"] -->|"SendStateUpdate"| B3["Block B"]
        A3 -->|"SendStateUpdate"| C3["Block C"]
    end
```

## Two Concepts, One Family

The interface family separates two distinct concerns:

| Attribute | Applies To | Purpose |
|-----------|------------|---------|
| `[LogicBlockContract]` | A static class | Defines the message catalog that flows between two interfaces. |
| `[LogicBlockInterfaceBinding]` | A class or property | Metadata for an implementation — identifier, display name, tags, and link multiplicity. |

The first defines the message vocabulary. The second annotates an existing implementation and declares how many counterparts that role expects to be wired to.

## Contracts

A **contract** groups related messages that travel between two interfaces. Contracts declare the direction of communication and contain one or more message definitions.

Use `[LogicBlockContract]` on a static class to define a contract. `BetweenInterface` and `AndInterface` name the two interfaces, and `Direction` specifies which way messages flow.

```csharp
[LogicBlockContract(BetweenInterface = "IToggler",
                    AndInterface = "IToggleable",
                    Direction = ContractDirection.BetweenToAnd)]
public static class Toggling
{
    [StateUpdate(From = "IToggler", To = "IToggleable")]
    public readonly record struct TogglePressed;

    [StateUpdate(From = "IToggler", To = "IToggleable")]
    public readonly record struct ToggleReleased;
}
```

| Field | Description |
|-------|-------------|
| `BetweenInterface` (required) | The first interface in the contract. |
| `AndInterface` (required) | The second interface in the contract. |
| `Direction` | A `ContractDirection` value: `BetweenToAnd`, `AndToBetween`, or `Bidirectional`. |
| `BetweenDefaultName` | Optional display name for the `Between` side in the dashboard. |
| `AndDefaultName` | Optional display name for the `And` side in the dashboard. |

Messages inside the contract are annotated with one of three attributes: `[Command]`, `[RequestResponse]`, or `[StateUpdate]`.

## Commands (Fire-and-Forget)

A **command** is a one-way message sent from one block to a specific connected block. The sender does not expect a reply.

### Declaring a Command

Inside a contract, decorate a message with `[Command]`:

```csharp
[LogicBlockContract(BetweenInterface = "IPingService",
                    AndInterface = "IPingReceiver",
                    Direction = ContractDirection.BetweenToAnd)]
public static class PingContract
{
    [Command(From = "IPingService", To = "IPingReceiver")]
    public readonly record struct Ping(string Payload);
}
```

### Sending a Command

The sender calls `this.SendCommand` with the target interface ID and the message:

```csharp
this.SendCommand(targetInterfaceId, new PingContract.Ping("hello"));
```

### Receiving a Command

The receiver implements `HandleCommand<TMessage>`:

```csharp
public void HandleCommand(PingContract.Ping message)
{
    Logger.LogInformation("Received ping: {Payload}", message.Payload);
}
```

## Request/Response

A **request/response** exchange is a synchronous-style query. The sender issues a request to a specific connected block and later receives a typed response.

### Declaring a Request/Response

Use `[RequestResponse]`, specifying the response type:

```csharp
[LogicBlockContract(BetweenInterface = "IPinger",
                    AndInterface = "IPonger",
                    Direction = ContractDirection.BetweenToAnd)]
public static class PingPongContract
{
    [RequestResponse(From = "IPinger", To = "IPonger",
                     ResponseType = typeof(Pong))]
    public readonly record struct Ping(string Payload);

    public readonly record struct Pong(string Reply);
}
```

### Sending a Request

The sender calls `this.SendRequest` and implements `HandleResponse` to receive the reply:

```csharp
// Send the request.
this.SendRequest(pongerInterfaceId, new PingPongContract.Ping("ping!"));

// Handle the response when it arrives.
public void HandleResponse(InterfaceId sender, PingPongContract.Pong response)
{
    Logger.LogInformation("Got pong: {Reply}", response.Reply);
}
```

### Handling a Request

The responder implements `HandleRequest<TRequest>` and returns the response directly:

```csharp
public PingPongContract.Pong HandleRequest(PingPongContract.Ping request)
{
    return new PingPongContract.Pong($"pong for {request.Payload}");
}
```

## State Updates (Broadcast)

A **state update** is a one-to-many notification. The sender broadcasts a message to all blocks connected through that interface.

### Declaring a State Update

Use `[StateUpdate]`:

```csharp
[LogicBlockContract(BetweenInterface = "IToggler",
                    AndInterface = "IToggleable",
                    Direction = ContractDirection.BetweenToAnd)]
public static class Toggling
{
    [StateUpdate(From = "IToggler", To = "IToggleable")]
    public readonly record struct TogglePressed;

    [StateUpdate(From = "IToggler", To = "IToggleable")]
    public readonly record struct ToggleReleased;
}
```

### Sending a State Update

The sender calls `this.SendStateUpdate`. This broadcasts the message to **all** blocks connected through the interface:

```csharp
this.SendStateUpdate(new Toggling.TogglePressed());
```

### Receiving a State Update

The receiver implements `HandleStateUpdate` and receives the sender's `InterfaceId`:

```csharp
public void HandleStateUpdate(InterfaceId sender, Toggling.TogglePressed message)
{
    Logger.LogInformation("Toggle pressed by {Sender}", sender);
    IsOn = true;
}

public void HandleStateUpdate(InterfaceId sender, Toggling.ToggleReleased message)
{
    Logger.LogInformation("Toggle released by {Sender}", sender);
    IsOn = false;
}
```

## Interface Bindings

In the simplest case, a logic block implements an interface via plain C# inheritance and the framework discovers the binding automatically:

```csharp
[LogicBlock(Name = "Toggle Switch", Icon = "toggle-line")]
public class ToggleSwitch : LogicBlockBase, IToggler
{
    // The framework registers an IToggler binding from the class declaration alone.
}
```

`[LogicBlockInterfaceBinding]` is **optional metadata** for an existing implementation. Use it when you need to override identification or labelling, or when the implementation lives on a property whose type implements the interface (a composed sub-component — e.g., a charging station with multiple charging-point children):

```csharp
// Optional: override the binding's identifier or display name on the class.
[LogicBlock(Name = "Toggle Switch", Icon = "toggle-line")]
[LogicBlockInterfaceBinding(typeof(IToggler), DefaultName = "Switch")]
public class ToggleSwitch : LogicBlockBase, IToggler
{
    // ...
}

// Property-target: an inner property holds the implementation.
[LogicBlock(Name = "Charging Station")]
public class ChargingStation : LogicBlockBase
{
    [LogicBlockInterfaceBinding(typeof(IChargingPoint), DefaultName = "Point 1")]
    public ChargingPoint Point1 { get; }

    [LogicBlockInterfaceBinding(typeof(IChargingPoint), DefaultName = "Point 2")]
    public ChargingPoint Point2 { get; }
}
```

| Field | Description |
|-------|-------------|
| `ForInterface` (constructor) | The interface this binding applies to. Required, passed via `typeof(IFoo)`. |
| `Identifier` | Stable identifier used by the dashboard to match wiring across upgrades. |
| `DefaultName` | Display name in the dashboard. Defaults to the C# member name. |
| `Tags` | Optional string tags for grouping or filtering. |
| `Multiplicity` | A `LinkMultiplicity` value — how many counterparts this role expects to be wired to. Defaults to `ZeroOrMore`. See [Link Multiplicity](#link-multiplicity). |

`AllowMultiple = true` — a class or property type that implements several interfaces gets one `[LogicBlockInterfaceBinding]` per interface.

## Link Multiplicity

A logic block expresses a relationship by implementing the C# interface for a role and the contract that targets it — there is no separate "dependency" attribute. `[LogicBlockInterfaceBinding]` then optionally annotates that role with how many counterparts it expects to be wired to: its **link multiplicity**.

Set `Multiplicity` to a `LinkMultiplicity` value on the binding. Multiplicity is per-implementer — the same contract role can be optional on one block and required on another:

```csharp
[LogicBlock(Name = "Toggle Light", Icon = "lightbulb-line")]
[LogicBlockInterfaceBinding(typeof(IToggleable),
                            DefaultName = "Switch Input",
                            Multiplicity = LinkMultiplicity.ExactlyOne)]
public class ToggleLight : LogicBlockBase, IToggleable
{
    // Implements the IToggleable role and expects exactly one IToggler wired to it.
}
```

`LinkMultiplicity` has four values:

| Value | Meaning |
|-------|---------|
| `ExactlyOne` | Required and single — exactly one counterpart must be wired (1..1). |
| `ZeroOrOne` | Optional and single — at most one counterpart (0..1). |
| `OneOrMore` | Required and many — at least one counterpart (1..n). |
| `ZeroOrMore` | Optional and many — any number, including none (0..n). The default. |

`ZeroOrMore` is the default, so a binding without an explicit `Multiplicity` places no constraint — the same behaviour as before multiplicity existed. Set a stricter value only where the logic genuinely depends on it; a forgotten annotation never wedges a configuration.

The same `LinkMultiplicity` vocabulary applies to hardware and external-service bindings — see [Hardware & External Services](/sdk/services#link-multiplicity).

### Declared, Not Enforced

Multiplicity is declarative metadata. The Dale SDK and runtime do **not** validate or enforce it — a logic block always receives whatever wiring it is given, and the runtime resolves linked peers exactly as before. The constraint is a forward contract for the rest of the platform: VION Cloud validates it when a logic configuration is saved or activated, and the dashboard logic editor uses it to guide wiring (required-slot prompts, single- versus multi-select). Declaring `ExactlyOne` documents intent and lets the platform catch a missing or ambiguous link before deployment; it does not cause the SDK to throw at runtime.

## Complete Example

Two logic blocks communicating through a toggle interface. The `ToggleSwitch` block sends state updates, and the `ToggleLight` block receives them.

### The Contract

```csharp
[LogicBlockContract(BetweenInterface = "IToggler",
                    AndInterface = "IToggleable",
                    Direction = ContractDirection.BetweenToAnd)]
public static class Toggling
{
    [StateUpdate(From = "IToggler", To = "IToggleable")]
    public readonly record struct TogglePressed;

    [StateUpdate(From = "IToggler", To = "IToggleable")]
    public readonly record struct ToggleReleased;
}
```

### The Sender: ToggleSwitch

```csharp
[LogicBlock(Name = "Toggle Switch", Icon = "toggle-line")]
public class ToggleSwitch : LogicBlockBase, IToggler
{
    public ToggleSwitch(ILogger logger) : base(logger) { }

    [ServiceProperty(Title = "Pressed")]
    [Presentation(Group = PropertyGroup.Status)]
    public bool Pressed { get; private set; }

    protected override void Ready()
    {
        // React to an external input (e.g., a digital I/O service).
    }

    private void OnPressed()
    {
        Pressed = true;
        this.SendStateUpdate(new Toggling.TogglePressed());
    }

    private void OnReleased()
    {
        Pressed = false;
        this.SendStateUpdate(new Toggling.ToggleReleased());
    }
}
```

### The Receiver: ToggleLight

```csharp
[LogicBlock(Name = "Toggle Light", Icon = "lightbulb-line")]
public class ToggleLight : LogicBlockBase, IToggleable
{
    public ToggleLight(ILogger logger) : base(logger) { }

    [ServiceProperty(Title = "Light On")]
    [Presentation(Group = PropertyGroup.Status, Importance = Importance.Primary)]
    public bool IsOn { get; private set; }

    protected override void Ready() { }

    public void HandleStateUpdate(InterfaceId sender, Toggling.TogglePressed message)
    {
        IsOn = true;
    }

    public void HandleStateUpdate(InterfaceId sender, Toggling.ToggleReleased message)
    {
        IsOn = false;
    }
}
```

When these two blocks are wired in the dashboard (the `IToggler` output of `ToggleSwitch` connected to the `IToggleable` input of `ToggleLight`), pressing the switch turns the light on, releasing it turns the light off. Because state updates are broadcast, a single `ToggleSwitch` can drive multiple `ToggleLight` blocks at once.
