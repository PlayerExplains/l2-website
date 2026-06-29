<template>
  <div class="rates-table-group card">
    <h3 class="group-title">{{ title }}</h3>
    <table class="rates-table">
      <tbody>
        <tr v-for="(row, index) in rows" :key="row.label" :class="{ 'row-alt': index % 2 === 1 }">
          <th scope="row">{{ row.label }}</th>
          <td>
            <span class="value-badge" :class="valueClass(row.value)">{{ row.value }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  rows: { type: Array, required: true },
});

function valueClass(value) {
  if (value === 'Disabled') return 'is-disabled';
  if (value === 'Enabled') return 'is-enabled';
  if (value === 'Normal') return 'is-normal';
  return 'is-rate';
}
</script>

<style scoped>
.rates-table-group {
  padding: 0;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  border: 1px solid rgba(12, 21, 38, 0.07);
  box-shadow: var(--shadow-sm);
}

.rates-table-group:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.group-title {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-on-dark);
  padding: 1rem 1.35rem;
  background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-light) 100%);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  position: relative;
}

.group-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 1.35rem;
  right: 1.35rem;
  height: 2px;
  background: linear-gradient(90deg, var(--color-magenta), var(--color-gold), transparent);
  opacity: 0.85;
}

.rates-table {
  width: 100%;
  border-collapse: collapse;
}

.rates-table th,
.rates-table td {
  padding: 0.9rem 1.35rem;
  text-align: left;
  font-size: 0.925rem;
  border-bottom: 1px solid rgba(12, 21, 38, 0.05);
}

.rates-table tr:last-child th,
.rates-table tr:last-child td {
  border-bottom: none;
}

.rates-table tr {
  transition: background-color 0.2s ease;
}

.rates-table tr:hover {
  background: rgba(228, 223, 240, 0.35);
}

.rates-table tr.row-alt {
  background: rgba(247, 245, 252, 0.65);
}

.rates-table tr.row-alt:hover {
  background: rgba(228, 223, 240, 0.45);
}

.rates-table th {
  font-weight: 500;
  color: var(--color-text);
}

.rates-table td {
  text-align: right;
}

.value-badge {
  display: inline-block;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  letter-spacing: 0.02em;
}

.value-badge.is-rate {
  color: var(--color-magenta);
  background: rgba(192, 38, 211, 0.08);
  border: 1px solid rgba(192, 38, 211, 0.15);
}

.value-badge.is-normal {
  color: var(--color-navy);
  background: rgba(12, 21, 38, 0.06);
  border: 1px solid rgba(12, 21, 38, 0.1);
}

.value-badge.is-disabled {
  color: #9ca3af;
  background: rgba(107, 114, 128, 0.1);
  border: 1px solid rgba(107, 114, 128, 0.18);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.value-badge.is-enabled {
  color: #15803d;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.22);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
</style>
