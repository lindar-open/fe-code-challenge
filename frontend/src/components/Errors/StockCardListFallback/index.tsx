export const StockCardListFallback = () => (
  <div className="stockCardList stockCardList--error">
    <h3>Something went wrong with stock cards</h3>
    <button 
      onClick={() => window.location.reload()}
      className="stockCardList__retry-button"
    >
      Retry
    </button>
  </div>
);