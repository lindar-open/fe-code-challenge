import { memo, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './ListItem.module.css';

type JustifyContent =
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline';

interface ListItemProps {
  Icon: ReactNode;
  label: string;
  spacing?: JustifyContent;
  className?: string;
  onClick?: () => void;
}

export const ListItem = memo(({ 
  Icon, 
  label, 
  spacing = 'flex-start',
  className,
  onClick 
}: ListItemProps) => {
  return (
    <div 
      className={classNames(styles.root, className)}
      style={{ justifyContent: spacing }}
      onClick={onClick}
      role="listitem"
    >
      <div className={styles.icon}>
        {Icon}
      </div>
      <div className={styles.value} title={label}>
        {label}
      </div>
    </div>
  );
});

ListItem.displayName = 'ListItem';