from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel

from ..models.appointment import AppointmentStatus


class AppointmentBase(BaseModel):
    patient_id: int
    clinical_record_id: int
    start_time: datetime
    end_time: datetime


class AppointmentCreate(AppointmentBase):
    pass


class AppointmentUpdate(BaseModel):
    medical_staff_id: Optional[int] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    status: Optional[AppointmentStatus] = None


class Appointment(AppointmentBase):
    id: int
    medical_staff_id: Optional[int]
    status: AppointmentStatus
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True
