import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetAllRecords } from '../hooks/useGetAllRecords';
import { format } from 'date-fns';

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const TableSkeleton = () => (
    <div className="space-y-2 animate-pulse">
        {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
        ))}
    </div>
);


export const RecordsListPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: records, isLoading, isError } = useGetAllRecords();

  const filteredRecords = useMemo(() => {
    if (!records) return [];
    return records.filter(record =>
      record.patient_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [records, searchTerm]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ maxWidth: '1024px', margin: 'auto', padding: '2rem', fontFamily: 'sans-serif' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: '700' }}>Expedientes Clínicos</h1>
        <Link to="/records/new" style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', borderRadius: '0.375rem', textDecoration: 'none' }}>
          + Nuevo Expediente
        </Link>
      </div>
      <input
        type="text"
        placeholder="Buscar por nombre de paciente..."
        style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '0.375rem', marginBottom: '1.5rem' }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div>
        <AnimatePresence mode="wait">
            {isLoading && (
                 <motion.div key="skeleton" exit={{ opacity: 0 }}>
                    <TableSkeleton />
                </motion.div>
            )}
            {isError && <div key="error" style={{ color: '#ef4444' }}>Error al cargar los expedientes.</div>}
        </AnimatePresence>

        {!isLoading && !isError && (
             <motion.ul variants={listVariants} initial="hidden" animate="visible" style={{ listStyle: 'none', padding: 0 }}>
                {filteredRecords.map(record => (
                <motion.li key={record.id} variants={itemVariants}>
                    <Link
                    to={`/records/${record.id}`}
                    style={{ display: 'block', padding: '1rem', marginBottom: '0.5rem', border: '1px solid #e2e8f0', borderRadius: '0.375rem', textDecoration: 'none', color: 'inherit' }}
                    >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: '700' }}>{record.patient_name}</span>
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {format(new Date(record.created_at), 'dd/MM/yyyy')}
                        </span>
                    </div>
                    </Link>
                </motion.li>
                ))}
            </motion.ul>
        )}
      </div>
    </motion.div>
  );
};
