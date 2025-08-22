import enum
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum, Text, JSON, ForeignKey
from sqlalchemy.sql import func
from app.database import Base

class ClinicalRecord(Base):
    __tablename__ = "clinical_records"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(String, index=True) # Cambiado a String para flexibilidad
    patient_name = Column(String, index=True) # Nuevo campo
    notes = Column(Text, nullable=True) # 'summary' renombrado a 'notes'
    full_interaction = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=func.utcnow())
    updated_at = Column(DateTime, default=func.utcnow(), onupdate=func.utcnow())