import os
import openai

import herodotus_fast as hero

from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate

# List of all possible Allen relations in string form.
RELATION_STRS = [
    "precedes",
    "preceded_by",
    "meets",
    "met_by",
    "overlaps",
    "overlapped_by",
    "starts",
    "started_by",
    "finishes",
    "finished_by",
    "equals",
]

# Mapping from Allen relation string to verb form of two involved events.
RELATION_VERB_FORMS = {
    "precedes": ("3sgp", "inf"),
    "preceded_by": ("inf", "3sgp"),
    "meets": ("part", "inf"),
    "met_by": ("inf", "part"),
    "overlaps": ("part", "inf"),
    "overlapped_by": ("inf", "part"),
    "starts": ("inf", "inf"),
    "started_by": ("inf", "inf"),
    "finishes": ("part", "part"),
    "finished_by": ("part", "part"),
    "equals": ("part", "part"),
}

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


# Given two names, return a sentence where the first name commits an action
# that precedes the action committed by the second name.
def precedes(tree: hero.GrammarTree, name1: str, name2: str) -> str:
    return tree.generate_from_format(f"'{name1} V|1#3sgp 'before '{name2} 'started 'to V|2#inf")

def preceded_by(tree: hero.GrammarTree, name1: str, name2: str) -> str:
    return precedes(tree, name2, name1)

def meets(tree: hero.GrammarTree, name1: str, name2: str) -> str:
    return tree.generate_from_format(f"'{name1} 'stops V|1#part 'as '{name2} 'starts 'to V|2#inf")

def met_by(tree: hero.GrammarTree, name1: str, name2: str) -> str:
    return meets(tree, name2, name1)

def overlaps(tree: hero.GrammarTree, name1: str, name2: str) -> str:
    return tree.generate_from_format(f"'{name1} 'stops V|1#part 'as '{name2} 'starts 'to V|2#inf")

def overlapped_by(tree: hero.GrammarTree, name1: str, name2: str) -> str:
    return overlaps(tree, name2, name1)

def starts(tree: hero.GrammarTree, name: str, name2: str) -> str:
    return tree.generate_from_format(f"'{name} 'starts 'to V|1#inf 'right 'as '{name2} 'starts 'to V|2#inf")

def started_by(tree: hero.GrammarTree, name1: str, name2: str) -> str:
    return starts(tree, name2, name1)

def finishes(tree: hero.GrammarTree, name1: str, name2: str) -> str:
    return tree.generate_from_format(f"'{name1} 'stops 'V|1#part 'when '{name2} 'stops V|2#part")

def finished_by(tree: hero.GrammarTree, name1: str, name2: str) -> str:
    return finishes(tree, name2, name1)

def equals(tree: hero.GrammarTree, name1: str, name2: str) -> str:
    return tree.generate_from_format(f"'{name1} 'V|1#part 'exactly 'when '{name2} V|2#part")

# Use ChatGPT to reword a sentence whilst preserving the temporal logic
def reword(text: str) -> str:
    # TODO: generalize this to other LLMs
    prompt = reword_template.format(sentence=text)
    result = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": prompt}
        ]
    )
    return result["choices"][0]["message"]["content"]

if __name__ == '__main__':
    load_dotenv()
    openai.api_key = os.getenv('OPENAI_API_KEY')
    hero.init_conjugation()
    tree = hero.parse_file('verb-test.cfg')

    for _ in range(5):
        generated = precedes(tree, 'Bob', 'Alice')
        print(f"Generated: {generated}")
        print(f"Reworded: {reword(generated)}")
    #generated = "Bob walked before Alice talked"
    #print(f"Generated: {generated}")
    #print(f"Reworded: {reword(generated)}")

    print('-' * 20)

    for _ in range(5):
        generated = meets(tree, 'Bob', 'Alice')
        print(f"Generated: {generated}")
        print(f"Reworded: {reword(generated)}")
    #generated = "Bob stops walking as Alice starts to talk"
    #print(f"Generated: {generated}")
    #print(f"Reworded: {reword(generated)}")
