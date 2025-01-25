import { useMemo, memo } from 'react';
import { Tooltip } from '@/components/Tooltip';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

export const ChartToolTip = memo(({ active, payload, label }: CustomTooltipProps) => {
  const value = useMemo(() => {
    if (!active || !payload?.length || !payload[0]?.value) return '';
    return Number(payload[0].value).toFixed(2);
  }, [active, payload]);

  return (
    <Tooltip 
      active={Boolean(active)} 
      label={label} 
      value={value} 
    />
  );
});

ChartToolTip.displayName = 'ChartToolTip';