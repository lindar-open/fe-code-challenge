import { memo } from 'react';
import styles from '@/views/SymbolsView/SymbolsView.module.css';
import { SymbolsGrid } from '@/views/SymbolsView/_components';

interface SymbolsGridSectionProps {
  onSymbolClick: (symbolId: string) => void;
}

export const SymbolsGridSection = memo(({ onSymbolClick }: SymbolsGridSectionProps) => (
  <div className={styles.cardsSection}>
    <SymbolsGrid onSymbolClick={onSymbolClick} />
  </div>
));

SymbolsGridSection.displayName = 'SymbolsGridSection';