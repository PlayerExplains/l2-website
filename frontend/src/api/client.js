const API_BASE = import.meta.env.VITE_API_URL || '';

async function fetchJson(path) {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

export const api = {
  health: () => fetchJson('/api/health'),
  stats: () => fetchJson('/api/stats'),
  pvpRankings: () => fetchJson('/api/rankings/top-flag'),
  pkRankings: () => fetchJson('/api/rankings/top-pk'),
  castles: () => fetchJson('/api/castles'),
  olympiadHeroes: () => fetchJson('/api/olympiad/heroes'),
};
