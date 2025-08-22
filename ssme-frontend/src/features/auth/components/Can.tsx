import React from 'react';
import { useAuthStore } from '../../../stores/useAuthStore';
import { permissionsByRole, PERMISSIONS, ROLES } from '../../../lib/permissions';

type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];
type Role = typeof ROLES[keyof typeof ROLES];

export const usePermissions = () => {
  const user = useAuthStore((state) => state.user);

  const can = (permission: Permission): boolean => {
    if (!user?.role) return false;
    
    // Asegurarse de que el rol del usuario es válido antes de acceder a permissionsByRole
    const userRole = user.role as Role;
    if (!permissionsByRole[userRole]) {
        return false;
    }
    
    return permissionsByRole[userRole].includes(permission);
  };

  return { can, role: user?.role };
};

interface CanProps {
  perform: Permission;
  children: React.ReactNode;
}

export const Can: React.FC<CanProps> = ({ perform, children }) => {
  const { can } = usePermissions();
  return can(perform) ? <>{children}</> : null;
};