import os
from langchain.utilities.wolfram_alpha import WolframAlphaAPIWrapper
from dotenv import load_dotenv

load_dotenv()

os.environ["WOLFRAM_ALPHA_APPID"] = os.getenv("WOLFRAM_ALPHA_APPID")

wolfram = WolframAlphaAPIWrapper()
res = wolfram.run("What is 2x+5 = -3x + 7?")
print(res)
