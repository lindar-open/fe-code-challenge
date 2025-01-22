
import { memo } from 'react';
import './priceChartSection.css';

import { PriceChart } from '@/components/PriceChart';

export type SymbolId = string | null;

export interface PriceChartSectionProps {
  symbolId: SymbolId;
}

export const PriceChartSection = memo(({ symbolId }: PriceChartSectionProps) => (
  <div className="symbolsView__price-chart">
    <div className="symbolsView__chart">
      <h3>PRICE HISTORY</h3>
    </div>
    <PriceChart symbolId={symbolId} />
  </div>
));