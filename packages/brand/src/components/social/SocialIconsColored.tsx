/**
 * Brand-colored variants of social marks (fixed fills/strokes, not `currentColor`).
 * Use when you want recognizable platform colors; use base `Icon*` from
 * `SocialIcons.tsx` when icons should follow text/theme color.
 */

import tipeeeMarkUrl from "./icons/tipeee-mark.svg";

const gh = "#181717";
const githubSponsors = "#EA4AAA";
const pypi = "#3775A9";
const li = "#0A66C2";
const x = "#000000";
const mastodon = "#6364FF";
const yt = "#FF0000";
const spotify = "#1DB954";
const discord = "#5865F2";
const mail = "#1A73E8";
const web = "#6366F1";
/** Docs / book-open accent (not a platform brand). */
const docs = "#2563EB";
/** Discussion / conversation bubble accent (not a platform brand). */
const discussion = "#7C3AED";
/** Information / info-circle accent (not a platform brand). */
const information = "#0284C7";

export function IconGithubColored({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={gh}
      aria-hidden
      data-btmt-social="github"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

/** Same path as **`IconGitHubSponsors`** (Simple Icons, CC0). */
export function IconGitHubSponsorsColored({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={githubSponsors} aria-hidden>
      <path d="M17.625 1.499c-2.32 0-4.354 1.203-5.625 3.03-1.271-1.827-3.305-3.03-5.625-3.03C3.129 1.499 0 4.253 0 8.249c0 4.275 3.068 7.847 5.828 10.227a33.14 33.14 0 0 0 5.616 3.876l.028.017.008.003-.001.003c.163.085.342.126.521.125.179.001.358-.041.521-.125l-.001-.003.008-.003.028-.017a33.14 33.14 0 0 0 5.616-3.876C20.932 16.096 24 12.524 24 8.249c0-3.996-3.129-6.75-6.375-6.75zm-.919 15.275a30.766 30.766 0 0 1-4.703 3.316l-.004-.002-.004.002a30.955 30.955 0 0 1-4.703-3.316c-2.677-2.307-5.047-5.298-5.047-8.523 0-2.754 2.121-4.5 4.125-4.5 2.06 0 3.914 1.479 4.544 3.684.143.495.596.797 1.086.796.49.001.943-.302 1.085-.796.63-2.205 2.484-3.684 4.544-3.684 2.004 0 4.125 1.746 4.125 4.5 0 3.225-2.37 6.216-5.048 8.523z" />
    </svg>
  );
}

/** PyPI mark (Simple Icons, CC0). */
export function IconPypiColored({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={pypi} aria-hidden>
      <path d="M23.922 13.58v3.912L20.55 18.72l-.078.055.052.037 3.45-1.256.026-.036v-3.997l-.053-.036-.025.092z M23.621 5.618l-3.04 1.107v3.912l3.339-1.215V5.509zM23.92 13.457V9.544l-3.336 1.215v3.913zM20.47 14.71V10.8L17.17 12v3.913zM17.034 19.996v-3.912l-3.313 1.206v3.912zM17.17 16.057v3.868l3.314-1.206V14.85l-3.314 1.206zm2.093 1.882c-.367.134-.663-.074-.663-.463s.296-.814.663-.947c.365-.133.662.075.662.464s-.297.814-.662.946z M13.225 9.315l.365-.132-3.285-1.197-3.323 1.21.102.037 3.184 1.16zM20.507 10.664V6.751L17.17 7.965v3.913zM17.058 11.918V8.005l-3.302 1.202v3.912zM13.643 9.246l-3.336 1.215v3.913l3.336-1.215zM6.907 13.165l3.322 1.209v-3.913L6.907 9.252z M10.34 7.873l3.281 1.193V5.198l-3.28-1.193zM20.507 2.715L17.19 3.922v3.913l3.317-1.207zM16.95 3.903L13.724 2.73l-3.269 1.19 3.225 1.174zM15.365 4.606l-1.624.592v3.868l3.317-1.207V3.991l-1.693.615zm-.391 2.778c-.367.134-.662-.074-.662-.464s.295-.813.662-.946c.366-.133.663.074.663.464s-.297.813-.663.946z M10.229 18.41v-3.914l-3.322-1.209V17.2zM13.678 17.182v-3.913l-3.371 1.227v3.913z M13.756 17.154l3.3-1.2V12.04l-3.3 1.2zM13.678 21.217l-3.371 1.227v-3.912h-.078v3.912l-3.322-1.209v-3.913l-.053-.058-.025-.06-3.336-1.21v-3.948l.034.013 3.287 1.196.015-.078-3.261-1.187 3.26-1.187v-.109L3.876 9.62l-.307-.112 3.26-1.188v.877l.079-.055V6.769l3.257 1.185.058-.061L7.084 6.75l-.102-.037 3.24-1.179v-.083L6.854 6.677v.018l-.025.018v1.523L3.44 9.47v.02l-.025.017v4.007l-3.39 1.233v.019L0 14.784v3.995l.025.037 3.4 1.237.008-.006.007.01 3.4 1.238.008-.006.006.01 3.4 1.237.014-.009.012.01 3.45-1.256.026-.037-.078-.027zM3.493 9.563l3.257 1.185-3.257 1.187V9.562zM3.4 19.96L.078 18.752v-3.913l2.361.86.96.349v3.913zm.015-3.99L.335 14.85l-.182-.066 3.262-1.187v2.374zm3.399 5.231l-3.321-1.209v-3.912l3.321 1.209v3.912zM23.791 5.434l-3.21-1.17v2.338zM20.387 2.643l-3.24-1.18-3.27 1.19 3.247 1.182z" />
    </svg>
  );
}

export function IconLinkedInColored({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={li} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function IconTwitterColored({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={x}
      aria-hidden
      data-btmt-social="x"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/** Same path as **`IconMastodon`** (Simple Icons, CC0). */
export function IconMastodonColored({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={mastodon} aria-hidden>
      <path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z" />
    </svg>
  );
}

export function IconYouTubeColored({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={yt} aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

/** Same path as **`IconSpotify`** (Simple Icons, CC0). */
export function IconSpotifyColored({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={spotify}
      aria-hidden
      data-btmt-social="spotify"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.66c.361.181.54.78.241 1.38zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.261 11.28-1.021 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

/** Same path as **`IconDiscord`** (Simple Icons, CC0). */
export function IconDiscordColored({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={discord}
      aria-hidden
      data-btmt-social="discord"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

/** Same asset as **`IconTipeee`** (`./icons/tipeee-mark.svg`). */
export function IconTipeeeColored({ className }: { className?: string }) {
  return (
    <span
      className={className}
      aria-hidden
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        width: "4.75rem",
        height: "1.5rem",
        minWidth: 0,
        flexShrink: 0,
      }}
    >
      <img
        src={tipeeeMarkUrl}
        alt=""
        aria-hidden
        decoding="async"
        data-btmt-social="tipeee"
        style={{
          display: "block",
          maxWidth: "100%",
          maxHeight: "100%",
          width: "auto",
          height: "auto",
          objectFit: "contain",
        }}
      />
    </span>
  );
}

export function IconEmailColored({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke={mail}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

/** Same geometry as **`IconBookOpen`** (Lucide `book-open`). */
export function IconBookOpenColored({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke={docs}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </svg>
  );
}

export function IconWebsiteColored({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke={web}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  );
}

/** Same paths as **`IconGitHubConversation`**. */
export function IconGitHubConversationColored({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke={discussion}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

/** Same paths as **`IconIssue`** (info-in-circle). */
export function IconIssueColored({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke={information}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}
