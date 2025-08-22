import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost',
});

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost',
});

// Interceptor para inyectar el token en cada petición
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Variable para evitar bucles infinitos de refresco
let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: unknown) => void; reject: (reason?: any) => void }> = [];

const processQueue = (error: any | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Interceptor para manejar errores 401 (ej. token expirado)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y no es una petición de refresh token
    if (error.response?.status === 401 && originalRequest.url !== '/refresh') {
      if (isRefreshing) {
        // Si ya se está refrescando, encolar la petición original
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        const authStore = useAuthStore.getState();
        await authStore.refreshAccessToken(); // Intenta refrescar el token
        const newAccessToken = authStore.token;

        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);
          return apiClient(originalRequest);
        } else {
          // Si no hay nuevo token, forzar logout
          processQueue(error);
          authStore.logout();
          window.location.href = '/login';
          return Promise.reject(error);
        }
      } catch (refreshError) {
        processQueue(refreshError);
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
