/** Format L2J Mobius siegeDate (epoch ms) for display. */
export function formatSiegeDate(timestamp) {
  if (!timestamp) return 'TBA';
  const date = new Date(Number(timestamp));
  if (isNaN(date.getTime())) return 'TBA';
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
