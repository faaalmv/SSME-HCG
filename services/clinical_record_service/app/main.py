from fastapi import FastAPI
from .database import engine, Base
from .models.clinical_record import ClinicalRecord
from .models.audit_log import AuditLog

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/healthcheck")
def read_root():
    return {"status": "ok"}
