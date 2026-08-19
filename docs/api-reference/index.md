---
title: SDK API Reference
description: Auto-generated API reference for types marked with [PublicApi].
---

# Vion Dale SDK API Reference

> Auto-generated from source code. Types marked with `[PublicApi]`.

## Vion.Dale.Sdk.AnalogIo.TestKit

### IAnalogInputExtensions

Extension methods to simulate analog input changes in tests.

**Methods:**

- `RaiseInputChanged(IAnalogInput, double)` — Raise the InputChanged event on an `IAnalogInput` for tests.
  - `analogInput`: The analog input instance to raise the event on.
  - `value`: The new analog input value.

---

### IAnalogOutputExtensions

Extension methods to simulate analog output changes in tests.

**Methods:**

- `RaiseOutputChanged(IAnalogOutput, double)` — Raise the OutputChanged event on an `IAnalogOutput` for tests.
  - `analogOutput`: The analog output instance to raise the event on.
  - `value`: The new analog output value.

---

### LogicBlockTestContextExtensions

Extension methods to verify analog output messages in test contexts.

**Methods:**

- `VerifyAnalogOutputSet<T>(LogicBlockTestContext<T>, IAnalogOutput, double?, double, Times?)` — Assert that at the specified analog output was set with the given value.
  - `testContext`: The test context for the logic block.
  - `analogOutput`: The analog output to verify, or null to verify any analog output.
  - `value`: The expected value, or null to skip value verification.
  - `tolerance`: The tolerance for comparing the expected value.
  - `times`: The expected number of times the output was set, or null for once.

---

## Vion.Dale.Sdk.AnalogIo.Input

### IAnalogInput

Represents an analog input that can be used to communicate with hardware.

---

## Vion.Dale.Sdk.AnalogIo.Output

### IAnalogOutput

Represents an analog output that can be used to communicate with hardware.

**Methods:**

- `Set(double)` — Sets the analog output to the specified value.
  - `value`: The value to set the analog output to.

---

## Vion.Dale.Sdk.DigitalIo.TestKit

### IDigitalInputExtensions

Extension methods to simulate digital input changes in tests.

**Methods:**

- `RaiseInputChanged(IDigitalInput, bool)` — Raise the InputChanged event on an `IDigitalInput` for tests.
  - `digitalInput`: The digital input instance to raise the event on.
  - `value`: The new digital input value.

---

### IDigitalOutputExtensions

Extension methods to simulate digital output changes in tests.

**Methods:**

- `RaiseOutputChanged(IDigitalOutput, bool)` — Raise the OutputChanged event on an `IDigitalOutput` for tests.
  - `digitalOutput`: The digital output instance to raise the event on.
  - `value`: The new digital output value.

---

### LogicBlockTestContextExtensions

Extension methods to verify digital output messages in test contexts.

**Methods:**

- `VerifyDigitalOutputSet<T>(LogicBlockTestContext<T>, IDigitalOutput, bool?, Times?)` — Assert that at the specified digital output was set with the given value.
  - `testContext`: The test context for the logic block.
  - `digitalOutput`: The digital output to verify, or null to verify any digital output.
  - `value`: The expected value, or null to skip value verification.
  - `times`: The expected number of times the output was set, or null for once.

---

## Vion.Dale.Sdk.DigitalIo.Input

### IDigitalInput

Represents a digital input that can be used to communicate with hardware.

---

## Vion.Dale.Sdk.DigitalIo.Output

### IDigitalOutput

Represents a digital output that can be used to communicate with hardware.

**Methods:**

- `Set(bool)` — Sets the digital output to the specified value.
  - `value`: The value to set the digital output to.

---

## Vion.Dale.Sdk.Http

### ILogicBlockHttpClient

Provides non-blocking HTTP client functionality for logic blocks.

**Methods:**

- `GetJson<T>(IActorDispatcher, string, Action<T>, Action<Exception>, Dictionary<string, string>, TimeSpan?)` — Performs a non-blocking HTTP GET request and passes the deserialized JSON response to the callback.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `url`: The URL to send the GET request to.
  - `successCallback`: Callback invoked with the deserialized response on success.
  - `errorCallback`: Callback invoked with the exception if the request fails. Usually an `HttpRequestException` or `TimeoutException`. Errors are always logged, regardless of whether an error callback is specified.
  - `headers`: HTTP headers to include in the request.
  - `timeout`: Request-specific timeout that overrides the `HttpClient`'s default timeout.
- `PostJson<T, T2>(IActorDispatcher, string, T, Action<T2>, Action<Exception>, Dictionary<string, string>, TimeSpan?)` — Performs a non-blocking HTTP POST request with a JSON body and passes the deserialized JSON response to the callback.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `url`: The URL to send the POST request to.
  - `body`: The object to serialize as the JSON request body.
  - `successCallback`: Callback invoked with the deserialized response on success.
  - `errorCallback`: Callback invoked with the exception if the request fails. Usually an `HttpRequestException` or `TimeoutException`. Errors are always logged, regardless of whether an error callback is specified.
  - `headers`: HTTP headers to include in the request.
  - `timeout`: Request-specific timeout that overrides the `HttpClient`'s default timeout.
- `PostJson<T>(IActorDispatcher, string, T, Action, Action<Exception>, Dictionary<string, string>, TimeSpan?)` — Performs a non-blocking HTTP POST request with a JSON body. The callback is invoked on success without a response body.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `url`: The URL to send the POST request to.
  - `body`: The object to serialize as the JSON request body.
  - `successCallback`: Callback invoked when the request succeeds.
  - `errorCallback`: Callback invoked with the exception if the request fails. Usually an `HttpRequestException` or `TimeoutException`. Errors are always logged, regardless of whether an error callback is specified.
  - `headers`: HTTP headers to include in the request.
  - `timeout`: Request-specific timeout that overrides the `HttpClient`'s default timeout.
- `PutJson<T, T2>(IActorDispatcher, string, T, Action<T2>, Action<Exception>, Dictionary<string, string>, TimeSpan?)` — Performs a non-blocking HTTP PUT request with a JSON body and passes the deserialized JSON response to the callback.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block). Errors are always logged, regardless of whether an error callback is specified.
  - `url`: The URL to send the PUT request to.
  - `body`: The object to serialize as the JSON request body.
  - `successCallback`: Callback invoked with the deserialized response on success.
  - `errorCallback`: Callback invoked with the exception if the request fails. Usually an `HttpRequestException` or `TimeoutException`.
  - `headers`: HTTP headers to include in the request.
  - `timeout`: Request-specific timeout that overrides the `HttpClient`'s default timeout.
- `PutJson<T>(IActorDispatcher, string, T, Action, Action<Exception>, Dictionary<string, string>, TimeSpan?)` — Performs a non-blocking HTTP PUT request with a JSON body. The callback is invoked on success without a response body.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `url`: The URL to send the PUT request to.
  - `body`: The object to serialize as the JSON request body.
  - `successCallback`: Callback invoked when the request succeeds.
  - `errorCallback`: Callback invoked with the exception if the request fails. Usually an `HttpRequestException` or `TimeoutException`. Errors are always logged, regardless of whether an error callback is specified.
  - `headers`: HTTP headers to include in the request.
  - `timeout`: Request-specific timeout that overrides the `HttpClient`'s default timeout.
- `DeleteJson<T>(IActorDispatcher, string, Action<T>, Action<Exception>, Dictionary<string, string>, TimeSpan?)` — Performs a non-blocking HTTP DELETE request and passes the deserialized JSON response to the callback.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `url`: The URL to send the DELETE request to.
  - `successCallback`: Callback invoked with the deserialized response on success.
  - `errorCallback`: Callback invoked with the exception if the request fails. Usually an `HttpRequestException` or `TimeoutException`. Errors are always logged, regardless of whether an error callback is specified.
  - `headers`: HTTP headers to include in the request.
  - `timeout`: Request-specific timeout that overrides the `HttpClient`'s default timeout.
- `Delete(IActorDispatcher, string, Action, Action<Exception>, Dictionary<string, string>, TimeSpan?)` — Performs a non-blocking HTTP DELETE request. The callback is invoked on success without a response body.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `url`: The URL to send the DELETE request to.
  - `successCallback`: Callback invoked when the request succeeds.
  - `errorCallback`: Callback invoked with the exception if the request fails. Usually an `HttpRequestException` or `TimeoutException`. Errors are always logged, regardless of whether an error callback is specified.
  - `headers`: HTTP headers to include in the request.
  - `timeout`: Request-specific timeout that overrides the `HttpClient`'s default timeout.
- `SendRequest(IActorDispatcher, HttpRequestMessage, Action<HttpResponseMessage>, Action<Exception>, TimeSpan?)` — Performs a non-blocking HTTP request and passes the `HttpResponseMessage` to the callback.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `request`: The `HttpRequestMessage` to send.
  - `successCallback`: Callback invoked with the `HttpResponseMessage` on success.
  - `errorCallback`: Callback invoked with the exception if the request fails. Usually an `HttpRequestException` or `TimeoutException`. Errors are always logged, regardless of whether an error callback is specified.
  - `timeout`: Request-specific timeout that overrides the `HttpClient`'s default timeout.

---

### ServiceCollectionExtensions

Extension methods for setting up logic block HTTP client services in an `IServiceCollection`.

**Methods:**

- `AddDaleHttpSdk(IServiceCollection, Action<HttpClient>)` — Adds HTTP services to the specified `IServiceCollection`.
  - `serviceCollection`: The `IServiceCollection` to add services to.
  - `configureClient`: Action to configure additional settings and/or override defaults.

---

## Vion.Dale.Sdk.Modbus.Core.Client

### IModbusClient

The Modbus operations and link diagnostics every Dale Modbus client offers, whatever the transport.

> Every read and write is non-blocking: the call returns immediately and the result arrives later on the logic block's own thread, through the dispatcher passed with the call. Pass `this` from inside a logic block. Both callbacks carry a `ModbusReceipt` — when the response was observed, how long it took on the wire, how long it waited before that, and how it ended. The instants are taken before the callback is handed to the block's mailbox, so they measure the transaction and not the block's own backlog. Ignore it with a discard where you do not need it: `(values, _) =&gt; Power = values[0]`. `Link` is the same information accumulated per client: the current verdict on the device, the last contact, and counts and latencies per outcome. It is a snapshot struct, readable at any time and publishable as a single `[ServiceProperty]`. Local outcomes — a full or backed-up queue, a bad unit id — are counted there but never move `Link.State`, so a congested client is distinguishable from a broken device. `MaxQueuedAge` bounds how stale a request may be when its turn finally comes. Past that age a request completes immediately with `Outcome.Expired` and the device is never contacted, so a queue that built up during an outage drains in microseconds instead of replaying minutes of dead work. It defaults to 30 seconds; set it to `null` to let every queued request through however old it is. `DefaultOperationTimeout` covers the wire only — from dispatch to the complete response. The wait before dispatch is `MaxQueuedAge`'s business, and both appear separately on the receipt as `RoundTrip` and `QueuedWait`. What differs between the transports is inherent and is stated on each client type: Modbus TCP owns one socket and one request queue per client, so it also reports a connection summary and a queue depth, and defaults to a 1 second operation timeout. Modbus RTU goes through one runtime-wide handler shared by every binding, so its overflow limit and its 1 second expiry sweep are shared with other blocks, its queue depth is reported as zero, and it defaults to a 5 second operation timeout.

**Properties:**

- `IsEnabled` — Gets or sets whether the client executes operations. Default is `false`.
- `DefaultOperationTimeout` — Gets or sets the wire timeout used by operations that do not pass their own.
- `MaxQueuedAge` — Gets or sets how stale a request may be when its turn comes. Default is 30 seconds; `null` disables the check.
- `Link` — Gets a snapshot of the link to the device: current verdict, last contact, and counts per outcome.

**Methods:**

- `ReadDiscreteInputs(int, ushort, ushort, IActorDispatcher, Action<bool[], ModbusReceipt>, Action<Exception, ModbusReceipt>, TimeSpan?)` — Reads discrete inputs (Function Code 2).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or bit to read.
  - `quantity`: The number of registers or bits to read.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the bits read and the transaction's receipt.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `ReadCoils(int, ushort, ushort, IActorDispatcher, Action<bool[], ModbusReceipt>, Action<Exception, ModbusReceipt>, TimeSpan?)` — Reads coils (Function Code 1).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or bit to read.
  - `quantity`: The number of registers or bits to read.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the bits read and the transaction's receipt.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `WriteSingleCoil(int, ushort, bool, IActorDispatcher, Action<ModbusReceipt>, Action<Exception, ModbusReceipt>, TimeSpan?)` — Writes one coil (Function Code 5).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `registerAddress`: The address of the register or coil to write.
  - `value`: The value to write.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the transaction's receipt when the device acknowledges the write.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `WriteMultipleCoils(int, ushort, bool[], IActorDispatcher, Action<ModbusReceipt>, Action<Exception, ModbusReceipt>, TimeSpan?)` — Writes several consecutive coils (Function Code 15).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or coil to write.
  - `values`: The values to write.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the transaction's receipt when the device acknowledges the write.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `ReadInputRegistersRaw(int, ushort, ushort, IActorDispatcher, Action<byte[], ModbusReceipt>, Action<Exception, ModbusReceipt>, TimeSpan?)` — Reads input registers as raw bytes (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or bit to read.
  - `quantity`: The number of registers or bits to read.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the raw response bytes and the transaction's receipt.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `ReadInputRegistersAsShort(int, ushort, ushort, IActorDispatcher, Action<short[], ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, TimeSpan?)` — Reads input registers as signed 16-bit integers (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or bit to read.
  - `quantity`: The number of registers or bits to read.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the values read and the transaction's receipt.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `ReadInputRegistersAsUShort(int, ushort, ushort, IActorDispatcher, Action<ushort[], ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, TimeSpan?)` — Reads input registers as unsigned 16-bit integers (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or bit to read.
  - `quantity`: The number of registers or bits to read.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the values read and the transaction's receipt.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `ReadInputRegistersAsInt(int, ushort, uint, IActorDispatcher, Action<int[], ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, WordOrder32, TimeSpan?)` — Reads input registers as signed 32-bit integers (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or bit to read.
  - `count`: The number of values to read.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the values read and the transaction's receipt.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `wordOrder`: The order of the registers making up one value.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `ReadInputRegistersAsUInt(int, ushort, uint, IActorDispatcher, Action<uint[], ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, WordOrder32, TimeSpan?)` — Reads input registers as unsigned 32-bit integers (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or bit to read.
  - `count`: The number of values to read.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the values read and the transaction's receipt.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `wordOrder`: The order of the registers making up one value.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `ReadInputRegistersAsFloat(int, ushort, uint, IActorDispatcher, Action<float[], ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, WordOrder32, TimeSpan?)` — Reads input registers as 32-bit floating point values (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or bit to read.
  - `count`: The number of values to read.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the values read and the transaction's receipt.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `wordOrder`: The order of the registers making up one value.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `ReadInputRegistersAsLong(int, ushort, uint, IActorDispatcher, Action<long[], ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, WordOrder64, TimeSpan?)` — Reads input registers as signed 64-bit integers (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or bit to read.
  - `count`: The number of values to read.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the values read and the transaction's receipt.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `wordOrder`: The order of the registers making up one value.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `ReadInputRegistersAsULong(int, ushort, uint, IActorDispatcher, Action<ulong[], ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, WordOrder64, TimeSpan?)` — Reads input registers as unsigned 64-bit integers (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or bit to read.
  - `count`: The number of values to read.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the values read and the transaction's receipt.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `wordOrder`: The order of the registers making up one value.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `ReadInputRegistersAsDouble(int, ushort, uint, IActorDispatcher, Action<double[], ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, WordOrder64, TimeSpan?)` — Reads input registers as 64-bit floating point values (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or bit to read.
  - `count`: The number of values to read.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the values read and the transaction's receipt.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `wordOrder`: The order of the registers making up one value.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `ReadInputRegistersAsString(int, ushort, ushort, IActorDispatcher, Action<string, ModbusReceipt>, Action<Exception, ModbusReceipt>, TextEncoding, TimeSpan?)` — Reads input registers as text (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or bit to read.
  - `quantity`: The number of registers or bits to read.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the decoded text and the transaction's receipt.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `textEncoding`: The character encoding of the register bytes.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `ReadHoldingRegistersRaw(int, ushort, ushort, IActorDispatcher, Action<byte[], ModbusReceipt>, Action<Exception, ModbusReceipt>, TimeSpan?)` — Reads holding registers as raw bytes (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or bit to read.
  - `quantity`: The number of registers or bits to read.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the raw response bytes and the transaction's receipt.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `ReadHoldingRegistersAsShort(int, ushort, ushort, IActorDispatcher, Action<short[], ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, TimeSpan?)` — Reads holding registers as signed 16-bit integers (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or bit to read.
  - `quantity`: The number of registers or bits to read.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the values read and the transaction's receipt.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `ReadHoldingRegistersAsUShort(int, ushort, ushort, IActorDispatcher, Action<ushort[], ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, TimeSpan?)` — Reads holding registers as unsigned 16-bit integers (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or bit to read.
  - `quantity`: The number of registers or bits to read.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the values read and the transaction's receipt.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `ReadHoldingRegistersAsInt(int, ushort, uint, IActorDispatcher, Action<int[], ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, WordOrder32, TimeSpan?)` — Reads holding registers as signed 32-bit integers (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or bit to read.
  - `count`: The number of values to read.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the values read and the transaction's receipt.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `wordOrder`: The order of the registers making up one value.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `ReadHoldingRegistersAsUInt(int, ushort, uint, IActorDispatcher, Action<uint[], ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, WordOrder32, TimeSpan?)` — Reads holding registers as unsigned 32-bit integers (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or bit to read.
  - `count`: The number of values to read.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the values read and the transaction's receipt.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `wordOrder`: The order of the registers making up one value.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `ReadHoldingRegistersAsFloat(int, ushort, uint, IActorDispatcher, Action<float[], ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, WordOrder32, TimeSpan?)` — Reads holding registers as 32-bit floating point values (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or bit to read.
  - `count`: The number of values to read.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the values read and the transaction's receipt.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `wordOrder`: The order of the registers making up one value.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `ReadHoldingRegistersAsLong(int, ushort, uint, IActorDispatcher, Action<long[], ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, WordOrder64, TimeSpan?)` — Reads holding registers as signed 64-bit integers (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or bit to read.
  - `count`: The number of values to read.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the values read and the transaction's receipt.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `wordOrder`: The order of the registers making up one value.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `ReadHoldingRegistersAsULong(int, ushort, uint, IActorDispatcher, Action<ulong[], ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, WordOrder64, TimeSpan?)` — Reads holding registers as unsigned 64-bit integers (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or bit to read.
  - `count`: The number of values to read.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the values read and the transaction's receipt.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `wordOrder`: The order of the registers making up one value.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `ReadHoldingRegistersAsDouble(int, ushort, uint, IActorDispatcher, Action<double[], ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, WordOrder64, TimeSpan?)` — Reads holding registers as 64-bit floating point values (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or bit to read.
  - `count`: The number of values to read.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the values read and the transaction's receipt.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `wordOrder`: The order of the registers making up one value.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `ReadHoldingRegistersAsString(int, ushort, ushort, IActorDispatcher, Action<string, ModbusReceipt>, Action<Exception, ModbusReceipt>, TextEncoding, TimeSpan?)` — Reads holding registers as text (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or bit to read.
  - `quantity`: The number of registers or bits to read.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the decoded text and the transaction's receipt.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `textEncoding`: The character encoding of the register bytes.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `WriteSingleHoldingRegister(int, ushort, short, IActorDispatcher, Action<ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, TimeSpan?)` — Writes one holding register (Function Code 6).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `registerAddress`: The address of the register or coil to write.
  - `value`: The value to write.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the transaction's receipt when the device acknowledges the write.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `WriteSingleHoldingRegister(int, ushort, ushort, IActorDispatcher, Action<ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, TimeSpan?)` — Writes one holding register (Function Code 6).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `registerAddress`: The address of the register or coil to write.
  - `value`: The value to write.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the transaction's receipt when the device acknowledges the write.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `WriteMultipleHoldingRegistersRaw(int, ushort, byte[], IActorDispatcher, Action<ModbusReceipt>, Action<Exception, ModbusReceipt>, TimeSpan?)` — Writes consecutive holding registers from raw bytes (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or coil to write.
  - `values`: The values to write.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the transaction's receipt when the device acknowledges the write.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `WriteMultipleHoldingRegistersAsShort(int, ushort, short[], IActorDispatcher, Action<ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, TimeSpan?)` — Writes consecutive holding registers as signed 16-bit integers (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or coil to write.
  - `values`: The values to write.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the transaction's receipt when the device acknowledges the write.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `WriteMultipleHoldingRegistersAsUShort(int, ushort, ushort[], IActorDispatcher, Action<ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, TimeSpan?)` — Writes consecutive holding registers as unsigned 16-bit integers (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or coil to write.
  - `values`: The values to write.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the transaction's receipt when the device acknowledges the write.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `WriteMultipleHoldingRegistersAsInt(int, ushort, int[], IActorDispatcher, Action<ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, WordOrder32, TimeSpan?)` — Writes consecutive holding registers as signed 32-bit integers (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or coil to write.
  - `values`: The values to write.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the transaction's receipt when the device acknowledges the write.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `wordOrder`: The order of the registers making up one value.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `WriteMultipleHoldingRegistersAsUInt(int, ushort, uint[], IActorDispatcher, Action<ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, WordOrder32, TimeSpan?)` — Writes consecutive holding registers as unsigned 32-bit integers (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or coil to write.
  - `values`: The values to write.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the transaction's receipt when the device acknowledges the write.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `wordOrder`: The order of the registers making up one value.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `WriteMultipleHoldingRegistersAsFloat(int, ushort, float[], IActorDispatcher, Action<ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, WordOrder32, TimeSpan?)` — Writes consecutive holding registers as 32-bit floating point values (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or coil to write.
  - `values`: The values to write.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the transaction's receipt when the device acknowledges the write.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `wordOrder`: The order of the registers making up one value.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `WriteMultipleHoldingRegistersAsLong(int, ushort, long[], IActorDispatcher, Action<ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, WordOrder64, TimeSpan?)` — Writes consecutive holding registers as signed 64-bit integers (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or coil to write.
  - `values`: The values to write.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the transaction's receipt when the device acknowledges the write.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `wordOrder`: The order of the registers making up one value.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `WriteMultipleHoldingRegistersAsULong(int, ushort, ulong[], IActorDispatcher, Action<ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, WordOrder64, TimeSpan?)` — Writes consecutive holding registers as unsigned 64-bit integers (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or coil to write.
  - `values`: The values to write.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the transaction's receipt when the device acknowledges the write.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `wordOrder`: The order of the registers making up one value.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `WriteMultipleHoldingRegistersAsDouble(int, ushort, double[], IActorDispatcher, Action<ModbusReceipt>, Action<Exception, ModbusReceipt>, ByteOrder, WordOrder64, TimeSpan?)` — Writes consecutive holding registers as 64-bit floating point values (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or coil to write.
  - `values`: The values to write.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the transaction's receipt when the device acknowledges the write.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `byteOrder`: The byte order of each register.
  - `wordOrder`: The order of the registers making up one value.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.
- `WriteMultipleHoldingRegistersAsString(int, ushort, string, IActorDispatcher, Action<ModbusReceipt>, Action<Exception, ModbusReceipt>, TextEncoding, TimeSpan?)` — Writes consecutive holding registers as text (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address) of the device.
  - `startingAddress`: The address of the first register or coil to write.
  - `value`: The value to write.
  - `dispatcher`: The dispatcher that invokes the callbacks — pass the calling logic block (`this`).
  - `successCallback`: Invoked with the transaction's receipt when the device acknowledges the write.
  - `errorCallback`: Invoked with the failure and the transaction's receipt. Failures are logged whether or not this is set.
  - `textEncoding`: The character encoding of the register bytes.
  - `operationTimeout`: The time allowed on the wire before the operation is abandoned. `null` uses `DefaultOperationTimeout`.

---

## Vion.Dale.Sdk.Modbus.Core.Conversion

### ByteOrder

Specifies the byte order for multibyte values.

> The Modbus protocol standard defines `MsbToLsb` (big-endian) as the standard byte order. However, not all devices respect this standard, so both byte orders are supported.

**Fields/Values:**

- `MsbToLsb` — Most significant byte first (big-endian).
- `LsbToMsb` — Least significant byte first (little-endian).

---

### TextEncoding

Specifies the text encoding format for string conversion.

**Fields/Values:**

- `Ascii` — ASCII encoding (7-bit character set).
- `Utf8` — UTF-8 encoding (variable-length, 1-4 bytes per character).
- `Utf16Le` — UTF-16 Little Endian encoding (2 or 4 bytes per character).
- `Utf16Be` — UTF-16 Big Endian encoding (2 or 4 bytes per character).

---

### WordOrder32

Specifies the word order for 32-bit values composed of two 16-bit words.

**Fields/Values:**

- `MswToLsw` — Most significant word first (big-endian word order).
- `LswToMsw` — Least significant word first (little-endian word order).

---

### WordOrder64

Specifies the word order for 64-bit values composed of four 16-bit words.

**Fields/Values:**

- `ABCD` — Big-endian word order most significant word to least significant word (A is the most significant word).
- `DCBA` — Little-endian word order least significant to most significant word (D is the least significant word).
- `CDAB` — Mid-big-endian word order, big endian because when CD and AB are swapped it results in ABCD which is big-endian (A is the most significant word).
- `BADC` — Mid-little-endian word order, little endian because when BA and DC are swapped it results in DCBA which is little-endian (D is the least significant word).

---

## Vion.Dale.Sdk.Modbus.Core.Diagnostics

### ModbusLinkState

The client's verdict on the link to its device, derived from the last transaction that reached the wire.

**Fields/Values:**

- `Unknown` — No transaction has reached the wire yet.
- `Online` — The device last answered — with data or with a Modbus exception code.
- `Faulted` — The last attempt to reach the device timed out, failed on the transport, or returned an invalid response.

---

### ModbusLinkSummary

A point-in-time summary of one Modbus client's link to its device: the current verdict, when the device was last heard from, and lifetime counts and latencies per outcome.

> Read it whenever you want it — every read returns a consistent snapshot, taken without blocking the transaction that is updating it. Every field is a service-property-legal type, so the whole summary can be published as one `[ServiceProperty]`, and every field carries a title and a description so it reads without a projection. `State` moves only on outcomes that reached the wire: `Success` and `DeviceError` set `Online`; `Timeout`, `TransportError` and `ProtocolError` set `Faulted`. Locally decided outcomes — `Expired`, `Dropped`, `BackedOff`, `Invalid`, `Cancelled` — leave it alone: a full queue or a bad unit id is not evidence about the device. They are still counted, and still set `LastFailureAt` / `LastFailureOutcome`. `State` does not decay with time. A client that is polled once an hour and answered an hour ago is still `Online` here, because only the caller knows its own poll cadence. Build a freshness rule from `LastContactAt`, or from the monotonic stamp on the receipt of the value you care about. Counts and extremes are for the lifetime of the client instance and are never reset.

**Properties:**

- `State` — The verdict of the last transaction that reached the wire.
- `LastContactAt` — When the device last answered, with data or with a Modbus exception code.
- `LastFailureAt` — When the last non-successful outcome was recorded, local ones included.
- `LastFailureOutcome` — The outcome recorded at .
- `SuccessCount` — Transactions the device answered with data.
- `DeviceErrorCount` — Transactions the device answered with a Modbus exception code.
- `TimeoutCount` — Transactions that got no answer in time.
- `TransportErrorCount` — Transactions that failed on the socket or serial stream.
- `ProtocolErrorCount` — Transactions whose answer was not a valid response for the request.
- `BackedOffCount` — Transactions not attempted because the client was in connect backoff.
- `ExpiredCount` — Transactions that aged past `MaxQueuedAge` before dispatch.
- `DroppedCount` — Transactions evicted because the queue was full.
- `LastRoundTrip` — The dispatch-to-response time of the last transaction that reached the wire.
- `MinRoundTrip` — The shortest dispatch-to-response time seen.
- `MaxRoundTrip` — The longest dispatch-to-response time seen.
- `LastQueuedWait` — How long the last transaction waited locally before dispatch.
- `MaxQueuedWait` — The longest local wait before dispatch seen.
- `QueueDepth` — Requests waiting to be dispatched right now.

**Methods:**

- *Constructor* — A point-in-time summary of one Modbus client's link to its device: the current verdict, when the device was last heard from, and lifetime counts and latencies per outcome.
  - `State`: The verdict of the last transaction that reached the wire.
  - `LastContactAt`: When the device last answered, with data or with a Modbus exception code.
  - `LastFailureAt`: When the last non-successful outcome was recorded, local ones included.
  - `LastFailureOutcome`: The outcome recorded at .
  - `SuccessCount`: Transactions the device answered with data.
  - `DeviceErrorCount`: Transactions the device answered with a Modbus exception code.
  - `TimeoutCount`: Transactions that got no answer in time.
  - `TransportErrorCount`: Transactions that failed on the socket or serial stream.
  - `ProtocolErrorCount`: Transactions whose answer was not a valid response for the request.
  - `BackedOffCount`: Transactions not attempted because the client was in connect backoff.
  - `ExpiredCount`: Transactions that aged past `MaxQueuedAge` before dispatch.
  - `DroppedCount`: Transactions evicted because the queue was full.
  - `LastRoundTrip`: The dispatch-to-response time of the last transaction that reached the wire.
  - `MinRoundTrip`: The shortest dispatch-to-response time seen.
  - `MaxRoundTrip`: The longest dispatch-to-response time seen.
  - `LastQueuedWait`: How long the last transaction waited locally before dispatch.
  - `MaxQueuedWait`: The longest local wait before dispatch seen.
  - `QueueDepth`: Requests waiting to be dispatched right now.

---

### ModbusOutcome

How a single Modbus read or write ended.

> The first five values are link verdicts: the request reached the wire (or should have), so the outcome says something about the device and the connection to it. The remaining values are decided locally — the request never reached the device — and therefore say nothing about link health. This split is what lets a block distinguish a backed-up local queue from a broken device or network: only the link verdicts move `State`.

**Fields/Values:**

- `Success` — The device answered with the requested data.
- `DeviceError` — The device answered with a Modbus exception code — the link is up, the request was wrong.
- `Timeout` — No answer arrived in time: an operation timeout, a connect timeout, or an expiry sweep.
- `TransportError` — The socket or serial stream failed.
- `ProtocolError` — An answer arrived but was not a valid response for the request.
- `BackedOff` — Not attempted: the client is waiting out a connect backoff.
- `Expired` — Not attempted: the request aged past `MaxQueuedAge` before dispatch.
- `Dropped` — Not attempted: the request was evicted because the queue was full.
- `Invalid` — Not attempted: the call itself was invalid — a bad unit id, a missing address, an unsupported conversion.
- `Cancelled` — Not attempted, or abandoned: the client was disposed or the queue was cancelled.

---

### ModbusReceipt

The per-transaction facts of one Modbus read or write, handed to the success and error callback of every operation.

> The instants are taken the moment the response or failure was observed — on the queue consumer for Modbus TCP, in the RTU handler the moment the response arrives — and therefore before the callback is handed to the logic block's mailbox. A receipt is unaffected by how long the block then takes to process it, which is what makes it usable as the age of the value it accompanies. `ReceivedAt` is wall clock and is what you publish; `ReceivedTimestamp` is the same instant on the monotonic timestamp scale and is what you compare against later. Age a value with `TimeProvider.GetElapsedTime(receipt.ReceivedTimestamp)` — a wall clock can step backwards when the gateway's clock is corrected, a monotonic timestamp cannot. `QueuedWait` and `RoundTrip` split the total latency into the part you control and the part the device controls: `QueuedWait` is the wait before dispatch (Modbus TCP: time in the client's request queue; Modbus RTU: the hop from the block to the shared handler), `RoundTrip` is dispatch to response. A `RoundTrip` that includes a connection handshake is not separated out — subtract `Connection.LastConnectDuration` if that distinction matters. Ignoring a receipt is a discard: `(values, _) =&gt; Power = values[0]`.

**Properties:**

- `ReceivedAt` — The UTC wall clock instant the response or failure was observed.
- `ReceivedTimestamp` — The same instant on the monotonic timestamp scale, for ageing the value.
- `RoundTrip` — The time from dispatching the request to observing the response.
- `QueuedWait` — The time the request waited locally before it was dispatched.
- `Outcome` — How the operation ended.

**Methods:**

- *Constructor* — The per-transaction facts of one Modbus read or write, handed to the success and error callback of every operation.
  - `ReceivedAt`: The UTC wall clock instant the response or failure was observed.
  - `ReceivedTimestamp`: The same instant on the monotonic timestamp scale, for ageing the value.
  - `RoundTrip`: The time from dispatching the request to observing the response.
  - `QueuedWait`: The time the request waited locally before it was dispatched.
  - `Outcome`: How the operation ended.

---

## Vion.Dale.Sdk.Modbus.Core.Exceptions

### InvalidServerAddressException

Thrown when a server-side register or bit access lies outside the declared extent of its area.

**Methods:**

- *Constructor* — Initializes a new instance of the `InvalidServerAddressException` class.
  - `area`: The register area that was accessed.
  - `startingAddress`: The first address of the attempted access.
  - `quantity`: The number of registers or bits of the attempted access.
  - `extent`: The declared extent of the area (addresses 0 to extent - 1 are served).

---

### ModbusException

Represents errors that occur during Modbus communication.

**Properties:**

- `ExceptionCode` — The Modbus exception code the device reported. Meaningless unless `HasExceptionCode` is `true`.
- `HasExceptionCode` — Whether the device reported an exception code. When `false` the failure is a frame or protocol fault, not a refusal by the device.

**Methods:**

- *Constructor* — Initializes a new instance of the `ModbusException` class for a failure that carries no device exception code.
  - `message`: The error message that describes the Modbus communication failure.
- *Constructor* — Initializes a new instance of the `ModbusException` class with a specified Modbus exception code and error message.
  - `exceptionCode`: The Modbus exception code identifying the type of failure.
  - `message`: The error message that describes the Modbus communication failure.

---

### ModbusExceptionCode

Specifies the Modbus exception type.

**Fields/Values:**

- `Ok` — Only used by the server to indicated that no exception should be returned to the client.
- `IllegalFunction` — The function code received in the query is not an allowable action for the server.
- `IllegalDataAddress` — The data address received in the query is not an allowable address for the server.
- `IllegalDataValue` — A value contained in the query data field is not an allowable value for server.
- `ServerDeviceFailure` — An unrecoverable error occurred while the server was attempting to perform the requested action.
- `Acknowledge` — Specialized use in conjunction with programming commands. The server has accepted the request and is processing it, but a long duration of time will be required to do so.
- `ServerDeviceBusy` — Specialized use in conjunction with programming commands. The engaged in processing a long–duration program command.
- `MemoryParityError` — Specialized use in conjunction with function codes 20 and 21 and reference type 6, to indicate that the extended file area failed to pass a consistency check.
- `GatewayPathUnavailable` — Specialized use in conjunction with gateways, indicates that the gateway was unable to allocate an internal communication path from the input port to the output port for processing the request.
- `GatewayTargetDeviceFailedToRespond` — Specialized use in conjunction with gateways, indicates that no response was obtained from the target device.

---

### RequestExpiredException

Thrown when a request waited longer than `MaxQueuedAge` before its turn came, so it was completed without contacting the device. This says nothing about the link — it means the client could not keep up with the rate requests were issued at, or was held up earlier by a fault.

**Properties:**

- `RequestName` — Gets the name of the expired request.
- `QueuedWait` — Gets how long the request had been waiting when it was discarded.
- `MaxQueuedAge` — Gets the maximum queued age that was in force.

**Methods:**

- *Constructor* — Initializes a new instance of the `RequestExpiredException` class.
  - `requestName`: The name of the request that expired.
  - `queuedWait`: How long the request had been waiting.
  - `maxQueuedAge`: The maximum queued age that was in force.

---

## Vion.Dale.Sdk.Modbus.Core.Server

### IModbusBitAccessor

Typed access to one bit-addressed server area (coils or discrete inputs) inside a server snapshot.

> Only valid inside the snapshot callback that provided it — the server lock is held for the duration of the callback and released afterwards. Do not capture accessors outside the callback.

**Methods:**

- `Read(ushort)` — Reads a single bit.
  - `address`: The bit address to read.
- `Write(ushort, bool)` — Writes a single bit.
  - `address`: The bit address to write.
  - `value`: The bit value to write.

---

### IModbusRegisterAccessor

Typed access to one register-addressed server area (holding or input registers) inside a server snapshot.

> Only valid inside the snapshot callback that provided it — the server lock is held for the duration of the callback and released afterwards. Do not capture accessors outside the callback. Method names, parameters, and defaults mirror the typed method family of the Modbus TCP client (`Raw`/`As&lt;Type&gt;`); all conversions are converter-backed, so byte and word order are explicit parameters and the underlying buffer is only ever touched in wire order.

**Methods:**

- `ReadRaw(ushort, ushort)` — Reads registers as raw bytes in wire order (big-endian per 16-bit word).
  - `startingAddress`: The register address to start reading from.
  - `quantity`: The number of registers (16 bit per register) to read.
- `WriteRaw(ushort, byte[])` — Writes raw register bytes in wire order (big-endian per 16-bit word).
  - `startingAddress`: The register address to start writing at.
  - `registerBytes`: The register bytes to write (2 bytes per register).
- `ReadAsShort(ushort, ByteOrder)` — Reads one register as a signed 16-bit integer.
  - `startingAddress`: The register address to read.
  - `byteOrder`: The byte order the data is stored in. Default is `MsbToLsb`.
- `WriteAsShort(ushort, short, ByteOrder)` — Writes one register as a signed 16-bit integer.
  - `startingAddress`: The register address to write.
  - `value`: The value to write.
  - `byteOrder`: The byte order to store the data in. Default is `MsbToLsb`.
- `ReadAsUShort(ushort, ByteOrder)` — Reads one register as an unsigned 16-bit integer.
  - `startingAddress`: The register address to read.
  - `byteOrder`: The byte order the data is stored in. Default is `MsbToLsb`.
- `WriteAsUShort(ushort, ushort, ByteOrder)` — Writes one register as an unsigned 16-bit integer.
  - `startingAddress`: The register address to write.
  - `value`: The value to write.
  - `byteOrder`: The byte order to store the data in. Default is `MsbToLsb`.
- `ReadAsInt(ushort, ByteOrder, WordOrder32)` — Reads two consecutive registers as a signed 32-bit integer.
  - `startingAddress`: The register address of the first register.
  - `byteOrder`: The byte order the data is stored in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is stored in. Default is `MswToLsw`.
- `WriteAsInt(ushort, int, ByteOrder, WordOrder32)` — Writes two consecutive registers as a signed 32-bit integer.
  - `startingAddress`: The register address of the first register.
  - `value`: The value to write.
  - `byteOrder`: The byte order to store the data in. Default is `MsbToLsb`.
  - `wordOrder`: The word order to store the data in. Default is `MswToLsw`.
- `ReadAsUInt(ushort, ByteOrder, WordOrder32)` — Reads two consecutive registers as an unsigned 32-bit integer.
  - `startingAddress`: The register address of the first register.
  - `byteOrder`: The byte order the data is stored in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is stored in. Default is `MswToLsw`.
- `WriteAsUInt(ushort, uint, ByteOrder, WordOrder32)` — Writes two consecutive registers as an unsigned 32-bit integer.
  - `startingAddress`: The register address of the first register.
  - `value`: The value to write.
  - `byteOrder`: The byte order to store the data in. Default is `MsbToLsb`.
  - `wordOrder`: The word order to store the data in. Default is `MswToLsw`.
- `ReadAsFloat(ushort, ByteOrder, WordOrder32)` — Reads two consecutive registers as a 32-bit floating-point number.
  - `startingAddress`: The register address of the first register.
  - `byteOrder`: The byte order the data is stored in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is stored in. Default is `MswToLsw`.
- `WriteAsFloat(ushort, float, ByteOrder, WordOrder32)` — Writes two consecutive registers as a 32-bit floating-point number.
  - `startingAddress`: The register address of the first register.
  - `value`: The value to write.
  - `byteOrder`: The byte order to store the data in. Default is `MsbToLsb`.
  - `wordOrder`: The word order to store the data in. Default is `MswToLsw`.
- `ReadAsLong(ushort, ByteOrder, WordOrder64)` — Reads four consecutive registers as a signed 64-bit integer.
  - `startingAddress`: The register address of the first register.
  - `byteOrder`: The byte order the data is stored in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is stored in. Default is `ABCD`.
- `WriteAsLong(ushort, long, ByteOrder, WordOrder64)` — Writes four consecutive registers as a signed 64-bit integer.
  - `startingAddress`: The register address of the first register.
  - `value`: The value to write.
  - `byteOrder`: The byte order to store the data in. Default is `MsbToLsb`.
  - `wordOrder`: The word order to store the data in. Default is `ABCD`.
- `ReadAsULong(ushort, ByteOrder, WordOrder64)` — Reads four consecutive registers as an unsigned 64-bit integer.
  - `startingAddress`: The register address of the first register.
  - `byteOrder`: The byte order the data is stored in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is stored in. Default is `ABCD`.
- `WriteAsULong(ushort, ulong, ByteOrder, WordOrder64)` — Writes four consecutive registers as an unsigned 64-bit integer.
  - `startingAddress`: The register address of the first register.
  - `value`: The value to write.
  - `byteOrder`: The byte order to store the data in. Default is `MsbToLsb`.
  - `wordOrder`: The word order to store the data in. Default is `ABCD`.
- `ReadAsDouble(ushort, ByteOrder, WordOrder64)` — Reads four consecutive registers as a 64-bit floating-point number.
  - `startingAddress`: The register address of the first register.
  - `byteOrder`: The byte order the data is stored in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is stored in. Default is `ABCD`.
- `WriteAsDouble(ushort, double, ByteOrder, WordOrder64)` — Writes four consecutive registers as a 64-bit floating-point number.
  - `startingAddress`: The register address of the first register.
  - `value`: The value to write.
  - `byteOrder`: The byte order to store the data in. Default is `MsbToLsb`.
  - `wordOrder`: The word order to store the data in. Default is `ABCD`.
- `ReadAsString(ushort, ushort, TextEncoding)` — Reads consecutive registers as a string.
  - `startingAddress`: The register address to start reading from.
  - `quantity`: The number of registers (16 bit per register) to read.
  - `textEncoding`: The text encoding of the stored data. Default is `Ascii`.
- `WriteAsString(ushort, string, TextEncoding)` — Writes a string to consecutive registers.
  - `startingAddress`: The register address to start writing at.
  - `value`: The string to write.
  - `textEncoding`: The text encoding to store the data in. Default is `Ascii`.

---

### IModbusServerSnapshot

A consistent view of all four register areas of a hosted Modbus server, valid for the duration of one synchronization callback.

> The server lock is held for the whole callback and released afterwards: reads and writes across all areas within one callback are atomic with respect to client requests, so read-modify-publish patterns (e.g. echoing a master-written heartbeat into a feedback register) need no further coordination. Only valid inside the callback that provided it — do not capture the snapshot or its accessors.

**Properties:**

- `HoldingRegisters` — The holding registers (client-writable setpoints; the server may seed defaults or echo feedback).
- `InputRegisters` — The input registers (server-published telemetry; read-only for clients).
- `Coils` — The coils (client-writable commands; the server may reset consumed command bits).
- `DiscreteInputs` — The discrete inputs (server-published flags; read-only for clients).

---

### ModbusServerArea

Identifies one of the four Modbus register areas a server serves.

**Fields/Values:**

- `HoldingRegisters` — Holding registers (read/write for clients; function codes 3, 6, 16, 23).
- `InputRegisters` — Input registers (read-only for clients; function code 4).
- `Coils` — Coils (read/write for clients; function codes 1, 5, 15).
- `DiscreteInputs` — Discrete inputs (read-only for clients; function code 2).

---

### ModbusServerAreaExtents

The declared register-map extents of a Modbus server, per area.

> Counts are extents, not sizes from an offset: addresses `0` to `Count - 1` are served. A map that starts at an offset (e.g. a 10-register map at address 0x8000) declares `offset + size` (0x800A). A count of 0 means the area is not served at all. Extents drive request validation and accessor bounds checks — they do not size any buffer (the underlying server buffers always cover the full Modbus address range).

**Properties:**

- `HoldingRegisterCount` — The number of addressable holding registers, starting at address 0.
- `InputRegisterCount` — The number of addressable input registers, starting at address 0.
- `CoilCount` — The number of addressable coils, starting at address 0.
- `DiscreteInputCount` — The number of addressable discrete inputs, starting at address 0.

**Methods:**

- *Constructor* — The declared register-map extents of a Modbus server, per area.
  - `HoldingRegisterCount`: The number of addressable holding registers, starting at address 0.
  - `InputRegisterCount`: The number of addressable input registers, starting at address 0.
  - `CoilCount`: The number of addressable coils, starting at address 0.
  - `DiscreteInputCount`: The number of addressable discrete inputs, starting at address 0.
- `Covers(ModbusServerArea, ushort, uint)` — Determines whether the given address range lies fully inside the declared extent of an area.
  - `area`: The register area the range refers to.
  - `startingAddress`: The first address of the range.
  - `quantity`: The number of registers or bits in the range. Must be at least 1 to be coverable.

---

## Vion.Dale.Sdk.Modbus.Rtu.TestKit

### IModbusRtuExtensions

Extension methods on `IModbusRtu` for simulating Modbus responses in tests.

> Every simulated response is stamped from the test context's virtual clock, so the receipt the logic block receives reflects whatever time the test advanced between issuing the request and simulating the answer. The callbacks are dispatched the way production dispatches them — call `LogicBlockTestContext.FlushPendingActions()` to run them.

**Methods:**

- `SimulateReadResponse<T>(IModbusRtu, LogicBlockTestContext<T>, byte[], ushort?)` — Simulates a successful read response by invoking the pending request's callback with the given data. The data bytes are processed through the same callback chain as in production (SwapBytes, CastFromBytes, etc.).
  - `modbusRtu`: The Modbus RTU contract instance.
  - `testContext`: The test context containing recorded messages.
  - `responseData`: The raw response bytes (big-endian by default, matching Modbus wire format).
  - `startingAddress`: Optional filter to match a specific request by starting address.
- `SimulateReadError<T>(IModbusRtu, LogicBlockTestContext<T>, Exception, ushort?, ModbusOutcome?)` — Simulates a read error by invoking the pending request's callback with the given exception.
  - `modbusRtu`: The Modbus RTU contract instance.
  - `testContext`: The test context containing recorded messages.
  - `exception`: The failure to deliver to the block.
  - `startingAddress`: Optional filter to match a specific request by starting address.
  - `outcome`: The outcome to stamp on the receipt, or `null` to derive it from the exception.
- `SimulateWriteResponse<T>(IModbusRtu, LogicBlockTestContext<T>, ushort?)` — Simulates a successful write response by invoking the pending request's callback with no error.
  - `modbusRtu`: The Modbus RTU contract instance.
  - `testContext`: The test context containing recorded messages.
  - `address`: Optional filter to match a specific request by address.
- `SimulateWriteError<T>(IModbusRtu, LogicBlockTestContext<T>, Exception, ushort?, ModbusOutcome?)` — Simulates a write error by invoking the pending request's callback with the given exception.
  - `modbusRtu`: The Modbus RTU contract instance.
  - `testContext`: The test context containing recorded messages.
  - `exception`: The failure to deliver to the block.
  - `address`: Optional filter to match a specific request by address.
  - `outcome`: The outcome to stamp on the receipt, or `null` to derive it from the exception.

---

### LogicBlockTestContextExtensions

Verification extension methods for asserting Modbus RTU messages in tests.

**Methods:**

- `VerifyModbusReadSent<T>(LogicBlockTestContext<T>, IModbusRtu, ushort?, ushort?, Times?)` — Assert that a Modbus read request was sent.
  - `testContext`: The test context for the logic block.
  - `modbusRtu`: The Modbus RTU contract to filter by, or null for any.
  - `startingAddress`: The expected starting address, or null to skip verification.
  - `quantity`: The expected register/coil quantity, or null to skip verification.
  - `times`: The expected number of times, or null for once.
- `VerifyModbusWriteSent<T>(LogicBlockTestContext<T>, IModbusRtu, ushort?, Times?)` — Assert that a Modbus write request was sent.
  - `testContext`: The test context for the logic block.
  - `modbusRtu`: The Modbus RTU contract to filter by, or null for any.
  - `address`: The expected write address, or null to skip verification.
  - `times`: The expected number of times, or null for once.

---

### ModbusResponseBuilder

Helpers for constructing Modbus response byte arrays in big-endian (MSB-first) order, matching the default Modbus wire format (`ByteOrder.MsbToLsb`).

**Methods:**

- `FromFloats(float[])` — Converts float values to big-endian bytes (4 bytes each).
- `FromShorts(short[])` — Converts short values to big-endian bytes (2 bytes each).
- `FromUShorts(ushort[])` — Converts ushort values to big-endian bytes (2 bytes each).
- `FromInts(int[])` — Converts int values to big-endian bytes (4 bytes each).
- `FromDoubles(double[])` — Converts double values to big-endian bytes (8 bytes each).
- `FromBools(bool[])` — Packs boolean values into bytes using Modbus coil/discrete input bit packing. Each byte holds up to 8 coils, LSB first within each byte.

---

## Vion.Dale.Sdk.Modbus.Rtu

### IModbusRtu

Provides Modbus RTU read and write operations.

> The reads, writes and diagnostics are those of `IModbusClient`. Declare the binding as `IModbusRtu` — that is the type the runtime binds to a service provider contract — and then use it through `IModbusClient` wherever the code should work for either transport. Every instance shares one `ModbusRtuHandler` with every other Modbus RTU binding in the runtime. Requests from all of them are published in the order the handler receives them, and they share one pending-request limit of `MaxPendingRequests`: an outcome of `Dropped` here may have been caused by another logic block. Expiry is checked by a sweep that runs about once a second, so a timed-out operation can complete up to a second after its timeout. Compared with Modbus TCP: there is no socket to report on, so there is no connection summary; the queue is the shared handler's rather than this client's, so `Link.QueueDepth` is always zero; and the default operation timeout is 5 seconds rather than 1. Like TCP, the timeout covers the wire only — it starts when the handler publishes the request, and the hop before that is what `MaxQueuedAge` bounds and what the receipt reports as `QueuedWait`. The following exceptions may reach the error callback of any operation: `InvalidUnitIdentifierException` (unit identifier below 0 or above 255), `PendingRequestsLimitReachedException` (the shared pending-request limit was reached), `ServiceProviderContractMappingNotFoundException` (the binding is not mapped to a service provider contract), `RequestExpiredException` (the request aged past `MaxQueuedAge` before it was published), `OperationTimeoutException` (the device did not answer in time) and `ModbusException` (the device returned an error). Operation-specific ones are `InvalidBitQuantityException` (fewer coils or discrete inputs returned than requested), `InvalidCountException` (the resulting register quantity exceeds 65535) and `ModbusResponseAlignmentException` (the byte count does not match the registers requested).

---

## Vion.Dale.Sdk.Modbus.Tcp.TestKit

### ConnectionEvent

A single connect / disconnect event observed by the fake proxy.

**Methods:**

- *Constructor* — A single connect / disconnect event observed by the fake proxy.

---

### ConnectionEventKind

The kind of connection event recorded on `ConnectionHistory`.

---

### FakeModbusTcpClientProxy

In-memory fake for `IModbusTcpClientProxy`. Stores register / coil contents in raw bytes per (unitId, address); the SDK's real `ModbusTcpClientWrapper` handles all byte / word-order conversion against them. Most tests should use `FakeModbusTcpHarness` rather than constructing this directly.

**Properties:**

- `ConnectionHistory` — Ordered log of every `ConnectAsync` / `Disconnect` the fake observed.
- `ReadHistory` — Ordered log of every read the SUT issued through the proxy layer.
- `WriteHistory` — Ordered log of every write the SUT issued through the proxy layer.
- `Clock` — The virtual clock `ResponseDelay` and `ConnectDelay` advance. Set it to the same `FakeTimeProvider` the harness and the test context use.
- `ResponseDelay` — Virtual time every read and write consumes before answering. Default is zero. Makes the receipt's `RoundTrip` and the link summary's round-trip extremes assertable; requires `Clock`.
- `ConnectDelay` — Virtual time every connection attempt consumes. Default is zero. Makes `Connection.LastConnectDuration` assertable; requires `Clock`.
- `IsConnected` — True after `ConnectAsync` has been called and before `Disconnect`. The real wrapper calls `ConnectAsync` lazily on the first operation if disconnected.

**Methods:**

- `SetHoldingRegister(int, ushort, byte, byte)` — Pre-populates one 16-bit holding register at (unitId, address) with two bytes + in standard Modbus big-endian wire order.
- `SetHoldingRegisters(int, ushort, byte[])` — Pre-populates a contiguous range of holding registers starting at . must be a multiple of 2 (one register = 2 bytes, big-endian).
- `SetInputRegister(int, ushort, byte, byte)` — Pre-populates a single input register. Mirrors .
- `SetInputRegisters(int, ushort, byte[])` — Pre-populates a contiguous range of input registers. Mirrors .
- `SetCoil(int, ushort, bool)` — Pre-populates a single coil value.
- `SetDiscreteInput(int, ushort, bool)` — Pre-populates a single discrete input value.
- `EnqueueReadFault(int, ushort, Exception)` — Queues an exception to throw on the next read at (unitId, startingAddress). Consumed FIFO — queue multiple to model "fail, fail, recover" sequences. Matches by the read's starting address (Modbus exceptions apply to the whole request, not per-register).
- `EnqueueWriteFault(int, ushort, Exception)` — Queues an exception to throw on the next write at (unitId, address). Consumed FIFO.
- `EnqueueReadModbusException(int, ushort, ModbusExceptionCode, string)` — Convenience: queues a Modbus protocol exception (e.g. `IllegalDataAddress`) to surface on the next read at (unitId, startingAddress).
- `EnqueueWriteModbusException(int, ushort, ModbusExceptionCode, string)` — Convenience: queues a Modbus protocol exception (e.g. `IllegalDataValue`) to surface on the next write at (unitId, address).
- `EnqueueReadTimeout(int, ushort)` — Convenience: queues an `OperationTimeoutException` to surface on the next read at (unitId, startingAddress). The synchronous test queue can't wait for a wall-clock timeout, so the exception fires immediately — observably identical to a real timeout from the SUT's point of view (same exception type via the same error callback).
- `EnqueueWriteTimeout(int, ushort)` — Convenience: queues an `OperationTimeoutException` to surface on the next write at (unitId, address). Same immediate-fire behaviour as .
- `EnqueueConnectFailure(Exception)` — Queues an exception to throw on the next `ConnectAsync` call. Consumed FIFO. The attempt is still recorded on `ConnectionHistory` with its target IP and port, so the SUT's reconnect target is verifiable even on failure.

---

### FakeModbusTcpClientProxyExtensions

Verification extension methods for asserting Modbus TCP operations in tests.

**Methods:**

- `VerifyReadSent(FakeModbusTcpClientProxy, int?, ushort?, ushort?, ReadEventKind?, Times?)` — Assert that a Modbus read was sent.
  - `proxy`: The fake proxy to inspect.
  - `unitId`: The expected unit identifier, or null for any.
  - `startingAddress`: The expected starting address, or null for any.
  - `quantity`: The expected register/coil quantity, or null for any.
  - `kind`: The expected Modbus function, or null for any.
  - `times`: The expected number of times, or null for once.
- `VerifyWriteSent(FakeModbusTcpClientProxy, int?, ushort?, byte[], WriteEventKind?, Times?)` — Assert that a Modbus write was sent.
  - `proxy`: The fake proxy to inspect.
  - `unitId`: The expected unit identifier, or null for any.
  - `address`: The expected target address, or null for any.
  - `expectedBytes`: The expected wire-format payload (raw bytes), or null to skip byte verification.
  - `kind`: The expected write function, or null for any.
  - `times`: The expected number of times, or null for once.
- `VerifyConnectAttempted(FakeModbusTcpClientProxy, string, int?, Times?)` — Assert that a `ConnectAsync` attempt was made.
  - `proxy`: The fake proxy to inspect.
  - `ipAddress`: The expected IP address (as a string), or null for any.
  - `port`: The expected port, or null for any.
  - `times`: The expected number of times, or null for once.
- `VerifyDisconnectCalled(FakeModbusTcpClientProxy, Times?)` — Assert that `Disconnect` was called on the proxy.
  - `proxy`: The fake proxy to inspect.
  - `times`: The expected number of times, or null for once.

---

### FakeModbusTcpHarness

Wires a `FakeModbusTcpClientProxy` and `SynchronousRequestQueue` into a real `LogicBlockModbusTcpClient`, so the SUT exercises real SDK byte / word-order conversion against the fake's in-memory state. var harness = new FakeModbusTcpHarness(); harness.Proxy.SetHoldingRegisters(unitId: 1, startingAddress: 40000, registerBytes: [0x12, 0x34, 0x56, 0x78]); var sut = new MyBlock(harness.Client, new Mock&lt;ILogger&gt;().Object); var ctx = sut.CreateTestContext().Build(); sut.Tick(); ctx.FlushPendingActions(); Assert.AreEqual(0x12345678u, sut.Power); Pass `ctx.TimeProvider` to put the client's receipts, link summary and `MaxQueuedAge` on the test's virtual clock.

**Properties:**

- `Proxy` — The fake proxy — pre-populate registers, inject faults, inspect histories.
- `Queue` — The queue the client runs on — set `Hold` and call `Drain()` to put virtual time between enqueue and execution.
- `Client` — The fully wired client to inject into the SUT.

---

### FakeModbusTcpServerClient

The test-side master view of a fake Modbus TCP server: drives the wire side of a server-fronted block without sockets. Method names follow the Modbus TCP client surface so wire-contract tests read like client code. Typed values are deliberately encoded with `BinaryPrimitives` (big-endian), independent of the SDK's converter — so a conversion bug cannot cancel itself out in a test.

**Methods:**

- `WriteSingleHoldingRegister(ushort, ushort)` — Writes a single holding register (function code 6).
  - `address`: The register address to write.
  - `value`: The register value.
- `WriteMultipleHoldingRegistersRaw(ushort, byte[])` — Writes multiple holding registers from raw wire bytes (function code 16).
  - `startingAddress`: The register address to start writing at.
  - `registerBytes`: The register bytes in wire order (2 bytes per register).
- `WriteSingleCoil(ushort, bool)` — Writes a single coil (function code 5).
  - `address`: The coil address to write.
  - `value`: The coil value.
- `ReadHoldingRegistersRaw(ushort, ushort)` — Reads holding registers as raw wire bytes (function code 3).
  - `startingAddress`: The register address to start reading from.
  - `quantity`: The number of registers to read.
- `ReadInputRegistersRaw(ushort, ushort)` — Reads input registers as raw wire bytes (function code 4).
  - `startingAddress`: The register address to start reading from.
  - `quantity`: The number of registers to read.
- `ReadCoils(ushort, ushort)` — Reads coils (function code 1).
  - `startingAddress`: The coil address to start reading from.
  - `quantity`: The number of coils to read.
- `ReadDiscreteInputs(ushort, ushort)` — Reads discrete inputs (function code 2).
  - `startingAddress`: The discrete input address to start reading from.
  - `quantity`: The number of discrete inputs to read.

---

### FakeModbusTcpServerHarness

Wires a `FakeModbusTcpServerProxy` into a real `LogicBlockModbusTcpServer`, so the SUT exercises real SDK extent validation and byte / word-order conversion against the fake's in-memory register store — no sockets, no free-port dance. var harness = new FakeModbusTcpServerHarness(); var sut = new MyServerBlock(/* inject a factory returning */ harness.Server); harness.Client.WriteSingleHoldingRegister(address: 0, value: 42); // act as the master sut.Tick(); CollectionAssert.AreEqual(expectedWireBytes, harness.Client.ReadInputRegistersRaw(0, 2));

**Properties:**

- `Proxy` — The fake proxy — inspect or pre-populate the register buffers, shape diagnostics.
- `Server` — The fully wired server to inject into the SUT (or hand out via `ServerFactory`).
- `ServerFactory` — A factory handing out `Server` — for blocks that are factory-injected.
- `Client` — The test-side master view driving the wire side of the server.

**Methods:**

- *Constructor* — Initializes a new instance of the `FakeModbusTcpServerHarness` class with a fresh fake proxy.
- *Constructor* — Initializes a new instance of the `FakeModbusTcpServerHarness` class with the given fake proxy.
  - `proxy`: The fake proxy backing the server's register buffers.
- `Dispose` — *(no description)*

---

### FakeModbusTcpServerProxy

In-memory `IModbusTcpServerProxy`: full-range register buffers without any sockets. The simulate-client methods replay what a connected Modbus master would do, including the extent validation the real server performs (out-of-map access throws a `ModbusException` with `IllegalDataAddress`, mirroring the wire behavior) and the `LastClientWriteAt` bookkeeping.

**Properties:**

- `Extents` — The extents passed to the most recent call. Drives the simulate-client validation.
- `TimeProvider` — The clock stamping `LastClientWriteAt` on simulated client writes. Default is `System`; assign a `FakeTimeProvider` for deterministic tests.
- `IsListening` — *(no description)*
- `ConnectionCount` — The number of connected clients reported to the server. Settable so tests can shape diagnostics.
- `LastClientWriteAt` — The last-client-write timestamp reported to the server. Set automatically by the simulate-client write methods (via `TimeProvider`); settable so tests can shape diagnostics directly.
- `Lock` — *(no description)*

**Methods:**

- `Start(IPAddress, int, ModbusServerAreaExtents)` — *(no description)*
- `Stop` — *(no description)*
- `GetHoldingRegisterBuffer` — *(no description)*
- `GetInputRegisterBuffer` — *(no description)*
- `GetCoilBuffer` — *(no description)*
- `GetDiscreteInputBuffer` — *(no description)*
- `Dispose` — *(no description)*
- `SimulateClientWriteHoldingRegisters(ushort, byte[])` — Simulates a connected master writing holding registers (function codes 6/16).
  - `startingAddress`: The register address to start writing at.
  - `registerBytes`: The register bytes in wire order (2 bytes per register).
- `SimulateClientWriteSingleCoil(ushort, bool)` — Simulates a connected master writing a single coil (function code 5).
  - `address`: The coil address to write.
  - `value`: The coil value to write.
- `SimulateClientReadHoldingRegisters(ushort, ushort)` — Simulates a connected master reading holding registers (function code 3).
  - `startingAddress`: The register address to start reading from.
  - `quantity`: The number of registers to read.
- `SimulateClientReadInputRegisters(ushort, ushort)` — Simulates a connected master reading input registers (function code 4).
  - `startingAddress`: The register address to start reading from.
  - `quantity`: The number of registers to read.
- `SimulateClientReadCoils(ushort, ushort)` — Simulates a connected master reading coils (function code 1).
  - `startingAddress`: The coil address to start reading from.
  - `quantity`: The number of coils to read.
- `SimulateClientReadDiscreteInputs(ushort, ushort)` — Simulates a connected master reading discrete inputs (function code 2).
  - `startingAddress`: The discrete input address to start reading from.
  - `quantity`: The number of discrete inputs to read.

---

### ReadEvent

A single read operation observed by the fake proxy.

**Methods:**

- *Constructor* — A single read operation observed by the fake proxy.

---

### ReadEventKind

The Modbus function family of a read recorded on `ReadHistory`.

---

### SynchronousRequestQueue

Drop-in `IRequestQueue` that runs each request synchronously on the calling thread instead of dispatching to a background consumer. Success / error callbacks flow through `IActorDispatcher.InvokeSynchronized` just as in production and drain on the next `LogicBlockTestContext.FlushPendingActions()`.

> Set `Hold` to buffer enqueued requests instead of running them, advance the test's clock, then call to run them in order. That is how a test puts virtual time between enqueue and execution — which is what `MaxQueuedAge` measures. The age check itself lives in the request, so this queue applies it with no logic of its own.

**Properties:**

- `Hold` — When `true`, enqueued requests are buffered instead of executed until is called. Default is `false` — every request runs on the calling thread.
- `QueuedRequestCount` — The number of requests buffered by `Hold` and not yet drained.
- `MaxQueuedAge` — *(no description)*

**Methods:**

- `Initialize(int, QueueOverflowPolicy, ModbusLinkAccumulator)` — Records the accumulator. Capacity / overflow policy don't apply to the synchronous executor.
- `Drain` — Executes every request buffered while `Hold` was set, in the order they were enqueued, and clears the buffer. Requests enqueued during the drain are buffered again if `Hold` is still set.

---

### WriteEvent

A single write operation observed by the fake proxy. `Bytes` is the raw wire-format payload (MSB-first per register).

**Methods:**

- *Constructor* — A single write operation observed by the fake proxy. `Bytes` is the raw wire-format payload (MSB-first per register).

---

### WriteEventKind

The Modbus function family of a write recorded on `WriteHistory`.

---

## Vion.Dale.Sdk.Modbus.Tcp

### ServiceCollectionExtensions

Extension methods for setting up Modbus TCP services in an `IServiceCollection`.

**Methods:**

- `AddDaleModbusTcpSdk(IServiceCollection)` — Adds Modbus TCP services to the specified `IServiceCollection`.
  - `serviceCollection`: The `IServiceCollection` to add services to.

---

## Vion.Dale.Sdk.Modbus.Tcp.Client.LogicBlock

### ILogicBlockModbusTcpClient

Provides non-blocking Modbus TCP client functionality for logic blocks.

> The reads, writes and diagnostics are those of `IModbusClient`; this type adds what is specific to owning a socket and a request queue. The TCP connection is established lazily inside the first operation that needs one and is kept for subsequent operations. Set `IpAddress` before enabling the client; `Port` defaults to 502 and `ConnectionTimeout` to 3 seconds. Because the handshake happens inside an operation, that operation's `RoundTrip` includes it — see `Connection`, whose `LastConnectDuration` is how you separate the two. All operations are enqueued and executed one at a time: the underlying Modbus TCP library cannot run concurrent operations on one connection. The logic block is never blocked by this — results arrive through callbacks. Use for a second, independent connection and queue. The queue is created the first time the client is enabled via `IsEnabled`. `QueueCapacity` and `QueueOverflowPolicy` must be set before that and cannot be changed afterwards. `MaxQueuedAge`, in contrast, is read at dequeue and can be changed at any time. Dispose the client when it is no longer needed. Disposal closes the connection and the queue: subsequent operations are rejected with a `RequestDroppedException` whose `Reason` is `ClientDisposed`, and requests already queued or in flight are cancelled. Link policy. A timeout, transport error or protocol error on an established connection closes the socket, so the next operation reconnects: a peer that dropped and came back is reached again without operator action, and a stray response cannot be read as the next transaction's answer. Only failed connects drive the backoff — from the second consecutive one the client waits `ConnectBackoff` (1 second), doubling per further failure up to `ConnectBackoffMax` (30 seconds). Operations issued during that wait fail immediately with a `LinkBackoffException` and an `Outcome.BackedOff` receipt, so the queue drains instead of filling and the device is not contacted once per queued request. A successful connect, a changed `IpAddress` or `Port`, or re-enabling the client ends the wait, so a corrected address takes effect on the very next operation. Setting an address or port to the value already in force does nothing. No operation is ever retried automatically. Reads are re-polled by construction, and repeating a write after a fault is not safe to decide for the caller — a pulse would be written twice. Compared with Modbus RTU: this client owns its socket and its queue, so `QueuedRequestCount` is real, overflow is per client, and `Connection` exists. Its default operation timeout is 1 second. RTU has no link policy: there is no connection to back off from. For the exceptions that reach an error callback, see the documentation for `IModbusTcpClientWrapper`.

**Properties:**

- `QueueCapacity` — Gets or sets the maximum number of requests that can be queued. Default is 256.
- `QueueOverflowPolicy` — Gets or sets the policy for handling new requests when the queue is full. Default is `DropOldest`.
- `QueuedRequestCount` — Gets the current number of requests queued for execution.
- `ConnectionTimeout` — Gets or sets the timeout for connection attempts to the Modbus TCP server.
- `Port` — Gets or sets the port number used to connect to the Modbus TCP server.
- `IpAddress` — Gets or sets the IP address of the Modbus TCP server.
- `ConnectBackoff` — Gets or sets how long the client waits after the second consecutive failed connect. Default is 1 second.
- `ConnectBackoffMax` — Gets or sets the longest the client waits between connection attempts. Default is 30 seconds.
- `Connection` — Gets a snapshot of the socket: whether it is up, and how connection attempts have gone.

**Methods:**

- `Disconnect(IActorDispatcher, Action, Action<Exception>)` — Manually disconnects from the Modbus TCP server.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. Errors are always logged, regardless of whether an error callback is specified.

---

### ILogicBlockModbusTcpClientFactory

Factory for creating instances of `ILogicBlockModbusTcpClient`.

**Methods:**

- `Create` — Creates a new instance of `ILogicBlockModbusTcpClient`.

---

## Vion.Dale.Sdk.Modbus.Tcp.Client.Request

### LinkBackoffException

Thrown when a request arrives while the client is waiting out a connect backoff. The device was never contacted, so this says nothing about the link beyond the failed connects that armed the backoff.

> The backoff is armed from the second consecutive failed connect and is ended by a successful connect or by a changed IP address or port. Until then every request fails this way immediately instead of paying its own connection attempt.

**Properties:**

- `NextAttemptAt` — Gets when the client will attempt to connect again.
- `ConsecutiveConnectFailures` — Gets how many connection attempts have failed in a row.

**Methods:**

- *Constructor* — Initializes a new instance of the `LinkBackoffException` class.
  - `ipAddress`: The address the failed attempts targeted.
  - `port`: The port the failed attempts targeted.
  - `consecutiveConnectFailures`: How many connection attempts have failed in a row.
  - `nextAttemptAt`: When the client will attempt to connect again.
  - `untilNextAttempt`: How much of the backoff is left.

---

### QueueOverflowPolicy

Defines the behavior when the request queue is full.

**Fields/Values:**

- `DropOldest` — Drops the oldest request in the queue when a new request is enqueued.
- `DropNewest` — Drops the newest request in the queue (not the one being enqueued) when a new request is enqueued.
- `RejectNew` — Rejects the new request being enqueued, invoking its error callback immediately.

---

### RequestDropReason

Why a request was dropped before it could be executed.

**Fields/Values:**

- `QueueFull` — The queue was at capacity and the overflow policy evicted this request.
- `ClientDisposed` — The client was disposed, so the queue no longer accepts work.

---

### RequestDroppedException

Thrown when a request is dropped before execution — because the queue was full, or because the client was disposed. The device was never contacted, so this says nothing about the link.

**Properties:**

- `RequestName` — Gets the name of the dropped request.
- `Reason` — Gets why the request was dropped.

**Methods:**

- *Constructor* — Initializes a new instance of the `RequestDroppedException` class for a request the full queue evicted.
  - `requestName`: The name of the request that was dropped.
  - `capacity`: The capacity the queue was configured with.
  - `overflowPolicy`: The overflow policy that decided the eviction.
- *Constructor* — Initializes a new instance of the `RequestDroppedException` class for a request enqueued after the client was disposed.
  - `requestName`: The name of the request that was dropped.

---

## Vion.Dale.Sdk.Modbus.Tcp.Diagnostics

### ModbusTcpConnectionState

The state of a Modbus TCP client's socket.

**Fields/Values:**

- `Disconnected` — No socket: never connected, closed, or closed again after a fault.
- `Connected` — A socket is open and no reconnect is pending.
- `BackingOff` — The client is waiting out a backoff before attempting to connect again.

---

### ModbusTcpConnectionSummary

A point-in-time summary of one Modbus TCP client's socket: whether it is up, and how its connection attempts have gone.

> Separate from the link summary because it is about the transport rather than the device: a socket can be up while every request times out, and a device can be reachable across a socket that has been re-established several times. Every field is a service-property-legal type, so the whole summary can be published as one `[ServiceProperty]`. The connection is established lazily, inside the first operation that needs it, so `LastConnectDuration` is also part of that operation's `RoundTrip` — subtract it when you want the device's own response time. Counts are for the lifetime of the client instance and are never reset — except `ConsecutiveConnectFailures`, which is a run rather than a total. `CurrentBackoff` and `NextAttemptAt` are filled once the client is waiting between connection attempts, and `State` is `BackingOff` while that wait is still running. Both are cleared by a successful connect or by a configuration change that supersedes the failures.

**Properties:**

- `State` — Whether a socket is currently open.
- `LastConnectedAt` — When a socket was last established.
- `LastConnectFailureAt` — When a connection attempt last failed.
- `ConnectAttemptCount` — How many connection attempts have been made.
- `ConnectFailureCount` — How many connection attempts have failed.
- `ConsecutiveConnectFailures` — Failed attempts since the last successful one or the last configuration change.
- `LastConnectDuration` — How long the last successful handshake took.
- `CurrentBackoff` — How long the client is waiting before its next connection attempt.
- `NextAttemptAt` — When the client will attempt to connect again.

**Methods:**

- *Constructor* — A point-in-time summary of one Modbus TCP client's socket: whether it is up, and how its connection attempts have gone.
  - `State`: Whether a socket is currently open.
  - `LastConnectedAt`: When a socket was last established.
  - `LastConnectFailureAt`: When a connection attempt last failed.
  - `ConnectAttemptCount`: How many connection attempts have been made.
  - `ConnectFailureCount`: How many connection attempts have failed.
  - `ConsecutiveConnectFailures`: Failed attempts since the last successful one or the last configuration change.
  - `LastConnectDuration`: How long the last successful handshake took.
  - `CurrentBackoff`: How long the client is waiting before its next connection attempt.
  - `NextAttemptAt`: When the client will attempt to connect again.

---

## Vion.Dale.Sdk.Modbus.Tcp.Server.LogicBlock

### ILogicBlockModbusTcpServer

Hosts a Modbus TCP server (slave role) for logic blocks: external Modbus clients connect to the logic block and read or write its register map.

> The server is configured via properties and gated by `IsEnabled`, exactly like the Modbus TCP client: configure while disabled, then enable. Configuration properties can only be changed while the server is disabled — to reconfigure, disable the server first, update the settings, then re-enable it (a port or address change is a rebind). It listens on all interfaces (`0.0.0.0`) unless told otherwise, because a logic-block-hosted server exists to be reached by Modbus masters elsewhere on the network. Set `ListenAddress` to bind one interface — loopback for a simulator that must not be reachable off the machine, or a specific NIC on a multi-homed device. All register access happens inside callbacks, which execute synchronously on the caller's thread while holding the server lock — client requests are served from the register buffers on background threads, and the lock makes each callback atomic with respect to them. No events or callbacks are ever delivered to the logic block from background threads. The block chooses its own cadence (a timer, a reactive trigger) and may use several independent cadences; each `Sync` call is atomic on its own. The register buffers exist independently of the listener: `Sync` also works while the server is disabled, so a block can seed default values before it starts listening. Buffer contents survive disable/enable cycles. The server accepts requests for any unit identifier and echoes the request's unit identifier in the response — the endpoint behavior the Modbus TCP specification intends for directly connected servers. Client requests outside the declared register-map extents are answered with an IllegalDataAddress Modbus exception. The server should be disposed when no longer needed. Disposal stops the listener and releases all resources; benign teardown races of the underlying server library are caught and logged, never thrown.

**Properties:**

- `IsEnabled` — Gets or sets whether the server is enabled. Default is `false`.
- `ListenAddress` — Gets or sets the local IP address the server listens on. Default is `"0.0.0.0"` (all interfaces).
- `Port` — Gets or sets the local port the server listens on. Default is 502 (standard Modbus TCP port).
- `HoldingRegisterCount` — Gets or sets the declared holding register extent: addresses 0 to count - 1 are served. Default is 0 (the area is not served).
- `InputRegisterCount` — Gets or sets the declared input register extent: addresses 0 to count - 1 are served. Default is 0 (the area is not served).
- `CoilCount` — Gets or sets the declared coil extent: addresses 0 to count - 1 are served. Default is 0 (the area is not served).
- `DiscreteInputCount` — Gets or sets the declared discrete input extent: addresses 0 to count - 1 are served. Default is 0 (the area is not served).
- `IsListening` — Gets a value indicating whether the server is currently listening for client connections.
- `ConnectionCount` — Gets the number of currently connected clients.
- `LastClientWriteAt` — Gets the time of the most recent client write to any register area, or `null` when no client has written yet.

**Methods:**

- `Sync(Action<IModbusServerSnapshot>)` — Executes with a consistent view of all four register areas.
  - `access`: The callback receiving the snapshot. It runs synchronously on the caller's thread while the server lock is held — keep it short and free of blocking calls, and do not capture the snapshot outside the callback.
- `Sync<T>(Func<IModbusServerSnapshot, T>)` — Executes with a consistent view of all four register areas and returns its result.
  - `access`: The callback receiving the snapshot. It runs synchronously on the caller's thread while the server lock is held — keep it short and free of blocking calls, and do not capture the snapshot outside the callback.

---

### ILogicBlockModbusTcpServerFactory

Factory for creating instances of `ILogicBlockModbusTcpServer`.

**Methods:**

- `Create` — Creates a new instance of `ILogicBlockModbusTcpServer`.

---

## Vion.Dale.Sdk.TestKit

### Constants

Provides default constant values for logic block test setup.

---

### EmissionPolicyMode

Controls whether the RFC 0004 emission policy (attribute-driven throttling) is active when a logic block runs under the TestKit's controllable fake clock.

**Fields/Values:**

- `Off` — Default. The emission policy is gated OFF: every service-property / measuring-point assignment flows straight through as a change message, so tests are not silently throttled by min-interval / min-change rules.
- `FromAttributes` — Forces the emission policy ON from the block's `[ServiceProperty]` / `[ServiceMeasuringPoint]` throttle attributes, despite the fake clock. Use this to exercise throttling deterministically with .

---

### ILoggerMockExtensions

Extension methods to verify log output on ILogger mocks.

**Methods:**

- `VerifyLogContains(Mock<ILogger>, string, LogLevel, Times)` — Verifies that a log entry containing the specified string was logged at the specified log level the expected number of times.

---

### LogicBlockBaseExtensions

Extension methods to initialize logic blocks for testing with a fluent builder API.

**Methods:**

- `InitializeForTest<T>(T)` — Initializes the given logic block for testing, returning a typed test context.
- `CreateTestContext<T>(T)` — Creates a test context builder for the given logic block to allow test context customization. Call Build() at the end to get the test context.

---

### LogicBlockTestContext

Test-friendly minimal actor context that records messages sent by the logic block. Use the provided query/assertion helpers to inspect recorded messages. testContext.VerifyServicePropertyChanged(lb => lb.Power, value => Assert.AreEqual(3.5, value)); Hosts a `FakeTimeProvider` as the virtual clock for both `UtcNow` reads (production code that depends on `TimeProvider`) and for the deadlines attached to `InvokeSynchronized` / `InvokeSynchronizedAfter` actions. Call to move the clock forward and fire actions whose deadlines have elapsed; call for the legacy clock-agnostic drain.

**Properties:**

- `TimeProvider` — The virtual clock backing this test context. Inject as `TimeProvider` into your logic block to make its `UtcNow` reads deterministic.
- `VirtualNow` — Current virtual time. Shorthand for `TimeProvider.GetUtcNow().UtcDateTime`.
- `BuiltServiceProvider` — The service provider the block was initialized with. Set by the builder after `BuildServiceProvider` completes so tests can assert which registrations the builder applied (e.g. `EmissionPolicyForceMarker` when `WithEmissionPolicy(FromAttributes)` was called).

**Methods:**

- `VerifySendCommand<T>(InterfaceId?, Action<T>, Times?)` — Assert that a SendCommand call was made with the given target and message. testContext.VerifySendCommand&lt;PingRequest&gt;(mappedPong, msg => Assert.AreEqual(42, msg.Value));
- `VerifySendRequest<T>(InterfaceId?, Action<T>, Times?)` — Assert that a SendRequest call was made with the given target and message. testContext.VerifySendRequest&lt;PingRequest&gt;(mappedPong, msg => Assert.AreEqual(42, msg.Value));
- `VerifySendStateUpdate<T>(Action<T>, Times?)` — Assert that a SendStateUpdate call was made with the given message. testContext.VerifySendStateUpdate&lt;MyState&gt;(msg => Assert.AreEqual(expected, msg.Value));
- `VerifyServicePropertyChanged<T>(Expression<Func<T, T>>, Action<T>, Times?)` — Assert that a service property change was recorded for the specified property. testContext.VerifyServicePropertyChanged(lb => lb.Power, value => Assert.AreEqual(3.5, value));
- `VerifyServicePropertyEmitted<T>(Expression<Func<T, T>>, Action<T>, Times?)` — Assert on the emitted service-property values — the messages that survived the RFC 0004 emission policy. Same shape and underlying stream as (it reads the recorded `ServicePropertyValueChanged` messages), but its name documents intent: under `FromAttributes` a held assignment is not an emission until its throttle interval elapses (drive that with ), and a sub-threshold assignment never emits at all. With the policy off it behaves identically to . testContext.VerifyServicePropertyEmitted(lb => lb.Power, value => Assert.AreEqual(3.5, value));
- `VerifyServiceMeasuringPointChanged<T>(Expression<Func<T, T>>, Action<T>, Times?)` — Assert that a service measuring point change was recorded for the specified property. testContext.VerifyServiceMeasuringPointChanged(lb => lb.Temperature, value => Assert.AreEqual(22.5, value));
- `VerifyServiceMeasuringPointEmitted<T>(Expression<Func<T, T>>, Action<T>, Times?)` — Assert on the emitted service-measuring-point values — the measuring-point analogue of . Reads the post-policy `ServiceMeasuringPointValueChanged` stream, so under `FromAttributes` a held assignment is not an emission until its throttle interval elapses (drive that with ). With the policy off it behaves identically to . testContext.VerifyServiceMeasuringPointEmitted(lb => lb.Frequency, value => Assert.AreEqual(50.0, value));
- `GetContractMessages<T>(string)` — Returns all recorded contract messages of the specified data type, optionally filtered by contract identifier. Useful for TestKit extensions that need to extract pending requests for response simulation.
- `ClearRecordedMessages` — Clear recorded messages, e.g. if the test arranging phase triggers messages, that should be ignored.
- `AdvanceTime(TimeSpan)` — Advance the virtual clock by and dispatch every queued action whose deadline has elapsed, in deadline order. The clock is set to each action's deadline immediately before that action runs, so an action's own `UtcNow` read sees the time it was scheduled for (not the post-advance target). Actions queued during dispatch with a deadline still ≤ the target time fire in the same call (cascading); actions whose deadline lies beyond the target stay pending for a later `AdvanceTime`.
- `FlushPendingActions` — Execute every action currently queued by or , ignoring their scheduled deadlines and ignoring the virtual clock. New code that wants deterministic time semantics should prefer ; this method exists for tests that just want to drain the queue without caring about elapsed simulated time. sut.OnTimer(); // sends requests, queues Calculate sut.HandleResponse(id, response); // feed response data testContext.FlushPendingActions(); // now Calculate() runs The drain is single-pass: actions queued by an action that runs during this call are deferred to the next `FlushPendingActions` call. A self-rescheduling tick will therefore fire exactly once per call, not loop until the queue is empty.
- `GetSentMessagesOfTypePublic<T>` — Returns every recorded message of in send order. A public escape hatch for assertions that need a message type the typed `Verify*` helpers do not cover (e.g. `ServicePropertyValueCleared` for the RFC 0004 clear-bypass path).
- `SetTimeProvider(FakeTimeProvider)` — Internal swap point used by `LogicBlockTestContextBuilder.WithTimeProvider` so the same FakeTimeProvider can be passed to the block's constructor and then bound to the test context, instead of the two clocks drifting independently.

---

### LogicBlockTestContextBuilder

Fluent test builder to initialize LogicBlock instances for unit tests.

**Methods:**

- `WithLogicInterfaceMapping<T>(Func<T, T>, InterfaceId)` — Adds a mapping to another logic block using a specific (self or delegated) implementation of the interface. When is inferred as a concrete class (the common shape of `WithLogicInterfaceMapping(lb =&gt; lb, id)`), this method throws if the class implements more than one `[LogicInterface]`-decorated contract interface — without an explicit generic argument the mapping would silently route to whichever contract happens to come first in metadata order, and a second ambiguous mapping would land on the wrong sender. Pass the contract interface explicitly, e.g. `WithLogicInterfaceMapping&lt;IContractA&gt;(lb =&gt; lb, id)`.
- `WithLogicInterfaceMapping<T>(InterfaceId)` — Adds a mapping to another logic block using the logic block's own implementation of the interface.
- `WithPersistentValue<T>(Expression<Func<T, T>>, T)` — Registers a persistent value to be restored after initialization, simulating a restart with previously saved state. var testContext = block.CreateTestContext() .WithPersistentValue(lb => lb.MaxPower, 42.0) .WithPersistentValue(lb => lb.Mode, OperatingMode.Manual) .Build();
- `WithInstantiationParameter<T>(Expression<Func<T, T>>, T)` — RFC 0016: sets an `[InstantiationParameter]` value that is applied to the block before `Configure` (via the same JSON value channel the config payload uses), so Live-mode `[IncludedWhen]` gates resolve against it. Exercises the encode/decode path. Direct pre-`Build()` assignment also works when the property has a settable/`init` accessor (e.g. `new MyBlock { PointCount = 2 }` in the test's object initializer); this builder method additionally covers post-construction cases and the decode path. var ctx = block.CreateTestContext() .WithInstantiationParameter(lb => lb.ChargePointCount, 3) .Build();
- `WithServices(Action<IServiceCollection>)` — Registers additional DI services for logic block initialization. Use this to register services required by contract types (e.g. Modbus RTU).
- `WithoutAutoStart` — Prevents the logic block from being started after initialization. By default, the builder starts the block so that service property changes produce messages. Use this when testing initialization or pre-start behavior.
- `WithTimeProvider(FakeTimeProvider)` — Bind the test context's virtual clock to a caller-owned `FakeTimeProvider`. Use this when the block's constructor takes a `TimeProvider` and the test needs to ensure the block and `testContext.TimeProvider` share the same instance. var clock = new FakeTimeProvider(new DateTimeOffset(2026, 1, 1, 0, 0, 0, TimeSpan.Zero)); var sut = new MyBlock(clock, loggerMock.Object); var ctx = sut.CreateTestContext().WithTimeProvider(clock).Build(); ctx.AdvanceTime(TimeSpan.FromSeconds(5)); // advances both sut's reads and ctx's deadlines
- `WithEmissionPolicy(EmissionPolicyMode)` — Controls whether the RFC 0004 emission policy runs under the TestKit's fake clock. By default (`Off`) the policy is gated off so every assignment surfaces as a change. Pass `FromAttributes` to force the policy on from the block's throttle attributes — the builder registers a marker the block reads at init (`_forcePolicyFromAttributes`), so drives the throttling deterministically. var ctx = block.CreateTestContext() .WithEmissionPolicy(EmissionPolicyMode.FromAttributes) .Build(); block.Power = 1.0; // first emit seeds the throttler block.Power = 1.5; // held by the 250 ms min-interval ctx.AdvanceTime(TimeSpan.FromMilliseconds(250)); // flushes the held value ctx.VerifyServicePropertyEmitted(lb => lb.Power, times: Times.Exactly(2));
- `Build` — Initialize the logic block and apply any linked interfaces mapping. After this returns the logic block's Configure(...), Ready(), and Starting() will have been executed and the block is ready to process messages. Use to skip starting.
- `GuardAgainstAmbiguousMappingTarget(Type)` — When is a class that implements more than one `[LogicInterface]`-decorated contract interface, the existing IsAssignableFrom+FirstOrDefault resolution in cannot tell which contract the caller meant. Two such mappings stack onto the same dictionary key, get routed to the first matching sender, and the second contract's sender silently receives zero mappings. Catch the ambiguity at registration time so the bug surfaces at the call site instead of as a missing verification later.
- `InitializeLogicBlock` — Sends the InitializeLogicBlock message to the logic block to initialize it. Auto-discovers service identifiers from [Service] attributes so that service property and measuring point changes are routed correctly when the block is started.
- `LinkRuntimeActors` — Sends LinkRuntimeActors so the logic block has its runtime actor refs populated. In production this is sent by dale's LogicSystemConfigurationInitializer.LinkRuntimeActors; in TestKit we use TestActorReference stand-ins (returned by the test context's `IActorContext.LookupByName`). Without this, LogicBlockBase's deferred-init path leaves Ready() and SendBindLogicBlockServices unfired.
- `RegisterContractAssemblyServices(IServiceCollection)` — Auto-discovers contract properties on the logic block, finds `IConfigureServices` implementations in each contract assembly, and invokes them. Mirrors what the full Dale runtime does with shared assembly discovery.
- `DiscoverContractIds` — Discovers contract identifiers from properties whose type has [ServiceProviderContractType]. Generates a LogicBlockContractId for each so that contracts are fully initialized in tests.
- `DiscoverServiceIds` — Discovers service identifiers from the logic-block class name and from any property whose type carries service-bearing attributes. The dropped [Service] attribute no longer participates in discovery — class-name and property-name are canonical.
- `RestorePersistentState` — If persistent values were registered, resolves their persistence keys and sends a RestorePersistentDataRequest.
- `ResolvePersistenceKey(string)` — Resolves a C# property name to its persistence key by searching the service binder's bindings. Falls back to the opt-in key format (_direct.{PropertyName}) if not found as a service property.
- `StartLogicBlock` — If auto-start was requested, sends StartLogicBlockRequest and clears the infrastructure messages produced during startup (initial state publishes, periodic save scheduling).
- `SetLinkedInterfaces` — Sets the linked interfaces on the logic block based on the configured mappings with the help of some reflection.

---

### LogicBlockTestHelper

Static helper methods to create logic block instances with mocked dependencies for testing.

**Methods:**

- `CreateLoggerMock` — Creates a mock ILogger for logic blocks.
- `Create<T>` — Creates a logic block instance with a default logger mock. The logic block must have a constructor that accepts `ILogger`. var block = LogicBlockTestHelper.Create&lt;MyBlock&gt;();
- `CreateWithLogger<T>` — Creates a logic block instance and returns both the instance and the logger mock, for tests that need to verify log output. var (block, loggerMock) = LogicBlockTestHelper.CreateWithLogger&lt;MyBlock&gt;();

---

### LogicBlockTimerExtensions

Extension methods for simulating timer ticks in unit tests. Uses reflection to access the internal timer callback dictionary on `LogicBlockBase`.

**Methods:**

- `FireTimer(LogicBlockBase, string)` — Fires a timer callback by its identifier. The identifier is typically the method name unless overridden via `[Timer(identifier: "custom")]`.
- `FireTimer<T>(T, Expression<Action<T>>)` — Fires a timer callback using a method selector expression for type-safety. The method must be accessible from the test. block.FireTimer((MyBlock lb) => lb.OnTimer());
- `GetTimerInterval(LogicBlockBase, string)` — Returns the configured interval for the specified timer.
- `GetTimerInterval<T>(T, Expression<Action<T>>)` — Returns the configured interval for the specified timer using a method selector expression. var interval = block.GetTimerInterval((MyBlock lb) => lb.OnTimer());

---

### TestActorReference

Mock actor reference implementation for testing without a real actor system.

---

### TestKitVerificationException

Exception thrown when a TestKit verification assertion fails.

---

### TimesExtensions

Extension methods to validate Moq Times constraints against actual invocation counts.

---

## Vion.Dale.Sdk.Core

### CommandAttribute

Marks a message as a command. The message is sent to a specific linked interface instance. The receiving side will not get the identifier of the sender.

---

### ContractDirection

Defines the directional relationship between the two sides of a contract.

**Fields/Values:**

- `None` — No specific direction. No arrows between "Between" and "And". No specific parent-child relationship.
- `Bidirectional` — Bidirectional arrows between "Between" and "And". No specific parent-child relationship.
- `BetweenToAnd` — Arrow from "Between" to "And". In a tree, "Between" would be the parent and "And" the child.
- `AndToBetween` — Arrow from "And" to "Between". In a tree, "And" would be the parent and "Between" the child.

---

### EnumLabelAttribute

Display label for an enum member. Surfaces in the dashboard via `presentation.enumLabels`.

> Labels are translatable in the cloud, keyed by the enum's short type name (the namespace is not part of the key) and the C# member name — renaming either orphans the translations. Every member is cataloged, labeled or not; an unlabeled member is translatable too, with its raw member name as the source string. See `docs/identifier-stability.md`.

**Properties:**

- `Label` — The label shown for this member. Translatable (see the remarks on this attribute).

---

### Formats

Well-known values for `Format`. Two reserved sentinels (`Relative`, `Humanize`) plus shortcuts for the common moment.js / day.js format tokens. Open set — the renderer accepts any moment-compatible token string directly. These constants exist for discoverability and IntelliSense, not as a closed vocabulary.

**Fields/Values:**

- `Relative` — Auto-updating relative date display. The renderer calls `moment(value).fromNow()` and refreshes on a timer. Locale-aware: "3 Minuten" in German, "il y a 3 minutes" in French.
- `Humanize` — Humanized duration display. The renderer calls `moment.duration(value).humanize()` to produce rough natural-language output like "a few seconds" / "3 hours" / "2 days". Locale-aware.
- `LocaleFull` — Locale-aware full date + time with weekday, e.g. "Monday, September 4, 1986 8:30 PM".
- `LocaleLong` — Locale-aware date + time, e.g. "September 4, 1986 8:30 PM".
- `LocaleShort` — Locale-aware short date + time, e.g. "Sep 4, 1986 8:30 PM".
- `LocaleDate` — Locale-aware date only, e.g. "09/04/1986".
- `LocaleTime` — Locale-aware time only with seconds, e.g. "8:30:25 PM".
- `Iso` — "2026-05-13 14:32:05" — explicit ISO-ish date-time without millis.
- `IsoMillis` — "2026-05-13 14:32:05.123" — explicit ISO-ish with millisecond precision.
- `Clock` — "01:23:45" — clock-style duration without millis.
- `ClockMillis` — "01:23:45.123" — clock-style duration with millisecond precision.

---

### IConfigureServices

Plugin assemblies must contain an implementation of this interface. The host calls it at startup do add plugin logic blocks and services to DI

**Methods:**

- `ConfigureServices(IServiceCollection)` — Register all logic blocks and services to usable with dependency injection. Logic blocks should be registered as transient. Services that are injected into logic blocks should usually be registered as transient as well.

---

### Importance

Declares the UI importance level of a service property or measuring point.

**Fields/Values:**

- `Normal` — Shown only in detail views.
- `Primary` — Shown prominently on dashboard tiles (large display).
- `Secondary` — Shown on dashboard tiles (small display).
- `Hidden` — Not shown in the UI.

---

### IncludedWhenAttribute

Gates whether a member is part of the configured instance, based on the instance's `InstantiationParameterAttribute` values chosen at configuration time. The C# member always exists in code; what the gate controls is whether it is discoverable, wireable, bound, and published for a given instance. When the predicate is false the member is skipped entirely at bind time — never bound, never constructed (for contracts), never registered, no MQTT topic, no cloud read-model row, no editor slot. As if it were never declared. A member with no gate is unconditional (fully backward compatible). This is a hard, config-time existence gate — not display. Contrast `VisibleWhen`, which merely hides a still-existing, still-functioning member in the dashboard. Use `[IncludedWhen]` when the choice changes what the editor can wire or what topics exist; use `VisibleWhen` when the block merely behaves differently. Predicate. The shared dialect (`docs/predicates.md`, vion-contracts), with references restricted to `InstantiationParameterAttribute` properties of the same block (bare single-segment refs only — no `Service.Property` form). Evaluated strict / fail-closed: an unparseable predicate or a missing/null/type-mismatched parameter value fails `Configure` and the block reports unhealthy. DALE043 rejects a predicate that does not parse, a qualified ref, or a ref that does not resolve to an `[InstantiationParameter]`; DALE044 rejects a type/literal mismatch. Placement matrix (DALE043 enforces it; the rule is gateable = what the definition view exposes as a wireable/publishable member ): Gateable: a property-based interface binding (`[LogicBlockInterfaceBinding]` on a component implementing a `[LogicInterface]`); a contract-binding property (`[ServiceProviderContractBinding]`); a service-bearing component property (a type carrying `[ServiceProperty]`/`[ServiceMeasuringPoint]` members). Gating a component gates everything the binders derive from it — its interface binding and its whole service (all properties + measuring points). Not gateable: a scalar `[ServiceProperty]`/`[ServiceMeasuringPoint]` (it keeps existing and publishing — use `VisibleWhen` for display relevance); a `[Timer]` method (timers are not in the definition view — gate in code: `if (ChargePointCount &lt; 3) return;`); a class-implemented interface (no member to carry the attribute — use a property-based binding); the block class itself (whole-block existence = the operator adds the instance or not). Null-contract hazard (read carefully). An excluded contract property is never constructed by the binder, so it is null at runtime. Declare gated contract properties nullable (`IDigitalOutput?`) and gate your own fan-out code against the same parameter. (An excluded interface component stays non-null — the author's own `new()` — but is inert: unbound, never published, never wired.) Sibling-contract gating pattern. A per-plug station-level contract declared as a sibling property of the gated component must carry the same predicate, author-written — the platform cannot infer the grouping. Example: a `Point2` gated with `[IncludedWhen("ChargePointCount &gt;= 2")]` and its `ChargingPoint2Output` contract carrying the identical gate. Inheritance: gates declared on a shared base logic-block class apply to every leaf. Re-declaring, changing, or removing the gate on an `override`/`new` member is rejected (DALE043) — declare the gate once, at the declaration the hierarchy shares.

**Properties:**

- `Predicate` — The inclusion predicate. References `InstantiationParameterAttribute` scalars of the same block; evaluated strict / fail-closed at bind time.

**Methods:**

- *Constructor* — Creates an inclusion gate over the given predicate in the shared dialect (`docs/predicates.md`), referencing `InstantiationParameterAttribute` properties of the same block.

---

### InstantiationParameterAttribute

Marks a `ServicePropertyAttribute` as an instantiation parameter: a config-time scalar the operator picks in the Logic Editor when the block instance is added, the value an `IncludedWhenAttribute` gate reads to decide which members the configured instance actually has. A modifier on a real `[ServiceProperty]` (dual annotation, like `[ServiceProperty]` + `[ServiceMeasuringPoint]`): the value is chosen at configuration time, stored on the instance, applied to the block before `Configure` on every (re)instantiation, and is never settable at runtime. Parameters are independently useful as fixed setup scalars (e.g. a register base offset) — inclusion gates are just their most important consumer. Lifecycle availability. The value is applied between actor construction and the `Configure` call, so it is set and readable everywhere except the constructor: Site Value seen Constructor C# initializer default only — never branch on a parameter here. `Configure` (binding — where gates evaluate) Operator value (or the C# default when none was supplied). `Ready()`, persistence restore, `Starting()`, timers, later hooks Operator value — per-model defaults are ordinary C# here, no platform machinery. Placement. On a property of the logic-block class itself (own or a shared base class), root service only — never on a component type and never via a service interface. Must be paired with `ServicePropertyAttribute`. Enforced by DALE044. Types. Discrete scalars only — `bool`, `enum`, the integer kinds, and `string` (the same set inclusion predicates may reference). No `double`/ `float` (analog values must not drive structure), no structs/arrays, and never `WriteOnly` (a secret cannot be an editor-visible driver). Runtime immutability &amp; honesty. The attribute forces the top-level `schema.readOnly` wire flag, so the dashboard renders it read-only and every SetPropertyValue is rejected — the operator changes the value by editing the config and re-activating (which recycles the block), not at runtime. The property must be an auto-property (no computed getter, so block code provably reads the value the gates evaluated) and block code must not assign it outside the constructor / object initializer; DALE044 enforces both regardless of accessor shape. `{ get; init; }` is the recommended shape (the compiler then backstops the analyzer globally), but is not the mechanism — reflection application by the SDK works with both `set` and `init`. Persistence. Parameters are excluded from persistence auto-discovery — the config channel is their only source of truth, so a stale gateway-persisted value can never clobber the config-applied one after the gates already resolved. See `IncludedWhenAttribute` for the gate that consumes these values, and `docs/predicates.md` (vion-contracts) for the predicate dialect.

---

### LinkMultiplicity

Multiplicity of a contract link. Consumer-side on a binding (`LogicBlockInterfaceBindingAttribute` / `ServiceProviderContractBindingAttribute`) and provider-side on `[ServiceProviderContractType]`. Declared by the SDK only; the SDK neither validates nor enforces it — enforcement is downstream (cloud-api at logic-configuration save/activate).

**Fields/Values:**

- `ExactlyOne` — Required and single: exactly one counterpart must be linked (1..1).
- `ZeroOrOne` — Optional and single: at most one counterpart may be linked (0..1). Provider-side, this expresses single-consumer exclusivity (e.g. a digital output that accepts at most one writer).
- `OneOrMore` — Required and many: at least one counterpart must be linked (1..n).
- `ZeroOrMore` — Optional and many: any number of counterparts may be linked (0..n). The unconstrained default — preserves the pre-multiplicity no-enforcement behaviour, so it is omitted from the introspection annotations rather than emitted.

---

### LogicBlockAttribute

Block-level display metadata for a LogicBlock class.

> Every display string this block declares is translatable in the cloud, under a key rooted in the block's full type name — namespace included. Renaming or moving the class orphans those translations. See `docs/identifier-stability.md`.

**Properties:**

- `Name` — Human-readable name. Falls back to the C# class name. Translatable in the cloud (see the remarks on this attribute).
- `Icon` — Icon identifier. Use Remixicon names without the "ri-" prefix (e.g. "charging-pile-line", "battery-2-line"). See https://remixicon.com. Dashboard renders a default fallback icon for unknown / missing values.
- `Groups` — Order in which the dashboard renders group sections in the full block view. Values are the same string keys as `Group` — well-known constants from `PropertyGroup` and/or integrator-supplied custom keys. Groups not listed appear last in the platform default order. When unset, defaults to [Alarm, Status, Metric, Configuration, Diagnostics, Identity, None]. A custom key is also the translation key of its section label — editing it orphans that label's translations.

---

### LogicBlockBase

Base class for all logic blocks. Provides actor lifecycle, service binding, persistence, and timer support.

**Methods:**

- `Ready` — Called once after the block has been configured (attribute-driven bindings are in place) and is ready to run, but BEFORE the runtime has restored persisted `ServicePropertyAttribute` values, registered per-contract sender instances, or fired . The right place to attach event handlers to contract / interface elements and to do other block-local one-time setup that doesn't depend on SDK runtime state.
- `Starting` — Called once after and after the runtime has restored persisted `ServicePropertyAttribute` values and registered per-contract sender instances. The right place for setup that depends on SDK runtime state: reading persisted property values, enumerating contract links via `GetLinkedXxx()`, scheduling first periodic ticks, and emitting initial cross-block contract state-updates.
- `Stopping` — Called once before the block is removed, after the runtime processes a stop request. The right place to release resources acquired during the block's lifetime: detach event handlers attached in , cancel in-flight operations, dispose injected clients, flush pending I/O.
- `Configure(ILogicBlockConfigurationBuilder)` — Binds this logic block's interfaces, contracts, services and timers from their declarative attributes. Internal infrastructure invoked by the runtime; not an extension point.
- `ApplyInstantiationParameters(List<InstantiationParameterValue>)` — RFC 0016: applies the operator-chosen `[InstantiationParameter]` values from the config payload onto this block's CLR properties by reflection, before runs the Live-mode binders that read them to resolve inclusion gates. The decode schema is built from each property's `PropertyInfo` via (binder / `PropertyMetadataBuilder` output does not exist pre-bind), then decoded with . Fail-closed: an unknown identifier or a decode failure throws, failing block initialization (sync-status `Failed`) rather than resolving gates against a wrong or default value.
- `BuildThrottlers` — RFC 0004: constructs one `Throttler` per bound service property and per bound measuring point from its declarative emission attributes, into the matching stream collection (`_servicePropertyThrottlers` / `_measuringPointThrottlers`) keyed by (ServiceIdentifier, member name). A dual-annotated member thus gets one gate per stream, so the two streams don't cross-suppress. The attribute (an `IThrottleConfigured`) is read off the binding's root source `PropertyInfo`; the value type comes from `TargetPropertyType`.
- `ResetThrottlerPending(Dictionary<ValueTuple<string, string>, Throttler>, ValueTuple<string, string>)` — RFC 0004: discards a throttler's pending held flush (and its emitted state) on a value-clear, so the cleared edge is not undone by a later trailing flush. Reconstructs the gate from its own `Policy` via a fresh `Throttler` — there is no in-place cancel on the gate. The caller passes the member's stream collection.
- `ResetThrottlers` — RFC 0004: rebuilds every property and measuring-point throttler from its `Policy`, clearing emitted/pending state so the next offer for each member is a fresh leading-edge force-emit. Used on an operational reconnect (`PublishServiceState`): the throttlers' last-emitted values can be ahead of what the broker actually received (publishes during the disconnect were dropped), so the current state must be re-asserted unconditionally rather than deduplicated against it.
- `ScheduleEmissionFlush(DateTimeOffset)` — RFC 0004: ensures one trailing-edge flush is scheduled at the earliest pending deadline across all throttlers. Mirrors — a single idiomatic self-send via the pause-gated / stepper-aware self-scheduling path. The flush body () coalesces and reschedules the next-earliest, so an extra wakeup at worst finds nothing due and reschedules. The flush is dispatched as an `InvokeSynchronized` action rather than a bespoke self-message: the action wrapper is what both the production actor loop and the TestKit's virtual clock (AdvanceTime / FlushPendingActions) actually pump, so the trailing flush is observable under deterministic tests. A raw self-message would be delivered in production but silently dropped by the TestKit, which never re-dispatches non-action self-messages.
- `OnEmissionFlushDue` — RFC 0004: flushes every throttler whose hold deadline has elapsed, emitting its pending value, then reschedules a single wakeup for the earliest still-pending deadline (if any).
- `DrainThrottlers` — RFC 0004: on stop, emit each throttled member's exact current value if it differs from the throttler's last-emitted value — bypassing throttle and deadband — so the final retained state is exact. Reads the current value straight from the binding getter.
- `InvokeActionMessage.#ctor(Action)` — Represents a message that contains an action to be executed in the context of the actor. This is not serializable, therefore only usable locally, usually within one actor

---

### LogicBlockContractAttribute

Marks a class as a contract container grouping messages (`CommandAttribute`, `StateUpdateAttribute`, `RequestResponseAttribute`) exchanged between two LogicBlock interfaces.

> The role names below are translatable in the cloud, but not keyed on this contract: each block that binds one of these interfaces carries its own copy, keyed by that block's `LogicBlockInterfaceBindingAttribute` identifier. See `docs/identifier-stability.md`.

**Properties:**

- `BetweenDefaultName` — Human-readable name for the `BetweenInterface` role. Translatable per binding block (see the remarks on this attribute).
- `AndDefaultName` — Human-readable name for the `AndInterface` role. Translatable per binding block (see the remarks on this attribute).

---

### LogicBlockInterfaceBindingAttribute

Metadata for an implementation of a logic-block interface. Applies to a class (when the LB implements the interface directly) OR a property (when the property's value implements the interface, e.g. an inner ChargingPoint instance). Both cases are "metadata for an existing interface relationship". AllowMultiple = true to handle properties whose type implements multiple interfaces (each `LogicBlockInterfaceBindingAttribute` targets one interface via `ForInterface`).

> `DefaultName` — and the contract's role names (`BetweenDefaultName` / `AndDefaultName`) — are translatable in the cloud, keyed by the block's full type name and this binding's `Identifier`, which defaults to a C# name. Pin `Identifier` to rename the property, interface or class without orphaning the translations. See `docs/identifier-stability.md`.

**Properties:**

- `ForInterface` — The interface this binding metadata applies to.
- `Identifier` — Stable identifier for this interface binding. Defaults to `{PropertyName}_{InterfaceName}` (property-bound) or the bare interface name (class-implemented); pin it to rename without changing the identifier.
- `DefaultName` — Human-readable name for the interface endpoint. Translatable (see the remarks on this attribute).
- `Multiplicity` — Consumer-side link multiplicity for this interface binding. Default `ZeroOrMore` (unconstrained — preserves the pre-multiplicity behaviour). Declared only; enforced downstream.

---

### MeasuringPointKind

Time-series shape of a measuring point. Mirrors the wire enum in Vion.Contracts.TypeRef; mapped at the introspection boundary so integrators only reference Vion.Dale.Sdk.Core.

**Fields/Values:**

- `Measurement` — Instantaneous value at a moment in time. Each sample is independent of previous samples — reflects current state, not running aggregate. Examples: active power (kW), voltage, temperature, state of charge (%). Chart default: line. Aggregation: avg per bucket.
- `Total` — Cumulative running aggregate that can both increase and decrease (without a hardware reset). Each sample is the absolute cumulative value at that moment. Examples: battery stored energy (kWh, absolute), water tank volume, daily energy import (resets at midnight). Chart default: cumulative line. Aggregation: last per bucket.
- `TotalIncreasing` — Monotonically-increasing counter. Only goes up; a drop is anomalous (overflow or hardware/firmware reset) and the platform applies correction (clamp to zero). Examples: lifetime energy meter, odometer, total operating hours, cycle count. Chart default: derivative (rate per bucket). Aggregation: last - first.

---

### PersistentAttribute

Controls persistence behavior for properties. - On writable service properties: Use [Persistent(Exclude = true)] to opt-out - On other properties: Use [Persistent] to opt-in

**Properties:**

- `Exclude` — Set to true to exclude a writable service property from persistence

---

### PresentationAttribute

UI-side presentation hints for a service property, measuring point, or method. Routes into the per-property `presentation` sibling document. Open for preset inheritance — integrators subclass to ship their own domain vocabulary.

**Properties:**

- `DisplayName` — Override the displayed label. Falls back to schema.title (primitives) or the C# property name. For enum-/struct-typed properties (where schema.title is identity-bearing), this is the only way to set a UI label distinct from the CLR type name. Translatable in the cloud under the member's title key (see the remarks on `ServicePropertyAttribute`).
- `Group` — Group key. The dashboard renders all properties with the same Group key in one section. Well-known keys are constants in `PropertyGroup`; integrators may supply their own string keys (e.g. "acme.powertrain") which the dashboard renders as a generic section with the raw key as the header. Section order is set by [LogicBlock(Groups = ...)]; default order is the platform-defined order. Within-group order is by `Order`. A custom key is also the translation key of its section label — editing it orphans that label's translations. Well-known `PropertyGroup` keys are translated by the platform itself.
- `Order` — Sort hint within a group. Ascending; properties without an explicit value sort between explicit values, stable-by-default (base-class first, declaration order within each class). Used for finer ordering than the group level. `MinValue` means "unset" (attribute parameter types can't be nullable; `PropertyMetadataBuilder` converts the sentinel to null in the codec-side `Presentation.Order`).
- `Importance` — Tile composition rank. Primary/Secondary surface on the auto-generated LogicBlock tile; Normal renders in detail views only; Hidden suppresses the property entirely.
- `StatusIndicator` — Marks this property as an operational status indicator for the LogicBlock. A block can carry multiple — distinct status dimensions (e.g. operating mode + connection state + activity status). Must be enum-typed (or nullable enum). Per-member severity comes from [Severity]; per-member display labels from [EnumLabel].
- `Decimals` — Display precision for numeric values. `MinValue` (default) means "unset" and uses sensible per-type defaults (attribute parameter types can't be nullable; `PropertyMetadataBuilder` converts the sentinel to null in the codec-side `Presentation.Decimals`). Ignored for non-numeric schemas (analyzer warning DALE021).
- `UiHint` — Routing key for the dashboard's generic renderer and for custom widget templates. Open string; unrecognized values are silently ignored. Well-known platform values are constants in `UiHints`. The "statusIndicator" value is auto-emitted from `StatusIndicator` — don't set directly.
- `Format` — Format-token string for date / duration / numeric renderers. Type-orthogonal — a separate concern from `UiHint` (which selects the widget) and `Decimals` (which controls numeric precision). The renderer (dashboard / DevHost) consumes the value as a moment.js / day.js compatible format-token string when the property's CLR type is `DateTime` or `TimeSpan`. Two reserved sentinel values short-circuit the token interpreter: `"relative"` → auto-updating "3 minutes ago"-style date display `"humanize"` → humanized duration like "3 hours" Common tokens (see `Formats` for shortcuts): `"LLLL"` → "Wednesday, May 13, 2026 2:32 PM" (locale full + weekday) `"LLL"` → "May 13, 2026 2:32 PM" (locale long) `"YYYY-MM-DD HH:mm:ss"` → "2026-05-13 14:32:05" `"YYYY-MM-DD HH:mm:ss.SSS"` → with millisecond precision `"HH:mm:ss"` → "01:23:45" (typical for durations) Token reference: .
- `VisibleWhen` — Conditional-visibility predicate. When set, this member is hidden from the dashboard form whenever the predicate evaluates false, and shown otherwise. Evaluated reactively in the UI only, against the live values of sibling service properties of the same logic-block instance . The member keeps existing and functioning everywhere else — runtime, MQTT, cloud DB, introspection — so this is a pure display hint, never an existence or behavior gate (contrast RFC 0016's `[ExistsWhen]`, which removes the member across every layer). A property with no `VisibleWhen` is always shown (backward compatible). Evaluation is fail-open: a broken or unresolvable predicate shows the member. Grammar (in brief). A typed subset of the dashboard's widget-expression dialect: comparisons — `==` `!=` (bool / enum / string / integer refs), `&lt;` `&lt;=` `&gt;` `&gt;=` (integer refs only); membership — `ref in [literal, …]` (enum / string / integer, homogeneous list); boolean combinators — `&amp;&amp;` `||` `!` and parentheses; a bare ref must be `bool`; `!` applies only to a bool ref or a parenthesized predicate (write `!(A == 5)`, not `!A == 5`); literals — integers (int32 range), `true` / `false`, and strings. Enum members are quoted strings (`Mode == 'Eco'`). Single quotes are the recommended style (no escaping inside a C# attribute string). Refs sit on the left of every comparison (no Yoda conditions). Arithmetic, the ternary, function calls, and pipes are rejected by the analyzer. The canonical grammar and semantics live in the shared `docs/predicates.md` (vion-contracts), pinned by `Predicates/predicate-conformance.json`. Reference scope and addressing. Referenced targets must be `[ServiceProperty]`s of type `bool`, `enum`, integer, or `string` (never `double`/`float`, `WriteOnly`, or measuring-point-only members): Bare ref (`DirectMeasurement`) — a property on the same service as the annotated member. Qualified ref (`Service.Property`) — a property on a sibling service of the same logic-block instance . Service identifiers are those the introspection uses (invisible in source, so spelled out here): the component-service identifier is the holding property's name (a `ChargingPoint ChargingPoint1 { get; }` property forms service `ChargingPoint1`), and the root-service identifier is the logic-block class name (address the root's own `IsExternallyLocked` as `MyBlockClassName.IsExternallyLocked`). Renaming the class therefore breaks root-qualified predicates in the same compilation — the analyzer (DALE041/DALE042) catches it at build. `nameof()` concatenation is supported: `VisibleWhen = nameof(DirectMeasurement) + " == false"`.

---

### PropertyGroup

Well-known property-group keys for `Group`. The platform ships these; integrators may define their own constants in their own static classes (e.g. `Acme.Vion.Conventions.PropertyGroup.Powertrain = "acme.powertrain"`) and the dashboard renders unknown keys as a generic section with the raw key as the header.

**Fields/Values:**

- `None` — Ungrouped — renders without a section header (fallback bucket).
- `Identity` — Static identification information — manufacturer, model number, serial number, firmware version. Typically rendered in a header / about area.
- `Status` — Current live operational state — read-only values that reflect what the system is doing right now.
- `Configuration` — Anything the operator can write — long-term settings, runtime controls, action triggers (`UiHint = UiHints.Trigger`). Render type within the section is driven by `UiHint`, not by group.
- `Metric` — Counters, totals, accumulated values. Often rendered prominently for energy / billing-style data.
- `Diagnostics` — Troubleshooting and health information — last error, response time, connectivity. Usually a collapsed / secondary section.
- `Alarm` — Active alarm state, fault codes. Rendered with elevated visual treatment (banner / alert list) when active.

---

### RequestResponseAttribute

Marks a message as a request message. The message is sent to a specific linked interface instance. The receiving/responding side will need to return the response message. The responding side will not get the identifier of the sender. The requesting side will receive the identifier of the responder with the response.

---

### ServiceInterfaceAttribute

Declare a service interface as a C# interface. Use the ServiceProperty and ServiceMeasuringPoint attributes on properties.

---

### ServiceMeasuringPointAttribute

Define a measuring point on a service interface or logic block property. The optional properties become annotations in the introspection schema document. A property MAY also carry `ServicePropertyAttribute` — the two are independent. Each publishes to its own retained MQTT stream (`…/measuring-point/state` vs `…/property/state`) and is throttled / deadbanded separately (RFC 0004); neither suppresses the other. Common for telemetry charted in the cloud that is also surfaced as live state (e.g. grid-meter power).

> `Title` and `Description` are translatable in the cloud, keyed by the block's full type name plus two C# names: the owning service (the logic-block class name, or the holding property's name for a component service) and this property's name. There is no `Identifier` override — renaming any of them orphans the translations. See `docs/identifier-stability.md`.

**Properties:**

- `Title` — Display label for the measuring point. Translatable (see the remarks on this attribute).
- `Description` — Long-form description for tooltips, search, and accessibility. Routes into `schema.description`. Independent of `Title`, and separately translatable (see the remarks on this attribute).
- `StringFormat` — Advisory JSON-Schema `format` for a `string` measuring point (e.g. `Ipv4`). Routes into `schema.format`; drives a specialized input + soft-validation in the dashboard / DevHost. Never enforced on the wire. String-only and not a type-kind format (`date-time` / `duration` / `uuid`) — see DALE033.
- `Kind` — Semantic classification of the measuring point's time-series shape — drives default chart rendering, aggregation, and storage strategy. Routes into `schema.x-kind`. Defaults to `Measurement` (instantaneous samples).
- `MinInterval` — Minimum spacing between two emitted values for this measuring point, as a duration string (e.g. `"250ms"`, `"1s"`, `"500us"`) — a number with an optional `us`/`ms`/`s`/`m`/`h` suffix; a bare number is milliseconds. Drives the RFC 0004 emission gate. `"0"` / `"0ms"` disables interval throttling. Defaults to `"250ms"`. Validated by analyzers DALE036 (format) / DALE037 (1&#160;ms floor).
- `MinChange` — Optional deadband: the minimum change a new value must clear (relative to the last emitted value) before it is emitted. The format depends on the measuring point's type — for the built-in numeric types (`double`, `float`, `decimal`, `int`, `long`) it is an invariant-culture number (e.g. `"0.1"`); for `TimeSpan` it is a duration (e.g. `"1s"`). Any other type must register an `IChangeThreshold&lt;T&gt;` that defines its format; `bool` has no magnitude and is not supported. `null` (the default) means no deadband — only the value-equality dedup floor runs. Validated by analyzers DALE034 (type) / DALE035 (format).
- `Immediate` — When `true`, every observed change of this measuring point is emitted immediately, bypassing the interval and change gates. Defaults to `false`.

---

### ServicePropertyAttribute

Describe a service property on a service interface or logic block property. The optional properties become annotations in the introspection schema document. A property MAY also carry `ServiceMeasuringPointAttribute` — the two are independent. Each publishes to its own retained MQTT stream (`…/property/state` vs `…/measuring-point/state`) and is throttled / deadbanded separately (RFC 0004); neither suppresses the other. Declaring both surfaces the same value as live state AND a charted time series — common for telemetry (e.g. grid-meter power).

> `Title` and `Description` are translatable in the cloud, keyed by the block's full type name plus two C# names: the owning service (the logic-block class name, or the holding property's name for a component service) and this property's name. There is no `Identifier` override — renaming any of them orphans the translations. See `docs/identifier-stability.md`.

**Properties:**

- `Title` — Display label for the property. Translatable (see the remarks on this attribute).
- `Description` — Long-form description for tooltips, search, and accessibility. Routes into `schema.description`. Independent of `Title`, and separately translatable (see the remarks on this attribute).
- `StringFormat` — Advisory JSON-Schema `format` for a `string` value (e.g. `Ipv4`). Routes into `schema.format`; drives a specialized input + soft-validation in the dashboard / DevHost. Never enforced on the wire. String-only and not a type-kind format (`date-time` / `duration` / `uuid`) — see DALE033.
- `WriteOnly` — Marks a writable property as a secret — clients see a redaction sentinel (`"***"`) on the publish-state channel instead of the actual value. Restricted to `string` / `string?` properties in v1. Routes into `schema.writeOnly`.
- `ReadOnly` — Marks the property as read-only on the wire even when the C# property has a public setter. Use this when a cross-assembly helper needs to assign the value (requires the public setter) but the cloud must not be able to SetPropertyValue it back. Routes into `schema.readOnly` — same wire flag that a private setter or a `[ServiceMeasuringPoint]` would set, so the dashboard groups it with metrics.
- `MinInterval` — Minimum spacing between two emitted values for this property, as a duration string (e.g. `"250ms"`, `"1s"`, `"500us"`) — a number with an optional `us`/`ms`/`s`/`m`/`h` suffix; a bare number is milliseconds. Drives the RFC 0004 emission gate. `"0"` / `"0ms"` disables interval throttling. Defaults to `"250ms"`. Validated by analyzers DALE036 (format) / DALE037 (1&#160;ms floor).
- `MinChange` — Optional deadband: the minimum change a new value must clear (relative to the last emitted value) before it is emitted. The format depends on the property's type — for the built-in numeric types (`double`, `float`, `decimal`, `int`, `long`) it is an invariant-culture number (e.g. `"0.1"`); for `TimeSpan` it is a duration (e.g. `"1s"`). Any other type must register an `IChangeThreshold&lt;T&gt;` that defines its format; `bool` has no magnitude and is not supported. `null` (the default) means no deadband — only the value-equality dedup floor runs. Validated by analyzers DALE034 (type) / DALE035 (format).
- `Immediate` — When `true`, every observed change of this property is emitted immediately, bypassing the interval and change gates. Defaults to `false`.

---

### ServiceProviderContractBindingAttribute

Binds a LogicBlock property to a hardware service-provider function (HAL: IAnalogOutput, IDigitalOutput, IModbusClient, …). The property type is the hardware contract; the attribute carries the identity / link-multiplicity metadata for the binding. Structurally the matched twin of `LogicBlockInterfaceBindingAttribute` — distinct only because the two are consumed by different binders (in-process actor link vs MQTT service-provider adapter).

> `DefaultName` is translatable in the cloud, keyed by the block's full type name and this binding's `Identifier` — which defaults to the annotated property's name, so renaming that property orphans the translations unless `Identifier` is pinned. See `docs/identifier-stability.md`.

**Properties:**

- `Identifier` — Stable identifier for this contract binding. Defaults to the annotated property's name; pin it to rename the property without changing the identifier.
- `DefaultName` — Human-readable name for the contract. Translatable (see the remarks on this attribute).
- `Multiplicity` — Consumer-side link multiplicity for this contract binding. Default `ZeroOrMore` (unconstrained — preserves the pre-multiplicity behaviour). Declared only; enforced downstream.

---

### ServiceRelationAttribute

Declares that wiring this contract between two logic blocks is a service relation of the given type — a typed edge between the two blocks' services, published as topology metadata. Declare it once, here on the contract: every block implementing either of the contract's two interfaces then takes part automatically, on whichever side it implements. Relations describe the graph; they carry no runtime behaviour and change nothing about how messages flow. Which side is which. `OutwardsInterface` names the subordinate, providing side — the start of the arrow. The contract's other interface is the inwards, aggregating side — the end of the arrow. A block may implement both sides; each is treated independently. A component must be a service to take part. The relation attaches to the service that owns the interface: the block's own service when the block class implements it, or the component's service when a property's type does. A component type with no service surface (no `ServiceInterfaceAttribute`, no `ServicePropertyAttribute` or `ServiceMeasuringPointAttribute` members) is not a service, so nothing is emitted for it — the interface still binds and wires as usual. Give the component one service property to let it take part, or implement the interface on the block class for an edge at block granularity. Both sides need the declaration. Each package resolves relations at build time against the contract assembly it was compiled against, so a block built against an older contract simply contributes nothing for that pair — a missing edge, never an error.

**Properties:**

- `RelationType` — Names the kind of edge this relation is. Opaque and compared verbatim, and it is what both the API and the UI key on — so treat it as a public identifier: choose it deliberately, and expect a rename to break every consumer. Must be unique among the declarations on one contract.
- `OutwardsInterface` — Which of the contract's two interfaces is the outwards — subordinate, providing — side. Must be spelled exactly like the corresponding `BetweenInterface` or `AndInterface`; any other value is rejected.

---

### ServiceRelationDirection

Which side of a service relation a service sits on. `Outwards` is the side named by `OutwardsInterface`; the contract's other interface is `Inwards`.

**Fields/Values:**

- `Inwards` — This service is the target (end) of the relation — the aggregating / managing side.
- `Outwards` — This service is the source (start) of the relation — the subordinate / providing side.

---

### SeverityAttribute

Per-enum-member severity used with `[Presentation(StatusIndicator = true)]`. The dashboard reads severity for each enum member to color the status pill. Companion to `EnumLabelAttribute` which supplies the display label.

---

### StateUpdateAttribute

Marks a message as a state update. The message is sent to all linked interfaces. The receiving side will get the identifier of the sender

---

### StatusSeverity

Severity level for status indicator enum values.

**Fields/Values:**

- `Success` — Indicates a healthy or successful state.
- `Info` — Informational status.
- `Warning` — Indicates a potential issue.
- `Error` — Indicates a failure or critical issue.
- `Neutral` — No specific severity.

---

### StringFormats

Well-known JSON-Schema `format` values for string properties, set via `StringFormat` on `ServicePropertyAttribute` / `StructFieldAttribute`. Open set — integrators may pass any value; UIs recognize these and fall back to a plain text input for unknown ones. Advisory only: the runtime never rejects on format. Do NOT use these for `DateTime` / `TimeSpan` / `Guid` values — those are CLR types whose format is derived (`date-time` / `duration` / `uuid`); see DALE033.

**Fields/Values:**

- `Ipv4` — IPv4 dotted-quad address, e.g. `192.168.1.10`.
- `Ipv6` — IPv6 address.
- `Hostname` — DNS hostname (RFC 1123 label form).
- `Email` — Email address.
- `Uri` — URI / URL string.

---

### StructFieldAttribute

Per-field annotations for fields of a flat struct used as a service-element value. Applies to positional record-struct constructor parameters (preferred) or properties.

> `Title` and `Description` are translatable in the cloud, keyed by the struct's short type name (the namespace is not part of the key) and the field's camelCase wire name — the constructor parameter's name, first letter lower-cased. Renaming either orphans the translations. See `docs/identifier-stability.md`.

**Properties:**

- `Title` — Display label for the field. Translatable (see the remarks on this attribute).
- `Description` — Long-form description for the field. Separately translatable, like `Title`.
- `StringFormat` — Advisory JSON-Schema `format` for a string field (e.g. `Ipv4`). Routes into the field's `schema.format`. String-only — see DALE033.
- `WriteOnly` — Marks this field as a secret — clients see a redaction sentinel (`"***"`) on the publish-state channel instead of the actual value, while the struct's other fields stay visible. Restricted to `string` / `string?` fields in v1. Routes into the field's `schema.writeOnly`.

---

### TimerAttribute

Declare a timer method that should be called at regular intervals. If the identifier is not set, the method name is used.

---

### UiHints

Well-known UiHint values for `UiHint`. Open set — the dashboard ignores unknown values and falls back to the default renderer for the property's schema kind.

**Fields/Values:**

- `StatusIndicator` — Auto-emitted when `StatusIndicator` is true. Do not set directly; use the boolean field. Tile renders as a status pill / badge.
- `Trigger` — Renders a writable bool property as a button instead of a toggle. Click commits `true`; the property's getter should always return `false`. Bridge for operator-triggered actions until a first-class action primitive ships. Forbidden with `[Persistent]`.
- `Sparkline` — Inline sparkline rendering for numeric arrays or numeric measuring points.
- `Multiline` — Renders a writable string property as a multi-line textarea.
- `Json` — Renders a writable string property as a code editor with JSON syntax highlighting. Implies multi-line.
- `Slider` — Renders a writable numeric property with bounded Minimum AND Maximum as a slider control.

---

## Vion.Dale.Sdk.Abstractions

### ScenarioWireAttribute

Marks a `ServiceProviderHandlerBase` with the wire struct its contract carries, so the DevHost can drive (`serviceProviderSet`) and assert (`serviceProviderExpect`) that contract from a committed scenario through the generic service-provider handler (RFC 0010). Scenario-testing / DevHost only. The production runtime reaches hardware over MQTT (FlatBuffers) and never reads this — it carries no runtime behaviour. It is a declarative marker the DevHost discovers (the same assembly scan the runtime uses to find handlers) to build the contract message from a JSON scenario value. Declare the inbound struct for an input contract (SP → block, driven by a scenario), and/or the outbound command struct for an output contract (block → SP, asserted by a scenario): [ScenarioWire(Inbound = typeof(DigitalInputChanged))] // an input — digital/analog input, PPC demand [ScenarioWire(Outbound = typeof(SetDigitalOutput))] // an output — digital/analog output

**Properties:**

- `Inbound` — The wire struct a scenario DRIVES into the block (an input contract); a scenario value maps to it.
- `Outbound` — The command struct the block writes and a scenario ASSERTS (an output contract).

---

### ServiceProviderHandlerBase

Base class for all service provider handler actors (DI, DO, AI, AO, Modbus, custom). Owns the actor lifecycle (registration, contract linking) and provides helpers for common operations.

> is implemented explicitly so subclasses cannot override it. Messages are routed to: — for MQTT messages from the broker — for contract messages from logic blocks Subclasses can schedule delayed callbacks using , which are dispatched transparently by the base class (same pattern as `LogicBlockBase`).

**Properties:**

- `ActorContext` — The current actor context. Set on each message dispatch. Available for use in callbacks.
- `Logger` — Logger available to subclasses.
- `ContractLogicBlockActorReferences` — The contract-to-logic-block actor mappings, set during the linking phase.

**Methods:**

- *Constructor* — Initializes a new instance of the handler.
- `Vion#Dale#Sdk#Abstractions#IActorReceiver#HandleMessageAsync(object, IActorContext)` — *(no description)*
- `GetMqttRegistration` — Returns the MQTT routing key and action path suffixes for this handler. The base class prepends the service provider wildcard prefix (`/+/+/+`) to each action path to form the full subscription topics.
- `HandleMqttMessage(ServiceProviderMqttMessage)` — Handles an MQTT message received from the broker. The message contains the pre-parsed `ContractId` and `CorrelationId`. Use `ActorContext` for actor communication.
- `HandleContractMessage(IContractMessage)` — Handles a contract message from a logic block (e.g., set commands, read/write requests). Use `ActorContext` for actor communication.
- `OnContractActorsLinked(LinkLogicBlockContractActors)` — Called after contract actor references are linked. Override to perform additional setup (e.g., building per-contract lookup dictionaries).
- `InvokeSynchronizedAfter(Action, TimeSpan)` — Schedules an action to be invoked after a delay, dispatched through the actor's message loop. Same pattern as `LogicBlockBase.InvokeSynchronizedAfter`.
- `Publish(string, byte[], string, string, Guid?, string, bool)` — Publishes an MQTT message with the standard protocol conventions (correlation ID, schema user property, content type). Returns the correlation ID used.
  - `topic`: The full MQTT topic to publish to.
  - `payload`: The serialized payload bytes.
  - `schemaName`: The schema name set as an MQTT user property (identifies the payload type).
  - `contentType`: The MQTT content type (e.g., `MessageMimeTypes.FlatBuffer`, `MessageMimeTypes.Json`). Defaults to `MessageMimeTypes.FlatBuffer` if not specified.
  - `correlationId`: An existing correlation ID to use. If `null`, a new one is generated.
  - `responseTopic`: Optional response topic for request-response patterns.
  - `retain`: Whether the message should be retained by the broker.
- `PublishJson<T>(string, T, string, Guid?, string, bool)` — Serializes the payload as JSON and publishes it with `application/json` content type.
- `ForwardToLogicBlocks<T>(ServiceProviderContractId, T)` — Forwards a state-changed message to all logic block actors mapped to the given service provider contract.
- `FindMappedServiceProviderContracts(LogicBlockContractId)` — Finds all service provider contracts that a logic block contract is mapped to. Used by output handlers to reverse-lookup the target when a logic block sends a set command.

**Fields/Values:**

- `ServiceProviderTopicPrefix` — The wildcard prefix prepended to all subscription action paths. Matches the `/{serviceProviderIdentifier}/{service}/{contract}` routing prefix in the topic structure. Centralized here to enforce the convention and enable programmatic broker ACL configuration.

---

### ServiceProviderMqttMessage

A parsed MQTT message for service provider handlers. Provides pre-extracted routing information and typed payload access, hiding the internal `MqttMessageReceived` type.

**Properties:**

- `ContractId` — The service provider contract this message targets, parsed from the topic.
- `CorrelationId` — The correlation ID from the MQTT message headers. `Empty` if no correlation data was present or the format was not recognized.
- `Topic` — The full MQTT topic of the received message.
- `ResponseTopic` — The MQTT 5.0 response topic, if present. Used in request-response patterns.
- `RawPayload` — The raw payload bytes for custom deserialization.

**Methods:**

- `GetJsonPayload<T>(JsonSerializerOptions)` — Deserializes the payload as JSON.
  - `serializerOptions`: Optional JSON serializer options. If null, `DefaultOptions` are used.
- `GetFlatBufferPayload` — Returns the payload as a FlatBuffer ByteBuffer for deserialization.
- `GetPayloadBytes` — Returns the raw payload as a byte array. Use `RawPayload` to avoid the copy when possible.

---

## Vion.Dale.Sdk.Configuration.Contract

### LogicBlockContractBase

Base class for all logic block contract implementations (e.g., DigitalInput, DigitalOutput, ModbusRtu). A contract represents a binding between a logic block and a service provider endpoint. It receives state updates from the service provider handler and can send commands back to it.

> Subclasses must: Set `ContractHandlerActorName` to the name of the handler actor (e.g., `nameof(DigitalInputHandler)`) Implement to dispatch incoming messages (state changes, responses) Subclasses that send commands to the handler (output contracts, request-response contracts) use to send messages to the linked handler actor.

**Properties:**

- `LogicBlockContractId` — The identity of this contract within its owning logic block. Set during initialization.
- `ContractHandlerActorName` — The name of the handler actor this contract communicates with. Must match the actor name registered in the runtime (e.g., `nameof(DigitalInputHandler)`).
- `Identifier` — The contract identifier as declared on the logic block property (e.g., `"di0"`).
- `MetaData` — Metadata for this contract (default name, tags, cardinality, sharing). Populated from attributes during introspection.

**Methods:**

- *Constructor* — Initializes a new instance of the contract.
  - `identifier`: The contract identifier (matches the property name on the logic block).
  - `actorContext`: The actor context used to send messages to the handler actor.
- `SetLogicBlockContractId(LogicBlockContractId)` — Sets the full logic block contract identity. Called by the runtime during initialization to associate this contract with its owning logic block.
  - `logicBlockContractId`: The full contract identity including the logic block ID.
- `SetLinkedContractHandler(IActorReference)` — Links this contract to its handler actor. Called by the runtime during initialization.
  - `contractHandlerActorRef`: A reference to the handler actor.
- `HandleContractMessage(IContractMessage)` — Dispatches an incoming contract message (e.g., state change, response) to the appropriate handler logic. Called by the runtime when a message from the handler actor targets this contract.
  - `contractMessage`: The incoming contract message.
- `SendToContractHandler<T>(T)` — Sends a message to the linked handler actor (e.g., a set command or a read request). If the contract has no mapping (no linked logic block), the message is silently dropped.
  - `message`: The message to send.

---

## Vion.Dale.Sdk.Mqtt

### RegistrationSecret

Generates and persists registration secrets for service providers. The secret is used as an MQTT topic segment during the registration handshake.

**Methods:**

- `Generate` — Generates a new registration secret suitable for use as an MQTT topic segment. Returns a 32-character lowercase hex string (UUID v4 without hyphens).
- `LoadOrCreate(string)` — Loads an existing secret from , or generates a new one and persists it. Subsequent calls with the same path return the same secret.
  - `filePath`: The file path to read from or write to.

---
