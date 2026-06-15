---
title: SDK API Reference
description: Auto-generated API reference for types marked with [PublicApi].
---

# Vion Dale SDK API Reference

> Auto-generated from source code. Types marked with `[PublicApi]`.

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

## Vion.Dale.Sdk.Modbus.Rtu

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

> The TCP connection is established lazily when the first read or write operation is executed and is maintained for subsequent operations. The client uses a default port of 502 (standard Modbus TCP port) and a connection timeout of 3 seconds. These can be changed using `Port` and `ConnectionTimeout` respectively. The IP address must be set using `IpAddress` before any read or write operations can be performed. All read and write operations are enqueued to an internal request queue and processed sequentially one at a time. This sequential processing is required because the underlying Modbus TCP client library does not support concurrent operations on a single TCP connection. The logic block itself is not blocked while operations are dequeued or executing - all operations are non-blocking with results delivered via callbacks. The request queue is created the first time the client is enabled via `IsEnabled`. Queue settings (`QueueCapacity` and `QueueOverflowPolicy`) must be configured before enabling the client for the first time. Once the queue is created, these settings cannot be changed. The client should be disposed when no longer needed to properly close the underlying TCP connection and release associated resources. When the client is disposed, the internal request queue is closed and no new requests will be accepted. Any read or write operations invoked after disposal will be rejected. If an error callback is specified, it will be invoked with a `RequestDroppedException`. All enqueued requests and any currently executing request are canceled. If an error callback is specified for these operations, it will be invoked with an `OperationCanceledException`. For scenarios requiring concurrent operations, additional client instances can be created via . Each client instance maintains its own TCP connection and request queue, enabling parallel communication with the same or different Modbus servers. The client is initially disabled (`IsEnabled` is `false`). When disabled, all read and write operations are skipped. For common exceptions that may be passed to error callbacks, see the documentation for `IModbusTcpClientWrapper`.

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

## Vion.Dale.Sdk.Modbus.Tcp.Client.Request

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

## Vion.Dale.Sdk.Modbus.Tcp.Server.LogicBlock

### ILogicBlockModbusTcpServer

Hosts a Modbus TCP server (slave role) for logic blocks: external Modbus clients connect to the logic block and read or write its register map.

> The server is configured via properties and gated by `IsEnabled`, exactly like the Modbus TCP client: configure while disabled, then enable. Configuration properties can only be changed while the server is disabled — to reconfigure, disable the server first, update the settings, then re-enable it (a port or address change is a rebind). All register access happens inside callbacks, which execute synchronously on the caller's thread while holding the server lock — client requests are served from the register buffers on background threads, and the lock makes each callback atomic with respect to them. No events or callbacks are ever delivered to the logic block from background threads. The block chooses its own cadence (a timer, a reactive trigger) and may use several independent cadences; each `Sync` call is atomic on its own. The register buffers exist independently of the listener: `Sync` also works while the server is disabled, so a block can seed default values before it starts listening. Buffer contents survive disable/enable cycles. The server accepts requests for any unit identifier and echoes the request's unit identifier in the response — the endpoint behavior the Modbus TCP specification intends for directly connected servers. Client requests outside the declared register-map extents are answered with an IllegalDataAddress Modbus exception. The server should be disposed when no longer needed. Disposal stops the listener and releases all resources; benign teardown races of the underlying server library are caught and logged, never thrown.

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

**Properties:**

- `Name` — Human-readable name. Falls back to the C# class name.
- `Icon` — Icon identifier. Use Remixicon names without the "ri-" prefix (e.g. "charging-pile-line", "battery-2-line"). See https://remixicon.com. Dashboard renders a default fallback icon for unknown / missing values.
- `Groups` — Order in which the dashboard renders group sections in the full block view. Values are the same string keys as `Group` — well-known constants from `PropertyGroup` and/or integrator-supplied custom keys. Groups not listed appear last in the platform default order. When unset, defaults to [Alarm, Status, Metric, Configuration, Diagnostics, Identity, None].

---

### LogicBlockBase

Base class for all logic blocks. Provides actor lifecycle, service binding, persistence, and timer support.

**Methods:**

- `Ready` — Called once after the block has been configured (attribute-driven bindings are in place) and is ready to run, but BEFORE the runtime has restored persisted `ServicePropertyAttribute` values, registered per-contract sender instances, or fired . The right place to attach event handlers to contract / interface elements and to do other block-local one-time setup that doesn't depend on SDK runtime state.
- `Starting` — Called once after and after the runtime has restored persisted `ServicePropertyAttribute` values and registered per-contract sender instances. The right place for setup that depends on SDK runtime state: reading persisted property values, enumerating contract links via `GetLinkedXxx()`, scheduling first periodic ticks, and emitting initial cross-block contract state-updates.
- `Stopping` — Called once before the block is removed, after the runtime processes a stop request. The right place to release resources acquired during the block's lifetime: detach event handlers attached in , cancel in-flight operations, dispose injected clients, flush pending I/O.
- `Configure(ILogicBlockConfigurationBuilder)` — Binds this logic block's interfaces, contracts, services and timers from their declarative attributes. Internal infrastructure invoked by the runtime; not an extension point.
- `InvokeActionMessage.#ctor(Action)` — Represents a message that contains an action to be executed in the context of the actor. This is not serializable, therefore only usable locally, usually within one actor

---

### LogicBlockContractAttribute

Marks a class as a contract container grouping messages (`CommandAttribute`, `StateUpdateAttribute`, `RequestResponseAttribute`) exchanged between two LogicBlock interfaces.

---

### LogicBlockInterfaceBindingAttribute

Metadata for an implementation of a logic-block interface. Applies to a class (when the LB implements the interface directly) OR a property (when the property's value implements the interface, e.g. an inner ChargingPoint instance). Both cases are "metadata for an existing interface relationship". AllowMultiple = true to handle properties whose type implements multiple interfaces (each `LogicBlockInterfaceBindingAttribute` targets one interface via `ForInterface`).

**Properties:**

- `ForInterface` — The interface this binding metadata applies to.
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

- `DisplayName` — Override the displayed label. Falls back to schema.title (primitives) or the C# property name. For enum-/struct-typed properties (where schema.title is identity-bearing), this is the only way to set a UI label distinct from the CLR type name.
- `Group` — Group key. The dashboard renders all properties with the same Group key in one section. Well-known keys are constants in `PropertyGroup`; integrators may supply their own string keys (e.g. "acme.powertrain") which the dashboard renders as a generic section with the raw key as the header. Section order is set by [LogicBlock(Groups = ...)]; default order is the platform-defined order. Within-group order is by `Order`.
- `Order` — Sort hint within a group. Ascending; properties without an explicit value sort between explicit values, stable-by-default (base-class first, declaration order within each class). Used for finer ordering than the group level. `MinValue` means "unset" (attribute parameter types can't be nullable; `PropertyMetadataBuilder` converts the sentinel to null in the codec-side `Presentation.Order`).
- `Importance` — Tile composition rank. Primary/Secondary surface on the auto-generated LogicBlock tile; Normal renders in detail views only; Hidden suppresses the property entirely.
- `StatusIndicator` — Marks this property as an operational status indicator for the LogicBlock. A block can carry multiple — distinct status dimensions (e.g. operating mode + connection state + activity status). Must be enum-typed (or nullable enum). Per-member severity comes from [Severity]; per-member display labels from [EnumLabel].
- `Decimals` — Display precision for numeric values. `MinValue` (default) means "unset" and uses sensible per-type defaults (attribute parameter types can't be nullable; `PropertyMetadataBuilder` converts the sentinel to null in the codec-side `Presentation.Decimals`). Ignored for non-numeric schemas (analyzer warning DALE021).
- `UiHint` — Routing key for the dashboard's generic renderer and for custom widget templates. Open string; unrecognized values are silently ignored. Well-known platform values are constants in `UiHints`. The "statusIndicator" value is auto-emitted from `StatusIndicator` — don't set directly.
- `Format` — Format-token string for date / duration / numeric renderers. Type-orthogonal — a separate concern from `UiHint` (which selects the widget) and `Decimals` (which controls numeric precision). The renderer (dashboard / DevHost) consumes the value as a moment.js / day.js compatible format-token string when the property's CLR type is `DateTime` or `TimeSpan`. Two reserved sentinel values short-circuit the token interpreter: `"relative"` → auto-updating "3 minutes ago"-style date display `"humanize"` → humanized duration like "3 hours" Common tokens (see `Formats` for shortcuts): `"LLLL"` → "Wednesday, May 13, 2026 2:32 PM" (locale full + weekday) `"LLL"` → "May 13, 2026 2:32 PM" (locale long) `"YYYY-MM-DD HH:mm:ss"` → "2026-05-13 14:32:05" `"YYYY-MM-DD HH:mm:ss.SSS"` → with millisecond precision `"HH:mm:ss"` → "01:23:45" (typical for durations) Token reference: .

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

Define a measuring point on a service interface or logic block property. The optional properties become annotations in the introspection schema document.

**Properties:**

- `Description` — Long-form description for tooltips, search, and accessibility. Routes into `schema.annotations.description`. Independent of `Title`.
- `StringFormat` — Advisory JSON-Schema `format` for a `string` measuring point (e.g. `Ipv4`). Routes into `schema.format`; drives a specialized input + soft-validation in the dashboard / DevHost. Never enforced on the wire. String-only and not a type-kind format (`date-time` / `duration` / `uuid`) — see DALE033.
- `Kind` — Semantic classification of the measuring point's time-series shape — drives default chart rendering, aggregation, and storage strategy. Routes into `schema.annotations.x-kind`. Defaults to `Measurement` (instantaneous samples).

---

### ServicePropertyAttribute

Describe a service property on a service interface or logic block property. The optional properties become annotations in the introspection schema document.

**Properties:**

- `Description` — Long-form description for tooltips, search, and accessibility. Routes into `schema.annotations.description`. Independent of `Title`.
- `StringFormat` — Advisory JSON-Schema `format` for a `string` value (e.g. `Ipv4`). Routes into `schema.format`; drives a specialized input + soft-validation in the dashboard / DevHost. Never enforced on the wire. String-only and not a type-kind format (`date-time` / `duration` / `uuid`) — see DALE033.
- `WriteOnly` — Marks a writable property as a secret — clients see a redaction sentinel (`"***"`) on the publish-state channel instead of the actual value. Restricted to `string` / `string?` properties in v1. Routes into `schema.annotations.writeOnly`.
- `ReadOnly` — Marks the property as read-only on the wire even when the C# property has a public setter. Use this when a cross-assembly helper needs to assign the value (requires the public setter) but the cloud must not be able to SetPropertyValue it back. Routes into `schema.annotations.readOnly` — same wire flag that a private setter or a `[ServiceMeasuringPoint]` would set, so the dashboard groups it with metrics.

---

### ServiceProviderContractBindingAttribute

Binds a LogicBlock property to a hardware service-provider function (HAL: IAnalogOutput, IDigitalOutput, IModbusClient, …). The property type is the hardware contract; the attribute carries the identity / link-multiplicity metadata for the binding. Structurally the matched twin of `LogicBlockInterfaceBindingAttribute` — distinct only because the two are consumed by different binders (in-process actor link vs MQTT service-provider adapter).

**Properties:**

- `Multiplicity` — Consumer-side link multiplicity for this contract binding. Default `ZeroOrMore` (unconstrained — preserves the pre-multiplicity behaviour). Declared only; enforced downstream.

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

**Properties:**

- `StringFormat` — Advisory JSON-Schema `format` for a string field (e.g. `Ipv4`). Routes into the field's `schema.format`. String-only — see DALE033.

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
