import hashlib
import hmac
import secrets
from typing import Annotated, Optional

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBasicCredentials
from prisma.enums import AccountType
from prisma.models import User
from prisma.partials import UserLightNoPassword
from pydantic import BaseModel
from src.auth import get_user
from src.config import settings
from src.db import db

auth_router = APIRouter()


class SignupRequest(BaseModel):
    email: str
    username: str
    password: str
    account_type: AccountType


class LoginResponse(BaseModel):
    token: str


class UpdateUserRequest(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None


@auth_router.post("/signup", tags=["auth"])
async def signup(req: SignupRequest) -> UserLightNoPassword:
    user = await db.user.find_first(where={"email": req.email})
    if user:
        raise HTTPException(status_code=400, detail="User already exists")
    else:
        token = secrets.token_urlsafe(32)
        password_hash = hmac.new(
            settings.SECRET_HASH_KEY.encode(), req.password.encode(), hashlib.sha256
        )

        user = await UserLightNoPassword.prisma().create(
            {
                "token": token,
                "type": req.account_type,
                "name": req.username,
                "email": req.email,
                "password": password_hash.hexdigest(),
            }
        )
        return user


@auth_router.get("/user/me", tags=["auth"])
async def get_user_data(
    user: Annotated[User, Depends(get_user)],
) -> UserLightNoPassword:
    user_data = await UserLightNoPassword.prisma().find_first(
        where={"token": user.token}
    )
    if not user_data:
        raise HTTPException(status_code=400, detail="User not found")
    return user_data


@auth_router.put("/user/me", tags=["auth"])
async def update_user_data(
    user: Annotated[User, Depends(get_user)], update_data: UpdateUserRequest
):
    update_fields = {}
    if update_data.username is not None:
        update_fields["name"] = update_data.username
    if update_data.email is not None:
        update_fields["email"] = update_data.email
    if update_data.password is not None:
        password_hash = hmac.new(
            settings.SECRET_HASH_KEY.encode(),
            update_data.password.encode(),
            hashlib.sha256,
        ).hexdigest()
        update_fields["password"] = password_hash

    updated_user = await db.user.update(
        where={"id": user.id}, data={"name": update_data.username}
    )
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user


@auth_router.delete("/user/me", tags=["auth"])
async def delete_user_account(user: Annotated[User, Depends(get_user)]):
    await db.user.delete(where={"id": user.id})
    return {"message": "User deleted successfully"}


@auth_router.post("/login", tags=["auth"])
async def login(credentials: HTTPBasicCredentials) -> UserLightNoPassword:
    password_hash = hmac.new(
        settings.SECRET_HASH_KEY.encode(), credentials.password.encode(), hashlib.sha256
    )
    user = await UserLightNoPassword.prisma().find_first(
        where={"email": credentials.username, "password": password_hash.hexdigest()},
    )
    if user:
        return user
    else:
        raise HTTPException(status_code=400, detail="Invalid credentials")
