import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import ListItem from '@/components/ListItem';
import { marketCapFormatter } from '@/lib';
import { memo } from 'react';

type SymbolCardInfoProps = {
  companyName: string;
  marketCap: number;
  industry: string;
};

const SymbolCardInfo = ({ companyName, marketCap, industry }: SymbolCardInfoProps) => {
  return (
    <>
      <ListItem spacing="space-between" Icon={<CompanyIcon />} label={companyName} />
      <ListItem spacing="space-between" Icon={<IndustryIcon />} label={industry} />
      <ListItem
        spacing="space-between"
        Icon={<MarketCapIcon />}
        label={marketCapFormatter(marketCap)}
      />
    </>
  );
};
export default memo(SymbolCardInfo);
