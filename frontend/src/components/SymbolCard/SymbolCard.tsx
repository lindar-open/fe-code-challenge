import './symbolCard.css';
import { useAppSelector } from '@/hooks/redux';
import { selectShowCardInfo } from '@/store/dashboardOptionsSlice';
import SymbolCardHeader from './SymbolCardHeader';
import SymbolCardPrice from './SymbolCardPrice';
import SymbolCardInfo from './SymbolCardInfo';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
  isActive: boolean;
};

const SymbolCard = ({ id, onClick, price, isActive }: SymbolCardProps) => {
  const { trend, companyName, industry, marketCap } = useAppSelector((state) => state.stocks.entities[id]);
  const showCardInfo = useAppSelector(selectShowCardInfo);
  const handleOnClick = () => {
    onClick(id);
  };

  return (
    <div onClick={handleOnClick} className={`symbolCard${isActive ? ' symbolCard--active' : ''}`}>
      <SymbolCardHeader symbol={id} trend={trend} />
      <SymbolCardPrice price={price} />
      {showCardInfo && (
        <SymbolCardInfo companyName={companyName} industry={industry} marketCap={marketCap} />
      )}
    </div>
  );
};
export default SymbolCard;
