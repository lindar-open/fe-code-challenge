import { memo } from 'react';
import './performanceCard.css';
import {
  PerformanceInfo,
  TrendLabel
} from './_components';
import { formatCurrency } from '@/utils/currencyFormatter';

type PerformanceCardProps = {
  title: string;
  volume: number;
  change: number;
};

export const PerformanceCard = memo(({ title, volume, change }: PerformanceCardProps) => {
  const formattedVolume = formatCurrency(volume)
  return (
    <div className="performanceCard">
      <PerformanceInfo label={title} change={change} />
      <TrendLabel change={change} volume={formattedVolume} />
    </div>
  );
});