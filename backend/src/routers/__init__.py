from .auth import auth_router
from .books import books_router
from .chatbot import chatbot_router
from .courses import courses_router
from .images import image_router
from .interactions import interactions_router
from .pages import pages_router

__all__ = [
    "auth_router",
    "books_router",
    "chatbot_router",
    "courses_router",
    "image_router",
    "interactions_router",
    "pages_router",
]
