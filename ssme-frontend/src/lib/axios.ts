import axios from 'axios';

// 1. Lee la variable de entorno que definimos en el Paso 2.
const baseURL = import.meta.env.VITE_API_BASE_URL;

// 2. Crea una instancia de Axios con la configuración base.
const apiClient = axios.create({
  baseURL: baseURL,
});

// 3. (Futuro) Aquí es donde configuraremos los interceptores para añadir
//    automáticamente los tokens de autenticación a cada petición.
// apiClient.interceptors.request.use(...)

// 4. Exporta la instancia para que toda la aplicación la use.
export default apiClient;
