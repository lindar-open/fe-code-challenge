import SymbolsGrid from '@/components/SymbolsGrid';
import PriceChart from '@/components/PriceChart';
import DesktopInfo from './src/DesktopInfo';
import { useAppSelector } from '@/hooks/redux';
import { selectActiveSymbol } from '@/store/dashboardOptionsSlice';
import './symbolsView.css';

const SymbolsView = () => {
  const activeSymbol = useAppSelector(selectActiveSymbol);

  return (
      <div className="symbolsView">
        <DesktopInfo />
        <div className="symbolsView__content">
          <div className="symbolsView__cards symbolCardGrid">
            <SymbolsGrid />
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
