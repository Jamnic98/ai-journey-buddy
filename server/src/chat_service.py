from flask import Request, abort
from http import HTTPStatus

from src.chatbot import Chatbot

chat_bot = Chatbot()


def handle_send_message_request(request: Request):
    """ receives a chat request and returns a response """
    if not request.is_json:
        abort(HTTPStatus.BAD_REQUEST, description='Content-Type must be application/json')

    if msg := request.json['msg']:
        return chat_bot.generate_response(msg)
    abort(HTTPStatus.BAD_REQUEST, description='No message provided')
