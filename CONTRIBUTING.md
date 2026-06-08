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
- Adding or updating components, tokens, brand assets, or styles

**Maintainers**

The maintainer(s) are responsible for:

- Reviewing and merging Pull Requests
- Managing releases and versioning
- Ensuring code quality and project direction
- Maintaining the project's infrastructure
- Moving "Unreleased" changelog entries to versioned sections during releases

**Important:** Even maintainers must go through Pull Requests. No direct commits to `main` are allowed.

### Infrastructure & Automation Permissions

**Repository automation policies (maintainer-only):**

- Publishing workflows (`.github/workflows/publish.yml`) — handles package publishing to GitHub Packages
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
pnpm link --global @themusictree/brand
```

#### Installing the package in an app

To depend on a **published** version from GitHub Packages (instead of `pnpm link --global`), configure npm scope + authentication, then install. Full steps: **[README — Install](README.md#install)**.

#### Component and asset preview (playground)

The `playground/` app is a dev-only Vite catalog of published components and files under `dist/` (brand, banners, favicons). It is not part of the npm package `files` list.

One-time setup after clone (or when `playground/package.json` dependencies change):

```bash
pnpm run playground:install
```

Copy **`playground/.env.example`** to **`playground/.env`** and set **every** key before **`pnpm run playground`** or **`pnpm run build`**. **`scripts/run-playground.mjs`** merges **`playground/.env`** into the environment for the root **`pnpm run build`** (shell overrides file). **`scripts/assert-org-url.mjs`** requires **`ORG_DOMAIN`**, **`ORG_GITHUB_SPONSOR_BUTTON_URL`**, all playground social URLs, **`HTMT_API_SUBDOMAIN`**, **`GTMT_FRONT_SUBDOMAIN`**, and **`AUDIOMETA_FRONT_SUBDOMAIN`** (same names as **`publish.yml`** / **`.env.example`**). **tsup** inlines those keys into published **`dist/`** (defaults for **`TheMusicTree*Link`**, **`GithubSponsorButton`**, **`Social*Link`**, and **`socialBuildEnv`** subdomain values). Re-run root **`pnpm run build`** after editing **`playground/.env`** so **`node_modules/…/dist/`** picks up new values. If the playground UI stays blank after changing **`dist/`**, remove **`playground/node_modules/.vite`** and restart the dev server.

**Maintainers:** define **all** repository variables listed in **`.cursor/rules/publish-workflow.mdc`** ( **`DOMAIN_NAME`** maps to **`ORG_DOMAIN`**; other keys match **`publish.yml`**). Every workflow **`env`** entry is **required**.

Run a build and start the dev server (default port **5174**). **`pnpm run playground`** uses **`scripts/run-playground.mjs`**, which merges **`playground/.env`** into the environment before **`pnpm run build`**:

```bash
pnpm run playground
```

To run only the playground Vite dev server (after `dist/` is current from a recent root `pnpm run build`). **`pnpm -C playground dev`** runs **`scripts/assert-org-url.mjs`** first (same as playground **`build`**), so the command fails if **`playground/.env`** is incomplete:

```bash
pnpm run playground:dev
```

Refresh after `pnpm run build` at the repo root so new static assets appear.

### 2. Branching

#### Main Branch (`main`)

- The stable, always-deployable branch
- All changes must go through Pull Requests
- Releases are tagged from `main`

#### Feature Branches (`feature/<name>`)

- Create one for each new feature, component, or bug fix
- Include issue numbers when applicable: `feature/123-add-card-component`
- Merge into `main` via Pull Request when complete

#### Chore Branches (`chore/<name>`)

- For maintenance, infrastructure, and configuration work
- Examples: dependency updates, CI/CD changes, documentation infrastructure

#### Hotfix Branches (`hotfix/<name>`) _(For Maintainers)_

- For urgent bug fixes on published versions

### 3. Developing

- **New TS entry points**: add or extend an entry in `tsup.config.ts` and matching `exports` in `package.json`.
- **New static brand assets** under `src/brand/<folder>/`: add the corresponding `./brand/<folder>/*` export in `package.json` and extend the build script `cp` so files land in `dist/brand/`.
- **New favicons** under `src/favicons/<project>/`: expose via `"./favicons/*"` export and ensure the build copies them.
- **Banner assets** under `src/banners/<project-slug>/`: add files in a project subfolder (not loose under `src/banners/`). `"./banners/*"` and the build’s `dist/banners/` copy pick up new folders automatically; run a full build after adding binaries.
- **Components**: follow existing component patterns and import style; prefer minimal, focused diffs.
- **Playground (required)**: any **new exported component** or **published static asset** must be visible in the playground in the same change (before merge). Add a demo in [`playground/src/App.tsx`](playground/src/App.tsx) for components. For assets, run a full [`pnpm run build`](README.md#build) so files land under `dist/`; the catalog globs in [`playground/src/distAssetGlobs.ts`](playground/src/distAssetGlobs.ts) list matching files under `dist/brand`, `dist/banners`, and `dist/favicons`. Extend those globs or add an explicit preview import if needed. See [Component and asset preview (playground)](#component-and-asset-preview-playground).
- **TypeScript**: `tsconfig.json` uses `"moduleResolution": "bundler"` — keep it compatible with tsup.

#### 3.1 Interactive affordances (hover / focus)

Shipped **clickable** UI (`<a>`, `<button>`, and similar) should show a visible **hover** change (and **focus-visible** when the element is focusable). **SVG** marks wired to **`currentColor`** usually inherit this from [`src/styles/icon-links.css`](src/styles/icon-links.css). **Raster** or fixed-color marks need an explicit hover style (for example **Tipeee** uses **`opacity`** on the **`img`** in that stylesheet). Third-party embeds we do not style (for example the **`GithubSponsorButton`** iframe) are exempt. Agent guidance: [`.cursor/rules/interactive-hover.mdc`](.cursor/rules/interactive-hover.mdc).

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
- **Playground (required):** Anything new or changed that ships in **`dist/`** (components, brand files, favicons, banners, or any new copied **`dist/`** tree) must be visible in **`playground/`** in this PR—update [`playground/src/distAssetGlobs.ts`](playground/src/distAssetGlobs.ts) and/or [`playground/src/App.tsx`](playground/src/App.tsx), run a full build, then confirm in the dev server. See [Component and asset preview (playground)](#component-and-asset-preview-playground).

**3. Documentation**

- Update README if adding new features or changing behavior
- Update `CHANGELOG.md` with your changes in the `[Unreleased]` section (see [Changelog Best Practices](CHANGELOG.md#changelog-best-practices))
- Update documentation when asset conventions change: global guides in `docs/` and colocated specs in `src/*/README.md` (see [`docs/README.md`](docs/README.md)). Any **multi-section** Markdown file in the repo should include a **Table of contents** linking each `##` section ([`CHANGELOG.md`](CHANGELOG.md) and one-section stubs exempt); see [`.cursor/rules/static-assets-and-docs.mdc`](.cursor/rules/static-assets-and-docs.mdc).

**4. Git Hygiene**

- Commit messages follow the convention above
- Branch is up to date with `main`
- No accidental commits (large files, secrets, personal configs)

#### 5.2. Opening a Pull Request

**PR Title Naming Convention:**

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

Releases are created from the `main` branch. A GitHub Actions workflow publishes to GitHub Packages when a version tag is pushed and **creates a GitHub Release** for that tag (generated notes, for watcher notifications).

Run the release script from `main` with a clean working tree:

```bash
pnpm run release -- patch   # 1.0.0 -> 1.0.1
pnpm run release -- minor   # 1.0.0 -> 1.1.0
pnpm run release -- major   # 1.0.0 -> 2.0.0
```

The script (`scripts/release.sh`) does the following in one shot:

1. Validates you're on `main` with a clean working tree
2. Bumps the version in `package.json`
3. Stamps `CHANGELOG.md` — replaces `[Unreleased]` with the new version and today's date, keeping an empty `[Unreleased]` section for future PRs
4. Commits `package.json`, `pnpm-lock.yaml`, and `CHANGELOG.md`
5. Creates a git tag `v<version>`
6. Pushes the commit and tag

Publishing to GitHub Packages and creating the GitHub Release start automatically once the tag is pushed.

## License & Attribution

All contributions are made under the project's license.
You retain authorship of your code; the project retains redistribution rights under the same license.
