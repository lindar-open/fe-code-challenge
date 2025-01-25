import { memo, useMemo } from 'react';
import styles from './PerformanceEmoji.module.css';
import type { Bias } from '@/lib/types';
import { useAsset } from '@/hooks/assets/useAsset';

interface PerformanceEmojiProps {
  bias: Bias;
}

export const PerformanceEmoji = memo(({ bias }: PerformanceEmojiProps) => {
  const HappyFace = useAsset('HappyFace');
  const NeutralFace = useAsset('NeutralFace');
  const SadFace = useAsset('SadFace');
  
  const EmojiComponent = useMemo(() => {
    switch (bias) {
      case 'POSITIVE':
        return HappyFace;
      case 'NEUTRAL':
        return NeutralFace;
      case 'NEGATIVE':
        return SadFace;
      default:
        return NeutralFace;
    }
  }, [bias, HappyFace, NeutralFace, SadFace]);
  
  return (
    <div className={styles.root}>
      <EmojiComponent />
    </div>
  );
});

PerformanceEmoji.displayName = 'PerformanceEmoji';