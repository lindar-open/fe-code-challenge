import { memo } from 'react';
import type { CardHeaderProps } from '@/components/Card/types';

export const CardHeader = memo(({ children }: CardHeaderProps) => (
  <div className="card__header">
    {children}
  </div>
));
