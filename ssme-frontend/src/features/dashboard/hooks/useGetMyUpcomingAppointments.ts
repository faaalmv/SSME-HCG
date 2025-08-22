import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../lib/axios';
import { DashboardAppointment } from '../../../types/api';

const fetchMyUpcomingAppointments = async (): Promise<DashboardAppointment[]> => {
  const { data } = await apiClient.get('/api/appointments/me/upcoming?limit=5');
  return data;
};

export const useGetMyUpcomingAppointments = () => useQuery({
  queryKey: ['dashboard', 'upcomingAppointments'],
  queryFn: fetchMyUpcomingAppointments,
});