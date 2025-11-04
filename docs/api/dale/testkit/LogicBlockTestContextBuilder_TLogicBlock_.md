#### [Dale.Sdk.TestKit](index.md 'index')
### [Dale.Sdk.TestKit](index.md#Dale.Sdk.TestKit 'Dale.Sdk.TestKit')

## LogicBlockTestContextBuilder\<TLogicBlock\> Class

Fluent test builder to initialize LogicBlock instances for unit tests.

```csharp
public class LogicBlockTestContextBuilder<TLogicBlock>
    where TLogicBlock : Dale.Sdk.Core.LogicBlockBase
```
#### Type parameters

<a name='Dale.Sdk.TestKit.LogicBlockTestContextBuilder_TLogicBlock_.TLogicBlock'></a>

`TLogicBlock`

Inheritance [System.Object](https://docs.microsoft.com/en-us/dotnet/api/System.Object 'System.Object') &#129106; LogicBlockTestContextBuilder\<TLogicBlock\>
### Methods

<a name='Dale.Sdk.TestKit.LogicBlockTestContextBuilder_TLogicBlock_.Build()'></a>

## LogicBlockTestContextBuilder\<TLogicBlock\>.Build() Method

Initialize the logic block and apply any linked interfaces mapping.  
After this returns the logic block's Configure(...) and Ready() will have been executed.

```csharp
public Dale.Sdk.TestKit.LogicBlockTestContext Build();
```

#### Returns
[LogicBlockTestContext](LogicBlockTestContext.md 'Dale.Sdk.TestKit.LogicBlockTestContext')

<a name='Dale.Sdk.TestKit.LogicBlockTestContextBuilder_TLogicBlock_.InitializeLogicBlock()'></a>

## LogicBlockTestContextBuilder\<TLogicBlock\>.InitializeLogicBlock() Method

Sends the InitializeLogicBlock message to the logic block to initialize it.

```csharp
private void InitializeLogicBlock();
```

<a name='Dale.Sdk.TestKit.LogicBlockTestContextBuilder_TLogicBlock_.SetLinkedInterfaces()'></a>

## LogicBlockTestContextBuilder\<TLogicBlock\>.SetLinkedInterfaces() Method

Sets the linked interfaces on the logic block based on the configured mappings with the help of some reflection.

```csharp
private void SetLinkedInterfaces();
```

<a name='Dale.Sdk.TestKit.LogicBlockTestContextBuilder_TLogicBlock_.WithLogicInterfaceMapping_TInterface_(Dale.Sdk.Utils.InterfaceId)'></a>

## LogicBlockTestContextBuilder\<TLogicBlock\>.WithLogicInterfaceMapping\<TInterface\>(InterfaceId) Method

Adds a mapping to another logic block using the logic block's own implementation of the interface.

```csharp
public Dale.Sdk.TestKit.LogicBlockTestContextBuilder<TLogicBlock> WithLogicInterfaceMapping<TInterface>(Dale.Sdk.Utils.InterfaceId mappedInstance)
    where TInterface : class, Dale.Sdk.Configuration.Interfaces.ILogicHandlerInterface;
```
#### Type parameters

<a name='Dale.Sdk.TestKit.LogicBlockTestContextBuilder_TLogicBlock_.WithLogicInterfaceMapping_TInterface_(Dale.Sdk.Utils.InterfaceId).TInterface'></a>

`TInterface`
#### Parameters

<a name='Dale.Sdk.TestKit.LogicBlockTestContextBuilder_TLogicBlock_.WithLogicInterfaceMapping_TInterface_(Dale.Sdk.Utils.InterfaceId).mappedInstance'></a>

`mappedInstance` [Dale.Sdk.Utils.InterfaceId](https://docs.microsoft.com/en-us/dotnet/api/Dale.Sdk.Utils.InterfaceId 'Dale.Sdk.Utils.InterfaceId')

#### Returns
[Dale.Sdk.TestKit.LogicBlockTestContextBuilder&lt;](LogicBlockTestContextBuilder_TLogicBlock_.md 'Dale.Sdk.TestKit.LogicBlockTestContextBuilder<TLogicBlock>')[TLogicBlock](LogicBlockTestContextBuilder_TLogicBlock_.md#Dale.Sdk.TestKit.LogicBlockTestContextBuilder_TLogicBlock_.TLogicBlock 'Dale.Sdk.TestKit.LogicBlockTestContextBuilder<TLogicBlock>.TLogicBlock')[&gt;](LogicBlockTestContextBuilder_TLogicBlock_.md 'Dale.Sdk.TestKit.LogicBlockTestContextBuilder<TLogicBlock>')

<a name='Dale.Sdk.TestKit.LogicBlockTestContextBuilder_TLogicBlock_.WithLogicInterfaceMapping_TInterface_(System.Func_TLogicBlock,TInterface_,Dale.Sdk.Utils.InterfaceId)'></a>

## LogicBlockTestContextBuilder\<TLogicBlock\>.WithLogicInterfaceMapping\<TInterface\>(Func\<TLogicBlock,TInterface\>, InterfaceId) Method

Adds a mapping to another logic block using a specific (self or delegated) implementation of the interface.

```csharp
public Dale.Sdk.TestKit.LogicBlockTestContextBuilder<TLogicBlock> WithLogicInterfaceMapping<TInterface>(System.Func<TLogicBlock,TInterface> instance, Dale.Sdk.Utils.InterfaceId mappedInstance)
    where TInterface : Dale.Sdk.Configuration.Interfaces.ILogicHandlerInterface;
```
#### Type parameters

<a name='Dale.Sdk.TestKit.LogicBlockTestContextBuilder_TLogicBlock_.WithLogicInterfaceMapping_TInterface_(System.Func_TLogicBlock,TInterface_,Dale.Sdk.Utils.InterfaceId).TInterface'></a>

`TInterface`
#### Parameters

<a name='Dale.Sdk.TestKit.LogicBlockTestContextBuilder_TLogicBlock_.WithLogicInterfaceMapping_TInterface_(System.Func_TLogicBlock,TInterface_,Dale.Sdk.Utils.InterfaceId).instance'></a>

`instance` [System.Func&lt;](https://docs.microsoft.com/en-us/dotnet/api/System.Func-2 'System.Func`2')[TLogicBlock](LogicBlockTestContextBuilder_TLogicBlock_.md#Dale.Sdk.TestKit.LogicBlockTestContextBuilder_TLogicBlock_.TLogicBlock 'Dale.Sdk.TestKit.LogicBlockTestContextBuilder<TLogicBlock>.TLogicBlock')[,](https://docs.microsoft.com/en-us/dotnet/api/System.Func-2 'System.Func`2')[TInterface](LogicBlockTestContextBuilder_TLogicBlock_.md#Dale.Sdk.TestKit.LogicBlockTestContextBuilder_TLogicBlock_.WithLogicInterfaceMapping_TInterface_(System.Func_TLogicBlock,TInterface_,Dale.Sdk.Utils.InterfaceId).TInterface 'Dale.Sdk.TestKit.LogicBlockTestContextBuilder<TLogicBlock>.WithLogicInterfaceMapping<TInterface>(System.Func<TLogicBlock,TInterface>, Dale.Sdk.Utils.InterfaceId).TInterface')[&gt;](https://docs.microsoft.com/en-us/dotnet/api/System.Func-2 'System.Func`2')

<a name='Dale.Sdk.TestKit.LogicBlockTestContextBuilder_TLogicBlock_.WithLogicInterfaceMapping_TInterface_(System.Func_TLogicBlock,TInterface_,Dale.Sdk.Utils.InterfaceId).mappedInstance'></a>

`mappedInstance` [Dale.Sdk.Utils.InterfaceId](https://docs.microsoft.com/en-us/dotnet/api/Dale.Sdk.Utils.InterfaceId 'Dale.Sdk.Utils.InterfaceId')

#### Returns
[Dale.Sdk.TestKit.LogicBlockTestContextBuilder&lt;](LogicBlockTestContextBuilder_TLogicBlock_.md 'Dale.Sdk.TestKit.LogicBlockTestContextBuilder<TLogicBlock>')[TLogicBlock](LogicBlockTestContextBuilder_TLogicBlock_.md#Dale.Sdk.TestKit.LogicBlockTestContextBuilder_TLogicBlock_.TLogicBlock 'Dale.Sdk.TestKit.LogicBlockTestContextBuilder<TLogicBlock>.TLogicBlock')[&gt;](LogicBlockTestContextBuilder_TLogicBlock_.md 'Dale.Sdk.TestKit.LogicBlockTestContextBuilder<TLogicBlock>')