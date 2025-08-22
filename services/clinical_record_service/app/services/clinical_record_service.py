from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.repositories.clinical_record_repository import ClinicalRecordRepository
from app.repositories.audit_log_repository import AuditLogRepository
from app.schemas.clinical_record import ClinicalRecordCreate, ClinicalRecord
from app.schemas.audit_log import AuditLogCreate
from app.models.audit_log import AuditAction

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
