from pydantic import BaseModel

class InferenceRequest(BaseModel):
    text_input: str

class InferenceResponse(BaseModel):
    summary: str
