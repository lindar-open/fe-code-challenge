import { ListItem } from '@/components/ListItem';
import type { Bias } from '@/lib/types';

import { PerformanceEmoji } from '@/components/TopHeadlines/_components';

type TopHeadlineProps = {
  bias: Bias;
  headline: string;
};

const TopHeadline = ({ bias, headline }: TopHeadlineProps) => {
  return <ListItem Icon={<PerformanceEmoji bias={bias} />} label={headline} />;
};

export default TopHeadline;
