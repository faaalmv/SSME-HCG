from sqlalchemy.orm import Session
from app.models.audit_log import AuditLog
from app.schemas.audit_log import AuditLogCreate

class AuditLogRepository:
    """Repository for audit log related database operations."""

    def create(self, db: Session, log: AuditLogCreate) -> AuditLog:
        """Create a new audit log."""
        db_log = AuditLog(**log.model_dump())
        db.add(db_log)
        db.commit()
        db.refresh(db_log)
        return db_log

    def get_by_record_id(self, db: Session, record_id: int) -> list[AuditLog]:
        """Get all audit logs for a specific clinical record."""
        return db.query(AuditLog).filter(AuditLog.record_id == record_id).order_by(AuditLog.timestamp.desc()).all()

    def get_recent_for_user(self, db: Session, user_id: int, limit: int = 5) -> list[AuditLog]:
        """Get the most recent audit logs for a specific user."""
        return db.query(AuditLog).filter(
            AuditLog.user_id == user_id
        ).order_by(AuditLog.timestamp.desc()).limit(limit).all()
