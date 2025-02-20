import { HistoryEntry } from '@/store/priceHistorySlice';
import { memo } from 'react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import './priceChart.css';

type PriceChartProps = {
  data: HistoryEntry[];
  symbolInfo: string | null;
};

const PriceChart = ({ data, symbolInfo }: PriceChartProps) => {
  return (
    <>
      <div>{symbolInfo}</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data.map((e) => ({ ...e, time: new Date(e.time).toLocaleTimeString() }))}>
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
          <XAxis dataKey="time" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default memo(PriceChart);
