import pool, { testConnection } from '../config/database.js';
import { mockCastles } from '../data/mockData.js';

/**
 * Castle ownership and siege info from L2J Mobius tables.
 *
 * castle table columns: id, name, taxPercent, siegeDate, regTimeOver, regTimeEnd
 * clan_data.hasCastle links a clan to a castle id when they own it.
 * clan_data.clan_name is the owner display name.
 */
export async function getAllCastles() {
  try {
    const connected = await testConnection();
    if (!connected) {
      return { data: mockCastles, mock: true };
    }

    const [rows] = await pool.query(
      `SELECT
         c.id,
         c.name,
         c.taxPercent,
         c.siegeDate,
         cd.clan_name AS ownerClan
       FROM castle c
       LEFT JOIN clan_data cd ON cd.hasCastle = c.id
       ORDER BY c.id ASC`
    );

    return { data: rows, mock: false };
  } catch (error) {
    console.error('[castleService] getAllCastles error:', error.message);
    return { data: mockCastles, mock: true };
  }
}

/**
 * Returns the nearest upcoming siege date across all castles.
 * siegeDate is stored as epoch milliseconds in L2J Mobius.
 */
export async function getNextSiegeDate() {
  try {
    const { data } = await getAllCastles();
    const now = Date.now();

    const upcoming = data
      .filter((c) => c.siegeDate && Number(c.siegeDate) > now)
      .sort((a, b) => Number(a.siegeDate) - Number(b.siegeDate));

    if (upcoming.length === 0) return null;

    return {
      castleName: upcoming[0].name,
      siegeDate: Number(upcoming[0].siegeDate),
    };
  } catch (error) {
    console.error('[castleService] getNextSiegeDate error:', error.message);
    return null;
  }
}
