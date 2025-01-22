import { useState, useCallback } from 'react';
import './symbolsView.css';

import { useAppDispatch } from '@/hooks/redux';
import { setActiveSymbol as setActiveSymbolState } from '@/store/dashboardOptionsSlice';
import { SymbolId } from './_components/PriceChartSection';
import { SymbolsGridSection, HeaderInfo, PriceChartSection } from './_components';

import { AssetKey } from '@/utils/assetPreloader';

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
  const [activeSymbol, setActiveSymbol] = useState<SymbolId>(null);

  const handleSymbolClick = useCallback((symbolId: string) => {
    setActiveSymbol((prevSymbol) => prevSymbol === symbolId ? null : symbolId);
    dispatch(setActiveSymbolState(symbolId));
  }, [dispatch]);

  return (
    <div className="symbolsView">
      <HeaderInfo />
      
      <div className="symbolsView__content">
        <PriceChartSection symbolId={activeSymbol} />
        <SymbolsGridSection onSymbolClick={handleSymbolClick} />
      </div>
    </div>
  );
};

export default SymbolsView;