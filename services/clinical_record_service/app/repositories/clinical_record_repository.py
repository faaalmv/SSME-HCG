from sqlalchemy.orm import Session
from app.models.clinical_record import ClinicalRecord
from app.schemas.clinical_record import ClinicalRecordCreate

class ClinicalRecordRepository:
    """Repository for clinical record related database operations."""

    def create(self, db: Session, record: ClinicalRecordCreate) -> ClinicalRecord:
        """Create a new clinical record."""
        db_record = ClinicalRecord(**record.dict())
        db.add(db_record)
        db.commit()
        db.refresh(db_record)
        return db_record

    def get_by_id(self, db: Session, record_id: int) -> ClinicalRecord | None:
        """Get a clinical record by id."""
        return db.query(ClinicalRecord).filter(ClinicalRecord.id == record_id).first()
