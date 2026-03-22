from django.contrib.auth import get_user_model
from .models import ChatMessage

User = get_user_model()

def save_chat_message(*, user: User, content: str) -> ChatMessage:
    """Safely persist an incoming WebSocket chat payload directly to the PostgreSQL ORM layer."""
    return ChatMessage.objects.create(author=user, content=content)
