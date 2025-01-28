import { memo } from 'react';
import classNames from 'classnames';
import styles from './StockCardInfo.module.css';
import { PriceDisplay, CompanyDetails } from '@/components/StockCard/_components';
import type { TrendType } from "@/lib/types";

export interface StockData {
  trend: TrendType;
  companyName: string;
  industry: string;
  marketCap: number;
}

export interface StockCardInfoProps {
  price: number;
  showCardInfo: boolean;
  symbolData: StockData;
  isAnimating?: boolean;
}

export const StockCardInfo = memo(({ 
  price,
  showCardInfo,
  symbolData,
  isAnimating = false
}: StockCardInfoProps) => {
  return (
    <div 
      className={classNames(styles.root, {
        [styles.animated]: isAnimating
      })}
    >
      <PriceDisplay 
        price={price}
        isAnimating={isAnimating}
      />
      {showCardInfo && (
        <div
          className={classNames(styles.detailsContainer, {
            [styles.detailsVisible]: showCardInfo
          })}
        >
          <CompanyDetails
            companyName={symbolData.companyName}
            industry={symbolData.industry}
            marketCap={symbolData.marketCap}
          />
        </div>
      )}
    </div>
  );
});