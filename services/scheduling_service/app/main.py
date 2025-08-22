from fastapi import FastAPI
from .database import engine, Base
from .api.endpoints import appointment_endpoints

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    Base.metadata.create_all(bind=engine)

app.include_router(appointment_endpoints.router, prefix="/api/v1", tags=["appointments"])

@app.get("/health")
async def health_check():
    return {"status": "ok"}