#### [Dale.Sdk](index.md 'index')
### [Dale.Sdk.Core](index.md#Dale.Sdk.Core 'Dale.Sdk.Core')

## PersistentAttribute Class

Controls persistence behavior for properties.  
- On writable service properties: Use [Persistent(Exclude = true)] to opt-out  
- On other properties: Use [Persistent] to opt-in

```csharp
public class PersistentAttribute : System.Attribute
```

Inheritance [System.Object](https://docs.microsoft.com/en-us/dotnet/api/System.Object 'System.Object') &#129106; [System.Attribute](https://docs.microsoft.com/en-us/dotnet/api/System.Attribute 'System.Attribute') &#129106; PersistentAttribute
### Properties

<a name='Dale.Sdk.Core.PersistentAttribute.Exclude'></a>

## PersistentAttribute.Exclude Property

Set to true to exclude a writable service property from persistence

```csharp
public bool Exclude { get; set; }
```

#### Property Value
[System.Boolean](https://docs.microsoft.com/en-us/dotnet/api/System.Boolean 'System.Boolean')