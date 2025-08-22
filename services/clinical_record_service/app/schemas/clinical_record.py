from pydantic import BaseModel
from datetime import datetime

class ClinicalRecordBase(BaseModel):
    patient_id: int
    summary: str
    full_interaction: dict

class ClinicalRecordCreate(ClinicalRecordBase):
    pass

class ClinicalRecord(ClinicalRecordBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
