# Contributing Guidelines

Thank you for your interest in contributing!
This project is currently maintained by a solo developer, but contributions, suggestions, and improvements are welcome.

## Table of Contents

- [Contributors vs Maintainers](#contributors-vs-maintainers)
  - [Roles Overview](#roles-overview)
  - [Infrastructure & Automation Permissions](#infrastructure--automation-permissions)
- [Development Workflow](#development-workflow)
  - [0. Fork & Clone](#0-fork--clone)
  - [1. Environment Setup](#1-environment-setup)
    - [Installing the package in an app](#installing-the-package-in-an-app)
    - [Component and asset preview (playground)](#component-and-asset-preview-playground)
  - [2. Branching](#2-branching)
  - [3. Developing](#3-developing)
    - [3.1 Interactive affordances (hover / focus)](#31-interactive-affordances-hover--focus)
  - [4. Committing](#4-committing)
  - [5. Pull Request Process](#5-pull-request-process)
    - [5.1. Pre-PR Checklist](#51-pre-pr-checklist)
    - [5.2. Opening a Pull Request](#52-opening-a-pull-request)
  - [6. Releasing _(For Maintainers)_](#6-releasing-for-maintainers)
- [License & Attribution](#license--attribution)

## Contributors vs Maintainers

### Roles Overview

**Contributors**

Anyone can be a contributor by:

- Submitting bug reports or feature requests via GitHub Issues
- Proposing code changes through Pull Requests
- Improving documentation
- Adding or updating components, tokens, marks, or styles

**Maintainers**

The maintainer(s) are responsible for:

- Reviewing and merging Pull Requests
- Managing releases and versioning
- Ensuring code quality and project direction
- Maintaining the project's infrastructure
- Holding a release when needed (disable auto-merge on the release-please PR, or close it)

**Important:** Even maintainers must go through Pull Requests. No direct commits to `main` are allowed.

### Infrastructure & Automation Permissions

**Repository automation policies (maintainer-only):**

- Publishing workflows (`.github/workflows/publish.yml`) — publishes the package to npm (trusted publishing)
- Other automation workflows that affect repository management

**What contributors can do:**

- Suggest improvements or report issues via GitHub Issues
- Propose changes to any source code, components, tokens, or documentation via PRs

## Development Workflow

### 0. Fork & Clone

**For contributors:**

1. Fork the repository on GitHub
2. Clone your fork:

   ```bash
   git clone https://github.com/YOUR-USERNAME/the-music-tree-brand.git
   cd the-music-tree-brand
   ```

**For maintainers:**

Clone the main repository directly:

```bash
git clone https://github.com/BehindTheMusicTree/the-music-tree-brand.git
cd the-music-tree-brand
```

### 1. Environment Setup

Ensure you have:

- **Node.js 20+**
- **pnpm**

Install dependencies:

```bash
pnpm install
```

Build the package:

```bash
pnpm run build
```

For local development with watch mode:

```bash
pnpm run dev
```

To test in a consuming app locally, use `pnpm link --global`:

```bash
# In this repo
pnpm link --global

# In your React app
pnpm link --global @behindthemusictree/brand
```

#### Installing the package in an app

To depend on a **published** version from npm (instead of `pnpm link --global`), install it — no token needed. See **[README — Install](README.md#install)**.

#### Component and asset preview (playground)

The Vite catalog in `apps/playground` previews components and static assets from
the workspace package. Install dependencies once from the repository root, then
set the organization domain, then build and run the package watcher and
playground together. The organization link components throw when rendered if
`ORG_DOMAIN` is missing:

```bash
pnpm install
export ORG_DOMAIN=themusictree.org
pnpm build
pnpm dev
```

The playground uses port 5174 with strict port checking. Its package dependency is
linked through the workspace. Component imports use the built package; the asset
catalog reads marks, banners and favicons from `packages/brand/src` through the
`@brand-dist` Vite alias.

The package build embeds environment values into `packages/brand/dist`. It can
build with missing values, which are embedded as empty strings; export the values
needed for the component being previewed before building or starting the watcher.
See `packages/brand/.env.example` for example keys and
`packages/brand/tsup.config.ts` for the values embedded by the build. Restart the watcher after
changing shell variables. Published builds get their values from the repository
variables mapped in `.github/workflows/publish.yml`.

### 2. Branching

This repo is trunk-based: `main` is the only long-lived branch and the GitHub default branch.

- Branch from `main`, using a descriptive name; include issue numbers when applicable: `feature/123-add-card-component`
- Open a pull request targeting `main` with a Conventional Commit title (see [§5.2](#52-opening-a-pull-request))
- Urgent fixes follow the same path: a `fix:` pull request into `main` releases a patch

### 3. Developing

- **New TS entry points**: add or extend an entry in `packages/brand/tsup.config.ts` and the matching `exports` in `packages/brand/package.json`.
- **Static assets**: add marks, favicons and banners under `packages/brand/src/marks`, `packages/brand/src/favicons` or `packages/brand/src/banners`. The package exports those source directories; update exports and the package `files` list if adding a new asset category.
- **Components**: follow existing component patterns and import style; generic interactive UI primitives live in [`@behindthemusictree/ui`](https://github.com/BehindTheMusicTree/ui).
- **Playground (required)**: preview new exported components and published assets in the same change. Add component demos in [`apps/playground/src/App.tsx`](apps/playground/src/App.tsx); the asset globs in [`apps/playground/src/distAssetGlobs.ts`](apps/playground/src/distAssetGlobs.ts) read the package source asset directories. Extend them or add an explicit preview if needed.
- **TypeScript**: `tsconfig.json` uses `"moduleResolution": "bundler"` — keep it compatible with tsup.

#### 3.1 Interactive affordances (hover / focus)

Shipped **clickable** UI (`<a>`, `<button>`, and similar) should show a visible **hover** change (and **focus-visible** when the element is focusable). **SVG** marks wired to **`currentColor`** usually inherit this from [`packages/brand/src/styles/icon-links.css`](packages/brand/src/styles/icon-links.css). **Raster** or fixed-color marks need an explicit hover style (for example **Tipeee** uses **`opacity`** on the **`img`** in that stylesheet). Third-party embeds we do not style (for example the **`GithubSponsorButton`** iframe) are exempt.

After structural changes, run a full build to verify:

```bash
pnpm run build
```

### 4. Committing

We follow a structured commit format inspired by [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

- Format: `<type>(<scope>): <summary>`
- Types: `feat`, `fix`, `refactor`, `docs`, `chore`, `perf`, `style`, `ci`
- Use imperative mood ("Add…", "Fix…", "Update…")

**Examples:**

```
feat(components): add Card component with outlined variant
fix(tokens): export missing surface color token
chore: update tsup to v9
docs: add favicon bundle documentation
```

### 5. Pull Request Process

#### 5.1. Pre-PR Checklist

Before submitting a Pull Request:

**1. Code Quality**

- Follow existing component and import style
- TypeScript compiles without errors

**2. Build**

- `pnpm run build` completes successfully
- New exports are accessible from the built package
- **Playground (required):** Preview new or changed exported components and published assets in `apps/playground`; update [`apps/playground/src/distAssetGlobs.ts`](apps/playground/src/distAssetGlobs.ts) and/or [`apps/playground/src/App.tsx`](apps/playground/src/App.tsx), build, then confirm in the dev server.

**3. Documentation**

- Update README if adding new features or changing behavior
- Do not edit `CHANGELOG.md`: release-please generates it from pull request titles
- Update documentation when asset conventions change: global guides in `packages/brand/docs/` and colocated specs in `packages/brand/src/*/README.md` (see [`packages/brand/docs/README.md`](packages/brand/docs/README.md)). Any **multi-section** Markdown file in the repo should include a **Table of contents** linking each `##` section ([`CHANGELOG.md`](CHANGELOG.md) and one-section stubs exempt).

**4. Git Hygiene**

- Commit messages follow the convention above
- Branch is up to date with `main`
- No accidental commits (large files, secrets, personal configs)

#### 5.2. Opening a Pull Request

**PR Title Naming Convention:** squash merges use the title as the commit subject, which determines the next release version and changelog entry (`feat` minor, `fix` patch, `!` breaking). `pr-title.yml` checks it.

```
<type>(<optional-scope>): <short imperative description>
```

**Examples:**

- `feat(components): add Card component with outlined variant`
- `fix(tokens): export missing surface color token`
- `docs: update contributing guide`
- `chore: update tsup to v9`

**PR Description should include:**

- Clear description of changes
- Reference related issues (e.g., "Fixes #123")
- Note any breaking changes

### 6. Releasing _(For Maintainers)_

On pushes to `main`, `publish.yml` validates release intent using `.github/release-policy.json`. When a version increases, CI creates an annotated `vX.Y.Z` tag, verifies the exact tagged commit, and publishes the built package with npm provenance, using the repository variables mapped in the workflow for build-time values. It creates the GitHub Release after npm succeeds. On retry, an existing npm version is accepted only when its SHA-512 integrity matches the newly packed artifact. Use **Re-run failed jobs** to retry publication; never move a tag or bump again to repair a partial publication.

Release-please reconciles after successful publication and on ordinary pushes. It opens or updates a release pull request with the package version (`packages/brand/package.json`), the root changelog and the release manifest. That pull request squash-merges after the required checks pass. Keep the private workspace root at `0.0.0`. CI owns release tags.

## License & Attribution

All contributions are made under the project's license.
You retain authorship of your code; the project retains redistribution rights under the same license.
