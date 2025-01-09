import './symbolCard.css';
import { useAppSelector } from '@/hooks/redux';
import { memo, useEffect, useRef } from 'react';
import { selectShowCardInfo } from '@/store/dashboardOptionsSlice';
import useAddBoxShadow from '@/hooks/useAddBoxShadow';
import useAddEffect from '@/hooks/useAddEffect';
import SymbolCardBody from '@/components/SymbolCard/src/SymbolCardBody';
import SymbolCardHeader from '@/components/SymbolCard/src/SymbolCardHeader';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
  activeSymbol: string | null;
};

const SymbolCard = memo(({ id, onClick, price, activeSymbol }: SymbolCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const priceRef = useRef(price);
  const { shadow, addShadow, setShadow } = useAddBoxShadow();
  const { effect, addEffect, setEffect } = useAddEffect();
  const { trend, companyName, industry, marketCap } = useAppSelector(
    (state) => state.stocks.entities[id]
  );
  const showCardInfo = useAppSelector(selectShowCardInfo);

  const handleOnClick = () => {
    onClick(id);
  };

  useEffect(() => {
    addShadow(price, priceRef.current);
  }, [price]);

  useEffect(() => {
    addEffect(price, priceRef.current);
    priceRef.current = price;
  }, [activeSymbol, price]);

  const getClassName = () => {
    let className = 'symbolCard';

    if (activeSymbol) {
      if (activeSymbol === id) {
        className = className + ` symbolCard--active`;
      } else className = className + ` symbolCard--nonactive`;
    }

    if (effect) className = className + ` symbolCard--${effect}`;
    if (shadow) className = className + ` symbolCard--${shadow}`;

    return className;
  };

  const onAnimationEnd = () => {
    if (ref.current) {
      setShadow('');
      setEffect('');
    }
  };

  return (
    <div
      ref={ref}
      data-price={price}
      onClick={handleOnClick}
      className={getClassName()}
      onAnimationEnd={onAnimationEnd}
    >
      <SymbolCardHeader id={id} trend={trend} />
      <SymbolCardBody
        companyName={companyName}
        price={price}
        industry={industry}
        marketCap={marketCap}
        showCardInfo={showCardInfo}
      />
    </div>
  );
});

export default SymbolCard;

SymbolCard.displayName = 'SymbolCard';
