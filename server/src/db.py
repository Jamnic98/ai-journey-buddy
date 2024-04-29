from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

db = SQLAlchemy()


class Chat(db.Model):
    __tablename__ = 'chats'

    id = Column(Integer, primary_key=True, autoincrement=True)
    messages = relationship('Message', back_populates='chat')

    def __repr__(self):
        return f"<Chat(id={self.id}>)"


# Define the Message class
class Message(db.Model):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True, autoincrement=True)
    chat_id = Column(Integer, ForeignKey('chats.id'))
    message_text = Column(String)

    chat = relationship('Chat', back_populates='messages')

    def __init__(self, chat_id, message_text):
        self.chat_id = chat_id
        self.message_text = message_text

    def __repr__(self):
        return (f"<Message(id={self.id}, "
                f"chat_id={self.chat_id}, "
                f"message_text='{self.message_text}')>")
