import { memo, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import styles from './StockCard.module.css';
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
  const symbolData = useAppSelector(
    state => state.stocks.entities[id],
    (prev, next) => {
      if (!prev || !next) return false;
      return (
        prev.trend === next.trend &&
        prev.marketCap === next.marketCap
      );
    }
  );

  const { activeSymbol, showCardInfo } = useAppSelector(state => ({
    activeSymbol: state.store.activeSymbol,
    showCardInfo: state.store.showCardInfo
  }), (prev, next) => 
    prev.activeSymbol === next.activeSymbol && 
    prev.showCardInfo === next.showCardInfo
  );

  const { classNames: animationClasses } = useStockAnimation({
    price,
    isActive: activeSymbol === id,
    hasActiveCard: Boolean(activeSymbol),
    styles: {
      active: styles.active,
      inactive: styles.inactive,
      shake: styles.shake,
      priceUp: styles.priceUp,
      priceDown: styles.priceDown
    },
    animationDuration: 2000,
    priceChangeThreshold: 25
  });

  const cardClassNames = useMemo(() => classNames(
    styles.stock,
    "accelerated",
    ...animationClasses.split(' ')
  ), [animationClasses]);

  const handleClick = useCallback(() => {
    onClick(id);
  }, [onClick, id]);

  return (
    <Card className={cardClassNames} onClick={handleClick}>
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