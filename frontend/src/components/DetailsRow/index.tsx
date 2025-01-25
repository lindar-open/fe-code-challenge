import { memo } from 'react';
import styles from './DetailsRow.module.css';

interface DetailRowProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
}

export const DetailRow = memo(({ Icon, label }: DetailRowProps) => (
  <div className={styles.row}>
    <div className={styles.icon}>
      <Icon />
    </div>
    <span className={styles.label}>{label}</span>
  </div>
));
