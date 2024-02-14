from fastapi import APIRouter
from src.db import db


books_router = APIRouter()


@books_router.get("/books/", tags=["books"])
async def search_books(limit: int = 10):
    books = await db.book.find_many(take=limit, include={"courses": True})
    return books
