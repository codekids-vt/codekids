from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    SECRET_HASH_KEY: str
    DATABASE_PRISMA_URL: str

    POSTGRES_PASSWORD: str
    POSTGRES_USER: str
    POSTGRES_DB: str

    class Config:
        env_file = f".env"
        case_sensitive = True


settings: Settings = Settings()  # type: ignore
