import { memo } from 'react';
import './card.css';

import type { CardProps } from './types';

export const Card = memo(({ className = '', onClick, children }: CardProps) => (
  <div className={`card ${className}`} onClick={onClick}>
    {children}
  </div>
));

export { CardHeader } from './_components/CardHeader';
export { CardContent } from './_components/CardContent';