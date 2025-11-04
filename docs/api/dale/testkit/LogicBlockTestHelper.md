#### [Dale.Sdk.TestKit](index.md 'index')
### [Dale.Sdk.TestKit](index.md#Dale.Sdk.TestKit 'Dale.Sdk.TestKit')

## LogicBlockTestHelper Class

```csharp
public static class LogicBlockTestHelper
```

Inheritance [System.Object](https://docs.microsoft.com/en-us/dotnet/api/System.Object 'System.Object') &#129106; LogicBlockTestHelper
### Methods

<a name='Dale.Sdk.TestKit.LogicBlockTestHelper.CreateLoggerMock()'></a>

## LogicBlockTestHelper.CreateLoggerMock() Method

Creates a mock ILogger for logic blocks.

```csharp
public static Mock<Microsoft.Extensions.Logging.ILogger<Dale.Sdk.Core.LogicBlockBase>> CreateLoggerMock();
```

#### Returns
[Moq.Mock](https://docs.microsoft.com/en-us/dotnet/api/Moq.Mock 'Moq.Mock')