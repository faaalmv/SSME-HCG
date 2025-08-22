from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from ..models.appointment import AppointmentStatus

class AppointmentBase(BaseModel):
    patient_id: str
    clinical_record_id: int
    appointment_time: datetime
    reason: str

class AppointmentCreate(AppointmentBase):
    pass

class Appointment(AppointmentBase):
    id: int
    medical_staff_id: Optional[int] = None
    status: AppointmentStatus
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True