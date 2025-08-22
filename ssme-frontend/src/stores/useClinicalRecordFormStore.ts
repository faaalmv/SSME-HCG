import { create } from 'zustand';

interface FormState {
  patientName: string;
  symptoms: string;
  aiSummary: string;
  isSummarizing: boolean; // Nuevo estado para la UI de inferencia
  setField: (field: keyof Omit<FormState, 'setField' | 'setIsSummarizing' | 'resetForm'>, value: string) => void;
  setIsSummarizing: (status: boolean) => void;
  resetForm: () => void;
}

export const useClinicalRecordFormStore = create<FormState>((set) => ({
  patientName: '',
  symptoms: '',
  aiSummary: '',
  isSummarizing: false,
  setField: (field, value) => set({ [field]: value }),
  setIsSummarizing: (status) => set({ isSummarizing: status }),
  resetForm: () => set({ patientName: '', symptoms: '', aiSummary: '' }),
}));