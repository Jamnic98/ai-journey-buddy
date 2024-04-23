from src.settings import config
from openai import OpenAI


class Chatbot:
    openai_client = OpenAI(api_key=config['OPENAI_API_KEY'])

    def __init__(self, model='gpt-3.5-turbo'):
        self.model = model

    @staticmethod
    def __build_prompt(msg: str):
        """ create a prompt for the openai chatbot """
        prompt = msg
        return prompt

    def generate_response(self, msg: str):
        """ accepts a message and returns a response from the openai chatbot """
        prompt = self.__build_prompt(msg)
        response = self.openai_client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content
