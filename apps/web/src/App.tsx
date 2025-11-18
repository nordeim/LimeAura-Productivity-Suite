/**
 * @file apps/web/src/App.tsx
 * @purpose Root application component.
 * @interface Main component
 * @phase 8
 */
import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';
import { AppLayout } from './layouts/AppLayout';
import { AppRoutes } from './routes';
import { Spinner } from '@limeaura/ui';
import { useAppInit } from './hooks/useAppInit';

const InitialLoader = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    background: 'var(--color-background-main)'
  }}>
    <Spinner size="lg" color="primary" label="Initializing LimeAura..." />
  </div>
);

const AppContent: React.FC = () => {
  const { isInitialized } = useAppInit();

  if (!isInitialized) {
    return <InitialLoader />;
  }

  return (
    <BrowserRouter>
      <AppLayout>
        <Suspense fallback={<InitialLoader />}>
          <AppRoutes />
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  );
};

export const App: React.FC = () => {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
};
