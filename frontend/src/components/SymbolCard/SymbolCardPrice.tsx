import React from 'react';
import { formatNumber } from '@/utils/formatNumber';

type SymbolCardPriceProps = {
  price: number;
};

const SymbolCardPrice = ({ price }: SymbolCardPriceProps) => (
  <div className="symbolCard__priceRow">
    <span className="symbolCard__priceLabel">PRICE:</span>
    <span className="symbolCard__priceValue">{formatNumber(price)}</span>
  </div>
);

export default React.memo(SymbolCardPrice);
