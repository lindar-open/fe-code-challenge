import { memo, useMemo } from 'react';
import classNames from 'classnames';
import styles from './PriceDisplay.module.css';
import { formatCurrency } from '@/utils/currencyFormatter';

interface PriceDisplayProps {
  price: number;
  isAnimating?: boolean;
}

export const PriceDisplay = memo(({ price, isAnimating = false }: PriceDisplayProps) => {
  const formattedPrice = useMemo(() => 
    formatCurrency(price), [price]
  );

  return (
    <div className={styles.root}>
      <span className={styles.label}>PRICE:</span>
      <span 
        className={classNames(styles.value, {
          [styles.animated]: isAnimating
        })}
        aria-live="polite"
        aria-atomic="true"
      >
        {formattedPrice}
      </span>
    </div>
  );
});