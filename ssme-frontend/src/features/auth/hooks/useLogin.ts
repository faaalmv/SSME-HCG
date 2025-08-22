import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import apiClient from '../../../lib/axios';
import { useAuthStore } from '../../../stores/useAuthStore';
import { LoginPayload, LoginResponse } from '../../../types/auth';

const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  // El backend espera form-data, así que lo formateamos
  const formData = new URLSearchParams();
  formData.append('username', payload.email);
  formData.append('password', payload.password);
  
  const { data } = await apiClient.post('/api/users/login', formData);
  return data;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const authLogin = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      authLogin(data.user, data.access_token);
      navigate('/records');
      toast.success('¡Bienvenido!');
    },
    onError: () => {
      toast.error('Correo electrónico o contraseña incorrectos.');
    },
  });
};