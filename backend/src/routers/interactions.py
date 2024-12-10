from datetime import datetime
from typing import Annotated, Optional, List
from fastapi import APIRouter
from src.db import db
from prisma.models import CourseStudent, BookCourse
from pydantic import BaseModel
from typing import Annotated, Optional
from fastapi import APIRouter, Depends
from fastapi import HTTPException
from src.db import db
from prisma.models import User, CourseStudent, BookCourse, Course, Interaction


from prisma.enums import AccountType, InteractionType
from src.auth import get_user
from pydantic import BaseModel
from prisma.types import InteractionCreateInput


interactions_router = APIRouter()


class InteractionCreateRequest(BaseModel):
    interaction_type: InteractionType
    time_since_load: int
    user_id: Optional[int] = None
    question_id: Optional[int] = None
    answer: Optional[str] = None
    correct: Optional[bool] = None
    bookId: Optional[int] = None
    pageId: Optional[int] = None
    thumbsUp: Optional[bool] = None


class InteractionCreateResponse(BaseModel):
    id: int


@interactions_router.post("/interactions", tags=["interactions"])
async def create_interaction(
    interaction_data: InteractionCreateRequest,
) -> InteractionCreateResponse:
    try:
        interaction = await db.interaction.create(
            data={
                "interactionType": interaction_data.interaction_type,
                "date": datetime.now(),
                "timeSinceLoad": interaction_data.time_since_load,
                "answer": interaction_data.answer,
                "correct": interaction_data.correct,
                "questionId": interaction_data.question_id,
                "userId": interaction_data.user_id,
                "bookId": interaction_data.bookId,
                "pageId": interaction_data.pageId,
                "thumbsUp": interaction_data.thumbsUp,
            }
        )
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Unable to create interaction")

    return InteractionCreateResponse(id=interaction.id)
