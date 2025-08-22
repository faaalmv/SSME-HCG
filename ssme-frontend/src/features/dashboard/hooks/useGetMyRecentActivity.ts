import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../lib/axios';
import { DashboardActivityLog } from '../../../types/api';

const fetchMyRecentActivity = async (): Promise<DashboardActivityLog[]> => {
  const { data } = await apiClient.get('/api/audit/me/recent?limit=5');
  return data;
};

export const useGetMyRecentActivity = () => useQuery({
  queryKey: ['dashboard', 'recentActivity'],
  queryFn: fetchMyRecentActivity,
});