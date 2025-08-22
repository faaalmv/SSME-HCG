import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  recordId: number | null;
  patientId: string | null;
  openModal: (recordId: number, patientId: string) => void;
  closeModal: () => void;
}

export const useAppointmentModalStore = create<ModalState>((set) => ({
  isOpen: false,
  recordId: null,
  patientId: null,
  openModal: (recordId, patientId) => set({ isOpen: true, recordId, patientId }),
  closeModal: () => set({ isOpen: false, recordId: null, patientId: null }),
}));
