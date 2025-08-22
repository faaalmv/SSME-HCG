import httpx
from fastapi import HTTPException


class LLMService:
    def __init__(self, llm_server_url: str):
        self.llm_server_url = llm_server_url

    async def generate_summary(self, text_input: str) -> str:
        # PASO 3: Prompt optimizado para un modelo Instruct como Phi-3
        prompt = f"""<|user|>
Analiza los siguientes síntomas y genera un único párrafo que los resuma de manera profesional en español. Tu respuesta debe ser únicamente el resumen clínico.
Síntomas: {text_input}
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
