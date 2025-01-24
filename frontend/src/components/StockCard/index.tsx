import { memo, useCallback } from 'react';
import './stockCard.css';

import { useAppSelector } from '@/hooks/redux';
import { useStockAnimation } from '@/hooks/animation/useStockAnimation';
import { Card, CardHeader, CardContent } from '@/components/Card';
import { StockCardHeader, StockCardInfo } from './_components';

export interface StockCardProps {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
}

export const StockCard = memo(({ id, onClick, price }: StockCardProps) => {
  const symbolData = useAppSelector(state => state.stocks.entities[id], 
    (prev, next) => {
      if (!prev || !next) return false;
      return (
        prev.trend === next.trend &&
        prev.marketCap === next.marketCap
      );
    });
  const { activeSymbol, showCardInfo } = useAppSelector(state => state.store);
  
  const { classNames: stockAnimationClassNames } = useStockAnimation({
    price,
    isActive: activeSymbol === id,
    hasActiveCard: Boolean(activeSymbol),
    animationDuration: 2000,
    priceChangeThreshold: 25
  });
  
  const handleOnClick = useCallback(() => {
    onClick(id);
  }, [onClick, id]);

  return (
    <Card className={stockAnimationClassNames} onClick={handleOnClick}>
      <CardHeader>
        <StockCardHeader
          id={id}
          trend={symbolData.trend}
        />
      </CardHeader>
      <CardContent>
        <StockCardInfo
          price={price}
          showCardInfo={showCardInfo}
          symbolData={symbolData}
        />
      </CardContent>
    </Card>
  );
});
