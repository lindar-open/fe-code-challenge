import { memo, useMemo } from 'react';
import styles from './TrendLabel.module.css';
import { useAsset } from '@/hooks/assets/useAsset';

interface TrendLabelProps {
  volume: string;
  change: number;
}

export const TrendLabel = memo(({ volume, change }: TrendLabelProps) => {
  const UpArrow = useAsset('UpArrow');
  const DownArrow = useAsset('DownArrow');

  const arrow = useMemo(() => 
    change > 1 ? <UpArrow /> : <DownArrow />
  , [change, UpArrow, DownArrow]);

  return (
    <div className={styles.root}>
      <div className={styles.icon}>{arrow}</div>
      <span className={styles.volume}>{volume}</span>
    </div>
  );
});

TrendLabel.displayName = 'TrendLabel';