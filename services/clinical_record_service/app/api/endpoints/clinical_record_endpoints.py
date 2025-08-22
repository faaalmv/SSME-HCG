from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.clinical_record_service import ClinicalRecordService
from app.repositories.clinical_record_repository import ClinicalRecordRepository
from app.repositories.audit_log_repository import AuditLogRepository
from app.schemas.clinical_record import ClinicalRecord, ClinicalRecordCreate

router = APIRouter()

clinical_record_repository = ClinicalRecordRepository()
audit_log_repository = AuditLogRepository()
clinical_record_service = ClinicalRecordService(clinical_record_repository, audit_log_repository)

@router.post("/", response_model=ClinicalRecord, status_code=201)
def create_record(record: ClinicalRecordCreate, medical_staff_id: int, db: Session = Depends(get_db)):
    """
    Create a new clinical record.

    **Note:** `medical_staff_id` is temporarily passed as a query parameter for simulation.
    In a real-world scenario, it would be extracted from a JWT token.
    """
    return clinical_record_service.create_clinical_record(db=db, record_create=record, medical_staff_id=medical_staff_id)

@router.get("/{record_id}", response_model=ClinicalRecord)
def get_record(record_id: int, medical_staff_id: int, db: Session = Depends(get_db)):
    """
    Get a clinical record by its ID.

    **Note:** `medical_staff_id` is temporarily passed as a query parameter for simulation.
    In a real-world scenario, it would be extracted from a JWT token.
    """
    return clinical_record_service.get_record_by_id(db=db, record_id=record_id, medical_staff_id=medical_staff_id)
