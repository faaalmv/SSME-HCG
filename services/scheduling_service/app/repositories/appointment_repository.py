from typing import List, Optional

from sqlalchemy.orm import Session

from ..models.appointment import Appointment as AppointmentModel
from ..schemas.appointment import AppointmentCreate


class AppointmentRepository:
    def create(self, db: Session, appointment: AppointmentCreate) -> AppointmentModel:
        db_appointment = AppointmentModel(**appointment.dict())
        db.add(db_appointment)
        db.commit()
        db.refresh(db_appointment)
        return db_appointment

    def get_by_id(self, db: Session, appointment_id: int) -> Optional[AppointmentModel]:
        return db.query(AppointmentModel).filter(AppointmentModel.id == appointment_id).first()

    def get_by_patient_id(self, db: Session, patient_id: int) -> List[AppointmentModel]:
        return db.query(AppointmentModel).filter(AppointmentModel.patient_id == patient_id).all()

    def update(self, db: Session, appointment: AppointmentModel, update_data: dict) -> AppointmentModel:
        for key, value in update_data.items():
            setattr(appointment, key, value)
        db.commit()
        db.refresh(appointment)
        return appointment
