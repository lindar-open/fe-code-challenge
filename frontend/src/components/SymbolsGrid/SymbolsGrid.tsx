import './symbosGrid.css';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';

import { fetchAllStocks, selectors } from '@/store/stocksSlice';

import Card from '../Card';

type SymbolsGridProps = {
  onSymbolClick: (symbolId: string) => void;
  symbolId: string | null;
};

const SymbolsGrid = React.memo(({ onSymbolClick, symbolId }: SymbolsGridProps) => {
  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const prices = useAppSelector((state) => state.prices);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllStocks());
  }, [dispatch]);

  const hasSelected = Boolean(symbolId);

  return (
    <div className={`symbolsView__cards ${hasSelected ? 'cards__active' : ''}`}>
      {/* remove (i = index) and add id as the key more predictable and will not run in unexpected behaviours */}
      {stockSymbols.map((id) => (
        <Card price={prices[id]} onClick={onSymbolClick} key={id} id={id} symbolId={symbolId} />
      ))}
    </div>
  );
});

export default SymbolsGrid;
