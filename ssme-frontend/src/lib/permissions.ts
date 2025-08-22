import { UserResponse } from "../types/auth";

export const ROLES = {
  MEDICAL_STAFF: 'medical_staff',
  EMPLOYEE: 'employee',
} as const;

export const PERMISSIONS = {
  CREATE_RECORD: 'records:create',
  VIEW_RECORDS: 'records:view',
  SCHEDULE_APPOINTMENT: 'appointments:schedule',
  CANCEL_APPOINTPOINTMENT: 'appointments:cancel',
  VIEW_AUDIT_TRAIL: 'audit:view',
} as const;

type Role = typeof ROLES[keyof typeof ROLES];
type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

export const permissionsByRole: Record<Role, Permission[]> = {
  [ROLES.MEDICAL_STAFF]: [
    PERMISSIONS.CREATE_RECORD,
    PERMISSIONS.VIEW_RECORDS,
    PERMISSIONS.SCHEDULE_APPOINTMENT,
    PERMISSIONS.CANCEL_APPOINTMENT,
  ],
  [ROLES.EMPLOYEE]: [
    PERMISSIONS.VIEW_RECORDS,
    PERMISSIONS.SCHEDULE_APPOINTMENT,
  ],
};