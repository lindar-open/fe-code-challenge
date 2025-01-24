import SymbolsGrid from '@/components/SymbolsGrid';
import PriceChart from '@/components/PriceChart';
import DesktopInfo from './src/DesktopInfo';
import { useState } from 'react';
import './symbolView.css';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { selectActiveSymbol, updateActiveSymbol } from '@/store/dashboardOptionsSlice';

const SymbolsView = () => {
  const dispatch = useAppDispatch();
  const activeSymbol = useAppSelector(selectActiveSymbol);
  const handleSymbolClick = (symbolId: string) => {
    dispatch(updateActiveSymbol({ activeSymbol: symbolId }));
  };

  return (
    <div className="symbolsView">
      <DesktopInfo />

      <div className="symbolsView__content">
        <div className="symbolsView__chart">
          <h3>PRICE HISTORY</h3>
          <PriceChart symbolId={activeSymbol} />
        </div>
        <div className="symbolsView__cards">
          <SymbolsGrid onSymbolClick={handleSymbolClick} symbolId={activeSymbol} />
        </div>
      </div>
    </div>
  );
};

export default SymbolsView;
