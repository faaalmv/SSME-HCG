import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import { useThemeStore } from './stores/useThemeStore';
import { ProtectedRoute } from './router/ProtectedRoute';
import { DashboardPage } from './features/dashboard/pages/DashboardPage';
import { CreateRecordPage } from './features/clinical-records/pages/CreateRecordPage';
import { RecordDetailPage } from './features/clinical-records/pages/RecordDetailPage';
import { RecordsListPage } from './features/clinical-records/pages/RecordsListPage';
import { RegisterPage } from './features/auth/pages/RegisterPage';
import { LoginPage } from './features/auth/pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AppointmentModal } from './features/scheduling/components/AppointmentModal';
import { ThemeToggleButton } from './components/ui/ThemeToggleButton';
import { ROLES } from './lib/permissions';
import ErrorBoundary from './components/ErrorBoundary'; // <--- New import

const queryClient = new QueryClient();

function App() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <ErrorBoundary> {/* <--- Wrapped with ErrorBoundary */}
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <div className="absolute top-4 right-4 z-50">
              <ThemeToggleButton />
            </div>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/records" element={<RecordsListPage />} />
                <Route path="/records/:recordId" element={<RecordDetailPage />} />
                <Route element={<ProtectedRoute allowedRoles={[ROLES.MEDICAL_STAFF]} />}>
                  <Route path="/records/new" element={<CreateRecordPage />} />
                </Route>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
          <Toaster position="bottom-right" />
          <AppointmentModal />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
