import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { AppointmentResponse } from '../../../types/api';

const statusStyles: { [key: string]: string } = {
  SCHEDULED: 'background-color: #dbeafe; color: #1e40af;',
  COMPLETED: 'background-color: #f3f4f6; color: #1f2937;',
  CANCELLED: 'background-color: #fee2e2; color: #991b1b;',
};

const getStatusText = (status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED') => {
    switch(status) {
        case 'SCHEDULED': return 'Agendada';
        case 'COMPLETED': return 'Completada';
        case 'CANCELLED': return 'Cancelada';
        default: return status;
    }
}

export const AppointmentCard = ({ appointment, onCancel }: { appointment: AppointmentResponse, onCancel: (id: number) => void }) => {
  const isOptimistic = typeof appointment.id === 'string' && appointment.id.startsWith('optimistic-');
  const isUpcoming = new Date(appointment.appointment_time) >= new Date();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', display: 'flex', gap: '1rem', alignItems: 'center', opacity: isOptimistic ? 0.6 : 1 }}
    >
      <div style={{ flexGrow: 1 }}>
        <p style={{ fontWeight: '700', fontSize: '1.125rem' }}>
          {format(new Date(appointment.appointment_time), 'PPPP', { locale: es })}
        </p>
        <p style={{ color: '#4b5563' }}>
          {format(new Date(appointment.appointment_time), 'p', { locale: es })} - {appointment.reason}
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span 
          style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: '700', borderRadius: '9999px', ...statusStyles[appointment.status] }}
        >
          {isOptimistic ? 'Confirmando...' : getStatusText(appointment.status)}
        </span>
        {isUpcoming && appointment.status === 'SCHEDULED' && !isOptimistic && (
          <button
            onClick={() => onCancel(appointment.id)}
            style={{ color: '#ef4444', fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}
          >
            Cancelar
          </button>
        )}
      </div>
    </motion.div>
  );
};