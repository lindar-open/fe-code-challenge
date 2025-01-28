import { memo } from 'react';
import globalErrorBoundaryStyles from '@/components/ErrorBoundary/ErrorBoundary.module.css'
import styles from './StockCardListFallback.module.css';

export const StockCardListFallback = memo(() => (
  <div className={styles.cardListError}>
    <h3 className={styles.cardListTitle}>Something went wrong with stock cards</h3>
    <button 
      onClick={() => window.location.reload()}
      className={globalErrorBoundaryStyles.retryButton}
    >
      Retry
    </button>
  </div>
));

StockCardListFallback.displayName = 'StockCardListFallback';