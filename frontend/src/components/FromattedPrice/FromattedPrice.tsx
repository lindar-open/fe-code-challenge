import './fromattedPrice.css';
interface FromattedPriceProps {
  priceFromatted: string;
}

export default function FormattedPrice({ priceFromatted }: FromattedPriceProps) {
  return (
    <div className={`fromattedPrice`}>
      <div className="fromattedPrice__label">{'Price:'}</div>
      <div className="fromattedPrice__value">
        {(priceFromatted == '-' ? '' : '$') + priceFromatted}
      </div>
    </div>
  );
}
