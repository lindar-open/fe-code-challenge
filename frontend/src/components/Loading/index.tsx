import './loading.css';
import { memo } from 'react';

export const Loading = memo(() => {
  return (
    <div className="loading">
      <div className="loading__pulse"></div>
    </div>
  );
});
