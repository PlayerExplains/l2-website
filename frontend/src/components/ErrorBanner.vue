<template>
  <div v-if="message" class="error-banner">
    <span class="error-icon">⚠</span>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  message: { type: String, default: '' },
});
</script>

<style scoped>
.error-banner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.25rem;
  background: rgba(192, 38, 211, 0.08);
  border: 1px solid rgba(192, 38, 211, 0.2);
  border-radius: var(--radius-sm);
  margin-bottom: 1.5rem;
}

.error-icon {
  font-size: 1.1rem;
  flex-shrink: 0;
}

.error-banner p {
  font-size: 0.875rem;
  color: var(--color-navy-muted);
  line-height: 1.5;
}
</style>
