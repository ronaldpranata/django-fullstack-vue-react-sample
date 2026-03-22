import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from urllib.parse import parse_qs
from .models import ChatMessage

User = get_user_model()

@database_sync_to_async
def get_user_from_token(token_string):
    try:
        access_token = AccessToken(token_string)
        user = User.objects.get(id=access_token['user_id'])
        return user
    except (InvalidToken, TokenError, User.DoesNotExist):
        return None

@database_sync_to_async
def save_message(user, content):
    return ChatMessage.objects.create(author=user, content=content)

@database_sync_to_async
def get_message_history():
    messages = ChatMessage.objects.order_by('-created_at')[:50]
    return [
        {
            "type": "message",
            "author": msg.author.username,
            "message": msg.content,
            "timestamp": msg.created_at.strftime("%H:%M")
        }
        for msg in reversed(messages)
    ]

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = "global_notifications"
        
        query_string = self.scope.get('query_string', b'').decode('utf-8')
        qs = parse_qs(query_string)
        token = qs.get('token', [None])[0]

        if not token:
            await self.close()
            return

        self.user = await get_user_from_token(token)
        if not self.user:
            await self.close()
            return

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

        history = await get_message_history()
        await self.send(text_data=json.dumps({
            "type": "history",
            "messages": history
        }))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_content = text_data_json.get("message", "")

        if message_content and self.user:
            msg = await save_message(self.user, message_content)
            
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "chat_message",
                    "message": msg.content,
                    "author": self.user.username,
                    "timestamp": msg.created_at.strftime("%H:%M")
                }
            )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            "type": "message",
            "message": event["message"],
            "author": event["author"],
            "timestamp": event.get("timestamp", "")
        }))
