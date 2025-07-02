import { useEffect, useMemo, memo } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';

const SymbolsGrid = memo(() => {
  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchAllStocks());
  }, [dispatch]);

  const symbolCards = useMemo(() => {
    return stockSymbols.map((id) => (
      <SymbolCard
        key={id}
        id={id}
      />
    ));
  }, [stockSymbols]);

  return (
    <div className="symbolCardGrid">
      {symbolCards}
    </div>
  );
});

export default SymbolsGrid;
