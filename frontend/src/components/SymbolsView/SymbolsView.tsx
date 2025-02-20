import './symbolsView.css';
import SymbolsGrid from '@/components/SymbolsGrid';
import PriceChart from '@/components/PriceChart';
import DesktopInfo from './src/DesktopInfo';
import { memo } from 'react';

const SymbolsView = () => {
  return (
    <>
      <DesktopInfo />
      <div className="symbolsView">
        <aside>
          <h3>PRICE HISTORY</h3>
          <PriceChart />
        </aside>
        <div className="symbolsView__content">
          <SymbolsGrid />
        </div>
      </div>
    </>
  );
};

export default memo(SymbolsView);
