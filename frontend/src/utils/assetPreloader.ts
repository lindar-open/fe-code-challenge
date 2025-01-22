import { FunctionComponent, SVGProps } from 'react';

import * as AssetsMap from '@/assets';

export type SVGComponent = FunctionComponent<SVGProps<SVGSVGElement>>;

export type AssetKey = keyof typeof AssetsMap;

export const getAsset = <AssetType = SVGComponent>(id: AssetKey): AssetType | string => {
  const asset = (AssetsMap as unknown as Record<AssetKey, AssetType>)[id];
  if (!asset) {
    console.warn(`Asset with id "${id}" not found`);
    return '';
  }

  return asset;
};

export type PreloadableAsset = {
  path: string;
  type: 'svg' | 'png';
};

export type PreloadableAssetMap = {
  [K in AssetKey]?: PreloadableAsset;
};

const DEFAULT_ASSETS: PreloadableAssetMap = {
  UpArrow: { path: '@/assets/up-arrow.svg', type: 'svg' },
  DownArrow: { path: '@/assets/down-arrow.svg', type: 'svg' },
  CompanyIcon: { path: '@/assets/company.svg', type: 'svg' },
  IndustryIcon: { path: '@/assets/industry.svg', type: 'svg' },
  MarketCapIcon: { path: '@/assets/market_cap.svg', type: 'svg' },
  HappyFace: { path: '@/assets/happy.svg', type: 'svg' },
  NeutralFace: { path: '@/assets/neutral.svg', type: 'svg' },
  SadFace: { path: '@/assets/sad.svg', type: 'svg' },
  arrowDownIcon: { path: '@/assets/down.png', type: 'png' },
  arrowUpIcon: { path: '@/assets/up.png', type: 'png' }
};

export const preloadAssets = async (assetsToLoad: PreloadableAssetMap = DEFAULT_ASSETS) => {
  try {
    const startTime = performance.now();
    const loadPromises = Object.entries(assetsToLoad).map(async ([key, asset]) => {
      if (!asset) return;

      try {
        await import(/* @vite-ignore */ asset.path);
        console.debug(`Asset loaded: ${key}`);
      } catch (error) {
        console.error(`Failed to load asset ${key}:`, error);
        throw error;
      }
    });

    await Promise.all(loadPromises);
    const endTime = performance.now();
    console.debug(`All assets preloaded in ${(endTime - startTime).toFixed(2)}ms`);
  } catch (error) {
    console.error('Failed to preload assets:', error);
    throw error;
  }
};

export const createAssetMap = (assetKeys: AssetKey[]): PreloadableAssetMap => {
  return assetKeys.reduce((acc, key) => {
    if (DEFAULT_ASSETS[key]) {
      acc[key] = DEFAULT_ASSETS[key];
    }
    return acc;
  }, {} as PreloadableAssetMap);
};
