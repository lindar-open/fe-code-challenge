import { marketCapFormatter } from '@/lib';
import { memo } from 'react';

import './symbolCardPriceRow.css';

type SymbolCardPriceRowProps = {
  price: number;
};

const SymbolCardPriceRow = ({ price }: SymbolCardPriceRowProps) => {
  return (
    <div className="symbolCardPrice__row">
      Price:
      <span className="symbolCardPrice__value">
        {price ? marketCapFormatter(+price.toFixed(0)) : '--'}{' '}
      </span>
    </div>
  );
};
export default memo(SymbolCardPriceRow);
