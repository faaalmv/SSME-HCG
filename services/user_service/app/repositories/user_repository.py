from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate

class UserRepository:
    """Repository for user related database operations."""

    def get_by_email(self, db: Session, email: str) -> User | None:
        """Get a user by email."""
        return db.query(User).filter(User.email == email).first()

    def create(self, db: Session, user: UserCreate, hashed_password: str) -> User:
        """Create a new user."""
        db_user = User(
            email=user.email,
            hashed_password=hashed_password,
            role=user.role,
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
