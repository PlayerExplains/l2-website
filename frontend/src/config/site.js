/** Site links — set in frontend/.env (VITE_* vars are baked in at build time). */

export const DISCORD_URL = normalizeSiteUrl(
  import.meta.env.VITE_DISCORD_URL,
  'https://discord.gg/your-invite'
);

export const DOWNLOAD_URL = normalizeSiteUrl(
  import.meta.env.VITE_DOWNLOAD_URL,
  '#download'
);

function normalizeSiteUrl(value, fallback) {
  const trimmed = typeof value === 'string' ? value.trim() : '';
  if (!trimmed) {
    return fallback;
  }
  // Allow in-page anchors (e.g. #download) without forcing https://
  if (trimmed.startsWith('#')) {
    return trimmed;
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  // Accept example.com/path without protocol
  return `https://${trimmed.replace(/^\/+/, '')}`;
}

export function isExternalLink(url) {
  return /^https?:\/\//i.test(url);
}

/** Bind-friendly props for <a> tags (adds target/rel for external URLs). */
export function linkProps(url) {
  if (isExternalLink(url)) {
    return { href: url, target: '_blank', rel: 'noopener' };
  }
  return { href: url };
}
