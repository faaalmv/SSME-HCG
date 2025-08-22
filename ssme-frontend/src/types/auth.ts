import { z } from 'zod';

// Esquema de validación para el formulario de registro
export const RegisterSchema = z.object({
  email: z.string().email('Correo electrónico no válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  role: z.enum(['employee', 'medical_staff'], {
    errorMap: () => ({ message: 'Debe seleccionar un rol' }),
  }),
});

// Tipo inferido del esquema para usar en el formulario
export type RegisterPayload = z.infer<typeof RegisterSchema>;

// Tipo para la respuesta del API de usuario (reutilizable)
export interface UserResponse {
  id: number;
  email: string;
  role: 'employee' | 'medical_staff';
  is_active: boolean;
}