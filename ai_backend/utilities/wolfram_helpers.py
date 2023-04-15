import os
import json
import requests
import xml.etree.ElementTree as ET

from dotenv import load_dotenv
load_dotenv()

URL = "http://api.wolframalpha.com/v2/query"


def execute_wolfram_query(task: str) -> str:
    params = {
        "appid": os.getenv("WOLFRAM_ALPHA_APPID"),
        "input": task,
        "reinterpert": "false",
        # "podstate": "Result__Step-by-step solution",
        "output": "json",
        "format": "plaintext",
    }

    response = requests.get(URL, params=params)
    # print(response)
    response.raise_for_status()  # throw an error if the request fails

    parsed_data = json.loads(response.text)

    # Get desired output
    for pod in parsed_data['queryresult']['pods']:
        if pod['title'] == 'Result' or pod['title'] == 'Indefinite integral':
            return pod['subpods'][0]['plaintext']

    return "Unable to solve the problem"
