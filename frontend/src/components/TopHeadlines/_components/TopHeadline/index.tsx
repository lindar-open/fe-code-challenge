import { memo } from 'react';
import { PerformanceEmoji } from '@/components/TopHeadlines/_components';
import type { Bias } from '@/lib/types';
import styles from './TopHeadlines.module.css';

interface TopHeadlineProps {
  bias: Bias;
  headline: string;
}

export const TopHeadline = memo(({ bias, headline }: TopHeadlineProps) => (
  <div className={styles.root}>
    <PerformanceEmoji bias={bias} />
    <span className={styles.text}>{headline}</span>
  </div>
));

TopHeadline.displayName = 'TopHeadline';