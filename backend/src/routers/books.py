from fastapi import APIRouter, HTTPException
from src.db import db
from prisma.models import Book, Page
from typing import Optional, List
from prisma.enums import BookCategory

books_router = APIRouter()


@books_router.get("/books", response_model=List[Book], tags=["books"])
async def search_books(category: Optional[BookCategory], limit: int = 10):
    books = await db.book.find_many(take=limit, include={"courses": True})
    return books


@books_router.get("/books/{book_id}", response_model=Book, tags=["books"])
async def get_book(book_id: int):
    book = await db.book.find_unique(where={"id": book_id}, include={"pages": True})
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


@books_router.get("/pages/{book_id}/{page_id}", response_model=Page, tags=["books"])
async def get_page(book_id: int, page_id: int):
    try:
        page = await db.page.find_first(
            where={"id": page_id, "bookId": book_id},
            include={"questions": True},  # Do not include 'props' here
        )
        if not page:
            raise HTTPException(status_code=404, detail="Page not found")
        return page
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
