---
title: Library Release Notes
description: How to write release notes for a logic block library version, upload them with the Dale CLI, and where other organizations read them.
---

# Library Release Notes

Release notes are optional: a library version uploaded without them has none. Write them for
any version that changes something for the integrators and tenants who use your library — they are
where those readers learn what changed.

## Who Reads Them

Every organization that can see the library reads its versions' notes, not only your own
integrator: every integrator the library is shared with, every integrator on the platform once the
library is Public, and those integrators' tenants. See
[Library Visibility & Sharing](/sdk/library-sharing) for who can see a library.

Nobody is notified when you upload a new version. Consumers read the notes when they choose a
version, on these Dashboard surfaces:

| Surface | What it does |
|---------|--------------|
| "What's new" on a library in the tenant's logic configuration editor | Shows the notes of the versions between the one the configuration uses and the newest one available. |
| The change-version dialog, in the logic configuration editor and the template editor | Shows the notes of the versions between the one in use and the one picked. |
| "Release notes" on a version of the library page | Shows that version's notes. Integrators that do not own the library open its page too. |

A client reads the same text through the Cloud API, in each version's `releaseNotes` field:

```text
GET /integrator/{integratorId}/logicBlockLibraryVersions?packageId=<package-id>
GET /tenant/{tenantId}/logicBlockLibraryVersions?packageId=<package-id>
```

## Writing Them

Notes are [GitHub Flavored Markdown](https://github.github.com/gfm/), with a length limit that the
upload enforces. The Dashboard renders all of it except:

- Raw HTML, which shows as text.
- Links other than `http` and `https`, which show as their text. That includes `mailto:` links,
  relative links and in-page links such as footnote references.
- Images, which show as a link to the image when its address is `http` or `https`, and otherwise as
  their alt text.
- Task-list checkboxes, which are read-only.

The platform reads no structure in the text and keeps no breaking-change mark, so the shape is up
to you. A shape that serves the reader:

- Group the entries by the kinds [Keep a Changelog](https://keepachangelog.com/) uses: Added,
  Changed, Deprecated, Removed, Fixed, Security.
- Put breaking changes first.
- Tell a changed identifier apart from a changed meaning: a renamed logic block or property is a
  name the consumer looks for, a value that now means something else keeps its name and is easy to
  miss.
- Say what the consumer does about each breaking change.

For example:

```markdown
### Changed

- **Breaking:** `Setpoint` on `RoomController` is now in °C instead of tenths of a degree.
  Divide stored values by ten before upgrading.

### Added

- `HumidityLimit` on `RoomController`.
```

## Uploading Them

Keep the notes for a version in a file and pass it to `dale upload`:

```bash
dale upload --release-notes-file release-notes/1.2.0.md
```

- The Dale CLI sends the file's text unchanged.
- An empty file, or one holding only whitespace, uploads the version without notes.
- A missing file fails the upload before anything is packed.

The test and production environments are separate uploads, so each holds its own copy of the notes:
pass the file to the upload for each environment. For a pipeline that uploads on a tag, see
[CI/CD Publishing](/sdk/publishing#ci-cd-publishing).

## Correcting Them

The library's owner can edit a version's notes after upload, from the edit dialog of that version on
the library page in the [Dashboard](https://dashboard.vion.swiss/). The edit tells nobody, and it
applies to the environment it is made in only.

For packaging and uploading libraries, see [Publishing & CI/CD](/sdk/publishing).
