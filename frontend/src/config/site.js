/** Site links — set in frontend/.env (VITE_* vars are baked in at build time). */

export const DISCORD_URL =
  import.meta.env.VITE_DISCORD_URL || 'https://discord.gg/your-invite';

export const DOWNLOAD_URL =
  import.meta.env.VITE_DOWNLOAD_URL || '#download';

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
