import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LoginPayload, LoginSchema } from '../../../types/auth';
import { useLogin } from '../hooks/useLogin';

export const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginPayload>({
    resolver: zodResolver(LoginSchema),
  });
  const { mutate, isPending } = useLogin();

  const onSubmit = (data: LoginPayload) => {
    mutate(data);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '2rem', background: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', width: '100%', maxWidth: '28rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem' }}>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <input {...register('email')} placeholder="Correo Electrónico" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '0.25rem' }} />
            {errors.email && <motion.p initial={{opacity:0}} animate={{opacity:1}} style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.email.message}</motion.p>}
          </div>
          <div>
            <input type="password" {...register('password')} placeholder="Contraseña" style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '0.25rem' }} />
            {errors.password && <motion.p initial={{opacity:0}} animate={{opacity:1}} style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>{errors.password.message}</motion.p>}
          </div>
          <button type="submit" disabled={isPending} style={{ padding: '0.75rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', opacity: isPending ? 0.7 : 1 }}>
            {isPending ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem' }}>
            ¿No tienes una cuenta? <Link to="/register" style={{ color: '#3b82f6' }}>Regístrate</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};