import xml.etree.ElementTree as ET
import requests
import os
from langchain.utilities.wolfram_alpha import WolframAlphaAPIWrapper
from langchain.llms import OpenAI
from langchain.agents import initialize_agent, Tool
from dotenv import load_dotenv

load_dotenv()

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
os.environ["WOLFRAM_ALPHA_APPID"] = os.getenv("WOLFRAM_ALPHA_APPID")

llm = OpenAI(temperature=0)
wolfram = WolframAlphaAPIWrapper()

tools = [
    Tool(
        name="Wolfram",
        func=wolfram.run,
        description="Useful for when you need to answer questions about math, science, geography."
    )
]


# API endpoint URL and query parameters
url = "http://api.wolframalpha.com/v2/query"
params = {
    "appid": os.getenv("WOLFRAM_ALPHA_APPID"),
    "input": "solve 3x-7 = 11",
    "podstate": "Result__Step-by-step solution",
    "format": "plaintext",
}

# Send HTTP GET request to the API endpoint and get the response
response = requests.get(url, params=params)

# Parse the XML content of the response into an ElementTree object
root = ET.fromstring(response.content)
subpods = root.findall("./pod[@title='Results']/subpod")

for subpod in subpods:
    if subpod.get("title") == "Possible intermediate steps":
        plaintext_tag = subpod.find("plaintext")
        if plaintext_tag is not None:
            print(plaintext_tag.text)
