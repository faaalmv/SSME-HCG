from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.services.clinical_record_service import ClinicalRecordService
from app.repositories.clinical_record_repository import ClinicalRecordRepository
from app.repositories.audit_log_repository import AuditLogRepository
from app.schemas.audit_log import AuditLog
from services.user_service.app.security import get_current_user_id # Import get_current_user_id

router = APIRouter()

# Dependency injection for ClinicalRecordService
def get_clinical_record_service(db: Session = Depends(get_db)) -> ClinicalRecordService:
    clinical_record_repo = ClinicalRecordRepository()
    audit_log_repo = AuditLogRepository()
    return ClinicalRecordService(
        clinical_record_repository=clinical_record_repo,
        audit_log_repository=audit_log_repo
    )

@router.get("/me/recent", response_model=List[AuditLog])
def get_my_recent_activity(
    limit: int = 5,
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user_id), # Use get_current_user_id
    service: ClinicalRecordService = Depends(get_clinical_record_service)
):
    """Retrieve recent activity for the current user."""
    return service.get_recent_activity_for_user(db=db, user_id=current_user_id, limit=limit)