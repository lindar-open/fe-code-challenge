import { Suspense, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Loading } from '@/components/Loading';
import { routes } from './routes';
import { preloadAssets, createAssetMap, type AssetKey } from '@/utils/assetPreloader';

const commonAssets = ['UpArrow', 'DownArrow'] as AssetKey[];

const Router = () => {
  const location = useLocation();

  useEffect(() => {
    const preloadRouteAssets = async () => {
      const currentRoute = routes.find(route => route.path === location.pathname);
      
      if (currentRoute) {
        try {
          const routeAssets = await currentRoute.preloadAssets();
          
          const assetsToLoad = createAssetMap([...commonAssets, ...routeAssets]);
          
          await preloadAssets(assetsToLoad);
        } catch (error) {
          console.error('Failed to preload route assets:', error);
        }
      }
    };

    preloadRouteAssets();
  }, [location.pathname]);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {routes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={<Component />}
          />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default Router;