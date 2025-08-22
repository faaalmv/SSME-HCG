from fastapi import FastAPI
from .database import engine, Base
from .api.endpoints import clinical_record_endpoints

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(clinical_record_endpoints.router, prefix="/records", tags=["clinical-records"])