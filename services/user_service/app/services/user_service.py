from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate
from app.security import get_password_hash

class UserService:
    """Service for user related business logic."""

    def __init__(self, user_repository: UserRepository):
        """Initialize the service with a user repository."""
        self.user_repository = user_repository

    def create_user(self, db: Session, user_create: UserCreate):
        """Create a new user."""
        db_user = self.user_repository.get_by_email(db, email=user_create.email)
        if db_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        hashed_password = get_password_hash(user_create.password)
        return self.user_repository.create(db=db, user=user_create, hashed_password=hashed_password)
