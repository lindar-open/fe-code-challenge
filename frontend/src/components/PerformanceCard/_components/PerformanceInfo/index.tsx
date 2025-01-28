import { memo, useMemo } from 'react';
import classNames from 'classnames';
import styles from './PerformanceInfo.module.css';
import formatSymbolChange from '@/utils/formatSymbolChange';

interface PerformanceInfoProps {
  label: string;
  change: number;
}

export const PerformanceInfo = memo(({ label, change }: PerformanceInfoProps) => {
  const valueClasses = useMemo(() => 
    classNames(styles.value, {
      [styles.valueUp]: change > 1,
      [styles.valueDown]: change <= 1
    })
  , [change]);

  return (
    <div className={styles.root}>
      <div className={styles.label}>{label}</div>
      <div className={valueClasses}>
        {formatSymbolChange(change, 2)}
      </div>
    </div>
  );
});

PerformanceInfo.displayName = 'PerformanceInfo';