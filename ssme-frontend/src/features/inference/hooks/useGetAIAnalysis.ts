import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../lib/axios';
import { AIAnalysisPayload, AIAnalysisResponse } from '../../../types/api';

const fetchAIAnalysis = async (payload: AIAnalysisPayload): Promise<AIAnalysisResponse> => {
  const { data } = await apiClient.post('/api/inference/analyze', payload);
  return data;
};

export const useGetAIAnalysis = (symptoms: string) => {
  return useQuery({
    queryKey: ['aiAnalysis', symptoms],
    queryFn: () => fetchAIAnalysis({ symptoms }),
    enabled: symptoms.length > 20, // Solo se activa con texto significativo
    keepPreviousData: true, // Mantiene los datos anteriores mientras carga los nuevos
    retry: false, // No reintenta si falla
    staleTime: 1000 * 60 * 5, // 5 minutos de caché
  });
};