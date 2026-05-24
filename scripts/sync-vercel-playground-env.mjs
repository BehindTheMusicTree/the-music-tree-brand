#!/usr/bin/env node
/**
 * Pushes required playground build env to a Vercel project (production, preview, development).
 * Used by `.github/workflows/vercel-playground-env.yml`.
 *
 * Required env: VERCEL_TOKEN, VERCEL_PROJECT_ID, ORG_DOMAIN, ORG_GITHUB_SPONSOR_BUTTON_URL,
 * ORG_GITHUB_URL, ORG_PYPI_URL, ORG_LINKEDIN_URL, ORG_X_URL, ORG_MASTODON_URL,
 * ORG_YOUTUBE_URL, ORG_SPOTIFY_URL, ORG_DISCORD_URL, ORG_TIPEEE_URL, CONTACT_EMAIL,
 * HTMT_FRONT_SUBDOMAIN, HTMT_API_SUBDOMAIN, GTMT_FRONT_SUBDOMAIN, GTMT_API_SUBDOMAIN,
 * AUDIOMETA_FRONT_SUBDOMAIN, AUDIOMETA_API_SUBDOMAIN, TMTA_SUBDOMAIN, TMD_GAME_SUBDOMAIN,
 * TMD_SHOWCASE_SUBDOMAIN
 *
 * Optional: VERCEL_TEAM_ID (Vercel team scope; omit for personal projects)
 */
const KEYS = [
  "ORG_DOMAIN",
  "ORG_GITHUB_SPONSOR_BUTTON_URL",
  "ORG_GITHUB_URL",
  "ORG_PYPI_URL",
  "ORG_LINKEDIN_URL",
  "ORG_X_URL",
  "ORG_MASTODON_URL",
  "ORG_YOUTUBE_URL",
  "ORG_SPOTIFY_URL",
  "ORG_DISCORD_URL",
  "ORG_TIPEEE_URL",
  "CONTACT_EMAIL",
  "HTMT_FRONT_SUBDOMAIN",
  "HTMT_API_SUBDOMAIN",
  "GTMT_FRONT_SUBDOMAIN",
  "GTMT_API_SUBDOMAIN",
  "AUDIOMETA_FRONT_SUBDOMAIN",
  "AUDIOMETA_API_SUBDOMAIN",
  "TMTA_SUBDOMAIN",
  "TMD_GAME_SUBDOMAIN",
  "TMD_SHOWCASE_SUBDOMAIN",
];

const META = ["VERCEL_TOKEN", "VERCEL_PROJECT_ID"];

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

function requireNonEmpty(name) {
  const v = process.env[name]?.trim();
  if (!v) {
    fail(`Error: ${name} is required for Vercel env sync.`);
  }
  return v;
}

for (const name of META) {
  requireNonEmpty(name);
}

for (const name of KEYS) {
  requireNonEmpty(name);
}

const token = process.env.VERCEL_TOKEN.trim();
const projectId = process.env.VERCEL_PROJECT_ID.trim();
const teamId = process.env.VERCEL_TEAM_ID?.trim();

const targets = ["production", "preview", "development"];

async function upsert(key, value) {
  const url = new URL(
    `https://api.vercel.com/v10/projects/${encodeURIComponent(projectId)}/env`,
  );
  url.searchParams.set("upsert", "true");
  if (teamId) {
    url.searchParams.set("teamId", teamId);
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key,
      value,
      type: "encrypted",
      target: targets,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    fail(
      `Error: Vercel API failed for ${key} (${res.status} ${res.statusText}): ${text}`,
    );
  }
}

for (const key of KEYS) {
  const value = process.env[key].trim();
  process.stdout.write(`Syncing ${key}…\n`);
  await upsert(key, value);
}

process.stdout.write("Done. All playground env vars synced to Vercel.\n");
