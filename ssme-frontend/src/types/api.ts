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
