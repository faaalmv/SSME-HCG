import { useGetAIAnalysis } from '../hooks/useGetAIAnalysis';
import { motion, AnimatePresence } from 'framer-motion';

const AnalysisCard = ({ title, items }: { title: string, items: string[] }) => (
  <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
    <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{title}</h4>
    <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', fontSize: '0.875rem', color: '#4b5563', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  </div>
);

const PanelSkeleton = () => ( /* ... esqueleto opcional ... */ <div>Analizando...</div> );

export const AIAnalysisPanel = ({ symptoms }: { symptoms: string }) => {
  const { data, isFetching, isError, isInitial } = useGetAIAnalysis(symptoms);

  return (
    <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem', height: '100%' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Asistente de IA</h3>
      <AnimatePresence mode="wait">
        {isFetching && <motion.div key="loading"><PanelSkeleton /></motion.div>}
        {isError && <motion.div key="error" style={{ color: '#ef4444' }}>Error en el servicio de análisis.</motion.div>}
        {!isFetching && !isError && data && (
          <motion.div key="data" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <AnalysisCard title="Posibles Afecciones" items={data.possible_conditions} />
            <AnalysisCard title="Preguntas Sugeridas" items={data.suggested_questions} />
            <AnalysisCard title="Pruebas Recomendadas" items={data.recommended_tests} />
          </motion.div>
        )}
         {!isFetching && !data && <p style={{color: '#6b7280'}}>Escriba los síntomas para activar el asistente.</p>}
      </AnimatePresence>
    </div>
  );
};