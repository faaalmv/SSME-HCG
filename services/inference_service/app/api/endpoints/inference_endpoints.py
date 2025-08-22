from fastapi import APIRouter
from app.schemas.inference import InferenceRequest, InferenceResponse

router = APIRouter()

@router.post("/summarize/", response_model=InferenceResponse)
def summarize(request: InferenceRequest):
    """
    Accepts text input and returns a mocked summary.
    This endpoint simulates the behavior of the real inference service.
    """
    return InferenceResponse(summary="Este es un resumen mockeado generado por el servicio de inferencia.")
