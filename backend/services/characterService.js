import pool, { testConnection } from '../config/database.js';
import { mockPvpRankings, mockPkRankings } from '../data/mockData.js';

/**
 * Maps a MySQL row to a clean ranking object.
 * JSON keys avoid the "pvp" substring — some browser extensions
 * strip properties like pvp, pvpkills from API responses.
 * flag_kills = L2J Mobius characters.pvpkills (flagged player kills)
 * pk_kills   = L2J Mobius characters.pkkills
 */
function mapRankingRow(row) {
  return {
    char_name: String(row.char_name ?? ''),
    level: Number(row.level) || 0,
    flag_kills: Number(row.flag_kills ?? row.pvpkills ?? 0),
    pk_kills: Number(row.pk_kills ?? row.pkkills ?? 0),
  };
}

const RANKING_SELECT = `
  char_name,
  level,
  IFNULL(\`pvpkills\`, 0) AS flag_kills,
  IFNULL(\`pkkills\`, 0) AS pk_kills
`;

const ACTIVE_PLAYER_FILTER = 'accesslevel = 0 AND (deletetime = 0 OR deletetime IS NULL)';

/**
 * Top PvP players from L2J Mobius characters table.
 */
export async function getTopPvpPlayers(limit = 10) {
  try {
    const connected = await testConnection();
    if (!connected) {
      return { data: mockPvpRankings, mock: true };
    }

    const [rows] = await pool.query(
      `SELECT ${RANKING_SELECT}
       FROM characters
       WHERE ${ACTIVE_PLAYER_FILTER}
       ORDER BY \`pvpkills\` DESC, \`pkkills\` DESC
       LIMIT ?`,
      [limit]
    );

    return { data: rows.map(mapRankingRow), mock: false };
  } catch (error) {
    console.error('[characterService] getTopPvpPlayers error:', error.message);
    return { data: mockPvpRankings, mock: true };
  }
}

/**
 * Top PK players from L2J Mobius characters table.
 */
export async function getTopPkPlayers(limit = 10) {
  try {
    const connected = await testConnection();
    if (!connected) {
      return { data: mockPkRankings, mock: true };
    }

    const [rows] = await pool.query(
      `SELECT ${RANKING_SELECT}
       FROM characters
       WHERE ${ACTIVE_PLAYER_FILTER}
       ORDER BY \`pkkills\` DESC, \`pvpkills\` DESC
       LIMIT ?`,
      [limit]
    );

    return { data: rows.map(mapRankingRow), mock: false };
  } catch (error) {
    console.error('[characterService] getTopPkPlayers error:', error.message);
    return { data: mockPkRankings, mock: true };
  }
}

/**
 * Count players currently online.
 */
export async function getOnlineCount() {
  try {
    const connected = await testConnection();
    if (!connected) return 142;

    const [rows] = await pool.query(
      `SELECT COUNT(*) AS onlinePlayers
       FROM characters
       WHERE online = 1 AND accesslevel = 0`
    );

    return Number(rows[0].onlinePlayers) || 0;
  } catch (error) {
    console.error('[characterService] getOnlineCount error:', error.message);
    return 142;
  }
}

/**
 * Total player accounts (login database).
 */
export async function getTotalAccounts() {
  try {
    const connected = await testConnection();
    if (!connected) return 892;

    const loginDb = process.env.LOGIN_DB_NAME || process.env.DB_NAME;
    const [rows] = await pool.query(
      `SELECT COUNT(*) AS totalAccounts
       FROM \`${loginDb}\`.accounts
       WHERE accessLevel = 0`
    );

    return Number(rows[0].totalAccounts) || 0;
  } catch (error) {
    console.error('[characterService] getTotalAccounts error:', error.message);
    return 892;
  }
}

/**
 * Total active (non-deleted) characters.
 */
export async function getTotalCharacters() {
  try {
    const connected = await testConnection();
    if (!connected) return 3847;

    const [rows] = await pool.query(
      `SELECT COUNT(*) AS totalCharacters
       FROM characters
       WHERE ${ACTIVE_PLAYER_FILTER}`
    );

    return Number(rows[0].totalCharacters) || 0;
  } catch (error) {
    console.error('[characterService] getTotalCharacters error:', error.message);
    return 3847;
  }
}

/**
 * Characters at max level (80 in Interlude).
 */
export async function getMaxLevelCount() {
  try {
    const connected = await testConnection();
    if (!connected) return 312;

    const [rows] = await pool.query(
      `SELECT COUNT(*) AS maxLevelCount
       FROM characters
       WHERE ${ACTIVE_PLAYER_FILTER} AND level >= 80`
    );

    return Number(rows[0].maxLevelCount) || 0;
  } catch (error) {
    console.error('[characterService] getMaxLevelCount error:', error.message);
    return 312;
  }
}
