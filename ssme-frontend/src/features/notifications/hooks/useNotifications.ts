import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuthStore } from '../../../stores/useAuthStore';
import { logger } from '../../../lib/logger';

// Este hook se encarga de la lógica de conexión del WebSocket
export const useNotifications = () => {
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      // La URL debería venir de una variable de entorno
      const socket = io('http://localhost:3001', {
        query: { userId: user.id },
      });

      socket.on('connect', () => {
        logger.info('Conectado al servicio de notificaciones en tiempo real.');
      });

      socket.on('new-appointment', (data) => {
        logger.info('Notificación de nueva cita recibida:', data);
        // Aquí se llamaría a una acción de un futuro useNotificationStore
        // para actualizar la UI con un indicador.
      });
      
      socket.on('disconnect', () => {
        logger.info('Desconectado del servicio de notificaciones.');
      });

      // Limpieza al desmontar el componente o al cambiar el estado de autenticación
      return () => {
        socket.disconnect();
      };
    }
  }, [isAuthenticated, user]);
};