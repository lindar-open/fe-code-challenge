import { type AssetKey, getAsset, SVGComponent } from "@/utils/assetPreloader";
import { useMemo } from "react";

export const useAsset = <AssetType = SVGComponent>(id: AssetKey) => {
  return useMemo(() => getAsset<AssetType>(id), [id]);
};
