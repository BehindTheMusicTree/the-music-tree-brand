export const brandAssets = import.meta.glob(
  "@brand-dist/marks/**/*.{svg,png,webp,jpg,jpeg}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

export const bannerAssets = import.meta.glob(
  "@brand-dist/banners/**/*.{svg,png,webp,jpg,jpeg}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

export const faviconAssets = import.meta.glob(
  "@brand-dist/favicons/**/*.{svg,png,ico,webp,jpg,jpeg}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;
