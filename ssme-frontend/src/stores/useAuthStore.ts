import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserResponse } from '../types/auth';
import { authApi } from '../lib/axios';

interface AuthState {
  user: UserResponse | null;
  token: string | null;
  refreshToken: string | null;
  expiresAt: number | null; // Timestamp de expiración del token de acceso
  isAuthenticated: boolean;
  login: (user: UserResponse, token: string, refreshToken: string, expiresIn: number) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      expiresAt: null,
      isAuthenticated: false,
      login: (user, token, refreshToken, expiresIn) => {
        const expiresAt = Date.now() + expiresIn * 1000; // expiresIn está en segundos
        set({ user, token, refreshToken, expiresAt, isAuthenticated: true });
      },
      logout: () => set({ user: null, token: null, refreshToken: null, expiresAt: null, isAuthenticated: false }),
      refreshAccessToken: async () => {
        const currentRefreshToken = get().refreshToken;
        if (!currentRefreshToken) {
          get().logout();
          return;
        }

        try {
          const response = await authApi.post('/refresh', { refresh_token: currentRefreshToken });
          const { access_token } = response.data;
          // Asumimos que el refresh endpoint devuelve un nuevo access_token y su duración
          // Por simplicidad, si el backend no devuelve expiresIn, podemos usar un valor por defecto
          const newExpiresAt = Date.now() + (3600 * 1000); // Ejemplo: 1 hora de validez para el nuevo token
          set({ token: access_token, expiresAt: newExpiresAt });
        } catch (error) {
          console.error('Failed to refresh access token:', error);
          get().logout(); // Forzar logout si el refresh falla
        }
      },
    }),
    {
      name: 'auth-storage', // Clave que se usará en localStorage
    }
  )
);