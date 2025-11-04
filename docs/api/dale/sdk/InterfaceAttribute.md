#### [Dale.Sdk](index.md 'index')
### [Dale.Sdk.Core](index.md#Dale.Sdk.Core 'Dale.Sdk.Core')

## InterfaceAttribute Class

Declare interface configuration when implementing a function interface. Allows to set some annotations with the  
optional parameters.

```csharp
public class InterfaceAttribute : System.Attribute
```

Inheritance [System.Object](https://docs.microsoft.com/en-us/dotnet/api/System.Object 'System.Object') &#129106; [System.Attribute](https://docs.microsoft.com/en-us/dotnet/api/System.Attribute 'System.Attribute') &#129106; InterfaceAttribute
### Constructors

<a name='Dale.Sdk.Core.InterfaceAttribute.InterfaceAttribute(System.Type,string,string,string[])'></a>

## InterfaceAttribute(Type, string, string, string[]) Constructor

Constructor for class-level usage with specific interface targeting.

```csharp
public InterfaceAttribute(System.Type forInterface, string? identifier=null, string? defaultName=null, params string[] tags);
```
#### Parameters

<a name='Dale.Sdk.Core.InterfaceAttribute.InterfaceAttribute(System.Type,string,string,string[]).forInterface'></a>

`forInterface` [System.Type](https://docs.microsoft.com/en-us/dotnet/api/System.Type 'System.Type')

<a name='Dale.Sdk.Core.InterfaceAttribute.InterfaceAttribute(System.Type,string,string,string[]).identifier'></a>

`identifier` [System.String](https://docs.microsoft.com/en-us/dotnet/api/System.String 'System.String')

<a name='Dale.Sdk.Core.InterfaceAttribute.InterfaceAttribute(System.Type,string,string,string[]).defaultName'></a>

`defaultName` [System.String](https://docs.microsoft.com/en-us/dotnet/api/System.String 'System.String')

<a name='Dale.Sdk.Core.InterfaceAttribute.InterfaceAttribute(System.Type,string,string,string[]).tags'></a>

`tags` [System.String](https://docs.microsoft.com/en-us/dotnet/api/System.String 'System.String')[[]](https://docs.microsoft.com/en-us/dotnet/api/System.Array 'System.Array')