# Asset documentation index

Start here for naming, formats, and where specs live.

## Table of contents

- [Installing the package](#installing-the-package)
- [Naming](#naming)
- [Brand assets (marks and lockups)](#brand-assets-marks-and-lockups)
- [Colocated READMEs](#colocated-readmes)
- [Playground (local preview)](#playground-local-preview)
- [Published package contents](#published-package-contents)

## Installing the package

**`@themusictree/brand`** is published to GitHub Packages. Registry configuration, authentication (local machine and GitHub Actions), and **`pnpm add`** commands are documented in the repository root **[README — Install](../README.md#install)**.

## Naming

Conventions for filenames and folders across `src/marks/`, `src/favicons/`, `src/banners/`, and future asset trees: **[`asset-naming.md`](asset-naming.md)** (kebab-case, role suffixes such as `-mark` and **`-lockup-horizontal` / `-lockup-stacked`** — orientation required for lockups, placement, checklist).

## Brand assets (marks and lockups)

The canonical specification for **formats, dimensions, greyscale SVG filters, and checks** for files in `src/marks/` lives next to those assets: **[`src/marks/README.md`](../src/marks/README.md)**.

File naming for those assets follows [`asset-naming.md`](asset-naming.md).

## Colocated READMEs

- Banners — [`src/banners/README.md`](../src/banners/README.md) (**one `src/banners/<project-slug>/` per product**, naming, hero vs social, platform export matrix)
- Favicon bundles — [`src/favicons/README.md`](../src/favicons/README.md) (layout, import path, recommended files, PWA sizes)

## Playground (local preview)

The repo includes a dev-only Vite app under [`playground/`](../playground/) to preview components and files under `dist/` (not published on npm). Setup and commands: **[`CONTRIBUTING.md` — Component and asset preview (playground)](../CONTRIBUTING.md#component-and-asset-preview-playground)**.

## Published package contents

Published installs include this `docs/` tree (including [`asset-naming.md`](asset-naming.md)), `src/banners/README.md`, and `src/marks/README.md` (see `package.json` `files`). Favicon guidance is also available under `dist/favicons/README.md` after a build.
