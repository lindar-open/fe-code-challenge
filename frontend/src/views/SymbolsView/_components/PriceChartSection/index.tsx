import { memo } from 'react';
import styles from '@/views/SymbolsView/SymbolsView.module.css';
import { PriceChart } from '@/components/PriceChart';

interface PriceChartSectionProps {
  symbolId: string | null;
}

export const PriceChartSection = memo(({ symbolId }: PriceChartSectionProps) => (
  <div className={styles.priceChart}>
    <div className={styles.chart}>
      <h3 className={styles.chartTitle}>PRICE HISTORY</h3>
    </div>
    <PriceChart symbolId={symbolId} />
  </div>
));

PriceChartSection.displayName = 'PriceChartSection';