import SymbolsGrid from '@/components/SymbolsGrid';
import PriceChart from '@/components/PriceChart';
import DesktopInfo from './src/DesktopInfo';
import { useState } from 'react';

import './symbolsView.css';

const SymbolsView = () => {
  const savedSymbol = localStorage.getItem('activeSymbol');

  const [activeSymbol, setActiveSymbol] = useState<null | string>(savedSymbol || null);

  const handleSymbolClick = (symbolId: string) => {
    setActiveSymbol((s) => {
      const newActiveSymbol = s === symbolId ? null : symbolId;
      localStorage.setItem('activeSymbol', newActiveSymbol || '');

      return newActiveSymbol;
    });
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
          <SymbolsGrid onSymbolClick={handleSymbolClick} activeSymbol={activeSymbol} />
        </div>
      </div>
    </div>
  );
};

export default SymbolsView;
