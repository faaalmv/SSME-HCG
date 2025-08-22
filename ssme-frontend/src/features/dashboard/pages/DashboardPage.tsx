import { motion } from 'framer-motion';
import { useAuthStore } from '../../../stores/useAuthStore';
import { UpcomingAppointmentsWidget } from '../components/UpcomingAppointmentsWidget';

export const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: '2rem' }}
    >
      <h1 style={{ fontSize: '2.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>
        Bienvenido, {user?.email || 'Profesional'}
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))', gap: '1.5rem' }}>
        <div style={{ gridColumn: 'span 2' }}>
          {/* Placeholder para el widget de actividad reciente */}
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'}}>
             <h3 style={{ fontWeight: '700', marginBottom: '1rem', fontSize: '1.125rem' }}>Actividad Reciente (Próximamente)</h3>
          </div>
        </div>
        <div>
          <UpcomingAppointmentsWidget />
        </div>
      </div>
    </motion.div>
  );
};