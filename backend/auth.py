from fastapi import Security, HTTPException, status
from fastapi.security import APIKeyHeader
from db import get_mongo_db


api_key_header = APIKeyHeader(name="X-API-Key")


def check_api_key(api_key: str):
    db = get_mongo_db()
    users = db["users"]
    user = users.find_one({"token": api_key}, {"_id": 0})
    if user:
        return True
    return False


def get_user_from_api_key(api_key: str):
    db = get_mongo_db()
    users = db["users"]
    user = users.find_one({"token": api_key}, {"_id": 0})
    if user:
        return user
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid API key"
    )


def get_user(
    api_key_header: str = Security(api_key_header),
):
    if check_api_key(api_key_header):
        user = get_user_from_api_key(api_key_header)
        return user
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing or invalid API key"
    )
