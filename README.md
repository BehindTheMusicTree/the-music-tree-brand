# @behindthemusictree/brand

Shared assets (components, design tokens, marks, styles, hooks, utils) for React projects across the organization.

## Ecosystem

Built inside the **[BehindTheMusicTree](https://github.com/BehindTheMusicTree)** ecosystem.

Want the big picture? Explore the full project universe on **[themusictree.org](https://themusictree.org)**. This package is **`@behindthemusictree/brand`** — the shared components, tokens, and marks used by our web apps.

The portfolio website content lives in **[the-music-tree-frontend](https://github.com/BehindTheMusicTree/the-music-tree-frontend)**; this README focuses on developing, versioning, and publishing this package.

## Structure

- **components** – Reusable brand-identity React components (e.g. `TheMusicTreeByline`, `GithubSponsorButton`). Generic UI primitives (buttons, inputs, tables...) live in [`@behindthemusictree/ui`](https://github.com/BehindTheMusicTree/ui) instead.
- **tokens** – Design tokens (colors, spacing, radius) as CSS vars and JS
- **marks** – Static marks, lockups, and wordmarks ([`packages/brand/docs/asset-naming.md`](packages/brand/docs/asset-naming.md), [`packages/brand/src/marks/README.md`](packages/brand/src/marks/README.md))
- **favicons** – Per-project favicon bundles (`src/favicons/<project>/`)
- **styles** – Global resets and shared CSS (import tokens)
- **hooks** – Shared React hooks
- **utils** – Helpers and constants

## Install

The package is published to the public **[npm registry](https://www.npmjs.com/package/@behindthemusictree/brand)** with [provenance](https://docs.npmjs.com/generating-provenance-statements). No `.npmrc` or token is needed.


```bash
pnpm add @behindthemusictree/brand
```

Pin a version when you want an explicit upgrade path:

```bash
pnpm add @behindthemusictree/brand@3.0.1
```

**pnpm** and **Yarn** can use the same **`@behindthemusictree:registry`** and host auth settings; see their docs for equivalent **`.npmrc`** / **`.yarnrc.yml`** layout if you do not use npm.

## Usage

Use subpath imports so apps only pull what they need:

```tsx
import { TheMusicTreeByline } from "@behindthemusictree/brand/components";
import { colors, spacing } from "@behindthemusictree/brand";
import "@behindthemusictree/brand/styles";
```

**TheMusicTreeByline** — single clickable **SVG knockout** (transparent outside the horizontal lockup; link and image use **`backgroundColor: transparent`**). The **`href`** is **not a prop**: when **this package** is built for publish, **`ORG_DOMAIN`** (hostname, no protocol) is read from GitHub repository variable **`DOMAIN_NAME`** and **embedded in `dist/`** via **tsup `define`**. **Consuming apps** normally need **no** **`ORG_DOMAIN`** env — they install a pre-built package from npm. **Maintainers:** configure GitHub repository variable **`DOMAIN_NAME`** for **`.github/workflows/publish.yml`** (see **Publishing** below); locally, export **`ORG_DOMAIN`** before running **`pnpm build`** or **`pnpm dev`**. **`resolveOrgSiteHref()`** and **`parseOrgSiteHref()`** are exported if you need the same URL string in app code. Default variant uses **`the-music-tree-lockup-horizontal.svg`**; **`variant="onDark"`** uses **`the-music-tree-lockup-horizontal-dark.svg`**. Default display height **56px**, width **auto**. **Web-sized PNGs** (**`the-music-tree-lockup-horizontal.png`** / **`-dark.png`**) ship for raster-only contexts (email, CMS); import from **`@behindthemusictree/brand/marks/the-music-tree/...`**.

```tsx
import { TheMusicTreeByline } from "@behindthemusictree/brand/components";

<TheMusicTreeByline
  variant="onDark"
  className="border border-white/15 bg-white/5 p-2 hover:bg-white/10"
/>;
```

BehindTheMusicTree symbol-only mark (PNG):

```tsx
import btmtMark from "@behindthemusictree/brand/marks/behind-the-music-tree/behind-the-music-tree-mark.png";
```

Project favicon bundle:

```tsx
import faviconSvg from "@behindthemusictree/brand/favicons/behind-the-music-tree/favicon.svg";
```

Naming rules: [`packages/brand/docs/asset-naming.md`](packages/brand/docs/asset-naming.md); mark formats: [`packages/brand/src/marks/README.md`](packages/brand/src/marks/README.md).

**DocLink**, **DiscussionLink**, and **InformationLink** (and `*Colored` variants) are styled icon links for documentation, discussion, and general information. They have **no URL baked in at package build** — pass **`href`** (and optional **`text`**, **`showText`**) from your app. Import **`@behindthemusictree/brand/styles/icon-links.css`** once for the default tile and pill styles.

```tsx
import {
  DiscussionLink,
  DocLink,
  InformationLink,
} from "@behindthemusictree/brand/components";
import "@behindthemusictree/brand/styles/icon-links.css";

<DocLink href="https://example.com/docs" showText />
<DiscussionLink href="https://github.com/org/repo/discussions" showText />
<InformationLink href="https://example.com/about" showText />
```

Or from the main entry:

```tsx
import { TheMusicTreeByline, colors } from "@behindthemusictree/brand";
```

Ensure design tokens are loaded (e.g. import `@behindthemusictree/brand/styles` once in your app root, or import `@behindthemusictree/brand/tokens/theme.css` directly).

## Publishing

A GitHub Actions workflow automatically publishes to npm (trusted publishing, no token) whenever a version tag is pushed. To cut a new version, from `develop`:

```bash
pnpm run release patch   # or minor / major
```

This creates `release/<version>`, bumps the version, stamps the changelog, and opens PRs into `main` and `develop`. Once the `main` PR merges, run `pnpm run tag-release` on `main` to tag and stage the version on npm, then approve it with `npm stage approve <stage-id>` (2FA). See [CONTRIBUTING.md](CONTRIBUTING.md#6-releasing-for-maintainers) for details.

The [publish workflow](.github/workflows/publish.yml) supplies the build-time
variables from GitHub repository variables (including `DOMAIN_NAME` as
`ORG_DOMAIN`). `packages/brand/tsup.config.ts` embeds selected values into the
package. Check the workflow and build configuration when updating those values.

## Build

From the repository root:

```bash
pnpm install
pnpm build
pnpm test
```

The workspace builds the package into `packages/brand/dist` and then builds the
playground. The build does not require an environment file, but missing build-time
values are embedded as empty strings. Export the values needed for the components
you are testing before building. `packages/brand/.env.example` shows example
keys; only values configured in `packages/brand/tsup.config.ts` are embedded.
For example, `ORG_DOMAIN` is needed for the byline's default link. Consumers of a
published package do not need these variables to use its prebuilt output.

## Local development

After installing dependencies, export the organization domain, build once and
start the library watcher and Vite playground together. Without `ORG_DOMAIN`,
the organization link components throw when rendered:

```bash
export ORG_DOMAIN=themusictree.org
pnpm build
pnpm dev
```

The playground lives in `apps/playground` and serves on port 5174 with a strict
port setting. The library watcher rebuilds `packages/brand/dist` as source changes;
static asset previews read the package's `src` directories. Set the build-time
variables in the shell before starting the watcher, and restart it after changing
them so the package is rebuilt with the new values.
