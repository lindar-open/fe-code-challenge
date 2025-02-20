import { memo } from 'react';

import './symbolCardHeader.css';

type SymbolCardHeaderProps = {
  id: string;
};

const SymbolCardHeader = ({ id }: SymbolCardHeaderProps) => {
  return <div className="symbolCardHeader">{id}</div>;
};
export default memo(SymbolCardHeader);
