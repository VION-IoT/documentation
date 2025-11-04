#### [Dale.Sdk.TestKit](index.md 'index')
### [Dale.Sdk.TestKit](index.md#Dale.Sdk.TestKit 'Dale.Sdk.TestKit')

## LogicBlockBaseExtensions Class

```csharp
public static class LogicBlockBaseExtensions
```

Inheritance [System.Object](https://docs.microsoft.com/en-us/dotnet/api/System.Object 'System.Object') &#129106; LogicBlockBaseExtensions
### Methods

<a name='Dale.Sdk.TestKit.LogicBlockBaseExtensions.CreateTestContext_T_(thisT)'></a>

## LogicBlockBaseExtensions.CreateTestContext\<T\>(this T) Method

Creates a test context builder for the given logic block to allow test context customization. Call Build() at the  
end to get the test context.

```csharp
public static Dale.Sdk.TestKit.LogicBlockTestContextBuilder<T> CreateTestContext<T>(this T logicBlock)
    where T : Dale.Sdk.Core.LogicBlockBase;
```
#### Type parameters

<a name='Dale.Sdk.TestKit.LogicBlockBaseExtensions.CreateTestContext_T_(thisT).T'></a>

`T`
#### Parameters

<a name='Dale.Sdk.TestKit.LogicBlockBaseExtensions.CreateTestContext_T_(thisT).logicBlock'></a>

`logicBlock` [T](LogicBlockBaseExtensions.md#Dale.Sdk.TestKit.LogicBlockBaseExtensions.CreateTestContext_T_(thisT).T 'Dale.Sdk.TestKit.LogicBlockBaseExtensions.CreateTestContext<T>(this T).T')

#### Returns
[Dale.Sdk.TestKit.LogicBlockTestContextBuilder&lt;](LogicBlockTestContextBuilder_TLogicBlock_.md 'Dale.Sdk.TestKit.LogicBlockTestContextBuilder<TLogicBlock>')[T](LogicBlockBaseExtensions.md#Dale.Sdk.TestKit.LogicBlockBaseExtensions.CreateTestContext_T_(thisT).T 'Dale.Sdk.TestKit.LogicBlockBaseExtensions.CreateTestContext<T>(this T).T')[&gt;](LogicBlockTestContextBuilder_TLogicBlock_.md 'Dale.Sdk.TestKit.LogicBlockTestContextBuilder<TLogicBlock>')

<a name='Dale.Sdk.TestKit.LogicBlockBaseExtensions.InitializeForTest(thisDale.Sdk.Core.LogicBlockBase)'></a>

## LogicBlockBaseExtensions.InitializeForTest(this LogicBlockBase) Method

Initializes the given logic block for testing, returning the default test context.

```csharp
public static Dale.Sdk.TestKit.LogicBlockTestContext InitializeForTest(this Dale.Sdk.Core.LogicBlockBase logicBlock);
```
#### Parameters

<a name='Dale.Sdk.TestKit.LogicBlockBaseExtensions.InitializeForTest(thisDale.Sdk.Core.LogicBlockBase).logicBlock'></a>

`logicBlock` [Dale.Sdk.Core.LogicBlockBase](https://docs.microsoft.com/en-us/dotnet/api/Dale.Sdk.Core.LogicBlockBase 'Dale.Sdk.Core.LogicBlockBase')

#### Returns
[LogicBlockTestContext](LogicBlockTestContext.md 'Dale.Sdk.TestKit.LogicBlockTestContext')