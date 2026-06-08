# Banner assets: naming, formats, and dimensions

Guidance for banner artwork shipped in this package (`*-banner.png`, `*-banner-mobile.webp`, etc.). Aligns with [`asset-naming.md`](../../docs/asset-naming.md). Documentation map: [`docs/README.md`](../../docs/README.md).

**Layout:** **One `src/banners/<project-slug>/` directory per product** — same slug style as [`src/brand/`](../brand/README.md) and [`src/favicons/`](../favicons/README.md). Do not store every project’s banners in a single umbrella folder; only this README sits at `src/banners/` root.

## Table of contents

- [Purpose](#purpose)
- [Imports](#imports)
- [Naming pattern](#naming-pattern)
- [Preferred formats](#preferred-formats)
- [Dimensions guidance](#dimensions-guidance)
- [Social platform banner standards](#social-platform-banner-standards)
- [Platform filename pattern](#platform-filename-pattern)
- [Checklist for new banners](#checklist-for-new-banners)

## Purpose

Use banner assets for wide visual surfaces such as hero sections, campaign strips, and promotional headers.

## Imports

From the published package (subpath `./banners/*`, copied to `dist/banners/` on build):

```text
@themusictree/brand/banners/<project-slug>/<filename>
```

Example:

```tsx
import hero from "@themusictree/brand/banners/grow-the-music-tree/grow-the-music-tree-banner-mobile.webp";
```

Add files under `src/banners/<project-slug>/`, then run a full **`pnpm run build`** so they appear under `dist/banners/`. New project folders are picked up automatically (no per-folder export entry).

Keep all variants for a project in that folder (desktop, mobile, dark, light).

## Naming pattern

Base pattern:

- `<project-slug>-banner.<ext>`

Common variants (append before extension):

- Breakpoint/context: `<project-slug>-banner-mobile.<ext>`, `<project-slug>-banner-desktop.<ext>`
- Theme: `<project-slug>-banner-light.<ext>`, `<project-slug>-banner-dark.<ext>`
- Combined: `<project-slug>-banner-mobile-dark.<ext>`

Avoid ambiguous names like `hero-final.png` or `header-new.webp`.

## Preferred formats

1. **WebP (`.webp`)** — preferred for raster delivery due to smaller size.
2. **PNG (`.png`)** — use when lossless quality or transparency is required.
3. **SVG (`.svg`)** — use for vector-first artwork; avoid embedding huge raster images in SVG.

## Dimensions guidance

- **Desktop hero banners:** design around **1440x600** or **1920x800** depending on composition.
- **Mobile banners:** provide dedicated crops around **750x1000** or **1080x1350** as needed.
- Keep important content inside a safe center area to avoid edge cropping on responsive layouts.

## Social platform banner standards

Use a master source and export platform-specific files instead of reusing one image everywhere.

- **Master source (recommended):** `2400x1260` for flexible downscaling and crops.
- **Safe area:** keep logos/text in the center ~60-70% of the canvas.

### Recommended export matrix

| Platform  | Surface              | Recommended size | Ratio     |
| --------- | -------------------- | ---------------- | --------- |
| X         | Profile header       | `1500x500`       | `3:1`     |
| LinkedIn  | Company cover        | `1128x191`       | `~5.91:1` |
| LinkedIn  | Personal cover       | `1584x396`       | `4:1`     |
| Facebook  | Page cover           | `851x315`        | `~2.70:1` |
| Mastodon  | Profile header       | `1500x500`       | `3:1`     |
| Instagram | Story/Reel cover     | `1080x1920`      | `9:16`    |
| Instagram | Feed post (portrait) | `1080x1350`      | `4:5`     |

Note: platforms may revise dimensions over time; verify before final export for campaigns.

## Platform filename pattern

Use explicit platform suffixes:

- `<project-slug>-banner-x.<ext>`
- `<project-slug>-banner-linkedin-company.<ext>`
- `<project-slug>-banner-linkedin-personal.<ext>`
- `<project-slug>-banner-facebook-page.<ext>`
- `<project-slug>-banner-mastodon.<ext>`
- `<project-slug>-banner-instagram-story.<ext>`
- `<project-slug>-banner-instagram-post-4x5.<ext>`

## Checklist for new banners

- [ ] File is in `src/banners/<project-slug>/`
- [ ] Filename uses `<project-slug>-banner` pattern with clear variants
- [ ] Format choice is intentional (`.webp`/`.png`/`.svg`)
- [ ] Desktop/mobile or theme variants are explicitly named when both exist
- [ ] Social variants are exported per platform with explicit suffixes
- [ ] After adding or changing files, run a full build so `dist/banners/` stays in sync
