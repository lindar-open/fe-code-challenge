import { memo, useMemo } from 'react';
import styles from './HighlightedSymbols.module.css';
import type { TrendType } from '@/lib/types';
import { PerformanceCard } from '@/components/PerformanceCard';

interface HighlightedSymbol {
  trend?: TrendType;
  symbolId: string;
  volume: number;
  change: number;
}

const data: HighlightedSymbol[] = [
  {
    symbolId: 'NVDA',
    volume: 323_463_212,
    change: 1.127
  },
  {
    symbolId: 'AAPL',
    volume: 221_673_743,
    change: 0.6534
  },
  {
    symbolId: 'TSLA',
    volume: 151_865_316,
    change: 0.99
  },
  {
    symbolId: 'AMZN',
    volume: 98_527_158,
    change: 0.9269
  },
  {
    symbolId: 'GOOGL',
    volume: 83_316_914,
    change: 1.1134
  },
  {
    symbolId: 'MSFT',
    volume: 73_735_142,
    change: 0.9932
  }
] as const;

export const HighlightedSymbols = memo(() => {
  const renderedSymbols = useMemo(() => 
    data.map((symbol) => (
      <PerformanceCard
        key={symbol.symbolId}
        title={symbol.symbolId}
        volume={symbol.volume}
        change={symbol.change}
      />
    ))
  , []);

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        {renderedSymbols}
      </div>
    </div>
  );
});

HighlightedSymbols.displayName = 'HighlightedSymbols';