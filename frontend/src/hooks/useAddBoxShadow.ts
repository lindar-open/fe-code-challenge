import { useState } from 'react';

export default () => {
  const [shadow, setShadow] = useState('');

  const addShadow = (price: number, prevPrice = 0) => {
    if (price > prevPrice) {
      setShadow('green');
      return;
    }

    if (price < prevPrice) {
      setShadow('red');
      return;
    }
  };

  return { shadow, addShadow, setShadow };
};
