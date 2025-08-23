import { motion, AnimatePresence } from 'framer-motion';
import { useSummarizeSymptoms } from '../hooks/useSummarizeSymptoms';

// Componente de esqueleto de carga con animaciones
const SummarySkeleton = () => (
  <div className="space-y-2">
    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
  </div>
);

export const SymptomInputSection = ({ symptoms, setSymptoms, aiSummary, setAiSummary, isSummarizing, setIsSummarizing }) => {
  const { symptoms, aiSummary, isSummarizing, setField } = useClinicalRecordFormStore();
  const { mutate } = useSummarizeSymptoms();

  const handleSummarize = () => {
    // Validación simple para habilitar el botón
    if (symptoms.trim().length > 10) { 
      mutate({ symptoms });
    }
  };

  return (
    <div style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <label htmlFor="symptoms-textarea" style={{ fontWeight: '600' }}>Síntomas y Notas Iniciales</label>
      <textarea
        id="symptoms-textarea"
        value={symptoms}
        onChange={(e) => setField('symptoms', e.target.value)}
        placeholder="Describa los síntomas del paciente..."
        style={{ width: '100%', minHeight: '120px', padding: '0.5rem', border: '1px solid #cbd5e0', borderRadius: '0.25rem' }}
      />
      <button
        onClick={handleSummarize}
        disabled={isSummarizing || symptoms.trim().length <= 10}
        style={{ padding: '0.75rem 1rem', backgroundColor: '#4299e1', color: 'white', borderRadius: '0.25rem', border: 'none', cursor: 'pointer', opacity: (isSummarizing || symptoms.trim().length <= 10) ? 0.5 : 1 }}
      >
        {isSummarizing ? 'Generando...' : 'Generar Resumen AI'}
      </button>

      <div style={{ padding: '1rem', backgroundColor: '#f7fafc', borderRadius: '0.25rem', minHeight: '100px' }}>
        <AnimatePresence mode="wait">
          {isSummarizing ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SummarySkeleton />
            </motion.div>
          ) : (
            <motion.p
              key="summary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ color: '#4a5568', whiteSpace: 'pre-wrap', fontStyle: aiSummary ? 'normal' : 'italic' }}
            >
              {aiSummary || 'El resumen generado por la IA aparecerá aquí.'}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};