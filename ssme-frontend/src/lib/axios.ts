import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost', // Apunta al api-gateway de Traefik
});

// Futuro: Aquí se configurará el interceptor para inyectar el JWT token
apiClient.interceptors.request.use(config => {
  // const token = getToken();
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});

export default apiClient;