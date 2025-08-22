// Contrato con clinical-record-service
export interface CreateClinicalRecordPayload {
  patient_name: string;
  patient_id: string;
  notes: string; // Resumen final (AI o manual)
}

export interface ClinicalRecordResponse {
  id: number;
  patient_name: string;
  patient_id: string;
  notes: string;
  created_at: string; // ISO 8601 date string
}

// Contrato con inference-service
export interface SummarizePayload {
  symptoms: string;
}

export interface SummarizeResponse {
  summary: string;
}

export type AllRecordsResponse = ClinicalRecordResponse[];

// Contrato con scheduling-service
export interface CreateAppointmentPayload {
  patient_id: string;
  clinical_record_id: number;
  appointment_time: string; // ISO 8601
  reason: string;
}

export interface AppointmentResponse {
  id: number;
  patient_id: string;
  clinical_record_id: number;
  appointment_time: string;
  reason: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
}

// Contrato con el endpoint de auditoría
export interface AuditLogResponse {
  id: number;
  user_id: number; // El backend devuelve un entero
  action: 'CREATE' | 'READ' | 'UPDATE';
  timestamp: string; // ISO 8601
}

// Tipos específicos para los widgets del dashboard
export interface DashboardAppointment {
  id: number;
  appointment_time: string;
  patient_name: string; // Se necesita el nombre del paciente
  clinical_record_id: number;
}

export interface DashboardActivityLog {
  id: number;
  action: 'CREATE' | 'READ';
  timestamp: string;
  record_id: number;
  patient_name: string; // Asumimos que el backend lo unirá
}
