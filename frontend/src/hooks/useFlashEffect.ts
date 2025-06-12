import { useEffect, useRef, useState } from 'react';

export function useFlashEffect(price: number, durationMs = 1200) {
  const [flashClass, setFlashClass] = useState('');
  const prevPrice = useRef<number | null>(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    if (prevPrice.current === null) {
      prevPrice.current = price;
      return;
    }
    if (price === prevPrice.current) return;
    const diff = price - prevPrice.current;
    if (diff === 0) return;
    setFlashClass('');
    setTimeout(() => {
      setFlashClass(diff > 0 ? 'symbolCard__flash--green' : 'symbolCard__flash--red');
      animatingRef.current = true;
      setTimeout(() => {
        setFlashClass('');
        animatingRef.current = false;
      }, durationMs);
    }, 10);
    prevPrice.current = price;
  }, [price, durationMs]);

  return flashClass;
}
