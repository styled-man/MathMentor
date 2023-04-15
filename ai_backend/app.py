from dotenv import load_dotenv
from flask import Flask
from langchain.chat_models import ChatOpenAI
from utilities.langchain_helpers import process_mathpix, find_mistake
from utilities.wolfram_helpers import execute_wolfram_query
from flask import request
import os

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

load_dotenv()

chat = ChatOpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"),
                  model_name='gpt-4',
                  temperature=0.7)

app = Flask(__name__)


@app.route("/", methods=['GET'])
def index():
    return "Hello World"


@app.route("/extract_data", methods=['POST'])
def extract_data():
    raw_json = request.get_json()
    mathpix_output = process_mathpix(chat, data=raw_json["mathpix_data"])

    return {
        "content": mathpix_output["content"],
        "question": mathpix_output["question"],
    }


@app.route("/solution", methods=['POST'])
def solution():
    raw_json = request.get_json()
    wolfram_output = execute_wolfram_query(raw_json["mathpix"])
    mistake_output = find_mistake(chat,
                                  data={"mathpix": raw_json["mathpix"], "wolfram": wolfram_output})

    return {
        "mistake": mistake_output["mistake"],
        "topic": mistake_output["topic"],
    }
