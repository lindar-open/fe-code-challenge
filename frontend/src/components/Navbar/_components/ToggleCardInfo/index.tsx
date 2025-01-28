import { memo } from 'react';
import { toggleShowCardInfo, selectShowCardInfo } from '@/store/dashboardOptionsSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import styles from './ToggleCardInfo.module.css';

export const ToggleCardInfo = memo(() => {
  const dispatch = useAppDispatch();
  const showCardInfo = useAppSelector(selectShowCardInfo);

  const handleChange = () => {
    dispatch(toggleShowCardInfo());
  };

  return (
    <label className={styles.root}>
      +Info
      <input 
        type="checkbox"
        className={styles.checkbox}
        checked={showCardInfo}
        onChange={handleChange}
      />
    </label>
  );
});

ToggleCardInfo.displayName = 'ToggleCardInfo';