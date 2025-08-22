from fastapi import APIRouter, Depends
from app.schemas.inference import InferenceRequest, InferenceResponse, AIAnalysisPayload, AIAnalysisResponse
from app.services.llm_service import LLMService
from app.config import settings

router = APIRouter()

def get_llm_service() -> LLMService:
    return LLMService(llm_server_url=settings.LLM_SERVER_URL)

@router.post("/summarize/", response_model=InferenceResponse)
async def summarize(request: InferenceRequest, llm: LLMService = Depends(get_llm_service)):
    """Calls the configured LLM server to generate a clinical summary."""
    summary = await llm.generate_summary(request.symptoms)
    return InferenceResponse(summary=summary)

@router.post("/analyze/", response_model=AIAnalysisResponse)
async def analyze_symptoms(request: AIAnalysisPayload, llm: LLMService = Depends(get_llm_service)):
    """Analyzes symptoms and returns a structured clinical analysis."""
    analysis = await llm.generate_analysis(symptoms=request.symptoms)
    return AIAnalysisResponse(**analysis)