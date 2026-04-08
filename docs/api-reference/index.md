---
title: SDK API Reference
description: Auto-generated API reference for types marked with [PublicApi].
---

# Dale SDK API Reference

> Auto-generated from source code. Types marked with `[PublicApi]`.

## Dale.Sdk.AnalogIo.TestKit

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

## Dale.Sdk.AnalogIo.Input

### IAnalogInput

Represents an analog input that can be used to communicate with hardware.

---

## Dale.Sdk.AnalogIo.Output

### IAnalogOutput

Represents an analog output that can be used to communicate with hardware.

**Methods:**

- `Set(double)` — Sets the analog output to the specified value.
  - `value`: The value to set the analog output to.

---

## Dale.Sdk.DigitalIo.TestKit

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

## Dale.Sdk.DigitalIo.Input

### IDigitalInput

Represents a digital input that can be used to communicate with hardware.

---

## Dale.Sdk.DigitalIo.Output

### IDigitalOutput

Represents a digital output that can be used to communicate with hardware.

**Methods:**

- `Set(bool)` — Sets the digital output to the specified value.
  - `value`: The value to set the digital output to.

---

## Dale.Sdk.Http

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

## Dale.Sdk.Modbus.Core.Conversion

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

## Dale.Sdk.Modbus.Core.Exceptions

### ModbusException

Represents errors that occur during Modbus communication.

**Properties:**

- `ExceptionCode` — The Modbus exception code. A value of -1 indicates that there is no specific exception code.

**Methods:**

- *Constructor* — Initializes a new instance of the `ModbusException` class with a specified error message and a default exception code of -1.
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

## Dale.Sdk.Modbus.Rtu.TestKit

### IModbusRtuExtensions

Extension methods on `IModbusRtu` for simulating Modbus responses in tests.

**Methods:**

- `SimulateReadResponse<T>(IModbusRtu, LogicBlockTestContext<T>, byte[], ushort?)` — Simulates a successful read response by invoking the pending request's callback with the given data. The data bytes are processed through the same callback chain as in production (SwapBytes, CastFromBytes, etc.).
  - `modbusRtu`: The Modbus RTU contract instance.
  - `testContext`: The test context containing recorded messages.
  - `responseData`: The raw response bytes (big-endian by default, matching Modbus wire format).
  - `startingAddress`: Optional filter to match a specific request by starting address.
- `SimulateReadError<T>(IModbusRtu, LogicBlockTestContext<T>, Exception, ushort?)` — Simulates a read error by invoking the pending request's callback with the given exception.
- `SimulateWriteResponse<T>(IModbusRtu, LogicBlockTestContext<T>, ushort?)` — Simulates a successful write response by invoking the pending request's callback with no error.
- `SimulateWriteError<T>(IModbusRtu, LogicBlockTestContext<T>, Exception, ushort?)` — Simulates a write error by invoking the pending request's callback with the given exception.

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

## Dale.Sdk.Modbus.Rtu

### IModbusRtu

Provides Modbus RTU read and write operations.

> Initially disabled (`IsEnabled` is `false`). When disabled, all operations are skipped. All instances share a single `ModbusRtuHandler`. Requests from all `IModbusRtu` instances are processed sequentially in the order they are received, and all instances share a maximum pending request limit of `MaxPendingRequests`. The following exceptions may be passed to the error callback on any read or write operation: `InvalidUnitIdentifierException` — The specified unit identifier is less than 0 or greater than 255. `PendingRequestsLimitReachedException` — There is a limit on how many requests can be pending at the same time. When this limit is reached, new requests are rejected immediately. — No HAL element mapping was found for the associated IO ID. `OperationTimeoutException` — The operation did not complete within the specified timeout. Every second, pending requests are checked for expiration and immediately completed if expired. `ModbusException` — An error was returned by the Modbus device. The following exceptions apply only to specific operations: `InvalidBitQuantityException` — Fewer coils or discrete inputs were returned than were requested. `InvalidCountException` — The resulting register quantity exceeds the maximum of 65535 (e.g., requesting 17000 64-bit values requires 68000 registers). `ModbusResponseAlignmentException` — The number of bytes received does not match the expected amount for the requested registers. For example, reading 2 registers expects 4 bytes; if 5 bytes are returned, this exception is thrown.

**Properties:**

- `IsEnabled` — Gets or sets a value indicating whether operations are enabled.
- `DefaultOperationTimeout` — Gets or sets the default timeout for Modbus operations. Default is 5 seconds.

**Methods:**

- `ReadDiscreteInputs(int, ushort, ushort, Action<bool[]>, Action<Exception>, TimeSpan?)` — Reads discrete inputs from a Modbus device (Function Code 2).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of discrete inputs to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadCoils(int, ushort, ushort, Action<bool[]>, Action<Exception>, TimeSpan?)` — Reads coils from a Modbus device (Function Code 1).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of coils to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteSingleCoil(int, ushort, bool, Action, Action<Exception>, TimeSpan?)` — Writes a single coil to a Modbus device (Function Code 5).
  - `unitIdentifier`: The unit identifier (slave address).
  - `registerAddress`: The address of the coil to write.
  - `value`: The value to write to the coil.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleCoils(int, ushort, bool[], Action, Action<Exception>, TimeSpan?)` — Writes multiple coils to a Modbus device (Function Code 15).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the coils.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersRaw(int, ushort, ushort, Action<byte[]>, Action<Exception>, TimeSpan?)` — Reads input registers as raw bytes from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of registers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsShort(int, ushort, ushort, Action<short[]>, Action<Exception>, ByteOrder, TimeSpan?)` — Reads input registers as signed 16-bit integers from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of registers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsUShort(int, ushort, ushort, Action<ushort[]>, Action<Exception>, ByteOrder, TimeSpan?)` — Reads input registers as unsigned 16-bit integers from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of registers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsInt(int, ushort, uint, Action<int[]>, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Reads input registers as signed 32-bit integers from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 32-bit integers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsUInt(int, ushort, uint, Action<uint[]>, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Reads input registers as unsigned 32-bit integers from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 32-bit integers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsFloat(int, ushort, uint, Action<float[]>, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Reads input registers as 32-bit floating-point numbers from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 32-bit floating-point numbers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsLong(int, ushort, uint, Action<long[]>, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Reads input registers as signed 64-bit integers from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 64-bit integers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsULong(int, ushort, uint, Action<ulong[]>, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Reads input registers as unsigned 64-bit integers from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 64-bit integers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsDouble(int, ushort, uint, Action<double[]>, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Reads input registers as 64-bit floating-point numbers from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 64-bit floating-point numbers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsString(int, ushort, ushort, Action<string>, Action<Exception>, TextEncoding, TimeSpan?)` — Reads input registers as a string from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of registers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `textEncoding`: The text encoding to use for decoding the string. Default is `Ascii`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersRaw(int, ushort, ushort, Action<byte[]>, Action<Exception>, TimeSpan?)` — Reads holding registers as raw bytes from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of registers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsShort(int, ushort, ushort, Action<short[]>, Action<Exception>, ByteOrder, TimeSpan?)` — Reads holding registers as signed 16-bit integers from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of registers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsUShort(int, ushort, ushort, Action<ushort[]>, Action<Exception>, ByteOrder, TimeSpan?)` — Reads holding registers as unsigned 16-bit integers from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of registers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsInt(int, ushort, uint, Action<int[]>, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Reads holding registers as signed 32-bit integers from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 32-bit integers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsUInt(int, ushort, uint, Action<uint[]>, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Reads holding registers as unsigned 32-bit integers from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 32-bit integers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsFloat(int, ushort, uint, Action<float[]>, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Reads holding registers as 32-bit floating-point numbers from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 32-bit floating-point numbers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsLong(int, ushort, uint, Action<long[]>, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Reads holding registers as signed 64-bit integers from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 64-bit integers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsULong(int, ushort, uint, Action<ulong[]>, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Reads holding registers as unsigned 64-bit integers from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 64-bit integers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsDouble(int, ushort, uint, Action<double[]>, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Reads holding registers as 64-bit floating-point numbers from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 64-bit floating-point numbers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsString(int, ushort, ushort, Action<string>, Action<Exception>, TextEncoding, TimeSpan?)` — Reads holding registers as a string from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of registers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `textEncoding`: The text encoding to use for decoding the string. Default is `Ascii`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteSingleHoldingRegister(int, ushort, short, Action, Action<Exception>, ByteOrder, TimeSpan?)` — Writes a single holding register as a signed 16-bit integer to a Modbus device (Function Code 6).
  - `unitIdentifier`: The unit identifier (slave address).
  - `registerAddress`: The address of the register to write.
  - `value`: The value to write to the register.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteSingleHoldingRegister(int, ushort, ushort, Action, Action<Exception>, ByteOrder, TimeSpan?)` — Writes a single holding register as an unsigned 16-bit integer to a Modbus device (Function Code 6).
  - `unitIdentifier`: The unit identifier (slave address).
  - `registerAddress`: The address of the register to write.
  - `value`: The value to write to the register.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersRaw(int, ushort, byte[], Action, Action<Exception>, TimeSpan?)` — Writes multiple holding registers as raw bytes to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The raw byte values to write to the registers.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsShort(int, ushort, short[], Action, Action<Exception>, ByteOrder, TimeSpan?)` — Writes multiple holding registers as signed 16-bit integers to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the registers.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsUShort(int, ushort, ushort[], Action, Action<Exception>, ByteOrder, TimeSpan?)` — Writes multiple holding registers as unsigned 16-bit integers to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the registers.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsInt(int, ushort, int[], Action, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Writes multiple holding registers as signed 32-bit integers to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the registers.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `wordOrder`: The word order to write the data in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsUInt(int, ushort, uint[], Action, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Writes multiple holding registers as unsigned 32-bit integers to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the registers.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `wordOrder`: The word order to write the data in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsFloat(int, ushort, float[], Action, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Writes multiple holding registers as 32-bit floating-point numbers to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the registers.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `wordOrder`: The word order to write the data in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsLong(int, ushort, long[], Action, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Writes multiple holding registers as signed 64-bit integers to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the registers.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `wordOrder`: The word order to write the data in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsULong(int, ushort, ulong[], Action, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Writes multiple holding registers as unsigned 64-bit integers to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the registers.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `wordOrder`: The word order to write the data in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsDouble(int, ushort, double[], Action, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Writes multiple holding registers as 64-bit floating-point numbers to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the registers.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `wordOrder`: The word order to write the data in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsString(int, ushort, string, Action, Action<Exception>, TextEncoding, TimeSpan?)` — Writes multiple holding registers as a string to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `value`: The string value to write to the registers.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `textEncoding`: The text encoding to use for encoding the string. Default is `Ascii`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.

---

## Dale.Sdk.Modbus.Tcp

### ServiceCollectionExtensions

Extension methods for setting up Modbus TCP services in an `IServiceCollection`.

**Methods:**

- `AddDaleModbusTcpSdk(IServiceCollection)` — Adds Modbus TCP services to the specified `IServiceCollection`.
  - `serviceCollection`: The `IServiceCollection` to add services to.

---

## Dale.Sdk.Modbus.Tcp.Client.LogicBlock

### ILogicBlockModbusTcpClient

Provides non-blocking Modbus TCP client functionality for logic blocks.

**Properties:**

- `IsEnabled` — Gets or sets whether the client is enabled. Default is `false`.
- `QueueCapacity` — Gets or sets the maximum number of requests that can be queued. Default is 100.
- `QueueOverflowPolicy` — Gets or sets the policy for handling new requests when the queue is full. Default is `DropOldest`.
- `QueuedRequestCount` — Gets the current number of requests queued for execution.
- `ConnectionTimeout` — Gets or sets the timeout for connection attempts to the Modbus TCP server.
- `Port` — Gets or sets the port number used to connect to the Modbus TCP server.
- `IpAddress` — Gets or sets the IP address of the Modbus TCP server.
- `DefaultOperationTimeout` — Gets or sets the default timeout for Modbus operations. Default is 1 second.

**Methods:**

- `Disconnect(IActorDispatcher, Action, Action<Exception>)` — Manually disconnects from the Modbus TCP server.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. Errors are always logged, regardless of whether an error callback is specified.
- `ReadDiscreteInputs(int, ushort, ushort, IActorDispatcher, Action<bool[]>, Action<Exception>, TimeSpan?)` — Reads discrete inputs from a Modbus device (Function Code 2).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of discrete inputs to read.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadCoils(int, ushort, ushort, IActorDispatcher, Action<bool[]>, Action<Exception>, TimeSpan?)` — Reads coils from a Modbus device (Function Code 1).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of coils to read.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteSingleCoil(int, ushort, bool, IActorDispatcher, Action, Action<Exception>, TimeSpan?)` — Writes a single coil to a Modbus device (Function Code 5).
  - `unitIdentifier`: The unit identifier (slave address).
  - `registerAddress`: The address of the coil to write.
  - `value`: The value to write to the coil.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleCoils(int, ushort, bool[], IActorDispatcher, Action, Action<Exception>, TimeSpan?)` — Writes multiple coils to a Modbus device (Function Code 15).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the coils.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersRaw(int, ushort, ushort, IActorDispatcher, Action<byte[]>, Action<Exception>, TimeSpan?)` — Reads input registers as raw bytes from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of registers to read.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsShort(int, ushort, ushort, IActorDispatcher, Action<short[]>, Action<Exception>, ByteOrder, TimeSpan?)` — Reads input registers as signed 16-bit integers from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of registers to read.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsUShort(int, ushort, ushort, IActorDispatcher, Action<ushort[]>, Action<Exception>, ByteOrder, TimeSpan?)` — Reads input registers as unsigned 16-bit integers from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of registers to read.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsInt(int, ushort, uint, IActorDispatcher, Action<int[]>, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Reads input registers as signed 32-bit integers from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 32-bit integers to read.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsUInt(int, ushort, uint, IActorDispatcher, Action<uint[]>, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Reads input registers as unsigned 32-bit integers from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 32-bit integers to read.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsFloat(int, ushort, uint, IActorDispatcher, Action<float[]>, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Reads input registers as 32-bit floating-point numbers from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 32-bit floating-point numbers to read.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsLong(int, ushort, uint, IActorDispatcher, Action<long[]>, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Reads input registers as signed 64-bit integers from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 64-bit integers to read.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsULong(int, ushort, uint, IActorDispatcher, Action<ulong[]>, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Reads input registers as unsigned 64-bit integers from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 64-bit integers to read.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsDouble(int, ushort, uint, IActorDispatcher, Action<double[]>, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Reads input registers as 64-bit floating-point numbers from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 64-bit floating-point numbers to read.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsString(int, ushort, ushort, IActorDispatcher, Action<string>, Action<Exception>, TextEncoding, TimeSpan?)` — Reads input registers as a string from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of registers to read.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `textEncoding`: The text encoding to use for decoding the string. Default is `Ascii`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersRaw(int, ushort, ushort, IActorDispatcher, Action<byte[]>, Action<Exception>, TimeSpan?)` — Reads holding registers as raw bytes from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of registers to read.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsShort(int, ushort, ushort, IActorDispatcher, Action<short[]>, Action<Exception>, ByteOrder, TimeSpan?)` — Reads holding registers as signed 16-bit integers from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of registers to read.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsUShort(int, ushort, ushort, IActorDispatcher, Action<ushort[]>, Action<Exception>, ByteOrder, TimeSpan?)` — Reads holding registers as unsigned 16-bit integers from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of registers to read.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsInt(int, ushort, uint, IActorDispatcher, Action<int[]>, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Reads holding registers as signed 32-bit integers from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 32-bit integers to read.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsUInt(int, ushort, uint, IActorDispatcher, Action<uint[]>, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Reads holding registers as unsigned 32-bit integers from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 32-bit integers to read.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsFloat(int, ushort, uint, IActorDispatcher, Action<float[]>, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Reads holding registers as 32-bit floating-point numbers from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 32-bit floating-point numbers to read.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsLong(int, ushort, uint, IActorDispatcher, Action<long[]>, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Reads holding registers as signed 64-bit integers from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 64-bit integers to read.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsULong(int, ushort, uint, IActorDispatcher, Action<ulong[]>, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Reads holding registers as unsigned 64-bit integers from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 64-bit integers to read.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsDouble(int, ushort, uint, IActorDispatcher, Action<double[]>, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Reads holding registers as 64-bit floating-point numbers from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 64-bit floating-point numbers to read.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsString(int, ushort, ushort, IActorDispatcher, Action<string>, Action<Exception>, TextEncoding, TimeSpan?)` — Reads holding registers as a string from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of registers to read.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `textEncoding`: The text encoding to use for decoding the string. Default is `Ascii`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteSingleHoldingRegister(int, ushort, short, IActorDispatcher, Action, Action<Exception>, ByteOrder, TimeSpan?)` — Writes a single holding register as a signed 16-bit integer to a Modbus device (Function Code 6).
  - `unitIdentifier`: The unit identifier (slave address).
  - `registerAddress`: The address of the register to write.
  - `value`: The value to write to the register.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteSingleHoldingRegister(int, ushort, ushort, IActorDispatcher, Action, Action<Exception>, ByteOrder, TimeSpan?)` — Writes a single holding register as an unsigned 16-bit integer to a Modbus device (Function Code 6).
  - `unitIdentifier`: The unit identifier (slave address).
  - `registerAddress`: The address of the register to write.
  - `value`: The value to write to the register.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersRaw(int, ushort, byte[], IActorDispatcher, Action, Action<Exception>, TimeSpan?)` — Writes multiple holding registers as raw bytes to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The raw byte values to write to the registers.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsShort(int, ushort, short[], IActorDispatcher, Action, Action<Exception>, ByteOrder, TimeSpan?)` — Writes multiple holding registers as signed 16-bit integers to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the registers.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsUShort(int, ushort, ushort[], IActorDispatcher, Action, Action<Exception>, ByteOrder, TimeSpan?)` — Writes multiple holding registers as unsigned 16-bit integers to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the registers.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsInt(int, ushort, int[], IActorDispatcher, Action, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Writes multiple holding registers as signed 32-bit integers to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the registers.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `wordOrder`: The word order to write the data in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsUInt(int, ushort, uint[], IActorDispatcher, Action, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Writes multiple holding registers as unsigned 32-bit integers to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the registers.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `wordOrder`: The word order to write the data in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsFloat(int, ushort, float[], IActorDispatcher, Action, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Writes multiple holding registers as 32-bit floating-point numbers to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the registers.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `wordOrder`: The word order to write the data in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsLong(int, ushort, long[], IActorDispatcher, Action, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Writes multiple holding registers as signed 64-bit integers to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the registers.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `wordOrder`: The word order to write the data in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsULong(int, ushort, ulong[], IActorDispatcher, Action, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Writes multiple holding registers as unsigned 64-bit integers to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the registers.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `wordOrder`: The word order to write the data in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsDouble(int, ushort, double[], IActorDispatcher, Action, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Writes multiple holding registers as 64-bit floating-point numbers to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the registers.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `wordOrder`: The word order to write the data in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsString(int, ushort, string, IActorDispatcher, Action, Action<Exception>, TextEncoding, TimeSpan?)` — Writes multiple holding registers as a string to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `value`: The string value to write to the registers.
  - `dispatcher`: The dispatcher that will invoke the callbacks. Pass the logic block that should handle the callbacks (typically `this` when calling from within a logic block).
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see . Errors are always logged, regardless of whether an error callback is specified.
  - `textEncoding`: The text encoding to use for encoding the string. Default is `Ascii`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.

---

### ILogicBlockModbusTcpClientFactory

Factory for creating instances of `ILogicBlockModbusTcpClient`.

**Methods:**

- `Create` — Creates a new instance of `ILogicBlockModbusTcpClient`.

---

## Dale.Sdk.Modbus.Tcp.Client.Request

### QueueOverflowPolicy

Defines the behavior when the request queue is full.

**Fields/Values:**

- `DropOldest` — Drops the oldest request in the queue when a new request is enqueued.
- `DropNewest` — Drops the newest request in the queue (not the one being enqueued) when a new request is enqueued.
- `RejectNew` — Rejects the new request being enqueued, invoking its error callback immediately.

---

### RequestDroppedException

Exception thrown when a request is dropped from the queue. This occurs when the queue is full and the overflow policy rejects the request, or when attempting to enqueue a request after the queue has been disposed.

**Properties:**

- `RequestName` — Gets the name of the dropped request.

**Methods:**

- *Constructor* — Initializes a new instance of the `RequestDroppedException` class.
  - `requestName`: The name of the request that was dropped.
  - `reason`: The reason the request was dropped (e.g., "queue full", "queue disposed").

---

## Dale.Sdk.TestKit

### Constants

Provides default constant values for logic block test setup.

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

Test-friendly minimal actor context that records messages sent by the logic block. Use the provided query/assertion helpers to inspect recorded messages. testContext.VerifyServicePropertyChanged(lb => lb.Power, value => Assert.AreEqual(3.5, value));

**Methods:**

- `VerifySendCommand<T>(InterfaceId?, Action<T>, Times?)` — Assert that a SendCommand call was made with the given target and message. testContext.VerifySendCommand&lt;PingRequest&gt;(mappedPong, msg => Assert.AreEqual(42, msg.Value));
- `VerifySendRequest<T>(InterfaceId?, Action<T>, Times?)` — Assert that a SendRequest call was made with the given target and message. testContext.VerifySendRequest&lt;PingRequest&gt;(mappedPong, msg => Assert.AreEqual(42, msg.Value));
- `VerifySendStateUpdate<T>(Action<T>, Times?)` — Assert that a SendStateUpdate call was made with the given message. testContext.VerifySendStateUpdate&lt;MyState&gt;(msg => Assert.AreEqual(expected, msg.Value));
- `VerifyServicePropertyChanged<T>(Expression<Func<T, T>>, Action<T>, Times?)` — Assert that a service property change was recorded for the specified property. testContext.VerifyServicePropertyChanged(lb => lb.Power, value => Assert.AreEqual(3.5, value));
- `VerifyServiceMeasuringPointChanged<T>(Expression<Func<T, T>>, Action<T>, Times?)` — Assert that a service measuring point change was recorded for the specified property. testContext.VerifyServiceMeasuringPointChanged(lb => lb.Temperature, value => Assert.AreEqual(22.5, value));
- `GetContractMessages<T>(string)` — Returns all recorded contract messages of the specified data type, optionally filtered by contract identifier. Useful for TestKit extensions that need to extract pending requests for response simulation.
- `ClearRecordedMessages` — Clear recorded messages, e.g. if the test arranging phase triggers messages, that should be ignored.
- `FlushPendingActions` — Execute all actions queued by . In the real actor system these run after a delay; in tests they are captured and executed on demand so you can feed responses between the scheduling and the execution. sut.OnTimer(); // sends requests, queues Calculate sut.HandleResponse(id, response); // feed response data testContext.FlushPendingActions(); // now Calculate() runs

---

### LogicBlockTestContextBuilder

Fluent test builder to initialize LogicBlock instances for unit tests.

**Methods:**

- `WithLogicInterfaceMapping<T>(Func<T, T>, InterfaceId)` — Adds a mapping to another logic block using a specific (self or delegated) implementation of the interface.
- `WithLogicInterfaceMapping<T>(InterfaceId)` — Adds a mapping to another logic block using the logic block's own implementation of the interface.
- `WithPersistentValue<T>(Expression<Func<T, T>>, T)` — Registers a persistent value to be restored after initialization, simulating a restart with previously saved state. var testContext = block.CreateTestContext() .WithPersistentValue(lb => lb.MaxPower, 42.0) .WithPersistentValue(lb => lb.Mode, OperatingMode.Manual) .Build();
- `WithServices(Action<IServiceCollection>)` — Registers additional DI services for logic block initialization. Use this to register services required by contract types (e.g. Modbus RTU).
- `WithoutAutoStart` — Prevents the logic block from being started after initialization. By default, the builder starts the block so that service property changes produce messages. Use this when testing initialization or pre-start behavior.
- `Build` — Initialize the logic block and apply any linked interfaces mapping. After this returns the logic block's Configure(...), Ready(), and Starting() will have been executed and the block is ready to process messages. Use to skip starting.
- `InitializeLogicBlock` — Sends the InitializeLogicBlock message to the logic block to initialize it. Auto-discovers service identifiers from [Service] attributes so that service property and measuring point changes are routed correctly when the block is started.
- `RegisterContractAssemblyServices(IServiceCollection)` — Auto-discovers contract properties on the logic block, finds `IConfigureServices` implementations in each contract assembly, and invokes them. Mirrors what the full Dale runtime does with shared assembly discovery.
- `DiscoverContractIds` — Discovers contract identifiers from properties whose type has [ServiceProviderContractType]. Generates a LogicBlockContractId for each so that contracts are fully initialized in tests.
- `DiscoverServiceIds` — Discovers service identifiers from [Service] attributes on the logic block class and its properties.
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

## Dale.Sdk.Core

### CardinalityType

Specifies the cardinality of a dependency or contract binding.

**Fields/Values:**

- `Mandatory` — The binding is required and must be fulfilled.
- `Optional` — The binding is optional and may be left unbound.
- `Multiple` — Multiple bindings are allowed.

---

### CategoryAttribute

Classifies a service property or measuring point into a semantic category.

---

### CommandAttribute

Marks a message as a command. The message is sent to a specific linked interface instance. The receiving side will not get the identifier of the sender.

---

### ContractAttribute

Marks a class as a contract container grouping related messages and interfaces.

---

### ContractDirection

Defines the directional relationship between the two sides of a contract.

**Fields/Values:**

- `None` — No specific direction. No arrows between "Between" and "And". No specific parent-child relationship.
- `Bidirectional` — Bidirectional arrows between "Between" and "And". No specific parent-child relationship.
- `BetweenToAnd` — Arrow from "Between" to "And". In a tree, "Between" would be the parent and "And" the child.
- `AndToBetween` — Arrow from "And" to "Between". In a tree, "And" would be the parent and "Between" the child.

---

### DependencyCreationType

Specifies whether a dependency must already exist or can be created on demand.

**Fields/Values:**

- `MustExist` — The dependency must already exist.
- `AllowCreateNew` — The dependency is created on demand if it does not exist.

---

### DisplayAttribute

Provides display metadata for a service property or measuring point. DisplayName takes precedence over DefaultName from ServicePropertyAttribute.

---

### EnumValueInfoAttribute

Provides display metadata for an individual enum value. Can be extended with additional properties as needed (e.g. descriptions, tags).

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

### ImportanceAttribute

Declares the UI importance of a service property or measuring point. Primary/Secondary values are shown on dashboard tiles.

---

### InterfaceAttribute

Declare interface configuration when implementing a function interface. Allows to set some annotations with the optional parameters.

**Methods:**

- *Constructor* — Constructor for class-level usage with specific interface targeting.

---

### InterfaceDependencyAttribute

Declare a dependency on an interface, meaning that the logic block requires an implementation of the specified interface. Can be applied to properties (legacy) or classes (new approach).

**Methods:**

- *Constructor* — Constructor for class-level usage with specific interface targeting.

---

### LogicBlockBase

Base class for all logic blocks. Provides actor lifecycle, service binding, persistence, and timer support.

**Methods:**

- `Configure(ILogicBlockConfigurationBuilder)` — Can be overridden to provide custom configurationBuilder logic, e.g. creating interfaces, contracts, services and timers programmatically with full control
- `Ready` — Called when the logic block has been configured and is ready to run. this is the place to attach event handlers to contract or interface elements
- `Starting` — Called when the logic block is started (after it has been initialized/ready)
- `Stopping` — Called when the logic block is stopped (before it gets removed)
- `InvokeActionMessage.#ctor(Action)` — Represents a message that contains an action to be executed in the context of the actor. This is not serializable, therefore only usable locally, usually within one actor

---

### LogicBlockInfoAttribute

Provides block-level display metadata for a logic block class.

**Properties:**

- `Icon` — Icon identifier used by the frontend to render a block icon. Use Remixicon names without the "ri-" prefix (e.g. "charging-pile-line", "battery-2-line"). See https://remixicon.com for available icons. The frontend will render a default fallback icon for unknown or missing values.

---

### PersistentAttribute

Controls persistence behavior for properties. - On writable service properties: Use [Persistent(Exclude = true)] to opt-out - On other properties: Use [Persistent] to opt-in

**Properties:**

- `Exclude` — Set to true to exclude a writable service property from persistence

---

### PropertyCategory

Semantic category for a service property or measuring point.

**Fields/Values:**

- `Status` — Reflects current operational state.
- `Configuration` — A user-configurable setting.
- `Action` — A triggerable action.
- `Metric` — A measured or calculated value.

---

### RequestResponseAttribute

Marks a message as a request message. The message is sent to a specific linked interface instance. The receiving/responding side will need to return the response message. The responding side will not get the identifier of the sender. The requesting side will receive the identifier of the responder with the response.

---

### ServiceAttribute

Declare a service on a logic block or on a property of a logic block. On a logic block, the Service attribute can be omitted (then class name + all implemented service interfaces are used) On a property the service attribute can be omitted if the property type implements service interfaces. Identifier can be empty (then class or property name is used)

---

### ServiceInterfaceAttribute

Declare a service interface as a C# interface. Use the ServiceProperty and ServiceMeasuringPoint attributes on properties.

---

### ServiceMeasuringPointAttribute

Define a measuring point on a Service interface or logic block property. The optional parameters are used as annotations in service description

---

### ServicePropertyAttribute

Describe a service property on a service interface or logic block property The optional parameters are used as annotations in service description

---

### ServiceProviderContractAttribute

Declares a service provider contract on a logic block property with optional metadata. If no identifier is provided, the property name will be used. The contract type is automatically determined from the property type.

---

### ServiceRelationAttribute

Defines a relation to another service interface. A matching declaration (same RelationType, opposite Direction) must exist on the other service interface.

**Properties:**

- `RelationType` — The identifier of the relation. Must be the same for the inwards and outwards side of the declaration.
- `Direction` — Side of the relation this service interface represents. (start or end of the arrow)
- `FunctionInterfaceType` — Function interface type to match with the relation.

---

### ServiceRelationDirection

Specifies the direction of a service relation (inwards or outwards).

**Fields/Values:**

- `Inwards` — This service is the target (end) of the relation.
- `Outwards` — This service is the source (start) of the relation.

---

### SharingType

Specifies whether a dependency or contract binding is shared or exclusive.

**Fields/Values:**

- `Shared` — The binding can be shared with other consumers.
- `Exclusive` — The binding is exclusive to a single consumer.

---

### StateUpdateAttribute

Marks a message as a state update. The message is sent to all linked interfaces. The receiving side will get the identifier of the sender

---

### StatusIndicatorAttribute

Marks a property as an operational status indicator. The property should be an enum type where each value has a `StatusSeverityAttribute`.

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

### StatusSeverityAttribute

Declares the UI severity for an enum value used with `StatusIndicatorAttribute`. Use `EnumValueInfoAttribute` to provide a display name.

---

### TimerAttribute

Declare a timer method that should be called at regular intervals. If the identifier is not set, the method name is used.

---

## Dale.Sdk.Utils

### IDateTimeProvider

Provides an abstraction for date and time operations.

**Properties:**

- `UtcNow` — Gets the current date and time in UTC.

**Methods:**

- `Add(DateTime, TimeSpan)` — Adds the specified `TimeSpan` to the specified `DateTime`.
  - `timestamp`: The date and time to add to.
  - `duration`: The time span to add.
- `GetElapsedTime(DateTime)` — Gets the elapsed time since the specified `DateTime`.
  - `since`: The date and time to measure elapsed time from.

---

## Dale.Sdk.Abstractions

### ServiceProviderHandlerBase

Base class for all service provider handler actors (DI, DO, AI, AO, Modbus, custom). Owns the actor lifecycle (registration, contract linking) and provides helpers for common operations.

> is implemented explicitly so subclasses cannot override it. Messages are routed to: — for MQTT messages from the broker — for contract messages from logic blocks Subclasses can schedule delayed callbacks using , which are dispatched transparently by the base class (same pattern as `LogicBlockBase`).

**Properties:**

- `ActorContext` — The current actor context. Set on each message dispatch. Available for use in callbacks.
- `Logger` — Logger available to subclasses.
- `ContractLogicBlockActorReferences` — The contract-to-logic-block actor mappings, set during the linking phase.

**Methods:**

- *Constructor* — Initializes a new instance of the handler.
- `Dale#Sdk#Abstractions#IActorReceiver#HandleMessageAsync(object, IActorContext)` — *(no description)*
- `GetMqttRegistration` — Returns the MQTT routing key and action path suffixes for this handler. The base class prepends the service provider wildcard prefix (`+/+/+`) to each action path to form the full subscription topics.
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

- `ServiceProviderTopicPrefix` — The wildcard prefix prepended to all subscription action paths. Matches the `{serviceProviderIdentifier}/{service}/{contract}` routing prefix in the topic structure. Centralized here to enforce the convention and enable programmatic broker ACL configuration.

---

## Dale.Sdk.Configuration.Contract

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

## Dale.Sdk.Mqtt

### RegistrationSecret

Generates and persists registration secrets for service providers. The secret is used as an MQTT topic segment during the registration handshake.

**Methods:**

- `Generate` — Generates a new registration secret suitable for use as an MQTT topic segment. Returns a 32-character lowercase hex string (UUID v4 without hyphens).
- `LoadOrCreate(string)` — Loads an existing secret from , or generates a new one and persists it. Subsequent calls with the same path return the same secret.
  - `filePath`: The file path to read from or write to.

---
