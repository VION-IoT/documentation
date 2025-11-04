#### [Dale.Sdk.TestKit](index.md 'index')
### [Dale.Sdk.TestKit](index.md#Dale.Sdk.TestKit 'Dale.Sdk.TestKit')

## ReflectionExtensions Class

Reflection helpers for tests: set/get private fields on instances (searches base types).  
Intended to be used from unit tests to set up internal state on LogicBlock instances.

```csharp
public static class ReflectionExtensions
```

Inheritance [System.Object](https://docs.microsoft.com/en-us/dotnet/api/System.Object 'System.Object') &#129106; ReflectionExtensions
### Methods

<a name='Dale.Sdk.TestKit.ReflectionExtensions.GetPrivateField_TValue_(thisobject,string)'></a>

## ReflectionExtensions.GetPrivateField<TValue>(this object, string) Method

Gets the value of a (possibly non-public) instance field and casts to [TValue](ReflectionExtensions.md#Dale.Sdk.TestKit.ReflectionExtensions.GetPrivateField_TValue_(thisobject,string).TValue 'Dale.Sdk.TestKit.ReflectionExtensions.GetPrivateField<TValue>(this object, string).TValue').

```csharp
public static TValue? GetPrivateField<TValue>(this object instance, string fieldName);
```
#### Type parameters

<a name='Dale.Sdk.TestKit.ReflectionExtensions.GetPrivateField_TValue_(thisobject,string).TValue'></a>

`TValue`
#### Parameters

<a name='Dale.Sdk.TestKit.ReflectionExtensions.GetPrivateField_TValue_(thisobject,string).instance'></a>

`instance` [System.Object](https://docs.microsoft.com/en-us/dotnet/api/System.Object 'System.Object')

<a name='Dale.Sdk.TestKit.ReflectionExtensions.GetPrivateField_TValue_(thisobject,string).fieldName'></a>

`fieldName` [System.String](https://docs.microsoft.com/en-us/dotnet/api/System.String 'System.String')

#### Returns
[TValue](ReflectionExtensions.md#Dale.Sdk.TestKit.ReflectionExtensions.GetPrivateField_TValue_(thisobject,string).TValue 'Dale.Sdk.TestKit.ReflectionExtensions.GetPrivateField<TValue>(this object, string).TValue')

<a name='Dale.Sdk.TestKit.ReflectionExtensions.SetPrivateField_T_(thisT,string,object)'></a>

## ReflectionExtensions.SetPrivateField<T>(this T, string, object) Method

Sets a (possibly non-public) instance field on [instance](ReflectionExtensions.md#Dale.Sdk.TestKit.ReflectionExtensions.SetPrivateField_T_(thisT,string,object).instance 'Dale.Sdk.TestKit.ReflectionExtensions.SetPrivateField<T>(this T, string, object).instance').  
The field search walks the type hierarchy (base classes included).

```csharp
public static void SetPrivateField<T>(this T instance, string fieldName, object? value);
```
#### Type parameters

<a name='Dale.Sdk.TestKit.ReflectionExtensions.SetPrivateField_T_(thisT,string,object).T'></a>

`T`
#### Parameters

<a name='Dale.Sdk.TestKit.ReflectionExtensions.SetPrivateField_T_(thisT,string,object).instance'></a>

`instance` [T](ReflectionExtensions.md#Dale.Sdk.TestKit.ReflectionExtensions.SetPrivateField_T_(thisT,string,object).T 'Dale.Sdk.TestKit.ReflectionExtensions.SetPrivateField<T>(this T, string, object).T')

<a name='Dale.Sdk.TestKit.ReflectionExtensions.SetPrivateField_T_(thisT,string,object).fieldName'></a>

`fieldName` [System.String](https://docs.microsoft.com/en-us/dotnet/api/System.String 'System.String')

<a name='Dale.Sdk.TestKit.ReflectionExtensions.SetPrivateField_T_(thisT,string,object).value'></a>

`value` [System.Object](https://docs.microsoft.com/en-us/dotnet/api/System.Object 'System.Object')