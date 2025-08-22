import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LoginPage } from './LoginPage';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock del hook useLogin para aislar el componente
vi.mock('../hooks/useLogin', () => ({
  useLogin: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}));

// Mock del store de autenticación
vi.mock('../../../stores/useAuthStore', () => ({
  useAuthStore: vi.fn(),
}));

const queryClient = new QueryClient();

describe('LoginPage', () => {
  it('debería renderizar el formulario de inicio de sesión correctamente', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </QueryClientProvider>
    );

    // Comprueba que los elementos clave están presentes en el documento
    expect(screen.getByPlaceholderText(/Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
    expect(screen.getByText(/¿No tienes una cuenta?/i)).toBeInTheDocument();
  });
});