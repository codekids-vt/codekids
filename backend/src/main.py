import contextlib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import dotenv
from src.db import db
from src import routers


dotenv.load_dotenv()


@contextlib.asynccontextmanager
async def lifespan(app: FastAPI):
    await db.connect()
    yield
    await db.disconnect()


app = FastAPI(title="CodeKids API", docs_url="/", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(routers.courses_router)
app.include_router(routers.books_router)
app.include_router(routers.auth_router)
app.include_router(routers.interactions_router)
app.include_router(routers.pages_router)
app.include_router(routers.image_router)
app.include_router(routers.chatbot_router)

if __name__ == "__main__":
    uvicorn.run("src.main:app", host="localhost", port=8080, reload=True)
