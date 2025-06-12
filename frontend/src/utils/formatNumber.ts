export function formatNumber(value: number): string {
  if (value == null || isNaN(value)) return '--';
  const abs = Math.abs(value);
  if (abs < 1_000) {
    if (abs < 10) {
      return `$${value.toFixed(1)}`;
    }
    return `$${Math.round(value)}`;
  }
  if (abs < 1_000_000) return `$${Math.round(value / 1_000)}K`;
  if (abs < 1_000_000_000) return `$${Math.round(value / 1_000_000)}M`;
  if (abs < 1_000_000_000_000) return `$${Math.round(value / 1_000_000_000)}B`;
  return `$${(value / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '')}T`;
}
