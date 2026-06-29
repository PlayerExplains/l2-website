<template>
  <section id="home" class="hero">
    <div class="hero-bg">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
    </div>

    <div class="container hero-inner">
      <div class="hero-content">
        <p class="hero-subtitle">Rise. Fight. Conquer.</p>
        <h1 class="hero-title">Interlude X50</h1>
        <p class="hero-desc">
          Join a classic Interlude private server with PvP, sieges, rankings,
          and an active community.
        </p>

        <div class="hero-actions">
          <a v-bind="downloadLink" class="btn btn-primary">Play for Free</a>
          <a v-bind="discordLink" class="btn btn-discord">Join Discord</a>
        </div>

        <div class="hero-cards">
          <!-- Players online -->
          <div class="card hero-stat-card">
            <template v-if="loading">
              <div class="stat-skeleton"></div>
            </template>
            <template v-else>
              <span class="stat-label">Players Online</span>
              <p class="stat-value accent">{{ stats?.onlinePlayers ?? '—' }}</p>
              <span class="stat-live">
                <span class="status-dot online"></span> Live
              </span>
            </template>
          </div>

          <!-- Next siege -->
          <div class="card hero-stat-card">
            <template v-if="loading">
              <div class="stat-skeleton"></div>
            </template>
            <template v-else>
              <span class="stat-label">Next Siege</span>
              <p class="stat-value">{{ nextSiegeText }}</p>
              <p v-if="stats?.nextSiege?.castleName" class="stat-sub">
                {{ stats.nextSiege.castleName }} Castle
              </p>
            </template>
          </div>
        </div>
      </div>

      <!-- Animated realistic hero art -->
      <div class="hero-visual">
        <HeroAnimatedArt />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { formatSiegeDate } from '../utils/formatDate.js';
import HeroAnimatedArt from './HeroAnimatedArt.vue';
import { DISCORD_URL, DOWNLOAD_URL, linkProps } from '../config/site.js';

const props = defineProps({
  stats: { type: Object, default: null },
  loading: { type: Boolean, default: false },
});

const downloadLink = computed(() => linkProps(DOWNLOAD_URL));
const discordLink = computed(() => linkProps(DISCORD_URL));

const nextSiegeText = computed(() => {
  if (!props.stats?.nextSiege?.siegeDate) return 'TBA';
  return formatSiegeDate(props.stats.nextSiege.siegeDate);
});
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  padding-top: 80px;
  padding-bottom: 2.5rem;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, var(--color-lavender-light) 0%, var(--color-lavender) 100%);
  z-index: 0;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

.orb-1 {
  width: 500px;
  height: 500px;
  top: -10%;
  left: -5%;
  background: rgba(192, 38, 211, 0.12);
}

.orb-2 {
  width: 400px;
  height: 400px;
  bottom: 10%;
  right: 5%;
  background: rgba(12, 21, 38, 0.06);
}

.hero-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: 2rem;
  align-items: center;
  padding: 5rem 2rem;
}

.hero-subtitle {
  font-family: var(--font-display);
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 600;
  color: var(--color-magenta);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 7vw, 5rem);
  font-weight: 700;
  line-height: 1.05;
  color: var(--color-navy);
  margin-bottom: 1.5rem;
  letter-spacing: 0.02em;
}

.hero-desc {
  font-size: 1.15rem;
  color: var(--color-text-muted);
  max-width: 480px;
  margin-bottom: 2.5rem;
  line-height: 1.75;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
}

.hero-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  max-width: 480px;
}

.hero-stat-card {
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.hero-stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.stat-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-navy);
}

.stat-value.accent {
  color: var(--color-magenta);
}

.stat-sub {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-top: 0.35rem;
}

.stat-live {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  color: var(--color-success);
  font-weight: 600;
  margin-top: 0.5rem;
}

.stat-skeleton {
  height: 60px;
  border-radius: 8px;
  background: linear-gradient(90deg, var(--color-lavender) 25%, var(--color-lavender-light) 50%, var(--color-lavender) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Hero artwork — flush with page, no frame */
.hero-visual {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: visible;
  min-height: 0;
}

@media (max-width: 968px) {
  .hero-inner {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 3rem 1.25rem;
    gap: 2rem;
  }

  .hero-desc {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-cards {
    margin: 0 auto;
  }

  .hero-visual {
    order: -1;
    max-width: 380px;
    margin: 0 auto;
    align-items: center;
  }
}
</style>
