const addCurrency = (value: number | string) => {
  return `$${value}`;
};

const getInteger = (amount: number) => Math.ceil(amount);

const showShortenedAmount = (amount: number) => {
  return addCurrency(Intl.NumberFormat('en', { notation: 'compact' }).format(amount));
};

export { addCurrency, getInteger, showShortenedAmount };
