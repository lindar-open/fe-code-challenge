export const marketCapFormatter = (cap: number) => {
  switch (true) {
    case cap >= 1_000_000_000_000:
      return `$${(cap / 1_000_000_000_000).toFixed(2)}T`;
    case cap >= 1_000_000_000:
      return `$${(cap / 1_000_000_000).toFixed(0)}B`;
    case cap >= 1_000_000:
      return `$${(cap / 1_000_000).toFixed(0)}M`;
    case cap >= 1_000:
      return `$${(cap / 1_000).toFixed(0)}K`;
    default:
      return `$${cap}`;
  }
};
