# Asset naming

Conventions for raster and vector files in this package (`src/marks/`, `src/favicons/`, `src/banners/`, future `src/illustrations/`, etc.).

For **format choice, extensions, pixel sizes, and export quality** for brand marks and lockups, see [`src/brand/README.md`](../src/brand/README.md).
For banner-specific guidance, see [`src/banners/README.md`](../src/banners/README.md) (indexed in [`docs/README.md`](README.md)).

## Table of contents

- [Rules](#rules)
- [Lockup kinds (open vs enclosed)](#lockup-kinds-open-vs-enclosed)
- [Examples](#examples)
- [Placement per brand project](#placement-per-brand-project)
- [Checklist for new assets](#checklist-for-new-assets)

## Rules

1. **kebab-case only** — Lowercase words separated by hyphens. No spaces, underscores, or `camelCase`. Stays predictable on case-sensitive servers and in URLs.

2. **Spell out product or domain names** — Avoid opaque abbreviations in published filenames (e.g. prefer `grow-the-music-tree` over `gtmt`). Short folder names are fine when they are full words (`behind-the-music-tree/`), not acronyms meant for filenames.

3. **Role before the extension** — Use a short, consistent suffix so the kind of asset is obvious:
   - `-mark` — Symbol-only / app icon style
   - `-wordmark` — Text-only project name
   - **`-lockup-horizontal`** / **`-lockup-stacked`** — Symbol + text combined; **always** include the orientation (side‑by‑side vs vertical stack). Do not publish a bare **`…-lockup.`** filename without **`horizontal`** or **`stacked`** (see [Lockup kinds](#lockup-kinds-open-vs-enclosed)).
   - `-icon` — Small UI glyph (toolbar, list row)
   - `-illustration` — Illustration or other non-identity artwork
   - `-banner` — Wide promotional/hero artwork
   - `-og` — Open Graph / social preview image

4. **One idea per file** — Do not encode multiple variants in one name beyond the role; use separate files or a documented variant pattern (below).

5. **Variants** — Append theme and other segments before the extension:
   - **Marks (`-mark`):** dark surfaces → **`product-mark-dark.svg`** / **`.png`** (light ink knockout); default mark stays **`product-mark.svg`** for light UI.
   - **Lockups:** after **`…-lockup-horizontal`** or **`…-lockup-stacked`**, orientation comes first, then theme: `product-lockup-horizontal-dark.png`, `product-lockup-stacked-light.png`
   - **Badge / enclosed** (only when both an open and an enclosed lockup ship for the same orientation): `product-lockup-horizontal-badge.png` — pill, capsule, or rounded chip behind the mark + type (see [Lockup kinds](#lockup-kinds-open-vs-enclosed) and [`src/marks/README.md`](../src/marks/README.md#enclosed-lockup-badge-or-pill))
   - Greyscale (optional; only when a committed asset is required): `product-lockup-horizontal-greyscale.svg` — see [`src/marks/README.md`](../src/marks/README.md) for when to add this versus using CSS.
   - Raster scale: `product-lockup-horizontal@2x.png` (only if you ship multiple bitmaps; prefer SVG when possible)

6. **Format** — Keep the real format in the extension (`.svg`, `.png`, `.webp`). Do not use misleading extensions.

7. **Folders mirror meaning** — Use **one folder per project** under `src/marks/<project-slug>/` (same slug as `src/favicons/<project-slug>/`). Do not put every product’s files in a single umbrella folder. Avoid source-based names like `marks/cv/`. Export map in `package.json` should follow the same path.
8. **Favicons use dedicated bundles** — Keep one bundle per project in `src/favicons/<project-slug>/` (see [`src/favicons/README.md`](../src/favicons/README.md)).
9. **Banners use dedicated folders** — Keep one banner set per project in `src/banners/<project-slug>/` (see [`src/banners/README.md`](../src/banners/README.md)).
10. **Brand artwork formats** — Formats, dimensions, and greyscale rules for `src/marks/` are in [`src/marks/README.md`](../src/marks/README.md) (overview in [`docs/README.md`](README.md#marks-assets-marks-and-lockups)).

## Lockup kinds (open vs enclosed)

All of these use **`-lockup-horizontal`** or **`-lockup-stacked`** in the filename (orientation is **required**, even when only one lockup ships).

- **Open (knockout) lockup** — Symbol and wordmark on a **transparent** background; the UI supplies the surface color.
- **Enclosed (badge / pill) lockup** — Same composition, but inside a **defined shape** (white or tinted pill, rounded rectangle, chip). The container is part of the asset. Filename: add the **`…-badge`** segment when both open and enclosed versions exist for that orientation (for example `the-music-tree-lockup-horizontal-badge.png` vs `the-music-tree-lockup-horizontal.png`). Full spec: [`src/marks/README.md`](../src/marks/README.md#enclosed-lockup-badge-or-pill).

## Examples

| Good                                                     | Avoid                                                                                                    |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `audiometa-mark.png`                                     | `am-logo.png`, `AM_Logo.png`                                                                             |
| `audiometa-lockup-horizontal.svg`                        | `audiometa-logo-with-text.svg`, `audiometa-horizontal.svg`, `audiometa-lockup.svg` (missing orientation) |
| `audiometa-wordmark.svg`                                 | `audiometa-text.svg`                                                                                     |
| `the-music-tree-lockup-horizontal-badge.png`             | `tmt-pill-logo.png`                                                                                      |
| `the-music-tree-lockup-stacked.png`                      | `the-music-tree-mark.png` (misnamed raster; same role as **`the-music-tree-lockup-stacked.svg`**)        |
| `behind-the-music-tree-mark.png`                         | `btmt-logo.png`, `BTMT.png`                                                                              |
| `grow-the-music-tree-mark.png`                           | `gtmt.png`                                                                                               |
| `marks/hear-the-music-tree/hear-the-music-tree-mark.png` | `marks/cv/htmt.png`                                                                                      |
| `grow-the-music-tree-banner-mobile.webp`                 | `hero-mobile-final.webp`                                                                                 |

## Placement per marks project

Store all marks files for a project together under:

- `src/marks/<project-slug>/`

Keep related `-mark`, `-wordmark`, and `-lockup-horizontal` / `-lockup-stacked` files side by side in the same folder so imports and export paths stay predictable.

## Checklist for new assets

- [ ] kebab-case filename with clear product/domain name
- [ ] Appropriate role suffix (`-mark`, `-wordmark`, `-lockup-horizontal` / `-lockup-stacked`, `-icon`; avoid bare `-lockup` for new assets)
- [ ] Placed under a semantic folder
- [ ] `package.json` `exports` and `build` copy step updated if the path is new
- [ ] Brand file specs (format, dimensions, variants) follow [`src/marks/README.md`](../src/marks/README.md) where applicable
- [ ] Favicon files (if any) are grouped in `src/favicons/<project-slug>/` and follow [`src/favicons/README.md`](../src/favicons/README.md)
- [ ] Banner files (if any) are grouped in `src/banners/<project-slug>/` and follow [`src/banners/README.md`](../src/banners/README.md)
