import type { CSSProperties, IframeHTMLAttributes } from "react";

import { GithubSponsorButtonUrl } from "../buildEnv/buildEnv";

function readGithubSponsorButtonSrcFromProcess(): string | undefined {
  const v = process.env.ORG_GITHUB_SPONSOR_BUTTON_URL?.trim();
  return v || undefined;
}

export type GithubSponsorButtonProps = {
  /** Defaults to **Sponsor BehindTheMusicTree**. */
  title?: string;
  className?: string;
  style?: CSSProperties;
} & Pick<IframeHTMLAttributes<HTMLIFrameElement>, "loading">;

/**
 * GitHub Sponsors (or other) embed **iframe**. **`src`** comes from **`GithubSponsorButtonUrl`**
 * at **package build** time, not from props. **`scripts/assert-org-url.mjs`** fails **`npm run build`**
 * when that variable is missing, so published **`dist/`** should always include a non-empty URL; this
 * component returns **`null`** only if a consumer bundles a non-standard build with an empty inlined
 * value.
 */
export function GithubSponsorButton({
  title = "Sponsor BehindTheMusicTree",
  className,
  style,
  loading = "lazy",
  ...rest
}: GithubSponsorButtonProps) {
  const src = readGithubSponsorButtonSrcFromProcess();
  if (!src) return null;

  return (
    <iframe
      {...rest}
      src={src}
      title={title}
      height={32}
      width={114}
      loading={loading}
      className={className}
      style={{ border: 0, borderRadius: 6, ...style }}
    />
  );
}

/** @deprecated Use {@link GithubSponsorButton}. */
export const BtmtSponsorButton = GithubSponsorButton;

/** @deprecated Use {@link GithubSponsorButtonProps}. */
export type BtmtSponsorButtonProps = GithubSponsorButtonProps;

/** @deprecated Use {@link GithubSponsorButtonUrl}. */
export const ORG_GITHUB_SPONSOR_BUTTON_URL = GithubSponsorButtonUrl;
