from typing import List
from enum import Enum

from src.settings import config
from openai import OpenAI


class Chatbot:
    openai_client = OpenAI(api_key=config['OPENAI_API_KEY'])
    message_thread = []

    def __init__(self, model='gpt-3.5-turbo'):
        self.model = model

    @staticmethod
    def __build_first_prompt():
        prompt = ('You are a chatbot for engaging children when the go on journeys.'
                  'You will be speaking directly to a child')
        return prompt

    @staticmethod
    def __build_next_prompt(msg: str):
        """ create a prompt for the openai chatbot """
        return msg

    @staticmethod
    def __prepare_msg_for_chatbot(role, content):
        return {"role": role, "content": content}

    def start_new_chat(self):
        self.message_thread.clear()
        prompt = self.__build_first_prompt()
        self.message_thread.append({"role": "system", "content": prompt})
        response = self.openai_client.chat.completions.create(
            model=self.model,
            messages=self.message_thread
        )
        return response.choices[0].message.content

    def load_chat(self, message_list: List[str]):
        self.message_thread.clear()
        for i, message_text in enumerate(message_list):
            if i % 2 == 0:
                role = "user"
            else:
                role = "system"
            msg = self.__prepare_msg_for_chatbot(role, message_text)
            self.message_thread.append(msg)

    def generate_response(self, msg: str):
        """ accepts a message and returns a response from the openai chatbot """
        prompt = self.__build_next_prompt(msg)
        self.message_thread.append({"role": "user", "content": prompt})
        response = self.openai_client.chat.completions.create(
            model=self.model,
            messages=self.message_thread
        )
        self.message_thread.append({"role": "system", "content": prompt})
        return response.choices[0].message.content
