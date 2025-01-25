import { memo, useMemo } from 'react';
import styles from './CompanyDetails.module.css';
import { useAsset } from '@/hooks/assets/useAsset';
import { formatCurrency } from '@/utils/currencyFormatter';
import { DetailRow } from '@/components/DetailsRow';

interface CompanyDetailsProps {
  companyName: string;
  industry: string;
  marketCap: number;
}

export const CompanyDetails = memo(({ 
  companyName, 
  industry, 
  marketCap 
}: CompanyDetailsProps) => {
  const CompanyIcon = useAsset('CompanyIcon');
  const IndustryIcon = useAsset('IndustryIcon');
  const MarketCapIcon = useAsset('MarketCapIcon');

  const formattedMarketCap = useMemo(() => 
    formatCurrency(marketCap), [marketCap]
  );

  return (
    <div 
      className={styles.details}
      role="group" 
      aria-label="Company Details"
    >
      <DetailRow Icon={CompanyIcon} label={companyName} />
      <DetailRow Icon={IndustryIcon} label={industry} />
      <DetailRow Icon={MarketCapIcon} label={formattedMarketCap} />
    </div>
  );
});