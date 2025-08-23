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

# Dependencias (pueden refactorizarse en el futuro)
clinical_record_repository = ClinicalRecordRepository()
audit_log_repository = AuditLogRepository()
clinical_record_service = ClinicalRecordService(clinical_record_repository, audit_log_repository)

@router.get("/me/recent", response_model=List[AuditLog])
def get_my_recent_activity(
    limit: int = 5,
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user_id) # Use get_current_user_id
):
    """Retrieve recent activity for the current user."""
    return clinical_record_service.get_recent_activity_for_user(db=db, user_id=current_user_id, limit=limit)