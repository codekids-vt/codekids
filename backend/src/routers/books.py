import re
from typing import Annotated, List, Optional

from fastapi import APIRouter, Depends, HTTPException
from prisma import Json
from prisma.enums import AccountType, BookCategory
from prisma.models import Book, User
from prisma.types import BookUpdateInput, BookWhereInput
from pydantic import BaseModel
from src.auth import get_user
from src.db import db

books_router = APIRouter()


class SearchBooksRequest(BaseModel):
    categories: Optional[List[BookCategory]] = None
    limit: Optional[int] = 100
    owner_id: Optional[int] = None
    published: Optional[bool] = None
    query: Optional[str] = None


LEVEL_CATEGORIES = [
    BookCategory.BEGINNER,
    BookCategory.INTERMEDIATE,
    BookCategory.ADVANCED,
]


@books_router.post("/books/search", tags=["books"])
async def search_books(
    req: SearchBooksRequest,
) -> List[Book]:
    where: BookWhereInput = {}
    if req.categories:
        level_cats = [cat for cat in req.categories if cat in LEVEL_CATEGORIES]
        non_level_cats = [cat for cat in req.categories if cat not in LEVEL_CATEGORIES]
        where["AND"] = []
        if level_cats:
            where["AND"].append({"categories": {"has_some": level_cats}})
        if non_level_cats:
            where["AND"].append({"categories": {"has_some": non_level_cats}})
    if req.owner_id:
        where["ownerId"] = req.owner_id
    if req.published is not None:
        where["published"] = req.published

    books = await db.book.find_many(
        take=req.limit,
        include={"courses": True, "pages": True},
        where=where,
    )

    if req.query:
        filtered_and_sorted_books = [
            book
            for book, _ in sorted(
                [
                    (
                        book,
                        len(
                            re.findall(
                                req.query,
                                (
                                    book.title
                                    + book.author
                                    + (book.blurb if book.blurb else "")
                                    + "".join(book.tags)
                                    + "".join(
                                        [a for page in book.pages for a in page.content]
                                    )
                                    if book.pages
                                    else ""
                                ),
                                re.IGNORECASE,
                            )
                        ),
                    )
                    for book in books
                ],
                key=lambda x: x[1],
                reverse=True,
            )
            if _ > 0
        ]
        return filtered_and_sorted_books

    return books


@books_router.get("/books/{book_id}", tags=["books"])
async def get_book(book_id: int) -> Book:
    book = await db.book.find_unique(where={"id": book_id}, include={"pages": True})
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


@books_router.get("/book-topics", tags=["books"])
async def get_unique_book_topics() -> List[str]:
    books = await db.book.find_many()
    unique_topics = set(book.bookTopic for book in books if book.bookTopic)
    return list(unique_topics)


class CreateBookRequest(BaseModel):
    title: str
    categories: list[BookCategory] = []
    bookTopic: Optional[str] = None
    tags: list[str] = []
    bookCover: Optional[str] = None
    coverImage: Optional[str] = None
    author: Optional[str] = None
    blurb: Optional[str] = None
    readyForPublish: Optional[bool] = False


@books_router.post("/books", tags=["books"])
async def create_book(
    req: CreateBookRequest,
    user: Annotated[User, Depends(get_user)],
) -> Book:
    if not user or user.type != AccountType.TEACHER or user.name is None:
        raise HTTPException(status_code=401, detail="Unauthorized")
    book = await db.book.create(
        {
            "author": user.name,
            "bookCover": "/color_2.png",
            "title": req.title,
            "categories": req.categories,
            "bookTopic": req.bookTopic,
            "tags": req.tags,
            "ownerId": user.id,
        }
    )
    await db.page.create(
        {
            "bookId": book.id,
            "content": Json(["This is the first page of the book"]),
            "image": "/images/blank.png",
            "pageNumber": 1,
        }
    )
    return book


@books_router.put("/books/{book_id}", tags=["books"])
async def edit_book(
    book_id: int,
    req: CreateBookRequest,
    user: Annotated[User, Depends(get_user)],
) -> Book:
    if not user or user.type != AccountType.TEACHER or user.name is None:
        raise HTTPException(status_code=401, detail="Unauthorized")
    book = await db.book.find_unique(where={"id": book_id})
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    if book.ownerId != user.id:
        raise HTTPException(status_code=401, detail="Unauthorized")
    book_update_data: BookUpdateInput = {
        "title": req.title,
        "categories": req.categories,
        "tags": req.tags,
    }
    if req.bookCover:
        book_update_data["bookCover"] = req.bookCover
    if req.coverImage:
        book_update_data["coverImage"] = req.coverImage
    if req.author:
        book_update_data["author"] = req.author
    if req.blurb:
        book_update_data["blurb"] = req.blurb
    if req.readyForPublish is not None:
        book_update_data["readyForPublish"] = req.readyForPublish
    if req.bookTopic:
        book_update_data["bookTopic"] = req.bookTopic
    book = await db.book.update(
        where={"id": book_id},
        data=book_update_data,
    )
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book
    return book
