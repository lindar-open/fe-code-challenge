import { useRef, useState, useEffect } from 'react';

export function useCardEffects(price: number, symbolId: string | null, id: string) {
  const prevPriceRef = useRef<number>(price);
  const [glowClass, setGlowClass] = useState('');
  const [shakeClass, setShakeClass] = useState('');
  const [isSelected, setSelected] = useState('');

  useEffect(() => {
    if (id === symbolId) {
      setSelected('card--selected');
    } else {
      setSelected('');
    }
  }, [id, symbolId]);

  useEffect(() => {
    const prevPrice = prevPriceRef.current;
    setGlowClass('');
    let glowTimeout: NodeJS.Timeout;

    if (price > prevPrice) {
      glowTimeout = setTimeout(() => setGlowClass('card__price--up'), 0);
      setTimeout(() => setGlowClass(''), 1000);
    } else if (price < prevPrice) {
      glowTimeout = setTimeout(() => setGlowClass('card__price--down'), 0);
      setTimeout(() => setGlowClass(''), 1000);
    }
    // in the video only 25% increase triggers shake, to be both directions we just need to add Math.abs around the formula
    if (prevPrice > 0 && (price - prevPrice) / prevPrice > 0.25) {
      setShakeClass('card__shake');
      setTimeout(() => setShakeClass(''), 700);
    } else {
      setShakeClass('');
    }

    prevPriceRef.current = price;

    return () => {
      clearTimeout(glowTimeout);
    };
  }, [price]);

  return { glowClass, shakeClass, isSelected };
}
