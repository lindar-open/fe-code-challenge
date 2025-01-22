import { memo, useRef, useCallback, useEffect } from 'react';
import './stocksCardsList.css';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useWindowSize } from '@/hooks/events/useWindowSize';
import { useIntersectionObserver } from '@/hooks/events/useIntersectionObserver';
import type { PricesState } from '@/lib/types/stockTypes';
import { StockCard } from '@/components/StockCard';
import { usePullToRefresh } from '@/hooks/stocks/usePullToRefresh';
import { performanceMonitor } from '@/utils/performanceMonitor';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { StockCardListFallback } from '@/components/Errors';

interface StockCardListProps {
  symbolIds: string[];
  prices: PricesState;
  onStockClick: (symbolId: string) => void;
  onRefresh?: () => Promise<void>;
}

const ROW_GAP = 50;
const CARD_HEIGHT = 250;

export const StockCardList = memo(({ 
  symbolIds,
  prices,
  onStockClick,
  onRefresh 
}: StockCardListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();

  useEffect(() => {
    performanceMonitor.startMeasure('stockCardListRender');
    return () => performanceMonitor.endMeasure('stockCardListRender');
  });
  
  const getItemsPerRow = useCallback(() => {
    if (width < 1024) return 1;
    if (width < 1280) return 2;
    return 3;
  }, [width]);

  const itemsPerRow = getItemsPerRow();
  const rowCount = Math.ceil(symbolIds.length / itemsPerRow);

  const { targetRef: bottomRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: '100px'
  });

  useEffect(() => {
    if (isIntersecting && onRefresh) {
      onRefresh();
    }
  }, [isIntersecting, onRefresh]);

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => containerRef.current,
    estimateSize: useCallback(() => CARD_HEIGHT + ROW_GAP, []),
    overscan: 3,
    paddingStart: ROW_GAP,
    paddingEnd: ROW_GAP
  });

  const { pullState } = usePullToRefresh({ 
    onRefresh: onRefresh ?? (() => Promise.resolve()),
    pullDistance: 100 
  });

  return (
    <ErrorBoundary fallback={<StockCardListFallback />}>
      <div 
        ref={containerRef}
        className={`stockCardList ${pullState.refreshing ? 'stockCardList--refreshing' : ''}`}
      >
        <div 
          className={`stockCardList__pullIndicator ${
            pullState.pulling ? 'stockCardList__pullIndicator--visible' : ''
          }`}
          style={{ opacity: pullState.progress }}
        >
          <div className="stockCardList__refreshIcon" />
        </div>

        <div
          className="stockCardList__content"
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const startIndex = virtualRow.index * itemsPerRow;
            const rowSymbols = symbolIds.slice(
              startIndex, 
              startIndex + itemsPerRow
            );

            return (
              <div
                key={String(virtualRow.key)}
                className="stockCardList__row"
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                  minHeight: CARD_HEIGHT,
                }}
              >
                <div 
                  className="stockCardList__row-content"
                  style={{
                    gridTemplateColumns: `repeat(${itemsPerRow}, 260px)`
                  }}
                >
                  {rowSymbols.map((symbolId) => (
                    <div
                      key={symbolId}
                      className="stockCardList__item"
                    >
                      <StockCard
                        id={symbolId}
                        price={prices[symbolId]}
                        onClick={onStockClick}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div ref={bottomRef} style={{ height: '20px' }} />
      </div>
    </ErrorBoundary>
  );
});