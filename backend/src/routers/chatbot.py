from typing import Annotated, List, Optional

import openai
from fastapi import APIRouter, Depends, HTTPException
from prisma.models import Chat, Message, User
from pydantic import BaseModel
from src.auth import get_user
from src.config import settings
from src.db import db

# Set the OpenAI API key from your settings.
openai.api_key = settings.OPENAI_API_KEY
client = openai.OpenAI()

chatbot_router = APIRouter()


class InteractRequest(BaseModel):
    chat_id: Optional[str] = None
    user_message: str


async def create_chat(user: User, request_user_message: str) -> Chat:
    """
    Creates a new chat using the ChatGPT API to generate a 4-5 word title.
    """
    chat_title_prompt = (
        f"Generate a 4-5 word chat title for given user's input. Do not generate any other words, just the title"
        f"USER INPUT:\n{request_user_message}"
    )
    response = client.chat.completions.create(
        model=settings.CHATGPT_MODEL,
        messages=[
            {
                "role": "system",
                "content": "You are a title generator. Generate a 4-5 word title for the given user input.",
            },
            {"role": "user", "content": chat_title_prompt},
        ],
    )
    raw_content = response.choices[0].message.content
    if raw_content is None:
        raise ValueError("Received empty title from API")
    chat_title = raw_content.strip()
    chat = await db.chat.create(data={"userId": user.id, "title": chat_title})
    return chat


async def add_message(chat_id: str, sender: str, content: str) -> Message:
    if not chat_id:
        raise ValueError("Chat not found")
    try:
        new_message = await db.message.create(
            data={
                "chatId": chat_id,
                "sender": sender,
                "content": content,
            }
        )
    except Exception as e:
        raise RuntimeError(f"Failed to create message: {str(e)}")

    return new_message


async def generate_summary(messages: List[Message]) -> str:
    """
    Summarizes a list of messages using ChatGPT.
    """
    message_texts = [f"{msg.sender}: {msg.content}" for msg in messages]
    summary_prompt = (
        "Summarize the following conversation succinctly while retaining key details:\n"
        + "\n".join(message_texts)
    )
    sys_instruct = "You are a summarization assistant. Provide a brief summary of the provided conversation \
        so that ChatGPT has context of what happened."
    response = client.chat.completions.create(
        model=settings.CHATGPT_MODEL,
        messages=[
            {"role": "system", "content": sys_instruct},
            {"role": "user", "content": summary_prompt},
        ],
    )
    if response.choices[0].message.content is None:
        raise ValueError("Received empty summary from API")
    summary = response.choices[0].message.content.strip()
    return summary


@chatbot_router.post("/chats/interact", tags=["chatbot"])
async def interact(
    user: Annotated[User, Depends(get_user)], request: InteractRequest
) -> dict:
    """
    Merged endpoint that both records the user's message and generates a bot response.

    Flow:
      1. If a chat_id is provided, fetch the chat; if not, create a new chat.
      2. Add the user's message to the conversation.
      3. Build a conversation context:
         - If ≤ 25 messages, include all.
         - If > 25 messages, include the 25 most recent messages plus a summary of up to 10 earlier messages.
      4. Append the new user prompt and call ChatGPT to generate a response.
      5. Return the ChatGPT response back to the client.
    """
    context_text = ""  # Default context text.
    # Step 1: Resolve chat.
    if request.chat_id:
        chat = await db.chat.find_first(
            where={"id": request.chat_id, "userId": user.id}, include={"messages": True}
        )
        if not chat:
            raise HTTPException(status_code=404, detail="Chat not found")

        messages = sorted(chat.messages or [], key=lambda x: x.createdAt)
        total_messages = len(messages)

        # Build context based on conversation length.
        if total_messages == 0:
            context_text = ""
        elif total_messages <= 25:
            context_text = "\n".join(
                [f"{msg.sender}: {msg.content}" for msg in messages]
            )
        else:
            # More than 25 messages: include the 25 most recent messages.
            recent_messages = messages[-25:]
            # Summarize earlier messages (up to 10, or fewer if not available).
            earlier_count = min(10, total_messages - 25)
            summary_messages = messages[:earlier_count]
            summary_text = await generate_summary(summary_messages)
            context_text = f"SUMMARY OF EARLIER CONVERSATION:\n{summary_text}\n\n"
            context_text += "\nRECENT CONVERSATION:\n".join(
                [f"{msg.sender}: {msg.content}" for msg in recent_messages]
            )
    else:
        chat = await create_chat(user, request.user_message)

    # Step 5: Add user's message to the chat.
    new_message = await add_message(
        chat_id=chat.id, sender="User", content=request.user_message
    )
    if context_text:
        full_prompt = f"PREVIOUS CONTEXT:\n{context_text}\nNEW USER MESSAGE:\n{new_message.content}"
    else:
        full_prompt = new_message.content

    system_instruction = (
        "YOU ARE A HELPFUL CHATBOT INTEGRATED WITH A WEBSITE CALLED CodeKids. "
        "YOUR JOB IS TO TEACH KIDS CONCEPTS IN COMPUTER SCIENCE. "
        "WATCH YOUR LANGUAGE AND BEHAVE APPROPRIATELY. "
        "YOU WILL BE PROVIDED WITH PREVIOUS CONVERSATION CONTEXT AND/OR SUMMARY ALONG WITH A NEW USER MESSAGE. "
        "PROVIDE A HELPFUL RESPONSE TO THE USER'S INPUT."
    )

    response = client.chat.completions.create(
        model=settings.CHATGPT_MODEL,
        messages=[
            {"role": "system", "content": system_instruction},
            {"role": "user", "content": full_prompt},
        ],
    )
    if response.choices[0].message.content is None:
        raise ValueError("Received empty response from API")
    bot_reply = response.choices[0].message.content.strip()
    await add_message(chat_id=chat.id, sender="Bot", content=bot_reply)

    return {"chat_title": chat.title, "bot_response": bot_reply}


@chatbot_router.get("/chats", tags=["chatbot"])
async def list_chats(user: Annotated[User, Depends(get_user)]) -> list[Chat]:
    chats = await db.chat.find_many(where={"userId": user.id})
    return sorted(chats, key=lambda x: x.updatedAt, reverse=True)


@chatbot_router.get("/chats/{chat_id}/messages", tags=["chatbot"])
async def get_chat_messages(
    user: Annotated[User, Depends(get_user)], chat_id: str
) -> list[Message]:
    chat = await db.chat.find_first(
        where={"id": chat_id, "userId": user.id}, include={"messages": True}
    )
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")

    return sorted(chat.messages or [], key=lambda x: x.createdAt)
