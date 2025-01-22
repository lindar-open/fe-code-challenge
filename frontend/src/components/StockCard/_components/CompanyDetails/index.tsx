import { memo, useMemo } from 'react';
import './companyDetails.css';

import { ListItem } from '@/components/ListItem';
import { formatCurrency } from '@/utils/currencyFormatter';
import { useAsset } from '@/hooks/assets/useAsset';

export const CompanyDetails = memo(({ 
  companyName, 
  industry, 
  marketCap 
}: { 
  companyName: string;
  industry: string;
  marketCap: number;
}) => {
  const CompanyIcon = useAsset('CompanyIcon');
  const IndustryIcon = useAsset('IndustryIcon');
  const MarketCapIcon = useAsset('MarketCapIcon');
  const formattedMarketCap = useMemo(() => formatCurrency(marketCap), [marketCap]);

  return (
    <div className="stockCard__details">
      <ListItem
        Icon={<CompanyIcon />}
        label={companyName}
        spacing="space-between"
      />
      <ListItem
        Icon={<IndustryIcon />}
        label={industry}
        spacing="space-between"
      />
      <ListItem
        Icon={<MarketCapIcon />}
        label={formattedMarketCap}
        spacing="space-between"
      />
    </div>
  );
});