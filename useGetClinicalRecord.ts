import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../lib/axios';
import { ClinicalRecordResponse } from '../../../types/api';

const fetchRecord = async (recordId: string): Promise<ClinicalRecordResponse> => {
  // Simular el ID de personal médico requerido por el endpoint actual
  const { data } = await apiClient.get(`/api/records/${recordId}`, {
      params: {
          medical_staff_id: 1
      }
  });
  return data;
};

export const useGetClinicalRecord = (recordId: string) => {
  return useQuery({
    // La clave de la query es un array. El ID dinámico asegura que
    // cada expediente tenga su propia entrada en el caché.
    queryKey: ['clinicalRecord', recordId],
    queryFn: () => fetchRecord(recordId),
    // No reintentar la petición si falla (un 404 es un error definitivo)
    retry: false,
    // Considerar los datos "frescos" por 5 minutos para evitar recargas innecesarias
    staleTime: 1000 * 60 * 5, 
  });
};