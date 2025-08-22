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
import { AppointmentModal } from './features/scheduling/components/AppointmentModal';
import './index.css';

// Importar la página real
import { LoginPage } from './features/auth/pages/LoginPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rutas Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/records" element={<RecordsListPage />} />
            <Route path="/records/new" element={<CreateRecordPage />} />
            <Route path="/records/:recordId" element={<RecordDetailPage />} />
            <Route path="/" element={<Navigate to="/records" replace />} />
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