from pydantic_settings import BaseSettings
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env


class Settings(BaseSettings):

    SECRET_HASH_KEY: str
    DATABASE_PRISMA_URL: str

    POSTGRES_PASSWORD: str
    POSTGRES_USER: str
    POSTGRES_DB: str

    MINIO_ROOT_USER: str
    MINIO_ROOT_PASSWORD: str
    MINIO_DEFAULT_BUCKET: str
    MINIO_ENDPOINT: str
    MINIO_SECRET_KEY: str
    MINIO_ROOT_PASSWORD: str
    MINIO_ACCESS_KEY: str

    class Config:
        env_file = f".env"
        case_sensitive = True
        OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


settings: Settings = Settings()  # type: ignore
