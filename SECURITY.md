# Security Policy

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Email `info@vion-iot.com` with:

- A description of the vulnerability
- Steps to reproduce (or a proof of concept)
- The affected URL on `docs.vion.swiss` or file path in this repository
- Your contact details

We will acknowledge receipt within 5 business days and keep you informed of progress toward a fix.

## Scope

This policy covers the documentation site published at `docs.vion.swiss` and the VitePress configuration, theme code, and build pipeline in this repository. Examples of in-scope issues:

- XSS or injection in custom VitePress theme or plugin code
- Credentials, tokens, or other secrets accidentally published in rendered content
- Malicious or misleading links introduced via the build pipeline

General documentation feedback ("this page is wrong", "this example is outdated") is not a security issue — please use the process in [SUPPORT.md](SUPPORT.md) instead.

For vulnerabilities in the packages documented here, see the upstream repositories' security policies:

- [`vion-iot/dale-sdk`](https://github.com/vion-iot/dale-sdk/blob/main/SECURITY.md) — `Vion.Dale.Sdk`, `Vion.Dale.Cli`, and related packages
- [`vion-iot/vion-contracts`](https://github.com/vion-iot/vion-contracts/blob/main/SECURITY.md) — `Vion.Contracts`
