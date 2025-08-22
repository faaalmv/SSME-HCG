import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../lib/axios';
import { AllRecordsResponse } from '../../../types/api';

const fetchAllRecords = async (): Promise<AllRecordsResponse> => {
  const { data } = await apiClient.get('/api/records/');
  return data;
};

export const useGetAllRecords = () => {
  return useQuery({
    queryKey: ['clinicalRecords'],
    queryFn: fetchAllRecords,
    // Considerar los datos "frescos" por 2 minutos para evitar recargas innecesarias
    staleTime: 1000 * 60 * 2, 
  });
};
