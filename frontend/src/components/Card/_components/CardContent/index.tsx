import { memo, type ReactNode } from 'react';
import classNames from 'classnames';
import styles from './CardContent.module.css';

export interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent = memo(({ children, className }: CardContentProps) => (
  <div className={classNames(styles.content, className)}>
    {children}
  </div>
));

CardContent.displayName = 'CardContent';