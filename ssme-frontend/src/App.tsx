import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { SymptomInputSection } from './features/clinical-records/components/SymptomInputSection';
import './index.css'; // Importaremos algunos estilos básicos

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '40px auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Generador de Resumen Clínico</h1>
        <SymptomInputSection />
      </div>
      <Toaster position="bottom-right" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;