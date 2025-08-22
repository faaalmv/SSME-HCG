import httpx
from fastapi import HTTPException


class LLMService:
    def __init__(self, llm_server_url: str):
        self.llm_server_url = llm_server_url

    async def generate_summary(self, text_input: str) -> str:
        prompt = f"""Eres un asistente médico. Tu tarea es tomar la siguiente descripción de síntomas de un paciente y generar un resumen clínico conciso en un solo párrafo. No añadas saludos ni texto introductorio. Solo el resumen.

Síntomas: {text_input}

Resumen:"""

        payload = {
            "model": "qwen/qwen3-4b-thinking-2507",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.3,
            "max_tokens": 150,
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            try:
                response = await client.post(self.llm_server_url, json=payload)
                response.raise_for_status()

                data = response.json()
                summary = data['choices'][0]['message']['content']
                return summary.strip()

            except httpx.RequestError as exc:
                raise HTTPException(status_code=503, detail=f"Error al contactar el servicio del LLM: {exc}")
            except (KeyError, IndexError) as exc:
                raise HTTPException(status_code=500, detail=f"Respuesta inesperada del LLM: {exc}")
