import contextlib
import secrets
from fastapi import APIRouter, Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasicCredentials
from typing import Annotated
import uvicorn
from pydantic import BaseModel
from prisma.enums import AccountType
from prisma.models import User
import dotenv
from src.db import db
from src import routers

from src.auth import get_user

auth_router = APIRouter()


class SignupRequest(BaseModel):
    email: str
    username: str
    password: str
    account_type: AccountType


class LoginResponse(BaseModel):
    token: str


@auth_router.post("/signup", tags=["auth"])
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


@auth_router.get("/user/me", tags=["auth"])
async def get_user_data(user: Annotated[User, Depends(get_user)]) -> User:
    user_data = await db.user.find_first(where={"token": user.token})
    if not user_data:
        raise HTTPException(status_code=400, detail="User not found")
    return user_data


@auth_router.post("/login", tags=["auth"])
async def login(credentials: HTTPBasicCredentials) -> LoginResponse:
    user = await db.user.find_first(
        where={"email": credentials.username, "password": credentials.password}
    )
    if user:
        return LoginResponse(token=user.token)
    else:
        raise HTTPException(status_code=400, detail="Invalid credentials")
