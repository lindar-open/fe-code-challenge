import { Suspense, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Loading } from '@/components/Loading';
import { routes } from './routes';
import { preloadAssets, createAssetMap, type AssetKey } from '@/utils/assetPreloader';
import { useAppSelector } from '@/hooks/redux';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const commonAssets = [] as AssetKey[];

const Router = () => {
  const location = useLocation();
  const { activeSymbol } = useAppSelector(state => state.store);

  useEffect(() => {
    const loadRouteAssets = async () => {
      const currentRoute = routes.find(route => route.path === location.pathname);
      
      if (currentRoute) {
        try {
          const routeAssets = await currentRoute.preloadAssets();
        
          const assetsToLoad = createAssetMap([
            ...commonAssets,
            ...routeAssets,
          ]);
          
          await preloadAssets(assetsToLoad);
        } catch (error) {
          console.error('Failed to load route assets:', error);
        }
      }
    };

    loadRouteAssets();
  }, [location.pathname, activeSymbol]);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {routes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <ErrorBoundary>
                <Component />
              </ErrorBoundary>
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default Router;