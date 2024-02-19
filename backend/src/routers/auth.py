import hmac
import hashlib
import secrets
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBasicCredentials
from typing import Annotated
from pydantic import BaseModel
from prisma.enums import AccountType
from prisma.models import User
from src.db import db
from src.config import settings

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
        token = secrets.token_urlsafe(32)
        password_hash = hmac.new(
            settings.SECRET_HASH_KEY.encode(), req.password.encode(), hashlib.sha256
        )
        await db.user.create(
            {
                "token": token,
                "type": req.account_type,
                "name": req.username,
                "email": req.email,
                "password": password_hash.hexdigest(),
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
    password_hash = hmac.new(
        settings.SECRET_HASH_KEY.encode(), credentials.password.encode(), hashlib.sha256
    )
    user = await db.user.find_first(
        where={"email": credentials.username, "password": password_hash.hexdigest()}
    )
    if user:
        return LoginResponse(token=user)
    else:
        raise HTTPException(status_code=400, detail="Invalid credentials")
