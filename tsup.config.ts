import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "tsup";

function loadPlaygroundDotenv(filePath: string): Record<string, string> {
  if (!fs.existsSync(filePath)) return {};
  const out: Record<string, string> = {};
  for (const rawLine of fs.readFileSync(filePath, "utf8").split("\n")) {
    const line = rawLine.replace(/^\uFEFF/, "").trim();
    if (!line || line.startsWith("#")) continue;
    const m = /^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(line);
    if (!m) continue;
    let v = m[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    out[m[1]] = v;
  }
  return out;
}

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)));
const buildEnv = {
  ...loadPlaygroundDotenv(path.join(repoRoot, "playground", ".env")),
  ...process.env,
};

/** Same merge order as **`scripts/assert-org-url.mjs`** (file then shell). */
const orgDomainLiteral = JSON.stringify(buildEnv.ORG_DOMAIN ?? "");
const orgNameLiteral = JSON.stringify(buildEnv.ORG_NAME ?? "");
const githubSponsorButtonUrlLiteral = JSON.stringify(
  buildEnv.ORG_GITHUB_SPONSOR_BUTTON_URL ?? "",
);
const orgGithubUrlLiteral = JSON.stringify(buildEnv.ORG_GITHUB_URL ?? "");
const htmtApiRepoNameLiteral = JSON.stringify(
  buildEnv.HTMT_API_REPO_NAME ?? "",
);
const htmtApiGithubUrlLiteral = JSON.stringify(
  buildEnv.ORG_GITHUB_URL && buildEnv.HTMT_API_REPO_NAME
    ? `${buildEnv.ORG_GITHUB_URL}/${buildEnv.HTMT_API_REPO_NAME}`
    : "",
);
const tmdAdminApiRepoNameLiteral = JSON.stringify(
  buildEnv.TMD_ADMIN_API_REPO_NAME ?? "",
);
const orgPypiUrlLiteral = JSON.stringify(buildEnv.ORG_PYPI_URL ?? "");
const orgLinkedinUrlLiteral = JSON.stringify(buildEnv.ORG_LINKEDIN_URL ?? "");
const orgXUrlLiteral = JSON.stringify(buildEnv.ORG_X_URL ?? "");
const orgMastodonUrlLiteral = JSON.stringify(buildEnv.ORG_MASTODON_URL ?? "");
const orgYoutubeUrlLiteral = JSON.stringify(buildEnv.ORG_YOUTUBE_URL ?? "");
const orgSpotifyUrlLiteral = JSON.stringify(buildEnv.ORG_SPOTIFY_URL ?? "");
const orgDiscordUrlLiteral = JSON.stringify(buildEnv.ORG_DISCORD_URL ?? "");
const orgTipeeeUrlLiteral = JSON.stringify(buildEnv.ORG_TIPEEE_URL ?? "");
const contactEmailLiteral = JSON.stringify(buildEnv.CONTACT_EMAIL ?? "");
const htmtFrontSubdomainLiteral = JSON.stringify(
  buildEnv.HTMT_FRONT_SUBDOMAIN ?? "",
);
const htmtApiSubdomainLiteral = JSON.stringify(
  buildEnv.HTMT_API_SUBDOMAIN ?? "",
);
const gtmtFrontSubdomainLiteral = JSON.stringify(
  buildEnv.GTMT_FRONT_SUBDOMAIN ?? "",
);
const gtmtApiSubdomainLiteral = JSON.stringify(
  buildEnv.GTMT_API_SUBDOMAIN ?? "",
);
const audiometaFrontSubdomainLiteral = JSON.stringify(
  buildEnv.AUDIOMETA_FRONT_SUBDOMAIN ?? "",
);
const audiometaApiSubdomainLiteral = JSON.stringify(
  buildEnv.AUDIOMETA_API_SUBDOMAIN ?? "",
);
const tmtaSubdomainLiteral = JSON.stringify(buildEnv.TMTA_SUBDOMAIN ?? "");
const tmdGameSubdomainLiteral = JSON.stringify(
  buildEnv.TMD_GAME_SUBDOMAIN ?? "",
);
const tmdShowcaseSubdomainLiteral = JSON.stringify(
  buildEnv.TMD_SHOWCASE_SUBDOMAIN ?? "",
);

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "components/index": "src/components/index.ts",
    "brand/index": "src/brand/index.ts",
    "tokens/index": "src/tokens/index.ts",
    "hooks/index": "src/hooks/index.ts",
    "utils/index": "src/utils/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  define: {
    "process.env.ORG_DOMAIN": orgDomainLiteral,
    "process.env.ORG_NAME": orgNameLiteral,
    "process.env.ORG_GITHUB_SPONSOR_BUTTON_URL": githubSponsorButtonUrlLiteral,
    "process.env.ORG_GITHUB_URL": orgGithubUrlLiteral,
    "process.env.HTMT_API_REPO_NAME": htmtApiRepoNameLiteral,
    "process.env.HTMT_API_GITHUB_URL": htmtApiGithubUrlLiteral,
    "process.env.TMD_ADMIN_API_REPO_NAME": tmdAdminApiRepoNameLiteral,
    "process.env.ORG_PYPI_URL": orgPypiUrlLiteral,
    "process.env.ORG_LINKEDIN_URL": orgLinkedinUrlLiteral,
    "process.env.ORG_X_URL": orgXUrlLiteral,
    "process.env.ORG_MASTODON_URL": orgMastodonUrlLiteral,
    "process.env.ORG_YOUTUBE_URL": orgYoutubeUrlLiteral,
    "process.env.ORG_SPOTIFY_URL": orgSpotifyUrlLiteral,
    "process.env.ORG_DISCORD_URL": orgDiscordUrlLiteral,
    "process.env.ORG_TIPEEE_URL": orgTipeeeUrlLiteral,
    "process.env.CONTACT_EMAIL": contactEmailLiteral,
    "process.env.HTMT_FRONT_SUBDOMAIN": htmtFrontSubdomainLiteral,
    "process.env.HTMT_API_SUBDOMAIN": htmtApiSubdomainLiteral,
    "process.env.GTMT_FRONT_SUBDOMAIN": gtmtFrontSubdomainLiteral,
    "process.env.GTMT_API_SUBDOMAIN": gtmtApiSubdomainLiteral,
    "process.env.AUDIOMETA_FRONT_SUBDOMAIN": audiometaFrontSubdomainLiteral,
    "process.env.AUDIOMETA_API_SUBDOMAIN": audiometaApiSubdomainLiteral,
    "process.env.TMTA_SUBDOMAIN": tmtaSubdomainLiteral,
    "process.env.TMD_GAME_SUBDOMAIN": tmdGameSubdomainLiteral,
    "process.env.TMD_SHOWCASE_SUBDOMAIN": tmdShowcaseSubdomainLiteral,
  },
  loader: {
    ".svg": "dataurl",
    ".png": "dataurl",
  },
});
