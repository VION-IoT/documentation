#### [Dale.Sdk](index.md 'index')
### [Dale.Sdk.Core](index.md#Dale.Sdk.Core 'Dale.Sdk.Core')

## IConfigureServices Interface

Plugin assemblies must contain an implementation of this interface. The host calls it at startup do add plugin  
logic blocks and services to DI

```csharp
public interface IConfigureServices
```
### Methods

<a name='Dale.Sdk.Core.IConfigureServices.ConfigureServices(Microsoft.Extensions.DependencyInjection.IServiceCollection)'></a>

## IConfigureServices.ConfigureServices(IServiceCollection) Method

Register all logic blocks and services to usable with dependency injection.  
Logic blocks should be registered as transient.  
Services that are injected into logic blocks should usually be registered as transient as well.

```csharp
void ConfigureServices(Microsoft.Extensions.DependencyInjection.IServiceCollection serviceCollection);
```
#### Parameters

<a name='Dale.Sdk.Core.IConfigureServices.ConfigureServices(Microsoft.Extensions.DependencyInjection.IServiceCollection).serviceCollection'></a>

`serviceCollection` [Microsoft.Extensions.DependencyInjection.IServiceCollection](https://docs.microsoft.com/en-us/dotnet/api/Microsoft.Extensions.DependencyInjection.IServiceCollection 'Microsoft.Extensions.DependencyInjection.IServiceCollection')