import { memo, useMemo } from 'react';
import './priceDisplay.css';

import { formatCurrency } from '@/utils/currencyFormatter';

export const PriceDisplay = memo(({ price }: { price: number }) => {
  const formattedPrice = useMemo(() => formatCurrency(price), [price]);
  
  return (
    <div className="stockCard__price">
      <span className="stockCard__price-label">PRICE:</span>
      <span className="stockCard__price-value">{formattedPrice}</span>
    </div>
  );
});