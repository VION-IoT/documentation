#### [Dale.Sdk](index.md 'index')
### [Dale.Sdk.Core](index.md#Dale.Sdk.Core 'Dale.Sdk.Core')

## RequestResponseAttribute Class

Marks a message as a request message.  
The message is sent to a specific linked interface instance.  
The receiving/responding side will need to return the response message.  
The responding side will not get the identifier of the sender.  
The requesting side will receive the identifier of the responder with the response.

```csharp
public class RequestResponseAttribute : System.Attribute
```

Inheritance [System.Object](https://docs.microsoft.com/en-us/dotnet/api/System.Object 'System.Object') &#129106; [System.Attribute](https://docs.microsoft.com/en-us/dotnet/api/System.Attribute 'System.Attribute') &#129106; RequestResponseAttribute