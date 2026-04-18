# VION Documentation

VitePress source for the VION Edge Operations Platform documentation, published at **https://docs.vion.swiss**. Covers the [Vion Dale SDK](https://github.com/vion-iot/dale-sdk), [Vion.Contracts](https://github.com/vion-iot/vion-contracts), logic blocks, MQTT topics and payloads, the dashboard, and broader platform concepts.

## Local development

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # production build; fails on dead links
```

## Auto-generated content

`docs/api-reference/index.md` is pushed by the `dale-sdk` release pipeline on every SDK release. Do not edit it by hand — changes will be overwritten.

## Source-available

This repository is source-available under [Apache 2.0](LICENSE). Issues and pull requests are not accepted from outside the `vion-iot` organization. See [CONTRIBUTING.md](CONTRIBUTING.md), [SUPPORT.md](SUPPORT.md), and [SECURITY.md](SECURITY.md).
