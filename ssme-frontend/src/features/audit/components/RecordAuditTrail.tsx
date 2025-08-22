import { useGetRecordAuditTrail } from '../hooks/useGetRecordAuditTrail';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { FiEye, FiPlusCircle } from 'react-icons/fi';

const actionMap = {
  CREATE: { text: 'creó', icon: <FiPlusCircle /> },
  READ: { text: 'visualizó', icon: <FiEye /> },
  UPDATE: { text: 'actualizó', icon: <FiEye /> }, // Asumiendo un futuro estado de actualización
};

const AuditSkeleton = () => (
    <div className="space-y-4 animate-pulse">
        {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-start space-x-3">
                <div className="h-6 w-6 rounded-full bg-gray-200"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
            </div>
        ))}
    </div>
);

export const RecordAuditTrail = ({ recordId }: { recordId: string }) => {
  const { data: auditLogs, isLoading, isError } = useGetRecordAuditTrail(recordId);

  return (
    <div style={{ marginTop: '2rem', borderTop: '1px solid #e2e8f0', paddingTop: '2rem' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Historial de Acceso</h3>
      {isLoading && <AuditSkeleton />}
      {isError && <p style={{ color: '#ef4444' }}>No se pudo cargar el historial.</p>}
      {!isLoading && !isError && (
        <ul style={{ listStyle: 'none', paddingLeft: '1rem', borderLeft: '2px solid #e2e8f0' }}>
          {auditLogs?.length === 0 && <p style={{ color: '#6b7280' }}>No hay registros de acceso para este expediente.</p>}
          {auditLogs?.map(log => (
            <li key={log.id} style={{ display: 'flex', gap: '0.75rem', position: 'relative', paddingBottom: '1.5rem' }}>
              <span style={{ position: 'absolute', left: '-1.2rem', top: '0.125rem', color: '#6b7280' }}>{actionMap[log.action].icon}</span>
              <div>
                <p>
                  <span style={{ fontWeight: '600' }}>Usuario ID: {log.user_id}</span> {actionMap[log.action].text} este expediente.
                </p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true, locale: es })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};