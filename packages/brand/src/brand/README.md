# Brand artwork (static files)

This directory holds **static brand identity** assets: marks (`-mark`), wordmarks (`-wordmark`), lockups (`-lockup-horizontal` / `-lockup-stacked`), and related raster/vector exports. It is not a UI icon set; use the `-icon` role only for small interface glyphs if you add them here.

**Related:** naming rules in [`docs/asset-naming.md`](../../docs/asset-naming.md); documentation index [`docs/README.md`](../../docs/README.md). **Favicon bundles** live under [`src/favicons/`](../favicons/README.md), not here.

**Layout:** one **`src/brand/<project-slug>/`** folder per product (same slug style as [`src/favicons/`](../favicons/README.md)). Each folder holds that project’s marks, lockups, and wordmarks—not an umbrella folder mixing every product.

## Table of contents

- [Imports](#imports)
- [Role suffixes (mark, wordmark, lockup orientation)](#role-suffixes-mark-wordmark-lockup-orientation)
- [Preferred formats (in order)](#preferred-formats-in-order)
- [Extensions](#extensions)
- [Dimensions and resolution](#dimensions-and-resolution)
  - [Lockups (horizontal and stacked)](#lockups-horizontal-and-stacked)
  - [Enclosed lockup (badge or pill)](#enclosed-lockup-badge-or-pill)
- [Color, transparency, and background](#color-transparency-and-background)
- [File size (practical targets)](#file-size-practical-targets)
- [Checklist for new brand files](#checklist-for-new-brand-files)

## Imports

From published package:

```text
@behindthemusictree/assets/brand/<project-slug>/<filename>
```

Examples:

```tsx
import theMusicTreeLockupStackedPng from "@behindthemusictree/assets/brand/the-music-tree/the-music-tree-lockup-stacked.png";
import productMark from "@behindthemusictree/assets/brand/audiometa/audiometa-mark.svg";
```

## Role suffixes (mark, wordmark, lockup orientation)

Use explicit roles when possible:

- `-mark`: symbol-only asset
- `-wordmark`: text-only project name
- `-lockup-horizontal` / `-lockup-stacked`: symbol + text combined; **always** pick an orientation in the filename (see [lockup layouts](#lockups-horizontal-and-stacked) below). Do not use a bare `-lockup` segment without **`horizontal`** or **`stacked`**.

## Preferred formats (in order)

1. **SVG (`.svg`)** — Default for web when the artwork is vector-friendly: infinite scaling, usually smaller than high-res PNG, easy to theme with CSS (`currentColor`, `fill`). Use for wordmarks and simple marks without heavy raster effects.

2. **PNG (`.png`)** — Use when the design relies on fine gradients, photos, or effects that do not export cleanly to SVG, or when the org standard is raster lockups. Prefer **24-bit RGBA** with transparency for UI; avoid indexed PNG unless file size is critical and quality is acceptable.

3. **WebP (`.webp`)** — Optional **delivery** format in apps (smaller than PNG at similar quality). For **this repo**, prefer shipping **SVG or PNG** as the source of truth; apps may convert or serve WebP at build/CDN time. If you commit WebP here, keep a PNG or SVG alongside for tooling that does not support WebP.

Avoid **JPEG** for marks on arbitrary backgrounds (no alpha). Use JPEG only for photo-based wordmarks where a rectangular crop is intentional.

## Extensions

The file extension must match the encoded format (see [`asset-naming.md`](../../docs/asset-naming.md)). Common cases:

| Extension | Typical use |
|-----------|-------------|
| `.svg` | Vector mark or wordmark |
| `.png` | Raster with transparency |
| `.webp` | Raster alternative (if explicitly committed) |

Do not use `.jpg`/`.jpeg` for assets that need transparency behind the artwork.

## Dimensions and resolution

Think in **CSS pixels** for layout and **intrinsic** bitmap size for clarity on retina displays.

### Horizontal / wordmark (`-wordmark`)

- **Target display width** in UIs is often **96–200px** wide (nav, footer); hero use can be larger.
- **Raster exports:** provide art at **2×** the maximum display width you support, or **cap the long edge** around **512–800px** if the design is simple—enough for retina headers without oversized files.
- **Minimum:** avoid exporting below **~120px** on the long edge for primary artwork; tiny bitmaps look soft when scaled up.

### Lockups (horizontal and stacked)

A lockup is **symbol + wordmark composed as one unit** (fixed spacing and alignment). It is not a `-mark` (symbol alone) or `-wordmark` (text alone). **Filenames must include the orientation:** `-lockup-horizontal` or `-lockup-stacked`, even when the project ships only one of the two.

- **Horizontal lockup (`-lockup-horizontal`)**: type and symbol side by side (or symbol leading); use for nav bars and footers; same sizing as wordmarks above (**96–200px** typical display width, export at **2×** or long edge **512–800px**).
- **Stacked lockup (`-lockup-stacked`)**: symbol above or below the wordmark; use when vertical space fits; common display widths are **72–140px** in cards/empty states, exported at **2×**.
- **Open / knockout lockup**: transparent background around the type and symbol—the artwork floats on whatever surface the UI provides.

### Enclosed lockup (badge or pill)

An **enclosed lockup** is still named with **`-lockup-horizontal`** or **`-lockup-stacked`**: the symbol and wordmark sit **inside a defined container** (rounded rectangle, capsule/pill, chip). The fill, stroke, and corner radius are part of the approved identity—not something to recreate only in CSS unless guidelines say so.

- Use the same **orientation-required** rules as open lockups, then add **`…-badge`** when applicable.
- When a project ships **both** an open (knockout) horizontal lockup and a pill-enclosed one, disambiguate in the filename with the **`…-badge`** variant (see [`asset-naming.md`](../../docs/asset-naming.md)): e.g. `the-music-tree-lockup-horizontal-badge.png` alongside `the-music-tree-lockup-horizontal.png`.
- **Export the full container** in the file: rounded ends must not be clipped; include **safe padding** inside the canvas so the shape clears the image edges (see [Color, transparency, and background](#color-transparency-and-background)).
- **Typical aspect ratios** for chips in headers are often moderately wide (for example **~3–4∶1** width∶height); size to the UI slot and export raster at **2×** for retina.

### Square marks (`-mark`, `-icon`)

- **UI list rows / avatars:** display often **24–32px**; raster source at **48–64px** minimum on the square.
- **Favicon / PWA files** belong under `src/favicons/` — see [`src/favicons/README.md`](../favicons/README.md).

### Open Graph / social (`-og`)

- Typical **1200×630** (1.91∶1) for many platforms; confirm current platform docs when adding new crops.

### SVG sizing

- Set a sensible `viewBox` and omit fixed `width`/`height` when the artwork should scale with CSS, or set dimensions that match the design grid.
- For crisp alignment, prefer **integer** coordinates in the SVG where practical.

## Color, transparency, and background

- **Light + dark UI:** ship **`…-lockup-horizontal-light.svg`** / **`…-lockup-horizontal-dark.svg`** (or **`…-lockup-stacked-…`**, or PNG equivalents) when a single file does not work on both; see naming guide for variant suffixes.
- **Greyscale / muted marks:** do **not** ship a grey copy of every mark by default. Prefer CSS for web (for example `opacity`, or `filter: grayscale(1)` on a wrapper) when you only need a subdued or disabled look. Add a **dedicated greyscale file** only when brand guidelines, print/PDF, email, or readability require a committed asset (automatic greyscale can collapse distinct brand colors to similar greys). Use the variant suffix **`…-mark-greyscale.svg`** (or **`…-lockup-horizontal-greyscale.svg`** / **`…-lockup-stacked-greyscale.svg`** for symbol+text files) next to the full-color source. Implementation note: greyscale SVGs in this package wrap the same paths as the color source asset and apply an sRGB luminance **`feColorMatrix`** filter so the file stays in sync with the source artwork without hand-editing hundreds of fills. Each file uses a **unique `id` on the filter** (for example `audiometa-mark-greyscale`) to reduce clashes when inlining multiple SVGs on one page.
- **Safe area:** keep padding inside the canvas so the mark does not touch edges when used in circles or rounded avatars.

## File size (practical targets)

- **SVG:** optimize (SVGO or equivalent); typical UI marks often stay **under ~15–30KB** unless highly detailed.
- **PNG:** compress losslessly; for flat artwork, **under ~100KB** at 2× nav size is a reasonable goal; investigate SVG if files grow much larger.

## Checklist for new brand files

- [ ] Format matches the artwork (SVG vs PNG) and extension is correct  
- [ ] Role is explicit and matches usage (`-mark`, `-wordmark`, `-lockup-horizontal` / `-lockup-stacked`; avoid bare `-lockup`)  
- [ ] Raster long-edge or square size matches intended max display × retina, without huge unused resolution  
- [ ] Transparency or explicit light/dark variants documented in filename  
- [ ] File size reasonable; consider SVG if PNG is large and flat  
