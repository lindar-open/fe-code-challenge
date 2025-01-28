import { memo } from 'react';
import styles from '@/components/ErrorBoundary/ErrorBoundary.module.css'

export const AppErrorFallback = memo(() => (
  <div className={styles.root}>
    <h2 className={styles.title}>Something went wrong with the application</h2>
    <p className={styles.message}>Please try refreshing the page</p>
    <button 
      onClick={() => window.location.reload()}
      className={styles.button}
    >
      Reload
    </button>
  </div>
));

AppErrorFallback.displayName = 'AppErrorFallback';