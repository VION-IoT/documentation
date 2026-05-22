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
    .WithLogicInterfaceMapping<IMyInterface>(remoteBlockId)
    .WithPersistentValue(b => b.SavedValue, 42)
    .WithServices(services => services.AddSingleton(mockService.Object))
    .Build();
```

| Method                          | Purpose                                                  |
|---------------------------------|----------------------------------------------------------|
| `WithLogicInterfaceMapping`     | Wire a service interface to a remote block ID.           |
| `WithPersistentValue`           | Pre-load a persisted property value.                     |
| `WithServices`                  | Register additional services into the DI container.      |
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

## Flushing Pending Actions

When your block uses `InvokeSynchronizedAfter` to schedule deferred work, flush those pending actions before asserting:

```csharp
testContext.FlushPendingActions();
```

This processes all queued callbacks synchronously so you can verify their side effects immediately.

## Complete Example

A full test class for the PingPong sample, testing initialization, message handling, pause behavior, and timer interaction:

```csharp
public class PingBlockTests
{
    private readonly PingBlock _block;
    private readonly LogicBlockTestContext _testContext;
    private readonly LogicBlockId _pongBlockId = new("pong-block-1");

    public PingBlockTests()
    {
        _block = new PingBlock(LogicBlockTestHelper.CreateLoggerMock().Object);
        _testContext = _block.CreateTestContext()
            .WithLogicInterfaceMapping<IPong>(_pongBlockId)
            .WithPersistentValue(b => b.TotalPings, 0)
            .Build();
    }

    [Fact]
    public void InitialState_PingsPerSecondIsZero()
    {
        Assert.Equal(0, _block.PingsPerSecond);
        Assert.False(_block.Pause);
    }

    [Fact]
    public void SendsPingOnTimer()
    {
        _block.FireTimer(lb => lb.OnPingTimer());

        _testContext.VerifySendRequest<PingRequest>(
            _pongBlockId,
            msg => Assert.True(msg.Timestamp > 0));
    }

    [Fact]
    public void PauseStopsSendingPings()
    {
        _block.Pause = true;

        _block.FireTimer(lb => lb.OnPingTimer());

        _testContext.VerifySendRequest<PingRequest>(
            _pongBlockId, times: Times.Never());
    }

    [Fact]
    public void ReceivingPongUpdatesMeasuringPoint()
    {
        _block.HandleResponse(new PongResponse { PingId = 1 });

        _testContext.VerifyServiceMeasuringPointChanged(
            b => b.PingsPerSecond,
            val => Assert.True(val > 0));
    }

    [Fact]
    public void TimerIntervalIsFiveSeconds()
    {
        var interval = _block.GetTimerInterval(lb => lb.OnPingTimer());
        Assert.Equal(TimeSpan.FromSeconds(5), interval);
    }

    [Fact]
    public void PersistentValueIsRestored()
    {
        Assert.Equal(0, _block.TotalPings);
    }
}
```

## Running Tests

Run all tests in your Dale project from the command line:

```bash
dale test
```

This discovers and executes all test projects in the solution, reporting results to the console.
