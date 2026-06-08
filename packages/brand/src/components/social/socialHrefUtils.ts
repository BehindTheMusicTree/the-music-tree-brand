/** Normalize org / social targets to absolute **http(s)** URLs (or pass through **mailto:**). */
export function normalizeHttpUrl(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  if (/^mailto:/i.test(t)) return t;
  if (t.startsWith("//")) return `https:${t}`;
  if (!/^https?:\/\//i.test(t)) return `https://${t}`;
  return t;
}

export function normalizeMailtoHref(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  return /^mailto:/i.test(t) ? t : `mailto:${t}`;
}
