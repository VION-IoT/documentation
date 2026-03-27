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

## Dale.Sdk.Modbus.Rtu.TestKit

### IModbusRtuExtensions

Extension methods on `IModbusRtu` for simulating Modbus responses in tests.

**Methods:**

- `SimulateReadResponse<T>(IModbusRtu, LogicBlockTestContext<T>, Byte[], ushort?)` — Simulates a successful read response by invoking the pending request's callback with the given data. The data bytes are processed through the same callback chain as in production (SwapBytes, CastFromBytes, etc.).
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

- `FromFloats(Single[])` — Converts float values to big-endian bytes (4 bytes each).
- `FromShorts(Int16[])` — Converts short values to big-endian bytes (2 bytes each).
- `FromUShorts(UInt16[])` — Converts ushort values to big-endian bytes (2 bytes each).
- `FromInts(Int32[])` — Converts int values to big-endian bytes (4 bytes each).
- `FromDoubles(Double[])` — Converts double values to big-endian bytes (8 bytes each).
- `FromBools(Boolean[])` — Packs boolean values into bytes using Modbus coil/discrete input bit packing. Each byte holds up to 8 coils, LSB first within each byte.

---

## Dale.Sdk.Modbus.Rtu

### IModbusRtu

Provides Modbus RTU read and write operations.

> Initially disabled (`IsEnabled` is `false`). When disabled, all operations are skipped. All instances share a single `ModbusRtuHandler`. Requests from all `IModbusRtu` instances are processed sequentially in the order they are received, and all instances share a maximum pending request limit of `MaxPendingRequests`. The following exceptions may be passed to the error callback on any read or write operation: `InvalidUnitIdentifierException` — The specified unit identifier is less than 0 or greater than 255. `PendingRequestsLimitReachedException` — There is a limit on how many requests can be pending at the same time. When this limit is reached, new requests are rejected immediately. — No HAL element mapping was found for the associated IO ID. `OperationTimeoutException` — The operation did not complete within the specified timeout. Every second, pending requests are checked for expiration and immediately completed if expired. `ModbusException` — An error was returned by the Modbus device. The following exceptions apply only to specific operations: `InvalidBitQuantityException` — Fewer coils or discrete inputs were returned than were requested. `InvalidCountException` — The resulting register quantity exceeds the maximum of 65535 (e.g., requesting 17000 64-bit values requires 68000 registers). `ModbusResponseAlignmentException` — The number of bytes received does not match the expected amount for the requested registers. For example, reading 2 registers expects 4 bytes; if 5 bytes are returned, this exception is thrown.

**Properties:**

- `IsEnabled` — Gets or sets a value indicating whether operations are enabled.
- `DefaultOperationTimeout` — Gets or sets the default timeout for Modbus operations. Default is 5 seconds.

**Methods:**

- `ReadDiscreteInputs(int, ushort, ushort, Action<Boolean[]>, Action<Exception>, TimeSpan?)` — Reads discrete inputs from a Modbus device (Function Code 2).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of discrete inputs to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadCoils(int, ushort, ushort, Action<Boolean[]>, Action<Exception>, TimeSpan?)` — Reads coils from a Modbus device (Function Code 1).
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
- `WriteMultipleCoils(int, ushort, Boolean[], Action, Action<Exception>, TimeSpan?)` — Writes multiple coils to a Modbus device (Function Code 15).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the coils.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersRaw(int, ushort, ushort, Action<Byte[]>, Action<Exception>, TimeSpan?)` — Reads input registers as raw bytes from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of registers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsShort(int, ushort, ushort, Action<Int16[]>, Action<Exception>, ByteOrder, TimeSpan?)` — Reads input registers as signed 16-bit integers from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of registers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsUShort(int, ushort, ushort, Action<UInt16[]>, Action<Exception>, ByteOrder, TimeSpan?)` — Reads input registers as unsigned 16-bit integers from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of registers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsInt(int, ushort, uint, Action<Int32[]>, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Reads input registers as signed 32-bit integers from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 32-bit integers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsUInt(int, ushort, uint, Action<UInt32[]>, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Reads input registers as unsigned 32-bit integers from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 32-bit integers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsFloat(int, ushort, uint, Action<Single[]>, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Reads input registers as 32-bit floating-point numbers from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 32-bit floating-point numbers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsLong(int, ushort, uint, Action<Int64[]>, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Reads input registers as signed 64-bit integers from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 64-bit integers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsULong(int, ushort, uint, Action<UInt64[]>, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Reads input registers as unsigned 64-bit integers from a Modbus device (Function Code 4).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 64-bit integers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadInputRegistersAsDouble(int, ushort, uint, Action<Double[]>, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Reads input registers as 64-bit floating-point numbers from a Modbus device (Function Code 4).
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
- `ReadHoldingRegistersRaw(int, ushort, ushort, Action<Byte[]>, Action<Exception>, TimeSpan?)` — Reads holding registers as raw bytes from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of registers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsShort(int, ushort, ushort, Action<Int16[]>, Action<Exception>, ByteOrder, TimeSpan?)` — Reads holding registers as signed 16-bit integers from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of registers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsUShort(int, ushort, ushort, Action<UInt16[]>, Action<Exception>, ByteOrder, TimeSpan?)` — Reads holding registers as unsigned 16-bit integers from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `quantity`: The number of registers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsInt(int, ushort, uint, Action<Int32[]>, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Reads holding registers as signed 32-bit integers from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 32-bit integers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsUInt(int, ushort, uint, Action<UInt32[]>, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Reads holding registers as unsigned 32-bit integers from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 32-bit integers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsFloat(int, ushort, uint, Action<Single[]>, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Reads holding registers as 32-bit floating-point numbers from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 32-bit floating-point numbers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsLong(int, ushort, uint, Action<Int64[]>, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Reads holding registers as signed 64-bit integers from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 64-bit integers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsULong(int, ushort, uint, Action<UInt64[]>, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Reads holding registers as unsigned 64-bit integers from a Modbus device (Function Code 3).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to read from.
  - `count`: The number of 64-bit integers to read.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order the data is received in. Default is `MsbToLsb`.
  - `wordOrder`: The word order the data is received in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `ReadHoldingRegistersAsDouble(int, ushort, uint, Action<Double[]>, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Reads holding registers as 64-bit floating-point numbers from a Modbus device (Function Code 3).
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
- `WriteMultipleHoldingRegistersRaw(int, ushort, Byte[], Action, Action<Exception>, TimeSpan?)` — Writes multiple holding registers as raw bytes to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The raw byte values to write to the registers.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsShort(int, ushort, Int16[], Action, Action<Exception>, ByteOrder, TimeSpan?)` — Writes multiple holding registers as signed 16-bit integers to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the registers.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsUShort(int, ushort, UInt16[], Action, Action<Exception>, ByteOrder, TimeSpan?)` — Writes multiple holding registers as unsigned 16-bit integers to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the registers.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsInt(int, ushort, Int32[], Action, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Writes multiple holding registers as signed 32-bit integers to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the registers.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `wordOrder`: The word order to write the data in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsUInt(int, ushort, UInt32[], Action, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Writes multiple holding registers as unsigned 32-bit integers to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the registers.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `wordOrder`: The word order to write the data in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsFloat(int, ushort, Single[], Action, Action<Exception>, ByteOrder, WordOrder32, TimeSpan?)` — Writes multiple holding registers as 32-bit floating-point numbers to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the registers.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `wordOrder`: The word order to write the data in. Default is `MswToLsw`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsLong(int, ushort, Int64[], Action, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Writes multiple holding registers as signed 64-bit integers to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the registers.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `wordOrder`: The word order to write the data in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsULong(int, ushort, UInt64[], Action, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Writes multiple holding registers as unsigned 64-bit integers to a Modbus device (Function Code 16).
  - `unitIdentifier`: The unit identifier (slave address).
  - `startingAddress`: The starting address to write to.
  - `values`: The values to write to the registers.
  - `successCallback`: The callback invoked when the operation succeeds.
  - `errorCallback`: The callback invoked when the operation fails. For common exceptions that may be passed to this callback, see the remarks on `IModbusRtu`. Errors are always logged, regardless of whether an error callback is specified.
  - `byteOrder`: The byte order to write the data in. Default is `MsbToLsb`.
  - `wordOrder`: The word order to write the data in. Default is `ABCD`.
  - `operationTimeout`: The maximum time allowed for the Modbus operation before it is canceled. If `null`, `DefaultOperationTimeout` is used. See `DefaultOperationTimeout` for details on what the timeout covers.
- `WriteMultipleHoldingRegistersAsDouble(int, ushort, Double[], Action, Action<Exception>, ByteOrder, WordOrder64, TimeSpan?)` — Writes multiple holding registers as 64-bit floating-point numbers to a Modbus device (Function Code 16).
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

**Methods:**

- `InitializeForTest<T>(T)` — Initializes the given logic block for testing, returning a typed test context.
- `CreateTestContext<T>(T)` — Creates a test context builder for the given logic block to allow test context customization. Call Build() at the end to get the test context.

---

### LogicBlockTestContext

---

### LogicBlockTestContextBuilder

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
- `FireTimer<T>(T, Action<``0}>)` — Fires a timer callback using a method selector expression for type-safety. The method must be accessible from the test. block.FireTimer((MyBlock lb) => lb.OnTimer());
- `GetTimerInterval(LogicBlockBase, string)` — Returns the configured interval for the specified timer.
- `GetTimerInterval<T>(T, Action<``0}>)` — Returns the configured interval for the specified timer using a method selector expression. var interval = block.GetTimerInterval((MyBlock lb) => lb.OnTimer());

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

---

### SharingType

Specifies whether a dependency or contract binding is shared or exclusive.

---

### StateUpdateAttribute

Marks a message as a state update. The message is sent to all linked interfaces. The receiving side will get the identifier of the sender

---

### StatusIndicatorAttribute

Marks a property as an operational status indicator. The property should be an enum type where each value has a `StatusSeverityAttribute`.

---

### StatusSeverity

Severity level for status indicator enum values.

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
