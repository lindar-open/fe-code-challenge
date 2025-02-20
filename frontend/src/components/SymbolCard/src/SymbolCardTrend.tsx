import { memo } from 'react';

import './symbolCardTrend.css';

type SymbolCardTrendProps = {
  src: string | null;
};

const SymbolCardTrend = ({ src }: SymbolCardTrendProps) => {
  if (!src) return null;

  return <img src={src} alt="trend" className="symbolCardTrend" />;
};
export default memo(SymbolCardTrend);
