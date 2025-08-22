import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import apiClient from '../../../lib/axios';
import { RegisterPayload, UserResponse } from '../../../types/auth';

const registerUser = async (payload: RegisterPayload): Promise<UserResponse> => {
  const { data } = await apiClient.post('/api/users/', payload);
  return data;
};

export const useRegisterUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success('Cuenta creada exitosamente. Por favor, inicie sesión.');
      navigate('/login');
    },
    onError: (error: any) => {
      // Manejo de errores específicos del API (ej. email ya registrado)
      toast.error(error.response?.data?.detail || 'Error al crear la cuenta.');
    },
  });
};