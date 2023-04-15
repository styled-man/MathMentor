import asyncio
from dotenv import dotenv_values
from langchain.chat_models import ChatOpenAI
from utilities.langchain_helpers import mathpix_2_question, mathpix_2_simplified, find_mistake
from utilities.wolfram_helpers import execute_wolfram_query


MATHPIX_DATA = """\\[\n\\begin{array}{l}\n\\text { Question: Find } \\omega_{x} \\text {, where } \\\\\n\\begin{array}{ll}\n\\omega=20 \\mathrm{~N} & \\text { along the force } \\\\\n\\theta=30^{\\circ} & \\text { plane. }\n\\end{array} \\\\\n\\begin{array}{ll}\n\\omega_{x} & =\\omega \\sin \\theta \\\\\n& =20 \\mathrm{~N} \\cdot \\sin \\left(30^{\\circ}\\right) \\\\\n& =10 \\mathrm{~N}\n\\end{array}\n\\end{array}\n\\]\nAnswer: The \\( \\omega_{x} \\) is \\( 10 \\mathrm{~N} \\). This was fund by multiplying \\( \\omega \\) by \\( \\sin \\left(30^{\\circ}\\right) \\).",
    "data": [
        {
            "type": "asciimath",
            "value": "{:[\" Question: Find \"omega_(x)\", where \"],[{:[omega=20N,\" along the force \"],[theta=30^(@),\" plane. \"]:}],[{:[omega_(x),=omega sin theta],[,=20N*sin(30^(@))],[,=10N]:}]:}"
        },
        {
            "type": "asciimath",
            "value": "omega_(x)"
        },
        {
            "type": "asciimath",
            "value": "10N"
        },
        {
            "type": "asciimath",
            "value": "omega"
        },
        {
            "type": "asciimath",
            "value": "sin(30^(@))"
        }
    ]"""
WOLFRAM_DATA = "solve 3x^2 = 9"

api_keys = dotenv_values()
openai_api_key = api_keys['OPENAI_API_KEY']

chat = ChatOpenAI(openai_api_key=openai_api_key,
                  model_name='gpt-4',
                  temperature=1)


def assemble_prompts():
    test = find_mistake(chat, data={
                        "mathpix": "3x + 2 = 0, 3x = -2, x = -3/2", "wolfram": "3x + 2 = 0, 3x = -2, x = -2/3"})
    print(f"\n\nTEST: {test}")
    #    mathpix_simplified = mathpix_2_simplified(chat, data=MATHPIX_DATA)
    #    print(mathpix_simplified)
    #    question = mathpix_2_question(chat, data=MATHPIX_DATA)
    #    print(f"\n\nQUESTION: {question}")
    #    wolfram = execute_wolfram_query(task=question)
    #    print(f"\n\nWOLFRAM: {wolfram}")


assemble_prompts()
# from flask import Flask
#
# app = Flask(__name__)
#
# @app.route("/")
# def hello_world():
#    return "<p>Hello, World!</p>"
