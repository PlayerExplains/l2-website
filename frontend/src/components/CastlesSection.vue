<template>
  <section id="castles" class="castles section">
    <div class="container">
      <h2 class="section-title">Castle Dominion</h2>
      <p class="section-subtitle">Territories, owners, and upcoming sieges</p>

      <ErrorBanner :message="error" />

      <LoadingSkeleton v-if="loading" :rows="6" variant="light" />

      <div v-else-if="castles.length === 0" class="empty-state">
        No castle data available.
      </div>

      <div v-else class="castles-grid">
        <div
          v-for="castle in castles"
          :key="castle.id"
          class="card castle-card"
          :class="{ featured: isFeaturedCastle(castle.name) }"
        >
          <div v-if="isFeaturedCastle(castle.name)" class="featured-badge">Major Castle</div>

          <div class="castle-header">
            <span class="castle-icon" aria-hidden="true">
              <img
                v-if="getCastleIcon(castle.name)"
                :src="getCastleIcon(castle.name)"
                :alt="''"
                width="28"
                height="28"
                loading="lazy"
              />
              <span v-else>🏰</span>
            </span>
            <h3>{{ castle.name }}</h3>
          </div>

          <div class="castle-details">
            <div class="detail-row">
              <span class="detail-label">Owner</span>
              <span class="detail-value" :class="{ 'no-owner': !castle.ownerClan }">
                {{ castle.ownerClan || 'No owner' }}
              </span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Tax</span>
              <span class="detail-value">{{ castle.taxPercent }}%</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Next Siege</span>
              <span class="detail-value siege-date">{{ formatSiegeDate(castle.siegeDate) }}</span>
            </div>
          </div>
        </div>
      </div>

      <p v-if="isMock" class="mock-notice">
        Demo castle data — connect your database for live ownership info.
      </p>
    </div>
  </section>
</template>

<script setup>
import LoadingSkeleton from './LoadingSkeleton.vue';
import ErrorBanner from './ErrorBanner.vue';
import { formatSiegeDate } from '../utils/formatDate.js';
import { getCastleIcon } from '../data/castleIcons.js';

defineProps({
  castles: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
  isMock: { type: Boolean, default: false },
});

// Giran, Aden, Goddard, Rune are highlighted as major castles
const FEATURED = ['Giran', 'Aden', 'Goddard', 'Rune'];

function isFeaturedCastle(name) {
  return FEATURED.includes(name);
}
</script>

<style scoped>
.castles {
  background: var(--color-lavender-light);
}

.castles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.castle-card {
  position: relative;
  padding: 1.75rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.castle-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

/* Highlight major castles */
.castle-card.featured {
  border: 2px solid var(--color-magenta);
  background: linear-gradient(160deg, var(--color-white) 0%, rgba(192, 38, 211, 0.04) 100%);
}

.featured-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.3rem 0.6rem;
  background: var(--color-magenta);
  color: white;
  border-radius: 999px;
}

.castle-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.castle-icon {
  width: 1.75rem;
  height: 1.75rem;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.castle-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.castle-header h3 {
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: var(--color-navy);
}

.castle-details {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 600;
}

.detail-value {
  font-weight: 600;
  color: var(--color-navy);
  font-size: 0.95rem;
}

.detail-value.no-owner {
  color: var(--color-text-muted);
  font-style: italic;
  font-weight: 500;
}

.siege-date {
  color: var(--color-magenta);
  font-size: 0.85rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-muted);
}
</style>
