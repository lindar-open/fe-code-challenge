import { useEffect, useRef, useState } from 'react';

export function useFlashEffect(price: number, durationMs = 1200) {
  const [flashClass, setFlashClass] = useState('');
  const prevPrice = useRef<number | null>(null);

  useEffect(() => {
    if (prevPrice.current === null) {
      prevPrice.current = price;
      return;
    }
    if (price === prevPrice.current) return;
    const diff = price - prevPrice.current;
    if (diff === 0) return;
    const newClass = diff > 0 ? 'symbolCard__flash--green' : 'symbolCard__flash--red';
    setFlashClass(newClass);
    const timeoutId = setTimeout(() => {
      setFlashClass('');
    }, durationMs);

    prevPrice.current = price;
    return () => clearTimeout(timeoutId);
  }, [price, durationMs]);

  return { flashClass };
}
