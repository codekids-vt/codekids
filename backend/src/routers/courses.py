from typing import Annotated, Optional
from fastapi import APIRouter, Depends
from fastapi import HTTPException
from src.db import db
from prisma.models import User, CourseStudent, BookCourse, Course


from prisma.enums import AccountType
from src.auth import get_user
from pydantic import BaseModel


class CourseCreate(BaseModel):
    title: str
    teacherId: int
    students: Optional[list[CourseStudent]] = None
    books: Optional[list[BookCourse]] = None


courses_router = APIRouter()


class CourseCreateRequest(BaseModel):
    title: str
    studentIds: list[int]
    bookIds: list[int]


@courses_router.post("/courses", tags=["courses"])
async def create_course(
    user: Annotated[User, Depends(get_user)], course_data: CourseCreateRequest
) -> Course:
    if user.type != AccountType.TEACHER:
        raise HTTPException(status_code=403, detail="Forbidden")
    for student_id in course_data.studentIds:
        student = await db.user.find_unique(where={"id": student_id})
        if student is None or student.type != AccountType.STUDENT:
            raise HTTPException(status_code=400, detail="Invalid student ID")
    for book_id in course_data.bookIds:
        book = await db.book.find_unique(where={"id": book_id})
        if book is None:
            raise HTTPException(status_code=400, detail="Invalid book ID")
    try:
        course = await db.course.create(
            data={
                "title": course_data.title,
                "teacher": {"connect": {"id": user.id}},
                "books": {"connect": [{"id": id} for id in course_data.bookIds]},
                "students": {"connect": [{"id": id} for id in course_data.studentIds]},
            },
            include={"students": True, "books": True, "teacher": True},
        )
        return course
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Invalid course data")


@courses_router.get("/courses/{course_id}", tags=["courses"])
async def get_course(course_id: int) -> Course:
    course = await db.course.find_unique(
        where={"id": course_id},
        include={"students": True, "books": True, "teacher": True},
    )
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


@courses_router.get("/courses", tags=["courses"])
async def get_courses(user: Annotated[User, Depends(get_user)]) -> list[Course]:
    if user.type == AccountType.TEACHER:
        courses = await db.course.find_many(where={"teacherId": user.id})
    elif user.type == AccountType.STUDENT:
        courses = await db.course.find_many(
            where={"students": {"some": {"student": {"id": user.id}}}},
            include={"students": True, "books": True, "teacher": True},
        )
    else:
        raise HTTPException(status_code=403, detail="Forbidden")
    return courses
