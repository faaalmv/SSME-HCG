from typing import List
from datetime import datetime # Asegúrate de importar datetime

from fastapi import HTTPException
from sqlalchemy.orm import Session

from ..models.appointment import Appointment as AppointmentModel
from ..repositories.appointment_repository import AppointmentRepository
from ..schemas.appointment import AppointmentCreate, AppointmentUpdate # Asegúrate de importar AppointmentUpdate


class AppointmentService:
    def __init__(self, repository: AppointmentRepository):
        self.repository = repository

    def create_appointment(self, db: Session, appointment_create: AppointmentCreate) -> AppointmentModel:
        return self.repository.create(db, appointment_create)

    def get_appointment(self, db: Session, appointment_id: int) -> AppointmentModel:
        appointment = self.repository.get_by_id(db, appointment_id)
        if not appointment:
            raise HTTPException(status_code=404, detail="Appointment not found")
        return appointment

    def get_appointments_for_patient(self, db: Session, patient_id: int) -> List[AppointmentModel]:
        return self.repository.get_by_patient_id(db, patient_id)

    def update_appointment(self, db: Session, appointment_id: int, appointment_update: AppointmentUpdate) -> AppointmentModel:
        appointment = self.get_appointment(db, appointment_id)
        update_data = appointment_update.model_dump(exclude_unset=True)
        return self.repository.update(db, appointment, update_data)

    def get_upcoming_appointments_for_user(self, db: Session, user_id: int, limit: int) -> List[AppointmentModel]:
        """Get upcoming appointments for a user."""
        return self.repository.get_upcoming_for_user(db, user_id=user_id, limit=limit)
