import React from 'react';
import trendUp from '@/assets/up.png';
import trendDown from '@/assets/down.png';

import './cardHeader.css';

type CardHeaderProps = { trend: 'UP' | 'DOWN' | null; id: string };

const CardHeader = React.memo(({ trend, id }: CardHeaderProps) => {
  return (
    <div className="card__trend">
      <div>{id}</div>
      {trend === 'UP' ? (
        <img src={trendUp} alt="Trend Up" className="card__icon" />
      ) : trend === 'DOWN' ? (
        <img src={trendDown} alt="Trend Down" className="card__icon" />
      ) : null}
    </div>
  );
});

export default CardHeader;
