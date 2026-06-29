<template>
  <section id="features" class="features section">
    <div class="container">
      <h2 class="section-title">Server Features</h2>
      <p class="section-subtitle">Classic Interlude experience, modern server quality</p>

      <div class="features-grid">
        <div v-for="feature in features" :key="feature.title" class="card feature-card">
          <span class="feature-icon">{{ feature.icon }}</span>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <section id="download" class="cta section">
    <div class="container">
      <div class="cta-card">
        <div class="cta-content">
          <h2>Ready to Play?</h2>
          <p>Download the client and join the battle!</p>
          <p>Accounts are automatically created on login. Enjoy!</p>
          <div class="cta-actions">
            <a v-bind="downloadLink" class="btn btn-primary">Download Client</a>
            <a v-bind="discordLink" class="btn btn-discord">Join Discord</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { DISCORD_URL, DOWNLOAD_URL, linkProps } from '../config/site.js';

const downloadLink = computed(() => linkProps(DOWNLOAD_URL));
const discordLink = computed(() => linkProps(DISCORD_URL));
const features = [
  {
    icon: '⚡',
    title: 'X50 Rates',
    description: 'Balanced XP, SP, and drop rates for fast progression without skipping the journey.',
  },
  {
    icon: '🏰',
    title: 'Castle Sieges',
    description: 'Weekly sieges on Giran, Aden, and more. Clans fight for territory and glory.',
  },
  {
    icon: '⚔️',
    title: 'Active PvP',
    description: 'Open-world PvP, Olympiad, and ranked leaderboards tracked live on this site.',
  },
  {
    icon: '🛡️',
    title: 'Fair Play',
    description: 'Anti-bot protection and active GMs to keep the economy and gameplay authentic.',
  },
  {
    icon: '👥',
    title: 'Community',
    description: 'Active Discord with events, giveaways, and a helpful player base.',
  },
  {
    icon: '🎁',
    title: 'Starter Pack',
    description: 'New players receive welcome bonuses to jumpstart their Interlude adventure.',
  },
];
</script>

<style scoped>
.features {
  background: var(--color-white);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
}

.feature-card {
  padding: 2.25rem 2rem;
  text-align: center;
  transition: transform 0.25s, box-shadow 0.25s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.feature-icon {
  font-size: 2.25rem;
  display: block;
  margin-bottom: 1.25rem;
}

.feature-card h3 {
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: var(--color-navy);
  margin-bottom: 0.75rem;
}

.feature-card p {
  font-size: 0.925rem;
  color: var(--color-text-muted);
  line-height: 1.65;
}

.cta {
  padding-top: 0;
}

.cta-card {
  background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-light) 100%);
  border-radius: var(--radius-lg);
  padding: 5rem 2rem;
  text-align: center;
  color: var(--color-white);
  position: relative;
  overflow: hidden;
}

.cta-card::before {
  content: '';
  position: absolute;
  top: -40%;
  right: -15%;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(192, 38, 211, 0.2) 0%, transparent 70%);
  border-radius: 50%;
}

.cta-content {
  position: relative;
  z-index: 1;
}

.cta-content h2 {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  margin-bottom: 1rem;
}

.cta-content p {
  opacity: 0.85;
  margin-bottom: 2.5rem;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.05rem;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
