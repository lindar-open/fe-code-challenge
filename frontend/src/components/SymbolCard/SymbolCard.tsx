import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import TrendIcon from '../TrendIcon/TrendIcon';
import FormattedPrice from '../FromattedPrice/FromattedPrice';
import { Fragment, memo, useEffect, useState } from 'react';
import usePrevious from '@/hooks/usePrevious';
import { selectActiveSymbol } from '@/store/dashboardOptionsSlice';
import GlowShadow from '../GlowShadow/GlowShadow';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
  showCardInfo: boolean;
  selectedSym: string | null;
};

const SymbolCard = memo(function SymbolCard({ id, onClick, price, showCardInfo }: SymbolCardProps) {
  let formatter = Intl.NumberFormat('en', { notation: 'compact' });
  const [glowing, setGlowing] = useState(false);
  const activeSymbol = useAppSelector(selectActiveSymbol);
  const { trend, companyName, industry, marketCap } = useAppSelector(
    (state) => state.stocks.entities[id]
  );
  const handleOnClick = () => {
    onClick(id);
  };
  const prevPrice = usePrevious(price);
  const bigVariation =
    prevPrice && Math.abs(Math.abs(prevPrice) - Math.abs(price)) > Math.abs(prevPrice) * 0.25;

  const glowUp = prevPrice ? price > prevPrice : false;

  function getCardClass() {
    const classes = ['symbolCard'];
    if (bigVariation) classes.push('symbolCard__shake');
    switch (activeSymbol) {
      case '':
        break;
      case id:
        classes.push('symbolCard_selected');
        break;
      default:
        classes.push('symbolCard_unselected');
    }

    return classes.join(' ');
  }

  useEffect(() => {
    if (!glowing && prevPrice !== undefined) {
      setGlowing(true);
      setTimeout(() => {
        setGlowing(false);
      }, 1000);
    }
  }, [prevPrice]);

  return (
    <div onClick={handleOnClick} className={getCardClass()}>
      {prevPrice && glowing && <GlowShadow up={glowUp} />}
      <div
        style={{ visibility: !glowing && activeSymbol == id ? 'visible' : 'hidden' }}
        className="symbolCard__shadow"
      />
      <div className="symbolCard__header">
        {id} <TrendIcon trend={trend} />
      </div>
      <FormattedPrice priceFromatted={price ? formatter.format(price) : '-'} />
      {showCardInfo && (
        <Fragment>
          <ListItem Icon={<CompanyIcon />} label={companyName} spacing="space-between" />
          <ListItem Icon={<IndustryIcon />} label={industry} spacing="space-between" />
          <ListItem
            Icon={<MarketCapIcon />}
            label={'$' + formatter.format(marketCap)}
            spacing="space-between"
          />
        </Fragment>
      )}
    </div>
  );
});
export default SymbolCard;
