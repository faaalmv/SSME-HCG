import httpx
from fastapi import HTTPException


class LLMService:
    def __init__(self, llm_server_url: str):
        self.llm_server_url = llm_server_url

    async def generate_summary(self, text_input: str) -> str:
        prompt = f"""Eres un experto en la redacción de resúmenes clínicos. Analiza los siguientes síntomas y genera un único párrafo que los resuma de manera profesional.
Tu respuesta DEBE contener ÚNICAMENTE el párrafo del resumen clínico. No debes incluir ningún texto de razonamiento, etiquetas XML/HTML como '<think>', ni preámbulos.

Síntomas del paciente:
{text_input}

Resumen clínico:"""

        payload = {
            "model": "qwen/qwen3-4b-thinking-2507",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.3,
            "max_tokens": 150
        }

        # PASO 2: Aumentar el timeout a 60 segundos
        async with httpx.AsyncClient(timeout=60.0) as client:
            try:
                response = await client.post(self.llm_server_url, json=payload)
                response.raise_for_status()
                
                data = response.json()
                raw_content = data['choices'][0]['message']['content']

                # PASO 3: Implementar el parseo robusto
                if "Resumen clínico:" in raw_content:
                    # Toma todo lo que viene después del delimitador
                    summary = raw_content.split("Resumen clínico:", 1)[1].strip()
                else:
                    # Si el delimitador no está, intenta usar la respuesta cruda como fallback
                    # (esto podría incluir el bloque <think>, pero es mejor que fallar)
                    summary = raw_content.strip()
                
                # Una capa extra de limpieza por si el modelo añade etiquetas <think> al final
                summary = summary.split("<think>")[0].strip()

                if not summary:
                     raise HTTPException(status_code=500, detail="El LLM devolvió un resumen vacío después del parseo.")

                return summary

            except httpx.TimeoutException:
                raise HTTPException(status_code=504, detail="Timeout: El servidor del LLM tardó demasiado en responder.")
            except httpx.RequestError as exc:
                raise HTTPException(status_code=503, detail=f"Error al contactar el servicio del LLM: {exc}")
            except (KeyError, IndexError):
                raise HTTPException(status_code=500, detail="Respuesta inesperada o mal formada del LLM.")
