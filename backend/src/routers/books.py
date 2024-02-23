from fastapi import APIRouter, HTTPException
from src.db import db
from prisma.models import Book, Page
from typing import Optional, List
import logging

books_router = APIRouter()


@books_router.get("/books/search", response_model=List[Book], tags=["books"])
async def search_books(limit: int = 10):
    books = await db.book.find_many(take=limit, include={"courses": True})
    return books

@books_router.get("/books/{book_id}", response_model=Book, tags=["books"])
async def get_book(book_id: int):
    book = await db.book.find_unique(where={"id": book_id}, include={"pages": True})
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

logger = logging.getLogger(__name__)
books_router = APIRouter()

@books_router.get("/books/{book_id}/pages/{page_id}", response_model=Page, tags=["books"])
async def get_page(book_id: int, page_id: int):
    try:
        page = await db.page.find_first(
            where={"id": page_id, "bookId": book_id},
            include={"questions": True}  # Do not include 'props' here
        )
        if not page:
            raise HTTPException(status_code=404, detail="Page not found")
        return page
    except Exception as e:
        # Log the exception for debugging
        logger.error(f"Error fetching page: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@books_router.get("/books/{book_id}/pages", response_model=List[Page], tags=["books"])
async def list_pages(book_id: int):
    pages = await db.page.find_many(where={"bookId": book_id})
    return pages