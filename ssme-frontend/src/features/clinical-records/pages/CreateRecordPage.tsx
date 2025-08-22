import { motion } from 'framer-motion';
import { useClinicalRecordFormStore } from '../../../stores/useClinicalRecordFormStore';
import { useCreateClinicalRecord } from '../hooks/useCreateClinicalRecord';
import { SymptomInputSection } from '../components/SymptomInputSection';
import { useDebounce } from '../../../hooks/useDebounce';
import { AIAnalysisPanel } from '../../inference/components/AIAnalysisPanel';

export const CreateRecordPage = () => {
  const { patientName, symptoms, setField } = useClinicalRecordFormStore();
  const { mutate, isPending } = useCreateClinicalRecord();
  const debouncedSymptoms = useDebounce(symptoms, 750); // Debounce de 750ms

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      alert('El nombre del paciente es requerido.');
      return;
    }
    mutate({
      patient_name: patientName,
      patient_id: `PID-${Date.now()}`, // Placeholder
      notes: symptoms,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{ maxWidth: '896px', margin: 'auto', padding: '2rem' }}
    >
      <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '1.5rem' }}>
        Nuevo Expediente Clínico
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
        <form onSubmit={handleSubmit} style={{ gridColumn: 'span 2' }}>
          <fieldset disabled={isPending} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label htmlFor="patientName" style={{ display: 'block', fontWeight: '500', marginBottom: '0.25rem' }}>
                Nombre del Paciente
              </label>
              <input
                id="patientName"
                type="text"
                value={patientName}
                onChange={(e) => setField('patientName', e.target.value)}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}
                required
              />
            </div>

            <SymptomInputSection />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                style={{ padding: '0.75rem 1.5rem', backgroundColor: '#16a34a', color: 'white', fontWeight: '700', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', opacity: isPending || !patientName ? 0.5 : 1 }}
                disabled={isPending || !patientName}
              >
                {isPending ? 'Creando Expediente...' : 'Crear Expediente'}
              </button>
            </div>
          </fieldset>
        </form>
        <div style={{ gridColumn: 'span 1' }}>
          <AIAnalysisPanel symptoms={debouncedSymptoms} />
        </div>
      </div>
    </motion.div>
  );
};