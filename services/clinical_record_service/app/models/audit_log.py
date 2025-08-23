import enum
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.sql import func
from ..database import Base

class AuditAction(enum.Enum):
    READ = "read"
    CREATE = "create"
    UPDATE = "update"

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    record_id = Column(Integer, ForeignKey("clinical_records.id"))
    user_id = Column(Integer)
    action = Column(Enum(AuditAction))
    timestamp = Column(DateTime, default=func.utcnow())
    details = Column(JSON)
