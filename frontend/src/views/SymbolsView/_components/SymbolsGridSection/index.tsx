import { memo } from 'react';
import './SymbolsGridSection.css';

import { SymbolsGrid } from '@/views/SymbolsView/_components';

interface SymbolsGridSectionProps {
  onSymbolClick: (symbolId: string) => void;
}

export const SymbolsGridSection = memo(({ onSymbolClick }: SymbolsGridSectionProps) => (
  <div className="symbolsView__cards">
    <SymbolsGrid onSymbolClick={onSymbolClick} />
  </div>
));