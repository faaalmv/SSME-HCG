import { BrowserRouter, Routes, Route, useParams, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { CreateRecordPage } from './features/clinical-records/pages/CreateRecordPage';
import './index.css';

// Placeholder para la página de detalle
const RecordDetailPage = () => {
  const { recordId } = useParams();
  // En un futuro, aquí usarías:
  // const { data, isLoading } = useQuery({ queryKey: ['clinicalRecord', recordId], queryFn: () => fetchRecordById(recordId) });
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Detalle del Expediente</h1>
        <p>Mostrando expediente con ID: <strong>{recordId}</strong></p>
    </div>
  );
};

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/records/new" element={<CreateRecordPage />} />
          <Route path="/records/:recordId" element={<RecordDetailPage />} />
          {/* Redirigir la ruta raíz a la página de creación */}
          <Route path="/" element={<Navigate to="/records/new" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;