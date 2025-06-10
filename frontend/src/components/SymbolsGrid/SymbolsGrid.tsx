import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';
import { selectActiveSymbol } from '@/store/dashboardOptionsSlice';
type SymbolsGridProps = {
  onSymbolClick: (symbolId: string) => void;
};

const SymbolsGrid = ({ onSymbolClick }: SymbolsGridProps) => {
  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const prices = useAppSelector((state) => state.prices);
  const activeSymbol = useAppSelector(selectActiveSymbol);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllStocks());
  }, [dispatch]);

  return (
    <div>
      {stockSymbols.map((id, i) => (
        <SymbolCard
          price={prices[id]}
          onClick={onSymbolClick}
          key={i}
          id={id}
          isActive={id === activeSymbol}
        />
      ))}
    </div>
  );
};

export default SymbolsGrid;
