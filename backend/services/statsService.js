import dotenv from 'dotenv';
import { testConnection } from '../config/database.js';
import {
  getOnlineCount,
  getTotalAccounts,
  getTotalCharacters,
  getMaxLevelCount,
} from './characterService.js';
import { getNextSiegeDate } from './castleService.js';
import { mockStats } from '../data/mockData.js';

dotenv.config();

function getDualboxFromEnv() {
  const raw = (process.env.DUALBOX || 'disabled').toLowerCase();
  if (['enabled', 'true', '1', 'yes'].includes(raw)) {
    return 'Enabled';
  }
  return 'Disabled';
}

function getRatesFromEnv() {
  return {
    xp: Number(process.env.XP_RATE) || 50,
    sp: Number(process.env.SP_RATE) || 50,
    adena: Number(process.env.ADENA_RATE) || 30,
    drop: Number(process.env.DROP_RATE) || 5,
    spoil: Number(process.env.SPOIL_RATE) || 5,
    enchant: Number(process.env.ENCHANT_RATE) || 1,
    raidboss: Number(process.env.RAIDBOSS_RATE) || 1,
    quest: Number(process.env.QUEST_RATE) || 50,
    dualbox: getDualboxFromEnv(),
  };
}

/**
 * Aggregated server statistics for the homepage dashboard.
 */
export async function getServerStats() {
  try {
    const connected = await testConnection();

    if (!connected) {
      return {
        ...mockStats,
        rates: getRatesFromEnv(),
        nextSiege: {
          castleName: 'Giran',
          siegeDate: Date.now() + 86400000 * 3,
        },
        mock: true,
      };
    }

    const [onlinePlayers, totalAccounts, totalCharacters, maxLevelCount, nextSiege] =
      await Promise.all([
        getOnlineCount(),
        getTotalAccounts(),
        getTotalCharacters(),
        getMaxLevelCount(),
        getNextSiegeDate(),
      ]);

    return {
      onlinePlayers,
      totalAccounts,
      totalCharacters,
      maxLevelCount,
      serverStatus: 'online',
      rates: getRatesFromEnv(),
      nextSiege,
      mock: false,
    };
  } catch (error) {
    console.error('[statsService] getServerStats error:', error.message);
    return {
      ...mockStats,
      rates: getRatesFromEnv(),
      nextSiege: {
        castleName: 'Giran',
        siegeDate: Date.now() + 86400000 * 3,
      },
      mock: true,
    };
  }
}
