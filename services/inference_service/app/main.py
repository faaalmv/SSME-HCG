from fastapi import FastAPI
from app.api.endpoints import inference_endpoints

app = FastAPI()

app.include_router(inference_endpoints.router, prefix="/inference", tags=["inference"])
