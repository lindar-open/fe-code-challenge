import './symbolsView.css';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setActiveSymbol, selectActiveSymbol } from '@/store/dashboardOptionsSlice';

import SymbolsGrid from '@/components/SymbolsGrid';
import PriceChart from '@/components/PriceChart';
import DesktopInfo from './src/DesktopInfo';
import { useCallback } from 'react';

const SymbolsView = () => {
  console.log('SymbolsView rendered');
  const dispatch = useAppDispatch();
  const activeSymbol = useAppSelector(selectActiveSymbol);

  const handleSymbolClick = useCallback(
    (symbolId: string) => {
      dispatch(setActiveSymbol(activeSymbol === symbolId ? null : symbolId));
    },
    [activeSymbol, dispatch]
  );

  return (
    <div className="symbolsView">
      <DesktopInfo />
      <div className="symbolsView__content">
        <div className="symbolsView__chart">
          <h3>PRICE HISTORY</h3>
          <PriceChart symbolId={activeSymbol} />
        </div>

        <SymbolsGrid onSymbolClick={handleSymbolClick} symbolId={activeSymbol} />
      </div>
    </div>
  );
};

export default SymbolsView;
