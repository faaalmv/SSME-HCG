import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import apiClient from '../../../lib/axios';
import { AppointmentResponse } from '../../../types/api';

const cancelAppointment = async (appointmentId: number): Promise<AppointmentResponse> => {
  // El endpoint PATCH que acabamos de crear en el backend
  const { data } = await apiClient.patch(`/api/appointments/${appointmentId}`, { status: 'CANCELLED' });
  return data;
};

export const useCancelAppointment = (patientId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['appointments', patientId];

  return useMutation({
    mutationFn: cancelAppointment,
    onMutate: async (appointmentId) => {
      await queryClient.cancelQueries({ queryKey });
      const previousAppointments = queryClient.getQueryData<AppointmentResponse[]>(queryKey);

      // Actualización optimista: encontrar y cambiar el estado de la cita
      queryClient.setQueryData<AppointmentResponse[]>(queryKey, (old = []) =>
        old.map(app =>
          app.id === appointmentId ? { ...app, status: 'CANCELLED' } : app
        )
      );

      return { previousAppointments };
    },
    onError: (_err, _vars, context) => {
      // Si algo sale mal, revertimos al estado anterior
      if (context?.previousAppointments) {
        queryClient.setQueryData(queryKey, context.previousAppointments);
      }
      toast.error('Error: No se pudo cancelar la cita.');
    },
    onSettled: () => {
      // Sincronizar con el servidor al finalizar (éxito o error)
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
