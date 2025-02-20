import SymbolsView from '@/components/SymbolsView';
import { Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loading from '@/components/Loading';

const ProfileLazy = lazy(() => import('@/components/ProfileView'));
const StatementsViewLazy = lazy(() => import('@/components/StatementsView'));

const Router = () => {
  return (
    <Routes>
      <Route index element={<SymbolsView />} />
      <Route
        index
        path="profile"
        element={
          <Suspense fallback={<Loading />}>
            <ProfileLazy />
          </Suspense>
        }
      />
      <Route
        index
        path="statements"
        element={
          <Suspense fallback={<Loading />}>
            <StatementsViewLazy />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default Router;
