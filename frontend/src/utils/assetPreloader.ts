import { FunctionComponent, SVGProps } from 'react';
import * as ASSETS from '@/assets';

export type SVGComponent = FunctionComponent<SVGProps<SVGSVGElement>>;

export type AssetKey = keyof typeof ASSETS;

export const getAsset = <AssetType = SVGComponent>(id: AssetKey): AssetType => {
  const asset = ASSETS[id] as unknown as AssetType;
  if (!asset) {
    console.warn(`Asset with id "${id}" not found`);
    return null as AssetType;
  }
  return asset;
};

export type PreloadableAsset = {
  asset: SVGComponent | string;
  type: 'svg' | 'png';
};

export type PreloadableAssetMap = {
  [K in AssetKey]?: PreloadableAsset;
};

const DEFAULT_ASSETS: PreloadableAssetMap = {
  UpArrow: { asset: ASSETS.UpArrow, type: 'svg' },
  DownArrow: { asset: ASSETS.DownArrow, type: 'svg' },
  CompanyIcon: { asset: ASSETS.CompanyIcon, type: 'svg' },
  IndustryIcon: { asset: ASSETS.IndustryIcon, type: 'svg' },
  MarketCapIcon: { asset: ASSETS.MarketCapIcon, type: 'svg' },
  HappyFace: { asset: ASSETS.HappyFace, type: 'svg' },
  NeutralFace: { asset: ASSETS.NeutralFace, type: 'svg' },
  SadFace: { asset: ASSETS.SadFace, type: 'svg' },
  arrowDownIcon: { asset: ASSETS.arrowDownIcon, type: 'png' },
  arrowUpIcon: { asset: ASSETS.arrowUpIcon, type: 'png' }
};

const cachedAssets: Map<AssetKey, SVGComponent | string> = new Map();

export const preloadAssets = async (assetsToLoad: PreloadableAssetMap = DEFAULT_ASSETS) => {
  try {
    const startTime = performance.now();

    Object.entries(assetsToLoad).forEach(([key, asset]) => {
      if (!asset) return;

      try {
        if (!cachedAssets.has(key as AssetKey)) {
          cachedAssets.set(key as AssetKey, asset.asset);
        }
        console.debug(`Asset loaded: ${key}`);
      } catch (error) {
        console.error(`Failed to load asset ${key}:`, error);
        throw error;
      }
    });

    const endTime = performance.now();
    console.debug(`All assets preloaded in ${(endTime - startTime).toFixed(2)}ms`);
  } catch (error) {
    console.error('Failed to preload assets:', error);
    throw error;
  }
};

export const getPreloadedAsset = (key: AssetKey) => {
  return cachedAssets.get(key) || ASSETS[key];
};

export const createAssetMap = (assetKeys: AssetKey[]): PreloadableAssetMap => {
  return assetKeys.reduce((acc, key) => {
    if (DEFAULT_ASSETS[key]) {
      acc[key] = DEFAULT_ASSETS[key];
    }
    return acc;
  }, {} as PreloadableAssetMap);
};
