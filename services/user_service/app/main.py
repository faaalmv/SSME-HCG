from fastapi import FastAPI
from .database import engine, Base
from .api.endpoints.user_endpoints import user_router



app = FastAPI(title="User Service")

app.include_router(user_router, prefix="/api/users", tags=["users"])

@app.get("/")
def read_root():
    return {"message": "User Service is running"}