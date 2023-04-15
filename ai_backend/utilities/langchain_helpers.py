from langchain.output_parsers import StructuredOutputParser, ResponseSchema
# from langchain.chains import SimpleSequentialChain
from langchain.prompts import PromptTemplate
from langchain.prompts.chat import (
    SystemMessagePromptTemplate,
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


def find_mistake(chat, data: dict) -> str:
    response_schemas = [
        ResponseSchema(
            name="mistake", description="A description of the specific mistake the student made when solving the problem"),
        ResponseSchema(
            name="topic", description="Topic the user should review in order to correct the mistake")
    ]

    output_parser = StructuredOutputParser.from_response_schemas(
        response_schemas)
    format_instructions = output_parser.get_format_instructions()

    system_message_prompt = SystemMessagePromptTemplate(prompt=PromptTemplate(input_variables=[],
                                                                              template="Your job is to spot errors in problem solving and reasoning given the steps a student uses to solve a mathematics problem. You are given the steps the student attempted, as well as the correct answer. \n{format_instructions}",
                                                        partial_variables={"format_instructions": format_instructions}))

    human_message_prompt = HumanMessagePromptTemplate(prompt=PromptTemplate(
        input_variables=["mathpix", "wolfram"],
        template="Here is the attempt from the student: {mathpix}\n\nHere is the correct answer: {wolfram}\n\nWhat step did the student make a mistake on?",
    ))

    chat_prompt_template = ChatPromptTemplate.from_messages(
        [system_message_prompt, human_message_prompt])
    chain = LLMChain(llm=chat, prompt=chat_prompt_template)

    out = chain.run(**data)
    return output_parser.parse(out)
