/** Internal env key name used in error messaging. */
const ORG_DOMAIN_KEY = "ORG_DOMAIN";

/**
 * Organization domain baked into `dist/` at package build time (e.g. `themusictree.org`).
 * Same pattern as inlined subdomain exports from `buildEnv`.
 */
export const ORG_DOMAIN = process.env.ORG_DOMAIN?.trim() || undefined;

/**
 * Organization name baked into `dist/` at package build time (e.g. `BehindTheMusicTree`).
 * Same pattern as inlined subdomain exports from `buildEnv`.
 */
export const ORG_NAME = process.env.ORG_NAME?.trim() || undefined;

/**
 * Normalize a hostname or full URL to an `https://.../` href.
 * Use `resolveOrgSiteHref()` for the link target; keep this for tests or custom strings.
 */
export function parseOrgSiteHref(value: string | undefined): string {
  const raw = value?.trim();
  if (!raw) {
    throw new Error(
      `Missing organization site URL: set environment variable ${ORG_DOMAIN_KEY} when building @themusictree/brand (e.g. map GitHub repository variable DOMAIN_NAME into ${ORG_DOMAIN_KEY} in the publish workflow).`,
    );
  }
  return raw.startsWith("http") ? raw : `https://${raw.replace(/\/$/, "")}/`;
}

/**
 * Organization site `href`. In published installs the URL is already inlined from
 * `ORG_DOMAIN` at package build time.
 */
export function resolveOrgSiteHref(): string {
  return parseOrgSiteHref(ORG_DOMAIN);
}
