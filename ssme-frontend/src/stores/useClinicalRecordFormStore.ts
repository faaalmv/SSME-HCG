import { create } from 'zustand';

interface FormState {
  patientName: string;
  symptoms: string;
  aiSummary: string;
  setField: (field: keyof Omit<FormState, 'setField' | 'resetForm'>, value: string) => void;
  resetForm: () => void;
}

export const useClinicalRecordFormStore = create<FormState>((set) => ({
  patientName: '',
  symptoms: '',
  aiSummary: '',
  setField: (field, value) => set({ [field]: value }),
  resetForm: () => set({ patientName: '', symptoms: '', aiSummary: '' }),
}));