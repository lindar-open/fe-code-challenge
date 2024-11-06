import SymbolsView from '@/components/SymbolsView';
import { Route, Routes, Navigate } from 'react-router-dom';
import React, { Suspense } from 'react';

const ProfileViewComponent = React.lazy(() => import('@/components/ProfileView'));
const StatementsViewComponent = React.lazy(() => import('@/components/StatementsView'));

const Router = () => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route index element={<SymbolsView />} />
        <Route index path="profile" element={<ProfileViewComponent />} />
        <Route index path="statements" element={<StatementsViewComponent />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
