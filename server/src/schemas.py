from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow import fields

from src.db import Chat
from src.db import Message


class MessageSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Message
        include_fk = True
        load_instance = True

    id = fields.Int(load_only=True)
    chat_id = fields.Int(load_only=True)


class ChatSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Chat
        include_relationships = True
        load_instance = True

    messages = fields.Nested(MessageSchema(), many=True)
