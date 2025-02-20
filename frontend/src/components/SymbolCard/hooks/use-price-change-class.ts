import { useMemo } from 'react';

export const usePriceChangeClass = (priceChangePercentage: number, activeSymbol: boolean | null) => {
  return useMemo(() => {
    const rootClassName = ['symbolCard'];

    if (activeSymbol !== null) {
      rootClassName.push(`symbolCard--${activeSymbol ? 'active' : 'inactive'}`);
    }

    if (priceChangePercentage < 0) {
      rootClassName.push('symbolCard--price-down');
    } else if (priceChangePercentage > 0) {
      rootClassName.push('symbolCard--price-up');

      if (priceChangePercentage > 25) {
        rootClassName.push('symbolCard__shake');
      }
    }

    return rootClassName.join(' ');
  }, [priceChangePercentage, activeSymbol]);
};
