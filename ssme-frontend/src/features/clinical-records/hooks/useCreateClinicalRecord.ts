import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import apiClient from '../../../lib/axios';
import { useClinicalRecordFormStore } from '../../../stores/useClinicalRecordFormStore';
import { CreateClinicalRecordPayload, ClinicalRecordResponse } from '../../../types/api';

const createRecord = async (payload: CreateClinicalRecordPayload): Promise<ClinicalRecordResponse> => {
  const { data } = await apiClient.post('/api/records/', payload, {
    // Simular el ID de personal médico requerido por el endpoint actual
    params: {
        medical_staff_id: 1 
    }
  });
  return data;
};

export const useCreateClinicalRecord = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const resetForm = useClinicalRecordFormStore((state) => state.resetForm);

  return useMutation({
    mutationFn: createRecord,
    onSuccess: (data) => {
      toast.success(`Expediente para ${data.patient_name} creado.`);
      // Invalida queries de listas para que se refresquen
      queryClient.invalidateQueries({ queryKey: ['clinicalRecords'] });
      // Resetea el formulario a su estado inicial
      resetForm();
      // Navega a la página de detalle del nuevo expediente
      navigate(`/records/${data.id}`);
    },
    onError: (error) => {
      console.error("Error al crear el expediente:", error);
      toast.error("No se pudo guardar el expediente. Verifique los datos.");
    },
  });
};