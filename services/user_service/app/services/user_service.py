from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate
from app.security import get_password_hash, verify_password, create_access_token, create_refresh_token, verify_token

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

    def authenticate_user(self, db: Session, email: str, password: str):
        db_user = self.user_repository.get_by_email(db, email=email)
        if not db_user or not verify_password(password, db_user.hashed_password):
            return None
        
        token_data = {"sub": db_user.email, "role": db_user.role.value, "user_id": db_user.id}
        access_token = create_access_token(data=token_data)
        refresh_token = create_refresh_token(data=token_data)

        return {
            "access_token": access_token, 
            "refresh_token": refresh_token,
            "token_type": "bearer", 
            "user": db_user
        }

    def refresh_token(self, db: Session, token: str):
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        email = verify_token(token, credentials_exception)
        user = self.user_repository.get_by_email(db, email)
        if not user:
            raise credentials_exception
        
        access_token = create_access_token(data={"sub": user.email, "role": user.role.value})
        return {"access_token": access_token}
