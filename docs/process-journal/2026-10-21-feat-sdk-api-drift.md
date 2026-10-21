2026-10-21 · gate · drift issues · Seventeen CLI-help and SDK-API drift issues in the architecture repo stayed open from 2026-08-18 to 2026-10-21, each naming the same three likely pages (installation, publishing, quick-start) whatever changed; the changes they report belong on scenarios, services, testing and properties, which none of them named. (self)

2026-10-21 · gate · pnpm build · The HTTP and Modbus samples on services.md and the complete example on testing.md do not compile against the current SDK, the Modbus ones since the April port, and `pnpm check` and `pnpm build` passed them throughout. (self)

2026-10-21 · gate · real-world-name · A real meter model name sits in the RTU sample on services.md and on two agentic pages, and the real-world-name denylist does not list it, so `pnpm check` passes it. (self)

2026-10-21 · brief · cloud-api · The Scalar description of subscribeProperties says to call it before connecting to MQTT and to read values from the topics it returns; the call returns no topics, the topics come from the Services response, and the docs state the opposite order. (self)

2026-10-21 · brief · dale-sdk · services.md documents ServiceProviderContractTypeAttribute for authoring a contract type, and the SDK does not mark it public API. (self)
