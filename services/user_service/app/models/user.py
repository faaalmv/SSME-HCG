# user-service/app/models.py

from sqlalchemy import Column, Integer, String, Boolean, Enum as SQLAlchemyEnum
from .database import Base
import enum

class UserRole(str, enum.Enum):
    employee = "employee"
    medical_staff = "medical_staff"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    role = Column(SQLAlchemyEnum(UserRole), nullable=False)