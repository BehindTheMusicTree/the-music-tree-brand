# CLAUDE.md

`@behindthemusictree/brand` — design tokens (`--layout-*`, `--color-*`, `--space-*`, `--radius-*` in `packages/brand/src/tokens/theme.css`), marks/favicons and brand-identity components. A token change here propagates to `ui`, `app-kit-ui`, grow and hear.

Ecosystem map (which repo owns what, where UI changes go): `~/git/claude-config/CONVENTIONS.md` § Ecosystem.

- Validate: `pnpm build && pnpm test`.
- Branching, commits, PRs and releases: `CONTRIBUTING.md`. Record changes under `[Unreleased]` in `CHANGELOG.md`.
