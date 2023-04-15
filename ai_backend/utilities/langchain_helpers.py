# from langchain.chains import SimpleSequentialChain
from langchain.prompts import PromptTemplate
from langchain.prompts.chat import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain.chains import LLMChain


def mathpix_2_simplified(chat, data: str) -> str:
    human_message_prompt = HumanMessagePromptTemplate(prompt=PromptTemplate(
        input_variables=["mathpix_data"],
        template="Parse the following LaTex/Json data in a more human-readable format: {mathpix_data}?",
    ))

    chat_prompt_template = ChatPromptTemplate.from_messages(
        [human_message_prompt])
    chain = LLMChain(llm=chat, prompt=chat_prompt_template)

    out = chain.run(data)
    return out


def mathpix_2_question(chat, data: str) -> str:
    human_message_prompt = HumanMessagePromptTemplate(prompt=PromptTemplate(
        input_variables=["mathpix"],
        template="{mathpix}\n Write the question this work is answering as concisely as possible, including the original values",
    ))

    chat_prompt_template = ChatPromptTemplate.from_messages(
        [human_message_prompt])
    chain = LLMChain(llm=chat, prompt=chat_prompt_template)

    out = chain.run(data)
    return out
