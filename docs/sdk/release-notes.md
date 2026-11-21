---
title: Library Release Notes
description: Write release notes for a logic block library version, upload them with the Dale CLI, and correct them after upload.
---

# Library Release Notes

Release notes tell the organizations that use your library what changed in a version. They are optional: a version uploaded without them has none.

## Who Reads Them

Every organization that can see the library, integrators and their tenants alike — see [Library Visibility & Sharing](/sdk/library-sharing). Nobody is notified of a new version: consumers read the notes in the Dashboard where they pick a version.

## Writing Them

Notes are [GitHub Flavored Markdown](https://github.github.com/gfm/). Two things do not come out as written:

| You write | It shows as |
|-----------|-------------|
| Raw HTML | Text |
| A link other than `http` or `https`, such as `mailto:` or a relative link | Its text |

Group the entries by the kinds [Keep a Changelog](https://keepachangelog.com/) uses, put breaking changes first, and say what the consumer does about each:

```markdown
### Changed

- **Breaking:** `Setpoint` on `RoomController` is now in °C instead of tenths of a degree.
  Divide stored values by ten before upgrading.

### Added

- `HumidityLimit` on `RoomController`.
```

## Uploading Them

```bash
dale upload --release-notes-file release-notes/1.2.0.md
```

| The file | The upload |
|----------|------------|
| Holds notes | Sends its text unchanged |
| Is empty or holds only whitespace | Uploads the version without notes |
| Is missing | Fails before anything is packed |

Test and production each keep their own copy: pass the file to the upload for each environment, as [CI/CD Publishing](/sdk/publishing#ci-cd-publishing) does.

## Correcting Them

The library's owner edits a version's notes on the library page in the [Dashboard](https://dashboard.vion.swiss/). The edit notifies nobody and applies to the environment it is made in only.
