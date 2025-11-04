#### [Dale.Sdk](index.md 'index')

## Dale.Sdk Assembly
### Namespaces

<a name='Dale.Sdk.Core'></a>

## Dale.Sdk.Core Namespace

| Classes | |
| :--- | :--- |
| [CommandAttribute](CommandAttribute.md 'Dale.Sdk.Core.CommandAttribute') | Marks a message as a command.<br/>The message is sent to a specific linked interface instance.<br/>The receiving side will not get the identifier of the sender. |
| [ContractAttribute](ContractAttribute.md 'Dale.Sdk.Core.ContractAttribute') | Marks a class as a contract container grouping related messages and interfaces. |
| [InterfaceAttribute](InterfaceAttribute.md 'Dale.Sdk.Core.InterfaceAttribute') | Declare interface configuration when implementing a function interface. Allows to set some annotations with the<br/>optional parameters. |
| [IoAttribute](IoAttribute.md 'Dale.Sdk.Core.IoAttribute') | Declares an IO on a logic block property with optional metadata.<br/>If no identifier is provided, the property name will be used.<br/>The IO type is automatically determined from the property type. |
| [LogicBlockBase](LogicBlockBase.md 'Dale.Sdk.Core.LogicBlockBase') | |
| [PersistentAttribute](PersistentAttribute.md 'Dale.Sdk.Core.PersistentAttribute') | Controls persistence behavior for properties.<br/>- On writable service properties: Use [Persistent(Exclude = true)] to opt-out<br/>- On other properties: Use [Persistent] to opt-in |
| [RequestResponseAttribute](RequestResponseAttribute.md 'Dale.Sdk.Core.RequestResponseAttribute') | Marks a message as a request message.<br/>The message is sent to a specific linked interface instance.<br/>The receiving/responding side will need to return the response message.<br/>The responding side will not get the identifier of the sender.<br/>The requesting side will receive the identifier of the responder with the response. |
| [ServiceAttribute](ServiceAttribute.md 'Dale.Sdk.Core.ServiceAttribute') | Declare a service<br/>On a logic block, the Service attribute can be omitted (then class name + all implemented service interfaces are<br/>used)<br/>Identifier can be empty (then class name is used)<br/>ImplementedServiceInterfaces can be empty (then all service interfaces implemented by the class are used) |
| [ServiceInterfaceAttribute](ServiceInterfaceAttribute.md 'Dale.Sdk.Core.ServiceInterfaceAttribute') | Declare a service interface as a C# interface. Use the ServiceProperty and ServiceMeasuringPoint attributes on<br/>properties. |
| [ServiceMeasuringPointAttribute](ServiceMeasuringPointAttribute.md 'Dale.Sdk.Core.ServiceMeasuringPointAttribute') | Define a measuring point on a Service interface or logic block property.<br/>The optional parameters are used as annotations in service description |
| [ServicePropertyAttribute](ServicePropertyAttribute.md 'Dale.Sdk.Core.ServicePropertyAttribute') | Describe a service property on a service interface or logic block property<br/>The optional parameters are used as annotations in service description |
| [ServiceRelationAttribute](ServiceRelationAttribute.md 'Dale.Sdk.Core.ServiceRelationAttribute') | Defines a relation to another service interface.<br/>A matching declaration (same RelationType, opposite Direction) must exist on the other service interface. |
| [StateUpdateAttribute](StateUpdateAttribute.md 'Dale.Sdk.Core.StateUpdateAttribute') | Marks a message as a state update.<br/>The message is sent to all linked interfaces.<br/>The receiving side will get the identifier of the sender |
| [TimerAttribute](TimerAttribute.md 'Dale.Sdk.Core.TimerAttribute') | Declare a timer method that should be called at regular intervals.<br/>If the identifier is not set, the method name is used. |

| Structs | |
| :--- | :--- |
| [LogicBlockBase.InvokeActionMessage](LogicBlockBase.InvokeActionMessage.md 'Dale.Sdk.Core.LogicBlockBase.InvokeActionMessage') | Represents a message that contains an action to be executed in the context of the actor.<br/>This is not serializable, therefore only usable locally, usually within one actor |

| Interfaces | |
| :--- | :--- |
| [IConfigureServices](IConfigureServices.md 'Dale.Sdk.Core.IConfigureServices') | Plugin assemblies must contain an implementation of this interface. The host calls it at startup do add plugin<br/>logic blocks and services to DI |

