from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    LLM_SERVER_URL: str

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
