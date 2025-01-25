import { memo } from 'react';
import styles from './TopHeadlines.module.css';
import type { Bias } from '@/lib/types';
import { TopHeadline } from './_components';

interface HeadlineData {
  bias: Bias;
  headline: string;
}

const data: HeadlineData[] = [
  {
    bias: 'POSITIVE',
    headline: 'RegionX: to the moon and beyond!'
  },
  {
    bias: 'NEGATIVE',
    headline: 'Investors are worried about Potato Inc?'
  },
  {
    bias: 'NEUTRAL',
    headline: 'The Tangerine: We are not sure what is going on...'
  },
  {
    bias: 'POSITIVE',
    headline: 'WoodAxe: self driving is the future!'
  }
];

export const TopHeadlines = memo(() => (
  <div className={styles.root}>
    <div className={styles.content}>
      {data.map(({ headline, bias }) => (
        <TopHeadline
          key={headline}
          bias={bias}
          headline={headline}
        />
      ))}
    </div>
  </div>
));

TopHeadlines.displayName = 'TopHeadlines';