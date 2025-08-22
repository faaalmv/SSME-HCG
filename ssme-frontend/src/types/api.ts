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

// Contrato con el endpoint de análisis de IA
export interface AIAnalysisPayload {
  symptoms: string;
}

export interface AIAnalysisResponse {
  possible_conditions: string[];
  suggested_questions: string[];
  recommended_tests: string[];
}
