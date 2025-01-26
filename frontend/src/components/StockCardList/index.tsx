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

interface VirtualRow {
    key: string;
    start: number;
    symbols: string[];
}

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
  const overscanCount = 5;

  const itemConfig = useMemo(() => ({
    ROW_GAP: 65,
    CARD_HEIGHT: 250,
    CARD_WIDTH: 260,
    INTERSECTION_OPTIONS: {
      threshold: 0.5,
      rootMargin: '100px'
    }
  }), []);

  const { ROW_GAP, CARD_HEIGHT, INTERSECTION_OPTIONS } = itemConfig;
  
  useEffect(() => {
    performanceMonitor.startMeasure('stockCardListRender');
    return () => performanceMonitor.endMeasure('stockCardListRender');
  }, []);

  const itemsPerRow = useMemo(() => {
    if (width < 1024) return 1;
    if (width < 1280) return 2;
    return 3;
  }, [width]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty('--items-per-row', String(itemsPerRow));
    }
  }, [itemsPerRow]);

  const getItemCount = useCallback((itemsPerRow: number) => 
    Math.ceil(symbolIds.length / itemsPerRow)
  , [symbolIds.length]);
  const rowCount = useMemo(() => getItemCount(itemsPerRow), [getItemCount, itemsPerRow]);
  const estimateSize = useCallback(() => CARD_HEIGHT + ROW_GAP, [CARD_HEIGHT, ROW_GAP]);
  const getScrollElement = useCallback(() => containerRef.current, []);

  const { isIntersecting } = useIntersection(
    bottomRef, 
    INTERSECTION_OPTIONS
  ) || { isIntersecting: false };

  useEffect(() => {
    if (virtualizer.measure) {
      virtualizer.measure();
    }
  }, [symbolIds.length]);

  useEffect(() => {
    if (isIntersecting && onRefresh) {
      onRefresh();
    }
  }, [isIntersecting, onRefresh]);

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement,
    estimateSize,
    overscan: overscanCount,
    paddingStart: ROW_GAP,
    paddingEnd: ROW_GAP,
    initialRect: { width, height: 800 },
    measureElement: (element) => {
      const rect = element.getBoundingClientRect();
      return rect.height;
    }
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

  const listStyles = useMemo(() => ({
    height: `${virtualizer.getTotalSize()}px`,
  }), [virtualizer.getTotalSize()]);
  
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

  const renderRow = useCallback(({ key, start, symbols }: VirtualRow) => (
    <div
      key={key}
      className={styles.row}
      style={{
        transform: `translateY(${start}px)`,
        height: CARD_HEIGHT,
      }}
    >
      <div className={styles.rowContent}>
        {symbols.map((symbolId) => (
          <div key={symbolId} className={styles.item}>
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
  ), [CARD_HEIGHT, prices, onStockClick]);
  
  return (
    <ErrorBoundary fallback={<StockCardListFallback />}>
      <div ref={containerRef} className={containerClasses}>
        <div 
          className={pullIndicatorClasses}
          style={{ opacity: pullState.progress }}
        >
          <div className={styles.refreshIcon} />
        </div>
        <div
          className={styles.content}
          style={listStyles}
        >
          {virtualRows.map(renderRow)}
        </div>
        <div ref={bottomRef} className={styles.bottomSentinel} />
      </div>
    </ErrorBoundary>
  );
});