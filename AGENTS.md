# Project guidance

`@behindthemusictree/brand` supplies design tokens, marks, favicons and
brand-identity components. Tokens live in `packages/brand/src/tokens/theme.css`;
changes can affect `ui`, `app-kit-ui`, Grow and Hear. Generic UI primitives belong
in the `ui` package.

Follow `CONTRIBUTING.md` for branching, validation and releases. Branch from
`main` and open a pull request with a Conventional Commit title. `publish.yml`
manages release-please, release tags and npm Trusted Publishing; do not edit
`CHANGELOG.md` by hand, release-please generates it from commit titles.

The current pnpm workspace contains the library in `packages/brand` and a Vite
playground in `apps/playground`. Use the scripts in the root `package.json`:
`pnpm build`, `pnpm test` and `pnpm dev`. See the README for build-time
environment values and playground setup. Package build configuration embeds
selected environment values into `dist`; inspect `packages/brand/tsup.config.ts`
and the publish workflow when changes affect those values.
