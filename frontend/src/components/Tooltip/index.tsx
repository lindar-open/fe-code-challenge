import { memo } from 'react';
import styles from './Tooltip.module.css';

interface TooltipProps {
  active: boolean;
  value?: string;
  label?: string;
}

export const Tooltip = memo(({ active, value, label }: TooltipProps) => {
  if (!active) return null;

  return (
    <div className={styles.root} role="tooltip">
      {label && <p className={styles.time}>{label}</p>}
      {value && <p className={styles.price}>{value}</p>}
    </div>
  );
});

Tooltip.displayName = 'Tooltip';