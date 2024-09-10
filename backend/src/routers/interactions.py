from prisma import Prisma
from datetime import datetime
from typing import Annotated, Optional, List
from fastapi import APIRouter, BackgroundTasks, HTTPException, Depends
from src.db import db
from prisma.models import CourseStudent, BookCourse, UserBookScore
from pydantic import BaseModel
from fastapi import APIRouter, Depends
from prisma.models import User, CourseStudent, BookCourse, Course, Interaction
from prisma.enums import AccountType, InteractionType
from src.auth import get_user
from prisma.types import InteractionCreateInput
import numpy as np

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

class InteractionCreateResponse(BaseModel):
    id: int

alpha = 0.1
gamma = 0.6
epsilon = 0.1
Q = {}

def get_state(interaction_data: InteractionCreateRequest):
    return (interaction_data.user_id, interaction_data.bookId, interaction_data.pageId)

def get_action():
    if np.random.uniform(0, 1) < epsilon:
        return "explore"
    else:
        return "exploit"

def update_q_table(state, action, reward, next_state):
    if state not in Q:
        Q[state] = {}
    if action not in Q[state]:
        Q[state][action] = 0

    max_future_q = max(Q[next_state].values()) if next_state in Q else 0
    current_q = Q[state][action]

    Q[state][action] = current_q + alpha * (reward + gamma * max_future_q - current_q)

def calculate_score(interaction_data: InteractionCreateRequest) -> float:
    state = get_state(interaction_data)
    action = get_action()
    reward = 10.0 if interaction_data.correct else -5.0

    next_state = get_state(interaction_data)  #Placeholder for now, define accordingly!!!

    update_q_table(state, action, reward, next_state)

    return reward

async def run_ml_inference(interaction_data: InteractionCreateRequest):
    score = calculate_score(interaction_data)

    existing_score = await db.userbookscore.find_first(
        where={"userId": interaction_data.user_id, "bookId": interaction_data.bookId}
    )
    if existing_score:
        new_score = existing_score.score + score
        await db.userbookscore.update(
            where={"id": existing_score.id},
            data={"score": new_score}
        )
    else:
        await db.userbookscore.create(
            data={
                "userId": interaction_data.user_id,
                "bookId": interaction_data.bookId,
                "score": score,
            },
        )

@interactions_router.post("/interactions", tags=["interactions"])
async def create_interaction(
    interaction_data: InteractionCreateRequest,
    background_tasks: BackgroundTasks
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
            }
        )
        background_tasks.add_task(run_ml_inference, interaction_data)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Unable to create interaction")

    return InteractionCreateResponse(id=interaction.id)
