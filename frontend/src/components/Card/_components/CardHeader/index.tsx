import { memo, type ReactNode } from 'react';
import classNames from 'classnames';
import styles from './CardHeader.module.css';

export interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export const CardHeader = memo(({ children, className }: CardHeaderProps) => (
  <div className={classNames(styles.header, className)}>
    {children}
  </div>
));

CardHeader.displayName = 'CardHeader';