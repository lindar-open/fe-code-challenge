import { memo } from 'react';
import './tooltip.css';

export const Tooltip = memo(({ active, value, label }: any) => {
  if (active) {
    return (
      <div className="tooltip">
        <p className="tooltip-time">{label}</p>
        <p className="tooltip-price">
          {value}
        </p>
      </div>
    );
  }
  return null;
});
