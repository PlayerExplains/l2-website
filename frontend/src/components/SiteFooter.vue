<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <span class="logo-mark">X50</span>
        <span class="logo-text">Interlude</span>
        <p class="footer-tagline">Classic Lineage 2 Private Server</p>
      </div>

      <div class="footer-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/rates">Rates</RouterLink>
        <a href="/#rankings">Rankings</a>
        <a href="/#olympiad">Olympiad</a>
        <a href="/#castles">Castles</a>
        <a v-bind="downloadLink">Download</a>
        <a v-bind="discordLink">Discord</a>
      </div>

      <p class="footer-copy">
        &copy; {{ currentYear }} Interlude X50. Not affiliated with NCsoft.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { DISCORD_URL, DOWNLOAD_URL, linkProps } from '../config/site.js';

const currentYear = new Date().getFullYear();
const downloadLink = computed(() => linkProps(DOWNLOAD_URL));
const discordLink = computed(() => linkProps(DISCORD_URL));
</script>

<style scoped>
.footer {
  background: var(--color-navy);
  color: var(--color-text-on-dark);
  padding: 4rem 0 2.5rem;
}

.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.logo-mark {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background: var(--color-magenta);
  color: white;
  border-radius: 5px;
}

.logo-text {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
}

.footer-tagline {
  font-size: 0.85rem;
  opacity: 0.55;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.footer-links a {
  font-size: 0.9rem;
  opacity: 0.7;
  transition: opacity 0.2s, color 0.2s;
}

.footer-links a:hover {
  opacity: 1;
  color: var(--color-magenta-light);
}

.footer-copy {
  font-size: 0.8rem;
  opacity: 0.4;
  margin-top: 0.5rem;
}
</style>
