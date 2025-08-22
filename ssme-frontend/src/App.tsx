import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

// Layouts y Rutas
import { ProtectedRoute } from './router/ProtectedRoute';
import { CreateRecordPage } from './features/clinical-records/pages/CreateRecordPage';
import { RecordDetailPage } from './features/clinical-records/pages/RecordDetailPage';
import { RecordsListPage } from './features/clinical-records/pages/RecordsListPage';
import { RegisterPage } from './features/auth/pages/RegisterPage';
import { LoginPage } from './features/auth/pages/LoginPage';
import { AppointmentModal } from './features/scheduling/components/AppointmentModal';
import { ROLES } from './lib/permissions';
import './index.css';

// Placeholder para la página de Acceso No Autorizado
const UnauthorizedPage = () => <div style={{ padding: '2rem' }}><h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>403 - Acceso no autorizado</h2><p>No tienes permiso para ver esta página.</p></div>;

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Rutas Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/records" element={<RecordsListPage />} />
            <Route path="/records/:recordId" element={<RecordDetailPage />} />
            <Route path="/" element={<Navigate to="/records" replace />} />

            {/* Rutas anidadas con protección específica de rol */}
            <Route element={<ProtectedRoute allowedRoles={[ROLES.MEDICAL_STAFF]} />}>
              <Route path="/records/new" element={<CreateRecordPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" />
      <AppointmentModal />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;