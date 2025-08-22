import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { RegisterPayload, RegisterSchema } from '../../../types/auth';
import { useRegisterUser } from '../hooks/useRegisterUser';

export const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterPayload>({
    resolver: zodResolver(RegisterSchema),
  });
  const { mutate, isPending } = useRegisterUser();

  const onSubmit = (data: RegisterPayload) => {
    mutate(data);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem' }}>Crear Nueva Cuenta</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <input {...register('email')} placeholder="Correo Electrónico" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '0.25rem' }} />
            {errors.email && <motion.p initial={{opacity:0}} animate={{opacity:1}} style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.email.message}</motion.p>}
          </div>
          <div>
            <input type="password" {...register('password')} placeholder="Contraseña" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '0.25rem' }} />
            {errors.password && <motion.p initial={{opacity:0}} animate={{opacity:1}} style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.password.message}</motion.p>}
          </div>
           <div>
            <select {...register('role')} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '0.25rem' }}>
                <option value="">Seleccione un rol...</option>
                <option value="employee">Empleado</option>
                <option value="medical_staff">Personal Médico</option>
            </select>
            {errors.role && <motion.p initial={{opacity:0}} animate={{opacity:1}} style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.role.message}</motion.p>}
           </div>
          <button type="submit" disabled={isPending} style={{ padding: '0.75rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', opacity: isPending ? 0.7 : 1 }}>
            {isPending ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};