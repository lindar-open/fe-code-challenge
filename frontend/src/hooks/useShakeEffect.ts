import { useEffect, useRef, useState } from 'react';

export function useShakeEffect(price: number, durationMs = 620) {
  const [shakeClass, setShakeClass] = useState('');
  const prevPrice = useRef<number | null>(null);

  useEffect(() => {
    if (prevPrice.current === null) {
      prevPrice.current = price;
      return;
    }
    if (price === prevPrice.current) return;
    const diff = price - prevPrice.current;
    if (diff === 0) return;
    const prev = prevPrice.current;
    const percentChange = Math.abs(diff) / Math.abs(prev);
    if (percentChange > 0.25) {
      setShakeClass('symbolCard__shake');
      const timeoutId = setTimeout(() => {
        setShakeClass('');
      }, durationMs);
      
      prevPrice.current = price;
      return () => clearTimeout(timeoutId);
    }
    prevPrice.current = price;
  }, [price, durationMs]);

  return { shakeClass };
}
