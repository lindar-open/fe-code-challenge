import { memo, type ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Card.module.css';
export { CardHeader, CardContent, LoadingCard } from './_components';

export interface CardProps {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

export const Card = memo(({ className, onClick, children }: CardProps) => (
  <div 
    className={classNames(styles.root, className)}
    onClick={onClick}
    role="article"
  >
    {children}
  </div>
));

Card.displayName = 'Card';