from fastapi import FastAPI
from .database import engine, Base
from .api.endpoints import clinical_record_endpoints, audit_endpoints # Importar el nuevo router



app = FastAPI()

app.include_router(clinical_record_endpoints.router, prefix="/records", tags=["clinical-records"])
app.include_router(audit_endpoints.router, prefix="/audit", tags=["audit"]) # Registrar nuevo router