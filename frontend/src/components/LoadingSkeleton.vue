<template>
  <div class="skeleton" :class="variant">
    <div v-for="n in rows" :key="n" class="skeleton-row"></div>
  </div>
</template>

<script setup>
defineProps({
  rows: { type: Number, default: 3 },
  variant: { type: String, default: 'default' },
});
</script>

<style scoped>
.skeleton {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
}

.skeleton-row {
  height: 1rem;
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.06) 25%,
    rgba(255, 255, 255, 0.12) 50%,
    rgba(255, 255, 255, 0.06) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}

.skeleton.light .skeleton-row {
  background: linear-gradient(
    90deg,
    var(--color-lavender) 25%,
    var(--color-lavender-light) 50%,
    var(--color-lavender) 75%
  );
  background-size: 200% 100%;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
