import { memo } from 'react';
import { ListItem } from '@/components/ListItem';
import { useAsset } from '@/hooks/assets/useAsset';

type TrendLabelProps = {
  volume: string;
  change: number;
};

export const TrendLabel = memo(({ volume, change }: TrendLabelProps) => {
  const UpArrow = useAsset('UpArrow');
  const DownArrow = useAsset('DownArrow');

  const arrow = change > 1 ? <UpArrow /> : <DownArrow />;

  return <ListItem Icon={arrow} label={volume.toString()} />;
});
