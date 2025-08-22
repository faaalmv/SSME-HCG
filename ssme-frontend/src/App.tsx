import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CreateRecordForm } from './components/CreateRecordForm';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Crear un cliente
const queryClient = new QueryClient();

function App() {
  return (
    // Proveer el cliente a tu aplicación
    <QueryClientProvider client={queryClient}>
      <CreateRecordForm />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;