from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.repositories.clinical_record_repository import ClinicalRecordRepository
from app.repositories.audit_log_repository import AuditLogRepository
from app.schemas.clinical_record import ClinicalRecordCreate, ClinicalRecord
from app.schemas.audit_log import AuditLogCreate
from app.models.audit_log import AuditAction, AuditLog

class ClinicalRecordService:
    """Service for clinical record related business logic."""

    def __init__(self, clinical_record_repository: ClinicalRecordRepository, audit_log_repository: AuditLogRepository):
        """Initialize the service with repositories."""
        self.clinical_record_repository = clinical_record_repository
        self.audit_log_repository = audit_log_repository

    def get_record_by_id(self, db: Session, record_id: int, medical_staff_id: int) -> ClinicalRecord:
        """Get a clinical record by id and audit the action."""
        db_record = self.clinical_record_repository.get_by_id(db, record_id)
        if db_record is None:
            raise HTTPException(status_code=404, detail="Clinical record not found")

        log_create = AuditLogCreate(
            record_id=record_id,
            user_id=medical_staff_id,
            action=AuditAction.READ,
            details={}
        )
        self.audit_log_repository.create(db, log_create)

        return db_record

    def create_clinical_record(self, db: Session, record_create: ClinicalRecordCreate, medical_staff_id: int) -> ClinicalRecord:
        """Create a new clinical record and audit the action."""
        db_record = self.clinical_record_repository.create(db, record_create)

        log_create = AuditLogCreate(
            record_id=db_record.id,
            user_id=medical_staff_id,
            action=AuditAction.CREATE,
            details={}
        )
        self.audit_log_repository.create(db, log_create)

        return db_record

    def get_all_records(self, db: Session) -> list[ClinicalRecord]:
        """Get all clinical records."""
        # En el futuro, aquí se podría añadir lógica de paginación o filtros complejos.
        # Por ahora, no se requiere auditoría para la acción de listar.
        return self.clinical_record_repository.get_all(db)

    def get_audit_trail_for_record(self, db: Session, record_id: int) -> list[AuditLog]:
        """Get the audit trail for a specific clinical record."""
        # En el futuro, podríamos verificar aquí si el usuario que solicita tiene permisos para ver la auditoría.
        return self.audit_log_repository.get_by_record_id(db, record_id)

    def get_recent_activity_for_user(self, db: Session, user_id: int, limit: int) -> list[AuditLog]:
        """Get recent activity for a user."""
        return self.audit_log_repository.get_recent_for_user(db, user_id=user_id, limit=limit)
