# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Changelog Best Practices

### General Principles

- Changelogs are for humans, not machines.
- Include an entry for every version, with the latest first.
- Group similar changes under: Added, Changed, Improved, Deprecated, Removed, Fixed, Documentation, Performance, CI.
- Use an "Unreleased" section for upcoming changes.
- Follow Semantic Versioning where possible.
- Use ISO 8601 date format: YYYY-MM-DD.
- Avoid dumping raw git logs; summarize notable changes clearly.

### Guidelines for Contributors

All contributors (including maintainers) should update `CHANGELOG.md` when creating PRs:

1. **Add entries to the `[Unreleased]` section** - Add your changes under the appropriate category (Added, Changed, Improved, Deprecated, Removed, Fixed, Documentation, Performance, CI)
2. **Follow the changelog format** - See examples below
3. **Group related changes** - Similar changes should be grouped together
4. **Be descriptive** - Write clear, user-focused descriptions of what changed

**Example:**

```markdown
## [Unreleased]

### Added

- **New Component**: Added `Card` component with variants for outlined and elevated styles

### Fixed

- **Token Export**: Fixed missing CSS custom property for `--color-surface`
```

**Note:** During releases, maintainers will move entries from `[Unreleased]` to a versioned section (e.g., `## [1.1.0] - 2026-04-01`).

## [Unreleased]

### Added

- **ORG_NAME Export**: Added `ORG_NAME` constant exported from build environment, sourced from GitHub repository variable in CI
- **HTMT_API_GITHUB_URL Export**: Added `HTMT_API_GITHUB_URL`, 'GTMT_FRONT_GITHUB_URL`, `TMD_ADMIN_GITHUB_URL`, and `AUDIOMETA_FRONT_GITHUB_URL` constants exported from build environment, sourced from GitHub repository variable in CI

### Fixed

- **Package scope and publishability**: Renamed the package from `@themusictree/brand` (an org that doesn't exist, so the package could never publish) to `@behindthemusictree/brand`, removed the stray `private: true`, and corrected `repository.url` to point at this repo instead of a nonexistent one.
- **Release tooling**: `scripts/release.sh` and `.github/workflows/publish.yml` now target `packages/brand/package.json` instead of the private, version-disconnected root `package.json`.
- **Asset export paths**: Removed the `copy-assets` step, which double-nested marks/favicons/banners/styles under `dist/*/*` and broke every `@behindthemusictree/brand/marks/*`-style import. Exports and `files` now reference `src/` directly.

## [11.4.3] - 2026-05-26

### CI

- **Publish workflow**: Drop explicit `version: use-packageManager-field` from `pnpm/action-setup@v4` — omitting the key is the correct way to auto-read from `packageManager` in `package.json` (the string was treated as a literal version, causing a conflict).

## [11.4.2] - 2026-05-26

### CI

- **Publish workflow**: Install pnpm via `pnpm/action-setup@v4` (reads version from `packageManager` field) and replace `npm ci` / `npm run build` / `npm publish` with their pnpm equivalents.

## [11.4.1] - 2026-05-26

### CI

- **Package manager**: Migrated from npm to pnpm. Updated `package.json`, `playground/package.json`, and playground scripts accordingly.
- **Publish workflow**: Fixed 403 error on `npm publish` by switching from the custom `GH_PACKAGES_TOKEN` secret (wrong scopes) to the built-in `GITHUB_TOKEN`, which already holds `packages: write` via the workflow's `permissions` block.

## [11.4.0] - 2026-05-26

### Added

- **Subdomain constants**: Explicitly re-exported `HTMT_FRONT_SUBDOMAIN`, `HTMT_API_SUBDOMAIN`, `GTMT_FRONT_SUBDOMAIN`, `GTMT_API_SUBDOMAIN`, `AUDIOMETA_FRONT_SUBDOMAIN`, `AUDIOMETA_API_SUBDOMAIN`, and `TMTA_SUBDOMAIN` from the package root (`src/index.ts`). All subdomain constants are now importable directly from the package.

## [11.3.0] - 2026-05-26

### Added

- **`TMD_GAME_SUBDOMAIN`, `TMD_SHOWCASE_SUBDOMAIN`**: Explicitly re-exported from the package root (`src/index.ts`) so consumers can import these constants directly from the package.

### CI

- **GitHub Packages token**: Switched `publish.yml` to use `GH_PACKAGES_TOKEN` secret for `NODE_AUTH_TOKEN` (replaces `GITHUB_TOKEN`); exports it before `npm ci` so private package installs succeed. Added `GH_PACKAGES_TOKEN` to `vercel-playground-env.yml` validation and `sync-vercel-playground-env.mjs` required keys.

## [11.2.1] - 2026-05-24

## [11.2.0] - 2026-05-24

### Added

- **`TMD_SHOWCASE_SUBDOMAIN`**: New build-time constant exported from `socialBuildEnv` — env key `TMD_SHOWCASE_SUBDOMAIN` inlined into `dist/` at package build time (same pattern as `TMD_GAME_SUBDOMAIN`). Added to `tsup.config.ts` define map, `scripts/assert-org-url.mjs` validation, and `playground/.env.example`.
- **`ORG_GITHUB_SPONSOR_BUTTON_IFRAME_SRC`**: New inlined constant exported from `socialBuildEnv` — the resolved sponsor button iframe URL baked in at build time (fixes playground Constants tab showing `undefined` for that row).
- **Favicons (the-music-deck)**: Completed favicon bundle with transparent-background rasters — `favicon.ico` (16×16 + 32×32, PNG-compressed), `apple-touch-icon.png` (180×180 RGBA), `icon-192.png` (192×192 RGBA), `icon-512.png` (512×512 RGBA).

### Improved

- **Playground — Favicons tab**: Renders one sub-tab per project (same pattern as the Brand tab). Underlying `groupBrandEntriesByProject` refactored into the generic `groupEntriesByProject(entries, distSubfolder)`.

### Fixed

- **`playground/.env`**: Corrected stale `TMD_SUBDOMAIN` key to `TMD_GAME_SUBDOMAIN` so local builds no longer fail the assert check.

### CI

- **Vercel sync workflow** (`vercel-playground-env.yml`) and **`sync-vercel-playground-env.mjs`**: Added `TMD_SHOWCASE_SUBDOMAIN` so it is pushed to the Vercel project environment alongside the other subdomain variables.

## [11.1.0] - 2026-05-24

### Added

- **The Music Deck mark**: Added simplified vector `the-music-deck-mark.svg` (~6.5 KB), detailed raster master `the-music-deck-mark-full.png` (1254×1254, RGBA), and web-sized `the-music-deck-mark.png` (512×512, RGBA).
- **Favicons (the-music-deck)**: Added `favicon.svg` bundle under `src/favicons/the-music-deck/`.

### Fixed

- **Brand (the-music-deck)**: Fixed mark SVG img compatibility (`width`/`height`, `xlink:href` on `textPath`), playground Brand tab SVG preview (`<object>`), and replaced opaque JPEG raster with transparent PNG master and web export.

### Documentation

- **Playground**: **The Music Deck** mark (`the-music-deck-mark-full.png`, `.png`, `.svg`) appears under the **Brand** tab; favicon under **Favicons**. SVG previews use `<object>` for reliable rendering.

## [11.0.2] - 2026-04-19

### Documentation

- **Changelog (`11.0.1`)**: Corrected the `11.0.1` release notes to reflect that the refactor removed internal `readOrgDomain()` usage rather than moving that helper as a preserved API.

## [11.0.1] - 2026-04-18

### Changed

- **Build env internals**: Consolidated `ORG_DOMAIN` site-env helpers in `components/buildEnv/orgSiteEnv` and removed internal `readOrgDomain()` usage in favor of `ORG_DOMAIN` + `parseOrgSiteHref()`.

## [11.0.0] - 2026-04-18

### Changed

- **`ORG_DOMAIN` (breaking)**: Reverted to the env-key literal (`"ORG_DOMAIN"`) instead of the inlined domain value, to preserve the long-standing key-constant behavior.

### Added

- **`readOrgDomain()` (breaking vs `10.0.0`)**: Restored as the robust API for retrieving the inlined domain value baked into `dist/` at package build time.

## [10.0.1] - 2026-04-18

### Fixed

- **`ORG_DOMAIN` key constant**: Restored the `keyValue` wiring to the literal `"ORG_DOMAIN"` (instead of the inlined domain value), preserving key-constant semantics used by env helpers.

## [10.0.0] - 2026-04-18

### Changed

- **`ORG_DOMAIN` (breaking)**: Now holds the **inlined domain value** baked into `dist/` at package build time (e.g. `themusictree.org`), consistent with subdomain constants like `HTMT_FRONT_SUBDOMAIN`. Previously it held the key name string `"ORG_DOMAIN"`. Consumers can now use `ORG_DOMAIN` directly.

### Removed

- **`readOrgDomain()` (breaking)**: Removed — use `ORG_DOMAIN` directly instead.

## [9.0.1] - 2026-04-18

### Fixed

- **Build env define key**: Updated the inlined env key name to use `ORG_DOMAIN` directly instead of `readOrgDomain()`, ensuring consistent build-time constant replacement.

### Documentation

- **`ORG_DOMAIN` source**: Clarified that `ORG_DOMAIN` is sourced from the repository `DOMAIN_NAME` variable during package build.

## [9.0.0] - 2026-04-18

### Changed

- **`TheMusicTreeByline` / build env (breaking)**: Renamed build env variable **`ORG_URL`** → **`ORG_DOMAIN`** and matching exported constant **`ORG_URL`** → **`ORG_DOMAIN`**. Update `playground/.env`, CI repository variable mapping (`ORG_DOMAIN: ${{ vars.DOMAIN_NAME }}`), and any import of `ORG_URL`. The value no longer requires an `https://` prefix — supply a bare hostname (e.g. `themusictree.org`); `parseOrgSiteHref()` / `resolveOrgSiteHref()` still normalize to a full URL internally.

### Added

- **`readOrgDomain()`**: New exported function that returns the raw domain string baked into `dist/` at build time (e.g. `themusictree.org`), without the `https://` normalization applied by `resolveOrgSiteHref()`.

## [8.0.0] - 2026-04-18

### Changed

- **Build env / `socialBuildEnv`**: Renamed **`AUDIOMETA_SUBDOMAIN`** to **`AUDIOMETA_FRONT_SUBDOMAIN`** across required env wiring, playground docs, and exported inlined subdomain constants.

## [7.2.1] - 2026-04-18

### Added

- **Playground**: Header now displays the current package version (`v{version}`) next to the package name, injected at build time via Vite `define`.

## [7.1.0] - 2026-04-18

### Added

- **Build env / `socialBuildEnv`**: Required **`HTMT_API_SUBDOMAIN`**, **`GTMT_FRONT_SUBDOMAIN`**, and **`AUDIOMETA_FRONT_SUBDOMAIN`** (repository variables + **`playground/.env`**); tsup inlines them into **`dist/`**. Exports: key literals plus **`HTMT_API_SUBDOMAIN_VALUE`**, **`GTMT_FRONT_SUBDOMAIN_VALUE`**, **`AUDIOMETA_FRONT_SUBDOMAIN_VALUE`**.

## [7.0.8] - 2026-04-17

### Added

- **Playground**: Added an Environment Variables tab in the Components view to surface required social/build env keys directly in the demo app.

### Fixed

- **Build env / `socialBuildEnv`**: Made build-env value reads browser-safe so package consumers do not rely on `process` at runtime in browser contexts.

### Changed

- **Playground (Vite + VS Code)**: Enforced a strict dev-server port and added task/launch wiring via `.vscode/tasks.json` and `.vscode/launch.json` for consistent local startup.

## [7.0.7] - 2026-04-17

### Changed

- **Build env / `socialBuildEnv`**: Simplified exports by centralizing env reads and exposing explicit inlined value constants (`ORG_PYPI_URL`, `ORG_LINKEDIN_URL`, `ORG_X_URL`, `ORG_MASTODON_URL`, `ORG_YOUTUBE_URL`, `ORG_SPOTIFY_URL`, `ORG_DISCORD_URL`, `ORG_TIPEEE_URL`, `CONTACT_EMAIL_ADDRESS`).

## [7.0.6] - 2026-04-15

### Improved

- **Brand (audio-fingerprinter)**: Updated mark and dark mark exports (`.png` / `.svg`) with tighter square framing.

## [7.0.5] - 2026-04-15

### Added

- **Brand (audio-fingerprinter)**: Added `audio-fingerprinter-mark-dark.svg` and `audio-fingerprinter-mark-dark.png` dark variants.

### Improved

- **Brand (audio-fingerprinter)**: Tightened mark framing by reducing excess padding while preserving square dimensions for mark exports.

## [7.0.4] - 2026-04-15

### Added

- **Brand (audio-fingerprinter)**: Added `audio-fingerprinter-mark.svg` and `audio-fingerprinter-mark.png` under `src/brand/audio-fingerprinter/` and exposed them for package + playground brand catalog usage.

### Fixed

- **Playground**: Brand/favicon asset cards no longer use a `max-width` rule that could collapse previews to 0px; previews use a light checkerboard plate, cap displayed raster/SVG height, and show an error line if an image fails to load.

## [7.0.3] - 2026-04-14

### Added

- **Banners (audiometa)**: Added `audiometa-banner.png` under `src/banners/audiometa/` for package and playground banner catalog coverage.

## [7.0.2] - 2026-04-08

### Improved

- **Styles (`icon-links.css`)**: **Tipeee** raster wordmarks dim on hover on light and **`btmt-icon-link--dark`** links (they do not use **`currentColor`**).
- **Button**: Hover uses a slight **`brightness`** increase for clearer affordance.

### Documentation

- **CONTRIBUTING**: § **3.1 Interactive affordances (hover / focus)** — clickables should show hover/focus feedback; points to **`icon-links.css`** and **`.cursor/rules/interactive-hover.mdc`**.
- **Cursor rules**: **`interactive-hover.mdc`**; **`organization-assets-package.mdc`** Scope links it.

## [7.0.1] - 2026-04-08

### Fixed

- **IconBookOpen** / **DocLink**: Restored Lucide **`book-open`** geometry — inner fold uses **`a3`** arcs (not **`a4`**) meeting at **(12, 21)** with spine **`M12 7v14`**, fixing the misaligned bottom and center “tail” from the previous **`H3` + `a4`** path and **`V21.873`** spine tweak.

## [7.0.0] - 2026-04-07

### Documentation

- **Asset naming**: Lockup files must always include **`-lockup-horizontal`** or **`-lockup-stacked`** in the basename; bare **`…-lockup.<ext>`** without orientation is disallowed. **`docs/asset-naming.md`**, **`src/brand/README.md`**, **`docs/README.md`**, and Cursor rules updated. Existing committed lockups under **`src/brand/`** already use this pattern.
- **Conventions**: Dropped the **`-logo`** role from naming docs and Cursor rules—use **`-mark`**, **`-wordmark`**, or **`-lockup-horizontal` / `-lockup-stacked`** only. Root **`README.md`** structure line and brand import example updated; removed dead **`docs/logo-assets.md`** links.

### Added

- **Brand (the-music-tree)**: **`the-music-tree-mark-dark.svg`** and **`the-music-tree-mark-dark.png`** — symbol-only mark for dark UI (light ink knockout), paired with **`the-music-tree-mark.svg`** / **`.png`**.

### Changed

- **Components**: **`TheMusicTreeMarkLink`** uses **`the-music-tree-mark.svg`** and **`the-music-tree-mark-dark.svg`**; **`variant="onDark"`** selects the dark mark asset (no CSS invert).
- **Breaking — build env**: Renamed **`ORG_SPONSOR_BUTTON_URL`** to **`ORG_GITHUB_SPONSOR_BUTTON_URL`** (GitHub Sponsors iframe and **`SponsorSocialLink`** defaults). Update **`playground/.env`**, GitHub repository variables (**`publish.yml`** / Vercel sync), and any local shell exports.
- **Components (GitHub Sponsors)**: **`BtmtSponsorButton`** → **`GithubSponsorButton`**; **`BtmtSponsorButtonProps`** → **`GithubSponsorButtonProps`**. **`socialBuildEnv`** env key export **`ORG_GITHUB_SPONSOR_BUTTON_URL`** → **`GithubSponsorButtonUrl`** (string value unchanged: **`ORG_GITHUB_SPONSOR_BUTTON_URL`**). Previous names remain as **deprecated** aliases.

## [6.4.2] - 2026-04-07

### Improved

- **Playground**: Catalog rows for every exported **`SocialIcons`** / **`SocialIconsColored`** glyph (including **`IconGitHubSponsors`**, **`IconHeart`**, doc / discussion / information marks, and Tipeee).
- **Playground**: Labeled preview for **Grow the Music Tree** horizontal lockup SVG and full raster under **`brand/grow-the-music-tree/`** (alongside The Music Tree lockup PNGs).

## [6.4.1] - 2026-04-06

### Changed

- **Components (social)**: **`IconTipeee`** / **`IconTipeeeColored`** use **`icons/tipeee-mark.svg`** (wordmark) instead of a heart glyph.

### Fixed

- **Styles (`icon-links.css`)**: Raster social icons — avoid flex intrinsic **`min-width`** blow-ups; size **`img`** like SVGs; Tipeee wordmark slot and icon-only link width.

### Improved

- **Components (social)**: Tipeee — tighter SVG **`viewBox`**, wider slot for the horizontal mark, monochrome **`IconTipeee`** forced black (**`filter`**) with **`btmt-icon-link--dark`** invert for dark surfaces.

## [6.4.0] - 2026-04-06

### Added

- **Components (social)**: **`TipeeeSocialLink`** / **`TipeeeSocialLinkColored`** and **`IconTipeee`** / **`IconTipeeeColored`** — default **`href`** from **`ORG_TIPEEE_URL`** at package build; **`socialBuildEnv.ORG_TIPEEE_URL`**.

## [6.3.0] - 2026-04-06

### Added

- **Components (social)**: **`SpotifySocialLink`** / **`SpotifySocialLinkColored`** and **`IconSpotify`** / **`IconSpotifyColored`** — default **`href`** from **`ORG_SPOTIFY_URL`** at package build; **`socialBuildEnv.ORG_SPOTIFY_URL`**.
- **Components (social)**: **`DiscordSocialLink`** / **`DiscordSocialLinkColored`** and **`IconDiscord`** / **`IconDiscordColored`** — default **`href`** from **`ORG_DISCORD_URL`** at package build; **`socialBuildEnv.ORG_DISCORD_URL`**.

## [6.2.0] - 2026-04-06

### Added

- **Brand (the-music-tree)**: **`the-music-tree-mark.svg`** — same artwork as **`behind-the-music-tree-mark.svg`** (symbol-only mark for The Music Tree).

### Changed

- **Brand (the-music-tree)**: Renamed **`the-music-tree-mark.svg`** to **`the-music-tree-lockup-stacked.svg`** — the asset is a stacked (vertical) lockup, not a symbol-only **`-mark`**. Update imports that used the old filename.

### Improved

- **Playground**: **Brand** tab uses one sub-tab per project folder under **`dist/brand/`** (assets grouped by project slug).

## [6.1.0] - 2026-04-04

### Added

- **Components (links)**: **`DiscussionLink`** / **`DiscussionLinkColored`** and **`InformationLink`** / **`InformationLinkColored`** — same behavior as **`DocLink`** (**`href`** required; no package-build default). Icons: **`IconGitHubConversation`** / **`IconGitHubConversationColored`**, **`IconIssue`** / **`IconIssueColored`**.

### Documentation

- **README**: Document **`DiscussionLink`** and **`InformationLink`** with required **`href`**; remove title shield badges.
- **Playground**: Demo **`DiscussionLink`** and **`InformationLink`** alongside **`DocLink`** (explicit **`href`**, no shields).
- **README (Install)**: Recommend committing scope **registry** in the consumer repo **`.npmrc`** and keeping the **token** in a separate file (typically **`~/.npmrc`**), with **`NODE_AUTH_TOKEN`** and gitignored alternatives noted.

## [6.0.1] - 2026-04-04

### Added

- **Styles**: **`btmt-icon-link--dark`** in **`icon-links.css`** for light-on-dark icon links and pills; exported **`BTMT_ICON_LINK_DARK_CLASS`**.

### Fixed

- **Social icons (colored)**: GitHub and X marks stay light on **`btmt-icon-link--dark`** (they use near-black brand fills by default).

## [6.0.0] - 2026-04-04

### Breaking

- **DocSocialLink** / **DocSocialLinkColored** renamed to **`DocLink`** / **`DocLinkColored`**.

### Added

- **Styles**: **`@behindthemusictree/assets/styles/icon-links.css`** — canonical styling for icon+label links (**`Social*Link`**, **`DocLink`**, and colored variants: icon tile + pill-with-text). Exported constants **`BTMT_ICON_LINK_CLASS`** and **`BTMT_ICON_LINK_WITH_TEXT_CLASS`** for overrides or host CSS.

### Changed

- **Components (links)**: **`Social*Link`** / **`DocLink`** (and colored variants) apply canonical **`btmt-icon-link`** classes by default; import **`icon-links.css`** once for the intended look. Use **`unstyled`** for the previous bare-anchor behavior without default classes.

## [5.0.1] - 2026-04-04

### Fixed

- **Publish**: **`5.0.1`** republish so **`dist/`** matches source: **`SponsorSocialLink`** / **`SponsorSocialLinkColored`** inline **`ORG_SPONSOR_BUTTON_URL`** only (no **`ORG_SPONSORS_URL`**). Upgrade if installed **`5.0.0`** still contained the old key in compiled output.

## [5.0.0] - 2026-04-04

### Breaking

- **`socialBuildEnv`**: removed **`ORG_SPONSORS_URL`**. **`SponsorSocialLink`** / **`SponsorSocialLinkColored`** default URL is **`ORG_SPONSOR_BUTTON_URL`** only (same as **`BtmtSponsorButton`**). Drop the **`ORG_SPONSORS_URL`** repository variable from CI if present.

### Changed

- Build / publish: **`ORG_SPONSORS_URL`** no longer required in **`assert-org-url.mjs`**, **`publish.yml`**, or **`tsup`**.

## [4.3.0] - 2026-04-04

### Added

- **Components (social)**: **`DocSocialLink`** / **`DocSocialLinkColored`** — documentation link with open-book icon; **no** build-time URL default (**`href`** required). **`IconBookOpenColored`** in **`SocialIconsColored`**.

### Improved

- **Playground**: **`SponsorSocialLink`** / **`SponsorSocialLinkColored`** — included in social link demo rows (**`ORG_SPONSORS_URL`** default).
- **Playground**: **`DocSocialLink`** demo row with explicit **`href`**.

## [4.2.1] - 2026-04-03

### Fixed

- **Components (social)**: **`IconMastodon`** / **`IconMastodonColored`** — replaced truncated path with full **Simple Icons** (CC0) mark.
- **Playground**: **`showText`** social rows — SVGs had no size (**`socialBrandIconClass`** is Tailwind-only); **`.social-link-btn svg`** now **1.5rem** in **`index.css`** so icon + label render together.

### Documentation

- **Playground**: **`social-link-btn--with-text`** — rounded pill (**`border-radius: 9999px`**), light border, white plate, subtle shadow; demo labels updated.
- **Playground**: demo label clarifies Tailwind vs **`index.css`** for social SVG sizing.
- **`socialLinkSizing`**: JSDoc notes Tailwind is required for **`social*IconClass`** strings.

## [4.2.0] - 2026-04-03

### Added

- **Components (social)**: **`Social*Link`** / **`*SocialLinkColored`** — anchor components with optional **`href`**, **`text`**, **`title`**, **`showText`**, **`className`**, **`iconClassName`**; defaults inlined at package build from **`ORG_GITHUB_URL`**, **`ORG_PYPI_URL`**, **`ORG_LINKEDIN_URL`**, **`ORG_X_URL`**, **`ORG_MASTODON_URL`**, **`ORG_YOUTUBE_URL`**, **`CONTACT_EMAIL`**, **`ORG_URL`** (website). **`socialBuildEnv`** exports matching env var name constants.
- **Components (social)**: **`SocialIconsColored`** — **`IconGithubColored`**, **`IconPypiColored`**, **`IconLinkedInColored`**, **`IconTwitterColored`**, **`IconMastodonColored`**, **`IconYouTubeColored`**, **`IconEmailColored`**, **`IconWebsiteColored`** (fixed brand-tint fills/strokes, exported from **`@behindthemusictree/assets/components`**).
- **BtmtSponsorButton**: GitHub Sponsors-style **iframe**; **`src`** is **`ORG_SPONSOR_BUTTON_URL`**, inlined at package build (**tsup**). **`ORG_SPONSOR_BUTTON_URL`** is **required** for **`npm run build`** / **`npm run dev`** (**`scripts/assert-org-url.mjs`**). **Publish** workflow passes **`vars.ORG_SPONSOR_BUTTON_URL`** (required alongside **`DOMAIN_NAME`**); **`run-playground.mjs`** merges **`playground/.env`** into the root build env.

### Changed

- **Playground**: **`npm run dev`** and **`npm run build`** under **`playground/`** run **`scripts/assert-org-url.mjs`** first so a missing **`ORG_SPONSOR_BUTTON_URL`** or any other required key fails before Vite (aligned with root **`npm run build`**). **`run-playground.mjs`** relies on that assert instead of a separate **`ORG_URL`**-only check.
- **Publish workflow / docs / Cursor rules**: **`publish.yml`** build **`env`** keys are documented as **required** (no “optional” wording). New **`.cursor/rules/publish-workflow.mdc`**; **`organization-assets-package.mdc`** publishing note aligned.
- **Playground social URLs**: **`ORG_GITHUB_URL`**, **`ORG_LINKEDIN_URL`** (was **`LINKEDIN_URL`**), **`ORG_MASTODON_URL`** (was **`MASTODON_URL`**), **`ORG_PYPI_URL`**, **`ORG_X_URL`**, **`ORG_YOUTUBE_URL`**, etc. are **required** for **`npm run build`** / **`npm run dev`** ( **`scripts/assert-org-url.mjs`** + **`publish.yml`**). **`ORG_GITHUB_REPO`**, **`ORG_DOCS_URL`**, **`ORG_SUPPORT_URL`**, and related playground icons (Issues, Discussions, Documentation, Support/heart) removed.

### Documentation

- **Playground**: tabbed catalog (**Components**, **Brand**, **Banners**, **Favicons**); **`Social*Link`** demos (defaults from **`dist/`** after root **`npm run build`**); override row with **`href`** / **`text`** / **`showText`**. Removed Vite **`define`** for social env (no **`playgroundSocialEnv.ts`**).
- **Cursor rules / CONTRIBUTING**: playground visibility for **every** new **`dist/`** surface is mandatory in the same PR; **`organization-assets-package.mdc`**, **`static-assets-and-docs.mdc`**, and Pre-PR **Build** checklist aligned.

## [4.1.0] - 2026-04-03

### Added

- **Components (social)**: SVG icons (**`IconBookOpen`**, **`IconGithub`**, **`IconPypi`**, **`IconLinkedIn`**, **`IconTwitter`**, **`IconMastodon`**, **`IconYouTube`**, **`IconEmail`**, **`IconWebsite`**, **`IconIssue`**, **`IconGitHubConversation`**, **`IconHeart`**) and **`socialLinkSizing`** utilities, exported from **`@behindthemusictree/assets/components`**.

### Documentation

- **Playground**: demo grid for social icons.

## [4.0.0] - 2026-04-03

### Changed

- **TheMusicTreeByline** / **TheMusicTreeHorizontalLink** (breaking): **`href`** is no longer a prop; **`ORG_URL`** is **required only when building this package** (no default). **tsup `define`** embeds **`ORG_URL`** into published **`dist/`** so **consuming apps** need no org env. **`getOrgSiteHref`** removed; use **`resolveOrgSiteHref()`** if you need the same string outside the component. **`npm run build`** / **`npm run dev`** run **`scripts/assert-org-url.mjs`**; **`npm run playground`** uses **`scripts/run-playground.mjs`**. **Publish** workflow sets **`ORG_URL: ${{ vars.DOMAIN_NAME }}`**. **`DEFAULT_ORG_SITE_HREF`** removed.
- **Brand (The Music Tree)**: **`the-music-tree-lockup-horizontal-dark.svg`** — explicit knockout metadata (**`fill="none"`** root, comment); same paths as before.
- **Brand (The Music Tree)**: **`the-music-tree-lockup-horizontal.svg`** — same knockout header treatment as the dark SVG (explicit transparent background, **`fill="none"`** root).
- **TheMusicTreeByline** / **TheMusicTreeHorizontalLink**: both variants use **SVG knockouts** (**`the-music-tree-lockup-horizontal.svg`** / **`-dark.svg`**) for a transparent plate; link and **`<img>`** set **`backgroundColor: transparent`**. Web-sized **PNG** knockouts remain for raster-only use.

### Documentation

- **Playground**: **TheMusicTreeHorizontalLink** variant grid (**default** vs **`onDark`**, checkerboard + dark tiles, code snippets); **Brand lockup PNG** raster row; **Vite** watches the linked package **`dist/`**; intro text notes rebuild/restart when the catalog looks stale.
- **CONTRIBUTING** / **`.cursor/rules`**: new components and published assets **must** be reflected in the **`playground/`** catalog (same change as the feature); **`organization-assets-package.mdc`** documents the requirement.

### Added

- **Brand (The Music Tree)**: **`the-music-tree-lockup-horizontal-dark.png`** — **800×250** RGBA knockout (light ink, transparent background), aligned with the web-sized default lockup PNG.

## [3.0.2] - 2026-04-03

### Documentation

- **README**: **Install** — step-by-step GitHub Packages setup (scope **`.npmrc`**, PAT / **`NODE_AUTH_TOKEN`**, CI, pinning, pnpm/Yarn).
- **docs/README**: **Installing the package** — index entry linking to the root README **Install** section.
- **CONTRIBUTING**: **Installing the package in an app** — points to the root **README** **Install** section for GitHub Packages when not using **`npm link`**.

## [3.0.1] - 2026-04-03

### Added

- **Brand (The Music Tree)**: **`the-music-tree-lockup-horizontal-dark.svg`** — light ink on transparent for dark UIs (same geometry as **`the-music-tree-lockup-horizontal.svg`**).

### Changed

- **Brand (The Music Tree)**: `the-music-tree-lockup-horizontal.png` is now a web-sized raster (**800×250**); the previous **1920×600** file ships as **`the-music-tree-lockup-horizontal-full.png`** for large displays or print.
- **TheMusicTreeByline** / **TheMusicTreeHorizontalLink**: **`variant="onDark"`** now uses the dark SVG instead of a CSS **`filter`** on the PNG.

### Improved

- **TheMusicTreeByline** / **TheMusicTreeHorizontalLink**: hover (and **`:focus-visible`** keyboard focus) slightly change the lockup aspect via **`transform: scale`**; focus shows a **2px** ring using **`currentColor`**.

## [3.0.0] - 2026-04-03

### Added

- **TheMusicTreeHorizontalLink**: exported alias for the horizontal lockup link (same as **TheMusicTreeByline**); playground shows default and **`variant="onDark"`** demos.
- **Brand**: `src/brand/the-music-tree/the-music-tree-lockup-horizontal.svg` and **`.png`** (interim copies until the official horizontal lockup ships).
- **getOrgSiteHref** / **parseOrgSiteHref**: **`getOrgSiteHref()`** for Next.js; **`parseOrgSiteHref`** for Vite + **`import.meta.env`** (dependency code does not get reliable `process.env` replacement). Dev dependency **`@types/node`** added for `process.env` typing in declaration emit.

### Fixed

- **Playground (Vite)**: blank page — `getOrgSiteHref()` lives in a pre-bundled dependency where `process` is undefined; playground now uses **`parseOrgSiteHref(import.meta.env.NEXT_PUBLIC_DOMAIN_NAME)`** and **`vite.config`** `define` + **`optimizeDeps.esbuildOptions.define`**.

### Changed

- **TheMusicTreeByline** (breaking): uses **only** `the-music-tree-lockup-horizontal.png` as the image (no separate label). **`href` is required** — **`getOrgSiteHref()`** (Next) or **`parseOrgSiteHref(…)`** (Vite + **`import.meta.env`**). **`NEXT_PUBLIC_DOMAIN_NAME`** mirrors GitHub **`DOMAIN_NAME`**. **No default URL**. Default image height **56px**, width **auto**. **`variant="onDark"`** inverts the whole lockup for dark UIs.

### Documentation

- **README**: TheMusicTreeByline lockup + **`getOrgSiteHref()`** (no default URL).
- **CONTRIBUTING**: Playground requires **`NEXT_PUBLIC_DOMAIN_NAME`** via `playground/.env`.
- **README**: Added ecosystem section with portfolio link (`themusictree.org`) and clarified portfolio source (`the-music-tree-frontend`) for this shared package.

## [1.1.2] - 2026-04-01

### Added

- **Audiometa greyscale logo**: `audiometa-logo-greyscale.svg` (sRGB luminance filter) for contexts that need a committed greyscale mark

### Documentation

- **Logo assets**: Document when to ship `-logo-greyscale.svg` versus using CSS; note filter-`id` uniqueness for inline SVG

### CI

- **GitHub Actions Runtime**: Upgraded `actions/checkout` and `actions/setup-node` to v5 to stay compatible with the Node.js 24 transition on GitHub-hosted runners; publish job now uses Node.js 22.

## [1.1.1] - 2026-03-30

### Fixed

- **Release Script**: Use annotated tags (`git tag -a`) so `git push --follow-tags` reliably pushes the tag to the remote

### Changed

- **Publish Workflow**: Trigger on `v*` tag push instead of GitHub Release event — `npm run release` is now the only step needed to publish

## [1.1.0] - 2026-03-30

### Added

- **GitHub Packages Publishing**: Added GitHub Actions workflow to automatically publish to GitHub Packages on release
- **Package Identity**: Set package name to `@behindthemusictree/assets` with `publishConfig` pointing to GitHub Packages registry

## [1.0.0] - 2026-03-30

### Added

- **Components**: Reusable React components (e.g. `Button`)
- **Design Tokens**: Colors, spacing, and radius as CSS custom properties and JS exports
- **Icons**: Organization and project logo assets under `src/icons/`
- **Favicons**: Per-project favicon bundles under `src/favicons/` (behind-the-music-tree, grow-the-music-tree)
- **Styles**: Global resets and shared CSS importing design tokens
- **Hooks**: Shared React hooks
- **Utils**: Helpers and constants
- **Build Pipeline**: tsup compilation (ESM + CJS + `.d.ts`) with post-build copy for static assets
