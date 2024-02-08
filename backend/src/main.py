import contextlib
from datetime import date, datetime
import secrets
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasicCredentials
import os
from typing import Annotated, Optional, Type
import uvicorn
from pydantic import BaseModel
from prisma import Prisma
from prisma.enums import AccountType
from prisma.models import User
import dotenv
from src.db import db


dotenv.load_dotenv()
from src.auth import get_user


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
#app.include_router(courses.courses_router)


class SignupRequest(BaseModel):
    email: str
    username: str
    password: str
    account_type: AccountType


class LoginResponse(BaseModel):
    token: str


@app.post("/signup", tags=["auth"])
async def signup(req: SignupRequest) -> LoginResponse:
    user = await db.user.find_first(where={"email": req.email})
    if user:
        raise HTTPException(status_code=400, detail="User already exists")
    else:
        token = secrets.token_urlsafe(16)
        await db.user.create(
            {
                "token": token,
                "type": req.account_type,
                "name": req.username,
                "email": req.email,
                "password": req.password,
            }
        )
        return LoginResponse(token=token)


@app.get("/user/me", tags=["auth"])
async def get_user_data(user: Annotated[User, Depends(get_user)]) -> User:
    user_data = await db.user.find_first(where={"token": user.token})
    if not user_data:
        raise HTTPException(status_code=400, detail="User not found")
    return user_data


@app.post("/login", tags=["auth"])
async def login(credentials: HTTPBasicCredentials) -> LoginResponse:
    user = await db.user.find_first(
        where={"email": credentials.username, "password": credentials.password}
    )
    if user:
        return LoginResponse(token=user.token)
    else:
        raise HTTPException(status_code=400, detail="Invalid credentials")


if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8080, reload=True)
