import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import apiClient from '../../../lib/axios';
import { CreateAppointmentPayload, AppointmentResponse } from '../../../types/api';

const createAppointment = async (payload: CreateAppointmentPayload): Promise<AppointmentResponse> => {
  const { data } = await apiClient.post('/api/appointments/', payload);
  return data;
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAppointment,
    onMutate: async (newAppointment) => {
      const queryKey = ['appointments', newAppointment.patient_id];
      await queryClient.cancelQueries({ queryKey });

      const previousAppointments = queryClient.getQueryData<AppointmentResponse[]>(queryKey);

      const optimisticAppointment: AppointmentResponse = {
        id: `optimistic-${Date.now()}`, // ID temporal único
        status: 'SCHEDULED',
        ...newAppointment,
      };

      queryClient.setQueryData<AppointmentResponse[]>(queryKey, (old = []) => [
        ...old,
        optimisticAppointment,
      ]);

      return { previousAppointments, queryKey };
    },
    onError: (_err, _newAppointment, context) => {
      if (context?.previousAppointments) {
        queryClient.setQueryData(context.queryKey, context.previousAppointments);
      }
      toast.error('No se pudo agendar la cita.');
    },
    onSettled: (_data, _error, _variables, context) => {
      if (context?.queryKey) {
        queryClient.invalidateQueries({ queryKey: context.queryKey });
      }
    },
  });
};
