from src.settings import config
from openai import OpenAI


class Chatbot:
    openai_client = OpenAI(api_key=config['OPENAI_API_KEY'])
    messages = []

    def __init__(self, model='gpt-3.5-turbo'):
        self.model = model

    @staticmethod
    def __build_first_prompt():
        prompt = ('You are a chatbot for engaging children on journeys.'
                  'You will be speaking directly to a child')
        return prompt

    @staticmethod
    def __build_next_prompt(msg: str):
        """ create a prompt for the openai chatbot """
        prompt = msg
        return prompt

    def generate_response(self, msg: str):
        """ accepts a message and returns a response from the openai chatbot """
        if len(self.messages) == 0:
            # clear previous chat
            self.messages = []
            # TODO: handle initiating a chat
            prompt = self.__build_first_prompt()
            self.messages.append({"role": "system", "content": prompt})
            response = self.openai_client.chat.completions.create(
                model=self.model,
                messages=self.messages
            )
            return response.choices[0].message.content
        else:
            prompt = self.__build_next_prompt(msg)
            self.messages.append({"role": "user", "content": prompt})
            response = self.openai_client.chat.completions.create(
                model=self.model,
                messages=self.messages
            )
        self.messages.append({"role": "system", "content": prompt})
        return response.choices[0].message.content
