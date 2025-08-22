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
