import { memo, useMemo } from 'react';
import styles from './PerformanceCard.module.css';
import { formatCurrency } from '@/utils/currencyFormatter';
import { PerformanceInfo, TrendLabel } from './_components';

interface PerformanceCardProps {
  title: string;
  volume: number;
  change: number;
}

export const PerformanceCard = memo(({ title, volume, change }: PerformanceCardProps) => {
  const formattedVolume = useMemo(() => 
    formatCurrency(volume)
  , [volume]);

  return (
    <div className={styles.root}>
      <PerformanceInfo label={title} change={change} />
      <TrendLabel change={change} volume={formattedVolume} />
    </div>
  );
});

PerformanceCard.displayName = 'PerformanceCard';