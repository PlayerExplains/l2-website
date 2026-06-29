/** Transparent fortress SVG icons per Interlude castle. */
export const CASTLE_ICONS = {
  "Gludio": "/icons/castles/gludio.svg",
  "Dion": "/icons/castles/dion.svg",
  "Giran": "/icons/castles/giran.svg",
  "Oren": "/icons/castles/oren.svg",
  "Aden": "/icons/castles/aden.svg",
  "Innadril": "/icons/castles/innadril.svg",
  "Goddard": "/icons/castles/goddard.svg",
  "Rune": "/icons/castles/rune.svg",
  "Schuttgart": "/icons/castles/schuttgart.svg"
};

export function getCastleIcon(castleName) {
  return CASTLE_ICONS[castleName] ?? null;
}
