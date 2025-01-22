import { memo } from 'react';
import './headerInfo.css';

import { HighlightedSymbols } from '@/components/HighlightedSymbols';
import { TopHeadlines } from '@/components/TopHeadlines';

export const HeaderInfo = memo(() => {
  return (
    <div className="headerInfo">
      <HighlightedSymbols />
      <TopHeadlines />
    </div>
  );
});
