import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { CreateRecordPage } from './features/clinical-records/pages/CreateRecordPage';
import { RecordDetailPage } from './features/clinical-records/pages/RecordDetailPage';
import { RecordsListPage } from './features/clinical-records/pages/RecordsListPage'; // Importar la nueva página
import { AppointmentModal } from './features/scheduling/components/AppointmentModal';
import './index.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/records" element={<RecordsListPage />} />
          <Route path="/records/new" element={<CreateRecordPage />} />
          <Route path="/records/:recordId" element={<RecordDetailPage />} />
          {/* Ahora la ruta raíz redirige a la lista de expedientes */}
          <Route path="/" element={<Navigate to="/records" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" />
      <AppointmentModal /> {/* <-- Añadir el modal aquí */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
