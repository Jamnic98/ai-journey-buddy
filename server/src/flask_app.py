from flask import Flask, request, jsonify
from flask_cors import CORS

from src.chat_service import handle_send_message_request

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/chat', methods=['POST'])
def send_msg():
    response = handle_send_message_request(request)
    return jsonify(response)
