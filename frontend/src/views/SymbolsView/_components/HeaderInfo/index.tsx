import { memo } from 'react';
import styles from '@/views/SymbolsView/SymbolsView.module.css';
import { HighlightedSymbols } from '@/components/HighlightedSymbols';
import { TopHeadlines } from '@/components/TopHeadlines';

export const HeaderInfo = memo(() => (
  <div className={styles.root}>
    <HighlightedSymbols />
    <TopHeadlines />
  </div>
));

HeaderInfo.displayName = 'HeaderInfo';