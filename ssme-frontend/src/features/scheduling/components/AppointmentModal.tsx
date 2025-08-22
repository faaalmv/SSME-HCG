import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useAppointmentModalStore } from '../../../stores/useAppointmentModalStore';
import { useCreateAppointment } from '../hooks/useCreateAppointment';
import { CreateAppointmentPayload } from '../../../types/api';
import { toast } from 'react-hot-toast';

const AppointmentModal = () => {
  // ... existing code ...
};

export default AppointmentModal;
  const { isOpen, closeModal, recordId, patientId } = useAppointmentModalStore();
  const { mutate, isPending } = useCreateAppointment();
  
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(new Date());
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recordId || !patientId || !appointmentDate || !reason.trim()) {
        toast.error("Todos los campos son requeridos.");
        return;
    }

    const payload: CreateAppointmentPayload = {
      clinical_record_id: recordId,
      patient_id: patientId,
      appointment_time: appointmentDate.toISOString(),
      reason,
    };

    mutate(payload, {
      onSuccess: () => {
        toast.success('Cita agendada.');
        closeModal();
        setReason('');
        setAppointmentDate(new Date());
      },
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog static as={motion.div} open={isOpen} onClose={closeModal} className="relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-25"
          />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Agendar Nueva Cita
                </Dialog.Title>
                <div className="mt-2">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">Fecha y Hora</label>
                      <DatePicker
                        selected={appointmentDate}
                        onChange={(date: Date | null) => setAppointmentDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Motivo de la Cita</label>
                      <textarea
                        id="reason"
                        rows={3}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Ej: Seguimiento de tratamiento, Consulta general, etc."
                      ></textarea>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        disabled={isPending}
                      >
                        {isPending ? 'Agendando...' : 'Agendar Cita'}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
