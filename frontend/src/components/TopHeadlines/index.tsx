import { memo } from 'react';
import styles from './TopHeadlines.module.css';
import type { Bias } from '@/lib/types';
import { TopHeadline } from './_components';

interface HeadlineData {
  bias: Bias;
  headline: string;
  id: string;
}

const headlinesData: HeadlineData[] = [
  {
    id: 'regionx',
    bias: 'POSITIVE',
    headline: 'RegionX: to the moon and beyond!'
  },
  {
    id: 'potato',
    bias: 'NEGATIVE',
    headline: 'Investors are worried about Potato Inc?'
  },
  {
    id: 'tangerine',
    bias: 'NEUTRAL',
    headline: 'The Tangerine: We are not sure what is going on...'
  },
  {
    id: 'woodaxe',
    bias: 'POSITIVE',
    headline: 'WoodAxe: self driving is the future!'
  }
] as const;

export const TopHeadlines = memo(() => (
  <div className={styles.root}>
    <div className={styles.content}>
      {headlinesData.map(({ headline, bias, id }) => (
        <TopHeadline
          key={id}
          bias={bias}
          headline={headline}
        />
      ))}
    </div>
  </div>
));

TopHeadlines.displayName = 'TopHeadlines';