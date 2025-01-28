import { memo } from 'react';
import { Card, CardHeader, CardContent } from '@/components/Card';
import styles from './LoadingCard.module.css';

export const LoadingCard = memo(() => {
  return (
    <Card className={styles.root}>
      <div className={styles.shimmer} aria-hidden="true" />
      <CardHeader>
        <div className={styles.header} />
      </CardHeader>
      <CardContent>
        <div className={styles.content}>
          <div className={styles.line} />
          <div className={styles.line} />
          <div className={styles.line} />
        </div>
      </CardContent>
    </Card>
  );
});

LoadingCard.displayName = 'LoadingCard';