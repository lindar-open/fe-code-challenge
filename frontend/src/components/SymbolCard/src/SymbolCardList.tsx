import ListItem from '@/components/ListItem';
import { SymbolCardBodyProps } from '@/components/SymbolCard/src/SymbolCardBody';
import { showShortenedAmount } from '@/helpers/currency';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { memo } from 'react';

type SymbolCardListProps = Omit<SymbolCardBodyProps, 'price' | 'showCardInfo'>;

const SymbolCardList = ({ companyName, industry, marketCap }: SymbolCardListProps) => {
  const listItems = [
    {
      id: 'companyName',
      label: companyName,
      icon: CompanyIcon
    },
    {
      id: 'industry',
      label: industry,
      icon: IndustryIcon
    },
    {
      id: 'marketCap',
      label: showShortenedAmount(marketCap),
      icon: MarketCapIcon
    }
  ];

  return listItems.map(({ id, label, icon }) => {
    const Icon = icon;
    return <ListItem key={id} Icon={<Icon />} label={label} spacing="space-between" />;
  });
};

export default memo(SymbolCardList);
