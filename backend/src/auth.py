from fastapi import Security, HTTPException, status
from fastapi.security import APIKeyHeader
from src.db import db


api_key_header = APIKeyHeader(name="X-API-Key")


async def check_api_key(api_key: str):
    user = await db.user.find_first(where={"token": api_key})
    if user:
        return True
    return False


async def get_user_from_api_key(api_key: str):
    user = await db.user.find_first(where={"token": api_key})
    if user:
        return user
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid API key"
    )


async def get_user(
    api_key_header: str = Security(api_key_header),
):
    if check_api_key(api_key_header):
        return await get_user_from_api_key(api_key_header)
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing or invalid API key"
    )
