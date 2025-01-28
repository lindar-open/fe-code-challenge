import { useEffect, useMemo, memo, useCallback } from 'react';
import styles from './PriceChart.module.css';
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip as ReChartsTooltip
} from 'recharts';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchPriceHistory, selectors } from '@/store/priceHistorySlice';
import { Loading } from '@/components/Loading';
import { formatTime } from '@/utils/date';
import { ChartToolTip } from './_components';

interface PriceChartProps {
  symbolId: string | null;
}

export const PriceChart = memo(({ symbolId }: PriceChartProps) => {
  const dispatch = useAppDispatch();
  const { activeSymbol } = useAppSelector((state) => state.store);
  const currentSymbol = symbolId || activeSymbol;
  
  useEffect(() => {
    let abortController: AbortController | null = null;
    
    const fetchData = async () => {
      if (currentSymbol) {
        abortController = new AbortController();
        const priceChartHistory = dispatch(fetchPriceHistory(currentSymbol));
        return () => priceChartHistory.abort();
      }
    };

    fetchData();
    
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [dispatch, currentSymbol]);

  const apiState = useAppSelector(selectors.apiState);
  const rawData = useAppSelector(selectors.selectPriceHistory);
  const symbolInfo = useAppSelector(selectors.selectSymbolInfo);

  const chartData = useMemo(() => 
    rawData.map((item) => ({
      time: formatTime(item.time),
      price: item.price
    }))
  , [rawData]);

  const renderChart = useCallback(() => (
    <ResponsiveContainer width="98%" height="100%">
      <LineChart data={chartData}>
        <Line 
          type="monotone" 
          dataKey="price" 
          stroke="#8884d8" 
          dot={false}
          strokeWidth={2}
          isAnimationActive={false}
        />
        <XAxis 
          dataKey="time"
          tick={{ fontSize: 12 }}
          padding={{ left: 10, right: 10 }}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          width={60}
          padding={{ top: 20, bottom: 20 }}
        />
        <ReChartsTooltip content={<ChartToolTip />} />
      </LineChart>
    </ResponsiveContainer>
  ), [chartData]);

  if (apiState.loading && currentSymbol !== null) {
    return (
      <div className={styles.root}>
        <Loading />
      </div>
    );
  }

  if (apiState.error) {
    return (
      <div className={styles.root}>
        <div className={styles.error}>
          Failed to get price history
        </div>
      </div>
    );
  }

  if (!currentSymbol) {
    return (
      <div className={styles.root}>
        <div className={styles.message}>
          Select stock to view price history
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {symbolInfo && (
        <div className={styles.info}>{symbolInfo}</div>
      )}
      <div className={styles.chartWrapper}>
        {renderChart()}
      </div>
    </div>
  );
});

PriceChart.displayName = 'PriceChart';