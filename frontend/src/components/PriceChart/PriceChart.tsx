import Loading from '@/components/Loading';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { selectActiveSymbol } from '@/store/dashboardOptionsSlice';
import { fetchPriceHistory, selectors } from '@/store/priceHistorySlice';
import { lazy, Suspense, useEffect, useRef } from 'react';
import './priceChart.css';

const ChartLazy = lazy(() => import('./Chart'));

const PriceChart = () => {
  const dispatch = useAppDispatch();
  const activeSymbol = useAppSelector(selectActiveSymbol);
  const apiState = useAppSelector(selectors.apiState);
  const lastRequest = useRef<{ abort: () => void }>(); // very simplified typing
  const data = useAppSelector(selectors.selectPriceHistory);
  const symbolInfo = useAppSelector(selectors.selectSymbolInfo);

  useEffect(() => {
    if (!activeSymbol) {
      return;
    }

    if (apiState.loading) {
      lastRequest.current?.abort();
    }

    lastRequest.current = dispatch(fetchPriceHistory(activeSymbol));
  }, [dispatch, activeSymbol]);

  if (apiState.loading && activeSymbol !== null) {
    return (
      <div className="priceChart">
        <Loading />
      </div>
    );
  }

  if (apiState.error) return <div className="priceChart">Failed to get price history!</div>;

  if (!activeSymbol) return <div className="priceChart">Select stock</div>;

  return (
    <div className="priceChart">
      <Suspense fallback={<Loading />}>
        <ChartLazy data={data} symbolInfo={symbolInfo} />
      </Suspense>
    </div>
  );
};

export default PriceChart;
