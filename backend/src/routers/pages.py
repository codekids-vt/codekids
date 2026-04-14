import json

from fastapi import APIRouter, HTTPException
from openai import AsyncOpenAI
from prisma import Json
from prisma.models import Book, Page
from prisma.partials import UpdatePage
from src.config import settings
from src.db import db

pages_router = APIRouter()
client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)


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
    pageId: int,
):
    """
    Creates a new page with GPT-generated hints.
    Stores up to 3 hints inside `props["gptHints"]`.
    """
    print("In route")

    book = await db.book.find_unique(where={"id": bookId}, include={"pages": True})
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    print("Book data ", book)
    title = book.title
    print("Book Title ", title)

    # Get the specific page content
    print("Page Block")
    page = await db.page.find_first(
        where={"pageNumber": pageId, "bookId": bookId}, include={"questions": True}
    )
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    print("Page data ", page)  # content, questions, and answers
    content = page.content
    print("Content", content)

    print("Props Block")
    raw_props = page.props
    if isinstance(raw_props, str):
        try:
            props_dict = json.loads(raw_props)
        except Exception:
            props_dict = {}
    elif isinstance(raw_props, dict):
        props_dict = raw_props
    else:
        props_dict = {}

    props = dict(props_dict)
    print(json.dumps(props_dict, indent=2))
    content_lines = [c for c in content if isinstance(c, str)] if isinstance(content, list) else []
    content_question = next(
        (line.strip() for line in content_lines if "?" in line and line.strip()),
        "",
    )
    question_from_page = (
        page.questions[0].question
        if page.questions and getattr(page.questions[0], "question", "")
        else ""
    )

    question_text = (
        props_dict.get("question")
        or question_from_page
        or content_question
        or ""
    )
    print("Question", question_text)
    follow_up_question = props_dict.get("followUpQuestion", "")
    follow_up_answers = props_dict.get("followUpAnswers", [])
    follow_up_options = [a.get("answerText", "") for a in follow_up_answers]
    follow_up_correct_answer = next(
        (a.get("answerText") for a in follow_up_answers if a.get("correct")), ""
    )
    print("Follow-Up Question:", follow_up_question)
    print("Follow-Up Options:", follow_up_options)
    print("Follow-Up Correct Answer:", follow_up_correct_answer)
    code = props_dict.get("code", "No Code")
    print("Code", code)

    print("Answer Block")
    answer_options = [a.get("answerText", "") for a in props_dict.get("answers", [])]
    correct_answer: str = next(
        (
            a.get("answerText")
            for a in props_dict.get("answers", [])
            if a.get("correct")
        ),
        "",
    )
    if not answer_options and page.questions and getattr(page.questions[0], "options", None):
        answer_options = page.questions[0].options
    if not correct_answer and page.questions and getattr(page.questions[0], "answer", None):
        correct_answer = page.questions[0].answer
    print("Answer options ", answer_options)
    print("Correct Answer ", correct_answer)
    statements = props_dict.get("statements", [])
    print("Options ", statements)
    ans = props_dict.get("ans", [])

    print("Answer ", ans)
    condition: str = props_dict.get("condition", "")
    print("Logical ", condition)

    existing_hints = props_dict.get("gptHints")
    stale_hints = (
        isinstance(existing_hints, list)
        and any(
            isinstance(h, dict)
            and "no question found" in str(h.get("statement", "")).lower()
            for h in existing_hints
        )
    )

    # Check if GPT hints already exist
    if not existing_hints or stale_hints:
        # Only generate hints if they are not already present
        gptHints = await generate_gpt_hints(
            bookId,
            pageId,
            content,
            title,
            question_text,
            condition,
            answer_options,
            statements,
            correct_answer,
            follow_up_question,
            follow_up_options,
            follow_up_correct_answer,
            ans,
            code,
        )

        if gptHints:
            props["gptHints"] = gptHints

            page_return = await db.page.update(
                where={"id": page.id},
                data={
                    "pageNumber": pageId,
                    "content": Json(content),
                    "image": page.image if page.image else "/images/blank.png",
                    "props": Json(props),
                },
                include={"book": False},
            )
        else:
            print("Warning: generate_gpt_hints returned empty list, not persisting.")
            page_return = page
    else:
        print("GPT hints already exist. Skipping generation.")
        page_return = page

    return page_return

async def generate_gpt_hints(
    bookId: int,
    pageId: int,
    content: str,
    title: str,
    question: str,
    condition: str,
    options: list,
    statements: list,
    correct_answer: str,
    follow_up_question: str,
    follow_up_options: list,
    follow_up_correct_answer: str,
    ans: list,
    code: str,
) -> list[dict]:

    system_message = """
    You are Hint Generator helping young children (ages 5-7) learn advanced programming concepts in a fun and understandable way. These children are using interactive activity books from the CodeKids platform.

    Your job is to help them answer questions from these books, without directly giving away the answer. Instead, guide them with simple, concise and progressive hints that build on their understanding.

    Focus on:
    - Providing step-by-step hints, starting from simple conceptual reminders and building toward deeper insight specific to the problem topic and content.
    - Using content-appropriate analogies (e.g., boxes, toys, animals, simple real-world examples).
    - Encouraging critical thinking.
    - Reinforcing correct patterns without using complex terms.
    - Keeping a positive and supportive tone.

    Each hint should:
    1. Be one step closer to helping them solve the question.
    2. Encourage curiosity and exploration.
    3. Include minimum 2 and a maximum of 4 hints.

    Never give the direct answer unless explicitly asked. Keep the experience playful, supportive, and confidence-building.
    """

    user_message = f"""
    Book ID: {bookId}
    Page ID: {pageId}
    Topic: {title}
    Content: {content}
    Code: {code}
    Question: {question} or {condition}
    Options: {options} or {statements}
    Answer: {correct_answer} or {ans}
    Follow-Up Question: {follow_up_question}
    Follow-Up Options: {follow_up_options}
    Follow-Up Answer: {follow_up_correct_answer}

    Generate your output in this format:
    [
      {{ "statement": "First hint goes here." }},
      {{ "statement": "Second hint goes here." }},
      {{ "statement": "Third hint goes here." }}
    ]

    Return ONLY this list. Do not explain anything else.
    """

    print("OPENAI_API_KEY =", settings.OPENAI_API_KEY[:10] if settings.OPENAI_API_KEY else "EMPTY")
    print("DEV_MODE =", settings.DEV_MODE)

    if settings.DEV_MODE or settings.OPENAI_API_KEY in ("openai-api-key", ""):
        print("USING MOCK HINTS")
        safe_question = question.strip() if question else ""
        question_hint = (
            f"Look carefully at the question: '{safe_question}'. Which part helps most?"
            if safe_question
            else "Read the task instructions carefully and focus on the exact thing being asked."
        )
        return [
            {"statement": f"Think about what '{title}' means. What is the main idea of this page?"},
            {"statement": question_hint},
            {"statement": "Try removing the wrong choices first."},
        ]

    print("CALLING OPENAI NOW")

    try:
        response = await client.chat.completions.create(
            model=settings.CHATGPT_MODEL,
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message},
            ],
            max_tokens=500,
        )

        gpt_text = response.choices[0].message.content or ""
        print("RAW OPENAI RESPONSE:", gpt_text)

        hints = parse_gpt_hints(gpt_text)
        print("PARSED HINTS:", hints)
        return hints

    except Exception as e:
        print("GPT API Error:", e)
        return []


def parse_gpt_hints(gpt_text: str) -> list[dict]:
    """
    Parses GPT-4's response into structured hint sets.
    Ensures up to 3 structured hints are returned.
    """
    try:
        return json.loads(gpt_text)
    except Exception as e:
        print(f"Failed to parse GPT hints: {e}")
        return []
