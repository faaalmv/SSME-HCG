from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.user_service import UserService
from app.repositories.user_repository import UserRepository
from app.schemas.user import User, UserCreate, Token

router = APIRouter()

user_repository = UserRepository()
user_service = UserService(user_repository)

@router.post("/", response_model=User, status_code=201)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    """Create a new user."""
    from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.user_service import UserService
from app.repositories.user_repository import UserRepository
from app.schemas.user import User, UserCreate, Token
from pydantic import BaseModel

class RefreshRequest(BaseModel):
    refresh_token: str

router = APIRouter()

user_repository = UserRepository()
user_service = UserService(user_repository)

@router.post("/", response_model=User, status_code=201)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    """Create a new user."""
    return user_service.create_user(db=db, user=user)

@router.post("/login", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Logs in a user and returns a JWT token."""
    # Nota: OAuth2PasswordRequestForm usa 'username', lo mapeamos a 'email'
    auth_data = user_service.authenticate_user(db, email=form_data.username, password=form_data.password)
    if not auth_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return auth_data

# --- NUEVO ENDPOINT DE REFRESH ---
@router.post("/refresh")
def refresh_access_token(request: RefreshRequest, db: Session = Depends(get_db)):
    """Refreshes an access token."""
    return user_service.refresh_token(db, token=request.refresh_token)

@router.post("/login", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Logs in a user and returns a JWT token."""
    # Nota: OAuth2PasswordRequestForm usa 'username', lo mapeamos a 'email'
    auth_data = user_service.authenticate_user(db, email=form_data.username, password=form_data.password)
    if not auth_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return auth_data
