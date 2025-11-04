---
outline: deep
title: Unit testing
---

# Unit testing

This short guide shows how to unit test a LogicBlock using the `Dale.Sdk.TestKit` helpers. We'll use the `HelloWorld` example from the project template and the test `HelloWorldShould.cs` as a reference.

Prerequisites
- The library project has a test project that references `Dale.Sdk.TestKit` and `xunit`.

Step 1 — Create the test

Add a test class (example `HelloWorldShould.cs`) to your test project. This example uses xUnit, but you may use the test framworks of your choice. ,  the `LogicBlockTestHelper` to create a logger mock and to initialize the LogicBlock for testing:

```csharp
using Dale.Sdk.TestKit;
using Xunit;

namespace VionIotLibraryTemplate.Test
{
	public class HelloWorldShould
	{
		[Fact]
		public void Greet_WhenCalled_IncrementsTimesGreeted()
		{
			// Arrange
			var helloWorld = new HelloWorld(LogicBlockTestHelper.CreateLoggerMock().Object);
			helloWorld.InitializeForTest(); // Initialize the logic block for testing

			var timesGreetedBefore = helloWorld.TimesGreeted;

			// Act
			helloWorld.Greet();

			// Assert
			var timesGreetedAfter = helloWorld.TimesGreeted;
			Assert.Equal(timesGreetedBefore + 1, timesGreetedAfter);
		}
	}
}
```

Step 2 — Run the test

From the test project directory run:

```pwsh
dotnet test
```

Or use the test runner of your IDE.

Step 3 — Tips and notes

- `Dale.Sdk.TestKit` does not depend on a specific testing framework, however it depends on `Moq`. 
- If your LogicBlock uses constructor-injected services, create simple mocks (e.g. with `Moq`) or register test doubles as constructor arguments when constructing the LogicBlock in the test.
- You may use `LogicBlockTestHelper.CreateLoggerMock()` to get a mocked `ILogger<T>` instance. If your LogicBlock requires other constructor parameters, pass suitable mocks or test implementations.
- `InitializeForTest()` prepares the LogicBlock lifecycle for unit testing — it sets up internal state so your timers and methods behave as expected.

TestKit utilities and helpers

- `LogicBlockTestContext` — a minimal actor context used by tests to record messages the LogicBlock sends (requests, commands, state updates, IO messages). Use its helpers to assert messages were sent (for example `VerifySendRequest<T>` or `VerifyDigitalOutputSet`). See the examples repository for usage examples.

- `LogicBlockTestContextBuilder` — a fluent builder to create and configure a `LogicBlockTestContext`. It helps to setup testing of Contract communication with other logic blocks.

```csharp
var testContext = myLogicBlock.CreateTestContext().WithLogicInterfaceMapping<ITEmperatureReceiver>(_mappedTemperatureProvicer).Build();
```

- `LogicBlockTestHelper` — contains small helpers such as `CreateLoggerMock()` used to provide an `ILogger<T>` mock, and other helpers to assist testing.

- Extensions and utils included in the TestKit (see `Dale.Sdk.TestKit.csproj`) provide convenient test methods lke:
	- `VerifyLogContains` - extension on logger mocks to assert log messages
	- `SetPrivateField` / `GetPrivateField` - test helpers to set private fields (useful to simulate internal state before invoking methods, use sparingly)

Practical tips:

- Prefer using `CreateTestContext()` and `LogicBlockTestContext` when your LogicBlock interacts with other logic interfaces or sends IO messages — this lets you assert messages and IO state without a running host.
- Use `SetPrivateField` sparingly; prefer public APIs where possible. It's useful for simulating internal counters or state in unit tests but should be avoided if possible.
- Use Moq or simple test-doubles for injected dependencies. `LogicBlockTestHelper.CreateLoggerMock()` returns a Moq `Mock<ILogger<T>>` prewired to the TestKit verification extensions.

