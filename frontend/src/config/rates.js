/** Shared server rate definitions (homepage preview + full rates page). */

export const homepageRates = [
  { key: 'xp', label: 'XP', default: 50, icon: '/icons/l2/xp.png' },
  { key: 'sp', label: 'SP', default: 50, icon: '/icons/l2/sp.png' },
  { key: 'adena', label: 'Adena', default: 30, icon: '/icons/l2/adena.png' },
  { key: 'drop', label: 'Drop', default: 5, icon: '/icons/l2/drop.png' },
  { key: 'spoil', label: 'Spoil', default: 5, icon: '/icons/l2/spoil.png' },
];

export const extendedRates = [
  {
    key: 'enchant',
    label: 'Enchant Scrolls',
    default: 1,
    emoji: '✨',
    description: 'Drop rate for enchant scrolls from monsters and bosses.',
  },
  {
    key: 'raidboss',
    label: 'Raid Boss Drop',
    default: 1,
    emoji: '👹',
    description: 'Drop rates from raid bosses.',
  },
  {
    key: 'quest',
    label: 'Quest',
    default: 50,
    emoji: '📜',
    description: 'Rewards from main and sub-class quests.',
  },
];

export const allRates = [...homepageRates, ...extendedRates];

const defaultByKey = Object.fromEntries(allRates.map((rate) => [rate.key, rate.default]));

/** Grouped tables for the dedicated rates page (L2Reborn-style layout). */
export const rateGroups = [
  {
    title: 'Basic',
    rows: [
      { label: 'EXP/SP', keys: ['xp', 'sp'] },
      { label: 'Adena', key: 'adena' },
      { label: 'Drop', key: 'drop' },
      { label: 'Spoil', key: 'spoil' },
    ],
  },
  {
    title: 'Secondary',
    rows: [
      { label: 'Quest', key: 'quest' },
      { label: 'Enchant Scrolls', key: 'enchant' },
      { label: 'Raid Boss Drop', key: 'raidboss' },
      { label: 'Dualbox', key: 'dualbox' },
    ],
  },
];

export function formatRateValue(rateKey, value) {
  if (rateKey === 'dualbox') {
    return value ?? 'Disabled';
  }

  const resolved = value ?? defaultByKey[rateKey];
  if (rateKey === 'enchant' && resolved === 1) {
    return 'Retail';
  }
  return `x${resolved}`;
}

function resolveSingleKey(key, rates) {
  if (key === 'dualbox') {
    return rates?.dualbox ?? 'Disabled';
  }
  return rates?.[key] ?? defaultByKey[key];
}

export function resolveRateRow(row, rates) {
  if (row.keys) {
    const values = row.keys.map((key) => resolveSingleKey(key, rates));
    const allEqual = values.every((value) => value === values[0]);
    if (allEqual) {
      return formatRateValue(row.keys[0], values[0]);
    }
    return row.keys
      .map((key, index) => `${homepageRates.find((r) => r.key === key)?.label ?? key} ${formatRateValue(key, values[index])}`)
      .join(' / ');
  }

  const value = resolveSingleKey(row.key, rates);
  return formatRateValue(row.key, value);
}

export function buildRateGroups(rates) {
  return rateGroups.map((group) => ({
    title: group.title,
    rows: group.rows.map((row) => ({
      label: row.label,
      value: resolveRateRow(row, rates),
    })),
  }));
}
