import { memo } from 'react';
import './stockCardInfo.css';

import type { TrendType } from "@/lib/types";
import { PriceDisplay, CompanyDetails } from '@/components/StockCard/_components';

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
}

export const StockCardInfo = memo(({ 
  price,
  showCardInfo,
  symbolData
}: StockCardInfoProps) => {
  return (
    <div className="stockCard__info">
      <PriceDisplay price={price} />
      {showCardInfo && (
        <CompanyDetails
          companyName={symbolData.companyName}
          industry={symbolData.industry}
          marketCap={symbolData.marketCap}
        />
      )}
    </div>
  );
});