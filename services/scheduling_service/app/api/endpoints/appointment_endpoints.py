from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ...database import get_db
from ...services.appointment_service import AppointmentService
from ...repositories.appointment_repository import AppointmentRepository
from ...schemas.appointment import Appointment, AppointmentCreate, AppointmentUpdate


router = APIRouter()

# Dependency injection for AppointmentService
def get_appointment_service(db: Session = Depends(get_db)) -> AppointmentService:
    # Pass the db session to the repository, and then the repository to the service
    repository = AppointmentRepository()
    # The service methods will receive the db session directly
    return AppointmentService(repository)


@router.post("/", response_model=Appointment, status_code=status.HTTP_201_CREATED)
async def create_appointment(
    appointment: AppointmentCreate,
    db: Session = Depends(get_db), # Inject db directly here
    service: AppointmentService = Depends(get_appointment_service)
):
    """Create a new appointment."""
    # Pass the db session to the service method
    return service.create_appointment(db=db, appointment_create=appointment)


@router.get("/patient/{patient_id}", response_model=List[Appointment])
async def get_patient_appointments(
    patient_id: int,
    db: Session = Depends(get_db), # Inject db directly here
    service: AppointmentService = Depends(get_appointment_service)
):
    """Retrieve all appointments for a specific patient."""
    # Pass the db session to the service method
    return service.get_appointments_for_patient(db=db, patient_id=patient_id)

@router.patch("/{appointment_id}", response_model=Appointment)
async def update_appointment_status(
    appointment_id: int,
    appointment_update: AppointmentUpdate,
    db: Session = Depends(get_db),
    service: AppointmentService = Depends(get_appointment_service)
):
    """Update an appointment's status."""
    return service.update_appointment(db, appointment_id, appointment_update)