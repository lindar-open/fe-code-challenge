import { memo, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import styles from './StockCard.module.css';
import { useAppSelector } from '@/hooks/redux';
import { useStockAnimation } from '@/hooks/animation/useStockAnimation';
import { Card, CardHeader, CardContent, LoadingCard } from '@/components/Card';
import { StockCardHeader, StockCardInfo } from './_components';
import { type RootState } from '@/store';

export interface StockCardProps {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
}

export const StockCard = memo(({ id, onClick, price }: StockCardProps) => {
  const selectStockData = useCallback((state: RootState) => {
    const entity = state.stocks.entities[id];
    if (!entity) return null;
    return {
      trend: entity.trend,
      marketCap: entity.marketCap,
      companyName: entity.companyName,
      industry: entity.industry
    };
  }, [id]);

  const symbolData = useAppSelector(selectStockData);

  const { activeSymbol, showCardInfo } = useAppSelector(state => ({
    activeSymbol: state.store.activeSymbol,
    showCardInfo: state.store.showCardInfo
  }), (prev, next) => 
    prev.activeSymbol === next.activeSymbol && 
    prev.showCardInfo === next.showCardInfo
  );

  const animationProps = useMemo(() => ({
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
  }), [price, activeSymbol, id]);

  const { classNames: animationClasses } = useStockAnimation(animationProps);

  const handleClick = useCallback(() => {
    onClick(id);
  }, [onClick, id]);

  if (!symbolData) {
    return <LoadingCard />;
  }

  const cardClassNames = useMemo(() => classNames(
    styles.root,
    "accelerated",
    ...animationClasses.split(' ')
  ), [animationClasses]);
  
  return (
    <Card className={cardClassNames} onClick={handleClick}>
      <CardHeader>
        <StockCardHeader id={id} trend={symbolData.trend} />
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
}, (prevProps, nextProps) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.price === nextProps.price &&
    prevProps.onClick === nextProps.onClick
  );
});