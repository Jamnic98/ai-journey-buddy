from flask import abort

from src.chatbot import Chatbot
from src.schemas import ChatSchema, MessageSchema
from src.db import db, Chat, Message

chatbot = Chatbot()

chat_schema = ChatSchema()
chats_schema = ChatSchema(many=True)
message_schema = MessageSchema()


def handle_get_all_chats():
    """ fetches a list of chats """
    chats = Chat.query.all()
    return chats_schema.dump(chats)


def handle_get_chat_by_id(chat_id: int):
    """" fetches a chat by its id """
    chat = db.session.query(Chat).filter_by(id=chat_id).first()
    if chat:
        # load chatbot with previous messages
        chatbot.load_chat([msg.message_text for msg in chat.messages])
        return chat_schema.dump(chat)
    else:
        abort(404, description=f'Chat with id {chat_id} does not exist.')


def handle_create_chat():
    """ starts a new chat """
    new_chat = Chat()
    db.session.add(new_chat)
    db.session.commit()
    # get initial message from chatbot
    chatbot_response = chatbot.start_new_chat()
    new_message = Message(new_chat.id, chatbot_response)
    # insert chatbot response
    db.session.add(new_message)
    db.session.commit()

    return chat_schema.dump(new_chat)


def handle_send_msg(chat_id: int, request_data: dict):
    """ receives message from a user and returns a response from the chatbot """
    chat = Chat.query.get(chat_id)
    if not chat:
        abort(404, description=f'Chat with id {chat_id} does not exist.')

    if msg := request_data['msg']:
        # insert user message into db
        new_user_msg = Message(chat_id, msg)
        db.session.add(new_user_msg)
        # get chatbot response and insert into db
        chatbot_response = chatbot.generate_response(msg)
        new_chatbot_msg = Message(chat_id, chatbot_response)
        db.session.add(new_chatbot_msg)
        db.session.commit()
        return chatbot_response

    else:
        abort(400, description='No message was provided.')
