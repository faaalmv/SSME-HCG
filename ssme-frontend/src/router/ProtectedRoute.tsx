import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    // Redirige al login si el usuario no está autenticado
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderiza la ruta hija solicitada
  return <Outlet />; 
};