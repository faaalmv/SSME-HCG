import { useGetMyUpcomingAppointments } from '../hooks/useGetMyUpcomingAppointments';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const WidgetSkeleton = () => (
    <div className="space-y-3 animate-pulse">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
    </div>
);

export const UpcomingAppointmentsWidget = () => {
  const { data: appointments, isLoading } = useGetMyUpcomingAppointments();

  return (
    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', height: '100%' }}>
      <h3 style={{ fontWeight: '700', marginBottom: '1rem', fontSize: '1.125rem' }}>Próximas Citas</h3>
      {isLoading ? <WidgetSkeleton /> : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {appointments?.map(app => (
            <li key={app.id}>
              <Link to={`/records/${app.clinical_record_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <p style={{ fontWeight: '600' }}>{app.patient_name}</p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {format(new Date(app.appointment_time), 'p')}
                </p>
              </Link>
            </li>
          ))}
           {appointments?.length === 0 && <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>No tienes citas próximas.</p>}
        </ul>
      )}
    </div>
  );
};