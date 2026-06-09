import { useState } from "react";

type AssetFigureProps = {
  url: string;
  label: string;
  variant: "marks" | "banners" | "favicons";
};

function isSvgAssetUrl(url: string): boolean {
  return /\.svg(?:$|[?#])/i.test(url);
}

export function AssetFigure({ url, label, variant }: AssetFigureProps) {
  const [dims, setDims] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const svgPreview = isSvgAssetUrl(url);

  return (
    <figure className={`asset-card asset-card--${variant}`}>
      <div className="asset-card-preview">
        {svgPreview ? (
          <object
            type="image/svg+xml"
            data={url}
            aria-label={label}
            className="asset-card-preview__svg"
            onLoad={(event) => {
              const objectEl = event.currentTarget;
              setLoadError(null);
              const doc = objectEl.contentDocument;
              const root = doc?.documentElement;
              if (!root || !(root instanceof SVGSVGElement)) return;
              const width =
                root.getAttribute("width") ??
                root.viewBox.baseVal.width.toString();
              const height =
                root.getAttribute("height") ??
                root.viewBox.baseVal.height.toString();
              setDims(`${width} × ${height} px`);
            }}
            onError={() => {
              setLoadError("Preview failed to load");
              setDims(null);
            }}
          />
        ) : (
          <img
            src={url}
            alt=""
            loading="lazy"
            decoding="async"
            onLoad={(event) => {
              const el = event.currentTarget;
              setLoadError(null);
              setDims(`${el.naturalWidth} × ${el.naturalHeight} px`);
            }}
            onError={() => {
              setLoadError("Preview failed to load");
              setDims(null);
            }}
          />
        )}
      </div>
      <figcaption>
        <div className="asset-card-title">{label}</div>
        {loadError ? (
          <div className="asset-card-dims asset-card-dims--error">
            {loadError}
          </div>
        ) : null}
        {dims ? <div className="asset-card-dims">{dims}</div> : null}
      </figcaption>
    </figure>
  );
}
