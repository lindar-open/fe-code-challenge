import { memo, useRef, useCallback, useEffect, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useWindowSize, useIntersection } from 'react-use';
import classNames from 'classnames';
import type { PricesState } from '@/lib/types/stockTypes';
import { StockCard } from '@/components/StockCard';
import { usePullToRefresh } from '@/hooks/stocks/usePullToRefresh';
import { performanceMonitor } from '@/utils/performanceMonitor';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { StockCardListFallback } from '@/components/Errors';
import { useAppSelector } from '@/hooks/redux';
import styles from './StockCardList.module.css';

interface StockCardListProps {
  symbolIds: string[];
  prices: PricesState;
  onStockClick: (symbolId: string) => void;
  onRefresh?: () => Promise<void>;
}

const ROW_GAP = 65;
const CARD_HEIGHT = 250;
const CARD_WIDTH = 260;
const INTERSECTION_OPTIONS = {
  threshold: 0.5,
  rootMargin: '100px'
};

export const StockCardList = memo(({ 
  symbolIds,
  prices,
  onStockClick,
  onRefresh 
}: StockCardListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const activeSymbol = useAppSelector(state => state.store.activeSymbol);
  const hasActiveCard = Boolean(activeSymbol);
  
  useEffect(() => {
    performanceMonitor.startMeasure('stockCardListRender');
    return () => performanceMonitor.endMeasure('stockCardListRender');
  }, []);

  const itemsPerRow = useMemo(() => {
    if (width < 1024) return 1;
    if (width < 1280) return 2;
    return 3;
  }, [width]);

  const rowCount = useMemo(() => 
    Math.ceil(symbolIds.length / itemsPerRow)
  , [symbolIds.length, itemsPerRow]);
  const estimateSize = useCallback(() => CARD_HEIGHT + ROW_GAP, []);
  const getScrollElement = useCallback(() => containerRef.current, []);

  const { isIntersecting } = useIntersection(
    bottomRef, 
    INTERSECTION_OPTIONS
  ) || { isIntersecting: false };

  useEffect(() => {
    if (isIntersecting && onRefresh) {
      onRefresh();
    }
  }, [isIntersecting, onRefresh]);

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement,
    estimateSize,
    overscan: 3,
    paddingStart: ROW_GAP,
    paddingEnd: ROW_GAP
  });

  const virtualRows = useMemo(() => 
    virtualizer.getVirtualItems().map((virtualRow) => {
      const startIndex = virtualRow.index * itemsPerRow;
      const rowSymbols = symbolIds.slice(
        startIndex, 
        startIndex + itemsPerRow
      );

      return {
        key: String(virtualRow.key),
        start: virtualRow.start,
        symbols: rowSymbols
      };
    })
  , [virtualizer.getVirtualItems(), symbolIds, itemsPerRow]);

  const { pullState } = usePullToRefresh({ 
    onRefresh: onRefresh ?? (() => Promise.resolve()),
    pullDistance: 100 
  });
  
  const containerClasses = useMemo(() => 
    classNames(styles.root, {
      [styles.hasActive]: hasActiveCard,
      [styles.refreshing]: pullState.refreshing
    })
  , [hasActiveCard, pullState.refreshing]);

  const pullIndicatorClasses = useMemo(() => 
    classNames(styles.pullIndicator, {
      [styles.pullIndicatorVisible]: pullState.pulling
    })
  , [pullState.pulling]);
  
  return (
    <ErrorBoundary fallback={<StockCardListFallback />}>
      <div 
        ref={containerRef}
        className={containerClasses}
      >
        <div 
          className={pullIndicatorClasses}
          style={{ opacity: pullState.progress }}
        >
          <div className={styles.refreshIcon} />
        </div>

        <div
          className={styles.content}
          style={{
            height: `${virtualizer.getTotalSize()}px`,
          }}
        >
          {virtualRows.map(({ key, start, symbols }) => (
            <div
              key={key}
              className={styles.row}
              style={{
                transform: `translateY(${start}px)`,
                height: CARD_HEIGHT,
              }}
            >
              <div 
                className={styles.rowContent}
                style={{
                  gridTemplateColumns: `repeat(${itemsPerRow}, ${CARD_WIDTH}px)`,
                }}
              >
                {symbols.map((symbolId) => (
                  <div
                    key={symbolId}
                    className={styles.item}
                  >
                    <StockCard
                      key={symbolId}
                      id={symbolId}
                      price={prices[symbolId]}
                      onClick={onStockClick}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div ref={bottomRef} className={styles.bottomSentinel} />
      </div>
    </ErrorBoundary>
  );
});