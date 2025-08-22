import { create } from 'zustand';

interface FormState {
  patientName: string;
  symptoms: string;
  aiSummary: string;
  isSummarizing: boolean;
}

interface FormActions {
  setField: (field: keyof Omit<FormState, 'isSummarizing'>, value: string) => void;
  setIsSummarizing: (status: boolean) => void;
  resetForm: () => void;
}

const initialState: FormState = {
  patientName: '',
  symptoms: '',
  aiSummary: '',
  isSummarizing: false,
};

export const useClinicalRecordFormStore = create<FormState & FormActions>((set) => ({
  ...initialState,
  setField: (field, value) => set({ [field]: value }),
  setIsSummarizing: (status) => set({ isSummarizing: status }),
  resetForm: () => set(initialState),
}));