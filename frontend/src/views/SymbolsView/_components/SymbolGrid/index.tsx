import { memo } from 'react';
import './symbolsGrid.css';

import { StockCardList } from '@/components/StockCardList';
import { useStockData } from '@/hooks/stocks/useStockData';
import { usePullToRefresh } from '@/hooks/stocks/usePullToRefresh';

export interface SymbolsGridProps {
  onSymbolClick: (symbolId: string) => void;
}

export const SymbolsGrid = memo(({ onSymbolClick }: SymbolsGridProps) => {
  const { stockSymbols, prices, isLoading, error, refreshData } = useStockData();
  const { ref, pullState } = usePullToRefresh({ onRefresh: refreshData });

  if (error) {
    return (
      <div className="symbolsCardGrid symbolsCardGrid__error">
        Error loading stocks: {error.message}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`symbolsCardGrid ${pullState.refreshing ? 'symbolsCardGrid--refreshing' : ''}`}
    >
      <div
        className={`symbolsCardGrid__pullIndicator ${
          pullState.pulling || pullState.refreshing ? 'symbolsCardGrid__pullIndicator--visible' : ''
        }`}
        style={{
          opacity: Math.min(pullState.progress, 1),
          transform: `scale(${Math.min(pullState.progress, 1)})`
        }}
      >
        <div className={`symbolsCardGrid__refreshSpinner ${
          pullState.refreshing ? 'symbolsCardGrid__refreshSpinner--active' : ''
        }`} />
      </div>

      <div className="symbolsCardGrid__content">
        {isLoading ? (
          <div className="symbolsCardGrid__loader" />
        ) : (
          <StockCardList
            symbolIds={stockSymbols}
            prices={prices}
            onStockClick={onSymbolClick}
          />
        )}
      </div>
    </div>
  );
});