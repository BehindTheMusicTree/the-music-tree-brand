import tmdMarkFullPng from "../node_modules/@behindthemusictree/assets/dist/brand/the-music-deck/the-music-deck-mark-full.png?url";
import tmdMarkPng from "../node_modules/@behindthemusictree/assets/dist/brand/the-music-deck/the-music-deck-mark.png?url";
import tmdMarkSvg from "../node_modules/@behindthemusictree/assets/dist/brand/the-music-deck/the-music-deck-mark.svg?url";

const globBrandAssets = import.meta.glob(
  "../node_modules/@behindthemusictree/assets/dist/brand/**/*.{svg,png,webp,jpg,jpeg}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

/** Explicit entries so new brand files show without restarting Vite (eager glob is build-time). */
const explicitBrandAssets: Record<string, string> = {
  "../node_modules/@behindthemusictree/assets/dist/brand/the-music-deck/the-music-deck-mark-full.png":
    tmdMarkFullPng,
  "../node_modules/@behindthemusictree/assets/dist/brand/the-music-deck/the-music-deck-mark.png":
    tmdMarkPng,
  "../node_modules/@behindthemusictree/assets/dist/brand/the-music-deck/the-music-deck-mark.svg":
    tmdMarkSvg,
};

export const brandAssets: Record<string, string> = {
  ...globBrandAssets,
  ...explicitBrandAssets,
};

export const bannerAssets = import.meta.glob(
  "../node_modules/@behindthemusictree/assets/dist/banners/**/*.{svg,png,webp,jpg,jpeg}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

export const faviconAssets = import.meta.glob(
  "../node_modules/@behindthemusictree/assets/dist/favicons/**/*.{svg,png,ico,webp,jpg,jpeg}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;
