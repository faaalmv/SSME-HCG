import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore'; // Importar el store

// 1. Lee la variable de entorno que definimos en el Paso 2.
const baseURL = import.meta.env.VITE_API_BASE_URL;

// 2. Crea una instancia de Axios con la configuración base.
const apiClient = axios.create({
  baseURL: baseURL,
});

// ▼▼▼ AÑADIR ESTE INTERCEPTOR ▼▼▼
apiClient.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState(); // Obtener el token del store
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 4. Exporta la instancia para que toda la aplicación la use.
export default apiClient;
