import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom'; // Descomentar cuando se implemente el routing
import apiClient from '../lib/axios';
import { CreateClinicalRecordPayload, ClinicalRecordResponse } from '../types/api';

const createRecord = async (payload: CreateClinicalRecordPayload): Promise<ClinicalRecordResponse> => {
  // La URL debe coincidir con la regla de Traefik
  const { data } = await apiClient.post('/api/records/', payload);
  return data;
};

export const useCreateClinicalRecord = () => {
  const queryClient = useQueryClient();
  // const navigate = useNavigate(); // Descomentar cuando se implemente el routing

  return useMutation({
    mutationFn: createRecord,
    onSuccess: (data) => {
      console.log('Expediente creado:', data);
      queryClient.setQueryData(['clinicalRecord', data.id], data);
      queryClient.invalidateQueries({ queryKey: ['clinicalRecords'] });
      // navigate(`/records/${data.id}`); // Descomentar cuando se implemente el routing
      alert(`Expediente creado con éxito. ID: ${data.id}`);
    },
    onError: (error) => {
      console.error("Error al crear el expediente:", error);
      alert("No se pudo guardar el expediente. Revisa la consola para más detalles.");
    },
  });
};