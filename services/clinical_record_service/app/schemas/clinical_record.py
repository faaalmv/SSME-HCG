from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ClinicalRecordBase(BaseModel):
    patient_id: str
    patient_name: str
    notes: Optional[str] = None
    full_interaction: Optional[dict] = None

class ClinicalRecordCreate(ClinicalRecordBase):
    pass

class ClinicalRecord(ClinicalRecordBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True