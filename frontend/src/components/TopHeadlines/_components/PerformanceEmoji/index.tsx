import { memo } from 'react';
import './performanceEmoji.css';

import type { Bias } from '@/lib/types';
import { useAsset } from '@/hooks/assets/useAsset';

type PerformanceEmojiProps = {
  bias: Bias;
};

export const PerformanceEmoji = memo(({ bias }: PerformanceEmojiProps) => {
  const HappyFace = useAsset('HappyFace');
  const NeutralFace = useAsset('NeutralFace');
  const SadFace = useAsset('SadFace');
  
  return (
    <div className="performanceEmoji">
      {bias === 'POSITIVE' && <HappyFace />}
      {bias === 'NEUTRAL' && <NeutralFace />}
      {bias === 'NEGATIVE' && <SadFace />}
    </div>
  );
});
