/** Read PvP/PK kill counts from a ranking player object. */
export function getKillCount(player, type) {
  if (!player) return 0;

  // flag_kills = pvpkills column; pk_kills = pkkills column
  const value =
    type === 'pvp'
      ? (player.flag_kills ?? player.pvp ?? player.pvpkills ?? 0)
      : (player.pk_kills ?? player.pk ?? player.pkkills ?? 0);

  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}
