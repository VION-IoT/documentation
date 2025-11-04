#### [Dale.Sdk](index.md 'index')
### [Dale.Sdk.Core](index.md#Dale.Sdk.Core 'Dale.Sdk.Core')

## ServiceRelationAttribute Class

Defines a relation to another service interface.  
A matching declaration (same RelationType, opposite Direction) must exist on the other service interface.

```csharp
public class ServiceRelationAttribute : System.Attribute
```

Inheritance [System.Object](https://docs.microsoft.com/en-us/dotnet/api/System.Object 'System.Object') &#129106; [System.Attribute](https://docs.microsoft.com/en-us/dotnet/api/System.Attribute 'System.Attribute') &#129106; ServiceRelationAttribute
### Properties

<a name='Dale.Sdk.Core.ServiceRelationAttribute.Direction'></a>

## ServiceRelationAttribute.Direction Property

Side of the relation this service interface represents. (start or end of the arrow)

```csharp
public Dale.Sdk.Core.ServiceRelationDirection Direction { get; }
```

#### Property Value
[Dale.Sdk.Core.ServiceRelationDirection](https://docs.microsoft.com/en-us/dotnet/api/Dale.Sdk.Core.ServiceRelationDirection 'Dale.Sdk.Core.ServiceRelationDirection')

<a name='Dale.Sdk.Core.ServiceRelationAttribute.FunctionInterfaceType'></a>

## ServiceRelationAttribute.FunctionInterfaceType Property

Function interface type to match with the relation.

```csharp
public System.Type FunctionInterfaceType { get; }
```

#### Property Value
[System.Type](https://docs.microsoft.com/en-us/dotnet/api/System.Type 'System.Type')

<a name='Dale.Sdk.Core.ServiceRelationAttribute.RelationType'></a>

## ServiceRelationAttribute.RelationType Property

The identifier of the relation. Must be the same for the inwards and outwards side of the declaration.

```csharp
public string RelationType { get; }
```

#### Property Value
[System.String](https://docs.microsoft.com/en-us/dotnet/api/System.String 'System.String')