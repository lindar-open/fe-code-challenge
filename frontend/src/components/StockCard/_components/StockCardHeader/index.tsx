import { memo, useMemo } from 'react';
import styles from './StockCardHeader.module.css';
import type { TrendType } from '@/lib/types';
import { useAsset } from '@/hooks/assets/useAsset';

interface StockCardHeaderProps {
  id: string;
  trend: TrendType;
}

export const StockCardHeader = memo(({ id, trend }: StockCardHeaderProps) => {
  const arrowUpIcon = useAsset<string>('arrowUpIcon');
  const arrowDownIcon = useAsset<string>('arrowDownIcon');

  const trendIcon = useMemo(() => 
    trend ? (trend === 'UP' ? arrowUpIcon : arrowDownIcon) : null,
    [trend, arrowUpIcon, arrowDownIcon]
  );

  return (
    <div className={styles.header}>
      {trendIcon && (
        <img 
          src={trendIcon} 
          className={styles.trendIcon}
          alt={`Trend ${trend?.toLowerCase()}`}
          aria-hidden="true"
        />
      )}
      <span className={styles.symbol}>{id}</span>
    </div>
  );
});