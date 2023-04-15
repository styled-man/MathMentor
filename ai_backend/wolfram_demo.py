from langchain.chat_models import ChatOpenAI
from dotenv import dotenv_values
from langchain.schema import (
    AIMessage,
    HumanMessage,
    SystemMessage
)

api_keys = dotenv_values()
openai_api_key = api_keys['OPENAI_API_KEY']

chat = ChatOpenAI(openai_api_key=openai_api_key,
                  model_name='gpt-4',
                  temperature=1)
response = chat([SystemMessage(content='you are an expert Canadian tour guide'),
                 HumanMessage(content='whats the most popular city in canada?')])
print(response.content)
