import './cardBody.css';
import React from 'react';
import ListItem from '@/components/ListItem';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';

type CardBodyProps = {
  companyName: string;
  industry: string;
  marketCap: string;
};
const CardBody = React.memo(({ companyName, industry, marketCap }: CardBodyProps) => {
  //If there where more listItems i would consider using a map function to render them reducing code duplication
  //But since there are only 3, I will keep it simple
  return (
    <div className="card__body">
      <ListItem Icon={<CompanyIcon />} label={companyName} spacing="space-between" />
      <ListItem Icon={<IndustryIcon />} label={industry} spacing="space-between" />
      <ListItem Icon={<MarketCapIcon />} label={marketCap} spacing="space-between" />
    </div>
  );
});

export default CardBody;
