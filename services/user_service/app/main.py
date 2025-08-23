from fastapi import FastAPI
from .database import engine, Base
from .api.endpoints import user_endpoints

Base.metadata.create_all(bind=engine)

app = FastAPI(title="User Service")

# --- INICIO DEL CÓDIGO DE PRUEBA ---
@app.get("/api/users/test")
def test_endpoint():
    return {"status": "test endpoint is working"}
# --- FIN DEL CÓDIGO DE PRUEBA ---

app.include_router(user_endpoints.router)

@app.get("/")
def read_root():
    return {"message": "User Service is running"}