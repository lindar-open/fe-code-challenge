import SymbolsGrid from '@/components/SymbolsGrid';
import PriceChart from '@/components/PriceChart';
import DesktopInfo from './src/DesktopInfo';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setActiveSymbol, selectActiveSymbol } from '@/store/dashboardOptionsSlice';
import './symbolsView.css';

const SymbolsView = () => {
  const dispatch = useAppDispatch();
  const activeSymbol = useAppSelector(selectActiveSymbol);
  const handleSymbolClick = (symbolId: string) => {
    dispatch(setActiveSymbol(symbolId === activeSymbol ? null : symbolId));
  };

  return (
      <div className="symbolsView">
        <DesktopInfo />
        <div className="symbolsView__content">
          <div className="symbolsView__cards symbolCardGrid">
            <SymbolsGrid onSymbolClick={handleSymbolClick} />
          </div>
          <div className="symbolsView__chart">
            <h3>PRICE HISTORY</h3>
            <PriceChart symbolId={activeSymbol} />
          </div>
        </div>
      </div>
  );
};

export default SymbolsView;
