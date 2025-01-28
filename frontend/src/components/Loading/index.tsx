import { memo } from 'react';
import styles from './Loading.module.css';

interface LoadingProps {
  'aria-label'?: string;
}

export const Loading = memo(({ 'aria-label': ariaLabel = 'Loading...' }: LoadingProps) => {
  return (
    <div 
      className={styles.root}
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
    >
      <div className={styles.pulse} />
    </div>
  );
});

Loading.displayName = 'Loading';