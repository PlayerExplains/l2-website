<template>
  <section id="rankings" class="rankings section">
    <div class="container">
      <h2 class="section-title">Rankings</h2>
      <p class="section-subtitle">Top warriors on the battlefield</p>

      <ErrorBanner :message="error" />

      <div class="rankings-grid">
        <!-- Top PvP -->
        <div class="card-navy ranking-card">
          <div class="ranking-header">
            <span class="ranking-icon">⚔</span>
            <h3>Top PvP</h3>
          </div>

          <LoadingSkeleton v-if="loading" :rows="8" />

          <div v-else-if="pvpPlayers.length === 0" class="empty-state">
            No players found.
          </div>

          <table v-else class="ranking-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Lv</th>
                <th>PvP</th>
                <th>PK</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(player, index) in pvpPlayers" :key="'pvp-' + index">
                <td><span class="rank-badge" :class="rankClass(index)">{{ index + 1 }}</span></td>
                <td class="player-name">{{ player.char_name }}</td>
                <td>{{ player.level }}</td>
                <td class="highlight">{{ player.flag_kills ?? getKillCount(player, 'pvp') }}</td>
                <td>{{ player.pk_kills ?? getKillCount(player, 'pk') }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Top PK -->
        <div class="card-navy ranking-card">
          <div class="ranking-header">
            <span class="ranking-icon">☠</span>
            <h3>Top PK</h3>
          </div>

          <LoadingSkeleton v-if="loading" :rows="8" />

          <div v-else-if="pkPlayers.length === 0" class="empty-state">
            No players found.
          </div>

          <table v-else class="ranking-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Lv</th>
                <th>PvP</th>
                <th>PK</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(player, index) in pkPlayers" :key="'pk-' + index">
                <td><span class="rank-badge" :class="rankClass(index)">{{ index + 1 }}</span></td>
                <td class="player-name">{{ player.char_name }}</td>
                <td>{{ player.level }}</td>
                <td>{{ player.flag_kills ?? getKillCount(player, 'pvp') }}</td>
                <td class="highlight">{{ player.pk_kills ?? getKillCount(player, 'pk') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p v-if="isMock" class="mock-notice">
        Demo rankings — connect your database for live leaderboards.
      </p>
    </div>
  </section>
</template>

<script setup>
import LoadingSkeleton from './LoadingSkeleton.vue';
import ErrorBanner from './ErrorBanner.vue';
import { getKillCount } from '../utils/playerStats.js';

defineProps({
  pvpPlayers: { type: Array, default: () => [] },
  pkPlayers: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
  isMock: { type: Boolean, default: false },
});

function rankClass(index) {
  if (index === 0) return 'gold';
  if (index === 1) return 'silver';
  if (index === 2) return 'bronze';
  return '';
}
</script>

<style scoped>
.rankings {
  background: var(--color-white);
}

.rankings-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.ranking-card {
  border-radius: var(--radius-md);
  overflow: hidden;
}

.ranking-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 1.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.ranking-header h3 {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--color-text-on-dark);
}

.ranking-icon {
  font-size: 1.25rem;
  color: var(--color-magenta-light);
}

.ranking-table {
  width: 100%;
  border-collapse: collapse;
}

.ranking-table th,
.ranking-table td {
  padding: 0.875rem 1.25rem;
  text-align: left;
  font-size: 0.9rem;
}

.ranking-table th {
  font-weight: 600;
  color: rgba(232, 228, 243, 0.5);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.ranking-table tbody tr {
  transition: background 0.15s;
}

.ranking-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.04);
}

.ranking-table td {
  color: rgba(232, 228, 243, 0.85);
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.player-name {
  font-weight: 600;
  color: var(--color-white) !important;
}

.highlight {
  color: var(--color-magenta-light) !important;
  font-weight: 700;
}

.rank-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-text-on-dark);
}

.rank-badge.gold {
  background: linear-gradient(135deg, #fbbf24, #d97706);
  color: white;
}

.rank-badge.silver {
  background: linear-gradient(135deg, #d1d5db, #9ca3af);
  color: white;
}

.rank-badge.bronze {
  background: linear-gradient(135deg, #d97706, #92400e);
  color: white;
}

.empty-state {
  padding: 3rem;
  text-align: center;
  color: rgba(232, 228, 243, 0.5);
}

@media (max-width: 768px) {
  .rankings-grid {
    grid-template-columns: 1fr;
  }

  .ranking-table th,
  .ranking-table td {
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
  }
}
</style>
