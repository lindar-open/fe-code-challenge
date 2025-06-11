import React from 'react';
import upArrow from '@/assets/up.png';
import downArrow from '@/assets/down.png';

type SymbolCardTrendIconProps = {
  trend: 'UP' | 'DOWN' | null;
};

const SymbolCardTrendIcon = ({ trend }: SymbolCardTrendIconProps) => {
  if (trend === 'UP') {
    return (
      <span className="symbolCard__trendWrapper">
        <img src={upArrow} alt="up" className="symbolCard__trend" />
      </span>
    );
  }
  if (trend === 'DOWN') {
    return (
      <span className="symbolCard__trendWrapper">
        <img src={downArrow} alt="down" className="symbolCard__trend" />
      </span>
    );
  }
  return null;
};

export default React.memo(SymbolCardTrendIcon);
