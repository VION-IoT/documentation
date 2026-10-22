---
title: Testing
description: Unit testing logic blocks with the Dale TestKit using mocks, test contexts, and assertion helpers.
---

# Testing

The Dale TestKit provides a minimal actor context for unit testing logic blocks. It records messages, mocks dependencies, and exposes helpers for verifying outputs, property changes, timers, and I/O behavior.

## Overview

- TestKit provides a lightweight actor context that captures all outgoing messages.
- Built on [Moq](https://github.com/moq/moq4) for mocking dependencies.
- Tests follow the **Arrange-Act-Assert** pattern.
- No real runtime or hardware is needed; everything is simulated in-process.

## Quick Start

For simple tests where you only need an initialized block:

```csharp
var block = new MyBlock(LogicBlockTestHelper.CreateLoggerMock().Object);
block.InitializeForTest();
// block is now ready to test
```

`InitializeForTest()` runs the block through its initialization lifecycle so properties and I/O are wired up and ready.

## Test Context Builder

For full control over the test environment, use the test context builder. This lets you configure interface mappings, persistent values, and injected services.

```csharp
var testContext = block.CreateTestContext()
    .WithLogicInterfaceMapping<IMyInterface>(new InterfaceId("remote-id", "IMyInterface"))
    .WithPersistentValue(b => b.SavedValue, 42)
    .WithServices(services => services.AddSingleton(mockService.Object))
    .Build();
```

| Method                          | Purpose                                                  |
|---------------------------------|----------------------------------------------------------|
| `WithLogicInterfaceMapping`     | Wire a logic interface to a remote `InterfaceId`.        |
| `WithPersistentValue`           | Pre-load a persisted property value.                     |
| `WithServices`                  | Register additional services into the DI container.      |
| `WithEmissionPolicy`            | Turn the emission policy on or off under the fake clock. See [Testing Emission Policy](#testing-emission-policy). |
| `Build`                         | Finalize and return the test context.                    |

## Verifying Messages

After triggering an action on the block, verify that it sent the expected messages:

```csharp
testContext.VerifySendRequest<MyRequest>(toId, msg => Assert.Equal(10, msg.Value));
testContext.VerifySendStateUpdate<MyUpdate>();
testContext.VerifySendCommand<MyCommand>(toId, times: Times.Once());
```

- `VerifySendRequest` checks that a request message was sent to a specific target with matching content.
- `VerifySendStateUpdate` checks that a state update was broadcast.
- `VerifySendCommand` checks that a command was sent, with optional call-count verification.

## Verifying Property Changes

Verify that service properties and measuring points changed to expected values:

```csharp
testContext.VerifyServicePropertyChanged(b => b.Temperature, val => Assert.Equal(22.0, val));
testContext.VerifyServiceMeasuringPointChanged(b => b.Power, val => Assert.True(val > 0));
```

The lambda selector identifies the property by expression, and the assertion callback validates the new value.

## Testing Timers

Fire timer callbacks manually and inspect their configured intervals:

```csharp
block.FireTimer(lb => lb.OnTimer());
var interval = block.GetTimerInterval(lb => lb.OnTimer());
Assert.Equal(TimeSpan.FromSeconds(5), interval);
```

- `FireTimer` invokes the timer handler immediately without waiting for the real interval.
- `GetTimerInterval` returns the `TimeSpan` the block registered for that timer.

## Testing Time-Dependent Code

The test context hosts a virtual clock — a `FakeTimeProvider` — that backs both `TimeProvider.GetUtcNow()` reads inside the block and the deadlines attached to `InvokeSynchronizedAfter` actions. The clock is anchored at `2026-01-01 UTC` by default and only moves when the test advances it.

Move the clock forward to fire scheduled actions and observe time-driven state:

```csharp
testContext.AdvanceTime(TimeSpan.FromSeconds(5));
Assert.Equal(5, block.ElapsedSeconds);
```

`AdvanceTime` fires every queued action whose deadline lies within the advance window, in deadline order. The clock is set to each action's deadline before the action runs, so an action's own `UtcNow` read sees the time it was scheduled for. Use this instead of `FlushPendingActions` when the block's behaviour depends on the actual elapsed time.

Read the current virtual time with `VirtualNow`:

```csharp
Assert.Equal(new DateTime(2026, 1, 1, 0, 0, 5), testContext.VirtualNow);
```

When the block takes a `TimeProvider` in its constructor, share the same `FakeTimeProvider` between the block and the test context so both read the same `UtcNow`:

```csharp
var clock = new FakeTimeProvider(new DateTimeOffset(2026, 1, 1, 0, 0, 0, TimeSpan.Zero));
var block = new MyBlock(clock, LogicBlockTestHelper.CreateLoggerMock().Object);
var testContext = block.CreateTestContext()
    .WithTimeProvider(clock)
    .Build();

testContext.AdvanceTime(TimeSpan.FromMinutes(1));  // advances both
```

| Member | Purpose |
|--------|---------|
| `TimeProvider` | The `FakeTimeProvider` backing the test context. Inject as `TimeProvider` into the block for deterministic `UtcNow`. |
| `VirtualNow` | Current virtual time. Shorthand for `TimeProvider.GetUtcNow().UtcDateTime`. |
| `AdvanceTime(TimeSpan)` | Advance the clock and fire elapsed `InvokeSynchronizedAfter` actions in deadline order. |
| `WithTimeProvider(FakeTimeProvider)` | Bind the test context to a caller-owned clock so the block and the context share one instance. |

## Testing Emission Policy

Under the fake clock the [emission policy](/sdk/properties#emission-policy) is **off** by default (`EmissionPolicyMode.Off`), so every assignment surfaces as a change. Opt in with `WithEmissionPolicy(EmissionPolicyMode.FromAttributes)` to run the block's attribute gates, drive the trailing-edge flush with `AdvanceTime`, and assert post-gate emissions with `VerifyServicePropertyEmitted` / `VerifyServiceMeasuringPointEmitted` (both take an optional `times`):

```csharp
using System;
using Moq;
using Vion.Dale.Sdk.TestKit;
using Xunit;

namespace Examples.Emission.Test
{
    public class SensorBlockShould
    {
        [Fact]
        public void DropTheReadingWhenTheSetpointMovesBelowTheDeadband()
        {
            var block = LogicBlockTestHelper.Create<SensorBlock>();
            var ctx = block.CreateTestContext()
                .WithEmissionPolicy(EmissionPolicyMode.FromAttributes)
                .Build();

            block.Setpoint = 26.0;
            block.OnTick(); // Reading = 26 -> leading-edge emit (1)
            block.Setpoint = 26.2;
            block.OnTick(); // Δ0.2 < 0.5 -> dropped by the deadband

            ctx.VerifyServiceMeasuringPointEmitted(lb => lb.Reading, times: Times.Once());
        }

        [Fact]
        public void CoalesceTheThrottledTemperatureBurst()
        {
            var block = LogicBlockTestHelper.Create<SensorBlock>();
            var ctx = block.CreateTestContext()
                .WithEmissionPolicy(EmissionPolicyMode.FromAttributes)
                .Build();

            // Drive 12 ticks 250 ms apart; Temperature is throttled to 2 s.
            for (var i = 0; i < 12; i++)
            {
                block.Setpoint = 20.0 + i;
                block.OnTick();
                ctx.AdvanceTime(TimeSpan.FromMilliseconds(250));
            }

            // The 12 changes coalesce latest-wins and flush on the 2 s interval.
            ctx.VerifyServiceMeasuringPointEmitted(lb => lb.Temperature, times: Times.AtMost(4));
        }
    }
}
```

[Scenarios](/sdk/scenarios) are the deterministic executable counterpart to these unit tests. `dale scenario scaffold` graduates a scenario that outgrows the JSON format into an xUnit test that runs it against a wired DevHost, with `TODO` assertions and a `CreateHostAsync` for you to implement.

## Testing I/O

Simulate hardware input changes and verify output writes:

```csharp
// Digital I/O
block.DigitalInput.RaiseInputChanged(true);
testContext.VerifyDigitalOutputSet(block.Led, true);

// Analog I/O
block.TemperatureSensor.RaiseInputChanged(22.5);
testContext.VerifyAnalogOutputSet(block.Heater, value: 0.8, tolerance: 0.1);
```

- `RaiseInputChanged` simulates a hardware event on an input.
- `VerifyDigitalOutputSet` asserts that a digital output was set to the expected boolean value.
- `VerifyAnalogOutputSet` asserts that an analog output was set within a tolerance range.
- The helpers come from the `Vion.Dale.Sdk.DigitalIo.TestKit` and `Vion.Dale.Sdk.AnalogIo.TestKit` packages, under namespaces of the same names.

## Testing HTTP

The `Vion.Dale.Sdk.Http.TestKit` package scripts the answers an HTTP client receives. Pass the harness's `Client` to the block, trigger the request, then respond:

```csharp
using System;
using Vion.Dale.Sdk.Http.TestKit;
using Vion.Dale.Sdk.TestKit;
using Xunit;

public sealed class WeatherStationShould : IDisposable
{
    private readonly FakeHttpHarness _http = new();

    public void Dispose() => _http.Dispose();

    [Fact]
    public void StoreTheReportedTemperature()
    {
        var block = new WeatherStation(LogicBlockTestHelper.CreateLoggerMock().Object, _http.Client);
        var testContext = block.CreateTestContext().Build();

        block.FetchWeather();
        _http.Respond("{\"temperature\":21.5}");
        testContext.FlushPendingActions();

        Assert.Equal(21.5, block.Temperature);
    }
}
```

`Respond(HttpStatusCode)` and `Fail(exception)` script the other outcomes, and `Requests` lists what the block sent. `FakeHttpServerHarness` does the same for a block that serves HTTP.

## Flushing Pending Actions

When your block uses `InvokeSynchronizedAfter` to schedule deferred work, flush those pending actions before asserting:

```csharp
testContext.FlushPendingActions();
```

This processes all queued callbacks synchronously so you can verify their side effects immediately.

## Complete Example

Tests for the `Ping` block of the PingPong example in the Dale SDK repository, covering message handling, a property that changes behaviour, a measuring point and a timer:

```csharp
using System;
using Moq;
using Vion.Dale.Sdk.TestKit;
using Vion.Dale.Sdk.Utils;
using Vion.Examples.PingPong.Contracts;
using Vion.Examples.PingPong.LogicBlocks;
using Xunit;

public class PingShould
{
    private readonly InterfaceId _mappedPong = new("pong-id", "IPong");

    [Fact]
    public void SendPingRequestOnPongResponse()
    {
        var ping = new Ping(LogicBlockTestHelper.CreateLoggerMock().Object);
        var testContext = ping.CreateTestContext()
            .WithLogicInterfaceMapping(lb => lb, _mappedPong)
            .Build();
        testContext.ClearRecordedMessages();

        ping.HandleResponse(_mappedPong, new PingPong.PongResponse());

        testContext.VerifySendRequest<PingPong.PingRequest>(_mappedPong);
    }

    [Fact]
    public void NotSendPingRequestWhenPaused()
    {
        var ping = new Ping(LogicBlockTestHelper.CreateLoggerMock().Object);
        var testContext = ping.CreateTestContext()
            .WithLogicInterfaceMapping(lb => lb, _mappedPong)
            .Build();
        ping.Pause = true;
        testContext.ClearRecordedMessages();

        ping.HandleResponse(_mappedPong, new PingPong.PongResponse());

        testContext.VerifySendRequest<PingPong.PingRequest>(times: Times.Never());
    }

    [Fact]
    public void CountPingsPerSecond()
    {
        var ping = new Ping(LogicBlockTestHelper.CreateLoggerMock().Object);
        ping.CreateTestContext()
            .WithLogicInterfaceMapping(lb => lb, _mappedPong)
            .WithoutAutoStart()
            .Build();

        ping.HandleResponse(_mappedPong, new PingPong.PongResponse());
        ping.LogCount();

        Assert.Equal(1, ping.PingsPerSecond);
    }

    [Fact]
    public void LogCountEverySecond()
    {
        var ping = new Ping(LogicBlockTestHelper.CreateLoggerMock().Object);
        ping.InitializeForTest();

        Assert.Equal(TimeSpan.FromSeconds(1), ping.GetTimerInterval(lb => lb.LogCount()));
    }
}
```

## Running Tests

Run all tests in your Dale project from the command line:

```bash
dale test
```

This discovers and executes all test projects in the solution, reporting results to the console.
