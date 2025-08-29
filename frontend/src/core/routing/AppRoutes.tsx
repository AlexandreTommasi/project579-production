import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout, Loader } from '@/shared/components';
import { paths } from './paths';

// Lazy loading das páginas para code-splitting
const GamePage = React.lazy(() => import('@/features/game/pages/GamePage'));

const AppRoutes = () => {
  return (
    <MainLayout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={paths.home} element={<GamePage />} />
          {/* Adicione outras rotas aqui */}
          <Route path="*" element={<div>Página não encontrada</div>} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
};

export default AppRoutes;
