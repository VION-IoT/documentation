#### [Dale.Sdk](index.md 'index')
### [Dale.Sdk.Core](index.md#Dale.Sdk.Core 'Dale.Sdk.Core')

## CommandAttribute Class

Marks a message as a command.  
The message is sent to a specific linked interface instance.  
The receiving side will not get the identifier of the sender.

```csharp
public class CommandAttribute : System.Attribute,
Dale.Sdk.CodeGeneration.IFromToAttribute
```

Inheritance [System.Object](https://docs.microsoft.com/en-us/dotnet/api/System.Object 'System.Object') &#129106; [System.Attribute](https://docs.microsoft.com/en-us/dotnet/api/System.Attribute 'System.Attribute') &#129106; CommandAttribute

Implements [Dale.Sdk.CodeGeneration.IFromToAttribute](https://docs.microsoft.com/en-us/dotnet/api/Dale.Sdk.CodeGeneration.IFromToAttribute 'Dale.Sdk.CodeGeneration.IFromToAttribute')