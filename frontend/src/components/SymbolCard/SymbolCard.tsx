import './symbolCard.css';
import { useAppSelector } from '@/hooks/redux';
import { selectShowCardInfo } from '@/store/dashboardOptionsSlice';
import SymbolCardHeader from './SymbolCardHeader';
import SymbolCardPrice from './SymbolCardPrice';
import SymbolCardInfo from './SymbolCardInfo';
import { useFlashEffect } from '@/hooks/useFlashEffect';
import { useShakeEffect } from '@/hooks/useShakeEffect';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
  isActive: boolean;
  isInactive: boolean;
};

const SymbolCard = ({ id, onClick, price, isActive, isInactive }: SymbolCardProps) => {
  const { trend, companyName, industry, marketCap } = useAppSelector((state) => state.stocks.entities[id]);
  const showCardInfo = useAppSelector(selectShowCardInfo);
  const handleOnClick = () => {
    onClick(id);
  };

  const flashClass = useFlashEffect(price);
  const { shakeClass } = useShakeEffect(price);

  const cardClass = [
    'symbolCard',
    flashClass,
    shakeClass,
    isActive ? 'symbolCard--active' : '',
    isInactive ? 'symbolCard--inactive' : ''
  ].filter(Boolean).join(' ');

  return (
    <div onClick={handleOnClick} className={cardClass}>
      <SymbolCardHeader symbol={id} trend={trend} />
      <SymbolCardPrice price={price} />
      {showCardInfo && (
        <SymbolCardInfo companyName={companyName} industry={industry} marketCap={marketCap} />
      )}
    </div>
  );
};
export default SymbolCard;
