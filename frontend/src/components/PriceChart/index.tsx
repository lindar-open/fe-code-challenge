import { useEffect, useMemo, memo } from 'react';
import './priceChart.css';

import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, Tooltip as ReChartsTooltip } from 'recharts';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchPriceHistory, selectors } from '@/store/priceHistorySlice';
import { Loading } from '@/components/Loading';
import { Tooltip } from '@/components/Tooltip';
import { formatTime } from '@/utils/date';

interface PriceChartProps {
  symbolId: string | null;
}
const CustomTooltip = memo(({ active, payload, label }: any) => {
  const value = payload && payload.length && payload[0] && payload[0].value ? `${Number(payload[0].value).toFixed(2)}` : '';
  return <Tooltip active={active} label={label} value={value}  />;
});

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

  const chartData = useMemo(() => {
    return rawData.map((item) => ({
      time: formatTime(item.time),
      price: item.price
    }));
  }, [rawData]);

  if (apiState.loading && currentSymbol !== null) {
    return (
      <div className="priceChart">
        <Loading />
      </div>
    );
  }

  if (apiState.error) {
    return (
      <div className="priceChart priceChart--error">
        Failed to get price history
      </div>
    );
  }

  if (!currentSymbol) {
    return (
      <div className="priceChart priceChart--empty">
        Select stock to view price history
      </div>
    );
  }

  return (
    <div className="priceChart">
      {symbolInfo && (
        <div className="priceChart__info">{symbolInfo}</div>
      )}
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
          <ReChartsTooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});