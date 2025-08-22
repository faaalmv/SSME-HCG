import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import { useThemeStore } from './stores/useThemeStore';
import { ProtectedRoute } from './router/ProtectedRoute';
import { ROLES } from './lib/permissions';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeToggleButton } from './components/ui/ThemeToggleButton';
import { useNotifications } from './features/notifications/hooks/useNotifications';

// --- Componentes de Carga y Placeholders ---
const PageLoader = () => <div className="flex h-screen w-full items-center justify-center"><p>Cargando página...</p></div>;
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  useNotifications(); // Activa el hook de notificaciones para usuarios logueados
  return <>{children}</>;
};

// --- Importaciones Dinámicas (Lazy Loading) ---
const LoginPage = React.lazy(() => import('./features/auth/pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./features/auth/pages/RegisterPage'));
const DashboardPage = React.lazy(() => import('./features/dashboard/pages/DashboardPage'));
const RecordsListPage = React.lazy(() => import('./features/clinical-records/pages/RecordsListPage'));
const RecordDetailPage = React.lazy(() => import('./features/clinical-records/pages/RecordDetailPage'));
const CreateRecordPage = React.lazy(() => import('./features/clinical-records/pages/CreateRecordPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const AppointmentModal = React.lazy(() => import('./features/scheduling/components/AppointmentModal'));

const queryClient = new QueryClient();

function App() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <ErrorBoundary>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <div className="absolute top-4 right-4 z-50">
              <ThemeToggleButton />
            </div>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                <Route element={<ProtectedRoute />}>
                  <Route path="/*" element={
                    <AppLayout>
                      <Routes>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/records" element={<RecordsListPage />} />
                        <Route path="/records/:recordId" element={<RecordDetailPage />} />
                        <Route element={<ProtectedRoute allowedRoles={[ROLES.MEDICAL_STAFF]} />}>
                          <Route path="/records/new" element={<CreateRecordPage />} />
                        </Route>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="*" element={<NotFoundPage />} />
                      </Routes>
                    </AppLayout>
                  }/>
                </Route>

              </Routes>
              <AppointmentModal />
            </Suspense>
          </BrowserRouter>
          <Toaster position="bottom-right" />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </div>
    </ErrorBoundary>
  );
}

export default App;