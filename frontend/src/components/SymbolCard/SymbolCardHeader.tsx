import React from 'react';
import SymbolCardTrendIcon from '@/components/SymbolCard/SymbolCardTrendIcon';

type SymbolCardHeaderProps = {
  symbol: string;
  trend: 'UP' | 'DOWN' | null;
};

const SymbolCardHeader = ({ symbol, trend }: SymbolCardHeaderProps) => (
  <div className="symbolCard__header">
    <span>{symbol}</span>
    <SymbolCardTrendIcon trend={trend} />
  </div>
);

export default React.memo(SymbolCardHeader);
