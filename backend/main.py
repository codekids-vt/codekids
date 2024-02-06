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
import contextlib
import dotenv

dotenv.load_dotenv()

from auth import get_user
from db import get_mongo_db

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
    birth_date: date


class LoginResponse(BaseModel):
    token: str


class User(BaseModel):
    id: str
    username: str
    birth_date: str
    email: str
    password: str
    token: str


@app.post("/signup")
async def signup(
    signup_data: SignupRequest, db: Annotated[Database, Depends(get_mongo_db)]
) -> LoginResponse:
    users = db["users"]
    user = users.find_one({"username": signup_data.username}, {"_id": 0})
    if user:
        raise HTTPException(status_code=400, detail="User already exists")
    else:
        id = secrets.token_urlsafe(16)
        token = secrets.token_urlsafe(16)
        user = User(
            id=id,
            username=signup_data.username,
            birth_date=signup_data.birth_date.strftime("%Y-%m-%d"),
            email=signup_data.email,
            password=signup_data.password,
            token=token,
        )
        users.insert_one(user.model_dump())
        return LoginResponse(token=token)


@app.get("/user/me")
async def get_user_data(
    user: Annotated[dict, Depends(get_user)],
    db: Annotated[Database, Depends(get_mongo_db)],
) -> User:
    users = db["users"]
    user_data = User.model_validate(users.find_one({"id": user["id"]}, {"_id": 0}))
    return user_data


@app.post("/login")
async def login(
    credentials: HTTPBasicCredentials, db: Annotated[Database, Depends(get_mongo_db)]
) -> LoginResponse:
    users = db["users"]
    user = users.find_one(
        {"username": credentials.username, "password": credentials.password}, {"_id": 0}
    )
    if user:
        return LoginResponse(token=user["token"])
    else:
        raise HTTPException(status_code=400, detail="Invalid credentials")


if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8080, reload=True)
