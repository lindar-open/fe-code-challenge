import './card.css';

import React from 'react';
import { useAppSelector } from '@/hooks/redux';
import { useCallback } from 'react';
import { selectShowCardInfo } from '@/store/dashboardOptionsSlice';
import { formatCurrencyUsd } from '@/utils/formatCurrencyUsd';
import CardHeader from './CardHeader';
import CardPrice from './CardPrice';
import CardBody from './CardBody';
import { useCardEffects } from '../../hooks/useCardEffects';
import { cn } from '@/utils/cn';

type CardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
  symbolId: string | null;
};

const Card = React.memo(({ id, onClick, price, symbolId }: CardProps) => {
  const { trend, companyName, industry, marketCap } = useAppSelector(
    (state) => state.stocks.entities[id]
  );
  const showCardInfo = useAppSelector(selectShowCardInfo);
  // custom hook for bonus points.
  const { glowClass, shakeClass, isSelected } = useCardEffects(price, symbolId, id);
  const marketcapFormatted = formatCurrencyUsd(marketCap);
  const priceFormatted = formatCurrencyUsd(price);

  const handleOnClick = useCallback(() => {
    onClick(id);
  }, [onClick, id]);

  return (
    <div onClick={handleOnClick} className={cn('card', glowClass, isSelected, shakeClass)}>
      <CardHeader trend={trend} id={id} />
      <CardPrice price={priceFormatted} />
      {showCardInfo && (
        <CardBody companyName={companyName} industry={industry} marketCap={marketcapFormatted} />
      )}
    </div>
  );
});
export default Card;
