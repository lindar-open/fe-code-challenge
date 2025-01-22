import { memo } from 'react';
import './performanceInfo.css';
import formatSymbolChange from '@/utils/formatSymbolChange';

type PerformanceCardProps = {
  label: string;
  change: number;
};

export const PerformanceInfo = memo(({ label, change }: PerformanceCardProps) => {
  return (
    <div className="performanceInfo">
      <div className="performanceInfo__label">{label}</div>
      <div
        className={`performanceInfo__value ${
          change > 1 ? 'performanceInfo__value--up' : 'performanceInfo__value--down'
        }`}
      >
        {formatSymbolChange(change, 2)}
      </div>
    </div>
  );
})
