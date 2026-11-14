# Asset pipeline

## Table of contents

- [Catalog and generation](#catalog-and-generation)
- [Consumption](#consumption)
- [Public synchronization](#public-synchronization)
- [Recovery and activation](#recovery-and-activation)

## Catalog and generation

The repository root `assets.catalog.json` declares every published asset, its
format, dimensions, role and explicit byte budget. Budget increases require a
reviewed explanation; generation never recalculates budgets. Run
`pnpm assets:generate`, `pnpm assets:check`, `pnpm assets:test`, `pnpm test`,
`pnpm build` and `pnpm assets:package-check`. CI uses Node 22 on Ubuntu and the
frozen lockfile. The package check installs an actual tarball into an isolated
Vite consumer and verifies emitted asset bytes and embedded SVGs.

Detailed marks remain the favicon sources. Compact drawings in
`docs/assets/proposals` are proposals pending visual approval; they are not
published. The optimization inventory records per-file changes. SVG optimization
retains geometry and compares rendered pixels; PNG recompression retains pixels.
The Audiometa `.png` banner previously contained JPEG and was converted to PNG.
The LinkedIn `.jpg` banner previously contained PNG and was encoded as quality
100, 4:4:4 JPEG; its PNG sibling retains the lossless artwork. Paths and dimensions
remain compatible, but the JPEG encoding is necessarily lossy.

## Consumption

npm remains the source of truth. Bundlers import assets from
`@behindthemusictree/brand/marks/…`, `/favicons/…` and `/banners/…`.
Static files live under `src/` in the installed package, not `dist/`.
Use PNG for email compatibility. After a version has been explicitly synchronized,
an email can use a versioned URL, for example:

```html
<img src="https://brand-assets.themusictree.org/v12.13.0/marks/the-music-tree/the-music-tree-mark.png"
     width="64" height="64" alt="The Music Tree">
```

This is a URL shape example, not a claim that the version is synchronized.

## Public synchronization

The manual main-only workflow requires an exact already-published npm version,
the `brand-assets-public` environment, variables `BRAND_ASSETS_BUCKET` and
`BRAND_ASSETS_PUBLIC_URL`, and secrets `CLOUDFLARE_ACCOUNT_ID`,
`BRAND_ASSETS_ACCESS_KEY_ID`, `BRAND_ASSETS_SECRET_ACCESS_KEY`.
The credential must have object read/write access to `btmt-brand-assets` only.

The synchronizer verifies npm SHA-512 integrity and package identity, rejects
unsafe archive paths and links, and publishes only supported image paths under
`v<version>/{marks,favicons,banners}/`. Objects carry the correct MIME type and
`public, max-age=31536000, immutable`. It compares existing bytes and metadata,
uses conditional creation, verifies HTTPS bytes and headers, then writes the
SHA-256 manifest last. There is no `latest`, overwrite or deletion operation.

## Recovery and activation

A retry resumes missing objects. Any existing byte or metadata conflict fails;
resolve by publishing a new npm version, never by overwriting an immutable URL.
A missing manifest means the version is incomplete. HTTPS verification may need
a retry while a new custom domain becomes available.

Infrastructure provisioning, credential creation, environment activation and
actual synchronization are separate explicit operator actions. Merging this
feature does not provision or synchronize anything. The workflow remains manual.
