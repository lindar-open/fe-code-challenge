import ListItem from '@/components/ListItem';
import PerformanceEmoji from '@/components/TopHeadlines/src/PerformanceEmoji';
import { stockTypes } from '@/lib/types';
import { memo } from 'react';

type TopHeadlineProps = {
  bias: stockTypes.Bias;
  headline: string;
};

const TopHeadline = ({ bias, headline }: TopHeadlineProps) => {
  return <ListItem Icon={<PerformanceEmoji bias={bias} />} label={headline} />;
};

export default memo(TopHeadline);
