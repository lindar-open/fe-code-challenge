import { useEffect, useState, useCallback } from 'react';
import type { PricesState } from '@/lib/types/stockTypes';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';

export interface UseStockDataReturn {
  stockSymbols: string[];
  prices: PricesState;
  isLoading: boolean;
  isRefreshing: boolean;
  error: Error | null;
  refreshData: () => Promise<void>;
}

export const useStockData = (): UseStockDataReturn => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const prices = useAppSelector(
    (state) => state.prices,
  );

  const loadStocks = useCallback(
    async (isRefresh = false) => {
      try {
        if (!isRefresh) {
          setIsLoading(true);
        }
        setError(null);
        await dispatch(fetchAllStocks()).unwrap();
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch stocks'));
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [dispatch]
  );

  const refreshData = useCallback(async () => {
    setIsRefreshing(true);
    await loadStocks(true);
  }, [loadStocks]);

  useEffect(() => {
    loadStocks();
  }, [loadStocks]);

  return {
    stockSymbols,
    prices,
    isLoading,
    isRefreshing,
    error,
    refreshData
  };
};
