import React from 'react';
import ListItem from '@/components/ListItem';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { formatNumber } from '@/utils/formatNumber';

type SymbolCardInfoProps = {
  companyName: string;
  industry: string;
  marketCap: number;
};

const SymbolCardInfo = ({ companyName, industry, marketCap }: SymbolCardInfoProps) => (
  <div className="symbolCard__info">
    <ListItem Icon={<CompanyIcon />} label={companyName} />
    <ListItem Icon={<IndustryIcon />} label={industry} />
    <ListItem Icon={<MarketCapIcon />} label={formatNumber(marketCap)} />
  </div>
);

export default React.memo(SymbolCardInfo);
