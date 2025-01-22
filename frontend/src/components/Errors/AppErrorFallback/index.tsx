export const AppErrorFallback = () => (
  <div className="app-error">
    <h2>Something went wrong with the application</h2>
    <p>Please try refreshing the page</p>
    <button 
      onClick={() => window.location.reload()}
      className="app-error__reload-button"
    >
      Reload
    </button>
  </div>
);