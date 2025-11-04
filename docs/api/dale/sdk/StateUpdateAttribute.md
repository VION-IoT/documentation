#### [Dale.Sdk](index.md 'index')
### [Dale.Sdk.Core](index.md#Dale.Sdk.Core 'Dale.Sdk.Core')

## StateUpdateAttribute Class

Marks a message as a state update.  
The message is sent to all linked interfaces.  
The receiving side will get the identifier of the sender

```csharp
public class StateUpdateAttribute : System.Attribute,
Dale.Sdk.CodeGeneration.IFromToAttribute
```

Inheritance [System.Object](https://docs.microsoft.com/en-us/dotnet/api/System.Object 'System.Object') &#129106; [System.Attribute](https://docs.microsoft.com/en-us/dotnet/api/System.Attribute 'System.Attribute') &#129106; StateUpdateAttribute

Implements [Dale.Sdk.CodeGeneration.IFromToAttribute](https://docs.microsoft.com/en-us/dotnet/api/Dale.Sdk.CodeGeneration.IFromToAttribute 'Dale.Sdk.CodeGeneration.IFromToAttribute')