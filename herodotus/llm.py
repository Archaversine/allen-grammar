"""
Code for running various LLM models.

Each globally supported functinality is implemented separately for each LLM and
placed in a dispatching dictionary.
"""

import os
import openai

from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate

#
# Supported models.
#

OPENAI_MODELS = [
    "gpt-3.5-turbo",
    "gpt-4-turbo",
    "gpt-4o",
    "gpt-4o-mini",
]


#
# Initialization functions.
#

def init_openai():
    load_dotenv()
    openai.api_key = os.getenv('OPENAI_API_KEY')


INIT_FNS = {}
for openai_model in OPENAI_MODELS:
    INIT_FNS[openai_model] = init_openai


def init_llm(model_name: str):
    if model_name not in INIT_FNS:
        raise ValueError(f"Unknown model: {model_name}")
    INIT_FNS[model_name]()


#
# Rewording functions.
#

# Python template used to reword relation outputs
reword_template = PromptTemplate.from_template(
    '''
    Your job is to reword phrases. For example you might rewrite

    \"Bob walked before alice talked\"

    as \"Before Alice talked, Bob walked\"

    Now, rephrase the following sentence:

    \"{sentence}\"

    only state the rephrasing, nothing else.
    '''
)


def openai_reword(model_name: str):
    """General OpenAI rewording function generator.

    Returns a rewording function for the given OpenAI model.
    """
    def reword(text: str):
        prompt = reword_template.format(sentence=text)
        result = openai.ChatCompletion.create(
            model=model_name,
            messages=[
                {"role": "system", "content": prompt}
            ]
        )
        return result["choices"][0]["message"]["content"]
    return reword

REWORD_FNS = {}
for openai_model in OPENAI_MODELS:
    REWORD_FNS[openai_model] = openai_reword(openai_model)


def reword(text: str, model_name: str) -> str:
    if model_name not in REWORD_FNS:
        raise ValueError(f"Unknown reword model: {model_name}")
    return REWORD_FNS[model_name](text)


