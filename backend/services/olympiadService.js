import pool, { testConnection } from '../config/database.js';
import { getClassName } from '../data/classNames.js';
import { mockOlympiadHeroes } from '../data/mockData.js';

function mapHeroRow(row) {
  const classId = Number(row.class_id);
  return {
    charId: Number(row.charId),
    char_name: String(row.char_name ?? ''),
    class_id: classId,
    class_name: getClassName(classId),
    level: Number(row.level) || 0,
    count: Number(row.count) || 0,
    clan_name: row.clan_name ? String(row.clan_name) : null,
    message: row.message ? String(row.message).trim() : '',
  };
}

/**
 * Current Olympiad heroes (heroes.played = 1), per L2J Mobius Hero system.
 */
export async function getCurrentHeroes() {
  try {
    const connected = await testConnection();
    if (!connected) {
      return { data: mockOlympiadHeroes, mock: true };
    }

    const [rows] = await pool.query(
      `SELECT
         h.charId,
         c.char_name,
         h.class_id,
         h.count,
         h.message,
         c.level,
         cd.clan_name
       FROM heroes h
       INNER JOIN characters c ON c.charId = h.charId
       LEFT JOIN clan_data cd ON cd.clan_id = c.clanid
       WHERE h.played = 1
         AND c.accesslevel = 0
         AND (c.deletetime = 0 OR c.deletetime IS NULL)
       ORDER BY h.class_id ASC`
    );

    return { data: rows.map(mapHeroRow), mock: false };
  } catch (error) {
    console.error('[olympiadService] getCurrentHeroes error:', error.message);
    return { data: mockOlympiadHeroes, mock: true };
  }
}
