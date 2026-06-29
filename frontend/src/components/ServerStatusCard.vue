<template>
  <section class="server-status">
    <div class="container">
      <ErrorBanner :message="error" />

      <div class="status-grid">
        <div class="card status-card">
          <template v-if="loading">
            <LoadingSkeleton :rows="2" variant="light" />
          </template>
          <template v-else>
            <span class="status-icon">🔑</span>
            <div>
              <p class="status-number">{{ stats?.totalAccounts ?? '—' }}</p>
              <p class="status-label">Total Accounts</p>
            </div>
          </template>
        </div>

        <div class="card status-card">
          <template v-if="loading">
            <LoadingSkeleton :rows="2" variant="light" />
          </template>
          <template v-else>
            <span class="status-icon">⚔️</span>
            <div>
              <p class="status-number">{{ stats?.totalCharacters ?? '—' }}</p>
              <p class="status-label">Total Characters</p>
            </div>
          </template>
        </div>

        <div class="card status-card rates-card">
          <template v-if="loading">
            <LoadingSkeleton :rows="3" variant="light" />
          </template>
          <template v-else>
            <div class="rates-header">
              <p class="rates-title">Server Rates</p>
              <RouterLink to="/rates" class="rates-view-more">View More →</RouterLink>
            </div>
            <div class="rates-grid">
              <div v-for="rate in rateTypes" :key="rate.key" class="rate-item">
                <span class="rate-icon" aria-hidden="true">
                  <img :src="rate.icon" :alt="rate.label" width="32" height="32" loading="lazy" />
                </span>
                <span class="rate-value">x{{ stats?.rates?.[rate.key] ?? rate.default }}</span>
                <span class="rate-label">{{ rate.label }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>

      <p v-if="stats?.mock" class="mock-notice">
        Demo data — connect your L2J Mobius database for live stats.
      </p>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import LoadingSkeleton from './LoadingSkeleton.vue';
import ErrorBanner from './ErrorBanner.vue';
import { homepageRates } from '../config/rates.js';

defineProps({
  stats: { type: Object, default: null },
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
});

const rateTypes = homepageRates;
</script>

<style scoped>
.server-status {
  padding: 3rem 0 3rem;
  position: relative;
  z-index: 2;
  background: linear-gradient(
    180deg,
    var(--color-lavender) 0%,
    var(--color-lavender-light) 55%,
    var(--color-white) 100%
  );
}

.status-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1.4fr;
  gap: 1.5rem;
}

.status-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 2rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.status-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.status-icon {
  font-size: 2rem;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-lavender);
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.status-number {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-navy);
  line-height: 1.2;
}

.status-label {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-top: 0.15rem;
}

.rates-card {
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
}

.rates-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.rates-title {
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--color-navy);
  font-size: 0.95rem;
}

.rates-view-more {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-magenta);
  white-space: nowrap;
  transition: color 0.2s;
}

.rates-view-more:hover {
  color: var(--color-magenta-hover);
}

.rates-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.75rem;
}

.rate-item {
  text-align: center;
  padding: 0.65rem 0.4rem 0.75rem;
  background: var(--color-lavender-light);
  border-radius: var(--radius-sm);
}

.rate-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin: 0 auto 0.4rem;
  background: #120c1e;
  border: 1px solid rgba(12, 21, 38, 0.2);
  border-radius: 4px;
  padding: 1px;
}

.rate-icon img {
  width: 32px;
  height: 32px;
  display: block;
  image-rendering: -webkit-optimize-contrast;
}

.rate-value {
  display: block;
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--color-magenta);
  font-size: 1.25rem;
}

.rate-label {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

@media (max-width: 968px) {
  .status-grid {
    grid-template-columns: 1fr;
  }

  .rates-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .rates-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
