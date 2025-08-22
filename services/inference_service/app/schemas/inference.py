from pydantic import BaseModel

class InferenceRequest(BaseModel):
    symptoms: str

class InferenceResponse(BaseModel):
    summary: str