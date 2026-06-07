import { useEffect, useMemo, useState, type ComponentType } from "react";
import { bannerAssets, brandAssets, faviconAssets } from "./distAssetGlobs";
import { AssetFigure } from "./AssetFigure";
import {
  BTMT_ICON_LINK_DARK_CLASS,
  GithubSponsorButton,
  Button,
  DiscussionLink,
  DiscussionLinkColored,
  DocLink,
  DocLinkColored,
  EmailSocialLink,
  EmailSocialLinkColored,
  GithubSocialLink,
  GithubSocialLinkColored,
  IconBookOpen,
  IconBookOpenColored,
  IconDiscord,
  IconDiscordColored,
  IconEmail,
  IconEmailColored,
  IconGithub,
  IconGithubColored,
  IconGitHubConversation,
  IconGitHubConversationColored,
  IconGitHubSponsors,
  IconGitHubSponsorsColored,
  IconHeart,
  IconIssue,
  IconIssueColored,
  IconLinkedIn,
  IconLinkedInColored,
  IconMastodon,
  IconMastodonColored,
  IconPypi,
  IconPypiColored,
  IconSpotify,
  IconSpotifyColored,
  IconTipeee,
  IconTipeeeColored,
  IconTwitter,
  IconTwitterColored,
  IconWebsite,
  IconWebsiteColored,
  IconYouTube,
  IconYouTubeColored,
  InformationLink,
  InformationLinkColored,
  LinkedInSocialLink,
  LinkedInSocialLinkColored,
  MastodonSocialLink,
  MastodonSocialLinkColored,
  PypiSocialLink,
  PypiSocialLinkColored,
  SponsorSocialLink,
  SponsorSocialLinkColored,
  DiscordSocialLink,
  DiscordSocialLinkColored,
  TipeeeSocialLink,
  TipeeeSocialLinkColored,
  SpotifySocialLink,
  SpotifySocialLinkColored,
  TheMusicTreeHorizontalLink,
  TheMusicTreeMarkLink,
  ORG_DOMAIN,
  ORG_NAME,
  ORG_GITHUB_SPONSOR_BUTTON_URL,
  ORG_GITHUB_SPONSOR_BUTTON_IFRAME_SRC,
  ORG_GITHUB_URL,
  ORG_PYPI_URL,
  ORG_LINKEDIN_URL,
  ORG_X_URL,
  ORG_MASTODON_URL,
  ORG_YOUTUBE_URL,
  ORG_SPOTIFY_URL,
  ORG_DISCORD_URL,
  ORG_TIPEEE_URL,
  CONTACT_EMAIL,
  ORG_GITHUB_PROFILE_URL,
  ORG_PYPI_PROFILE_URL,
  ORG_LINKEDIN_PROFILE_URL,
  ORG_X_PROFILE_URL,
  ORG_MASTODON_PROFILE_URL,
  ORG_YOUTUBE_PROFILE_URL,
  ORG_SPOTIFY_PROFILE_URL,
  ORG_DISCORD_INVITE_URL,
  ORG_TIPEEE_PROFILE_URL,
  CONTACT_EMAIL_ADDRESS,
  HTMT_FRONT_SUBDOMAIN,
  HTMT_API_SUBDOMAIN,
  GTMT_FRONT_SUBDOMAIN,
  GTMT_API_SUBDOMAIN,
  AUDIOMETA_FRONT_SUBDOMAIN,
  AUDIOMETA_API_SUBDOMAIN,
  TMTA_SUBDOMAIN,
  TMD_GAME_SUBDOMAIN,
  TMD_SHOWCASE_SUBDOMAIN,
  WebsiteSocialLink,
  WebsiteSocialLinkColored,
  XSocialLink,
  XSocialLinkColored,
  YouTubeSocialLink,
  YouTubeSocialLinkColored,
  socialBrandIconClass,
  type SocialIconLinkProps,
} from "@behindthemusictree/assets/components";
import gtmtLockupFullPng from "@behindthemusictree/assets/brand/grow-the-music-tree/grow-the-music-tree-lockup-horizontal-full.png?url";
import gtmtLockupSvg from "@behindthemusictree/assets/brand/grow-the-music-tree/grow-the-music-tree-lockup-horizontal.svg?url";
import lockupDarkPng from "@behindthemusictree/assets/brand/the-music-tree/the-music-tree-lockup-horizontal-dark.png?url";
import lockupDefaultPng from "@behindthemusictree/assets/brand/the-music-tree/the-music-tree-lockup-horizontal.png?url";
import markDarkPng from "@behindthemusictree/assets/brand/the-music-tree/the-music-tree-mark-dark.png?url";
import markDarkSvg from "@behindthemusictree/assets/brand/the-music-tree/the-music-tree-mark-dark.svg?url";
import markDefaultPng from "@behindthemusictree/assets/brand/the-music-tree/the-music-tree-mark.png?url";
import markDefaultSvg from "@behindthemusictree/assets/brand/the-music-tree/the-music-tree-mark.svg?url";
type CatalogTab = "components" | "env" | "brand" | "banners" | "favicons";

type SocialLinkComponent = ComponentType<SocialIconLinkProps>;

type IconGlyph = ComponentType<{ className?: string }>;

const SOCIAL_ICON_MONO: { key: string; Icon: IconGlyph; wide?: boolean }[] = [
  { key: "IconGithub", Icon: IconGithub },
  { key: "IconGitHubSponsors", Icon: IconGitHubSponsors },
  { key: "IconPypi", Icon: IconPypi },
  { key: "IconLinkedIn", Icon: IconLinkedIn },
  { key: "IconTwitter", Icon: IconTwitter },
  { key: "IconMastodon", Icon: IconMastodon },
  { key: "IconYouTube", Icon: IconYouTube },
  { key: "IconSpotify", Icon: IconSpotify },
  { key: "IconDiscord", Icon: IconDiscord },
  { key: "IconTipeee", Icon: IconTipeee, wide: true },
  { key: "IconEmail", Icon: IconEmail },
  { key: "IconWebsite", Icon: IconWebsite },
  { key: "IconBookOpen", Icon: IconBookOpen },
  { key: "IconGitHubConversation", Icon: IconGitHubConversation },
  { key: "IconIssue", Icon: IconIssue },
  { key: "IconHeart", Icon: IconHeart },
];

const SOCIAL_ICON_COLORED: { key: string; Icon: IconGlyph; wide?: boolean }[] =
  [
    { key: "IconGithubColored", Icon: IconGithubColored },
    { key: "IconGitHubSponsorsColored", Icon: IconGitHubSponsorsColored },
    { key: "IconPypiColored", Icon: IconPypiColored },
    { key: "IconLinkedInColored", Icon: IconLinkedInColored },
    { key: "IconTwitterColored", Icon: IconTwitterColored },
    { key: "IconMastodonColored", Icon: IconMastodonColored },
    { key: "IconYouTubeColored", Icon: IconYouTubeColored },
    { key: "IconSpotifyColored", Icon: IconSpotifyColored },
    { key: "IconDiscordColored", Icon: IconDiscordColored },
    { key: "IconTipeeeColored", Icon: IconTipeeeColored, wide: true },
    { key: "IconEmailColored", Icon: IconEmailColored },
    { key: "IconWebsiteColored", Icon: IconWebsiteColored },
    { key: "IconBookOpenColored", Icon: IconBookOpenColored },
    {
      key: "IconGitHubConversationColored",
      Icon: IconGitHubConversationColored,
    },
    { key: "IconIssueColored", Icon: IconIssueColored },
  ];

const SOCIAL_LINK_DEMO: {
  key: string;
  Link: SocialLinkComponent;
  LinkColored: SocialLinkComponent;
}[] = [
  {
    key: "github",
    Link: GithubSocialLink,
    LinkColored: GithubSocialLinkColored,
  },
  {
    key: "sponsors",
    Link: SponsorSocialLink,
    LinkColored: SponsorSocialLinkColored,
  },
  { key: "pypi", Link: PypiSocialLink, LinkColored: PypiSocialLinkColored },
  {
    key: "linkedin",
    Link: LinkedInSocialLink,
    LinkColored: LinkedInSocialLinkColored,
  },
  { key: "x", Link: XSocialLink, LinkColored: XSocialLinkColored },
  {
    key: "mastodon",
    Link: MastodonSocialLink,
    LinkColored: MastodonSocialLinkColored,
  },
  {
    key: "youtube",
    Link: YouTubeSocialLink,
    LinkColored: YouTubeSocialLinkColored,
  },
  {
    key: "spotify",
    Link: SpotifySocialLink,
    LinkColored: SpotifySocialLinkColored,
  },
  {
    key: "discord",
    Link: DiscordSocialLink,
    LinkColored: DiscordSocialLinkColored,
  },
  {
    key: "tipeee",
    Link: TipeeeSocialLink,
    LinkColored: TipeeeSocialLinkColored,
  },
  { key: "email", Link: EmailSocialLink, LinkColored: EmailSocialLinkColored },
  {
    key: "website",
    Link: WebsiteSocialLink,
    LinkColored: WebsiteSocialLinkColored,
  },
];

const TABS: { id: CatalogTab; label: string }[] = [
  { id: "components", label: "Components" },
  { id: "env", label: "Constants" },
  { id: "brand", label: "Brand" },
  { id: "banners", label: "Banners" },
  { id: "favicons", label: "Favicons" },
];

type BuildEnvRow = {
  category: "Social links" | "Domain";
  usage: string;
  keyName: string;
  keyValue: string;
  inlinedName: string;
  inlinedValue: string | undefined;
};

const DOMAIN_ENV_ROWS: BuildEnvRow[] = [
  {
    category: "Domain",
    usage: "Org site URL",
    keyName: "ORG_DOMAIN",
    keyValue: "ORG_DOMAIN",
    inlinedName: "ORG_DOMAIN",
    inlinedValue: ORG_DOMAIN,
  },
  {
    category: "Domain",
    usage: "Organization name",
    keyName: "ORG_NAME",
    keyValue: "ORG_NAME",
    inlinedName: "ORG_NAME",
    inlinedValue: ORG_NAME,
  },
  {
    category: "Domain",
    usage: "HTMT front subdomain",
    keyName: "HTMT_FRONT_SUBDOMAIN",
    keyValue: "HTMT_FRONT_SUBDOMAIN",
    inlinedName: "HTMT_FRONT_SUBDOMAIN",
    inlinedValue: HTMT_FRONT_SUBDOMAIN,
  },
  {
    category: "Domain",
    usage: "HTMT API subdomain",
    keyName: "HTMT_API_SUBDOMAIN",
    keyValue: "HTMT_API_SUBDOMAIN",
    inlinedName: "HTMT_API_SUBDOMAIN",
    inlinedValue: HTMT_API_SUBDOMAIN,
  },
  {
    category: "Domain",
    usage: "GTMT front subdomain",
    keyName: "GTMT_FRONT_SUBDOMAIN",
    keyValue: "GTMT_FRONT_SUBDOMAIN",
    inlinedName: "GTMT_FRONT_SUBDOMAIN",
    inlinedValue: GTMT_FRONT_SUBDOMAIN,
  },
  {
    category: "Domain",
    usage: "GTMT API subdomain",
    keyName: "GTMT_API_SUBDOMAIN",
    keyValue: "GTMT_API_SUBDOMAIN",
    inlinedName: "GTMT_API_SUBDOMAIN",
    inlinedValue: GTMT_API_SUBDOMAIN,
  },
  {
    category: "Domain",
    usage: "Audiometa front subdomain",
    keyName: "AUDIOMETA_FRONT_SUBDOMAIN",
    keyValue: "AUDIOMETA_FRONT_SUBDOMAIN",
    inlinedName: "AUDIOMETA_FRONT_SUBDOMAIN",
    inlinedValue: AUDIOMETA_FRONT_SUBDOMAIN,
  },
  {
    category: "Domain",
    usage: "Audiometa API subdomain",
    keyName: "AUDIOMETA_API_SUBDOMAIN",
    keyValue: "AUDIOMETA_API_SUBDOMAIN",
    inlinedName: "AUDIOMETA_API_SUBDOMAIN",
    inlinedValue: AUDIOMETA_API_SUBDOMAIN,
  },
  {
    category: "Domain",
    usage: "TMTA subdomain",
    keyName: "TMTA_SUBDOMAIN",
    keyValue: "TMTA_SUBDOMAIN",
    inlinedName: "TMTA_SUBDOMAIN",
    inlinedValue: TMTA_SUBDOMAIN,
  },
  {
    category: "Domain",
    usage: "TMD game subdomain",
    keyName: "TMD_GAME_SUBDOMAIN",
    keyValue: "TMD_GAME_SUBDOMAIN",
    inlinedName: "TMD_GAME_SUBDOMAIN",
    inlinedValue: TMD_GAME_SUBDOMAIN,
  },
  {
    category: "Domain",
    usage: "TMD showcase subdomain",
    keyName: "TMD_SHOWCASE_SUBDOMAIN",
    keyValue: "TMD_SHOWCASE_SUBDOMAIN",
    inlinedName: "TMD_SHOWCASE_SUBDOMAIN",
    inlinedValue: TMD_SHOWCASE_SUBDOMAIN,
  },
];

const SOCIAL_LINK_ENV_ROWS: BuildEnvRow[] = [
  {
    category: "Social links",
    usage: "Sponsor button URL",
    keyName: "ORG_GITHUB_SPONSOR_BUTTON_URL",
    keyValue: ORG_GITHUB_SPONSOR_BUTTON_URL,
    inlinedName: "GithubSponsorButton src",
    inlinedValue: ORG_GITHUB_SPONSOR_BUTTON_IFRAME_SRC,
  },
  {
    category: "Social links",
    usage: "GitHub social link",
    keyName: "ORG_GITHUB_URL",
    keyValue: ORG_GITHUB_URL,
    inlinedName: "ORG_GITHUB_PROFILE_URL",
    inlinedValue: ORG_GITHUB_PROFILE_URL,
  },
  {
    category: "Social links",
    usage: "PyPI social link",
    keyName: "ORG_PYPI_URL",
    keyValue: ORG_PYPI_URL,
    inlinedName: "ORG_PYPI_PROFILE_URL",
    inlinedValue: ORG_PYPI_PROFILE_URL,
  },
  {
    category: "Social links",
    usage: "LinkedIn social link",
    keyName: "ORG_LINKEDIN_URL",
    keyValue: ORG_LINKEDIN_URL,
    inlinedName: "ORG_LINKEDIN_PROFILE_URL",
    inlinedValue: ORG_LINKEDIN_PROFILE_URL,
  },
  {
    category: "Social links",
    usage: "X social link",
    keyName: "ORG_X_URL",
    keyValue: ORG_X_URL,
    inlinedName: "ORG_X_PROFILE_URL",
    inlinedValue: ORG_X_PROFILE_URL,
  },
  {
    category: "Social links",
    usage: "Mastodon social link",
    keyName: "ORG_MASTODON_URL",
    keyValue: ORG_MASTODON_URL,
    inlinedName: "ORG_MASTODON_PROFILE_URL",
    inlinedValue: ORG_MASTODON_PROFILE_URL,
  },
  {
    category: "Social links",
    usage: "YouTube social link",
    keyName: "ORG_YOUTUBE_URL",
    keyValue: ORG_YOUTUBE_URL,
    inlinedName: "ORG_YOUTUBE_PROFILE_URL",
    inlinedValue: ORG_YOUTUBE_PROFILE_URL,
  },
  {
    category: "Social links",
    usage: "Spotify social link",
    keyName: "ORG_SPOTIFY_URL",
    keyValue: ORG_SPOTIFY_URL,
    inlinedName: "ORG_SPOTIFY_PROFILE_URL",
    inlinedValue: ORG_SPOTIFY_PROFILE_URL,
  },
  {
    category: "Social links",
    usage: "Discord social link",
    keyName: "ORG_DISCORD_URL",
    keyValue: ORG_DISCORD_URL,
    inlinedName: "ORG_DISCORD_INVITE_URL",
    inlinedValue: ORG_DISCORD_INVITE_URL,
  },
  {
    category: "Social links",
    usage: "Tipeee social link",
    keyName: "ORG_TIPEEE_URL",
    keyValue: ORG_TIPEEE_URL,
    inlinedName: "ORG_TIPEEE_PROFILE_URL",
    inlinedValue: ORG_TIPEEE_PROFILE_URL,
  },
  {
    category: "Social links",
    usage: "Email social link",
    keyName: "CONTACT_EMAIL",
    keyValue: CONTACT_EMAIL,
    inlinedName: "CONTACT_EMAIL_ADDRESS",
    inlinedValue: CONTACT_EMAIL_ADDRESS,
  },
];

const BUILD_ENV_ROWS: BuildEnvRow[] = [
  ...DOMAIN_ENV_ROWS,
  ...SOCIAL_LINK_ENV_ROWS,
];

type ComponentsSubTab = "basics" | "social" | "icons" | "lockups";

const COMPONENT_SUBTABS: { id: ComponentsSubTab; label: string }[] = [
  { id: "basics", label: "Basics" },
  { id: "social", label: "Social links" },
  { id: "icons", label: "Icon glyphs" },
  { id: "lockups", label: "Org & lockups" },
];

function labelFromGlobKey(key: string): string {
  const normalized = key.replace(/^\.\.\//, "");
  const marker = "/dist/";
  const idx = normalized.indexOf(marker);
  if (idx === -1) return normalized;
  return normalized.slice(idx + marker.length);
}

function sortedEntries(map: Record<string, string>) {
  return Object.entries(map)
    .map(([key, url]) => ({ key, url, label: labelFromGlobKey(key) }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

type AssetEntry = { key: string; url: string; label: string };

function projectSlugFromDistKey(key: string, distSubfolder: string): string {
  const normalized = key.replace(/^\.\.\//, "");
  const marker = `/dist/${distSubfolder}/`;
  const idx = normalized.indexOf(marker);
  if (idx === -1) return "_other";
  const rest = normalized.slice(idx + marker.length);
  const slash = rest.indexOf("/");
  if (slash === -1) return rest || "_other";
  return rest.slice(0, slash) || "_other";
}

function groupEntriesByProject(
  entries: AssetEntry[],
  distSubfolder: string,
): Map<string, AssetEntry[]> {
  const map = new Map<string, AssetEntry[]>();
  for (const entry of entries) {
    const slug = projectSlugFromDistKey(entry.key, distSubfolder);
    const list = map.get(slug) ?? [];
    list.push(entry);
    map.set(slug, list);
  }
  for (const list of map.values()) {
    list.sort((a, b) => a.label.localeCompare(b.label));
  }
  return map;
}

function formatProjectTabLabel(slug: string): string {
  if (slug === "_other") return "Other";
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function AssetGrid({
  entries,
  variant,
}: {
  entries: { url: string; label: string }[];
  variant: "brand" | "banners" | "favicons";
}) {
  if (entries.length === 0) return null;
  return (
    <div className={`asset-grid asset-grid--${variant}`}>
      {entries.map(({ url, label }) => (
        <AssetFigure key={label} url={url} label={label} variant={variant} />
      ))}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState<CatalogTab>("components");
  const [componentsSubTab, setComponentsSubTab] =
    useState<ComponentsSubTab>("basics");
  const [brandProject, setBrandProject] = useState<string>("");
  const [faviconProject, setFaviconProject] = useState<string>("");
  const brandEntries = sortedEntries(brandAssets);
  const brandByProject = useMemo(
    () => groupEntriesByProject(brandEntries, "brand"),
    [brandEntries],
  );
  const brandProjectSlugs = useMemo(
    () => [...brandByProject.keys()].sort((a, b) => a.localeCompare(b)),
    [brandByProject],
  );
  const bannerEntries = sortedEntries(bannerAssets);
  const faviconEntries = sortedEntries(faviconAssets);
  const faviconByProject = useMemo(
    () => groupEntriesByProject(faviconEntries, "favicons"),
    [faviconEntries],
  );
  const faviconProjectSlugs = useMemo(
    () => [...faviconByProject.keys()].sort((a, b) => a.localeCompare(b)),
    [faviconByProject],
  );

  useEffect(() => {
    if (brandProjectSlugs.length === 0) return;
    setBrandProject((prev) =>
      prev && brandProjectSlugs.includes(prev) ? prev : brandProjectSlugs[0],
    );
  }, [brandProjectSlugs]);

  useEffect(() => {
    if (faviconProjectSlugs.length === 0) return;
    setFaviconProject((prev) =>
      prev && faviconProjectSlugs.includes(prev)
        ? prev
        : faviconProjectSlugs[0],
    );
  }, [faviconProjectSlugs]);

  return (
    <div className="playground">
      <h1>
        @behindthemusictree/assets{" "}
        <span style={{ fontSize: "0.55em", opacity: 0.6, fontWeight: 400 }}>
          v{__APP_VERSION__}
        </span>
      </h1>
      <p>
        Local catalog: npm pack contents under <code>node_modules/…/dist/</code>
        . After changing brand files or the library build, run{" "}
        <code>npm run build</code> at the repo root, then refresh this app (or
        restart <code>npm run dev</code> if the catalog still looks stale). The
        org link target is **embedded in `dist/`** when you run{" "}
        <code>npm run build</code> at the repo root (see <code>ORG_DOMAIN</code>{" "}
        in <code>playground/.env</code> for <code>npm run playground</code>).
        Social link defaults (<code>ORG_GITHUB_URL</code>,{" "}
        <code>ORG_LINKEDIN_URL</code>, <code>CONTACT_EMAIL</code>, etc.) are
        inlined into <code>dist/</code> when you run root{" "}
        <code>npm run build</code> (same keys in <code>playground/.env</code>);
        pass <code>href</code> / <code>text</code> props to override.{" "}
        <strong>DocLink</strong>, <strong>DiscussionLink</strong>, and{" "}
        <strong>InformationLink</strong> have no build default — supply{" "}
        <code>href</code>. **GithubSponsorButton** and **SponsorSocialLink** use{" "}
        <code>ORG_GITHUB_SPONSOR_BUTTON_URL</code> from the package build.
        Raster and SVG previews use each file’s natural dimensions (wide assets
        scroll inside the card). <strong>TheMusicTreeMarkLink</strong>{" "}
        (symbol-only mark on a plain background, no tile) lives under{" "}
        <strong>Components</strong> → <strong>Org &amp; lockups</strong>.
      </p>

      <ul className="playground-tablist" role="tablist" aria-label="Catalog">
        {TABS.map(({ id, label }) => (
          <li key={id} role="presentation">
            <button
              type="button"
              role="tab"
              id={`tab-${id}`}
              aria-selected={tab === id}
              aria-controls={`panel-${id}`}
              tabIndex={0}
              className="playground-tab"
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      {tab === "components" && (
        <div
          className="playground-panel"
          role="tabpanel"
          id="panel-components"
          aria-labelledby="tab-components"
        >
          <section className="section" aria-labelledby="components-heading">
            <h2 id="components-heading">Components</h2>
            <ul
              className="playground-subtablist"
              role="tablist"
              aria-label="Component demos"
            >
              {COMPONENT_SUBTABS.map(({ id: subId, label: subLabel }) => (
                <li key={subId} role="presentation">
                  <button
                    type="button"
                    role="tab"
                    id={`tab-components-${subId}`}
                    aria-selected={componentsSubTab === subId}
                    aria-controls="panel-components-sub"
                    tabIndex={0}
                    className="playground-subtab"
                    onClick={() => setComponentsSubTab(subId)}
                  >
                    {subLabel}
                  </button>
                </li>
              ))}
            </ul>
            <div
              role="tabpanel"
              id="panel-components-sub"
              aria-labelledby={`tab-components-${componentsSubTab}`}
            >
              {componentsSubTab === "basics" && (
                <>
                  <div className="demo-row">
                    <span className="demo-label">Button</span>
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                  </div>
                </>
              )}
              {componentsSubTab === "social" && (
                <>
                  <div className="demo-row">
                    <span className="demo-label">
                      GithubSponsorButton —{" "}
                      <code>ORG_GITHUB_SPONSOR_BUTTON_URL</code> inlined in{" "}
                      <code>dist/</code> at package build
                    </span>
                    <div className="sponsor-demo">
                      <GithubSponsorButton />
                      <code className="lockup-showcase__code sponsor-demo__code">
                        &lt;GithubSponsorButton /&gt;
                      </code>
                      <p className="empty-note sponsor-demo__hint">
                        Root <code>npm run build</code> and playground{" "}
                        <code>npm run build</code> / <code>npm run dev</code>{" "}
                        both run <code>scripts/assert-org-url.mjs</code>{" "}
                        first—the build fails if{" "}
                        <code>ORG_GITHUB_SPONSOR_BUTTON_URL</code> or any other
                        required key is missing. If the iframe is still absent,{" "}
                        <code>node_modules/@behindthemusictree/assets</code> is
                        probably stale: run <code>npm run build</code> at the
                        repo root, then{" "}
                        <code>npm install --prefix playground</code>, and
                        refresh.
                      </p>
                    </div>
                  </div>
                  <div className="demo-row">
                    <span className="demo-label">
                      Social*Link (<code>currentColor</code>) — defaults from
                      package build env; optional <code>href</code> /{" "}
                      <code>text</code> / <code>showText</code>
                    </span>
                    <div className="social-links-demo">
                      {SOCIAL_LINK_DEMO.map(({ key, Link }) => (
                        <Link key={key} iconClassName={socialBrandIconClass} />
                      ))}
                    </div>
                  </div>
                  <div className="demo-row">
                    <span className="demo-label">
                      *SocialLinkColored — same props; brand-tinted icons
                    </span>
                    <div className="social-links-demo social-links-demo--colored">
                      {SOCIAL_LINK_DEMO.map(({ key, LinkColored }) => (
                        <LinkColored
                          key={key}
                          iconClassName={socialBrandIconClass}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
              {componentsSubTab === "icons" && (
                <>
                  <div className="demo-row">
                    <span className="demo-label">
                      <code>SocialIcons</code> — exported glyphs (
                      <code>currentColor</code> / mono); use with{" "}
                      <code>socialBrandIconClass</code> or your own sizing
                    </span>
                    <div className="social-icon-glyphs">
                      {SOCIAL_ICON_MONO.map(({ key, Icon, wide }) => (
                        <div key={key} className="social-icon-glyphs__item">
                          <div
                            className={
                              wide
                                ? "social-icon-glyphs__plate social-icon-glyphs__plate--tipeee"
                                : "social-icon-glyphs__plate"
                            }
                          >
                            <Icon className={socialBrandIconClass} />
                          </div>
                          <code className="social-icon-glyphs__name">
                            {key}
                          </code>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="demo-row">
                    <span className="demo-label">
                      <code>SocialIconsColored</code> — brand-tinted glyphs (no{" "}
                      <code>IconHeartColored</code>)
                    </span>
                    <div className="social-icon-glyphs">
                      {SOCIAL_ICON_COLORED.map(({ key, Icon, wide }) => (
                        <div key={key} className="social-icon-glyphs__item">
                          <div
                            className={
                              wide
                                ? "social-icon-glyphs__plate social-icon-glyphs__plate--tipeee"
                                : "social-icon-glyphs__plate"
                            }
                          >
                            <Icon className={socialBrandIconClass} />
                          </div>
                          <code className="social-icon-glyphs__name">
                            {key}
                          </code>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {componentsSubTab === "social" && (
                <>
                  <div className="demo-row">
                    <span className="demo-label">
                      Social*Link + <code>showText</code> — canonical pill from{" "}
                      <code>
                        @behindthemusictree/assets/styles/icon-links.css
                      </code>{" "}
                      (imported in <code>main.tsx</code>); SVG size in that
                      sheet when not using Tailwind on icons
                    </span>
                    <div className="social-links-demo">
                      {SOCIAL_LINK_DEMO.map(({ key, Link }) => (
                        <Link
                          key={key}
                          iconClassName={socialBrandIconClass}
                          showText
                        />
                      ))}
                    </div>
                  </div>
                  <div className="demo-row">
                    <span className="demo-label">
                      *SocialLinkColored + <code>showText</code> — same pill
                      styling
                    </span>
                    <div className="social-links-demo social-links-demo--colored">
                      {SOCIAL_LINK_DEMO.map(({ key, LinkColored }) => (
                        <LinkColored
                          key={key}
                          iconClassName={socialBrandIconClass}
                          showText
                        />
                      ))}
                    </div>
                  </div>
                  <div className="demo-row">
                    <span className="demo-label">
                      Dark surface —{" "}
                      <code>{`className={BTMT_ICON_LINK_DARK_CLASS}`}</code> +{" "}
                      <code>currentColor</code> icons
                    </span>
                    <div
                      className="social-links-demo social-links-demo--on-dark"
                      aria-label="Social links on dark background"
                    >
                      {SOCIAL_LINK_DEMO.map(({ key, Link }) => (
                        <Link
                          key={key}
                          className={BTMT_ICON_LINK_DARK_CLASS}
                          iconClassName={socialBrandIconClass}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="demo-row">
                    <span className="demo-label">
                      Dark surface — <code>*SocialLinkColored</code> +{" "}
                      <code>{`className={BTMT_ICON_LINK_DARK_CLASS}`}</code>
                    </span>
                    <div className="social-links-demo social-links-demo--on-dark social-links-demo--colored">
                      {SOCIAL_LINK_DEMO.map(({ key, LinkColored }) => (
                        <LinkColored
                          key={key}
                          className={BTMT_ICON_LINK_DARK_CLASS}
                          iconClassName={socialBrandIconClass}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="demo-row">
                    <span className="demo-label">
                      Dark surface + <code>showText</code> — dark pill from{" "}
                      <code>icon-links.css</code>
                    </span>
                    <div className="social-links-demo social-links-demo--on-dark">
                      {SOCIAL_LINK_DEMO.map(({ key, Link }) => (
                        <Link
                          key={key}
                          className={BTMT_ICON_LINK_DARK_CLASS}
                          iconClassName={socialBrandIconClass}
                          showText
                        />
                      ))}
                    </div>
                  </div>
                  <div className="demo-row">
                    <span className="demo-label">
                      Dark surface — colored + <code>showText</code>
                    </span>
                    <div className="social-links-demo social-links-demo--on-dark social-links-demo--colored">
                      {SOCIAL_LINK_DEMO.map(({ key, LinkColored }) => (
                        <LinkColored
                          key={key}
                          className={BTMT_ICON_LINK_DARK_CLASS}
                          iconClassName={socialBrandIconClass}
                          showText
                        />
                      ))}
                    </div>
                  </div>
                  <div className="demo-row">
                    <span className="demo-label">
                      Custom <code>href</code> + <code>text</code> +{" "}
                      <code>showText</code>
                    </span>
                    <div className="social-links-demo">
                      <GithubSocialLink
                        iconClassName={socialBrandIconClass}
                        href="https://github.com/octocat"
                        text="Octocat (demo)"
                        showText
                      />
                    </div>
                  </div>
                  <div className="demo-row">
                    <span className="demo-label">
                      DocLink, DiscussionLink, InformationLink — no
                      package-build default; require <code>href</code> (demo
                      URLs are arbitrary)
                    </span>
                    <div className="social-links-demo">
                      <DocLink
                        iconClassName={socialBrandIconClass}
                        href="https://example.com/docs"
                        text="Documentation (demo)"
                        showText
                      />
                      <DocLinkColored
                        iconClassName={socialBrandIconClass}
                        href="https://example.com/docs"
                        text="Documentation (demo)"
                        showText
                      />
                      <DiscussionLink
                        iconClassName={socialBrandIconClass}
                        href="https://example.com/discuss"
                        text="Discussion (demo)"
                        showText
                      />
                      <DiscussionLinkColored
                        iconClassName={socialBrandIconClass}
                        href="https://example.com/discuss"
                        text="Discussion (demo)"
                        showText
                      />
                      <InformationLink
                        iconClassName={socialBrandIconClass}
                        href="https://example.com/info"
                        text="Information (demo)"
                        showText
                      />
                      <InformationLinkColored
                        iconClassName={socialBrandIconClass}
                        href="https://example.com/info"
                        text="Information (demo)"
                        showText
                      />
                    </div>
                  </div>
                </>
              )}
              {componentsSubTab === "lockups" && (
                <>
                  <div className="lockup-showcase">
                    <span className="demo-label">
                      TheMusicTreeHorizontalLink (TheMusicTreeByline — same
                      component)
                    </span>
                    <p className="lockup-showcase__intro">
                      SVG knockouts; <code>href</code> is baked into published{" "}
                      <code>dist/</code> when the package is built (not a prop).
                      TheMusicTreeByline is an export alias with the same props
                      and behavior. Hover or tab for focus styles.
                    </p>
                    <div className="lockup-showcase__grid">
                      <div className="lockup-showcase__tile lockup-showcase__tile--light">
                        <span className="lockup-showcase__tile-label">
                          default — light UI
                        </span>
                        <code className="lockup-showcase__code">
                          &lt;TheMusicTreeHorizontalLink /&gt;
                        </code>
                        <div className="lockup-showcase__sample">
                          <TheMusicTreeHorizontalLink />
                        </div>
                      </div>
                      <div className="lockup-showcase__tile lockup-showcase__tile--dark">
                        <span className="lockup-showcase__tile-label">
                          variant onDark — dark UI
                        </span>
                        <code className="lockup-showcase__code">
                          variant=&quot;onDark&quot;
                        </code>
                        <div className="lockup-showcase__sample">
                          <TheMusicTreeHorizontalLink variant="onDark" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lockup-showcase">
                    <span className="demo-label">TheMusicTreeMarkLink</span>
                    <p className="lockup-showcase__intro">
                      Symbol-only mark; SVGs are{" "}
                      <strong>the-music-tree-mark.svg</strong> and{" "}
                      <strong>the-music-tree-mark-dark.svg</strong>. Same baked{" "}
                      <code>href</code> as the lockup link. Use{" "}
                      <code>variant="onDark"</code> for dark surfaces.
                    </p>
                    <div className="demo-row lockup-showcase__mark-plain-bg">
                      <span className="demo-label">
                        Plain playground background — no tile (transparent
                        knockout only)
                      </span>
                      <TheMusicTreeMarkLink imageStyle={{ height: "64px" }} />
                    </div>
                    <div className="lockup-showcase__grid">
                      <div className="lockup-showcase__tile lockup-showcase__tile--light">
                        <span className="lockup-showcase__tile-label">
                          default mark — light UI
                        </span>
                        <code className="lockup-showcase__code">
                          &lt;TheMusicTreeMarkLink /&gt;
                        </code>
                        <div className="lockup-showcase__sample">
                          <TheMusicTreeMarkLink
                            imageStyle={{ height: "64px" }}
                          />
                        </div>
                      </div>
                      <div className="lockup-showcase__tile lockup-showcase__tile--dark">
                        <span className="lockup-showcase__tile-label">
                          mark variant onDark — dark UI
                        </span>
                        <code className="lockup-showcase__code">
                          variant=&quot;onDark&quot;
                        </code>
                        <div className="lockup-showcase__sample">
                          <TheMusicTreeMarkLink
                            variant="onDark"
                            imageStyle={{ height: "64px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="demo-row lockup-raster-preview">
                    <span className="demo-label">
                      Brand mark SVGs (dist — same sources as{" "}
                      <code>TheMusicTreeMarkLink</code>)
                    </span>
                    <div className="lockup-raster-preview__pair">
                      <figure className="lockup-raster-preview__figure">
                        <figcaption className="asset-card-title">
                          the-music-tree-mark.svg
                        </figcaption>
                        <div className="lockup-raster-preview__plate lockup-raster-preview__plate--light">
                          <img src={markDefaultSvg} alt="" decoding="async" />
                        </div>
                      </figure>
                      <figure className="lockup-raster-preview__figure">
                        <figcaption className="asset-card-title">
                          the-music-tree-mark-dark.svg
                        </figcaption>
                        <div className="lockup-raster-preview__plate lockup-raster-preview__plate--dark">
                          <img src={markDarkSvg} alt="" decoding="async" />
                        </div>
                      </figure>
                    </div>
                  </div>
                  <div className="demo-row lockup-raster-preview">
                    <span className="demo-label">
                      Brand mark PNGs (dist — symbol-only rasters)
                    </span>
                    <div className="lockup-raster-preview__pair">
                      <figure className="lockup-raster-preview__figure">
                        <figcaption className="asset-card-title">
                          the-music-tree-mark.png
                        </figcaption>
                        <div className="lockup-raster-preview__plate lockup-raster-preview__plate--light">
                          <img src={markDefaultPng} alt="" decoding="async" />
                        </div>
                      </figure>
                      <figure className="lockup-raster-preview__figure">
                        <figcaption className="asset-card-title">
                          the-music-tree-mark-dark.png
                        </figcaption>
                        <div className="lockup-raster-preview__plate lockup-raster-preview__plate--dark">
                          <img src={markDarkPng} alt="" decoding="async" />
                        </div>
                      </figure>
                    </div>
                  </div>
                  <div className="demo-row lockup-raster-preview">
                    <span className="demo-label">
                      Brand lockup PNGs (dist — raster knockouts for non-React)
                    </span>
                    <div className="lockup-raster-preview__pair">
                      <figure className="lockup-raster-preview__figure">
                        <figcaption className="asset-card-title">
                          the-music-tree-lockup-horizontal.png
                        </figcaption>
                        <div className="lockup-raster-preview__plate lockup-raster-preview__plate--light">
                          <img src={lockupDefaultPng} alt="" decoding="async" />
                        </div>
                      </figure>
                      <figure className="lockup-raster-preview__figure">
                        <figcaption className="asset-card-title">
                          the-music-tree-lockup-horizontal-dark.png
                        </figcaption>
                        <div className="lockup-raster-preview__plate lockup-raster-preview__plate--dark">
                          <img src={lockupDarkPng} alt="" decoding="async" />
                        </div>
                      </figure>
                    </div>
                  </div>
                  <div className="demo-row lockup-raster-preview">
                    <span className="demo-label">
                      Grow the Music Tree lockup (dist —{" "}
                      <code>brand/grow-the-music-tree/</code>)
                    </span>
                    <div className="lockup-raster-preview__pair">
                      <figure className="lockup-raster-preview__figure">
                        <figcaption className="asset-card-title">
                          grow-the-music-tree-lockup-horizontal.svg
                        </figcaption>
                        <div className="lockup-raster-preview__plate lockup-raster-preview__plate--light">
                          <img src={gtmtLockupSvg} alt="" decoding="async" />
                        </div>
                      </figure>
                      <figure className="lockup-raster-preview__figure">
                        <figcaption className="asset-card-title">
                          grow-the-music-tree-lockup-horizontal-full.png
                        </figcaption>
                        <div className="lockup-raster-preview__plate lockup-raster-preview__plate--light">
                          <img
                            src={gtmtLockupFullPng}
                            alt=""
                            decoding="async"
                          />
                        </div>
                      </figure>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      )}

      {tab === "brand" && (
        <div
          className="playground-panel"
          role="tabpanel"
          id="panel-brand"
          aria-labelledby="tab-brand"
        >
          <section className="section" aria-labelledby="brand-heading">
            <h2 id="brand-heading">Brand (dist/brand)</h2>
            {brandEntries.length === 0 ? (
              <p className="empty-note">
                No files matched. Run <code>npm run build</code> at the
                repository root so <code>dist/brand</code> exists.
              </p>
            ) : (
              <>
                <ul
                  className="playground-subtablist"
                  role="tablist"
                  aria-label="Brand project"
                >
                  {brandProjectSlugs.map((slug) => (
                    <li key={slug} role="presentation">
                      <button
                        type="button"
                        role="tab"
                        id={`tab-brand-${slug}`}
                        aria-selected={brandProject === slug}
                        aria-controls="panel-brand-project"
                        tabIndex={0}
                        className="playground-subtab"
                        onClick={() => setBrandProject(slug)}
                      >
                        {formatProjectTabLabel(slug)}
                      </button>
                    </li>
                  ))}
                </ul>
                <div
                  role="tabpanel"
                  id="panel-brand-project"
                  aria-labelledby={
                    brandProject ? `tab-brand-${brandProject}` : undefined
                  }
                >
                  <AssetGrid
                    entries={brandByProject.get(brandProject) ?? []}
                    variant="brand"
                  />
                </div>
              </>
            )}
          </section>
        </div>
      )}

      {tab === "env" && (
        <div
          className="playground-panel"
          role="tabpanel"
          id="panel-env"
          aria-labelledby="tab-env"
        >
          <section className="section" aria-labelledby="env-heading">
            <h2 id="env-heading">Build constants (from installed package)</h2>
            <p className="empty-note env-vars-note">
              This table shows constants exported by{" "}
              <code>@behindthemusictree/assets/components</code>. The rightmost
              values are read from built package code, not your runtime process
              env. Org site and sponsor keys are included in the first rows. If
              any value is <code>undefined</code>, rebuild the root package with
              a populated
              <code>playground/.env</code>, then run{" "}
              <code>npm install --prefix playground</code>.
            </p>
            <div className="env-vars-table-wrap">
              <table className="env-vars-table">
                <thead>
                  <tr>
                    <th scope="col">Category</th>
                    <th scope="col">Usage</th>
                    <th scope="col">Build key export</th>
                    <th scope="col">Build key string</th>
                    <th scope="col">Inlined export</th>
                    <th scope="col">Current inlined value</th>
                  </tr>
                </thead>
                <tbody>
                  {BUILD_ENV_ROWS.map((row) => (
                    <tr key={row.inlinedName}>
                      <td>{row.category}</td>
                      <td>{row.usage}</td>
                      <td>
                        <code>{row.keyName}</code>
                      </td>
                      <td>
                        <code>{row.keyValue}</code>
                      </td>
                      <td>
                        <code>{row.inlinedName}</code>
                      </td>
                      <td>
                        <code>
                          {row.inlinedValue && row.inlinedValue.length > 0
                            ? row.inlinedValue
                            : "undefined"}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {tab === "banners" && (
        <div
          className="playground-panel"
          role="tabpanel"
          id="panel-banners"
          aria-labelledby="tab-banners"
        >
          <section className="section" aria-labelledby="banners-heading">
            <h2 id="banners-heading">Banners (dist/banners)</h2>
            {bannerEntries.length === 0 ? (
              <p className="empty-note">
                No banner files in dist yet. Add rasters under{" "}
                <code>src/banners/&lt;project-slug&gt;/</code>, run a full
                library build, then refresh.
              </p>
            ) : (
              <AssetGrid entries={bannerEntries} variant="banners" />
            )}
          </section>
        </div>
      )}

      {tab === "favicons" && (
        <div
          className="playground-panel"
          role="tabpanel"
          id="panel-favicons"
          aria-labelledby="tab-favicons"
        >
          <section className="section" aria-labelledby="favicons-heading">
            <h2 id="favicons-heading">Favicons (dist/favicons)</h2>
            {faviconEntries.length === 0 ? (
              <p className="empty-note">
                No favicon files matched. Run <code>npm run build</code> at the
                repository root.
              </p>
            ) : (
              <>
                <ul
                  className="playground-subtablist"
                  role="tablist"
                  aria-label="Favicon project"
                >
                  {faviconProjectSlugs.map((slug) => (
                    <li key={slug} role="presentation">
                      <button
                        type="button"
                        role="tab"
                        id={`tab-favicon-${slug}`}
                        aria-selected={faviconProject === slug}
                        aria-controls="panel-favicon-project"
                        tabIndex={0}
                        className="playground-subtab"
                        onClick={() => setFaviconProject(slug)}
                      >
                        {formatProjectTabLabel(slug)}
                      </button>
                    </li>
                  ))}
                </ul>
                <div
                  role="tabpanel"
                  id="panel-favicon-project"
                  aria-labelledby={
                    faviconProject ? `tab-favicon-${faviconProject}` : undefined
                  }
                >
                  <AssetGrid
                    entries={faviconByProject.get(faviconProject) ?? []}
                    variant="favicons"
                  />
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
