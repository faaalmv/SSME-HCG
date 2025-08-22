import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetClinicalRecord } from './ssme-frontend/src/features/clinical-records/hooks/useGetClinicalRecord';
import { format } from 'date-fns';
import { useGetAppointmentsForPatient } from './ssme-frontend/src/features/scheduling/hooks/useGetAppointmentsForPatient';
import { useAppointmentModalStore } from './ssme-frontend/src/stores/useAppointmentModalStore';

// Componente de esqueleto reutilizable para la página de detalle
const RecordSkeleton = () => (
  <div className="animate-pulse" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div style={{ height: '2rem', backgroundColor: '#e2e8f0', borderRadius: '0.25rem', width: '50%' }}></div>
    <div style={{ height: '1rem', backgroundColor: '#e2e8f0', borderRadius: '0.25rem', width: '25%' }}></div>
    <div style={{ paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ height: '1rem', backgroundColor: '#e2e8f0', borderRadius: '0.25rem' }}></div>
      <div style={{ height: '1rem', backgroundColor: '#e2e8f0', borderRadius: '0.25rem' }}></div>
      <div style={{ height: '1rem', backgroundColor: '#e2e8f0', borderRadius: '0.25rem', width: '83.33%' }}></div>
    </div>
  </div>
);

export const RecordDetailPage = () => {
  const { recordId } = useParams<{ recordId: string }>();

  // Si no hay recordId en la URL, no podemos hacer nada.
  if (!recordId) {
    return <div style={{ padding: '2rem' }}>ID de expediente no válido.</div>;
  }

  const { data: record, isLoading, isError, error } = useGetClinicalRecord(recordId);
  const { openModal } = useAppointmentModalStore();
  const { data: appointments } = useGetAppointmentsForPatient(record?.patient_id ?? '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{ maxWidth: '896px', margin: 'auto', padding: '2rem', fontFamily: 'sans-serif' }}
    >
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div key="skeleton" exit={{ opacity: 0 }}>
            <RecordSkeleton />
          </motion.div>
        )}

        {isError && (
          <motion.div key="error" style={{ color: '#ef4444' }}>
            <h2>Error</h2>
            <p>No se pudo cargar el expediente. Es posible que no exista.</p>
            <pre style={{ marginTop: '1rem', color: '#71717a' }}>{error?.message}</pre>
          </motion.div>
        )}

        {record && (
          <motion.div key="data" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: '700' }}>{record.patient_name}</h1>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.5rem' }}>
              Expediente creado el: {format(new Date(record.created_at), 'dd/MM/yyyy HH:mm')}
            </p>
            <div style={{ padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
              <h2 style={{ fontWeight: '700', marginBottom: '0.5rem', fontSize: '1.125rem' }}>Notas Clínicas / Resumen</h2>
              <p style={{ color: '#374151', whiteSpace: 'pre-wrap' }}>{record.notes}</p>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 style={{ fontWeight: '700', fontSize: '1.125rem' }}>Citas Programadas</h2>
                    <button onClick={() => openModal(record.id, record.patient_id)} style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', borderRadius: '0.375rem', border: 'none', cursor: 'pointer' }}>
                        + Agendar Cita
                    </button>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {appointments?.map(app => (
                        <li key={app.id} style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '0.375rem' }}>
                            <p><strong>Motivo:</strong> {app.reason}</p>
                            <p><strong>Fecha:</strong> {format(new Date(app.appointment_time), 'dd/MM/yyyy HH:mm')}</p>
                            <p><strong>Estado:</strong> <span style={{ fontWeight: '600', color: app.id > 100000 ? '#9ca3af' : '#16a34a' }}>{app.id > 100000 ? 'Confirmando...' : 'Confirmada'}</span></p>
                        </li>
                    ))}
                </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
