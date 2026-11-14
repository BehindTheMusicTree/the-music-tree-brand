import catalog from "../../../assets.catalog.json";
import { useEffect, useState } from "react";

type AssetFigureProps = {
  url: string;
  label: string;
  variant: "marks" | "banners" | "favicons";
};

function isSvgAssetUrl(url: string): boolean {
  return /\.svg(?:$|[?#])/i.test(url);
}

export function AssetFigure({ url, label, variant }: AssetFigureProps) {
  const [bytes, setBytes] = useState<number | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    setBytes(null);
    fetch(url, { signal: controller.signal }).then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.blob();
    }).then(blob => setBytes(blob.size)).catch(error => {
      if (error.name !== "AbortError") setLoadError("Asset metadata failed to load");
    });
    return () => controller.abort();
  }, [url]);
  const [dims, setDims] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const metadata = catalog.files.find((file) => url.split("?")[0].endsWith(file.path));
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
      {variant === "favicons" ? <div style={{ display: "flex", gap: 16, padding: 12, background: "#fff" }}>
        {[16, 24, 32].map(size => <img key={size} src={url} width={size} height={size} alt={`${label} at ${size}px`} />)}
      </div> : null}
      <figcaption>
        <div className="asset-card-title">{label}</div>
        {loadError ? (
          <div className="asset-card-dims asset-card-dims--error">
            {loadError}
          </div>
        ) : null}
        {metadata ? <div>{metadata.metadata.format.toUpperCase()} · {bytes === null ? "Loading size…" : `${bytes.toLocaleString()} bytes`} · {metadata.maxBytes.toLocaleString()} byte budget</div> : null}
        {dims ? <div className="asset-card-dims">{dims}</div> : null}
      </figcaption>
    </figure>
  );
}
