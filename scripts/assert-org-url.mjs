#!/usr/bin/env node
/**
 * Ensures required build-time env is set for `npm run build` / `npm run dev`.
 * Merges **`playground/.env`** then **`process.env`** (shell overrides file).
 * **Publish** workflow must pass the same keys (see `.github/workflows/publish.yml`).
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadPlaygroundDotenv } from "./load-playground-dotenv.mjs";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const playgroundEnvPath = path.join(repoRoot, "playground", ".env");
const merged = { ...loadPlaygroundDotenv(playgroundEnvPath), ...process.env };

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

function requireNonEmpty(name) {
  const v = merged[name]?.trim();
  if (!v) {
    fail(
      `Error: ${name} is required for this build.\n` +
        "  Set it in the shell or in playground/.env (see playground/.env.example).\n" +
        "  CI: add the repository variable and publish.yml env entry (see .cursor/rules/publish-workflow.mdc).",
    );
  }
  return v;
}

function requireHttpUrl(name) {
  const v = requireNonEmpty(name);
  if (!/^https?:\/\//i.test(v)) {
    fail(`Error: ${name} must be an absolute http(s) URL.`);
  }
  return v;
}

requireNonEmpty("ORG_DOMAIN");
requireHttpUrl("ORG_GITHUB_SPONSOR_BUTTON_URL");

/** Social **`Social*Link`** defaults — same names as **`playground/.env.example`** / **`publish.yml`**. */
requireHttpUrl("ORG_GITHUB_URL");
requireHttpUrl("ORG_PYPI_URL");
requireNonEmpty("ORG_LINKEDIN_URL");
requireHttpUrl("ORG_X_URL");
requireHttpUrl("ORG_MASTODON_URL");
requireHttpUrl("ORG_YOUTUBE_URL");
requireHttpUrl("ORG_SPOTIFY_URL");
requireHttpUrl("ORG_DISCORD_URL");
requireHttpUrl("ORG_TIPEEE_URL");
const email = requireNonEmpty("CONTACT_EMAIL");
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  fail("Error: CONTACT_EMAIL must look like a valid email address.");
}

requireNonEmpty("HTMT_API_SUBDOMAIN");
requireNonEmpty("HTMT_FRONT_SUBDOMAIN");
requireNonEmpty("GTMT_FRONT_SUBDOMAIN");
requireNonEmpty("GTMT_API_SUBDOMAIN");
requireNonEmpty("AUDIOMETA_FRONT_SUBDOMAIN");
requireNonEmpty("AUDIOMETA_API_SUBDOMAIN");
requireNonEmpty("TMTA_SUBDOMAIN");
requireNonEmpty("TMD_GAME_SUBDOMAIN");
