from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List # Asegúrate de que List esté importado
from app.database import get_db
from app.services.clinical_record_service import ClinicalRecordService
from app.repositories.clinical_record_repository import ClinicalRecordRepository
from app.repositories.audit_log_repository import AuditLogRepository
from app.schemas.clinical_record import ClinicalRecord, ClinicalRecordCreate
from app.schemas.audit_log import AuditLog # Importar el esquema de AuditLog

router = APIRouter()

# ... (repositorios y servicio existentes) ...
clinical_record_repository = ClinicalRecordRepository()
audit_log_repository = AuditLogRepository()
clinical_record_service = ClinicalRecordService(clinical_record_repository, audit_log_repository)

# NUEVO ENDPOINT
@router.get("/", response_model=List[ClinicalRecord])
def get_all_records(db: Session = Depends(get_db)):
    """Retrieve all clinical records."""
    return clinical_record_service.get_all_records(db=db)

@router.get("/{record_id}/audit", response_model=List[AuditLog])
def get_record_audit_trail(record_id: int, db: Session = Depends(get_db)):
    """Retrieve the audit trail for a specific clinical record."""
    return clinical_record_service.get_audit_trail_for_record(db=db, record_id=record_id)

# ... (endpoints existentes de crear y obtener por id) ...
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
