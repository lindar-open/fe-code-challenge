import { memo } from 'react';
import './performanceInfo.css';
import { ReactComponent as UpArrow } from '@/assets/up-arrow.svg';
import { ReactComponent as DownArrow } from '@/assets/down-arrow.svg';
import ListItem from '@/components/ListItem';
import { formatCurrencyUsd } from '@/utils/formatCurrencyUsd';

type TrendLabelProps = {
  volume: number;
  change: number;
};

const VolumeLabel = ({ volume, change }: TrendLabelProps) => {
  const formattedVolume = formatCurrencyUsd(volume);
  const arrow = change > 1 ? <UpArrow /> : <DownArrow />;
  return <ListItem Icon={arrow} label={formattedVolume} />;
};
export default memo(VolumeLabel);
