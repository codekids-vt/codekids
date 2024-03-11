import json
from fastapi import APIRouter, HTTPException
from prisma import Json
from src.db import db
from prisma.models import Page
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
