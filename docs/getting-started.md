---
outline: deep
title: Getting Started
---

# Getting Started with Creating Vion IoT Libraries

Build your first LogicBlock in under 5 minutes.

## Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- A .NET IDE like Visual Studio 2022, JetBrains Rider, or VS Code
- Access to the Vion Artifacts feed (currently the private ecocoach DevOps artifacts feed **ecocoach.csharplogicsystem** )

## Quick Start

### 1. Install the Template

```bash
# Add the NuGet feed (if not already added)
dotnet nuget add source "https://pkgs.dev.azure.com/ecocoachsmarthome/Ecocoach/_packaging/ecocoach.csharplogicsystem/nuget/v3/index.json" \
  --name "ecocoach.csharplogicsystem"

# Install the template
dotnet new install Vion.Library.Template
```

### 2. Create Your First Project

```bash
# Create a new LogicBlock library
dotnet new vion-iot-library -n MyFirstVionLibrary

# Navigate to the project
cd MyFirstVionLibrary
```

This creates a solution `MyFirstVionLibrary.sln` with  two projects:
- **MyFirstVionLibrary** - Your LogicBlock library (.NET Standard 2.1)
- **MyFirstVionLibrary.DevHost** - Local development environment (.NET 9)

### 3. Open and Run

**Visual Studio / Rider:**
1. Open `MyFirstVionLibrary.sln`
2. Right-click **MyFirstVionLibrary.DevHost** → **Set as Startup Project**
3. Press **F5** to run

**Command Line:**
```bash
cd MyFirstVionLibrary.DevHost
dotnet run
```

Your browser will automatically open to `http://localhost:5000` showing the DevHost web UI.

### 4. Explore the Example LogicBlocks

The template includes a `HelloWorld` LogicBlock to get you started:

```csharp
public class HelloWorld : LogicBlockBase
{
        private string _greeting = "Hello, World!";

        [ServiceProperty]
        public string Greeting
        {
            get => _greeting;
            set => SetField(ref _greeting, value);
        }

        [ServiceMeasuringPoint]
        public int TimesGreeted { get; private set; }

    [Timer(5)]
    public void Greet()
    {
        _logger.LogInformation(Greeting);
        TimesGreeted++;
        OnPropertyChanged(nameof(TimesGreeted));
    }
}
```

**What's happening:**
- `[ServiceProperty]` - Exposes `Greeting` as a configurable property
- `[ServiceMeasuringPoint]` - Exposes `TimesGreeted` as telemetry
- `[Timer(5)]` - Calls `Greet()` every 5 seconds

The template also includes a `SmartLedController` LogicBlock demonstrating hardware I/O.

## Your First Custom LogicBlock

Let's create a simple temperature monitor.

### 1. Create the LogicBlock

Add a new file `TemperatureMonitor.cs` in the **MyFirstVionLibrary** project:

```csharp
using Microsoft.Extensions.Logging;
using System;
using Dale.Sdk.Core;

namespace VionIotLibraryTemplate
{
    public class TemperatureMonitor : LogicBlockBase
    {
        private static readonly Random Random = new();
        private readonly ILogger<LogicBlockBase> _logger;
        private double _temperatureThreshold = 25.0;

        [ServiceProperty]
        public double TemperatureThreshold
        {
            get => _temperatureThreshold;
            set => SetField(ref _temperatureThreshold, value);
        }

        [ServiceMeasuringPoint]
        public double CurrentTemperature { get; private set; }

        [ServiceMeasuringPoint]
        public bool IsOverheated { get; private set; }

        public TemperatureMonitor(ILogger<LogicBlockBase> logger) : base(logger)
        {
            _logger = logger;
        }

        [Timer(2)]
        public void CheckTemperature()
        {
            // Simulate temperature reading
            CurrentTemperature = 20 + Random.Next(0, 15);

            IsOverheated = CurrentTemperature > TemperatureThreshold;

            if (IsOverheated)
            {
                _logger.LogWarning($"Temperature alert! {CurrentTemperature}°C exceeds threshold of {TemperatureThreshold}°C");
            }

            OnPropertyChanged(nameof(CurrentTemperature));
            OnPropertyChanged(nameof(IsOverheated));
        }

        protected override void Ready()
        {
            _logger.LogInformation("Temperature monitor is ready.");
        }
    }
}
```

### 2. Register the LogicBlock

Update `DependencyInjection.cs`:

```csharp
public class DependencyInjection : IConfigureServices
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddTransient<HelloWorld>();
        services.AddTransient<SmartLedController>();
        services.AddTransient<TemperatureMonitor>();  // Add this line
    }
}
```

### 3. Configure in DevHost

Update `MyFirstVionLibrary.DevHost/Program.cs`:

```csharp
var config = configBuilder
    // Existing configuration...
    .AddLogicBlock<HelloWorld>("HelloWorld", "hw-1")
    
    // Add your new LogicBlock
    .AddLogicBlock<TemperatureMonitor>("TempMonitor", "tm-1")
    
    .Build();
```

### 4. Run and Test

1. Press **F5** to run
2. Open `http://localhost:5000` in your browser
3. Navigate to the **Services** tab
4. Find **TempMonitor** and watch the temperature values update
5. Try changing the `TemperatureThreshold` property

## Understanding the DevHost

The DevHost provides a local development environment with:

- **Web UI** - Monitor and interact with your LogicBlocks at `http://localhost:5000`
- **Simulated Hardware** - Mock I/O without physical devices
- **Actor System** - Same runtime behavior as production
- **Real-time Updates** - See property and telemetry changes live

### DevHost Configuration

The `DevConfigurationBuilder` lets you:

**Add Hardware:**
```csharp
.AddHardwareBlock("gpio", hw => hw
    .WithDigitalInputs("button1", "button2")
    .WithDigitalOutputs("led1", "led2")
    .WithAnalogInputs("temp1"))
```

**Add LogicBlocks:**
```csharp
.AddLogicBlock<MyLogicBlock>("MyBlock", "instance-1")
```

**Map I/O:**
```csharp
.AddLogicBlock<MyLogicBlock>("MyBlock", "instance-1", lb => lb
    .WithIoMapping("Button", "gpio", "button1")
    .WithIoMapping("LED", "gpio", "led1"))
```

## Common Tasks

### Install Template Updates

```bash
dotnet new uninstall Vion.Library.Template
dotnet new install Vion.Library.Template::0.0.2
```

### Update SDK and/or DevHost Package Versions in your library project

```bash
cd MyFirstVionLibrary
dotnet add package Dale.Sdk --version 0.0.25
```

```bash
cd MyFirstVionLibrary.DevHost
dotnet add package Dale.DevHost.Web --version 0.0.2
```

### Pack your library for upload to the Vion Dashboard

```bash
cd MyFirstVionLibrary
dotnet pack -c Release -o ./output
```


## Troubleshooting

### Template Not Found

Make sure the Azure Artifacts feed is configured:

```bash
dotnet nuget list source
```

You should see `ecocoach.csharplogicsystem` in the list.

### Browser Doesn't Open

Manually navigate to `http://localhost:5000` after starting the DevHost.

### Build Errors

Ensure you have .NET 9 SDK installed:

```bash
dotnet --version  # Should be 9.0.x or higher
```

## Next Steps

- Learn about LogicBlock core concepts
- Explore working with hardware I/O
- Understand service properties and measuring points
- Connect LogicBlocks using logic interfaces
- Package and deploy to production

## Getting Help

- **Repository**: [GitHub](https://github.com/vion-iot)
- **Issues**: Contact the Vion IoT team