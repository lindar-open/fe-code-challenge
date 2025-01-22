import { useRef, useEffect, useMemo } from 'react';

export const useStockAnimation = (price: number, activeStock: string | null, id: string) => {
  const prevPriceRef = useRef<number | null>(null);

  useEffect(() => {
    prevPriceRef.current = price;
  }, [price]);

  return useMemo(() => {
    const classNames: string[] = ['stock'];

    if (activeStock) {
      classNames.push(activeStock === id ? 'stock__active' : 'stock__inactive');
    }

    const prevPrice = prevPriceRef.current;
    if (prevPrice !== null) {
      const increasePercent = (100 * (price - prevPrice)) / prevPrice;

      if (price > prevPrice) {
        if (increasePercent >= 25) {
          classNames.push('stock__shake');
        }
        classNames.push('stock__price-up');
      }

      if (price < prevPrice) {
        classNames.push('stock__price-down');
      }
    }

    return classNames.join(' ');
  }, [price, activeStock, id]);
};
