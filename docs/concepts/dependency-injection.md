---
outline: deep
title: Dependency Injection
---

# Dependency Injection

Dependency injection in this project uses the built-in .NET DI container (Microsoft.Extensions.DependencyInjection). LogicBlocks created by the framework support constructor injection — any services you register will be provided when LogicBlocks are instantiated by the runtime.

Example: a LogicBlock that depends on an `IMyService` (`ILogger<T>` is requried by the base constructor and registered by the runtime):

```csharp
public class MyLogicBlock : LogicBlockBase
{
	private readonly IMyService _myService;
	private readonly ILogger<MyLogicBlock> _logger;

	public MyLogicBlock(IMyService myService, ILogger<MyLogicBlock> logger) : base(logger)
	{
		_myService = myService;
		_logger = logger;
	}

	public override Task ExecuteAsync()
	{
		_logger.LogInformation("MyLogicBlock running");
		_myService.DoWork();
		return Task.CompletedTask;
	}
}
```

Register services and LogicBlocks using a configuration class. The project templates provide a `DependencyInjection` class that implements `IConfigureServices` — put registrations there so the host picks them up:

```csharp
public class DependencyInjection : IConfigureServices
{
	public void ConfigureServices(IServiceCollection services)
	{
		// Register your application services
		services.AddTransient<IMyService, MyService>();

		// Register LogicBlocks so they can be created by the runtime
		services.AddTransient<MyLogicBlock>();
		// register other LogicBlocks the same way
	}
}
```

Notes
- LogicBlocks are instantiated by the hosting infrastructure; register them as transient, so several instances of them can be created.
- The DI behavior follows standard .NET semantics.