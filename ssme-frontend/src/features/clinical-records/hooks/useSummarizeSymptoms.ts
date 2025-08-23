import { useMutation } from '@tanstack/react-query';
import apiClient from '../../../lib/axios';
import { SummarizePayload, SummarizeResponse } from '../../../types/api';
import { toast } from 'react-hot-toast';

const summarizeSymptoms = async (payload: SummarizePayload): Promise<SummarizeResponse> => {
  const { data } = await apiClient.post('/api/inference/summarize/', payload);
  return data;
};

export const useSummarizeSymptoms = (setAiSummary: (summary: string) => void, setIsSummarizing: (isSummarizing: boolean) => void) => {

  return useMutation({
    mutationFn: summarizeSymptoms,
    onMutate: () => {
      // 1. Inicia el estado de carga (Ejecución Optimista de UI)
      setIsSummarizing(true);
    },
    onSuccess: (data) => {
      // 2. En caso de éxito, actualiza el campo del store y notifica
      setField('aiSummary', data.summary);
      toast.success('Resumen generado por IA.');
    },
    onError: (error) => {
      // 3. En caso de error, notifica al usuario
      console.error("Error en la inferencia:", error);
      toast.error('No se pudo generar el resumen.');
    },
    onSettled: () => {
      // 4. Se ejecuta siempre (éxito o error) para limpiar el estado de carga
      setIsSummarizing(false);
    },
  });
};