import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const SymbolsView = lazy(() => import('@/components/SymbolsView'));
const StatementsView = lazy(() => import('@/components/StatementsView'));
const ProfileView = lazy(() => import('@/components/ProfileView'));

function Layout() {
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
}

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<SymbolsView />} />
        <Route index path="profile" element={<ProfileView />} />
        <Route index path="statements" element={<StatementsView />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default Router;
