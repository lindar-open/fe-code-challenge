import './cardPrice.css';
import React from 'react';

type CardPriceProps = {
  price: string;
};
const CardPrice = React.memo(({ price }: CardPriceProps) => {
  return (
    <div className="card__content">
      <div className="card__price--text">PRICE:</div>
      <div className="card__price--value">{price || '--'} </div>
    </div>
  );
});

export default CardPrice;
