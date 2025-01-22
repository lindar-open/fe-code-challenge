import React from 'react';
import './highlightedSymbols.css';

import type { TrendType } from '@/lib/types';
import {
  PerformanceCard,
} from '@/components/PerformanceCard';
import { Row } from '@/components/Row';

type HighlightedSymbol = {
  trend?: TrendType;
  symbolId: string;
  volume: number;
  change: number;
};

const data: HighlightedSymbol[] = [
  {
    symbolId: 'NVDA',
    volume: 323_463_212,
    change: 1.127
  },
  {
    symbolId: 'AAPL',
    volume: 221_673_743,
    change: 0.6534
  },
  {
    symbolId: 'TSLA',
    volume: 151_865_316,
    change: 0.99
  },
  {
    symbolId: 'AMZN',
    volume: 98_527_158,
    change: 0.9269
  },
  {
    symbolId: 'GOOGL',
    volume: 83_316_914,
    change: 1.1134
  },
  {
    symbolId: 'MSFT',
    volume: 73_735_142,
    change: 0.9932
  }
];

export const HighlightedSymbols = () => {
  return (
    <Row spacing="md" className="highlightedSymbols">
      {data.map((symbol, index) => {
        return (
          <PerformanceCard
            change={symbol.change}
            key={index}
            title={symbol.symbolId}
            volume={symbol.volume}
          />
        );
      })}
    </Row>
  );
};
