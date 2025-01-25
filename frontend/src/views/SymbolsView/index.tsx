import { useState, useCallback, memo } from 'react';
import styles from './SymbolsView.module.css';
import { useAppDispatch } from '@/hooks/redux';
import { setActiveSymbol } from '@/store/dashboardOptionsSlice';
import { HeaderInfo, PriceChartSection, SymbolsGridSection } from './_components';
import type { AssetKey } from '@/utils/assetPreloader';

export const requiredAssets: AssetKey[] = [
  'CompanyIcon', 
  'IndustryIcon', 
  'UpArrow', 
  'DownArrow', 
  'MarketCapIcon', 
  'HappyFace', 
  'NeutralFace', 
  'SadFace', 
  'arrowDownIcon', 
  'arrowUpIcon'
];

const SymbolsView = () => {
  const dispatch = useAppDispatch();
  const [activeSymbol, setActiveSymbolState] = useState<string | null>(null);

  const handleSymbolClick = useCallback((symbolId: string) => {
    setActiveSymbolState((prevSymbol) => 
      prevSymbol === symbolId ? null : symbolId
    );
    dispatch(setActiveSymbol(symbolId));
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <HeaderInfo />
      <div className={styles.content}>
        <PriceChartSection symbolId={activeSymbol} />
        <SymbolsGridSection onSymbolClick={handleSymbolClick} />
      </div>
    </div>
  );
};

SymbolsView.displayName = 'SymbolsView';

export default memo(SymbolsView);