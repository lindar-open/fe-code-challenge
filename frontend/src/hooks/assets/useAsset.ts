import { useMemo } from 'react';
import { type AssetKey, type SVGComponent, getPreloadedAsset } from '@/utils/assetPreloader';

export const useAsset = <AssetType = SVGComponent>(id: AssetKey): AssetType => {
  return useMemo(() => {
    return getPreloadedAsset(id) as AssetType;
  }, [id]);
};
