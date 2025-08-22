import { motion } from 'framer-motion';
import { useCreateClinicalRecord } from '../hooks/useCreateClinicalRecord';
import { useClinicalRecordFormStore } from '../stores/useClinicalRecordFormStore';
import { useMutation } from '@tanstack/react-query';
import apiClient from '../lib/axios';
import { SummarizePayload, SummarizeResponse } from '../types/api';

// Hook de mutación para el resumen AI
const useSummarizeSymptoms = () => {
  const { setField } = useClinicalRecordFormStore();
  
  return useMutation<SummarizeResponse, Error, SummarizePayload>({
    mutationFn: async (payload) => {
      // La URL debe coincidir con la regla de Traefik
      const { data } = await apiClient.post('/api/inference/summarize/', payload);
      return data;
    },
    onSuccess: (data) => {
      setField('aiSummary', data.summary);
    },
    onError: (error) => {
      console.error("Error al generar resumen:", error);
      alert("El servicio de IA no está disponible en este momento.");
    }
  });
};


export const CreateRecordForm = () => {
  const { mutate: createRecordMutate, isPending: isCreating } = useCreateClinicalRecord();
  const { mutate: summarizeMutate, isPending: isSummarizing } = useSummarizeSymptoms();
  const { patientName, symptoms, aiSummary, setField, resetForm } = useClinicalRecordFormStore();

  const handleSummarize = () => {
    if (symptoms.trim().length > 10) {
      summarizeMutate({ symptoms });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createRecordMutate({
      patient_name: patientName,
      patient_id: `PID-${Date.now()}`, // ID de paciente placeholder
      notes: aiSummary || symptoms, // Usar resumen AI si existe
    });
    resetForm();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}
    >
      <h2>Nuevo Expediente Clínico</h2>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={isCreating} style={{ border: 'none', padding: 0, margin: 0 }}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="patientName">Nombre del Paciente</label>
            <input
              id="patientName"
              type="text"
              value={patientName}
              onChange={(e) => setField('patientName', e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="symptoms">Síntomas y Notas Iniciales</label>
            <textarea
              id="symptoms"
              value={symptoms}
              onChange={(e) => setField('symptoms', e.target.value)}
              rows={5}
              required
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            />
          </div>
          
          <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
            <button type="button" onClick={handleSummarize} disabled={isSummarizing || symptoms.trim().length < 10}>
              {isSummarizing ? 'Generando...' : 'Generar Resumen AI'}
            </button>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="aiSummary">Resumen AI</label>
            <textarea
              id="aiSummary"
              value={aiSummary}
              readOnly
              placeholder="El resumen generado por IA aparecerá aquí..."
              rows={5}
              style={{ width: '100%', padding: '8px', marginTop: '4px', backgroundColor: '#f4f4f4' }}
            />
          </div>
          
          <hr style={{ margin: '20px 0' }}/>

          <button type="submit" style={{ width: '100%', padding: '12px', fontSize: '16px', cursor: 'pointer' }}>
            {isCreating ? 'Guardando...' : 'Guardar Expediente'}
          </button>
        </fieldset>
      </form>
    </motion.div>
  );
};