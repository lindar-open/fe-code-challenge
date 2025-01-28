import { lazy } from 'react';
import type { AssetKey } from '@/utils/assetPreloader';

const ProfileView = lazy(() => import('@/views/ProfileView'));
const StatementsView = lazy(() => import('@/views/StatementsView'));
const SymbolsView = lazy(() => import('@/views/SymbolsView'));

interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<any>;
  preloadAssets: () => Promise<AssetKey[]>;
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: SymbolsView,
    preloadAssets: () => import('@/views/SymbolsView').then((m) => m.requiredAssets)
  },
  {
    path: '/profile',
    component: ProfileView,
    preloadAssets: () => import('@/views/ProfileView').then((m) => m.requiredAssets)
  },
  {
    path: '/statements',
    component: StatementsView,
    preloadAssets: () => import('@/views/StatementsView').then((m) => m.requiredAssets)
  }
];
