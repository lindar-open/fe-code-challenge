import { Suspense, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Loading } from '@/components/Loading';
import { routes } from './routes';
import { preloadAssets, createAssetMap, type AssetKey } from '@/utils/assetPreloader';
import { useAppSelector } from '@/hooks/redux';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const commonAssets = [] as AssetKey[];

const SuspenseBoundary = ({ children }: { children: React.ReactNode }) => (
  <Suspense 
    fallback={
      <div className="suspense-loader">
        <Loading aria-label="Loading view..." />
      </div>
    }
  >
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  </Suspense>
);

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
              <SuspenseBoundary>
                <Component />
              </SuspenseBoundary>
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default Router;