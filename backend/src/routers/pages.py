from fastapi import APIRouter, HTTPException
from src.db import db
from prisma.models import Book, Page
from typing import Optional, List
from prisma.enums import BookCategory

pages_router = APIRouter()


# @pages_router.put("/pages", response_model=List[Book], tags=["pages"])
# async def search_pages(category: Optional[BookCategory] = None, limit: int = 10):
#     pages = await db.book.find_many(
#         take=limit,
#         include={"courses": True},
#         where={"category": category} if category else None,
#     )
#     return pages
