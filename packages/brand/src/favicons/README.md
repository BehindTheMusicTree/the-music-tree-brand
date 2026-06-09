# Favicon bundles

Per-project favicon and PWA icon bundles live under `src/favicons/<project-slug>/`. Use **kebab-case** slugs.

**Documentation map:** [`docs/README.md`](../../docs/README.md)

## Table of contents

- [Layout and import](#layout-and-import)
- [Recommended files per bundle](#recommended-files-per-bundle)
- [Sizes and format](#sizes-and-format)

## Layout and import

- **Source:** `src/favicons/<project-slug>/`
- **Published:** `@themusictree/marks/favicons/<project-slug>/<file>`
- After `pnpm run build`, the same tree is under `dist/favicons/` in the package.

### Example

- `src/favicons/behind-the-music-tree/favicon.svg`
- `src/favicons/behind-the-music-tree/favicon.ico`
- `src/favicons/behind-the-music-tree/apple-touch-icon.png`
- `src/favicons/behind-the-music-tree/icon-192.png`
- `src/favicons/behind-the-music-tree/icon-512.png`

```tsx
import faviconSvg from "@themusictree/marks/favicons/behind-the-music-tree/favicon.svg";
```

## Recommended files per bundle

- `favicon.svg`
- `favicon.ico`
- `apple-touch-icon.png`
- `icon-192.png`
- `icon-512.png`

## Sizes and format

- **Favicon / PWA:** Prefer `favicon.svg` with `favicon.ico` fallback, plus PNG app icons at **180×180**, **192×192**, and **512×512** (minimum). Keep a **master** at **1024×1024** or **512×512** PNG (or SVG if vector) when exporting from design tools.

Naming and repo-wide rules: [`docs/asset-naming.md`](../../docs/asset-naming.md). **Brand marks** (used in UI, not in this folder): [`src/marks/README.md`](../marks/README.md).
