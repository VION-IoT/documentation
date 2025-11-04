#### [Dale.Sdk](index.md 'index')
### [Dale.Sdk.Core](index.md#Dale.Sdk.Core 'Dale.Sdk.Core').[LogicBlockBase](LogicBlockBase.md 'Dale.Sdk.Core.LogicBlockBase')

## LogicBlockBase.InvokeActionMessage Struct

Represents a message that contains an action to be executed in the context of the actor.  
This is not serializable, therefore only usable locally, usually within one actor

```csharp
private readonly struct LogicBlockBase.InvokeActionMessage :
System.IEquatable<Dale.Sdk.Core.LogicBlockBase.InvokeActionMessage>
```

Implements [System.IEquatable&lt;](https://docs.microsoft.com/en-us/dotnet/api/System.IEquatable-1 'System.IEquatable`1')[InvokeActionMessage](LogicBlockBase.InvokeActionMessage.md 'Dale.Sdk.Core.LogicBlockBase.InvokeActionMessage')[&gt;](https://docs.microsoft.com/en-us/dotnet/api/System.IEquatable-1 'System.IEquatable`1')
### Constructors

<a name='Dale.Sdk.Core.LogicBlockBase.InvokeActionMessage.InvokeActionMessage(System.Action)'></a>

## InvokeActionMessage(Action) Constructor

Represents a message that contains an action to be executed in the context of the actor.  
This is not serializable, therefore only usable locally, usually within one actor

```csharp
public InvokeActionMessage(System.Action Action);
```
#### Parameters

<a name='Dale.Sdk.Core.LogicBlockBase.InvokeActionMessage.InvokeActionMessage(System.Action).Action'></a>

`Action` [System.Action](https://docs.microsoft.com/en-us/dotnet/api/System.Action 'System.Action')