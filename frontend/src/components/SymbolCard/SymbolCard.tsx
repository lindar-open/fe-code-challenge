import { memo, useCallback, useMemo } from 'react';
import './symbolCard.css';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { selectShowCardInfo, selectActiveSymbol, setActiveSymbol } from '@/store/dashboardOptionsSlice';
import SymbolCardHeader from './SymbolCardHeader';
import SymbolCardPrice from './SymbolCardPrice';
import SymbolCardInfo from './SymbolCardInfo';
import { useFlashEffect } from '@/hooks/useFlashEffect';
import { useShakeEffect } from '@/hooks/useShakeEffect';

type SymbolCardProps = {
  id: string;
};

const SymbolCard = memo(({ id }: SymbolCardProps) => {
  const dispatch = useAppDispatch();
  const { trend, companyName, industry, marketCap } = useAppSelector(
    (state) => state.stocks.entities[id]
  );
  const price = useAppSelector((state) => state.prices[id]);
  const activeSymbol = useAppSelector(selectActiveSymbol);
  const showCardInfo = useAppSelector(selectShowCardInfo);
  
  const handleOnClick = useCallback(() => {
    dispatch(setActiveSymbol(id === activeSymbol ? null : id));
  }, [dispatch, id, activeSymbol]);

  const { flashClass } = useFlashEffect(price);
  const { shakeClass } = useShakeEffect(price);

  const isActive = id === activeSymbol;
  const isInactive = !!activeSymbol && id !== activeSymbol;

  const cardClass = useMemo(() => [
    'symbolCard',
    flashClass,
    shakeClass,
    isActive ? 'symbolCard--active' : '',
    isInactive ? 'symbolCard--inactive' : ''
  ]
    .filter(Boolean)
    .join(' '), [flashClass, shakeClass, isActive, isInactive]);

  return (
    <div onClick={handleOnClick} className={cardClass}>
      <SymbolCardHeader symbol={id} trend={trend} />
      <SymbolCardPrice price={price} />
      {showCardInfo && (
        <SymbolCardInfo companyName={companyName} industry={industry} marketCap={marketCap} />
      )}
    </div>
  );
});
export default SymbolCard;
