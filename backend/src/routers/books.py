from typing import Optional, List
from fastapi import APIRouter
from src.db import db
from prisma.models import CourseStudent, BookCourse
from pydantic import BaseModel


class CourseCreate(BaseModel):
    title: str
    teacherId: int
    students: Optional[List[CourseStudent]] = None
    books: Optional[List[BookCourse]] = None


books_router = APIRouter()


@books_router.get("/books/", tags=["books"])
async def search_books(limit: int = 10):
    books = await db.book.find_many(take=limit, include={"courses": True})
    return books
