import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetAppointmentsForPatient } from '../hooks/useGetAppointmentsForPatient';
import { AppointmentCard } from './AppointmentCard';
import { AppointmentResponse } from '../../../types/api';

const AppointmentsSkeleton = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} style={{ height: '76px', backgroundColor: '#e2e8f0', borderRadius: '0.5rem' }} className="animate-pulse"></div>
        ))}
    </div>
);

export const PatientAppointmentsList = ({ patientId }: { patientId: string }) => {
  const { data: appointments, isLoading, isError } = useGetAppointmentsForPatient(patientId);

  const { upcoming, past } = useMemo(() => {
    if (!appointments) return { upcoming: [], past: [] };
    const now = new Date();
    const upcomingAppointments: AppointmentResponse[] = [];
    const pastAppointments: AppointmentResponse[] = [];

    appointments.forEach(app => {
      if (new Date(app.appointment_time) >= now) {
        upcomingAppointments.push(app);
      } else {
        pastAppointments.push(app);
      }
    });

    upcomingAppointments.sort((a, b) => new Date(a.appointment_time).getTime() - new Date(b.appointment_time).getTime());
    pastAppointments.sort((a, b) => new Date(b.appointment_time).getTime() - new Date(a.appointment_time).getTime());

    return { upcoming: upcomingAppointments, past: pastAppointments };
  }, [appointments]);

  if (isError) return <div style={{ color: '#ef4444' }}>Error al cargar las citas.</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
      <section>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Próximas Citas</h2>
        {isLoading ? <AppointmentsSkeleton /> : (
          upcoming.length > 0 ? (
            <motion.div layout style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <AnimatePresence>
                {upcoming.map(app => <AppointmentCard key={app.id} appointment={app} />)}
              </AnimatePresence>
            </motion.div>
          ) : (
            <p style={{ color: '#6b7280' }}>No hay citas próximas agendadas.</p>
          )
        )}
      </section>
      <section>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Historial de Citas</h2>
        {isLoading ? <AppointmentsSkeleton /> : (
          past.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {past.map(app => <AppointmentCard key={app.id} appointment={app} />)}
            </div>
          ) : (
            <p style={{ color: '#6b7280' }}>No hay citas en el historial.</p>
          )
        )}
      </section>
    </div>
  );
};
