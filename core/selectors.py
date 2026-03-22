from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from .models import ChatMessage

User = get_user_model()

def get_user_from_token(token_string: str):
    """Retrieve user securely from a raw JWT token string."""
    try:
        access_token = AccessToken(token_string)
        user = User.objects.get(id=access_token['user_id'])
        return user
    except (InvalidToken, TokenError, User.DoesNotExist):
        return None

def get_message_history(limit: int = 50) -> list:
    """Retrieve perfectly formatted historical chat payload lists."""
    messages = ChatMessage.objects.order_by('-created_at')[:limit]
    return [
        {
            "type": "message",
            "author": msg.author.username,
            "message": msg.content,
            "timestamp": msg.created_at.strftime("%H:%M")
        }
        for msg in reversed(messages)
    ]
