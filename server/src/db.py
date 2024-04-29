from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

db = SQLAlchemy()


class Chat(db.Model):
    __tablename__ = 'chats'

    id = Column(Integer, primary_key=True)
    messages = relationship('Message', back_populates='chat')

    def __repr__(self):
        return f"<Chat(id={self.id}>)"


# Define the Message class
class Message(db.Model):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True)
    chat_id = Column(Integer, ForeignKey('chats.id'))
    text = Column(String)

    chat = relationship('Chat', back_populates='messages')

    def __init__(self, chat_id, text):
        self.chat_id = chat_id
        self.text = text

    def __repr__(self):
        return (f"<Message(id={self.id}, "
                f"chat_id={self.chat_id}, "
                f"text='{self.text}')>")
