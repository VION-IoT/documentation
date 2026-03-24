---
title: SDK API Reference
description: API reference for the Dale SDK public types.
---

# SDK API Reference

::: info Auto-Generated
This reference is generated from XML documentation comments in the Dale SDK source code.
Last generated: 2026-03-24
:::

## Attributes

| Type | Description |
|------|-------------|
| `CategoryAttribute` | Classifies a service property or measuring point into a semantic category. |
| `CommandAttribute` | Marks a message as a command. The message is sent to a specific linked interface instance. The receiving side will not get the identifier of the sender. |
| `ContractAttribute` | Marks a class as a contract container grouping related messages and interfaces. |
| `DaleSharedAssemblyAttribute` | Marks an assembly as shared across all plugins in the Dale runtime. When multiple plugins reference the same assembly (e.g. a contract extension library), the Dale plugin loader ensures only one copy is loaded and all plugins share the same instance. This prevents type identity conflicts in cross-plugin actor message routing. |
| `DisplayAttribute` | Provides display metadata for a service property or measuring point. DisplayName takes precedence over DefaultName from ServicePropertyAttribute. |
| `EnumValueInfoAttribute` | Provides display metadata for an individual enum value. Can be extended with additional properties as needed (e.g. descriptions, tags). |
| `ImportanceAttribute` | Declares the UI importance of a service property or measuring point. Primary/Secondary values are shown on dashboard tiles. |
| `InterfaceAttribute` | Declare interface configuration when implementing a function interface. Allows to set some annotations with the optional parameters. |
| `InterfaceDependencyAttribute` | Declare a dependency on an interface, meaning that the logic block requires an implementation of the specified interface. Can be applied to properties (legacy) or classes (new approach). |
| `LogicBlockInfoAttribute` | Provides block-level display metadata for a logic block class. |
| `PersistentAttribute` | Controls persistence behavior for properties. - On writable service properties: Use [Persistent(Exclude = true)] to opt-out - On other properties: Use [Persistent] to opt-in |
| `RequestResponseAttribute` | Marks a message as a request message. The message is sent to a specific linked interface instance. The receiving/responding side will need to return the response message. The responding side will not get the identifier of the sender. The requesting side will receive the identifier of the responder with the response. |
| `ServiceAttribute` | Declare a service on a logic block or on a property of a logic block. On a logic block, the Service attribute can be omitted (then class name + all implemented service interfaces are used) On a property the service attribute can be omitted if the property type implements service interfaces. Identifier can be empty (then class or property name is used) |
| `ServiceInterfaceAttribute` | Declare a service interface as a C# interface. Use the ServiceProperty and ServiceMeasuringPoint attributes on properties. |
| `ServiceMeasuringPointAttribute` | Define a measuring point on a Service interface or logic block property. The optional parameters are used as annotations in service description |
| `ServicePropertyAttribute` | Describe a service property on a service interface or logic block property The optional parameters are used as annotations in service description |
| `ServiceProviderContractAttribute` | Declares a service provider contract on a logic block property with optional metadata. If no identifier is provided, the property name will be used. The contract type is automatically determined from the property type. |
| `ServiceRelationAttribute` | Defines a relation to another service interface. A matching declaration (same RelationType, opposite Direction) must exist on the other service interface. |
| `StateUpdateAttribute` | Marks a message as a state update. The message is sent to all linked interfaces. The receiving side will get the identifier of the sender |
| `StatusIndicatorAttribute` | Marks a property as an operational status indicator. The property should be an enum type where each value has a `Dale.Sdk.Core.StatusSeverityAttribute`. |
| `StatusSeverityAttribute` | Declares the UI severity for an enum value used with `Dale.Sdk.Core.StatusIndicatorAttribute`. Use `Dale.Sdk.Core.EnumValueInfoAttribute` to provide a display name. |
| `TimerAttribute` | Declare a timer method that should be called at regular intervals. If the identifier is not set, the method name is used. |
| `UIHintAttribute` | Provides a widget hint for the UI to render a specialized control. Examples: "battery-gauge", "color-picker", "slider" |

## Interfaces

| Type | Description |
|------|-------------|
| `IConfigureServices` | Plugin assemblies must contain an implementation of this interface. The host calls it at startup do add plugin logic blocks and services to DI |
| `IDateTimeProvider` | Provides an abstraction for date and time operations. |
| `IHandleCommand`1` | Receives a command message from another logic block function |
| `IHandleRequest`2` | Receives a request message from another logic block function and returns a response message. |
| `IHandleResponse`1` | Receives a response message from another logic block function to handle. |
| `IHandleStateUpdate`1` | Receives a state update message from another logic block function to handle. |
| `ILogicHandlerInterface` | Marker interface for logic handler interfaces |
| `ILogicSenderInterface` | Base interface for logic sender interfaces |
| `ISendCommand`1` | Sends a command message to a specific logic block function |
| `ISendRequest`1` | Sends a request message to a specific logic block function for responding to. |
| `ISendStateUpdate`1` | Sends a state update message to all linked logic blocks. |

## Classes & Enums

| Type | Description |
|------|-------------|
| `InvokeActionMessage` | Represents a message that contains an action to be executed in the context of the actor. This is not serializable, therefore only usable locally, usually within one actor |
| `ServiceBinding` | Common binding class used for both service properties and measuring points |
| `ServiceBuilderBase` | Non-generic base implementation of service builder for reflection-free binding |
| `ServiceDeclarationBase` | Base non-generic implementation of service declaration for reflection-free binding |
| `ServiceProviderContractId` | Identifies a contract on a remote service provider. Used as the key for contract handler routing. |

## Key Type Details

### `CategoryAttribute`

Classifies a service property or measuring point into a semantic category.

### `CommandAttribute`

Marks a message as a command. The message is sent to a specific linked interface instance. The receiving side will not get the identifier of the sender.

### `ContractAttribute`

Marks a class as a contract container grouping related messages and interfaces.

### `DisplayAttribute`

Provides display metadata for a service property or measuring point. DisplayName takes precedence over DefaultName from ServicePropertyAttribute.

### `IConfigureServices`

Plugin assemblies must contain an implementation of this interface. The host calls it at startup do add plugin logic blocks and services to DI

**Methods:**

| Method | Description |
|--------|-------------|
| `ConfigureServices(...)` | Register all logic blocks and services to usable with dependency injection. Logic blocks should be registered as transient. Services that are injected into logic blocks should usually be registered as transient as well. |

### `ImportanceAttribute`

Declares the UI importance of a service property or measuring point. Primary/Secondary values are shown on dashboard tiles.

### `InterfaceAttribute`

Declare interface configuration when implementing a function interface. Allows to set some annotations with the optional parameters.

### `LogicBlockInfoAttribute`

Provides block-level display metadata for a logic block class.

**Properties:**

| Property | Description |
|----------|-------------|
| `Icon` | Icon identifier used by the frontend to render a block icon. Use Remixicon names without the "ri-" prefix (e.g. "charging-pile-line", "battery-2-line"). See https://remixicon.com for available icons. The frontend will render a default fallback icon for unknown or missing values. |

### `PersistentAttribute`

Controls persistence behavior for properties. - On writable service properties: Use [Persistent(Exclude = true)] to opt-out - On other properties: Use [Persistent] to opt-in

**Properties:**

| Property | Description |
|----------|-------------|
| `Exclude` | Set to true to exclude a writable service property from persistence |

### `RequestResponseAttribute`

Marks a message as a request message. The message is sent to a specific linked interface instance. The receiving/responding side will need to return the response message. The responding side will not get the identifier of the sender. The requesting side will receive the identifier of the responder with the response.

### `ServiceMeasuringPointAttribute`

Define a measuring point on a Service interface or logic block property. The optional parameters are used as annotations in service description

### `ServicePropertyAttribute`

Describe a service property on a service interface or logic block property The optional parameters are used as annotations in service description

### `ServiceProviderContractAttribute`

Declares a service provider contract on a logic block property with optional metadata. If no identifier is provided, the property name will be used. The contract type is automatically determined from the property type.

### `StateUpdateAttribute`

Marks a message as a state update. The message is sent to all linked interfaces. The receiving side will get the identifier of the sender

### `TimerAttribute`

Declare a timer method that should be called at regular intervals. If the identifier is not set, the method name is used.

## Related Documentation

- [Logic Blocks](/sdk/logic-blocks) — lifecycle, attributes, thread safety
- [Properties & Measuring Points](/sdk/properties) — property types, categories, display hints
- [Service Provider Contracts](/sdk/services) — I/O bindings, Modbus RTU
- [Logic Interfaces](/sdk/logic-interfaces) — contracts, commands, request/response
- [Testing](/sdk/testing) — TestKit API reference
