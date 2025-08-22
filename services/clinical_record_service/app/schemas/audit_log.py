from pydantic import BaseModel
from datetime import datetime
from app.models.audit_log import AuditAction

class AuditLogBase(BaseModel):
    record_id: int
    user_id: int
    action: AuditAction
    details: dict

class AuditLogCreate(AuditLogBase):
    pass

class AuditLog(AuditLogBase):
    id: int
    timestamp: datetime

    class Config:
        orm_mode = True
