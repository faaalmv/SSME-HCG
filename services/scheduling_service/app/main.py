from fastapi import FastAPI
from .database import engine, Base
from .api.endpoints import appointment_endpoints

app = FastAPI()



app.include_router(appointment_endpoints.router, prefix="/appointments", tags=["appointments"])

@app.get("/health")
async def health_check():
    return {"status": "ok"}