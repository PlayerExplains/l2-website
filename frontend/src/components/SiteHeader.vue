<template>
  <header class="header">
    <div class="container header-inner">
      <RouterLink to="/" class="logo">
        <span class="logo-mark">X50</span>
        <span class="logo-text">Interlude</span>
      </RouterLink>

      <nav class="nav" :class="{ open: menuOpen }">
        <RouterLink to="/" @click="closeMenu">Home</RouterLink>
        <RouterLink to="/rates" @click="closeMenu">Rates</RouterLink>
        <a href="/#rankings" @click="closeMenu">Rankings</a>
        <a href="/#olympiad" @click="closeMenu">Olympiad</a>
        <a href="/#castles" @click="closeMenu">Castles</a>
        <a href="/#features" @click="closeMenu">Features</a>
      </nav>

      <div class="header-actions">
        <a v-bind="downloadLink" class="btn btn-primary btn-sm">Play for Free</a>
        <button class="menu-toggle" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { DOWNLOAD_URL, linkProps } from '../config/site.js';

const menuOpen = ref(false);
const downloadLink = computed(() => linkProps(DOWNLOAD_URL));

function closeMenu() {
  menuOpen.value = false;
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(247, 245, 252, 0.9);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(12, 21, 38, 0.05);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.logo-mark {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  background: var(--color-magenta);
  color: white;
  border-radius: 6px;
  letter-spacing: 0.05em;
}

.logo-text {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-navy);
}

.nav {
  display: flex;
  gap: 2.25rem;
}

.nav a,
.nav :deep(a) {
  font-weight: 500;
  font-size: 0.925rem;
  color: var(--color-text-muted);
  transition: color 0.2s;
}

.nav a:hover,
.nav :deep(a:hover) {
  color: var(--color-magenta);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-sm {
  padding: 0.625rem 1.35rem;
  font-size: 0.875rem;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
}

.menu-toggle span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--color-navy);
  border-radius: 2px;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .nav {
    position: absolute;
    top: 76px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: var(--color-white);
    padding: 1.5rem 2rem;
    gap: 1.25rem;
    box-shadow: var(--shadow-md);
    transform: translateY(-120%);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  .nav.open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
