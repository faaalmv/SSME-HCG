import enum
from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey
from sqlalchemy.sql import func

from ..database import Base

class AppointmentStatus(enum.Enum):
    SCHEDULED = "scheduled"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(String, index=True) # Cambiado a String por consistencia
    clinical_record_id = Column(Integer, ForeignKey("clinical_records.id"))
    medical_staff_id = Column(Integer, index=True, nullable=True)
    
    appointment_time = Column(DateTime, nullable=False) # Campo unificado para la fecha y hora
    reason = Column(String) # Nuevo campo para el motivo

    status = Column(Enum(AppointmentStatus), default=AppointmentStatus.SCHEDULED, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())