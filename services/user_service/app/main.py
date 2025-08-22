from fastapi import FastAPI
from .database import engine, Base
from .api.endpoints import user_endpoints

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user_endpoints.router, prefix="/users", tags=["users"])