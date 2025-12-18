from pydantic_settings import BaseSettings


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
    MINIO_ACCESS_KEY: str

    OPENAI_API_KEY: str
    CHATGPT_MODEL: str

    DEV_MODE: bool = False

    class Config:
        env_file = ".env"
        case_sensitive = True


settings: Settings = Settings()  # type: ignore
