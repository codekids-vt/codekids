from datetime import date, datetime
from enum import Enum
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
import dotenv

dotenv.load_dotenv()

from auth import get_user
from db import get_db

app = FastAPI(title="CodeKids API", docs_url="/")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SignupRequest(BaseModel):
    email: str
    username: str
    password: str
    account_type: AccountType


class LoginResponse(BaseModel):
    token: str


@app.post("/signup", tags=["auth"])
async def signup(
    req: SignupRequest, db: Annotated[Prisma, Depends(get_db)]
) -> LoginResponse:
    user = db.user.find_first(where={"email": req.email})
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


# @app.get("/user/me")
# async def get_user_data(
#     user: Annotated[dict, Depends(get_user)],
#     db: Annotated[Prisma, Depends(get_db)],
# ) -> User:
#     users = db["users"]
#     user_data = User.model_validate(users.find_one({"id": user["id"]}, {"_id": 0}))
#     return user_data


@app.post("/login", tags=["auth"])
async def login(
    credentials: HTTPBasicCredentials, db: Annotated[Prisma, Depends(get_db)]
) -> LoginResponse:
    user = await db.user.find_first(
        where={"email": credentials.username, "password": credentials.password}
    )
    if user:
        return LoginResponse(token=user.token)
    else:
        raise HTTPException(status_code=400, detail="Invalid credentials")


if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8080, reload=True)
