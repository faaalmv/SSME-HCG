import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useEffect, useState } from 'react';

export const ProtectedRoute = () => {
  const { isAuthenticated, expiresAt, refreshAccessToken, logout } = useAuthStore();
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    const checkTokenAndRefresh = async () => {
      if (!isAuthenticated) {
        setIsCheckingToken(false);
        return;
      }

      const currentTime = Date.now();
      const fiveMinutes = 5 * 60 * 1000; // 5 minutos en milisegundos

      if (expiresAt && expiresAt - currentTime < fiveMinutes) {
        // Si el token expira en menos de 5 minutos, intenta refrescarlo
        console.log('Token is about to expire, refreshing...');
        try {
          await refreshAccessToken();
          console.log('Token refreshed successfully.');
        } catch (error) {
          console.error('Failed to refresh token:', error);
          logout(); // Forzar logout si el refresh falla
        }
      }
      setIsCheckingToken(false);
    };

    checkTokenAndRefresh();

    // Configurar un intervalo para chequear el token periódicamente
    const interval = setInterval(checkTokenAndRefresh, 60 * 1000); // Cada minuto

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, [isAuthenticated, expiresAt, refreshAccessToken, logout]);

  if (isCheckingToken) {
    return <div>Cargando autenticación...</div>; // O un spinner de carga
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};