from sqlalchemy.orm import Session
from app.models.audit_log import AuditLog
from app.schemas.audit_log import AuditLogCreate

class AuditLogRepository:
    """Repository for audit log related database operations."""

    def create(self, db: Session, log: AuditLogCreate) -> AuditLog:
        """Create a new audit log."""
        db_log = AuditLog(**log.dict())
        db.add(db_log)
        db.commit()
        db.refresh(db_log)
        return db_log
