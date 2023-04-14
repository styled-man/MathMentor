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

mrkl = initialize_agent(tools, llm, agent="zero-shot-react-description")
print(mrkl.run("What is the integral of 1/x?"))
