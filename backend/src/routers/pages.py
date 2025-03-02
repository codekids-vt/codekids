from fastapi import APIRouter, HTTPException
from prisma import Json
from src.db import db
from prisma.models import Page, Book
from prisma.partials import UpdatePage
import openai
import os
import json
from config import Config

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
        where={
            "pageNumber": {"gt": page_return.pageNumber},
            "bookId": page_return.bookId,
        }
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


@pages_router.post("/page/createhints", tags=["pages"])
async def create_page_with_gpt(
    bookId: int,
    content: list[str]
):
    """
    Creates a new page with GPT-generated hints.
    Stores up to 3 hints inside `props["gptHints"]`.
    """
    print(" in route")

    book = await db.book.find_unique(where={"id": bookId})
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    pages = await db.page.find_many(where={"bookId": bookId})
    pageNumber = max([p.pageNumber for p in pages]) + 1 if pages else 1

    gptHints = await generate_gpt_hints(bookId, content)

    page_return = await db.page.create(
        data={
            "bookId": bookId,
            "pageNumber": pageNumber,
            "content": Json(content),
            "image": "/images/blank.png",
            "props": Json({"gptHints": gptHints}),
        },
        include={"book": False},
    )

    if not page_return:
        raise HTTPException(status_code=500, detail="Page creation with GPT failed")

    return page_return

async def generate_gpt_hints(bookId: int, content: list[str]) -> list[dict]:
    """
    Calls GPT-4 to generate a maximum of 3 structured hints.
    Each hint consists of:
    - A statement
    - Two options (one correct, one incorrect)
    """

    system_message = (
        "You are an AI tutor for K-12 students. Generate a maximum of 3 structured hints "
        "based on the given content. Each hint must have: "
        "1. A statement related to the content. "
        "2. Two answer options (one correct, one incorrect). "
        "Return the response as a JSON array with a maximum of 3 objects."
    )

    user_message = f"""
    Book ID: {bookId}
    Content: {content}

    Generate hints in this structured format:
    [
      {{
        "statement": "...",
        "options": ["Correct Answer", "Incorrect Answer"]
      }},
      {{
        "statement": "...",
        "options": ["Correct Answer", "Incorrect Answer"]
      }},
      {{
        "statement": "...",
        "options": ["Correct Answer", "Incorrect Answer"]
      }}
    ]
    """

    try:
        response = await openai.ChatCompletion.acreate(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message},
            ],
            max_tokens=500,
           api_key= Config.OPENAI_API_KEY
        )

        gpt_text = response["choices"][0]["message"]["content"]
        hints = parse_gpt_hints(gpt_text)
        return hints

    except Exception as e:
        print("GPT-4 API Error:", e)
        return []


def parse_gpt_hints(gpt_text: str) -> list[dict]:
    """
    Parses GPT-4's response into structured hint sets.
    Ensures up to 3 structured hints are returned.
    """
    try:
        return json.loads(gpt_text)
    except:
        return []


