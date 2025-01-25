import { memo } from 'react';
import classNames from 'classnames';
import styles from './SymbolsGrid.module.css';
import { StockCardList } from '@/components/StockCardList';
import { useStockData } from '@/hooks/stocks/useStockData';
import { usePullToRefresh } from '@/hooks/stocks/usePullToRefresh';

interface SymbolsGridProps {
  onSymbolClick: (symbolId: string) => void;
}

export const SymbolsGrid = memo(({ onSymbolClick }: SymbolsGridProps) => {
  const { 
    stockSymbols, 
    prices, 
    isLoading, 
    error, 
    refreshData 
  } = useStockData();

  const { ref, pullState } = usePullToRefresh({ 
    onRefresh: refreshData,
    pullDistance: 100 
  });

  if (error) {
    return (
      <div className={styles.root}>
        <div className={styles.error}>
          Error loading stocks: {error.message}
        </div>
      </div>
    );
  }

  const pullIndicatorClasses = classNames(
    styles.pullIndicator,
    {
      [styles.pullIndicatorVisible]: 
        pullState.pulling || pullState.refreshing
    }
  );

  const spinnerClasses = classNames(
    styles.refreshSpinner,
    {
      [styles.refreshSpinnerActive]: pullState.refreshing
    }
  );

  return (
    <div
      ref={ref}
      className={styles.root}
    >
      <div
        className={pullIndicatorClasses}
        style={{
          opacity: Math.min(pullState.progress, 1),
          transform: `translateX(-50%) scale(${Math.min(pullState.progress, 1)})`
        }}
      >
        <div className={spinnerClasses} />
      </div>

      <div className={styles.content}>
        {isLoading ? (
          <div className={styles.loader} />
        ) : (
        <StockCardList
          symbolIds={stockSymbols}
          prices={prices}
          onStockClick={onSymbolClick}
          onRefresh={refreshData}
        />
        )}
      </div>
    </div>
  );
});

SymbolsGrid.displayName = 'SymbolsGrid';