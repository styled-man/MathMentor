import os
import requests
import xml.etree.ElementTree as ET

from dotenv import load_dotenv
load_dotenv()

URL = "http://api.wolframalpha.com/v2/query"
os.environ["WOLFRAM_ALPHA_APPID"] = os.getenv("WOLFRAM_ALPHA_APPID")


def execute_wolfram_query(task: str) -> str:
    params = {
        "appid": os.getenv("WOLFRAM_ALPHA_APPID"),
        "input": task,
        "podstate": "Result__Step-by-step solution",
        "format": "plaintext",
    }

    response = requests.get(URL, params=params)
    print(response)
    response.raise_for_status()  # throw an error if the request fails
    res = ""

    # Parse the XML content of the response into an ElementTree object
    root = ET.fromstring(response.content)
    subpods = root.findall("./pod[@title='Results']/subpod")

    for subpod in subpods:
        if subpod.get("title") == "Possible intermediate steps":
            plaintext_tag = subpod.find("plaintext")
            if plaintext_tag is not None:
                res = plaintext_tag.text

    if not res:
        raise ValueError("Wolfram Alpha did not return a result.")

    return res
