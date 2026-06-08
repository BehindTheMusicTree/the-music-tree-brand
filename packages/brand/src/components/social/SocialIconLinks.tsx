import type { ComponentType } from "react";
import {
  IconBookOpen,
  IconEmail,
  IconGithub,
  IconGitHubConversation,
  IconGitHubSponsors,
  IconIssue,
  IconLinkedIn,
  IconMastodon,
  IconPypi,
  IconDiscord,
  IconSpotify,
  IconTipeee,
  IconTwitter,
  IconWebsite,
  IconYouTube,
} from "./SocialIcons";
import {
  IconBookOpenColored,
  IconEmailColored,
  IconGithubColored,
  IconGitHubConversationColored,
  IconGitHubSponsorsColored,
  IconIssueColored,
  IconLinkedInColored,
  IconMastodonColored,
  IconPypiColored,
  IconDiscordColored,
  IconSpotifyColored,
  IconTipeeeColored,
  IconTwitterColored,
  IconWebsiteColored,
  IconYouTubeColored,
} from "./SocialIconsColored";
import { normalizeHttpUrl, normalizeMailtoHref } from "./socialHrefUtils";

/** Shipped in **`@behindthemusictree/assets/styles/icon-links.css`**. */
export const BTMT_ICON_LINK_CLASS = "btmt-icon-link";
/** Modifier when **`showText`** is true (pill + label). */
export const BTMT_ICON_LINK_WITH_TEXT_CLASS = "btmt-icon-link--with-text";
/** Light text + dark pill on dark backgrounds; combine with **`BTMT_ICON_LINK_CLASS`**. */
export const BTMT_ICON_LINK_DARK_CLASS = "btmt-icon-link--dark";

function joinClassNames(
  ...parts: (string | undefined | null | false)[]
): string | undefined {
  const s = parts.filter(Boolean).join(" ").trim();
  return s || undefined;
}

export type SocialIconLinkProps = {
  /**
   * Link target. When omitted, uses the URL or email **inlined at package build** from the
   * matching **`ORG_*`**, **`CONTACT_EMAIL`**, or **`ORG_DOMAIN`** env var.
   * **`DocLink`**, **`DiscussionLink`**, **`InformationLink`**, and their **`Colored`** variants
   * have no build default; without **`href`** they render nothing.
   */
  href?: string;
  /**
   * Accessible name and default **`title`**. When **`showText`** is true, also rendered as visible
   * label beside the icon.
   */
  text?: string;
  className?: string;
  iconClassName?: string;
  /** Renders **`text`** (or the default label) next to the icon. */
  showText?: boolean;
  /** Overrides the tooltip; defaults to the resolved accessible name. */
  title?: string;
  /**
   * When **`false`** (default), the anchor uses canonical classes; import
   * **`@behindthemusictree/assets/styles/icon-links.css`** once in your app for the
   * intended look. When **`true`**, no default classes are applied—only **`className`** (if any).
   */
  unstyled?: boolean;
};

type Kind = "http" | "mailto";

function createSocialIconLink(
  kind: Kind,
  readDefaultRaw: () => string | undefined,
  defaultText: string,
  Icon: ComponentType<{ className?: string }>,
) {
  return function SocialIconLink({
    href: hrefProp,
    text,
    className,
    iconClassName,
    showText = false,
    title: titleProp,
    unstyled = false,
  }: SocialIconLinkProps) {
    const raw = (hrefProp?.trim() || readDefaultRaw()?.trim()) ?? "";
    if (!raw) return null;

    const href =
      kind === "mailto" ? normalizeMailtoHref(raw) : normalizeHttpUrl(raw);
    if (!href) return null;

    const label = (text?.trim() || defaultText).trim() || defaultText;
    const linkTitle = titleProp?.trim() || label;
    const external = !href.startsWith("mailto:");

    const defaultClasses = unstyled
      ? undefined
      : joinClassNames(
          BTMT_ICON_LINK_CLASS,
          showText ? BTMT_ICON_LINK_WITH_TEXT_CLASS : null,
        );
    const mergedClassName = joinClassNames(defaultClasses, className);

    return (
      <a
        href={href}
        className={mergedClassName}
        aria-label={label}
        title={linkTitle}
        {...(external
          ? { target: "_blank" as const, rel: "noopener noreferrer" as const }
          : {})}
      >
        <Icon className={iconClassName} />
        {showText ? <span>{label}</span> : null}
      </a>
    );
  };
}

export const GithubSocialLink = createSocialIconLink(
  "http",
  () => process.env.ORG_GITHUB_URL?.trim() || undefined,
  "GitHub",
  IconGithub,
);

export const GithubSocialLinkColored = createSocialIconLink(
  "http",
  () => process.env.ORG_GITHUB_URL?.trim() || undefined,
  "GitHub",
  IconGithubColored,
);

export const SponsorSocialLink = createSocialIconLink(
  "http",
  () => process.env.ORG_GITHUB_SPONSOR_BUTTON_URL?.trim() || undefined,
  "GitHub Sponsors",
  IconGitHubSponsors,
);

export const SponsorSocialLinkColored = createSocialIconLink(
  "http",
  () => process.env.ORG_GITHUB_SPONSOR_BUTTON_URL?.trim() || undefined,
  "GitHub Sponsors",
  IconGitHubSponsorsColored,
);

export const PypiSocialLink = createSocialIconLink(
  "http",
  () => process.env.ORG_PYPI_URL?.trim() || undefined,
  "PyPI",
  IconPypi,
);

export const PypiSocialLinkColored = createSocialIconLink(
  "http",
  () => process.env.ORG_PYPI_URL?.trim() || undefined,
  "PyPI",
  IconPypiColored,
);

export const LinkedInSocialLink = createSocialIconLink(
  "http",
  () => process.env.ORG_LINKEDIN_URL?.trim() || undefined,
  "LinkedIn",
  IconLinkedIn,
);

export const LinkedInSocialLinkColored = createSocialIconLink(
  "http",
  () => process.env.ORG_LINKEDIN_URL?.trim() || undefined,
  "LinkedIn",
  IconLinkedInColored,
);

export const XSocialLink = createSocialIconLink(
  "http",
  () => process.env.ORG_X_URL?.trim() || undefined,
  "X (Twitter)",
  IconTwitter,
);

export const XSocialLinkColored = createSocialIconLink(
  "http",
  () => process.env.ORG_X_URL?.trim() || undefined,
  "X (Twitter)",
  IconTwitterColored,
);

export const MastodonSocialLink = createSocialIconLink(
  "http",
  () => process.env.ORG_MASTODON_URL?.trim() || undefined,
  "Mastodon",
  IconMastodon,
);

export const MastodonSocialLinkColored = createSocialIconLink(
  "http",
  () => process.env.ORG_MASTODON_URL?.trim() || undefined,
  "Mastodon",
  IconMastodonColored,
);

export const YouTubeSocialLink = createSocialIconLink(
  "http",
  () => process.env.ORG_YOUTUBE_URL?.trim() || undefined,
  "YouTube",
  IconYouTube,
);

export const YouTubeSocialLinkColored = createSocialIconLink(
  "http",
  () => process.env.ORG_YOUTUBE_URL?.trim() || undefined,
  "YouTube",
  IconYouTubeColored,
);

export const SpotifySocialLink = createSocialIconLink(
  "http",
  () => process.env.ORG_SPOTIFY_URL?.trim() || undefined,
  "Spotify",
  IconSpotify,
);

export const SpotifySocialLinkColored = createSocialIconLink(
  "http",
  () => process.env.ORG_SPOTIFY_URL?.trim() || undefined,
  "Spotify",
  IconSpotifyColored,
);

export const DiscordSocialLink = createSocialIconLink(
  "http",
  () => process.env.ORG_DISCORD_URL?.trim() || undefined,
  "Discord",
  IconDiscord,
);

export const DiscordSocialLinkColored = createSocialIconLink(
  "http",
  () => process.env.ORG_DISCORD_URL?.trim() || undefined,
  "Discord",
  IconDiscordColored,
);

export const TipeeeSocialLink = createSocialIconLink(
  "http",
  () => process.env.ORG_TIPEEE_URL?.trim() || undefined,
  "Tipeee",
  IconTipeee,
);

export const TipeeeSocialLinkColored = createSocialIconLink(
  "http",
  () => process.env.ORG_TIPEEE_URL?.trim() || undefined,
  "Tipeee",
  IconTipeeeColored,
);

export const EmailSocialLink = createSocialIconLink(
  "mailto",
  () => process.env.CONTACT_EMAIL?.trim() || undefined,
  "Email",
  IconEmail,
);

export const EmailSocialLinkColored = createSocialIconLink(
  "mailto",
  () => process.env.CONTACT_EMAIL?.trim() || undefined,
  "Email",
  IconEmailColored,
);

export const WebsiteSocialLink = createSocialIconLink(
  "http",
  () => process.env.ORG_DOMAIN?.trim() || undefined,
  "Website",
  IconWebsite,
);

export const WebsiteSocialLinkColored = createSocialIconLink(
  "http",
  () => process.env.ORG_DOMAIN?.trim() || undefined,
  "Website",
  IconWebsiteColored,
);

/** Documentation link; **`href`** must be supplied (no env default at package build). */
export const DocLink = createSocialIconLink(
  "http",
  () => undefined,
  "Documentation",
  IconBookOpen,
);

export const DocLinkColored = createSocialIconLink(
  "http",
  () => undefined,
  "Documentation",
  IconBookOpenColored,
);

/** Discussion link; **`href`** must be supplied (no env default at package build). */
export const DiscussionLink = createSocialIconLink(
  "http",
  () => undefined,
  "Discussion",
  IconGitHubConversation,
);

export const DiscussionLinkColored = createSocialIconLink(
  "http",
  () => undefined,
  "Discussion",
  IconGitHubConversationColored,
);

/** Information link; **`href`** must be supplied (no env default at package build). */
export const InformationLink = createSocialIconLink(
  "http",
  () => undefined,
  "Information",
  IconIssue,
);

export const InformationLinkColored = createSocialIconLink(
  "http",
  () => undefined,
  "Information",
  IconIssueColored,
);
