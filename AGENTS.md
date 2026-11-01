# Project guidance

`@behindthemusictree/brand` supplies design tokens, marks, favicons and
brand-identity components. Tokens live in `packages/brand/src/tokens/theme.css`;
changes can affect `ui`, `app-kit-ui`, Grow and Hear. Generic UI primitives belong
in the `ui` package.

Follow `CONTRIBUTING.md` for the Gitflow, PR and release process: branch feature
work from `develop` and target `develop`; `main` only receives release or hotfix
PRs. Record changes under `[Unreleased]` in `CHANGELOG.md`.

The current pnpm workspace contains the library in `packages/brand` and a Vite
playground in `apps/playground`. Use the scripts in the root `package.json`:
`pnpm build`, `pnpm test` and `pnpm dev`. See the README for build-time
environment values and playground setup. Package build configuration embeds
selected environment values into `dist`; inspect `packages/brand/tsup.config.ts`
and the publish workflow when changes affect those values.
