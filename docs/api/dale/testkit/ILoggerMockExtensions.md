#### [Dale.Sdk.TestKit](index.md 'index')
### [Dale.Sdk.TestKit](index.md#Dale.Sdk.TestKit 'Dale.Sdk.TestKit')

## ILoggerMockExtensions Class

```csharp
public static class ILoggerMockExtensions
```

Inheritance [System.Object](https://docs.microsoft.com/en-us/dotnet/api/System.Object 'System.Object') &#129106; ILoggerMockExtensions
### Methods

<a name='Dale.Sdk.TestKit.ILoggerMockExtensions.VerifyLogContains_T_(thisMock_Microsoft.Extensions.Logging.ILogger_T__,string,Microsoft.Extensions.Logging.LogLevel,Times)'></a>

## ILoggerMockExtensions.VerifyLogContains<T>(this Mock<ILogger<T>>, string, LogLevel, Times) Method

Verifies that a log entry containing the specified string was logged at the specified log level the expected number  
of times.

```csharp
public static void VerifyLogContains<T>(this Mock<Microsoft.Extensions.Logging.ILogger<T>> loggerMock, string contains, Microsoft.Extensions.Logging.LogLevel logLevel, Times times);
```
#### Type parameters

<a name='Dale.Sdk.TestKit.ILoggerMockExtensions.VerifyLogContains_T_(thisMock_Microsoft.Extensions.Logging.ILogger_T__,string,Microsoft.Extensions.Logging.LogLevel,Times).T'></a>

`T`
#### Parameters

<a name='Dale.Sdk.TestKit.ILoggerMockExtensions.VerifyLogContains_T_(thisMock_Microsoft.Extensions.Logging.ILogger_T__,string,Microsoft.Extensions.Logging.LogLevel,Times).loggerMock'></a>

`loggerMock` [Moq.Mock](https://docs.microsoft.com/en-us/dotnet/api/Moq.Mock 'Moq.Mock')

<a name='Dale.Sdk.TestKit.ILoggerMockExtensions.VerifyLogContains_T_(thisMock_Microsoft.Extensions.Logging.ILogger_T__,string,Microsoft.Extensions.Logging.LogLevel,Times).contains'></a>

`contains` [System.String](https://docs.microsoft.com/en-us/dotnet/api/System.String 'System.String')

<a name='Dale.Sdk.TestKit.ILoggerMockExtensions.VerifyLogContains_T_(thisMock_Microsoft.Extensions.Logging.ILogger_T__,string,Microsoft.Extensions.Logging.LogLevel,Times).logLevel'></a>

`logLevel` [Microsoft.Extensions.Logging.LogLevel](https://docs.microsoft.com/en-us/dotnet/api/Microsoft.Extensions.Logging.LogLevel 'Microsoft.Extensions.Logging.LogLevel')

<a name='Dale.Sdk.TestKit.ILoggerMockExtensions.VerifyLogContains_T_(thisMock_Microsoft.Extensions.Logging.ILogger_T__,string,Microsoft.Extensions.Logging.LogLevel,Times).times'></a>

`times` [Moq.Times](https://docs.microsoft.com/en-us/dotnet/api/Moq.Times 'Moq.Times')