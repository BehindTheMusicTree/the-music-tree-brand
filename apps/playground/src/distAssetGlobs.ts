import tmdMarkFullPng from "@themusictree/brand/dist/brand/the-music-deck/the-music-deck-mark-full.png?url";
import tmdMarkPng from "@themusictree/brand/dist/brand/the-music-deck/the-music-deck-mark.png?url";
import tmdMarkSvg from "@themusictree/brand/dist/brand/the-music-deck/the-music-deck-mark.svg?url";
import tmdFaviconSvg from "@themusictree/brand/dist/favicons/the-music-deck/favicon.svg?url";
import tmdFaviconIco from "@themusictree/brand/dist/favicons/the-music-deck/favicon.ico?url";
import tmdAppleTouchIcon from "@themusictree/brand/dist/favicons/the-music-deck/apple-touch-icon.png?url";
import tmdIcon192 from "@themusictree/brand/dist/favicons/the-music-deck/icon-192.png?url";
import tmdIcon512 from "@themusictree/brand/dist/favicons/the-music-deck/icon-512.png?url";

const globBrandAssets = import.meta.glob(
  "../node_modules/@themusictree/brand/dist/brand/**/*.{svg,png,webp,jpg,jpeg}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

/** Explicit entries so new brand files show without restarting Vite (eager glob is build-time). */
const explicitBrandAssets: Record<string, string> = {
  "../node_modules/@themusictree/brand/dist/brand/the-music-deck/the-music-deck-mark-full.png":
    tmdMarkFullPng,
  "../node_modules/@themusictree/brand/dist/brand/the-music-deck/the-music-deck-mark.png":
    tmdMarkPng,
  "../node_modules/@themusictree/brand/dist/brand/the-music-deck/the-music-deck-mark.svg":
    tmdMarkSvg,
};

export const brandAssets: Record<string, string> = {
  ...globBrandAssets,
  ...explicitBrandAssets,
};

export const bannerAssets = import.meta.glob(
  "../node_modules/@themusictree/brand/dist/banners/**/*.{svg,png,webp,jpg,jpeg}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

const globFaviconAssets = import.meta.glob(
  "../node_modules/@themusictree/brand/dist/favicons/**/*.{svg,png,ico,webp,jpg,jpeg}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

/** Explicit entries so new favicon files show without restarting Vite (eager glob is build-time). */
const explicitFaviconAssets: Record<string, string> = {
  "../node_modules/@themusictree/brand/dist/favicons/the-music-deck/favicon.svg":
    tmdFaviconSvg,
  "../node_modules/@themusictree/brand/dist/favicons/the-music-deck/favicon.ico":
    tmdFaviconIco,
  "../node_modules/@themusictree/brand/dist/favicons/the-music-deck/apple-touch-icon.png":
    tmdAppleTouchIcon,
  "../node_modules/@themusictree/brand/dist/favicons/the-music-deck/icon-192.png":
    tmdIcon192,
  "../node_modules/@themusictree/brand/dist/favicons/the-music-deck/icon-512.png":
    tmdIcon512,
};

export const faviconAssets: Record<string, string> = {
  ...globFaviconAssets,
  ...explicitFaviconAssets,
};
