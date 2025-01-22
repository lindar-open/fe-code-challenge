import { memo } from 'react';
import './stockCardHeader.css';

import type { TrendType } from '@/lib/types';
import { useAsset } from '@/hooks/assets/useAsset';

interface StockCardHeaderProps {
  id: string;
  trend: TrendType;
}

export const StockCardHeader = memo(({ id, trend }: StockCardHeaderProps) => {
  const arrowUpIcon = useAsset<string>('arrowUpIcon');
  const arrowDownIcon = useAsset<string>('arrowDownIcon');

  return (
    <div className="stockCard__header">
      {trend ? (
        <img 
          src={trend === 'UP' ? arrowUpIcon : arrowDownIcon} 
          className="stockCard__trend-icon" 
          alt={`Trend ${trend.toLowerCase()}`}
        />
      ) : null}
      <span className="stockCard__id">{id}</span>
    </div>
)});