---
title: Publishing & CI/CD
description: Packaging and uploading Dale logic block libraries to the VION Cloud, including CI/CD pipeline integration.
---

# Publishing & CI/CD

Logic block libraries are distributed as NuGet packages (`.nupkg`) and uploaded to the VION Cloud under your integrator account. You can upload via the **Dale CLI** or the **Dashboard UI**.

## Prerequisites

To publish a library, you need:

- A VION Cloud account with membership in an **integrator** organization
- A role with sufficient permissions to manage libraries
- The Dale CLI installed (`dotnet tool install -g Dale.Cli`)

::: info Integrators
Libraries belong to integrators. An integrator is an organization (e.g., your company) that develops and maintains logic block libraries for their tenants. Contact your VION platform administrator to be added to an integrator.
:::

## Authentication

### Interactive Login

For local development, authenticate via the browser:

```bash
dale login
```

This opens your browser, authenticates via OIDC, and stores tokens locally in `~/.dale/credentials.json`. The Dale CLI refreshes tokens automatically when they expire.

If you belong to multiple integrators, `dale login` prompts you to select one:

```bash
dale login

  Opening browser for authentication...
  ✓ Authenticated as jonas@example.com

  Select integrator:
  > 1. Vion Dev Team
    2. Partner Corp
```

### Configuration

Check your current configuration:

```bash
dale config show
```

```
  Environment:  test
  Auth URL:     https://auth.test.ecocoa.ch/realms/vion
  API URL:      https://cloudapi.test.ecocoa.ch
  Integrator:   Vion Dev Team (190938ac-...)
  Logged in:    yes
```

Switch environments or integrators:

```bash
dale config set-environment production
dale config set-integrator "Partner Corp"
```

### Other Auth Commands

```bash
dale whoami     # Show current identity and integrator memberships
dale logout     # Clear stored credentials
```

## Packaging

Create a `.nupkg` from your project:

```bash
dale pack
```

This runs `dotnet pack -c Release` and outputs the package location. The version number comes from your `.csproj` file:

```xml
<PropertyGroup>
  <PackageId>MyCompany.SmartBuilding</PackageId>
  <Version>1.0.0</Version>
</PropertyGroup>
```

::: tip
Increment the `<Version>` before each upload — VION Cloud rejects duplicate versions.
:::

## Uploading

### Via CLI

Pack and upload in a single command:

```bash
dale upload --release-notes "Added temperature monitoring"
```

`dale upload` automatically runs `dale pack` first, then uploads the `.nupkg` to the VION Cloud under your active integrator.

### Via Dashboard

1. Navigate to **Integrator → Libraries** in the Dashboard
2. Select your library (or create one)
3. Click **Upload New Version**
4. Select the `.nupkg` file
5. Optionally add release notes

## CI/CD Publishing

For automated pipelines, use **client credentials** instead of interactive login. Request a client ID and secret from your VION platform administrator.

Pass credentials via `--client-id` and `--client-secret`:

```bash
dale upload \
  --client-id <your-client-id> \
  --client-secret <your-client-secret> \
  --release-notes "Build ${BUILD_NUMBER}" \
  --skip-duplicate
```

The `--skip-duplicate` flag treats version conflicts (409) as success instead of failure — this makes CI pipelines safe to re-run without failing on already-published versions.

### Cross-Environment Deployment

Target a specific environment with `--environment`:

```bash
dale upload \
  --environment production \
  --client-id <your-client-id> \
  --client-secret <your-client-secret>
```

### GitHub Actions Example

```yaml
name: Publish Library

on:
  push:
    tags: ['v*']

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-dotnet@v4
        with:
          dotnet-version: '10.0.x'

      - name: Install Dale CLI
        run: dotnet tool install -g Dale.Cli

      - name: Upload to VION Cloud
        run: |
          dale upload \
            --client-id ${{ secrets.DALE_CLIENT_ID }} \
            --client-secret ${{ secrets.DALE_CLIENT_SECRET }} \
            --release-notes "Release ${{ github.ref_name }}" \
            --skip-duplicate
```

### Azure DevOps Pipeline Example

```yaml
trigger:
  tags:
    include: ['v*']

pool:
  vmImage: 'ubuntu-latest'

steps:
  - task: UseDotNet@2
    inputs:
      version: '10.0.x'

  - script: dotnet tool install -g Dale.Cli
    displayName: 'Install Dale CLI'

  - script: |
      dale upload \
        --client-id $(DALE_CLIENT_ID) \
        --client-secret $(DALE_CLIENT_SECRET) \
        --release-notes "Release $(Build.SourceBranchName)" \
        --skip-duplicate
    displayName: 'Upload to VION Cloud'
```

### JSON Output for Automation

All CLI commands support `--output json` for machine-readable output:

```bash
dale pack --output json
```

```json
{
  "packageId": "MyCompany.SmartBuilding",
  "version": "1.0.0",
  "nupkg": "bin/Release/MyCompany.SmartBuilding.1.0.0.nupkg"
}
```

```bash
dale upload --output json
```

On failure, JSON output includes an `error` field:

```json
{
  "error": "Not logged in. Run `dale login` or set DALE_CLIENT_ID and DALE_CLIENT_SECRET."
}
```

## Library Versioning

Libraries use standard [semantic versioning](https://semver.org/):

- **Major** — breaking changes to logic block contracts or interfaces
- **Minor** — new logic blocks or features, backward compatible
- **Patch** — bug fixes

Set the version in your `.csproj`:

```xml
<Version>1.2.3</Version>
```

### Version Tags

After uploading, you can tag versions in the Dashboard:

- **Preview** — pre-release, not recommended for production
- **Deprecated** — superseded, will be removed in the future
