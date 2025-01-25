import { memo, useMemo } from 'react';
import type { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Row.module.css';

type Spacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface RowProps {
  spacing?: Spacing;
  children: ReactNode;
  className?: string;
}

const spacingMap: Record<Spacing, string> = {
  xs: styles.spacingXs,
  sm: styles.spacingSm,
  md: styles.spacingMd,
  lg: styles.spacingLg,
  xl: styles.spacingXl
};

export const Row = memo(({ spacing = 'xs', className, children }: RowProps) => {
  const rowClasses = useMemo(() => 
    classNames(
      styles.root,
      spacingMap[spacing],
      className
    ),
    [spacing, className]
  );

  return (
    <div className={rowClasses}>
      {children}
    </div>
  );
});

Row.displayName = 'Row';