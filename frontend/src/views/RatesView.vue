<template>
  <div class="rates-page">
    <section class="rates-hero section">
      <div class="rates-hero-bg" aria-hidden="true">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
      </div>

      <div class="container rates-hero-inner">
        <RouterLink to="/" class="back-link">← Back to Home</RouterLink>
        <p class="rates-eyebrow">Server Information</p>
        <h1 class="section-title">Server Rates</h1>
        <p class="section-subtitle">X50 Interlude — progression at a glance</p>
      </div>
    </section>

    <section class="rates-content section">
      <div class="container rates-layout">
        <ErrorBanner :message="error" />

        <article class="server-concept card">
          <div class="concept-accent" aria-hidden="true"></div>
          <div class="concept-body">
            <h2 class="content-heading">Server Concept</h2>
            <p>
              X50 Interlude is a high-rate Interlude server for players who love the classic
              chronicle but want faster progression without skipping core content. Rates are tuned
              so you can reach endgame, join castle sieges, and compete in Olympiad while still
              enjoying farming, crafting, and clan warfare.
            </p>
            <p>
              The tables below reflect the live multipliers configured on the game server — from
              everyday hunting and spoiling to quest rewards, enchant scroll drops, and raid boss
              loot.
            </p>
          </div>
        </article>

        <template v-if="loading">
          <LoadingSkeleton :rows="8" variant="light" />
        </template>

        <template v-else>
          <section class="rates-section" aria-labelledby="server-rates-heading">
            <div class="section-heading-wrap">
              <h2 id="server-rates-heading" class="content-heading">Server Rates</h2>
              <span class="heading-line" aria-hidden="true"></span>
            </div>
            <div class="rates-groups-grid">
              <RatesTableGroup
                v-for="group in rateGroupTables"
                :key="group.title"
                :title="group.title"
                :rows="group.rows"
              />
            </div>
          </section>
        </template>

        <p v-if="stats?.mock" class="mock-notice">
          Demo data — connect your L2J Mobius database for live rates.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { api } from '../api/client.js';
import { mockStats } from '../data/mockData.js';
import { buildRateGroups } from '../config/rates.js';
import ErrorBanner from '../components/ErrorBanner.vue';
import LoadingSkeleton from '../components/LoadingSkeleton.vue';
import RatesTableGroup from '../components/RatesTableGroup.vue';

const stats = ref(null);
const loading = ref(true);
const error = ref('');

const rateGroupTables = computed(() => buildRateGroups(stats.value?.rates));

onMounted(async () => {
  try {
    stats.value = await api.stats();
  } catch (err) {
    console.error('Stats API failed:', err);
    stats.value = mockStats;
    error.value = 'Could not reach the server. Showing demo rates.';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.rates-hero {
  position: relative;
  padding-top: calc(76px + 3rem);
  padding-bottom: 2.5rem;
  overflow: hidden;
}

.rates-hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    165deg,
    var(--color-lavender-light) 0%,
    var(--color-lavender) 55%,
    rgba(228, 223, 240, 0.4) 100%
  );
  z-index: 0;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

.orb-1 {
  width: 420px;
  height: 420px;
  top: -20%;
  right: -8%;
  background: rgba(192, 38, 211, 0.14);
}

.orb-2 {
  width: 320px;
  height: 320px;
  bottom: -15%;
  left: -5%;
  background: rgba(12, 21, 38, 0.07);
}

.rates-hero-inner {
  position: relative;
  z-index: 1;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-muted);
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(12, 21, 38, 0.08);
  backdrop-filter: blur(8px);
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}

.back-link:hover {
  color: var(--color-magenta);
  border-color: rgba(192, 38, 211, 0.25);
  background: rgba(255, 255, 255, 0.9);
}

.rates-eyebrow {
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-magenta);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 0.75rem;
}

.rates-hero .section-title {
  margin-bottom: 0.65rem;
}

.rates-hero .section-subtitle {
  margin-bottom: 0;
}

.rates-content {
  padding-top: 3.5rem;
  padding-bottom: 5rem;
  background: linear-gradient(
    180deg,
    var(--color-white) 0%,
    var(--color-lavender-light) 100%
  );
}

.rates-layout {
  max-width: 900px;
}

.server-concept {
  position: relative;
  display: flex;
  margin-bottom: 3.5rem;
  padding: 0;
  overflow: hidden;
  border: 1px solid rgba(12, 21, 38, 0.06);
  box-shadow: var(--shadow-sm);
}

.concept-accent {
  width: 5px;
  flex-shrink: 0;
  background: linear-gradient(
    180deg,
    var(--color-magenta) 0%,
    var(--color-gold) 50%,
    var(--color-navy-muted) 100%
  );
}

.concept-body {
  padding: 2.25rem 2.5rem;
}

.content-heading {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-navy);
  margin-bottom: 1.25rem;
  letter-spacing: 0.02em;
}

.server-concept p {
  color: var(--color-text-muted);
  line-height: 1.85;
  font-size: 1.02rem;
}

.server-concept p + p {
  margin-top: 1rem;
}

.section-heading-wrap {
  text-align: center;
  margin-bottom: 2rem;
}

.section-heading-wrap .content-heading {
  margin-bottom: 0.85rem;
}

.heading-line {
  display: block;
  width: 72px;
  height: 3px;
  margin: 0 auto;
  border-radius: 2px;
  background: linear-gradient(90deg, transparent, var(--color-magenta), var(--color-gold), transparent);
}

.rates-section {
  margin-bottom: 2rem;
}

.rates-groups-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

@media (max-width: 640px) {
  .concept-body {
    padding: 1.75rem 1.5rem;
  }

  .rates-groups-grid {
    grid-template-columns: 1fr;
  }
}
</style>
