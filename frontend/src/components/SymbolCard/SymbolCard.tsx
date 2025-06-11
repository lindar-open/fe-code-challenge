import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import { selectShowCardInfo } from '@/store/dashboardOptionsSlice';
import { formatNumber } from '@/utils/formatNumber';

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
      <div>
        {id} - {trend}
      </div>
      <div>Price:</div>
      <div>{formatNumber(price)} </div>
      {showCardInfo && (
        <>
          <ListItem Icon={<CompanyIcon />} label={companyName} />
          <ListItem Icon={<IndustryIcon />} label={industry} />
          <ListItem Icon={<MarketCapIcon />} label={formatNumber(marketCap)} />
        </>
      )}
    </div>
  );
};
export default SymbolCard;
