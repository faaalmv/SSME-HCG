from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ...database import get_db
from ...services.appointment_service import AppointmentService
from ...repositories.appointment_repository import AppointmentRepository
from ...schemas.appointment import Appointment, AppointmentCreate, AppointmentUpdate
from services.user_service.app.security import get_current_user_id # Import get_current_user_id


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
    patient_id: str,
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


@router.get("/me/upcoming", response_model=List[Appointment])
def get_my_upcoming_appointments(
    limit: int = 5,
    db: Session = Depends(get_db),
    service: AppointmentService = Depends(get_appointment_service),
    current_user_id: int = Depends(get_current_user_id) # Use get_current_user_id
):
    """Retrieve the next upcoming appointments for the current user."""
    return service.get_upcoming_appointments_for_user(db=db, user_id=current_user_id, limit=limit)