import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../lib/axios';
import { AppointmentResponse } from '../../../types/api';

const fetchAppointments = async (patientId: string): Promise<AppointmentResponse[]> => {
  const { data } = await apiClient.get(`/api/appointments/patient/${patientId}`);
  return data;
};

export const useGetAppointmentsForPatient = (patientId: string) => {
  return useQuery({
    queryKey: ['appointments', patientId],
    queryFn: () => fetchAppointments(patientId),
    enabled: !!patientId, // Solo ejecutar si patientId existe
  });
};
