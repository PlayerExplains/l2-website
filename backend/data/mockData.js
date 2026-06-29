/** Fallback data when the L2J Mobius database is unavailable (tutorial/demo mode). */

export const mockPvpRankings = [
  { char_name: 'DarkKnight', level: 80, flag_kills: 1240, pk_kills: 12 },
  { char_name: 'ShadowBlade', level: 79, flag_kills: 980, pk_kills: 45 },
  { char_name: 'IronFist', level: 80, flag_kills: 875, pk_kills: 8 },
  { char_name: 'StormCaller', level: 78, flag_kills: 720, pk_kills: 22 },
  { char_name: 'NightHunter', level: 77, flag_kills: 650, pk_kills: 31 },
  { char_name: 'BloodRaven', level: 76, flag_kills: 590, pk_kills: 18 },
  { char_name: 'SilverArrow', level: 75, flag_kills: 510, pk_kills: 9 },
  { char_name: 'FrostMage', level: 74, flag_kills: 480, pk_kills: 14 },
  { char_name: 'ThunderLord', level: 73, flag_kills: 420, pk_kills: 27 },
  { char_name: 'VoidWalker', level: 72, flag_kills: 390, pk_kills: 6 },
];

export const mockPkRankings = [
  { char_name: 'GraveDigger', level: 80, flag_kills: 45, pk_kills: 890 },
  { char_name: 'ChaosBringer', level: 79, flag_kills: 30, pk_kills: 720 },
  { char_name: 'RedReaper', level: 78, flag_kills: 22, pk_kills: 650 },
  { char_name: 'OutlawKing', level: 77, flag_kills: 18, pk_kills: 580 },
  { char_name: 'SkullCrusher', level: 76, flag_kills: 55, pk_kills: 490 },
  { char_name: 'DarkAssassin', level: 75, flag_kills: 12, pk_kills: 430 },
  { char_name: 'BoneCollector', level: 74, flag_kills: 8, pk_kills: 390 },
  { char_name: 'RoguePrince', level: 73, flag_kills: 25, pk_kills: 340 },
  { char_name: 'SinEater', level: 72, flag_kills: 15, pk_kills: 290 },
  { char_name: 'NightStalker', level: 71, flag_kills: 10, pk_kills: 250 },
];

export const mockOlympiadHeroes = [
  {
    charId: 268435456,
    char_name: 'ValiantSoul',
    class_id: 90,
    class_name: 'Phoenix Knight',
    level: 80,
    count: 3,
    clan_name: 'IronLegion',
    message: 'Honor guides every strike.',
  },
  {
    charId: 268435457,
    char_name: 'MoonArcher',
    class_id: 92,
    class_name: 'Sagittarius',
    level: 80,
    count: 1,
    clan_name: 'ShadowClan',
    message: '',
  },
  {
    charId: 268435458,
    char_name: 'StormInvoker',
    class_id: 94,
    class_name: 'Archmage',
    level: 79,
    count: 2,
    clan_name: null,
    message: 'The arena belongs to those who endure.',
  },
  {
    charId: 268435459,
    char_name: 'IronBreaker',
    class_id: 113,
    class_name: 'Titan',
    level: 80,
    count: 1,
    clan_name: 'StormRiders',
    message: '',
  },
];

export const mockStats = {
  onlinePlayers: 142,
  totalAccounts: 892,
  totalCharacters: 3847,
  maxLevelCount: 312,
  serverStatus: 'online',
  rates: {
    xp: 50,
    sp: 50,
    adena: 30,
    drop: 5,
    spoil: 5,
    enchant: 1,
    raidboss: 1,
    quest: 50,
    dualbox: 'Disabled',
  },
};

export const mockCastles = [
  { id: 1, name: 'Gludio', taxPercent: 15, siegeDate: Date.now() + 86400000 * 3, ownerClan: 'IronLegion' },
  { id: 2, name: 'Dion', taxPercent: 15, siegeDate: Date.now() + 86400000 * 5, ownerClan: 'ShadowClan' },
  { id: 3, name: 'Giran', taxPercent: 15, siegeDate: Date.now() + 86400000 * 7, ownerClan: null },
  { id: 4, name: 'Oren', taxPercent: 15, siegeDate: Date.now() + 86400000 * 4, ownerClan: 'StormRiders' },
  { id: 5, name: 'Aden', taxPercent: 15, siegeDate: Date.now() + 86400000 * 6, ownerClan: 'RoyalGuard' },
  { id: 6, name: 'Innadril', taxPercent: 15, siegeDate: Date.now() + 86400000 * 8, ownerClan: null },
  { id: 7, name: 'Goddard', taxPercent: 15, siegeDate: Date.now() + 86400000 * 9, ownerClan: 'NorthernWolves' },
  { id: 8, name: 'Rune', taxPercent: 15, siegeDate: Date.now() + 86400000 * 10, ownerClan: null },
  { id: 9, name: 'Schuttgart', taxPercent: 15, siegeDate: Date.now() + 86400000 * 11, ownerClan: 'FrostBrotherhood' },
];
