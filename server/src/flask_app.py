from flask import Flask, request, jsonify
from flask_cors import CORS

from src.db import db
from src.chat_service import handle_get_all_chats, handle_get_chat_by_id, \
    handle_create_chat, handle_send_msg

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chat_db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)
with app.app_context():
    db.create_all()


@app.route('/chat', methods=['GET'])
def get_all_chats():
    response = handle_get_all_chats()
    return jsonify(response)


@app.route('/chat/<int:chat_id>', methods=['GET'])
def get_chat_by_id(chat_id):
    response = handle_get_chat_by_id(chat_id)
    return jsonify(response)


@app.route('/chat', methods=['POST'])
def start_new_chat():
    response = handle_create_chat()
    return jsonify(response)


@ app.route('/chat/<int:chat_id>', methods=['POST'])
def send_msg(chat_id):
    request_data = request.json
    response = handle_send_msg(chat_id, request_data)
    return jsonify(response)
