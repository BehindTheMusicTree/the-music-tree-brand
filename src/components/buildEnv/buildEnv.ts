/// <reference types="node" />

/**
 * Build-time env keys and inlined values used by social components and related services.
 * Values are replaced in published `dist/` at package build time.
 */
const readBuildEnv = (read: () => string | undefined): string | undefined => {
  try {
    return read()?.trim() || undefined;
  } catch {
    // Browser runtime without `process` should degrade to undefined.
    return undefined;
  }
};

// Build env keys
export const GithubSponsorButtonUrl = "ORG_GITHUB_SPONSOR_BUTTON_URL" as const;
export const CONTACT_EMAIL = "CONTACT_EMAIL" as const;

// Inlined build-time values
export const ORG_GITHUB_SPONSOR_BUTTON_IFRAME_SRC = readBuildEnv(
  () => process.env.ORG_GITHUB_SPONSOR_BUTTON_URL,
);

export const ORG_GITHUB_URL = readBuildEnv(() => process.env.ORG_GITHUB_URL);
export const HTMT_API_REPO_NAME = readBuildEnv(
  () => process.env.HTMT_API_REPO_NAME,
);

const buildGithubRepoUrl = (
  repoName: string | undefined,
  fallback?: string | undefined,
): string | undefined => {
  if (!repoName || !ORG_GITHUB_URL) {
    return fallback;
  }
  return `${ORG_GITHUB_URL}/${repoName}`;
};

export const HTMT_API_GITHUB_URL = buildGithubRepoUrl(
  HTMT_API_REPO_NAME,
  readBuildEnv(() => process.env.HTMT_API_GITHUB_URL),
);

export const TMD_ADMIN_API_REPO_NAME = readBuildEnv(
  () => process.env.TMD_ADMIN_API_REPO_NAME,
);

export const TMD_ADMIN_API_GITHUB_URL = buildGithubRepoUrl(
  TMD_ADMIN_API_REPO_NAME,
);

export const GTMT_API_REPO_NAME = readBuildEnv(
  () => process.env.GTMT_API_REPO_NAME,
);

export const GTMT_API_GITHUB_URL = buildGithubRepoUrl(GTMT_API_REPO_NAME);

export const GTMT_FRONT_REPO_NAME = readBuildEnv(
  () => process.env.GTMT_FRONT_REPO_NAME,
);

export const GTMT_FRONT_GITHUB_URL = buildGithubRepoUrl(GTMT_FRONT_REPO_NAME);

export const TMD_ADMIN_REPO_NAME = readBuildEnv(
  () => process.env.TMD_ADMIN_REPO_NAME,
);

export const TMD_ADMIN_GITHUB_URL = buildGithubRepoUrl(TMD_ADMIN_REPO_NAME);
export const ORG_PYPI_URL = readBuildEnv(() => process.env.ORG_PYPI_URL);
export const ORG_LINKEDIN_URL = readBuildEnv(
  () => process.env.ORG_LINKEDIN_URL,
);
export const ORG_X_URL = readBuildEnv(() => process.env.ORG_X_URL);
export const ORG_MASTODON_URL = readBuildEnv(
  () => process.env.ORG_MASTODON_URL,
);
export const ORG_YOUTUBE_URL = readBuildEnv(() => process.env.ORG_YOUTUBE_URL);
export const ORG_SPOTIFY_URL = readBuildEnv(() => process.env.ORG_SPOTIFY_URL);
export const ORG_DISCORD_URL = readBuildEnv(() => process.env.ORG_DISCORD_URL);
export const ORG_TIPEEE_URL = readBuildEnv(() => process.env.ORG_TIPEEE_URL);
export const CONTACT_EMAIL_ADDRESS = readBuildEnv(
  () => process.env.CONTACT_EMAIL,
);
export const HTMT_FRONT_SUBDOMAIN = readBuildEnv(
  () => process.env.HTMT_FRONT_SUBDOMAIN,
);
export const HTMT_API_SUBDOMAIN = readBuildEnv(
  () => process.env.HTMT_API_SUBDOMAIN,
);
export const GTMT_FRONT_SUBDOMAIN = readBuildEnv(
  () => process.env.GTMT_FRONT_SUBDOMAIN,
);
export const GTMT_API_SUBDOMAIN = readBuildEnv(
  () => process.env.GTMT_API_SUBDOMAIN,
);
export const AUDIOMETA_FRONT_SUBDOMAIN = readBuildEnv(
  () => process.env.AUDIOMETA_FRONT_SUBDOMAIN,
);
export const AUDIOMETA_API_SUBDOMAIN = readBuildEnv(
  () => process.env.AUDIOMETA_API_SUBDOMAIN,
);
export const TMTA_SUBDOMAIN = readBuildEnv(() => process.env.TMTA_SUBDOMAIN);
export const TMD_GAME_SUBDOMAIN = readBuildEnv(
  () => process.env.TMD_GAME_SUBDOMAIN,
);
export const TMD_SHOWCASE_SUBDOMAIN = readBuildEnv(
  () => process.env.TMD_SHOWCASE_SUBDOMAIN,
);
