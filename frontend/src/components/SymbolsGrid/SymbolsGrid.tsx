import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';
import './symbolGrid.css';
import { selectShowCardInfo } from '@/store/dashboardOptionsSlice';
type SymbolsGridProps = {
  onSymbolClick: (symbolId: string) => void;
  symbolId: string | null;
};

const SymbolsGrid = ({ onSymbolClick, symbolId }: SymbolsGridProps) => {
  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const prices = useAppSelector((state) => state.prices);
  const showCardInfo = useAppSelector(selectShowCardInfo);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllStocks());
  }, [dispatch]);

  return (
    <div className="symbolsGrid__cards">
      {stockSymbols.map((id, i) => (
        <SymbolCard
          price={prices[id]}
          onClick={onSymbolClick}
          key={i}
          id={id}
          showCardInfo={showCardInfo}
          selectedSym={symbolId}
        />
      ))}
    </div>
  );
};

export default SymbolsGrid;
