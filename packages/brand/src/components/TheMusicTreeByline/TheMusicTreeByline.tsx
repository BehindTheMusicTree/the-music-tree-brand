import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
/**
 * Renders **SVG knockouts** (transparent outside the artwork). Raster exports for email/CMS: **`the-music-tree-lockup-horizontal.png`** / **`-dark.png`**; full master: **`the-music-tree-lockup-horizontal-full.png`**. Do not swap for another mark.
 */
import theMusicTreeLockupHorizontalDark from "../../brand/the-music-tree/the-music-tree-lockup-horizontal-dark.svg";
import theMusicTreeLockupHorizontal from "../../brand/the-music-tree/the-music-tree-lockup-horizontal.svg";
import theMusicTreeMarkDark from "../../brand/the-music-tree/the-music-tree-mark-dark.svg";
import theMusicTreeMark from "../../brand/the-music-tree/the-music-tree-mark.svg";
import { resolveOrgSiteHref } from "../buildEnv/orgSiteEnv";

/**
 * Clickable **`the-music-tree-lockup-horizontal`** artwork only (no separate text node).
 * **`href`** is fixed in published **`dist/`** (from **`ORG_DOMAIN`** when the package was built) — not a prop.
 * Transparent knockout only — **`backgroundColor: transparent`** on the link and image so host CSS cannot paint a plate behind the lockup.
 * Hover and keyboard **`:focus-visible`** slightly change the image aspect (**`transform`**); focus uses a **2px** ring (**`currentColor`**).
 */
export type TheMusicTreeBylineProps = {
  /** Applied to the outer `<a>`. */
  className?: string;
  /** Lockup image sizing (default height **56px**, width **auto**). */
  imageClassName?: string;
  imageStyle?: CSSProperties;
  /**
   * `onDark`: light ink, transparent knockout (**`the-music-tree-lockup-horizontal-dark.svg`**). Raster **`-dark.png`** ships for non-SVG contexts.
   */
  variant?: "default" | "onDark";
};

const anchorStyle: CSSProperties = {
  display: "inline-block",
  lineHeight: 0,
  textDecoration: "none",
  borderRadius: "8px",
  backgroundColor: "transparent",
};

const defaultImgStyle: CSSProperties = {
  display: "block",
  height: "56px",
  width: "auto",
  transformOrigin: "center",
  backgroundColor: "transparent",
};

/** Slightly wider vs tall on hover/focus — non-uniform scale changes perceived aspect ratio. */
const imgTransformHover: CSSProperties = {
  transform: "scale(1.06, 1.025)",
};

export function TheMusicTreeByline({
  className,
  imageClassName,
  imageStyle,
  variant = "default",
}: TheMusicTreeBylineProps) {
  const [hovered, setHovered] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);

  const href = useMemo(() => resolveOrgSiteHref(), []);

  const src =
    variant === "onDark"
      ? theMusicTreeLockupHorizontalDark
      : theMusicTreeLockupHorizontal;

  const transformActive = hovered || focusVisible;

  return (
    <a
      href={href}
      className={className}
      style={{
        ...anchorStyle,
        outline: "none",
        boxShadow: focusVisible ? "0 0 0 2px currentColor" : undefined,
      }}
      aria-label="TheMusicTree — open ecosystem site"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={(e) => {
        if (e.currentTarget.matches(":focus-visible")) {
          setFocusVisible(true);
        }
      }}
      onBlur={() => setFocusVisible(false)}
    >
      <img
        src={src}
        alt=""
        className={imageClassName}
        style={{
          ...defaultImgStyle,
          ...imageStyle,
          ...(transformActive ? imgTransformHover : {}),
          transition: "transform 0.2s ease",
        }}
        aria-hidden
      />
    </a>
  );
}

/**
 * Horizontal **the-music-tree-lockup-horizontal** linking to the org site.
 * Same implementation as {@link TheMusicTreeByline}; use whichever name fits your UI copy.
 */
export const TheMusicTreeHorizontalLink = TheMusicTreeByline;

/** Props for {@link TheMusicTreeHorizontalLink} (same as {@link TheMusicTreeBylineProps}). */
export type TheMusicTreeHorizontalLinkProps = TheMusicTreeBylineProps;

export type TheMusicTreeMarkLinkProps = {
  /** Applied to the outer `<a>`. */
  className?: string;
  /** Mark image sizing (default height **56px**, width **auto**). */
  imageClassName?: string;
  imageStyle?: CSSProperties;
  /**
   * `onDark`: **`the-music-tree-mark-dark.svg`** for dark surfaces (light ink knockout).
   */
  variant?: "default" | "onDark";
};

/**
 * Clickable **the-music-tree-mark** (symbol-only) linking to the org site.
 * Uses the same baked `ORG_DOMAIN` href behavior as `TheMusicTreeHorizontalLink`.
 */
export function TheMusicTreeMarkLink({
  className,
  imageClassName,
  imageStyle,
  variant = "default",
}: TheMusicTreeMarkLinkProps) {
  const [hovered, setHovered] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);
  const href = useMemo(() => resolveOrgSiteHref(), []);
  const transformActive = hovered || focusVisible;
  const src = variant === "onDark" ? theMusicTreeMarkDark : theMusicTreeMark;

  return (
    <a
      href={href}
      className={className}
      style={{
        ...anchorStyle,
        outline: "none",
        boxShadow: focusVisible ? "0 0 0 2px currentColor" : undefined,
      }}
      aria-label="TheMusicTree mark — open ecosystem site"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={(e) => {
        if (e.currentTarget.matches(":focus-visible")) {
          setFocusVisible(true);
        }
      }}
      onBlur={() => setFocusVisible(false)}
    >
      <img
        src={src}
        alt=""
        className={imageClassName}
        style={{
          ...defaultImgStyle,
          ...imageStyle,
          ...(transformActive ? imgTransformHover : {}),
          transition: "transform 0.2s ease",
        }}
        aria-hidden
      />
    </a>
  );
}
