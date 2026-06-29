<template>
  <section id="olympiad" class="olympiad section">
    <div class="container">
      <h2 class="section-title">Olympiad Heroes</h2>
      <p class="section-subtitle">Current cycle champions of the Grand Olympiad</p>

      <ErrorBanner :message="error" />

      <LoadingSkeleton v-if="loading" :rows="6" variant="light" />

      <div v-else-if="heroes.length === 0" class="empty-state">
        No heroes crowned yet this Olympiad cycle.
      </div>

      <div v-else class="heroes-grid">
        <article
          v-for="hero in heroes"
          :key="hero.charId"
          class="card-navy hero-card"
        >
          <div
            v-if="getHeroClassArt(hero.class_id)"
            class="hero-bg-art"
            aria-hidden="true"
          >
            <img
              :src="getHeroClassArt(hero.class_id)"
              :alt="''"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div class="hero-crown" aria-hidden="true">👑</div>

          <div class="hero-class">{{ hero.class_name }}</div>
          <h3 class="hero-name">{{ hero.char_name }}</h3>

          <div class="hero-meta">
            <span class="hero-meta-item" :class="{ 'no-clan': !hero.clan_name }">
              {{ hero.clan_name || 'No clan' }}
            </span>
            <span v-if="hero.count > 1" class="hero-meta-item hero-times">
              ×{{ hero.count }} titles
            </span>
          </div>

          <blockquote v-if="hero.message" class="hero-message">
            “{{ hero.message }}”
          </blockquote>
        </article>
      </div>

      <p v-if="isMock" class="mock-notice">
        Demo hero data — connect your database for live Olympiad champions.
      </p>
    </div>
  </section>
</template>

<script setup>
import LoadingSkeleton from './LoadingSkeleton.vue';
import ErrorBanner from './ErrorBanner.vue';
import { getHeroClassArt } from '../data/heroClassArt.js';

defineProps({
  heroes: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
  isMock: { type: Boolean, default: false },
});
</script>

<style scoped>
.olympiad {
  background: linear-gradient(
    180deg,
    var(--color-white) 0%,
    var(--color-lavender-light) 100%
  );
}

.heroes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.hero-card {
  position: relative;
  padding: 2rem 1.75rem 1.75rem;
  overflow: hidden;
  isolation: isolate;
  transition: transform 0.25s, box-shadow 0.25s;
}

.hero-bg-art {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.hero-bg-art::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  background:
    linear-gradient(125deg, var(--color-navy-card) 0%, transparent 48%),
    linear-gradient(180deg, transparent 0%, transparent 55%, var(--color-navy-card) 100%),
    radial-gradient(ellipse 75% 75% at 92% 18%, transparent 30%, var(--color-navy-card) 75%);
}

.hero-bg-art img {
  position: absolute;
  right: -14%;
  top: -14%;
  bottom: auto;
  width: min(95%, 260px);
  height: auto;
  opacity: 0.52;
  filter: saturate(0.95) contrast(1.05) brightness(0.92);
  mix-blend-mode: lighten;
  transform: scale(1.04) translateZ(0);
  mask-image: radial-gradient(ellipse 98% 98% at 72% 22%, #000 55%, transparent 88%);
  -webkit-mask-image: radial-gradient(ellipse 98% 98% at 72% 22%, #000 55%, transparent 88%);
}

.hero-card:hover .hero-bg-art img {
  opacity: 0.62;
  transform: scale(1.08) translateZ(0);
  transition: opacity 0.25s, transform 0.25s;
}

.hero-crown,
.hero-class,
.hero-name,
.hero-meta,
.hero-message {
  position: relative;
  z-index: 1;
}

.hero-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-gold), #f5d78e, var(--color-gold));
}

.hero-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-navy);
}

.hero-crown {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  filter: drop-shadow(0 2px 6px rgba(212, 168, 83, 0.45));
}

.hero-class {
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-gold);
  margin-bottom: 0.35rem;
}

.hero-name {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-white);
  margin-bottom: 0.85rem;
  line-height: 1.2;
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.hero-meta-item {
  font-size: 0.78rem;
  color: rgba(232, 228, 243, 0.65);
  padding: 0.2rem 0.55rem;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 999px;
}

.hero-times {
  color: var(--color-gold);
  background: rgba(212, 168, 83, 0.12);
}

.no-clan {
  opacity: 0.7;
  font-style: italic;
}

.hero-message {
  margin: 0.75rem 0 0;
  padding-top: 0.85rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.85rem;
  font-style: italic;
  color: rgba(232, 228, 243, 0.75);
  line-height: 1.55;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--color-text-muted);
  background: var(--color-lavender-light);
  border-radius: var(--radius-md);
}
</style>
