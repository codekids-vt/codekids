from fastapi import APIRouter, HTTPException
from prisma import Json
from src.db import db
from prisma.models import Page, Book
from prisma.partials import UpdatePage

pages_router = APIRouter()


@pages_router.put("/page/{page_id}", tags=["pages"])
async def page_update(page_id: int, page: UpdatePage) -> Page:
    print(page)
    page_return = await db.page.update(
        where={"id": page_id},
        data={
            "content": Json(page.content),
            "image": page.image,
            "props": Json(page.props),
        },
    )
    if page_return:
        return page_return
    raise HTTPException(status_code=404, detail="Update failed")


@pages_router.post("/page", tags=["pages"])
async def page_create(bookId: int) -> Page:
    pages = await db.page.find_many(where={"bookId": bookId})
    pageNumber = max([page.pageNumber for page in pages]) + 1 if pages else 1

    page_return = await db.page.create(
        data={
            "bookId": bookId,
            "pageNumber": pageNumber,
            "content": Json([""]),
            "image": "/images/blank.png",
            "props": Json({}),
        },
        include={"book": False},
    )
    if page_return:
        return page_return
    raise HTTPException(status_code=404, detail="Create failed")


@pages_router.delete("/page/{page_id}", tags=["pages"])
async def page_delete(page_id: int) -> Book:
    page_return = await db.page.delete(where={"id": page_id})
    if not page_return:
        raise HTTPException(status_code=404, detail="Delete failed")

    # now move all pages with higher pageNumber down
    pages = await db.page.find_many(
        where={"pageNumber": {"gt": page_return.pageNumber}}
    )
    async with db.tx() as transaction:
        for page in pages:
            await transaction.page.update(
                where={"id": page.id}, data={"pageNumber": page.pageNumber - 1}
            )
    book = await db.book.find_unique(
        where={"id": page_return.bookId}, include={"pages": True}
    )
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book


@pages_router.put("/page/swap/{page_id1}/{page_id2}", tags=["pages"])
async def page_swap(page_id1: int, page_id2: int) -> Book:
    page1 = await db.page.find_unique(where={"id": page_id1})
    page2 = await db.page.find_unique(where={"id": page_id2})
    if page1 and page2:
        async with db.tx() as transaction:
            res1 = await transaction.page.update(
                where={"id": page_id1}, data={"pageNumber": page2.pageNumber}
            )
            if not res1:
                raise ValueError("Swap failed")
            res2 = await transaction.page.update(
                where={"id": page_id2}, data={"pageNumber": page1.pageNumber}
            )
            if not res2:
                raise ValueError("Swap failed")
        book = await db.book.find_unique(
            where={"id": page1.bookId}, include={"pages": True}
        )
        if book:
            return book
    raise HTTPException(status_code=404, detail="Swap failed")
