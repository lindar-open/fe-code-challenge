import { addCurrency, getInteger } from '@/helpers/currency';
import './symbolCardPrice.css';

type SymbolCardPriceProps = {
  price: number;
};

const SymbolCardPrice = ({ price }: SymbolCardPriceProps) => {
  return (
    <div className="symbolCard__price">
      <span>Price:</span>
      <b>{price ? addCurrency(getInteger(price)) : '--'} </b>
    </div>
  );
};

export default SymbolCardPrice;
