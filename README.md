# @behindthemusictree/brand

Shared assets (components, design tokens, marks, styles, hooks, utils) for React projects across the organization.

## Ecosystem

Built inside the **[BehindTheMusicTree](https://github.com/BehindTheMusicTree)** ecosystem.

Want the big picture? Explore the full project universe on **[themusictree.org](https://themusictree.org)**. This package is **`@behindthemusictree/brand`** — the shared components, tokens, and marks used by our web apps.

The portfolio website content lives in **[the-music-tree-frontend](https://github.com/BehindTheMusicTree/the-music-tree-frontend)**; this README focuses on developing, versioning, and publishing this package.

## Structure

- **components** – Reusable brand-identity React components (e.g. `TheMusicTreeByline`, `GithubSponsorButton`). Generic UI primitives (buttons, inputs, tables...) live in [`@behindthemusictree/ui`](https://github.com/BehindTheMusicTree/ui) instead.
- **tokens** – Design tokens (colors, spacing, radius) as CSS vars and JS
- **marks** – Static marks, lockups, and wordmarks ([`docs/asset-naming.md`](docs/asset-naming.md), [`src/marks/README.md`](src/marks/README.md))
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
import { colors, spacing } from "@themusictree/marks/tokens";
import "@behindthemusictree/brand/styles";
```

**TheMusicTreeByline** — single clickable **SVG knockout** (transparent outside the horizontal lockup; link and image use **`backgroundColor: transparent`**). The **`href`** is **not a prop**: when **this package** is built for publish, **`ORG_DOMAIN`** (hostname, no protocol) is read from GitHub repository variable **`DOMAIN_NAME`** and **embedded in `dist/`** via **tsup `define`**. **Consuming apps** normally need **no** **`ORG_DOMAIN`** env — they install a pre-built package from npm. **Maintainers:** configure GitHub repository variable **`DOMAIN_NAME`** for **`.github/workflows/publish.yml`** (see **Publishing** below); locally, set **`ORG_DOMAIN`** in **`playground/.env`** when running **`pnpm run build`** / **`pnpm run dev`**. **`resolveOrgSiteHref()`** and **`parseOrgSiteHref()`** are exported if you need the same URL string in app code. Default variant uses **`the-music-tree-lockup-horizontal.svg`**; **`variant="onDark"`** uses **`the-music-tree-lockup-horizontal-dark.svg`**. Default display height **56px**, width **auto**. **Web-sized PNGs** (**`the-music-tree-lockup-horizontal.png`** / **`-dark.png`**) ship for raster-only contexts (email, CMS); import from **`@behindthemusictree/brand/marks/the-music-tree/...`**.

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

Naming rules: [`docs/asset-naming.md`](docs/asset-naming.md); mark formats: [`src/marks/README.md`](src/marks/README.md).

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

Ensure design tokens are loaded (e.g. import `@behindthemusictree/brand/styles` once in your app root, or import `@behindthemusictree/brand/tokens` and include the tokens CSS in your build).

## Publishing

A GitHub Actions workflow automatically publishes to npm (trusted publishing, no token) whenever a version tag is pushed. To cut a new version, from `develop`:

```bash
pnpm run release patch   # or minor / major
```

This creates `release/<version>`, bumps the version, stamps the changelog, and opens PRs into `main` and `develop`. Once the `main` PR merges, run `pnpm run tag-release` on `main` to tag and start publishing. See [CONTRIBUTING.md](CONTRIBUTING.md#6-releasing-for-maintainers) for details.

The **Publish** workflow passes every key in **`publish.yml`**'s **`pnpm run build`** **`env`** block ( **`ORG_DOMAIN`** from GitHub repository variable **`DOMAIN_NAME`**, **`ORG_GITHUB_SPONSOR_BUTTON_URL`**, and all playground social URLs—see **`playground/.env.example`**). Define the matching **GitHub repository variables** or the build fails. **tsup** inlines **`ORG_DOMAIN`**, **`ORG_GITHUB_SPONSOR_BUTTON_URL`**, and those social URLs into **`dist/`** (lockup, **`GithubSponsorButton`** iframe, and **`Social*Link`** defaults); **`scripts/assert-org-url.mjs`** enforces the same keys locally and in CI.

## Build

```bash
pnpm install
cp playground/.env.example playground/.env   # then edit values
pnpm run build
```

**`scripts/assert-org-url.mjs`** requires **`playground/.env`** (or equivalent shell exports) to define **`ORG_DOMAIN`**, **`ORG_GITHUB_SPONSOR_BUTTON_URL`**, and every playground social key listed in **`playground/.env.example`**. None of these are needed in downstream apps that install the published package. Output is in **`dist/`**.

## Local development

From this repo: `pnpm link --global`. In your React app: `pnpm link --global @behindthemusictree/brand`. Use a filled **`playground/.env`** (or export the same keys) for **`pnpm run dev`**—same **`assert-org-url`** gate as **`pnpm run build`**.

**Playground:** `pnpm run playground` merges **`playground/.env`** into the environment for the root **`pnpm run build`**, then starts the Vite dev server. Every key in **`playground/.env.example`** is required for that root build.
