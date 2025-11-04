#### [Dale.Sdk.TestKit](index.md 'index')
### [Dale.Sdk.TestKit](index.md#Dale.Sdk.TestKit 'Dale.Sdk.TestKit')

## LogicBlockTestContext Class

Test-friendly minimal actor context that records messages sent by the logic block.  
Use the provided query/assertion helpers to inspect recorded messages.

```csharp
public class LogicBlockTestContext :
Dale.Sdk.Abstractions.IActorContext
```

Inheritance [System.Object](https://docs.microsoft.com/en-us/dotnet/api/System.Object 'System.Object') &#129106; LogicBlockTestContext

Implements [Dale.Sdk.Abstractions.IActorContext](https://docs.microsoft.com/en-us/dotnet/api/Dale.Sdk.Abstractions.IActorContext 'Dale.Sdk.Abstractions.IActorContext')
### Methods

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.ClearRecordedMessages()'></a>

## LogicBlockTestContext.ClearRecordedMessages() Method

Clear recorded messages, e.g. if the test arranging phase triggers messages, that should be ignored.

```csharp
public void ClearRecordedMessages();
```

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.VerifyAnalogOutputSet(Dale.Sdk.Core.IAnalogOutput,System.Nullable_double_,double,System.Nullable_Times_)'></a>

## LogicBlockTestContext.VerifyAnalogOutputSet(IAnalogOutput, Nullable<double>, double, Nullable<Times>) Method

Assert that at the specified analog output was set with the given value.

```csharp
public void VerifyAnalogOutputSet(Dale.Sdk.Core.IAnalogOutput? analogOutput=null, System.Nullable<double> value=null, double tolerance=0.0, System.Nullable<Times> times=null);
```
#### Parameters

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.VerifyAnalogOutputSet(Dale.Sdk.Core.IAnalogOutput,System.Nullable_double_,double,System.Nullable_Times_).analogOutput'></a>

`analogOutput` [Dale.Sdk.Core.IAnalogOutput](https://docs.microsoft.com/en-us/dotnet/api/Dale.Sdk.Core.IAnalogOutput 'Dale.Sdk.Core.IAnalogOutput')

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.VerifyAnalogOutputSet(Dale.Sdk.Core.IAnalogOutput,System.Nullable_double_,double,System.Nullable_Times_).value'></a>

`value` [System.Nullable&lt;](https://docs.microsoft.com/en-us/dotnet/api/System.Nullable-1 'System.Nullable`1')[System.Double](https://docs.microsoft.com/en-us/dotnet/api/System.Double 'System.Double')[&gt;](https://docs.microsoft.com/en-us/dotnet/api/System.Nullable-1 'System.Nullable`1')

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.VerifyAnalogOutputSet(Dale.Sdk.Core.IAnalogOutput,System.Nullable_double_,double,System.Nullable_Times_).tolerance'></a>

`tolerance` [System.Double](https://docs.microsoft.com/en-us/dotnet/api/System.Double 'System.Double')

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.VerifyAnalogOutputSet(Dale.Sdk.Core.IAnalogOutput,System.Nullable_double_,double,System.Nullable_Times_).times'></a>

`times` [System.Nullable&lt;](https://docs.microsoft.com/en-us/dotnet/api/System.Nullable-1 'System.Nullable`1')[Moq.Times](https://docs.microsoft.com/en-us/dotnet/api/Moq.Times 'Moq.Times')[&gt;](https://docs.microsoft.com/en-us/dotnet/api/System.Nullable-1 'System.Nullable`1')

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.VerifyDigitalOutputSet(Dale.Sdk.Core.IDigitalOutput,System.Nullable_bool_,System.Nullable_Times_)'></a>

## LogicBlockTestContext.VerifyDigitalOutputSet(IDigitalOutput, Nullable<bool>, Nullable<Times>) Method

Assert that at the specified digital output was set with the given value.

```csharp
public void VerifyDigitalOutputSet(Dale.Sdk.Core.IDigitalOutput? digitalOutput=null, System.Nullable<bool> value=null, System.Nullable<Times> times=null);
```
#### Parameters

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.VerifyDigitalOutputSet(Dale.Sdk.Core.IDigitalOutput,System.Nullable_bool_,System.Nullable_Times_).digitalOutput'></a>

`digitalOutput` [Dale.Sdk.Core.IDigitalOutput](https://docs.microsoft.com/en-us/dotnet/api/Dale.Sdk.Core.IDigitalOutput 'Dale.Sdk.Core.IDigitalOutput')

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.VerifyDigitalOutputSet(Dale.Sdk.Core.IDigitalOutput,System.Nullable_bool_,System.Nullable_Times_).value'></a>

`value` [System.Nullable&lt;](https://docs.microsoft.com/en-us/dotnet/api/System.Nullable-1 'System.Nullable`1')[System.Boolean](https://docs.microsoft.com/en-us/dotnet/api/System.Boolean 'System.Boolean')[&gt;](https://docs.microsoft.com/en-us/dotnet/api/System.Nullable-1 'System.Nullable`1')

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.VerifyDigitalOutputSet(Dale.Sdk.Core.IDigitalOutput,System.Nullable_bool_,System.Nullable_Times_).times'></a>

`times` [System.Nullable&lt;](https://docs.microsoft.com/en-us/dotnet/api/System.Nullable-1 'System.Nullable`1')[Moq.Times](https://docs.microsoft.com/en-us/dotnet/api/Moq.Times 'Moq.Times')[&gt;](https://docs.microsoft.com/en-us/dotnet/api/System.Nullable-1 'System.Nullable`1')

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.VerifySendCommand_TMessage_(System.Nullable_Dale.Sdk.Utils.InterfaceId_,System.Func_TMessage,bool_,System.Nullable_Times_)'></a>

## LogicBlockTestContext.VerifySendCommand<TMessage>(Nullable<InterfaceId>, Func<TMessage,bool>, Nullable<Times>) Method

Assert that at least one SendCommand call was made with the give target and message.

```csharp
public void VerifySendCommand<TMessage>(System.Nullable<Dale.Sdk.Utils.InterfaceId> to=null, System.Func<TMessage,bool>? verifyMessage=null, System.Nullable<Times> times=null)
    where TMessage : struct, System.ValueType, System.ValueType;
```
#### Type parameters

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.VerifySendCommand_TMessage_(System.Nullable_Dale.Sdk.Utils.InterfaceId_,System.Func_TMessage,bool_,System.Nullable_Times_).TMessage'></a>

`TMessage`
#### Parameters

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.VerifySendCommand_TMessage_(System.Nullable_Dale.Sdk.Utils.InterfaceId_,System.Func_TMessage,bool_,System.Nullable_Times_).to'></a>

`to` [System.Nullable&lt;](https://docs.microsoft.com/en-us/dotnet/api/System.Nullable-1 'System.Nullable`1')[Dale.Sdk.Utils.InterfaceId](https://docs.microsoft.com/en-us/dotnet/api/Dale.Sdk.Utils.InterfaceId 'Dale.Sdk.Utils.InterfaceId')[&gt;](https://docs.microsoft.com/en-us/dotnet/api/System.Nullable-1 'System.Nullable`1')

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.VerifySendCommand_TMessage_(System.Nullable_Dale.Sdk.Utils.InterfaceId_,System.Func_TMessage,bool_,System.Nullable_Times_).verifyMessage'></a>

`verifyMessage` [System.Func&lt;](https://docs.microsoft.com/en-us/dotnet/api/System.Func-2 'System.Func`2')[TMessage](LogicBlockTestContext.md#Dale.Sdk.TestKit.LogicBlockTestContext.VerifySendCommand_TMessage_(System.Nullable_Dale.Sdk.Utils.InterfaceId_,System.Func_TMessage,bool_,System.Nullable_Times_).TMessage 'Dale.Sdk.TestKit.LogicBlockTestContext.VerifySendCommand<TMessage>(System.Nullable<Dale.Sdk.Utils.InterfaceId>, System.Func<TMessage,bool>, System.Nullable<Times>).TMessage')[,](https://docs.microsoft.com/en-us/dotnet/api/System.Func-2 'System.Func`2')[System.Boolean](https://docs.microsoft.com/en-us/dotnet/api/System.Boolean 'System.Boolean')[&gt;](https://docs.microsoft.com/en-us/dotnet/api/System.Func-2 'System.Func`2')

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.VerifySendCommand_TMessage_(System.Nullable_Dale.Sdk.Utils.InterfaceId_,System.Func_TMessage,bool_,System.Nullable_Times_).times'></a>

`times` [System.Nullable&lt;](https://docs.microsoft.com/en-us/dotnet/api/System.Nullable-1 'System.Nullable`1')[Moq.Times](https://docs.microsoft.com/en-us/dotnet/api/Moq.Times 'Moq.Times')[&gt;](https://docs.microsoft.com/en-us/dotnet/api/System.Nullable-1 'System.Nullable`1')

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.VerifySendRequest_TMessage_(System.Nullable_Dale.Sdk.Utils.InterfaceId_,System.Func_TMessage,bool_,System.Nullable_Times_)'></a>

## LogicBlockTestContext.VerifySendRequest<TMessage>(Nullable<InterfaceId>, Func<TMessage,bool>, Nullable<Times>) Method

Assert that at least one SendRequest call was made with the give target and message.

```csharp
public void VerifySendRequest<TMessage>(System.Nullable<Dale.Sdk.Utils.InterfaceId> to=null, System.Func<TMessage,bool>? verifyMessage=null, System.Nullable<Times> times=null)
    where TMessage : struct, System.ValueType, System.ValueType;
```
#### Type parameters

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.VerifySendRequest_TMessage_(System.Nullable_Dale.Sdk.Utils.InterfaceId_,System.Func_TMessage,bool_,System.Nullable_Times_).TMessage'></a>

`TMessage`
#### Parameters

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.VerifySendRequest_TMessage_(System.Nullable_Dale.Sdk.Utils.InterfaceId_,System.Func_TMessage,bool_,System.Nullable_Times_).to'></a>

`to` [System.Nullable&lt;](https://docs.microsoft.com/en-us/dotnet/api/System.Nullable-1 'System.Nullable`1')[Dale.Sdk.Utils.InterfaceId](https://docs.microsoft.com/en-us/dotnet/api/Dale.Sdk.Utils.InterfaceId 'Dale.Sdk.Utils.InterfaceId')[&gt;](https://docs.microsoft.com/en-us/dotnet/api/System.Nullable-1 'System.Nullable`1')

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.VerifySendRequest_TMessage_(System.Nullable_Dale.Sdk.Utils.InterfaceId_,System.Func_TMessage,bool_,System.Nullable_Times_).verifyMessage'></a>

`verifyMessage` [System.Func&lt;](https://docs.microsoft.com/en-us/dotnet/api/System.Func-2 'System.Func`2')[TMessage](LogicBlockTestContext.md#Dale.Sdk.TestKit.LogicBlockTestContext.VerifySendRequest_TMessage_(System.Nullable_Dale.Sdk.Utils.InterfaceId_,System.Func_TMessage,bool_,System.Nullable_Times_).TMessage 'Dale.Sdk.TestKit.LogicBlockTestContext.VerifySendRequest<TMessage>(System.Nullable<Dale.Sdk.Utils.InterfaceId>, System.Func<TMessage,bool>, System.Nullable<Times>).TMessage')[,](https://docs.microsoft.com/en-us/dotnet/api/System.Func-2 'System.Func`2')[System.Boolean](https://docs.microsoft.com/en-us/dotnet/api/System.Boolean 'System.Boolean')[&gt;](https://docs.microsoft.com/en-us/dotnet/api/System.Func-2 'System.Func`2')

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.VerifySendRequest_TMessage_(System.Nullable_Dale.Sdk.Utils.InterfaceId_,System.Func_TMessage,bool_,System.Nullable_Times_).times'></a>

`times` [System.Nullable&lt;](https://docs.microsoft.com/en-us/dotnet/api/System.Nullable-1 'System.Nullable`1')[Moq.Times](https://docs.microsoft.com/en-us/dotnet/api/Moq.Times 'Moq.Times')[&gt;](https://docs.microsoft.com/en-us/dotnet/api/System.Nullable-1 'System.Nullable`1')

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.VerifySendStateUpdate_TMessage_(System.Func_TMessage,bool_,System.Nullable_Times_)'></a>

## LogicBlockTestContext.VerifySendStateUpdate<TMessage>(Func<TMessage,bool>, Nullable<Times>) Method

Assert that at least one SendStateUpdate call was made with the give target and message.

```csharp
public void VerifySendStateUpdate<TMessage>(System.Func<TMessage,bool>? verifyMessage=null, System.Nullable<Times> times=null)
    where TMessage : struct, System.ValueType, System.ValueType;
```
#### Type parameters

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.VerifySendStateUpdate_TMessage_(System.Func_TMessage,bool_,System.Nullable_Times_).TMessage'></a>

`TMessage`
#### Parameters

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.VerifySendStateUpdate_TMessage_(System.Func_TMessage,bool_,System.Nullable_Times_).verifyMessage'></a>

`verifyMessage` [System.Func&lt;](https://docs.microsoft.com/en-us/dotnet/api/System.Func-2 'System.Func`2')[TMessage](LogicBlockTestContext.md#Dale.Sdk.TestKit.LogicBlockTestContext.VerifySendStateUpdate_TMessage_(System.Func_TMessage,bool_,System.Nullable_Times_).TMessage 'Dale.Sdk.TestKit.LogicBlockTestContext.VerifySendStateUpdate<TMessage>(System.Func<TMessage,bool>, System.Nullable<Times>).TMessage')[,](https://docs.microsoft.com/en-us/dotnet/api/System.Func-2 'System.Func`2')[System.Boolean](https://docs.microsoft.com/en-us/dotnet/api/System.Boolean 'System.Boolean')[&gt;](https://docs.microsoft.com/en-us/dotnet/api/System.Func-2 'System.Func`2')

<a name='Dale.Sdk.TestKit.LogicBlockTestContext.VerifySendStateUpdate_TMessage_(System.Func_TMessage,bool_,System.Nullable_Times_).times'></a>

`times` [System.Nullable&lt;](https://docs.microsoft.com/en-us/dotnet/api/System.Nullable-1 'System.Nullable`1')[Moq.Times](https://docs.microsoft.com/en-us/dotnet/api/Moq.Times 'Moq.Times')[&gt;](https://docs.microsoft.com/en-us/dotnet/api/System.Nullable-1 'System.Nullable`1')