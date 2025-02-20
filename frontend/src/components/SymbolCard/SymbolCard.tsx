import TrendDownSrc from '@/assets/down.png';
import TrendUpSrc from '@/assets/up.png';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  selectActiveSymbol,
  selectShowCardInfo,
  setActiveSymbol
} from '@/store/dashboardOptionsSlice';
import { lazy, memo, Suspense, useMemo } from 'react';
import './symbolCard.css';

import { usePriceChangeClass } from './hooks/use-price-change-class';
import { usePriceChangePercentage } from './hooks/use-price-change-percentage';

import SymbolCardHeader from './src/SymbolCardHeader';
import SymbolCardPriceRow from './src/SymbolCardPriceRow';
import SymbolCardTrend from './src/SymbolCardTrend';
import Loading from '../Loading';

const SymbolCardInfoLazy = lazy(() => import('./src/SymbolCardInfo'));

type SymbolCardProps = {
  id: string;
  price: number;
};

const SymbolCard = ({ id, price }: SymbolCardProps) => {
  const dispatch = useAppDispatch();
  const showCardInfo = useAppSelector(selectShowCardInfo);
  const activeSymbol = useAppSelector(selectActiveSymbol);
  const { trend, companyName, marketCap, industry } = useAppSelector(
    (state) => state.stocks.entities[id]
  );

  const priceChangePercentage = usePriceChangePercentage(price);
  const rootClassName = usePriceChangeClass(
    priceChangePercentage,
    activeSymbol === null ? activeSymbol : activeSymbol === id
  );

  const handleOnClick = () => {
    dispatch(setActiveSymbol(id));
  };

  const trendSrc = useMemo(() => {
    if (trend === 'UP') {
      return TrendUpSrc;
    } else if (trend === 'DOWN') {
      return TrendDownSrc;
    }
    return null;
  }, [trend]);

  return (
    <div onClick={handleOnClick} className={rootClassName}>
      <SymbolCardTrend src={trendSrc} />

      <SymbolCardHeader id={id} />

      <div className="symbolCard__content">
        <SymbolCardPriceRow price={price} />

        {showCardInfo && (
          <Suspense fallback={<Loading />}>
            <SymbolCardInfoLazy companyName={companyName} marketCap={marketCap} industry={industry} />
          </Suspense>
        )}
      </div>
    </div>
  );
};
export default memo(SymbolCard);
