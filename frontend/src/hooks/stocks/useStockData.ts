import { useEffect, useState, useCallback, useRef } from 'react';
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
  const abortControllerRef = useRef<AbortController | null>(null);

  const stockSymbols = useAppSelector(
    selectors.selectStockIds,
    (prev, next) => prev.length === next.length && prev.every((id, i) => id === next[i])
  );

  const prices = useAppSelector(
    (state) => state.prices,
    (prev, next) => {
      if (Object.keys(prev).length !== Object.keys(next).length) return false;
      return Object.keys(prev).every((key) => prev[key] === next[key]);
    }
  );

  const loadStocks = useCallback(
    async (isRefresh = false) => {
      try {
        if (!isRefresh) {
          setIsLoading(true);
        }
        setError(null);

        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        await dispatch(fetchAllStocks()).unwrap();
      } catch (err) {
        if (err instanceof Error) {
          setError(err.name === 'AbortError' ? null : err);
        } else {
          setError(new Error('Failed to fetch stocks'));
        }
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
        abortControllerRef.current = null;
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

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
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
