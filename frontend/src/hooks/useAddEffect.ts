import { useState } from 'react';

export default () => {
  const [effect, setEffect] = useState('');

  const addEffect = (price: number, prevPrice: number) => {
    if (price > prevPrice) {
      const increasePercent = (100 * (price - prevPrice)) / prevPrice;

      if (increasePercent >= 25) {
        setEffect('shake');
      }
    }
  };

  return { effect, setEffect, addEffect };
};
