import { useEffect, useRef, useState } from 'react';

export const usePriceChangePercentage = (price: number) => {
  const priceRef = useRef(price);
  const [priceChangePercentage, setPriceChangePercentage] = useState<number>(0);

  useEffect(() => {
    if (priceRef.current && price && priceRef.current !== price) {
      const diff = price - priceRef.current;
      setPriceChangePercentage((diff / priceRef.current) * 100);
    }

    priceRef.current = price;
  }, [price]);

  return priceChangePercentage;
};
