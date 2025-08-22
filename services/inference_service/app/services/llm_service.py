import httpx
import json
from fastapi import HTTPException


class LLMService:
    def __init__(self, llm_server_url: str):
        self.llm_server_url = llm_server_url

    async def generate_summary(self, symptoms: str) -> str:
        # PASO 3: Prompt optimizado para un modelo Instruct como Phi-3
        prompt = f"""<|user|>
Analiza los siguientes síntomas y genera un único párrafo que los resuma de manera profesional en español. Tu respuesta debe ser únicamente el resumen clínico.
Síntomas: {symptoms}
<|assistant|>
Resumen clínico:"""

        payload = {
            # PASO 2: Usar el nuevo identificador de modelo
            "model": "phi-3-mini-4k-instruct",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.2, # Un poco más determinista
            "max_tokens": 250 # Podemos reducirlo un poco, ya que no habrá <think>
        }

        async with httpx.AsyncClient(timeout=90.0) as client:
            try:
                response = await client.post(self.llm_server_url, json=payload)
                response.raise_for_status()
                
                data = response.json()
                raw_content = data['choices'][0]['message']['content']

                # La lógica de parseo sigue siendo una buena defensa
                if "Resumen clínico:" in raw_content:
                    summary = raw_content.split("Resumen clínico:", 1)[1].strip()
                else:
                    summary = raw_content.strip()

                if not summary:
                     raise HTTPException(status_code=500, detail="El LLM devolvió un resumen vacío después del parseo.")

                return summary

            except httpx.TimeoutException:
                raise HTTPException(status_code=504, detail="Timeout: El servidor del LLM tardó demasiado en responder.")
            except httpx.RequestError as exc:
                raise HTTPException(status_code=503, detail=f"Error al contactar el servicio del LLM: {exc}")
            except (KeyError, IndexError):
                raise HTTPException(status_code=500, detail="Respuesta inesperada o mal formada del LLM.")

    async def generate_analysis(self, symptoms: str) -> dict:
        # Prompt Engineering para obtener una respuesta JSON estructurada
        prompt = f"""<|user|>
Actúa como un asistente de diagnóstico clínico. Analiza los siguientes síntomas y proporciona un análisis estructurado.
Tu respuesta DEBE ser únicamente un objeto JSON válido con las siguientes claves: "possible_conditions", "suggested_questions", "recommended_tests".
Cada clave debe contener un array de strings en español. No incluyas ningún otro texto o explicación fuera del JSON.

Síntomas: "{symptoms}"
<|assistant|>
"""
        payload = {
            "model": "phi-3-mini-4k-instruct",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.4,
            "max_tokens": 500,
            # Asegurar que el modelo intente devolver un JSON
            "response_format": {"type": "json_object"}
        }

        async with httpx.AsyncClient(timeout=90.0) as client:
            try:
                response = await client.post(self.llm_server_url, json=payload)
                response.raise_for_status()
                
                # Parsear la respuesta JSON
                data = response.json()
                analysis_content = json.loads(data['choices'][0]['message']['content'])

                # Validar que la estructura sea la esperada
                if not all(k in analysis_content for k in ["possible_conditions", "suggested_questions", "recommended_tests"]):
                    raise HTTPException(status_code=500, detail="La respuesta de la IA no tiene el formato esperado.")

                return analysis_content

            except (httpx.TimeoutException, httpx.RequestError) as exc:
                raise HTTPException(status_code=503, detail=f"Error al contactar el servicio del LLM: {exc}")
            except (KeyError, IndexError, json.JSONDecodeError):
                raise HTTPException(status_code=500, detail="Respuesta inesperada o mal formada del LLM.")
