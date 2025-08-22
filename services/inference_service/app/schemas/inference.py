from pydantic import BaseModel
from typing import List

# --- Esquemas existentes para /summarize ---
class InferenceRequest(BaseModel):
    symptoms: str

class InferenceResponse(BaseModel):
    summary: str

# --- NUEVOS ESQUEMAS PARA /analyze ---
class AIAnalysisPayload(BaseModel):
    symptoms: str

class AIAnalysisResponse(BaseModel):
    possible_conditions: List[str]
    suggested_questions: List[str]
    recommended_tests: List[str]