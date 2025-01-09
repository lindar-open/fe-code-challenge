import SymbolCardList from '@/components/SymbolCard/src/SymbolCardList';
import SymbolCardPrice from '@/components/SymbolCard/src/SymbolCardPrice';
import './symbolCardBody.css';
import { Stock } from '@/store/stocksSlice';
import { memo } from 'react';

export type SymbolCardBodyProps = {
  price: number;
  showCardInfo: boolean;
} & Pick<Stock, 'companyName' | 'industry' | 'marketCap'>;

const SymbolCardBody = ({ price, showCardInfo, ...rest }: SymbolCardBodyProps) => {
  return (
    <div className="symbolCard__body">
      <SymbolCardPrice price={price} />
      {showCardInfo && <SymbolCardList {...rest} />}
    </div>
  );
};

export default memo(SymbolCardBody);
