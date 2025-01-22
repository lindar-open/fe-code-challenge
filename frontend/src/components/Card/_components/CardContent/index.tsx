import { memo } from 'react';
import type { CardContentProps } from '@/components/Card/types';

export const CardContent = memo(({ children }: CardContentProps) => (
  <div className="card__content">
    {children}
  </div>
));