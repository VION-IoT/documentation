#### [Dale.Sdk](index.md 'index')
### [Dale.Sdk.Core](index.md#Dale.Sdk.Core 'Dale.Sdk.Core')

## LogicBlockBase Class

```csharp
public abstract class LogicBlockBase : Dale.Sdk.Configuration.Services.NotifyPropertyChangedBase,
Dale.Sdk.Abstractions.IActorReceiver
```

Inheritance [System.Object](https://docs.microsoft.com/en-us/dotnet/api/System.Object 'System.Object') &#129106; [NotifyPropertyChangedBase](NotifyPropertyChangedBase.md 'Dale.Sdk.Configuration.Services.NotifyPropertyChangedBase') &#129106; LogicBlockBase

Derived  
&#8627; [BasicToggleDeclarative](BasicToggleDeclarative.md 'Dale.Sdk.Examples.LogicBlocks.BasicToggleDeclarative')  
&#8627; [BasicToggleFluent](BasicToggleFluent.md 'Dale.Sdk.Examples.LogicBlocks.BasicToggleFluent')  
&#8627; [ComplexLight](ComplexLight.md 'Dale.Sdk.Examples.LogicBlocks.ComplexLight')  
&#8627; [IoTest](IoTest.md 'Dale.Sdk.Examples.LogicBlocks.IoTest')

Implements [Dale.Sdk.Abstractions.IActorReceiver](https://docs.microsoft.com/en-us/dotnet/api/Dale.Sdk.Abstractions.IActorReceiver 'Dale.Sdk.Abstractions.IActorReceiver')
### Methods

<a name='Dale.Sdk.Core.LogicBlockBase.Configure(Dale.Sdk.Configuration.ILogicBlockConfigurationBuilder)'></a>

## LogicBlockBase.Configure(ILogicBlockConfigurationBuilder) Method

Can be overridden to provide custom configurationBuilder logic, e.g. creating interfaces, ios, services and timers  
programmatically with full control

```csharp
protected virtual void Configure(Dale.Sdk.Configuration.ILogicBlockConfigurationBuilder configurationBuilder);
```
#### Parameters

<a name='Dale.Sdk.Core.LogicBlockBase.Configure(Dale.Sdk.Configuration.ILogicBlockConfigurationBuilder).configurationBuilder'></a>

`configurationBuilder` [Dale.Sdk.Configuration.ILogicBlockConfigurationBuilder](https://docs.microsoft.com/en-us/dotnet/api/Dale.Sdk.Configuration.ILogicBlockConfigurationBuilder 'Dale.Sdk.Configuration.ILogicBlockConfigurationBuilder')

<a name='Dale.Sdk.Core.LogicBlockBase.Ready()'></a>

## LogicBlockBase.Ready() Method

Called when the logic block has been configured and is ready to run. this is the place to attach event handlers to  
io or interface elements

```csharp
protected abstract void Ready();
```

<a name='Dale.Sdk.Core.LogicBlockBase.Starting()'></a>

## LogicBlockBase.Starting() Method

Called when the logic block is started (after it has been initialized/ready)

```csharp
protected virtual void Starting();
```

<a name='Dale.Sdk.Core.LogicBlockBase.Stopping()'></a>

## LogicBlockBase.Stopping() Method

Called when the logic block is stopped (before it gets removed)

```csharp
protected virtual void Stopping();
```